// Renders scripts/posters/<slug>.html to src/assets/projects/<slug>-{desktop,mobile}.png
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const slug = process.argv[2];
if (!slug) throw new Error('Usage: node scripts/render-poster.mjs <slug>');
const chrome = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean).find((p) => existsSync(p));
const url = pathToFileURL(resolve('scripts/posters', `${slug}.html`)).href;
for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  execFileSync(chrome, ['--headless=new', '--hide-scrollbars', `--window-size=${w},${h}`,
    `--screenshot=${resolve('src/assets/projects', `${slug}-${name}.png`)}`, url], { stdio: 'ignore' });
}
