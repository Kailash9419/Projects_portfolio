// Visual QA helper: screenshots key states with the system Chrome.
// Usage: node tests/e2e/shoot.mjs [baseUrl] [outDir]
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
const base = process.argv[2] ?? 'http://localhost:4322';
const out = process.argv[3] ?? 'qa-shots';
mkdirSync(out, { recursive: true });
const exe = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome'].filter(Boolean).find((p) => existsSync(p));
const browser = await chromium.launch({ executablePath: exe });
const errors = [];

async function page(opts) {
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  p.on('console', (m) => m.type() === 'error' && errors.push(`${opts.label}: ${m.text()}`));
  p.on('pageerror', (e) => errors.push(`${opts.label}: ${e.message}`));
  p.on('requestfailed', (r) => errors.push(`${opts.label}: FAILED ${r.url()}`));
  p.on('response', (r) => r.status() >= 400 && errors.push(`${opts.label}: ${r.status()} ${r.url()}`));
  return p;
}
const settle = (p, ms = 700) => p.waitForTimeout(ms);
async function scrollToSel(p, sel, extra = 0) {
  await p.evaluate(([s, e]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + e); }, [sel, extra]);
}

// Desktop
const d = await page({ viewport: { width: 1440, height: 900 }, label: 'desktop' });
await d.goto(base + '/', { waitUntil: 'networkidle' });
await d.mouse.move(900, 380); await settle(d);
await d.screenshot({ path: `${out}/d-hero.png` });
await scrollToSel(d, '#services-title', -120); await settle(d);
await d.screenshot({ path: `${out}/d-services.png` });
for (const [i, frac] of [[0, 0], [1, 0.333], [2, 0.5], [3, 1]]) {
  await d.evaluate((f) => { const el = document.querySelector('[data-work-scroll]'); const top = el.getBoundingClientRect().top + scrollY - 72; const len = el.offsetHeight - (innerHeight - 72); window.scrollTo(0, top + len * f); }, frac);
  await settle(d, 1200);
  await d.screenshot({ path: `${out}/d-work-${i}.png` });
}
await scrollToSel(d, '[data-step="1"]', -380); await settle(d, 900);
await d.screenshot({ path: `${out}/d-phone.png` });
await scrollToSel(d, '#deal-title', -120); await settle(d);
await d.screenshot({ path: `${out}/d-proof.png` });
await scrollToSel(d, '#contact', 0);
await d.click('.chip >> nth=1'); await d.fill('input[name=name]', 'Asha'); await settle(d);
await d.screenshot({ path: `${out}/d-contact.png` });
console.log('wa href:', await d.getAttribute('[data-wa]', 'href'));
await d.goto(base + '/work/mudkraft/', { waitUntil: 'networkidle' });
await d.screenshot({ path: `${out}/d-project.png`, fullPage: true });

// Hindi
await d.goto(base + '/hi/', { waitUntil: 'networkidle' }); await settle(d);
await d.screenshot({ path: `${out}/d-hi-hero.png` });

// Mobile
const m = await page({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, label: 'mobile' });
await m.goto(base + '/', { waitUntil: 'networkidle' }); await settle(m);
await m.screenshot({ path: `${out}/m-hero.png` });
await scrollToSel(m, '#work-title', -100); await settle(m);
await m.screenshot({ path: `${out}/m-work.png` });
await m.evaluate(() => document.querySelector('[data-track]').scrollBy(260, 0)); await settle(m, 900);
await m.screenshot({ path: `${out}/m-work-swiped.png` });
await scrollToSel(m, '[data-step="2"]', -500); await settle(m, 900);
await m.screenshot({ path: `${out}/m-phone.png` });
await m.goto(base + '/hi/work/bharat-laundry/', { waitUntil: 'networkidle' });
await m.screenshot({ path: `${out}/m-hi-project.png`, fullPage: true });

// Reduced motion + no JS
const r = await page({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', label: 'reduced' });
await r.goto(base + '/', { waitUntil: 'networkidle' });
await scrollToSel(r, '#work-title', -100); await settle(r);
console.log('reduced mode:', await r.getAttribute('[data-work]', 'data-mode'));
await r.screenshot({ path: `${out}/r-work.png` });
const n = await page({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, label: 'nojs' });
await n.goto(base + '/', { waitUntil: 'networkidle' });
await n.screenshot({ path: `${out}/n-full.png`, fullPage: true });

console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'No console errors or failed requests.');
await browser.close();
