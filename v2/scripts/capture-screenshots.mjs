// Captures clean desktop (1440×900) + mobile (390×844 @2x) screenshots of each live project.
// Popups (newsletter modals, cookie banners) are closed or removed before the shot, so the
// showcase shows the product, not an interruption.
// Usage: npm run shots [slug]      (set CHROME=path to override the browser binary)
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projects = {
  'level-40-wellness': 'https://level40wellness.com',
  mudkraft: 'https://mudkraft.com',
  'valley-of-birds': 'https://valleyofbird.vercel.app',
  'bharat-laundry': 'https://bharat-laundary.vercel.app',
};
// How far to scroll for the second ("detail") view used on the work wall.
const detailScroll = { 'bharat-laundry': 1640 };
const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => existsSync(p));
if (!chrome) throw new Error('No Chrome/Edge found. Set CHROME=/path/to/chrome');

const out = resolve('src/assets/projects');
mkdirSync(out, { recursive: true });
const only = process.argv[2];
const sizes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

async function clearInterruptions(page) {
  await page.keyboard.press('Escape').catch(() => {});
  // Click obvious close buttons inside dialogs.
  for (const sel of ['[role="dialog"] button[aria-label*="lose" i]', '[aria-modal="true"] button[aria-label*="lose" i]', 'button:has-text("No thanks")']) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible().catch(() => false)) await btn.click({ timeout: 1000 }).catch(() => {});
  }
  // Remove anything still covering a large part of the viewport.
  await page.evaluate(() => {
    const vw = innerWidth;
    const vh = innerHeight;
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' && !el.matches('[role="dialog"],[aria-modal="true"],dialog[open]')) continue;
      const r = el.getBoundingClientRect();
      const covers = (r.width * r.height) / (vw * vh) > 0.3;
      if (covers || el.matches('[role="dialog"],[aria-modal="true"],dialog[open]')) el.remove();
    }
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  });
  await page.waitForTimeout(400);
}

const browser = await chromium.launch({ executablePath: chrome });
for (const [slug, url] of Object.entries(projects)) {
  if (only && only !== slug) continue;
  for (const [name, opts] of Object.entries(sizes)) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    console.log(`→ ${slug} ${name}`);
    const res = await page.goto(url, { waitUntil: 'load', timeout: 45000 }).catch((e) => (console.warn(`  ${e.message}`), null));
    if (!res || !res.ok()) {
      console.warn(`  skipped: ${res ? res.status() : 'no response'} (keep the existing image)`);
      await ctx.close();
      continue;
    }
    await page.waitForTimeout(5000); // let intro animations and delayed popups appear
    await clearInterruptions(page);
    await page.screenshot({ path: resolve(out, `${slug}-${name}.png`) });
    if (name === 'desktop') {
      // A second, deeper view for the work wall, so it doesn't repeat the hero.
      await page.mouse.wheel(0, detailScroll[slug] ?? 1100);
      await page.waitForTimeout(2500);
      await clearInterruptions(page);
      await page.screenshot({ path: resolve(out, `${slug}-detail.png`) });
    }
    await ctx.close();
  }
}
await browser.close();
