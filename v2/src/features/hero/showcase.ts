import { onMotionPreferenceChange, prefersReducedMotion } from '../../runtime/motion';

/**
 * Hero showcase (signature S1): cycles live project screenshots.
 *
 * States: stopped (reduced motion or user pressed pause) | auto | auto+paused (hover,
 * focus, offscreen, hidden tab). Timing comes from the CSS fill animation on the active
 * progress bar, so the bar and the slide change can never drift apart.
 * Only the active slide and the next one are rendered, so later images load just in time.
 * WCAG 2.2.2: a visible pause/play button stops the movement.
 */
export function initShowcase(root: HTMLElement): () => void {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  const caps = Array.from(root.querySelectorAll<HTMLElement>('[data-cap]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-goto]'));
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  if (slides.length < 2 || !toggle) return () => {};

  let current = 0;
  let stopped = prefersReducedMotion();
  const holds = new Set<string>(); // reasons to pause temporarily

  const prepare = (i: number) => slides[i]?.classList.add('is-ready');

  const show = (i: number) => {
    const next = (i + slides.length) % slides.length;
    if (next === current) return;
    slides.forEach((s, j) => {
      const on = j === next;
      s.classList.toggle('is-on', on);
      // Keep the outgoing slide rendered so it can fade out under the new one.
      s.classList.toggle('is-ready', j === current);
      if (on) {
        s.removeAttribute('aria-hidden');
        s.removeAttribute('tabindex');
      } else {
        s.setAttribute('aria-hidden', 'true');
        s.setAttribute('tabindex', '-1');
      }
    });
    caps.forEach((c, j) => c.classList.toggle('is-on', j === next));
    dots.forEach((d, j) => d.setAttribute('aria-pressed', String(j === next)));
    current = next;
    restartFill();
    prepare((current + 1) % slides.length);
  };

  // Restart the CSS fill animation on the newly active bar.
  const restartFill = () => {
    root.classList.remove('is-auto');
    void root.offsetWidth;
    sync();
  };

  const sync = () => {
    const auto = !stopped && !prefersReducedMotion();
    root.classList.toggle('is-auto', auto);
    root.classList.toggle('is-paused', auto && holds.size > 0);
    root.classList.toggle('is-stopped', !auto);
    const label = auto ? toggle.dataset.labelPause : toggle.dataset.labelPlay;
    if (label) toggle.setAttribute('aria-label', label);
  };

  const onFillEnd = (e: AnimationEvent) => {
    if (e.animationName !== 'fill' || stopped || prefersReducedMotion()) return;
    const dot = (e.target as HTMLElement).closest('[data-goto]');
    if (dot && dot.getAttribute('aria-pressed') === 'true') show(current + 1);
  };

  const onDot = (e: MouseEvent) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-goto]');
    if (!btn) return;
    const i = Number(btn.dataset.goto);
    prepare(i);
    show(i);
  };

  const onToggle = () => {
    stopped = !stopped;
    sync();
  };

  const hold = (reason: string, on: boolean) => {
    if (on) holds.add(reason);
    else holds.delete(reason);
    sync();
  };
  const onEnter = () => hold('hover', true);
  const onLeave = () => hold('hover', false);
  const onFocusIn = () => hold('focus', true);
  const onFocusOut = (e: FocusEvent) => {
    if (!root.contains(e.relatedTarget as Node)) hold('focus', false);
  };
  const onVisibility = () => hold('hidden', document.hidden);
  const io = new IntersectionObserver(([entry]) => hold('offscreen', !entry?.isIntersecting));

  toggle.hidden = false;
  prepare(1);
  sync();

  root.addEventListener('animationend', onFillEnd);
  root.addEventListener('click', onDot);
  toggle.addEventListener('click', onToggle);
  root.addEventListener('pointerenter', onEnter);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('focusout', onFocusOut);
  document.addEventListener('visibilitychange', onVisibility);
  io.observe(root);
  const offMotion = onMotionPreferenceChange(() => sync());

  return () => {
    root.removeEventListener('animationend', onFillEnd);
    root.removeEventListener('click', onDot);
    toggle.removeEventListener('click', onToggle);
    root.removeEventListener('pointerenter', onEnter);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('focusin', onFocusIn);
    root.removeEventListener('focusout', onFocusOut);
    document.removeEventListener('visibilitychange', onVisibility);
    io.disconnect();
    offMotion();
  };
}
