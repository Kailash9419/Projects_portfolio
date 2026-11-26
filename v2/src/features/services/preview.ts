import { onMotionPreferenceChange, prefersReducedMotion } from '../../runtime/motion';

/**
 * Services hover preview: a small project screenshot follows the pointer over a service row.
 * Enhancement only — the "Seen in" links carry the same information for everyone.
 * Active only with a fine pointer and motion allowed. One rAF loop, running only while visible.
 */
export function initServicePreview(section: HTMLElement): () => void {
  const box = section.querySelector<HTMLElement>('[data-preview-box]');
  const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-preview]'));
  if (!box || !rows.length) return () => {};
  const imgs = new Map(
    Array.from(box.querySelectorAll<HTMLImageElement>('[data-preview-img]')).map((img) => [img.dataset.previewImg!, img]),
  );
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let frame = 0;
  let visible = false;
  let enabled = false;

  const tick = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    box.style.setProperty('--px', `${x.toFixed(1)}px`);
    box.style.setProperty('--py', `${y.toFixed(1)}px`);
    frame = visible || Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
  };

  const target = (e: PointerEvent) => {
    // Sit to the right of and slightly above the pointer, kept inside the viewport.
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    tx = Math.min(e.clientX + 28, window.innerWidth - w - 16);
    ty = Math.min(Math.max(e.clientY - h / 2, 16), window.innerHeight - h - 16);
  };

  const onEnter = (e: PointerEvent) => {
    const slug = (e.currentTarget as HTMLElement).dataset.preview;
    if (!slug || !enabled) return;
    imgs.forEach((img, key) => img.classList.toggle('is-on', key === slug));
    target(e);
    if (!visible) {
      x = tx;
      y = ty;
    }
    visible = true;
    box.classList.add('is-on');
    if (!frame) frame = requestAnimationFrame(tick);
  };
  const onMove = (e: PointerEvent) => {
    if (visible) target(e);
    else onEnter(e); // re-show after a scroll hid it while the pointer stayed in the row
  };
  const onLeave = () => {
    visible = false;
    box.classList.remove('is-on');
  };

  const setEnabled = () => {
    enabled = fine.matches && !prefersReducedMotion();
    box.classList.toggle('is-enabled', enabled);
    if (!enabled) onLeave();
  };

  rows.forEach((r) => {
    r.addEventListener('pointerenter', onEnter);
    r.addEventListener('pointermove', onMove, { passive: true });
    r.addEventListener('pointerleave', onLeave);
  });
  // Hide on scroll so the card never floats over the wrong row.
  window.addEventListener('scroll', onLeave, { passive: true });
  fine.addEventListener('change', setEnabled);
  const offMotion = onMotionPreferenceChange(setEnabled);
  setEnabled();

  return () => {
    rows.forEach((r) => {
      r.removeEventListener('pointerenter', onEnter);
      r.removeEventListener('pointermove', onMove);
      r.removeEventListener('pointerleave', onLeave);
    });
    window.removeEventListener('scroll', onLeave);
    fine.removeEventListener('change', setEnabled);
    offMotion();
    if (frame) cancelAnimationFrame(frame);
  };
}
