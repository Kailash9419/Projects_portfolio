// Screenshot each home section at its top, at a given width, for design review.
import { chromium } from 'playwright-core';
const [base = 'http://localhost:4322', out = '../qa-shots', width = '1440', path = '/'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const mobile = Number(width) < 700;
const p = await (await b.newContext({ viewport: { width: Number(width), height: mobile ? 844 : 900 }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile })).newPage();
await p.goto(base + path, { waitUntil: 'networkidle' });
const targets = [['work', '#work-title', -40], ['services', '#services-title', -40], ['phone', '#phone-title', -40], ['phone-mid', '[data-step="2"]', -300], ['deal', '#deal-title', -40], ['contact', '#contact', 0], ['footer', 'footer', -500]];
for (const [name, sel, off] of targets) {
  await p.evaluate(([s, o]) => { const el = document.querySelector(s); scrollTo(0, el.getBoundingClientRect().top + scrollY - 70 + o); }, [sel, off]);
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `${out}/s${mobile ? 'm' : ''}-${name}.png` });
}
// Phone story states and services hover preview.
for (const i of [0, 1, 2, 3]) {
  await p.evaluate((n) => { const el = document.querySelector(`[data-step="${n}"]`); const r = el.getBoundingClientRect(); scrollTo(0, r.top + scrollY - innerHeight / 2 + r.height / 2); }, i);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/s${mobile ? 'm' : ''}-phone-${i}.png` });
}
if (!mobile) {
  await p.evaluate(() => { const el = document.querySelectorAll('.svc__row')[1]; scrollTo(0, el.getBoundingClientRect().top + scrollY - 300); });
  await p.waitForTimeout(500);
  const box = await p.locator('.svc__row').nth(1).boundingBox();
  await p.mouse.move(box.x + 500, box.y + box.height / 2, { steps: 5 });
  await p.mouse.move(box.x + 560, box.y + box.height / 2, { steps: 5 });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/s-services-hover.png` });
}
await b.close();
