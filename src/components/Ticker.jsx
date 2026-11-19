import { tickerWords } from '../data/skills.js';
import './Ticker.css';

function Row({ words, outline, speed }) {
  // Repeat the list so the row is always wider than the screen.
  const items = [...words, ...words, ...words];
  return (
    <div className="ticker__track">
      <div
        className={`ticker__row ${outline ? 'ticker__row--outline' : ''}`}
        data-parallax={speed}
        data-parallax-mode="x"
      >
        {items.map((word, i) => (
          <span className="ticker__item" key={`${word}-${i}`}>
            {word}
            <span className="ticker__sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Decorative band of large type that slides sideways as the page scrolls. */
export default function Ticker() {
  if (!tickerWords?.length) return null;
  const reversed = [...tickerWords].reverse();

  return (
    <div className="ticker" aria-hidden="true">
      <Row words={tickerWords} speed="0.45" />
      <Row words={reversed} speed="-0.45" outline />
    </div>
  );
}
