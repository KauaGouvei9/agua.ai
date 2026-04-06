import { Nav } from './components/layout/Nav';
import { SectionShell } from './components/layout/SectionShell';
import { MuseumTimeline } from './components/layout/MuseumTimeline';
import { ImpactBlocks } from './components/layout/ImpactBlocks';
import { ChatPanel } from './components/chat/ChatPanel';
import { QuizTrail } from './components/quiz/QuizTrail';
import { sectionATitle, sectionAIntro, sectionAPages } from './content/pt/sectionA';
import { sectionCTitle, sectionCIntro, sectionCTabs } from './content/pt/sectionC';
import { quizTitle, quizIntro } from './content/pt/quiz';
import './theme/tokens.css';
import './theme/motifs.css';
import './theme/globals.css';

export default function App() {
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
              tbd
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
          <div className="section-header-center">
            <h2 className="section-headline">{quizTitle}</h2>
            <p className="section-intro">{quizIntro}</p>
          </div>
          <QuizTrail />
        </div>
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
