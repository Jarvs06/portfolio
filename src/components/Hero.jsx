import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Download, MapPin, Mail } from 'lucide-react';
import { profile } from '../data/profile.js';
import { asset } from '../utils/asset.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import './Hero.css';

function RotatingFocus({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 2800);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <p className="hero__focus">
      <span className="hero__focus-label">Currently focused on</span>{' '}
      {/* Screen readers get the full list once instead of a changing word */}
      <span className="visually-hidden">{items.join(', ')}</span>
      <span className="hero__focus-window" aria-hidden="true">
        <span key={index} className="hero__focus-word">
          {items[index]}
        </span>
      </span>
    </p>
  );
}

/** Lights up the grid lines around the pointer (mouse/trackpad only). */
function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return undefined;

    const section = el.closest('section');
    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${last.x - rect.left}px`);
      el.style.setProperty('--my', `${last.y - rect.top}px`);
    };
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY };
      el.classList.add('is-lit');
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => el.classList.remove('is-lit');

    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}

export default function Hero() {
  const { availability, links, location, portrait } = profile;
  const backdropRef = useRef(null);
  useSpotlight(backdropRef);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* Layer 1 — line grid, drifts slowest */}
      <div
        ref={backdropRef}
        className="hero__backdrop"
        data-parallax="0.4"
        data-parallax-mode="scroll"
        aria-hidden="true"
      >
        <div className="hero__spotlight" />
      </div>

      {/* Layer 2 — text and meta strip */}
      <div className="container hero__container hero__parallax" data-parallax="0.18" data-parallax-mode="scroll">
        <div className={`hero__layout ${portrait?.src ? 'hero__layout--portrait' : ''}`}>
          <div className="hero__body">
            <p className="hero__hello hero__in" style={{ '--i': 0 }}>
              Hello, I&rsquo;m
            </p>
            <h1 className="hero__name hero__in" id="hero-title" style={{ '--i': 1 }}>
              {profile.name}.
            </h1>
            <p className="hero__title hero__in" style={{ '--i': 2 }}>
              {profile.title}.
            </p>
            <p className="hero__intro hero__in" style={{ '--i': 3 }}>
              {profile.intro}
            </p>

            {profile.focusAreas?.length ? (
              <div className="hero__in" style={{ '--i': 4 }}>
                <RotatingFocus items={profile.focusAreas} />
              </div>
            ) : null}

            <div className="hero__cta hero__in" style={{ '--i': 5 }}>
              <a href="#projects" className="btn btn--primary">
                Explore My Work
                <ArrowDown aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn--secondary">
                <Mail aria-hidden="true" />
                Get In Touch
              </a>
              {links.resume ? (
                <a href={asset(links.resume)} className="btn btn--ghost" download>
                  <Download aria-hidden="true" />
                  Download CV
                </a>
              ) : null}
            </div>
          </div>

          {/* Layer 3 — portrait. Moves against the text layer so it reads as closest. */}
          {portrait?.src ? (
            <div className="hero__portrait hero__in" style={{ '--i': 2 }}>
              <div className="hero__portrait-layer" data-parallax="-0.1" data-parallax-mode="scroll">
                <div
                  className="hero__portrait-panel"
                  data-parallax="0.12"
                  data-parallax-mode="scroll"
                  aria-hidden="true"
                />
                <img
                  className="hero__portrait-img"
                  src={asset(portrait.src)}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  fetchpriority="high"
                  decoding="async"
                />
                {profile.portraitBadges?.map((label, i) => (
                  <span
                    key={label}
                    className={`hero__badge hero__badge--${i + 1}`}
                    data-parallax={['-0.22', '-0.08', '-0.32'][i % 3]}
                    data-parallax-mode="scroll"
                    aria-hidden="true"
                  >
                    <span className="hero__badge-dot" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <ul className="hero__meta hero__in" style={{ '--i': 6 }} aria-label="Quick facts">
          {availability?.show ? (
            <li className="hero__meta-item">
              <span
                className={`status-dot ${availability.available ? 'status-dot--on' : ''}`}
                aria-hidden="true"
              />
              {availability.label}
            </li>
          ) : null}
          <li className="hero__meta-item">
            <MapPin size={16} aria-hidden="true" />
            Based in {location}
          </li>
          {links.github ? (
            <li className="hero__meta-item">
              <a className="hero__meta-link" href={links.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon width={16} height={16} />
                GitHub
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ) : null}
          {links.linkedin ? (
            <li className="hero__meta-item">
              <a className="hero__meta-link" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon width={16} height={16} />
                LinkedIn
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
