import styles from './ImpactBlocks.module.css';

interface ImpactItem {
  label: string;
  title: string;
  body: string;
}

interface ImpactBlocksProps {
  items: ImpactItem[];
}

const ACCENT_VARS: Array<{ hue: string; glow: string }> = [
  { hue: '195, 100%, 43%', glow: 'rgba(0, 180, 216, 0.15)' },       // cyan — Escassez
  { hue: '35, 100%, 62%',  glow: 'rgba(255, 174, 66, 0.12)' },      // amber — Crescimento
  { hue: '160, 84%, 39%',  glow: 'rgba(6, 214, 160, 0.12)' },       // green — Meio ambiente
  { hue: '340, 82%, 65%',  glow: 'rgba(230, 80, 120, 0.12)' },      // rose — Comunidades
  { hue: '260, 60%, 65%',  glow: 'rgba(140, 100, 210, 0.12)' },     // violet — Transparencia
];

export function ImpactBlocks({ items }: ImpactBlocksProps) {
  return (
    <div className={styles.blocks}>
      {items.map((item, i) => {
        const accent = ACCENT_VARS[i % ACCENT_VARS.length];
        const isEven = i % 2 === 0;

        return (
          <article
            key={i}
            className={`${styles.block} ${isEven ? styles.blockNormal : styles.blockFlipped}`}
            style={{
              '--accent-hsl': accent.hue,
              '--accent-glow': accent.glow,
              '--reveal-delay': `${i * 0.06}s`,
            } as React.CSSProperties}
          >
            {/* Background decoration */}
            <div className={styles.bgShape} aria-hidden="true" />

            {/* Label column */}
            <div className={styles.numberCol} aria-hidden="true">
              <span className={styles.label}>{item.label}</span>
            </div>

            {/* Text content */}
            <div className={styles.textCol}>
              <div className={styles.accentBar} aria-hidden="true" />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
