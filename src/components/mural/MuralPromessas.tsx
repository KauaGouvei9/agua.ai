import { useState, useCallback } from 'react';
import styles from './MuralPromessas.module.css';

interface Promessa {
  id: number;
  texto: string;
  cor: 'teal' | 'blue' | 'amber' | 'purple';
}

// Promessas pré-carregadas para dar vida ao mural desde o início
const PROMESSAS_INICIAIS: Promessa[] = [
  { id: 1,  texto: 'Vou pensar duas vezes antes de pedir pra IA gerar coisas desnecessárias.',  cor: 'teal'   },
  { id: 2,  texto: 'Quero aprender a buscar informações direto na fonte antes de usar o ChatGPT.', cor: 'blue'   },
  { id: 3,  texto: 'Vou contar pra minha turma que a IA usa água de verdade!',                   cor: 'purple' },
  { id: 4,  texto: 'Vou desligar dispositivos que não estou usando.',                            cor: 'amber'  },
  { id: 5,  texto: 'Vou usar menos prompts de IA por dia.',                                      cor: 'teal'   },
  { id: 6,  texto: 'Vou pesquisar mais antes de perguntar pra IA.',                              cor: 'blue'   },
  { id: 7,  texto: 'Quero mostrar esse site pros meus pais e explicar o que aprendi.',           cor: 'purple' },
  { id: 8,  texto: 'Vou evitar pedir pra IA gerar imagens sem necessidade.',                    cor: 'amber'  },
];

const SUGESTOES = [
  'Vou usar menos a IA no meu dia a dia',
  'Vou pesquisar antes de perguntar pra IA',
  'Vou falar sobre isso pra minha turma',
];

const CORES: Promessa['cor'][] = ['teal', 'blue', 'amber', 'purple'];
let idCounter = PROMESSAS_INICIAIS.length + 1;

export function MuralPromessas() {
  const [promessas, setPromessas] = useState<Promessa[]>(PROMESSAS_INICIAIS);
  const [input, setInput] = useState('');
  const [publicado, setPublicado] = useState(false);

  const handlePublicar = useCallback(() => {
    const texto = input.trim();
    if (!texto) return;

    const nova: Promessa = {
      id:    idCounter++,
      texto,
      cor:   CORES[Math.floor(Math.random() * CORES.length)],
    };

    setPromessas(prev => [nova, ...prev]);
    setInput('');
    setPublicado(true);
    setTimeout(() => setPublicado(false), 3000);
  }, [input]);

  const handleSugestao = (s: string) => {
    setInput(s);
  };

  return (
    <div className={styles.wrapper}>
      {/* Contador */}
      <div className={styles.contadores}>
        <div className={styles.contador}>
          <span className={styles.contadorNum}>{promessas.length}</span>
          <span className={styles.contadorLbl}>promessas</span>
        </div>
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <p className={styles.inputPrompt}>
          O que você vai mudar no seu uso de tecnologia?
        </p>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            maxLength={120}
            placeholder="Escreva sua promessa..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handlePublicar()}
          />
          <button
            className={styles.btn}
            onClick={handlePublicar}
            disabled={!input.trim()}
          >
            Publicar
          </button>
        </div>

        {/* Sugestões rápidas */}
        <div className={styles.sugestoes}>
          <span className={styles.sugestaoLabel}>sugestão rápida:</span>
          {SUGESTOES.map(s => (
            <button
              key={s}
              className={styles.sugestaoTag}
              onClick={() => handleSugestao(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Feedback de publicação */}
        {publicado && (
          <p className={styles.feedback}>
            ✓ Promessa publicada! Obrigado por participar.
          </p>
        )}
      </div>

      {/* Grid de promessas */}
      <div className={styles.grid}>
        {promessas.map(p => (
          <div key={p.id} className={`${styles.card} ${styles[p.cor]}`}>
            <p className={styles.cardTexto}>"{p.texto}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}