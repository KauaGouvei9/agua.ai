import styles from './MuseumTimeline.module.css';

interface TimelineItem {
  title: string;
  body: string;
}

interface MuseumTimelineProps {
  items: TimelineItem[];
}

export function MuseumTimeline({ items }: MuseumTimelineProps) {
  return (
    <div className={styles.timeline}>
      <div className={styles.line} aria-hidden="true" />
      {items.map((item, i) => (
        <article
          key={i}
          className={`${styles.card} ${i % 2 === 0 ? styles.cardLeft : styles.cardRight}`}
          style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}
        >
          <div className={styles.marker} aria-hidden="true">
            <span className={styles.markerDot} />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
