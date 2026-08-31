import { chromium } from 'playwright';
import path from 'node:path';
const dir = path.resolve('.preview');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
// Threshold, exported flat for the deck. Kept identical to Mark.tsx by hand —
// the geometry lives in two places and must not drift.
const GLYPH = c => `
  <path d="M0 0H32V12.4H21.6V8.2H0Z" fill="${c}"/>
  <path d="M7.6 16.8H32V19.2H7.6Z" fill="${c}"/>
  <path d="M0 23H20.8V24.8H0Z" fill="${c}"/>
  <path d="M5.2 28.6H29.4V29.8H5.2Z" fill="${c}"/>`;
for (const [name, colour] of [['mark-light', '#FAFCFE'], ['mark-dark', '#143743']]) {
  const p = await b.newPage({ viewport: { width: 480, height: 480 }, deviceScaleFactor: 2 });
  await p.setContent(`<body style="margin:0"><svg width="480" height="480" viewBox="0 0 32 32" fill="none">${GLYPH(colour)}</svg></body>`);
  await p.waitForTimeout(150);
  await p.screenshot({ path: path.join(dir, 'deck-assets', name + '.png'), omitBackground: true });
  await p.close();
}
await b.close(); console.log('marks ok');
