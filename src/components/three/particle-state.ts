/**
 * Shared, mutable state between the DOM (GSAP ScrollTriggers) and the
 * particle field's render loop. A module singleton avoids React re-renders
 * on every scroll tick.
 *
 * stage: 0 = DEVLABS wordmark, 1–4 = service icons, 5 = dispersed starfield.
 */
export const particleState = {
  stage: 0,
  /** 0 = hero layout (centred), 1 = services layout (shape sits to the right on desktop) */
  layout: 0,
  /** overall visibility multiplier (0–1), faded out past the services section */
  presence: 1,
  /** false until the visitor moves a mouse or touches the screen */
  pointerActive: false,
  /** pointer in normalised device coords (-1..1, y up), tracked for mouse and touch alike */
  px: 0,
  py: 0,
};

export const STAGES = 6;
