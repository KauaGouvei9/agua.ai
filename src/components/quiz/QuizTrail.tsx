import { useState, useReducer, useCallback } from 'react';
import { quizQuestions, type QuizQuestion } from '../../content/pt/quiz';
import { BaseModal } from '../modals/BaseModal';
import styles from './QuizTrail.module.css';

type NodeState = 'locked' | 'current' | 'completed';

interface QuizState {
  currentUnlocked: number; // 0-based index of the next unanswered question
  completed: boolean[];
}

type QuizAction =
  | { type: 'ANSWER_CORRECT'; index: number };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_CORRECT': {
      const completed = [...state.completed];
      completed[action.index] = true;
      return {
        currentUnlocked: Math.min(action.index + 1, quizQuestions.length - 1),
        completed,
      };
    }
    default:
      return state;
  }
}

const initialState: QuizState = {
  currentUnlocked: 0,
  completed: new Array(quizQuestions.length).fill(false),
};

export function QuizTrail() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [openQuestion, setOpenQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const getNodeState = (index: number): NodeState => {
    if (state.completed[index]) return 'completed';
    if (index === state.currentUnlocked || (index < state.currentUnlocked)) return 'current';
    return 'locked';
  };

  const handleNodeClick = useCallback((index: number) => {
    const nodeState = getNodeState(index);
    if (nodeState === 'locked') return;
    if (nodeState === 'completed') return;
    setOpenQuestion(quizQuestions[index]);
    setSelectedOption(null);
    setFeedback(null);
  }, [state.currentUnlocked, state.completed]);

  const handleConfirm = useCallback(() => {
    if (selectedOption === null || !openQuestion) return;

    if (selectedOption === openQuestion.correctIndex) {
      setFeedback('correct');
      setTimeout(() => {
        dispatch({ type: 'ANSWER_CORRECT', index: openQuestion.id - 1 });
        setOpenQuestion(null);
        setFeedback(null);
      }, 1200);
    } else {
      setFeedback('wrong');
    }
  }, [selectedOption, openQuestion]);

  const handleClose = () => {
    setOpenQuestion(null);
    setSelectedOption(null);
    setFeedback(null);
  };

  const allCompleted = state.completed.every(Boolean);

  return (
    <div className={styles.trail}>
      {/* Trail nodes */}
      <div className={styles.nodes}>
        {quizQuestions.map((q, i) => {
          const nodeState = getNodeState(i);
          return (
            <div key={q.id} className={styles.nodeGroup}>
              {i > 0 && (
                <div className={`${styles.connector} ${state.completed[i - 1] ? styles.connectorDone : ''}`} />
              )}
              <button
                className={`${styles.node} ${styles[nodeState]}`}
                onClick={() => handleNodeClick(i)}
                disabled={nodeState === 'locked'}
                aria-label={
                  nodeState === 'locked'
                    ? `Pergunta ${i + 1} bloqueada`
                    : nodeState === 'completed'
                    ? `Pergunta ${i + 1} concluida`
                    : `Abrir pergunta ${i + 1}`
                }
              >
                {nodeState === 'completed' ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : nodeState === 'locked' ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className={styles.nodeNumber}>{i + 1}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {allCompleted && (
        <div className={styles.complete}>
          <p>Parabens! Voce completou toda a trilha!</p>
        </div>
      )}

      {/* Question modal */}
      <BaseModal
        open={!!openQuestion}
        onClose={handleClose}
        title={openQuestion ? `Pergunta ${openQuestion.id}` : ''}
      >
        {openQuestion && (
          <div className={styles.question}>
            <p className={styles.questionText}>{openQuestion.question}</p>

            <div className={styles.options}>
              {openQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.option} ${
                    selectedOption === i ? styles.optionSelected : ''
                  } ${
                    feedback === 'correct' && i === openQuestion.correctIndex
                      ? styles.optionCorrect
                      : ''
                  } ${
                    feedback === 'wrong' && selectedOption === i
                      ? styles.optionWrong
                      : ''
                  }`}
                  onClick={() => {
                    if (!feedback) setSelectedOption(i);
                  }}
                  disabled={feedback === 'correct'}
                >
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            {feedback === 'wrong' && (
              <p className={styles.feedbackWrong}>
                Resposta incorreta. Tente novamente!
              </p>
            )}

            {feedback === 'correct' && (
              <div className={styles.feedbackCorrect}>
                <p>Correto!</p>
                <p className={styles.explanation}>{openQuestion.explanation}</p>
              </div>
            )}

            {!feedback && (
              <button
                className={styles.confirm}
                onClick={handleConfirm}
                disabled={selectedOption === null}
              >
                Confirmar resposta
              </button>
            )}

            {feedback === 'wrong' && (
              <button
                className={styles.confirm}
                onClick={() => {
                  setFeedback(null);
                  setSelectedOption(null);
                }}
              >
                Tentar novamente
              </button>
            )}
          </div>
        )}
      </BaseModal>
    </div>
  );
}
