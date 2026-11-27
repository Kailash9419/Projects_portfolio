// Hero showcase QA: layout at three widths, autoplay advance, pause, reduced motion, no JS.
import { chromium } from 'playwright-core';
const base = process.argv[2] ?? 'http://localhost:4322';
const out = process.argv[3] ?? '../qa-shots';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const mk = async (o) => { const c = await b.newContext(o); const p = await c.newPage(); p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => m.type() === 'error' && errors.push(m.text())); await p.goto(base + (o.path ?? '/'), { waitUntil: 'networkidle' }); return p; };
const active = (p) => p.evaluate(() => document.querySelector('.dot[aria-pressed="true"]')?.dataset.goto);

const w = await mk({ viewport: { width: 1920, height: 1000 } });
await w.mouse.move(5, 500); await w.waitForTimeout(1500);
await w.screenshot({ path: `${out}/h-1920.png` });
console.log('start slide', await active(w));
await w.waitForTimeout(5200);
console.log('after 6.7s slide', await active(w));
await w.screenshot({ path: `${out}/h-1920-b.png` });
await w.click('[data-toggle]'); const s1 = await active(w); await w.waitForTimeout(6000);
console.log('paused stays', s1 === await active(w), 'label', await w.getAttribute('[data-toggle]', 'aria-label'));

const d = await mk({ viewport: { width: 1440, height: 900 } });
await d.waitForTimeout(1500); await d.screenshot({ path: `${out}/h-1440.png` });
const t = await mk({ viewport: { width: 1024, height: 900 } });
await t.waitForTimeout(1500); await t.screenshot({ path: `${out}/h-1024.png`, fullPage: false });
const m = await mk({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await m.waitForTimeout(1500); await m.screenshot({ path: `${out}/h-mobile.png`, fullPage: false });
await m.evaluate(() => scrollTo(0, 500)); await m.waitForTimeout(400); await m.screenshot({ path: `${out}/h-mobile-2.png` });
const hi = await mk({ viewport: { width: 1440, height: 900 }, path: '/hi/' });
await hi.waitForTimeout(1500); await hi.screenshot({ path: `${out}/h-hi.png` });

const r = await mk({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await r.waitForTimeout(7000);
console.log('reduced motion stays on', await active(r), 'stopped class', await r.evaluate(() => document.querySelector('[data-showcase]').classList.contains('is-stopped')));
await r.click('.dot[data-goto="2"]'); console.log('reduced manual pick', await active(r));
const n = await mk({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
await n.screenshot({ path: `${out}/h-nojs.png` });
console.log(errors.length ? 'ERRORS ' + errors.join(' | ') : 'no errors');
await b.close();
