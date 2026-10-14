import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { LazyMotion } from 'framer-motion';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import type { DialogContent, MediaKey, Project } from './types/content';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { CaseStudy } from './components/sections/CaseStudy';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { AmbientBackground } from './components/effects/AmbientBackground';
import { CursorSpotlight } from './components/effects/CursorSpotlight';
import { SmoothScroll } from './components/effects/SmoothScroll';
import { Loader } from './components/effects/Loader';

const DetailDialog = lazy(() => import('./components/dialogs/DetailDialog'));
const loadMotionFeatures = () => import('./lib/motionFeatures').then(module => module.default);

function Portfolio() {
  const { copy } = usePreferences();
  const [dialog, setDialog] = useState<DialogContent | null>(null);
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const notify = useCallback((text: string) => {
    clearTimeout(timer.current); setMessage(text);
    timer.current = setTimeout(() => setMessage(''), 3600);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const onImage = useCallback((key: MediaKey) => setDialog({ kind: 'image', key }), []);
  const onProject = useCallback((project: Project) => setDialog({ kind: 'project', project }), []);

  return <LazyMotion features={loadMotionFeatures} strict>
    <a className="skip-link" href="#main">{copy.skip}</a>
    <SmoothScroll /><AmbientBackground /><CursorSpotlight /><Loader /><div id="scroll-progress" aria-hidden="true" />
    <Header />
    <main id="main" tabIndex={-1}>
      <Hero /><Skills /><Experience /><CaseStudy onImage={onImage} />
      <Projects onImage={onImage} onProject={onProject} /><Education /><Contact notify={notify} />
    </main>
    <Footer onPrivacy={() => setDialog({ kind: 'privacy' })} />
    <Suspense fallback={null}>{dialog && <DetailDialog content={dialog} onClose={() => setDialog(null)} notify={notify} />}</Suspense>
    <div id="toast" role="status" aria-live="polite" className={message ? 'visible' : ''}>{message}</div>
  </LazyMotion>;
}

export default function App() {
  return <PreferencesProvider><Portfolio /></PreferencesProvider>;
}
