import { useEffect } from 'react';

/**
 * Lightweight scroll parallax — no library.
 *
 * Mark an element with `data-parallax="<speed>"`. Its CSS should use
 * `transform: translate3d(0, var(--parallax-y, 0px), 0)`.
 *
 * Modes (data-parallax-mode):
 *  - "scroll"   → offset = scrollY × speed. For hero layers; also sets
 *                 --parallax-progress (0 → 1 over the first screen) so CSS can fade.
 *  - "x"        → horizontal: sets --parallax-x from the distance to the
 *                 viewport centre. Not clamped (horizontal bands).
 *  - "progress" → sets --parallax-progress (0 → 1) as the element scrolls past
 *                 the line at 65% of the viewport height. Speed is ignored.
 *  - default    → "center": offset from the distance between the reference
 *                 element's centre and the viewport centre. Clamped to
 *                 ±(reference height × data-parallax-max, default 0.05).
 *
 * Options:
 *  - data-parallax-root="<selector>" → measure the closest matching ancestor
 *    instead of the parent. Elements sharing a root move together.
 *  - data-parallax-var="--name"     → write the offset to a different custom
 *    property, so an element and its children can each have their own parallax.
 *
 * Disabled when the visitor prefers reduced motion.
 */
export function useParallax() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let els = [];
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;

      for (const el of els) {
        const { parallax, parallaxMode: mode, parallaxRoot: root, parallaxVar, parallaxMax } = el.dataset;
        const speed = parseFloat(parallax) || 0;

        if (mode === 'scroll') {
          if (y > vh * 1.5) continue; // off screen; leave last value
          el.style.setProperty(parallaxVar || '--parallax-y', `${(y * speed).toFixed(1)}px`);
          el.style.setProperty('--parallax-progress', Math.min(y / vh, 1).toFixed(3));
          continue;
        }

        const ref = (root && el.closest(root)) || el.parentElement || el;
        const rect = ref.getBoundingClientRect();

        if (mode === 'progress') {
          const p = Math.max(0, Math.min(1, (vh * 0.65 - rect.top) / rect.height));
          el.style.setProperty(parallaxVar || '--parallax-progress', p.toFixed(4));
          continue;
        }

        if (rect.bottom < -100 || rect.top > vh + 100) continue;
        const delta = rect.top + rect.height / 2 - vh / 2;

        if (mode === 'x') {
          el.style.setProperty(parallaxVar || '--parallax-x', `${(delta * speed).toFixed(1)}px`);
          continue;
        }

        // Clamp so image edges never show inside their frames.
        const max = rect.height * (parseFloat(parallaxMax) || 0.05);
        const offset = Math.max(-max, Math.min(max, -delta * speed));
        el.style.setProperty(parallaxVar || '--parallax-y', `${offset.toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const start = () => {
      els = Array.from(document.querySelectorAll('[data-parallax]'));
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    };

    const stop = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      els.forEach((el) => {
        ['--parallax-y', '--parallax-x', '--parallax-progress', el.dataset.parallaxVar]
          .filter(Boolean)
          .forEach((prop) => el.style.removeProperty(prop));
      });
    };

    const onPrefChange = () => (mq.matches ? stop() : start());

    if (!mq.matches) start();
    mq.addEventListener('change', onPrefChange);

    return () => {
      stop();
      mq.removeEventListener('change', onPrefChange);
    };
  }, []);
}
