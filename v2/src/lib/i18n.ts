import type { L10n, Locale } from '../content/types';

export const htmlLang: Record<Locale, string> = { en: 'en-IN', hi: 'hi-IN' };

/** Pick the string for a locale. */
export function t(value: L10n, locale: Locale): string {
  return value[locale];
}

/** Build a site path for a locale. `path` is locale-neutral, e.g. "/work/mudkraft/". */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? clean : `/hi${clean === '/' ? '/' : clean}`;
}

/** Strip a locale prefix, returning the locale-neutral path. */
export function neutralPath(pathname: string): string {
  if (pathname === '/hi' || pathname === '/hi/') return '/';
  return pathname.startsWith('/hi/') ? pathname.slice(3) : pathname;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'hi' : 'en';
}

/** Fill `{key}` placeholders. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
