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
  { id: 1,  texto: 'Vou pensar duas vezes antes de pedir pra IA gerar coisas desnecessárias.',                 nome: 'Ana',     cor: 'teal'   },
  { id: 2,  texto: 'Vou fazer sozinha sem copiar nada da IA.',                                                  nome: 'Anônimo', cor: 'blue'   },
  { id: 3,  texto: 'Prometo passar um dia da semana sem usar IA para tarefas simples!',                         nome: 'Lucas',   cor: 'purple' },
  { id: 4,  texto: 'Prometo que vou criar algo do zero sem IA pelo menos uma vez por semana.',                  nome: 'Júlia',   cor: 'amber'  },
  { id: 5,  texto: 'Vou perguntar "eu realmente preciso usar IA para isso?" antes de abrir o chat.',            nome: 'Anônimo', cor: 'teal'   },
  { id: 6,  texto: 'Vou pesquisar em livros ou sites antes de pedir um resumo para a IA.',                     nome: 'Maria',   cor: 'blue'   },
  { id: 7,  texto: 'Prometo ensinar outras pessoas sobre como a IA usa a água do planeta.',                     nome: 'Pedro',   cor: 'purple' },
  { id: 8,  texto: 'Vou evitar pedir versões diferentes da mesma imagem só por curiosidade.',                   nome: 'Tales',   cor: 'amber'  },
];

const SUGESTOES = [
  'Prometo não compartilhar dados importantes com a IA',
  'Prometo pedir ajuda para meus responsáveis e não para IA',
  'Prometo compartilhar uma curiosidade sobre água, energia ou IA com outra pessoa',
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