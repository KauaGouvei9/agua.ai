import styles from './AboutProject.module.css';
import logoIC from '../../assets/Logo-Instituto-de-Computacao-1.png';

interface ValueItem {
  icon: string;
  title: string;
  body: string;
}

interface Institution {
  eyebrow: string;
  title: string;
  body: string;
  linkLabel: string;
  linkUrl: string;
}

interface AboutProjectProps {
  values: ValueItem[];
  institution: Institution;
}

export function AboutProject({ values, institution }: AboutProjectProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.values}>
        {values.map((value, i) => (
          <article
            key={value.title}
            className={styles.valueCard}
            style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
          >
            <span className={styles.valueIcon} aria-hidden="true">{value.icon}</span>
            <h3 className={styles.valueTitle}>{value.title}</h3>
            <p className={styles.valueBody}>{value.body}</p>
          </article>
        ))}
      </div>

      <article className={styles.institution}>
        <div className={styles.logoWrap}>
          <img
            className={styles.logo}
            src={logoIC}
            alt="Logo do Instituto de Computação da Universidade Federal Fluminense"
            loading="lazy"
          />
        </div>
        <div className={styles.institutionText}>
          <p className={styles.eyebrow}>{institution.eyebrow}</p>
          <h3 className={styles.institutionTitle}>{institution.title}</h3>
          <p className={styles.institutionBody}>{institution.body}</p>
          <a
            className={styles.link}
            href={institution.linkUrl}
            target="_blank"
            rel="noreferrer"
          >
            {institution.linkLabel}
          </a>
        </div>
      </article>
    </div>
  );
}
