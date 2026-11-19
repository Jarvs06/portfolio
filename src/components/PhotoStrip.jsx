import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { asset } from '../utils/asset.js';
import './PhotoStrip.css';

/**
 * Horizontally scrollable photo strip.
 * Scroll with trackpad/touch, the arrow buttons, mouse drag, or the
 * keyboard (focus the strip, then ← / →). Photos snap into place, and each
 * image shifts slightly inside its frame as the strip moves (horizontal parallax).
 */
export default function PhotoStrip({ photos, label = 'Photos' }) {
  const stripRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  // Edge state + horizontal parallax for each image.
  const update = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const max = strip.scrollWidth - strip.clientWidth;
    setEdges({ start: strip.scrollLeft <= 2, end: strip.scrollLeft >= max - 2 });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = strip.getBoundingClientRect();
    const center = box.left + box.width / 2;
    strip.querySelectorAll('.photo-strip__item').forEach((item) => {
      const r = item.getBoundingClientRect();
      const delta = r.left + r.width / 2 - center;
      const limit = r.width * 0.05; // stays inside the image's zoom margin
      const x = Math.max(-limit, Math.min(limit, -delta * 0.12));
      item.querySelector('img')?.style.setProperty('--strip-x', `${x.toFixed(1)}px`);
    });
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
    };
    update();
    strip.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      strip.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [update]);

  const step = (dir) => {
    const strip = stripRef.current;
    const item = strip?.querySelector('.photo-strip__item');
    if (!strip || !item) return;
    const gap = parseFloat(getComputedStyle(item.parentElement).columnGap) || 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    strip.scrollBy({ left: dir * (item.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' });
  };

  // Click-and-drag with a mouse (touch and trackpads already scroll natively).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: stripRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      stripRef.current.setPointerCapture(e.pointerId);
    }
    if (d.moved) stripRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false); // re-enables snapping, which settles on the nearest photo
  };

  if (!photos?.length) return null;

  return (
    <div className={`photo-strip ${edges.start ? 'is-start' : ''} ${edges.end ? 'is-end' : ''}`}>
      <div
        ref={stripRef}
        className={`photo-strip__track ${dragging ? 'is-dragging' : ''}`}
        role="region"
        aria-label={`${label} — scroll horizontally`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <ul className="photo-strip__list">
        {photos.map((photo) => (
          <li key={photo.src} className="photo-strip__item">
            <img
              className="parallax-img"
              data-parallax="0.06"
              src={asset(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              draggable="false"
              onLoad={update}
            />
          </li>
        ))}
        </ul>
      </div>

      {photos.length > 1 ? (
        <div className="photo-strip__controls">
          <button
            type="button"
            className="photo-strip__btn"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="Previous photo"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="photo-strip__btn"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="Next photo"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
