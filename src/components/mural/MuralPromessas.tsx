import { useState, useCallback } from 'react';
import styles from './MuralPromessas.module.css';

interface Promessa {
  id: number;
  texto: string;
  nome: string;
  cor: 'teal' | 'blue' | 'amber' | 'purple';
}

// Promessas pré-carregadas para dar vida ao mural desde o início
const PROMESSAS_INICIAIS: Promessa[] = [
  { id: 1,  texto: 'Vou pensar duas vezes antes de pedir pra IA gerar coisas desnecessárias.',  nome: 'Ana',     cor: 'teal'   },
  { id: 2,  texto: 'Quero aprender a buscar informações direto na fonte antes de usar o ChatGPT.', nome: 'Pedro',  cor: 'blue'   },
  { id: 3,  texto: 'Vou contar pra minha turma que a IA usa água de verdade!',                   nome: 'Lucas',   cor: 'purple' },
  { id: 4,  texto: 'Vou desligar dispositivos que não estou usando.',                            nome: 'Júlia',   cor: 'amber'  },
  { id: 5,  texto: 'Vou usar menos prompts de IA por dia.',                                      nome: 'Anônimo', cor: 'teal'   },
  { id: 6,  texto: 'Vou pesquisar mais antes de perguntar pra IA.',                              nome: 'Maria',   cor: 'blue'   },
  { id: 7,  texto: 'Quero mostrar esse site pros meus pais e explicar o que aprendi.',           nome: 'Anônimo', cor: 'purple' },
  { id: 8,  texto: 'Vou evitar pedir pra IA gerar imagens sem necessidade.',                    nome: 'Tales',   cor: 'amber'  },
];

const SUGESTOES = [
  'Vou usar menos a IA no meu dia a dia',
  'Vou pesquisar antes de perguntar pra IA',
  'Vou falar sobre isso pra minha turma',
];

const CORES: Promessa['cor'][] = ['teal', 'blue', 'amber', 'purple'];

// Estimativa de litros economizados por dia por promessa registrada.
// Baseado numa redução média de ~5 prompts/dia evitados por pessoa
// (5 prompts x ~0,1 L cada, conforme a faixa do Estimador de Água).
const LITROS_POR_PROMESSA = 0.52;
let idCounter = PROMESSAS_INICIAIS.length + 1;

export function MuralPromessas() {
  const [promessas, setPromessas] = useState<Promessa[]>(PROMESSAS_INICIAIS);
  const [input, setInput] = useState('');
  const [nome, setNome] = useState('');
  const [publicado, setPublicado] = useState(false);

  const handlePublicar = useCallback(() => {
    const texto = input.trim();
    if (!texto) return;

    const nova: Promessa = {
      id:    idCounter++,
      texto,
      nome:  nome.trim() || 'Anônimo',
      cor:   CORES[Math.floor(Math.random() * CORES.length)],
    };

    setPromessas(prev => [nova, ...prev]);
    setInput('');
    setNome('');
    setPublicado(true);
    setTimeout(() => setPublicado(false), 3000);
  }, [input, nome]);

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
        <div className={styles.contador}>
          <span className={styles.contadorNum}>
            {(promessas.length * LITROS_POR_PROMESSA).toFixed(1).replace('.', ',')}
          </span>
          <span className={styles.contadorLbl}>L/dia potencial</span>
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

        {/* Nome opcional */}
        <input
          className={styles.inputNome}
          type="text"
          maxLength={30}
          placeholder="Seu nome (opcional)"
          value={nome}
          onChange={e => setNome(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handlePublicar()}
        />

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
            <p className={styles.cardNome}>— {p.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
