import type { ImageMetadata } from 'astro';

export const LOCALES = ['en', 'hi'] as const;
export type Locale = (typeof LOCALES)[number];

/** A string in every supported language. */
export type L10n = Record<Locale, string>;

export type Metric = {
  value: string;
  label: L10n;
  /** false until the studio owner confirms the number with the client. */
  verified: boolean;
};

export type ProjectStatus = 'live' | 'offline';

export type Project = {
  id: string;
  slug: string;
  order: number;
  year: number;
  /** Brand name — never translated. */
  name: string;
  kind: L10n;
  tagline: L10n;
  summary: L10n;
  problem: L10n;
  build: L10n;
  delivered: L10n[];
  stack: string[];
  metrics: Metric[];
  liveUrl: string;
  status: ProjectStatus;
  cover: ImageMetadata;
  coverMobile: ImageMetadata;
  /** A deeper view of the site, used on the work wall so it doesn't repeat the hero. */
  detail: ImageMetadata;
  detailAlt: L10n;
  coverAlt: L10n;
  /** true when the cover is placeholder artwork rather than a screenshot. */
  coverIsArtwork: boolean;
  /** Accent used for the project's page and wall caption. */
  accent: string;
};
