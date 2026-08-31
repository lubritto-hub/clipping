import { chromium } from 'playwright';
import path from 'node:path';
const dir = path.resolve('.preview');
const out = path.join(dir, 'deck-assets');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 2000, height: 1125 }, deviceScaleFactor: 1 });
await p.goto('file://' + path.join(dir, 'bg.html'));

// Every plate is painted by the design system's own tokens, so the deck carries
// the real ground rather than an approximation of it.
// The luminous register carries the deck: five light plates against one deep
// one. Each light plate is a different weather condition, so no two adjacent
// slides can share a light source.
const plates = [
  ['bg-air-cove',      'light', 'cove',         'quiet'],
  ['bg-air-bluehour',  'light', 'blue-hour',    'quiet'],
  ['bg-air-kiln',      'light', 'kiln',         'normal'],
  ['bg-air-condens',   'light', 'condensation', 'quiet'],
  ['bg-mineral',       'light', 'cove',         'quiet'],
  ['bg-deep',          'dark',  'blue-hour',    'normal'],
];
for (const [name, theme, weather, artefact] of plates) {
  await p.evaluate(([theme, weather, artefact]) => {
    document.documentElement.setAttribute('data-theme', theme);
    const el = document.getElementById('p');
    el.setAttribute('data-weather', weather);
    el.setAttribute('data-artefact', artefact);
    el.className = 'plate tc-ground tc-substrate';
    el.style.background = 'var(--tc-color-bg)';
  }, [theme, weather, artefact]);
  await p.waitForTimeout(220);
  await p.locator('#p').screenshot({ path: path.join(out, name + '.jpg'), type: 'jpeg', quality: 92 });
}
await b.close();
console.log('plates:', plates.map(x => x[0]).join(', '));
