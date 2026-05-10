import { useState, useCallback } from 'react';
import { TASK_COMPLEXITY } from '../../domain/estimation/constants';
import styles from './Promptsuggestions.module.css';

const ALL_EXAMPLES: Array<{ texto: string; catKey: string }> = Object.entries(TASK_COMPLEXITY)
  .flatMap(([catKey, cat]) => cat.exemplos.map((texto) => ({ texto, catKey })))
  .sort(() => Math.random() - 0.5);

// Deve ser exatamente igual ao texto em constants.ts → impacto_gigante → exemplos
const FACEBOOK_PROMPT = {
  texto: 'Crie o Facebook 2.0 melhorado com todas as funcionalidades',
  catKey: 'impacto_gigante',
};

function pickTwo(excludeTextos: string[]): [number, number] {
  const usedCats = new Set<string>();
  const picked: number[] = [];
  const pool = ALL_EXAMPLES
    .map((_, i) => i)
    .filter((i) => !excludeTextos.includes(ALL_EXAMPLES[i].texto))
    .sort(() => Math.random() - 0.5);

  for (const i of pool) {
    if (!usedCats.has(ALL_EXAMPLES[i].catKey)) {
      usedCats.add(ALL_EXAMPLES[i].catKey);
      picked.push(i);
    }
    if (picked.length === 2) break;
  }
  // fallback se não conseguiu 2 categorias distintas
  for (const i of pool) {
    if (!picked.includes(i)) picked.push(i);
    if (picked.length === 2) break;
  }
  return picked as [number, number];
}

function pickThree(): [number, number, number] {
  const usedCats = new Set<string>();
  const picked: number[] = [];
  const pool = [...ALL_EXAMPLES.map((_, i) => i)].sort(() => Math.random() - 0.5);

  for (const i of pool) {
    if (!usedCats.has(ALL_EXAMPLES[i].catKey)) {
      usedCats.add(ALL_EXAMPLES[i].catKey);
      picked.push(i);
    }
    if (picked.length === 3) break;
  }
  for (const i of pool) {
    if (!picked.includes(i)) picked.push(i);
    if (picked.length === 3) break;
  }
  return picked as [number, number, number];
}

interface Card { texto: string; catKey: string; }

interface Props {
  onSelect: (texto: string, categoriaKey: string) => void;
}

export function PromptSuggestions({ onSelect }: Props) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [cards, setCards] = useState<[Card, Card, Card]>(() => {
    const [i1, i2] = pickTwo([FACEBOOK_PROMPT.texto]);
    return [FACEBOOK_PROMPT, ALL_EXAMPLES[i1], ALL_EXAMPLES[i2]];
  });
  const [animating, setAnimating] = useState(false);

  const handleClick = useCallback(
    (card: Card) => {
      onSelect(card.texto, card.catKey);
      setIsFirstLoad(false);
      setAnimating(true);
      setTimeout(() => {
        const [i0, i1, i2] = pickThree();
        setCards([ALL_EXAMPLES[i0], ALL_EXAMPLES[i1], ALL_EXAMPLES[i2]]);
        setAnimating(false);
      }, 180);
    },
    [onSelect]
  );

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Experimente perguntar:</span>
      <div className={styles.grid}>
        {cards.map((card, pos) => (
          <button
            key={`${isFirstLoad ? 'first' : 'free'}-${pos}-${card.texto.slice(0, 12)}`}
            className={`${styles.card} ${animating ? styles.cardOut : styles.cardIn}`}
            onClick={() => handleClick(card)}
          >
            <span className={styles.example}>{card.texto}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
