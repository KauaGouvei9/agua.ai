import { useState, useRef, useEffect, useCallback } from 'react';
import { estimateTokens, estimateResponseTokens, estimateWaterMl, formatWater, bestEquivalence } from '../../domain/estimation';
import { MODEL_MULTIPLIERS } from '../../domain/estimation/constants';
import styles from './ChatPanel.module.css';

interface Message {
  id: number;
  role: 'user' | 'system';
  text: string;
  waterInfo?: {
    primary: string;
    secondary: string;
    range: string;
    equivalence: string;
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
  const [loading, setLoading] = useState(false);
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
      const promptTokens = estimateTokens(text);
      const responseTokens = estimateResponseTokens(promptTokens);
      const { ml, minMl, maxMl } = estimateWaterMl({
        promptTokens,
        responseTokens,
        modelKey: model,
      });

      const formatted = formatWater(ml);
      const minFormatted = formatWater(minMl);
      const maxFormatted = formatWater(maxMl);
      const equiv = bestEquivalence(ml);

      const systemId = ++idCounter.current;
      const systemMsg: Message = {
        id: systemId,
        role: 'system',
        text: `Para processar sua mensagem, um modelo como o ${MODEL_MULTIPLIERS[model].label} consumiria aproximadamente:`,
        waterInfo: {
          primary: formatted.primary,
          secondary: formatted.secondary,
          range: `entre ${minFormatted.primary} e ${maxFormatted.primary}`,
          equivalence: equiv ? equiv.valuePt : '',
        },
      };

      setMessages(prev => [...prev, systemMsg]);
      setLoading(false);
    }, delay);
  }, [input, loading, model]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

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
      </div>

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

      {/* Input */}
      <div className={styles.inputBar}>
        <textarea
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
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
