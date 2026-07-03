import { Nav } from './components/layout/Nav';
import { SectionShell } from './components/layout/SectionShell';
import { MuseumTimeline } from './components/layout/MuseumTimeline';
import { ImpactBlocks } from './components/layout/ImpactBlocks';
import { ChatPanel } from './components/chat/ChatPanel';
import { QuizTrail } from './components/quiz/QuizTrail';
import { useState } from 'react';
import { AboutProject } from './components/layout/AboutProject';
import { MuralPromessas } from './components/mural/MuralPromessas';
import { BaseModal } from './components/modals/BaseModal';
import { sectionATitle, sectionAIntro, sectionAPages } from './content/pt/sectionA';
import { sectionCTitle, sectionCIntro, sectionCTabs } from './content/pt/sectionC';
import { quizTitle, quizIntro } from './content/pt/quiz';
import { aboutTitle, aboutIntro, aboutValues, aboutInstitution } from './content/pt/about';
import './theme/tokens.css';
import './theme/motifs.css';
import './theme/globals.css';

export default function App() {
  const [quizInfoOpen, setQuizInfoOpen] = useState(false);
  return (
    <>
      <Nav />

      <SectionShell id="motivacao" variant="default">
        <div className="motif-gradient-mesh" />
        <div className="motif-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header-center">
            <h1 className="section-headline">{sectionATitle}</h1>
            <p className="section-intro">{sectionAIntro}</p>
          </div>
          <MuseumTimeline items={sectionAPages} />
        </div>
        <div className="motif-waves" />
      </SectionShell>

      <SectionShell id="estimador" variant="alt">
        <div className="motif-gradient-mesh" />
        <div className="motif-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header-center">
            <h2 className="section-headline">Estimador de Agua</h2>
            <p className="section-intro">
              Escolha um dos modelos abaixo e seleciona um dos várias perguntas que podemos fazer a IA e veja uma estimativa de uso de água.
            </p>
          </div>
          <ChatPanel />
        </div>
      </SectionShell>

      <SectionShell id="impactos" variant="dark">
        <div className="motif-gradient-mesh" />
        <div className="motif-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header-center">
            <h2 className="section-headline">{sectionCTitle}</h2>
            <p className="section-intro">{sectionCIntro}</p>
          </div>
          <ImpactBlocks items={sectionCTabs} />
        </div>
        <div className="motif-waves" />
      </SectionShell>

      <SectionShell id="quiz" variant="default">
        <div className="motif-gradient-mesh" />
        <div className="motif-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header-center" style={{ position: 'relative' }}>
            <h2 className="section-headline">{quizTitle}</h2>
            <p className="section-intro">{quizIntro}</p>
            <button
              onClick={() => setQuizInfoOpen(true)}
              title="Referências do quiz"
              aria-label="Ver referências"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                fontSize: '20px',
                color: '#C87A1A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                filter: 'drop-shadow(0 0 4px rgba(200,122,26,0.4))',
                lineHeight: 1,
              }}
            >
              &#x24D8;
            </button>
          </div>
          <QuizTrail />
        </div>

        <BaseModal
          open={quizInfoOpen}
          onClose={() => setQuizInfoOpen(false)}
          title="Referências"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FAC775' }}>Furtado e Cunha (2024)</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                Inteligência artificial, data centers e colonialismo digital: Impactos socioambientais e geopolíticos a partir do Sul Global
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Parágrafo 6 — tópico "NEM INTELIGENTE, NEM ARTIFICIAL"</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FAC775' }}>Mazziero e Basigli (2025)</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                Impactos ambientais invisíveis da inteligência artificial: pegada de carbono, consumo de água e desafios regulatórios
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Parágrafo 3 — tópico "2. A PEGADA ECOLÓGICA DA INTELIGÊNCIA ARTIFICIAL"</p>
            </div>
          </div>
        </BaseModal>
      </SectionShell>

      <SectionShell id="mural" variant="alt">
        <div className="motif-gradient-mesh" />
        <div className="motif-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header-center">
            <h2 className="section-headline">Mural de Promessas</h2>
            <p className="section-intro">
              O que você vai mudar no seu uso de tecnologia depois de aprender isso?
              Cada promessa pequena, somada, faz uma diferença grande.
            </p>
          </div>
          <MuralPromessas />
        </div>
        <div className="motif-waves" />
      </SectionShell>

      <SectionShell id="quem-somos" variant="alt">
        <div className="motif-gradient-mesh" />
        <div className="motif-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header-center">
            <h2 className="section-headline">{aboutTitle}</h2>
            <p className="section-intro">{aboutIntro}</p>
          </div>
          <AboutProject values={aboutValues} institution={aboutInstitution} />
        </div>
        <div className="motif-waves" />
      </SectionShell>

      <div className="motif-bubbles" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${5 + i * 12}%`,
              bottom: `${-5 + Math.random() * 10}%`,
              ['--float-duration' as string]: `${10 + Math.random() * 8}s`,
              ['--float-delay' as string]: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
