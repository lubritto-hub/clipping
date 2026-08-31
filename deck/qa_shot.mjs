import { chromium } from 'playwright';
import path from 'node:path';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1300, height: 800 }, deviceScaleFactor: 1.6 });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + path.resolve('qa.html'));
await p.waitForTimeout(1200);
const slides = await p.locator('.slide').all();
console.log('slides:', slides.length);
for (let i = 0; i < slides.length; i++)
  await slides[i].screenshot({ path: `qa-${String(i + 1).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 88 });
await b.close();
if (errs.length) console.error(errs.join('\n'));
