import { type ReactNode } from 'react';
import styles from './SectionShell.module.css';

interface SectionShellProps {
  id: string;
  children: ReactNode;
  variant?: 'default' | 'alt' | 'dark';
  className?: string;
}

export function SectionShell({ id, children, variant = 'default', className = '' }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${className}`}
    >
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}
