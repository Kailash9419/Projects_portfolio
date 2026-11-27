/**
 * Sticky phone (signature S3): the step crossing the middle of the viewport sets
 * data-screen on the phone, and CSS moves the illustrated app into that state
 * (new-order banner → price sheet → delivered + WhatsApp → UPI received).
 * Without JS the steps are all fully visible text and the phone shows step 1.
 */
export function initPhone(section: HTMLElement): () => void {
  const phone = section.querySelector<HTMLElement>('[data-phone]');
  const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
  if (!phone || !steps.length || !('IntersectionObserver' in window)) return () => {};

  section.classList.add('is-enhanced');
  let current = -1;
  const show = (i: number) => {
    if (i === current) return;
    current = i;
    phone.dataset.screen = String(i);
    steps.forEach((s, j) => s.classList.toggle('is-current', j === i));
  };
  show(0);

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) show(Number((e.target as HTMLElement).dataset.step));
      }
    },
    // A thin band across the middle of the viewport.
    { rootMargin: '-45% 0px -45% 0px' },
  );
  steps.forEach((s) => io.observe(s));

  return () => {
    io.disconnect();
    section.classList.remove('is-enhanced');
  };
}
