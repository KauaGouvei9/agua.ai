import { useState, useRef, useEffect, useCallback } from 'react';
import { estimateTokens, getResponseTokens, estimateWaterMl, formatWater, bestEquivalence } from '../../domain/estimation';
import { MODEL_MULTIPLIERS } from '../../domain/estimation/constants';
import { PromptSuggestions } from './Promptsuggestions';
import styles from './ChatPanel.module.css';

// Deve ser idêntico ao texto em constants.ts → impacto_gigante → exemplos
const FACEBOOK_TEXTO = 'Crie o Facebook 2.0 melhorado com todas as funcionalidades';

interface Message {
  id: number;
  role: 'user' | 'system';
  text: string;
  waterInfo?: {
    primary: string;
    secondary: string;
    range: string;
    equivalence: string;
    educationalNote?: string;
  };
}

const MODELS = Object.entries(MODEL_MULTIPLIERS).map(([key, val]) => ({
  key,
  label: val.label,
}));

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('chatgpt');
  const [taskKey, setTaskKey] = useState('chat_simples');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const idCounter = useRef(0);

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleSubmit = useCallback(() => {
    const text = input.trim();
    if (!text || loading) return;

    const userId = ++idCounter.current;
    const userMsg: Message = { id: userId, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const delay = 800 + Math.random() * 400;
    setTimeout(() => {
      const promptTokens   = estimateTokens(text);
      const responseTokens = getResponseTokens(taskKey);
      const { ml, minMl, maxMl } = estimateWaterMl({
        promptTokens,
        responseTokens,
        modelKey: model,
      });

      const formatted    = formatWater(ml);
      const minFormatted = formatWater(minMl);
      const maxFormatted = formatWater(maxMl);

      // Suprime equivalência quando o resultado já está em litros
      const equiv = ml < 1000 ? bestEquivalence(ml) : null;

      // Nota educativa vinculada APENAS ao prompt exato do Facebook
      const educationalNote = text === FACEBOOK_TEXTO
        ? 'E isso é só 1 prompt. O Facebook real precisou de milhões deles e cada um consome água.'
        : undefined;

      const systemId = ++idCounter.current;
      const systemMsg: Message = {
        id: systemId,
        role: 'system',
        text: `Para processar sua mensagem, um modelo como o ${MODEL_MULTIPLIERS[model].label} consumiria aproximadamente:`,
        waterInfo: {
          primary:        formatted.primary,
          secondary:      formatted.secondary,
          range:          `entre ${minFormatted.primary} e ${maxFormatted.primary}`,
          equivalence:    equiv ? equiv.valuePt : '',
          educationalNote,
        },
      };

      setMessages(prev => [...prev, systemMsg]);
      setLoading(false);
    }, delay);
  }, [input, loading, model, taskKey]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionSelect = useCallback((texto: string, categoria: string) => {
    setInput(texto);
    setTaskKey(categoria);
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.panel}>
      {/* Model selector */}
      <div className={styles.modelBar}>
        {MODELS.map(m => (
          <button
            key={m.key}
            className={`${styles.modelBtn} ${model === m.key ? styles.modelActive : ''}`}
            onClick={() => setModel(m.key)}
          >
            {m.label}
          </button>
        ))}
        <button
          className={styles.infoBtn}
          onClick={() => setModalOpen(true)}
          title="Como calculamos?"
          aria-label="Como calculamos?"
        >
          &#x24D8;
        </button>
      </div>

      {/* Modal de metodologia */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle} id="modal-title">Como calculamos?</h3>
              <button className={styles.modalClose} onClick={() => setModalOpen(false)} aria-label="Fechar">&#x2715;</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <p className={styles.modalRef}><strong>Li et al. (2023)</strong> — Making AI Less Thirsty, UC Riverside</p>
                <p className={styles.modalText}>Base científica principal. O estudo estima que executar o GPT-3 para 10–50 prompts consome ~500 mL de água. Adotamos <strong>25 mL por prompt de 250 tokens</strong> como valor central — centro conservador da faixa para modelos modernos mais eficientes.</p>
              </div>
              <div className={styles.modalSection}>
                <p className={styles.modalRef}><strong>The Conversation — Leo S. Lo</strong>, Univ. of Virginia (2025)</p>
                <p className={styles.modalText}>Referência secundária para o WUE (Water Usage Effectiveness). <strong>Média global: 1,8 L/kWh</strong> — usada para contextualizar o consumo energético dos data centers.</p>
              </div>
              <div className={styles.modalSection}>
                <p className={styles.modalRef}><strong>Estimativa de tokens</strong></p>
                <p className={styles.modalText}>Calculada via padrão <strong>tiktoken</strong> (OpenAI): 4 caracteres por token. A complexidade da tarefa (pergunta rápida, redação, projeto completo) define os tokens de resposta esperados.</p>
              </div>
              <div className={styles.modalSection}>
                <p className={styles.modalRef}><strong>Faixa de incerteza</strong></p>
                <p className={styles.modalText}>Variação de <strong>0,5× a 3,0×</strong> sobre o valor central — reflete diferenças reais entre data centers (temperatura, fonte de energia, horário de pico). Uma variação de ±20% é aplicada a cada cálculo para simular condições dinâmicas.</p>
              </div>

              <div className={styles.modalSection}>
                <p className={styles.modalRef}>Exemplo de cálculo</p>
                <p className={styles.modalText}>
                  Prompt: <strong>"O que é fotossíntese?"</strong> (~8 tokens)<br />
                  Resposta estimada: ~200 tokens (pergunta rápida)<br />
                  Total: 208 tokens ÷ 250 × 25 mL = <strong>~20 mL</strong><br />
                  Equivale a ~4 colheres de chá de água.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className={styles.messages} ref={listRef}>
        {messages.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="none" stroke="var(--color-water-soft)" strokeWidth="1.5" opacity="0.3" />
                <path d="M24 14v14M17 21l7 7 7-7" stroke="var(--color-water-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p>Digite qualquer mensagem para descobrir quanta agua seria usada para processa-la.</p>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleSystem}`}
          >
            <p className={styles.bubbleText}>{msg.text}</p>
            {msg.waterInfo && (
              <div className={styles.waterCard}>
                <div className={styles.waterMain}>
                  <span className={styles.waterIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2s-6 7.2-6 11a6 6 0 0012 0C16 9.2 10 2 10 2z" fill="var(--color-water-bright)" opacity="0.2" stroke="var(--color-water-bright)" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span className={styles.waterValue}>{msg.waterInfo.primary}</span>
                  <span className={styles.waterSecondary}>({msg.waterInfo.secondary})</span>
                </div>
                <p className={styles.waterRange}>Faixa estimada: {msg.waterInfo.range}</p>
                {msg.waterInfo.equivalence && (
                  <p className={styles.waterEquiv}>Isso equivale a {msg.waterInfo.equivalence}</p>
                )}
                {msg.waterInfo.educationalNote && (
                  <p className={styles.waterNote}>
                    {msg.waterInfo.educationalNote}
                  </p>
                )}
                <p className={styles.waterDisclaimer}>
                  Esta e uma estimativa educativa baseada em dados públicos de pesquisa. Os valores reais variam conforme a localização, tipo de resfriamento e fonte de energia.
                </p>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={`${styles.bubble} ${styles.bubbleSystem}`}>
            <div className={styles.dots}>
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {/* Sugestões de prompt */}
      <PromptSuggestions onSelect={handleSuggestionSelect} />

      {/* Input */}
      <div className={styles.inputBar}>
        <textarea
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setTaskKey('chat_simples'); // reseta categoria ao digitar manualmente
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          rows={1}
          disabled={loading}
        />
        <button
          className={styles.send}
          onClick={handleSubmit}
          disabled={!input.trim() || loading}
          aria-label="Enviar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 10l14-7-7 14-2-7-5-2z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
