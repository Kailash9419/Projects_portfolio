import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await p.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
await p.screenshot({ path: '../qa-shots/full-desktop.png', fullPage: true });
await b.close();
