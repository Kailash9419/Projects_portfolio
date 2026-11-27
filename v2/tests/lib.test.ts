import { describe, expect, it } from 'vitest';
import { fill, localePath, neutralPath, otherLocale } from '../src/lib/i18n';
import { composeMessage, mailtoLink, whatsappLink } from '../src/lib/whatsapp';

describe('i18n paths', () => {
  it('prefixes Hindi only', () => {
    expect(localePath('en', '/work/mudkraft/')).toBe('/work/mudkraft/');
    expect(localePath('hi', '/work/mudkraft/')).toBe('/hi/work/mudkraft/');
    expect(localePath('hi', '/')).toBe('/hi/');
  });
  it('round-trips through neutralPath', () => {
    expect(neutralPath('/hi/')).toBe('/');
    expect(neutralPath('/hi')).toBe('/');
    expect(neutralPath('/hi/work/x/')).toBe('/work/x/');
    expect(neutralPath('/work/x/')).toBe('/work/x/');
    expect(neutralPath('/history/')).toBe('/history/');
  });
  it('swaps locale and fills templates', () => {
    expect(otherLocale('en')).toBe('hi');
    expect(fill('Hi {name}', { name: 'Asha' })).toBe('Hi Asha');
  });
});

describe('contact links', () => {
  it('builds wa.me links with encoded text', () => {
    expect(whatsappLink('+91 81685 46173', 'Hi & bye')).toBe('https://wa.me/918168546173?text=Hi%20%26%20bye');
  });
  it('builds mailto links', () => {
    expect(mailtoLink('a@b.c', 'S', 'B b')).toBe('mailto:a@b.c?subject=S&body=B%20b');
  });
  const base = {
    intro: 'Hi!', nameTemplate: "I'm {name}.", needTemplate: 'Need: {need}.', fallback: 'Let’s talk.',
    join: (x: string[]) => x.join(' and '),
  };
  it('falls back when nothing is chosen', () => {
    expect(composeMessage({ ...base, needs: [] })).toBe('Hi! Let’s talk.');
  });
  it('includes trimmed name and needs', () => {
    expect(composeMessage({ ...base, name: '  Asha ', needs: ['Store', 'Bookings'] })).toBe("Hi! I'm Asha. Need: Store and Bookings.");
  });
  it('caps the name length', () => {
    const msg = composeMessage({ ...base, name: 'x'.repeat(200), needs: [] });
    expect(msg.length).toBeLessThan(100);
  });
});
