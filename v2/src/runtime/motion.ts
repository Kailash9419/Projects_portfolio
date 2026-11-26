/** Shared motion-preference service (Bible 6.4). */
const query = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export function prefersReducedMotion(): boolean {
  return query?.matches ?? false;
}

/** Subscribe to preference changes. Returns an unsubscribe function. */
export function onMotionPreferenceChange(cb: (reduced: boolean) => void): () => void {
  if (!query) return () => {};
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  query.addEventListener('change', handler);
  return () => query.removeEventListener('change', handler);
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
