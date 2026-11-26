/**
 * Pure geometry + scroll mapping for the cylindrical work wall (signature S2).
 * No DOM access here, so it can be unit-tested. Pattern documented in the Bible's
 * case study; this is an original implementation.
 */

export type WallGeometry = {
  /** Panel width and height in px. */
  width: number;
  height: number;
  /** Cylinder radius in px. */
  radius: number;
  slices: number;
  /** Angle covered by one slice (radians). */
  sliceAngle: number;
  /** Angle between neighbouring panel centres (radians). */
  step: number;
  /** Rendered slice width in px (slightly overlapped to hide seams). */
  sliceWidth: number;
  /** CSS perspective for the view. */
  perspective: number;
};

export const DEFAULT_SLICES = 14;
const GAP_PX = 34;
const SEAM_OVERLAP_PX = 1.2;

export function computeGeometry(width: number, height: number, slices = DEFAULT_SLICES): WallGeometry {
  if (width <= 0 || height <= 0) throw new Error('Wall size must be positive');
  const radius = width * 2.05;
  const sliceAngle = width / slices / radius;
  const gap = GAP_PX / radius;
  const step = width / radius + gap;
  const sliceWidth = 2 * radius * Math.tan(sliceAngle / 2) + SEAM_OVERLAP_PX;
  return { width, height, radius, slices, sliceAngle, step, sliceWidth, perspective: radius * 0.95 };
}

/** Local angle (radians) of slice `k` of panel `i`. */
export function sliceAngleFor(g: WallGeometry, panel: number, k: number): number {
  return -(panel * g.step + (k + 0.5 - g.slices / 2) * g.sliceAngle);
}

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Map scroll progress to a fractional panel position in [0, count - 1].
 * Each interval rests at both ends (18% each) and turns in the middle 64%.
 */
export function panelPosition(scroll: number, start: number, length: number, count: number): number {
  if (count < 2 || length <= 0) return 0;
  const p = clamp01((scroll - start) / length) * (count - 1);
  const i = Math.min(Math.floor(p), count - 2);
  const f = p - i;
  return i + smoothstep(clamp01((f - 0.18) / 0.64));
}

/** Scroll offset at which panel `index` is at rest in front. */
export function restScrollFor(index: number, start: number, length: number, count: number): number {
  if (count < 2) return start;
  const i = Math.min(Math.max(index, 0), count - 1);
  return start + (i / (count - 1)) * length;
}

/** Move `current` towards `target`; snaps when close enough. */
export function approach(current: number, target: number, rate = 0.14, epsilon = 0.0004): number {
  const next = current + (target - current) * rate;
  return Math.abs(target - next) < epsilon ? target : next;
}

/** Pick the smallest candidate at least `needed` px wide (largest if none is). */
export function pickSource<T extends { w: number }>(candidates: T[], needed: number): T | undefined {
  const sorted = [...candidates].sort((a, b) => a.w - b.w);
  return sorted.find((c) => c.w >= needed) ?? sorted[sorted.length - 1];
}

/** Panel size that fits the stage: half the width, capped by ~60% of the height. */
export function fitPanel(stageWidth: number, stageHeight: number, aspect = 1.6): { width: number; height: number } {
  const width = Math.round(Math.min(stageWidth * 0.5, stageHeight * 0.6 * aspect, 980));
  return { width, height: Math.round(width / aspect) };
}
