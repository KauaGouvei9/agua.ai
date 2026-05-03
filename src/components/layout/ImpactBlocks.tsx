import styles from './ImpactBlocks.module.css';

interface ImpactItem {
  label: string;
  title: string;
  body: string;
  visual?: {
    type: string;
    caption: string;
    items: string[];
  };
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
              {item.visual?.type === 'flow' ? (
                <div className={styles.visualCard}>
                  <div className={styles.flowVisual} aria-hidden="true">
                    <span className={`${styles.flowToken} ${styles.flowTopLeft}`}>
                      {item.visual.items[0]}
                    </span>
                    <span className={`${styles.flowToken} ${styles.flowTopRight}`}>
                      {item.visual.items[1]}
                    </span>
                    <span className={`${styles.flowToken} ${styles.flowBottomLeft}`}>
                      {item.visual.items[2]}
                    </span>
                    <span className={`${styles.flowToken} ${styles.flowBottomRight}`}>
                      {item.visual.items[3]}
                    </span>
                    <div className={styles.flowDroplet} aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        className={styles.flowDropletIcon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3.25C12 3.25 6 10.1 6 14.25C6 17.56 8.69 20.25 12 20.25C15.31 20.25 18 17.56 18 14.25C18 10.1 12 3.25 12 3.25Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={`${styles.flowLine} ${styles.flowLineTopLeft}`} />
                    <span className={`${styles.flowLine} ${styles.flowLineTopRight}`} />
                    <span className={`${styles.flowLine} ${styles.flowLineBottomLeft}`} />
                    <span className={`${styles.flowLine} ${styles.flowLineBottomRight}`} />
                  </div>
                  <p className={styles.visualCaption}>{item.visual.caption}</p>
                </div>
              ) : item.visual?.type === 'trend' ? (
                <div className={styles.visualCard}>
                  <div className={styles.trendVisual} aria-hidden="true">
                    <svg
                      viewBox="0 0 220 120"
                      className={styles.trendIcon}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 92 L74 66 L114 76 L176 26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M154 26 H176 V48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item.visual.items.map((visualItem, index) => (
                      <div
                        key={visualItem}
                        className={`${styles.trendItem} ${styles[`trend${index + 1}` as keyof typeof styles]}`}
                      >
                        <span className={styles.trendBubble}>{index + 1}</span>
                        <span className={styles.trendLabel}>{visualItem}</span>
                      </div>
                    ))}
                  </div>
                  <p className={styles.visualCaption}>{item.visual.caption}</p>
                </div>
              ) : item.visual?.type === 'ecosystem' ? (
                <div className={styles.visualCard}>
                  <div className={styles.ecosystemVisual} aria-hidden="true">
                    <span className={`${styles.ecosystemToken} ${styles.ecosystemTopLeft}`}>
                      {item.visual.items[0]}
                    </span>
                    <span className={`${styles.ecosystemToken} ${styles.ecosystemTopRight}`}>
                      {item.visual.items[1]}
                    </span>
                    <span className={`${styles.ecosystemToken} ${styles.ecosystemBottomLeft}`}>
                      {item.visual.items[2]}
                    </span>
                    <span className={`${styles.ecosystemToken} ${styles.ecosystemBottomRight}`}>
                      {item.visual.items[3]}
                    </span>
                    <div className={styles.ecosystemCore}>
                      <svg
                        viewBox="0 0 64 64"
                        className={styles.ecosystemIcon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 41c5-9 14-14 28-16-3 11-10 18-22 21"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 45c7-1 12-5 16-12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 50c7-4 14-4 21 0s14 4 21 0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={`${styles.ecosystemLine} ${styles.ecosystemLineTopLeft}`} />
                    <span className={`${styles.ecosystemLine} ${styles.ecosystemLineTopRight}`} />
                    <span className={`${styles.ecosystemLine} ${styles.ecosystemLineBottomLeft}`} />
                    <span className={`${styles.ecosystemLine} ${styles.ecosystemLineBottomRight}`} />
                  </div>
                  <p className={styles.visualCaption}>{item.visual.caption}</p>
                </div>
              ) : item.visual?.type === 'community' ? (
                <div className={styles.visualCard}>
                  <div className={styles.communityVisual} aria-hidden="true">
                    <span className={`${styles.communityToken} ${styles.communityTopLeft}`}>
                      {item.visual.items[0]}
                    </span>
                    <span className={`${styles.communityToken} ${styles.communityTopRight}`}>
                      {item.visual.items[1]}
                    </span>
                    <span className={`${styles.communityToken} ${styles.communityBottomLeft}`}>
                      {item.visual.items[2]}
                    </span>
                    <span className={`${styles.communityToken} ${styles.communityBottomRight}`}>
                      {item.visual.items[3]}
                    </span>
                    <div className={styles.communityCore}>
                      <svg
                        viewBox="0 0 96 72"
                        className={styles.communityIcon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 55h76"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 55V35l14-10 14 10v20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M52 55V25h24v30"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M28 41h8M60 35h8M60 43h8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="38" cy="49" r="3" fill="currentColor" />
                        <circle cx="64" cy="49" r="3" fill="currentColor" />
                      </svg>
                    </div>
                    <span className={`${styles.communityLine} ${styles.communityLineTopLeft}`} />
                    <span className={`${styles.communityLine} ${styles.communityLineTopRight}`} />
                    <span className={`${styles.communityLine} ${styles.communityLineBottomLeft}`} />
                    <span className={`${styles.communityLine} ${styles.communityLineBottomRight}`} />
                  </div>
                  <p className={styles.visualCaption}>{item.visual.caption}</p>
                </div>
              ) : item.visual?.type === 'transparency' ? (
                <div className={styles.visualCard}>
                  <div className={styles.transparencyVisual} aria-hidden="true">
                    <span className={`${styles.transparencyToken} ${styles.transparencyTopLeft}`}>
                      {item.visual.items[0]}
                    </span>
                    <span className={`${styles.transparencyToken} ${styles.transparencyTopRight}`}>
                      {item.visual.items[1]}
                    </span>
                    <span className={`${styles.transparencyToken} ${styles.transparencyBottomLeft}`}>
                      {item.visual.items[2]}
                    </span>
                    <span className={`${styles.transparencyToken} ${styles.transparencyBottomRight}`}>
                      {item.visual.items[3]}
                    </span>
                    <div className={styles.transparencyCore}>
                      <svg
                        viewBox="0 0 96 96"
                        className={styles.transparencyIcon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="20"
                          y="18"
                          width="38"
                          height="52"
                          rx="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M28 34h20M28 46h16M28 58h12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="66"
                          cy="62"
                          r="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M74 72l8 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M61 62l3 3 6-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={`${styles.transparencyLine} ${styles.transparencyLineTopLeft}`} />
                    <span className={`${styles.transparencyLine} ${styles.transparencyLineTopRight}`} />
                    <span className={`${styles.transparencyLine} ${styles.transparencyLineBottomLeft}`} />
                    <span className={`${styles.transparencyLine} ${styles.transparencyLineBottomRight}`} />
                  </div>
                  <p className={styles.visualCaption}>{item.visual.caption}</p>
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
