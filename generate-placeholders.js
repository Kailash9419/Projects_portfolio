// Generate placeholder project cover images as SVG files for devlabs projects
const fs = require('fs');
const path = require('path');

const projects = [
  { slug: 'level-40-wellness', title: 'Level 40 Wellness', color1: '#A3E635', color2: '#22D3EE', screens: 2 },
  { slug: 'mudkraft', title: 'Mudkraft', color1: '#FB923C', color2: '#F472B6', screens: 2 },
  { slug: 'valley-of-birds', title: 'Valley of Birds', color1: '#22D3EE', color2: '#8B5CF6', screens: 2 },
  { slug: 'bharat-laundry', title: 'Bharat Laundry', color1: '#8B5CF6', color2: '#22D3EE', screens: 3 },
];

function createSVG(title, color1, color2, width = 1200, height = 675) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#000;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" rx="0"/>
  <rect width="${width}" height="${height}" fill="url(#overlay)" rx="0"/>
  <g opacity="0.15">
    <rect x="60" y="40" width="200" height="12" rx="6" fill="white"/>
    <rect x="60" y="70" width="140" height="8" rx="4" fill="white"/>
    <rect x="60" y="120" width="${width - 120}" height="${height - 200}" rx="12" fill="white" opacity="0.08"/>
    <rect x="90" y="150" width="300" height="20" rx="4" fill="white"/>
    <rect x="90" y="185" width="220" height="14" rx="4" fill="white" opacity="0.6"/>
    <rect x="90" y="230" width="${width - 200}" height="1" fill="white" opacity="0.3"/>
    <circle cx="${width - 100}" cy="60" r="20" fill="white" opacity="0.2"/>
  </g>
  <text x="${width/2}" y="${height/2 + 10}" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="white" text-anchor="middle" opacity="0.9">${title}</text>
  <text x="${width/2}" y="${height/2 + 50}" font-family="system-ui, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.5">devlabs Project Preview</text>
</svg>`;
}

function createScreenSVG(title, color1, color2, screenNum, width = 1200, height = 675) {
  const elements = [
    // Screen 1: Dashboard-like
    `<g opacity="0.2">
      <rect x="40" y="30" width="160" height="${height - 60}" rx="8" fill="white" opacity="0.1"/>
      <rect x="220" y="30" width="${width - 260}" height="80" rx="8" fill="white" opacity="0.08"/>
      <rect x="220" y="130" width="${(width-280)/2}" height="200" rx="8" fill="white" opacity="0.08"/>
      <rect x="${240 + (width-280)/2}" y="130" width="${(width-280)/2}" height="200" rx="8" fill="white" opacity="0.08"/>
      <rect x="220" y="350" width="${width - 260}" height="200" rx="8" fill="white" opacity="0.08"/>
    </g>`,
    // Screen 2: Content-like
    `<g opacity="0.2">
      <rect x="60" y="40" width="${width-120}" height="60" rx="8" fill="white" opacity="0.08"/>
      <rect x="60" y="120" width="${(width-140)/3}" height="300" rx="8" fill="white" opacity="0.08"/>
      <rect x="${80 + (width-140)/3}" y="120" width="${(width-140)/3}" height="300" rx="8" fill="white" opacity="0.08"/>
      <rect x="${100 + 2*(width-140)/3}" y="120" width="${(width-140)/3}" height="300" rx="8" fill="white" opacity="0.08"/>
      <rect x="60" y="440" width="${width-120}" height="100" rx="8" fill="white" opacity="0.05"/>
    </g>`,
    // Screen 3: Editor-like
    `<g opacity="0.2">
      <rect x="0" y="0" width="${width}" height="40" fill="white" opacity="0.05"/>
      <rect x="0" y="40" width="250" height="${height-40}" fill="white" opacity="0.05"/>
      <rect x="270" y="60" width="400" height="16" rx="4" fill="white" opacity="0.15"/>
      <rect x="270" y="90" width="350" height="12" rx="4" fill="white" opacity="0.1"/>
      <rect x="270" y="115" width="300" height="12" rx="4" fill="white" opacity="0.1"/>
      <rect x="270" y="140" width="380" height="12" rx="4" fill="white" opacity="0.1"/>
      <rect x="270" y="165" width="200" height="12" rx="4" fill="white" opacity="0.1"/>
    </g>`,
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#111318"/>
  <rect width="${width}" height="${height}" fill="url(#bg)" opacity="0.3"/>
  ${elements[(screenNum - 1) % elements.length]}
  <text x="${width/2}" y="${height - 30}" font-family="system-ui, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.3">${title} — Screen ${screenNum}</text>
</svg>`;
}

projects.forEach(p => {
  const dir = path.join(__dirname, 'public', 'projects', p.slug);

  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Cover image
  const coverSvg = createSVG(p.title, p.color1, p.color2);
  fs.writeFileSync(path.join(dir, 'cover.svg'), coverSvg);

  // Screenshots
  for (let i = 1; i <= p.screens; i++) {
    const screenSvg = createScreenSVG(p.title, p.color1, p.color2, i);
    fs.writeFileSync(path.join(dir, `screen-${i}.svg`), screenSvg);
  }

  console.log(`Generated images for ${p.slug}`);
});

console.log('Done!');
