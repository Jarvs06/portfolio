import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useReveal } from './hooks/useReveal.js';
import { useParallax } from './hooks/useParallax.js';

export default function App() {
  const { theme, toggle } = useTheme();
  useReveal();
  useParallax();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
