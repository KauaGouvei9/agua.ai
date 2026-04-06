import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import styles from './BaseModal.module.css';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function BaseModal({ open, onClose, title, children, className = '' }: BaseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Open/close the native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
    } else {
      dialog.close();
      previousFocus.current?.focus();
    }
  }, [open]);

  // Handle native close event (e.g., Esc key)
  const handleCancel = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${className}`}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-label={title}
    >
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Fechar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </dialog>
  );
}
