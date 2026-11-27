import { prefersReducedMotion } from './motion';

/**
 * Opt-in entrance reveals. Content is visible by default (no-JS, reduced motion);
 * this only hides elements once we know we can reveal them again.
 */
export function initReveals(root: ParentNode = document): () => void {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return () => {};

  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));
  // Anything already above the fold reveals immediately.
  requestAnimationFrame(() => {
    for (const el of items) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
    }
  });
  return () => io.disconnect();
}
