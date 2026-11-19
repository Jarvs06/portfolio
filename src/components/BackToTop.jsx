import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Floating button that appears after the visitor scrolls past the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#home"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </a>
  );
}
