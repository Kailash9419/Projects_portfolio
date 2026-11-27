import { describe, expect, it, vi } from 'vitest';
vi.mock('../src/assets/projects/level-40-wellness-desktop.png', () => ({ default: {} }));
import { LOCALES } from '../src/content/types';
import { site } from '../src/content/site';

// Walk every L10n record in site copy and make sure no locale is missing or empty.
function walk(node: unknown, path: string, out: string[]) {
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`, out));
  if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    if (keys.length && keys.every((k) => (LOCALES as readonly string[]).includes(k))) {
      for (const l of LOCALES) if (!(node as Record<string, string>)[l]?.trim()) out.push(`${path}.${l}`);
      return;
    }
    for (const k of keys) walk((node as Record<string, unknown>)[k], `${path}.${k}`, out);
  }
}

describe('site copy', () => {
  it('has every string in every locale', () => {
    const missing: string[] = [];
    walk(site, 'site', missing);
    expect(missing).toEqual([]);
  });
});
