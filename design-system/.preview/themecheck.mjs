import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage();
import fs from 'node:fs';
const css = fs.readFileSync('dist/styles.css', 'utf8');
await p.setContent(`<style>${css}</style>
  <div id="l" data-theme="light" style="padding:10px">L</div>
  <div id="d" data-theme="dark" style="padding:10px">D</div>`);
await p.waitForTimeout(500);
const r = await p.evaluate(() => {
  const g = (id, prop) => getComputedStyle(document.getElementById(id)).getPropertyValue(prop).trim();
  return {
    lightBg:   g('l', '--tc-color-bg'),
    lightText: g('l', '--tc-color-text'),
    lightHair: g('l', '--tc-color-hairline'),
    darkBg:    g('d', '--tc-color-bg'),
    darkText:  g('d', '--tc-color-text'),
    darkSunken:g('d', '--tc-color-surface-sunken'),
    haze:      g('l', '--tc-palette-haze-400'),
    pearl:     g('l', '--tc-palette-pearl-blue'),
  };
});
console.log(JSON.stringify(r, null, 2));
/* Guard: no near-black anywhere.
   Measured in CIE L* (perceptual lightness), NOT relative luminance — down in
   this range the two give wildly different numbers (#12302a is L* 17.5 but
   only 2.4% relative luminance), and L* is the one that matches what the eye
   calls "not black". */
const hex = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h.trim()); if (!m) return null;
  const n = parseInt(m[1], 16); return [(n>>16)&255, (n>>8)&255, n&255]; };
const lstar = c => {
  const [r0,g0,b0] = c.map(v => { v/=255; return v<=0.04045 ? v/12.92 : ((v+0.055)/1.055)**2.4; });
  const Y = 0.2126*r0 + 0.7152*g0 + 0.0722*b0;
  return Y > 0.008856 ? 116*Math.cbrt(Y) - 16 : 903.3*Y;
};
const FLOOR = 12;
let failed = 0;
for (const [name, v] of [['deep ground', r.darkBg], ['deep sunken', r.darkSunken]]) {
  const c = hex(v);
  if (!c) continue;
  const L = lstar(c);
  const ok = L >= FLOOR;
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} ${v} L* ${L.toFixed(1)} (floor ${FLOOR})`);
}
await b.close();
if (failed) { console.error('near-black detected in the palette'); process.exit(1); }
console.log('theme check ok');
