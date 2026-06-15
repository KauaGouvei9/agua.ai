import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const NAV_ITEMS = [
  { id: 'motivacao', label: 'Motivação' },
  { id: 'estimador', label: 'Estimador' },
  { id: 'impactos', label: 'Seu papel' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'mural', label: 'Mural' },
  { id: 'quem-somos', label: 'Quem somos' },
];

export function Nav() {
  const [active, setActive] = useState('motivacao');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // When the page is scrolled to the bottom, the last section can never
      // reach the 120px threshold, so force it active here.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#motivacao" className={styles.logo}>
          <span className={styles.logoDroplet} aria-hidden="true" />
          <span className={styles.logoText}>Tem Agua.AI?</span>
        </a>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${active === item.id ? styles.linkActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
