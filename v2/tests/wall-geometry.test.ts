import { describe, expect, it } from 'vitest';
import {
  approach, computeGeometry, fitPanel, panelPosition, pickSource, restScrollFor, sliceAngleFor, smoothstep,
} from '../src/features/work/wall-geometry';

describe('computeGeometry', () => {
  const g = computeGeometry(800, 500, 14);
  it('derives radius and perspective from width', () => {
    expect(g.radius).toBeCloseTo(1640);
    expect(g.perspective).toBeCloseTo(1558);
  });
  it('slices cover the panel width', () => {
    expect(g.sliceAngle * g.slices * g.radius).toBeCloseTo(800);
    expect(g.sliceWidth).toBeGreaterThan(800 / 14);
  });
  it('rejects empty sizes', () => {
    expect(() => computeGeometry(0, 10)).toThrow();
  });
  it('centres panel 0 on angle 0', () => {
    const first = sliceAngleFor(g, 0, 0);
    const last = sliceAngleFor(g, 0, g.slices - 1);
    expect(first + last).toBeCloseTo(0);
  });
  it('places panel i one step further round', () => {
    expect(sliceAngleFor(g, 1, 3) - sliceAngleFor(g, 0, 3)).toBeCloseTo(-g.step);
  });
});

describe('scroll mapping', () => {
  it('rests at each panel', () => {
    expect(panelPosition(0, 0, 300, 4)).toBe(0);
    expect(panelPosition(100, 0, 300, 4)).toBeCloseTo(1);
    expect(panelPosition(300, 0, 300, 4)).toBe(3);
  });
  it('holds still during the rest window', () => {
    expect(panelPosition(10, 0, 300, 4)).toBe(0); // f = 0.1 < 0.18
  });
  it('is monotonic', () => {
    let last = -1;
    for (let s = -50; s <= 350; s += 5) {
      const p = panelPosition(s, 0, 300, 4);
      expect(p).toBeGreaterThanOrEqual(last);
      last = p;
    }
  });
  it('restScrollFor inverts panelPosition', () => {
    for (let i = 0; i < 4; i++) {
      expect(panelPosition(restScrollFor(i, 120, 600, 4), 120, 600, 4)).toBeCloseTo(i);
    }
  });
  it('handles a single project', () => {
    expect(panelPosition(500, 0, 300, 1)).toBe(0);
  });
});

describe('helpers', () => {
  it('smoothstep endpoints', () => {
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(1)).toBe(1);
    expect(smoothstep(0.5)).toBe(0.5);
  });
  it('approach converges and snaps', () => {
    let v = 0;
    for (let i = 0; i < 200; i++) v = approach(v, 1);
    expect(v).toBe(1);
  });
  it('pickSource picks the smallest sufficient candidate', () => {
    const c = [{ w: 1440 }, { w: 800 }, { w: 1200 }];
    expect(pickSource(c, 900)?.w).toBe(1200);
    expect(pickSource(c, 3000)?.w).toBe(1440);
    expect(pickSource([], 10)).toBeUndefined();
  });
  it('fitPanel respects width and height limits', () => {
    expect(fitPanel(1440, 700).width).toBeLessThanOrEqual(720);
    expect(fitPanel(1440, 400).height).toBeLessThanOrEqual(240);
  });
});
