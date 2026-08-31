/* ===========================================================================
   ART LAYERS — one bespoke composition per slide.

   These are NOT backgrounds. pptxgenjs cannot blur, mask, overlap, or build a
   gradient field, so everything that is atmosphere, matter and graphic element
   is composed here in the browser with the design system's own optical tokens,
   and exported as one full-bleed plate per slide. Only TYPE stays live in the
   .pptx, which keeps the deck editable where editing actually matters.

   Each composition declares the zone it leaves clear for type. That is the
   contract with build.js: if a plate changes, the type zone changes with it.

   The rule these plates exist to satisfy: a light background may never be one
   gradient. Five layers, every time —
     1 pearl base
     2 large atmospheric masses (cyan · mint · lavender · pale green · icy blue)
     3 bloom / refraction
     4 grain + scan, very low
     5 on some slides: glass, membrane, macro material, blurred photography
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

/* The geometry on plates 04, 08 and 09 is DERIVED from the model, not drawn by
   eye. A band that is 20% of another band because the yield is 20% is the
   difference between a diagram and a decoration. */
const M = createRequire(import.meta.url)('../../deck/model.js');

const W = 2000, H = 1125;
const OUT = path.resolve('.preview/deck-assets');
const css = fs.readFileSync('dist/styles.css', 'utf8');
const img = n => `./img/${n}.svg`;

/* --- Layer primitives ---------------------------------------------------- */

const CSS = `
*{box-sizing:border-box;margin:0}
body{background:#888}
.plate{width:${W}px;height:${H}px;position:relative;overflow:hidden;isolation:isolate;
  background:var(--tc-palette-pearl-blue);
  font-family:Helvetica,Arial,"Liberation Sans",sans-serif}
.L{position:absolute;inset:0;pointer-events:none}

/* 2 — atmospheric masses. Always FIVE, always off-axis, always different
   radii. Four would resolve into a pattern; equal radii read as a blob. */
.atmos{filter:blur(3px)}
/* Palette for the masses. These are MID-TONES on purpose: near-whites layered
   over a pearl ground average back to the ground and the field disappears —
   which is exactly how a "soft gradient" becomes a flat pastel background. */


/* 3 — bloom / refraction. Screened so it only ever ADDS light. */
.bloom{mix-blend-mode:screen;opacity:.6;filter:blur(48px)}
.refract{background-image:var(--tc-gradient-prism);mix-blend-mode:screen;
  opacity:.34;filter:blur(70px) saturate(.8)}

/* 4 — the substrate. Fine enough to read as a scan, never as VHS. */
.grain{background-image:var(--tc-texture-grain);opacity:.28;mix-blend-mode:multiply}
.scan{background-image:repeating-linear-gradient(0deg,
  rgb(20 55 67 / 5%) 0 1px, transparent 1px 3px);opacity:.5}
.dither{background-image:var(--tc-texture-mineral);opacity:.06;mix-blend-mode:multiply}

/* 5 — objects */
.obj{position:absolute;overflow:hidden}
.obj img{width:100%;height:100%;object-fit:cover;display:block}

/* An optical halo: a thin ARC of light, not a ring. Two masks do the work —
   an elliptical annulus (so only the rim survives) and the conic gradient's
   own transparent sweep (so only part of that rim is lit). A full ring reads
   as a loading spinner; this reads as light grazing a curved surface. */
.arc{position:absolute;border-radius:50%;
  background:conic-gradient(from var(--a,200deg),
    transparent 0deg, var(--tc-optic-ice) 34deg, #ffffff 72deg,
    var(--tc-optic-mint) 112deg, var(--tc-optic-nacre) 148deg,
    var(--tc-optic-peach) 176deg, transparent 210deg);
  -webkit-mask:radial-gradient(transparent 0 98.4%, #000 98.9%, #000 100%);
  mask:radial-gradient(transparent 0 98.4%, #000 98.9%, #000 100%);
  filter:blur(var(--ab,1px)) saturate(1.15)}
/* The same arc, wide and soft: the bloom the hard arc throws. */
.arc--glow{-webkit-mask:radial-gradient(transparent 0 92%, #000 97%, #000 100%);
  mask:radial-gradient(transparent 0 92%, #000 97%, #000 100%);
  filter:blur(26px);opacity:.5}

/* Iridescence only ever appears on an EDGE, and only where a surface turns
   away from the light. A field of it is a rainbow gradient, which is the
   thing to avoid. */
.iri-edge{position:absolute;background:var(--tc-edge-iridescent);
  filter:blur(1.2px);opacity:.62}

/* A ghost numeral: too large, too faint, cut by the frame. Lives in the plate
   rather than the .pptx because it needs a gradient fade and a blur. */
.ghost{position:absolute;font-weight:200;letter-spacing:-.05em;line-height:.8;
  background:linear-gradient(178deg,
    rgb(122 168 201 / 30%) 0%, rgb(122 168 201 / 13%) 52%, rgb(122 168 201 / 0%) 92%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:blur(1.4px)}
.ghost--deep{background:linear-gradient(178deg,
  rgb(151 220 199 / 26%) 0%, rgb(151 220 199 / 8%) 60%, transparent 95%)}

/* A hairline that carries meaning: an axis, a baseline, a capacity line. */
.rule{position:absolute;height:1px;background:rgb(91 138 174 / 42%)}
.rule--v{width:1px;height:auto}
.tick{position:absolute;width:1px;background:rgb(91 138 174 / 55%)}
.node{position:absolute;border-radius:50%;
  box-shadow:0 0 0 1px rgb(31 115 112 / 55%), 0 0 26px 6px rgb(53 176 202 / 26%);
  background:radial-gradient(circle at 34% 30%, #fff 0%, var(--tc-optic-ice) 60%, var(--tc-palette-cyan-300) 100%)}

/* A material crop. Always cut by something — the frame, or another plane —
   and always dissolving on at least one edge. A rectangle with four hard
   edges floating in a field reads as a pasted image, which is the single
   clearest tell of a template. */
.crop{position:absolute;overflow:hidden}
.crop img{width:100%;height:100%;object-fit:cover;display:block}
.crop--soft img{filter:blur(3px) saturate(.9)}
.crop--far img{filter:blur(18px) saturate(.7);opacity:.62}
.fade-r{-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 52%,transparent 100%);
  mask-image:linear-gradient(90deg,#000 0%,#000 52%,transparent 100%)}
.fade-l{-webkit-mask-image:linear-gradient(270deg,#000 0%,#000 52%,transparent 100%);
  mask-image:linear-gradient(270deg,#000 0%,#000 52%,transparent 100%)}
.fade-b{-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 46%,transparent 100%);
  mask-image:linear-gradient(180deg,#000 0%,#000 46%,transparent 100%)}
.fade-t{-webkit-mask-image:linear-gradient(0deg,#000 0%,#000 46%,transparent 100%);
  mask-image:linear-gradient(0deg,#000 0%,#000 46%,transparent 100%)}
.fade-o{-webkit-mask-image:radial-gradient(72% 72% at 42% 40%,#000 42%,transparent 100%);
  mask-image:radial-gradient(72% 72% at 42% 40%,#000 42%,transparent 100%)}

/* Translucent strata — overlapping planes of light, for the layered slides. */
.stratum{position:absolute;backdrop-filter:blur(14px) saturate(1.3);
  border-top:1px solid rgb(255 255 255 / 75%)}
`;

/* Five atmospheric masses. Radii, positions and colours all differ; nothing
   is centred, because 50% is banned anywhere that describes light. */
function atmos(seedSet) {
  const g = seedSet.map(([x, y, rx, ry, c, a]) =>
    `radial-gradient(${rx}% ${ry}% at ${x}% ${y}%, ${c} 0%, transparent 70%)`).join(',');
  const op = seedSet.map(s => s[5]);
  return `<div class="L atmos" style="background-image:${g};opacity:${Math.max(...op)}"></div>`;
}

/* ===========================================================================
   SIGNATURE DEVICES

   Three, and only three. Each one is derived from something real in the
   system, which is the whole point: a sphere or a blob could belong to any
   company, and a pore field could not.

     A · PORE FIELD    the actual porous structure of biochar. Used as
                       texture, as data points, and — critically — as a
                       DENSITY ENCODING: more pores means more unresolved
                       uncertainty. It thins out as risk closes.

     B · THERMAL LINE  the pyrolysis temperature curve, reduced to a single
                       spectral line. Used as axis, threshold scale, gate
                       progression and trajectory. It is the only place in
                       the system where warm colour is allowed to travel.

     C · MEMBRANE      a translucent plane you cross and cannot recross.
                       Permanence, the reactor's zones, and a gate are all
                       the same object seen from different angles.

   Everything graphic in the deck is built from these three. Nothing else
   gets invented per slide.
   =========================================================================== */

/* Deterministic PRNG so a plate renders identically every build. */
function rng(seed) {
  let x = seed >>> 0;
  return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/* A — PORE FIELD. `density` 0..1 drives count, size AND irregularity, because
   a field that only loses count reads as the same material sampled less, not
   as a material resolving.

   The cells are irregular polygons, not circles. Biochar under magnification
   is a honeycomb of collapsed plant cell walls — angular, uneven, elongated
   along the grain. Circles read as foam or champagne, which is exactly what
   the first attempt looked like. */
function pores(seed, w, h, density = 1, tint = 'rgb(20 55 67', maxR = 26, mode = 'void') {
  const r = rng(seed);
  const n = Math.round(90 * density);
  const out = [];
  for (let i = 0; i < n; i++) {
    const cx = r() * w, cy = r() * h;
    const rad = Math.max(2.2, (0.28 + r() * 0.72) * maxR * (0.5 + density * 0.5));
    const ecc = 0.55 + r() * 0.85;              // cells elongate along the grain
    const rot = (r() - 0.5) * 0.7;              // but only roughly align
    const sides = 5 + Math.floor(r() * 4);
    const pts = [];
    for (let k = 0; k < sides; k++) {
      const a = (k / sides) * Math.PI * 2 + rot;
      const rr = rad * (0.72 + r() * 0.5);
      pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr * ecc).toFixed(1)}`);
    }
    const o = (0.14 + r() * 0.4) * (0.45 + density * 0.55);
    // Two modes, because a pore is defined by contrast with its ground:
    //   void — a dark cavity on a bright material (the light registers)
    //   lit  — an opening letting light THROUGH a backlit membrane (the deep
    //          register). Dark cells on a dark ground are simply invisible,
    //          which left the first attempt showing only stray white marks.
    const fill = mode === 'lit'
      ? `rgb(214 244 236 / ${(o * 62).toFixed(0)}%)`
      : `${tint} / ${(o * 100).toFixed(0)}%)`;
    out.push(`<polygon points="${pts.join(' ')}" fill="${fill}"/>`);
    if (rad > 5) {
      const half = pts.slice(0, Math.ceil(sides / 2) + 1).join(' L');
      const stroke = mode === 'lit'
        ? `rgb(255 255 255 / ${(o * 120).toFixed(0)}%)`
        : `rgb(255 255 255 / ${(o * 175).toFixed(0)}%)`;
      out.push(`<path d="M${half}" fill="none" stroke="${stroke}"`
        + ` stroke-width="${Math.max(0.7, rad * 0.1).toFixed(1)}" stroke-linejoin="round"/>`);
    }
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">${out.join('')}</svg>`;
}

/* B — THERMAL LINE. One stroke, spectral along its length: cool where the
   process starts, warm through pyrolysis, cool again once the carbon is
   fixed. It is a temperature curve doing the job of an axis. */
function thermal(id, d, width = 2, opacity = 1, glow = true, warmAt = 74) {
  return `<svg style="position:absolute;inset:0;width:100%;height:100%" fill="none" preserveAspectRatio="none">
    <defs>
      <linearGradient id="th${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(122 168 201 / 70%)"/>
        <stop offset="${Math.max(4, warmAt - 34)}%" stop-color="rgb(53 176 202 / 95%)"/>
        <stop offset="${Math.max(8, warmAt - 16)}%" stop-color="rgb(151 220 199 / 98%)"/>
        <stop offset="${warmAt}%" stop-color="rgb(240 161 132 / 95%)"/>
        <stop offset="${Math.min(96, warmAt + 18)}%" stop-color="rgb(151 220 199 / 80%)"/>
        <stop offset="100%" stop-color="rgb(122 168 201 / 60%)"/></linearGradient>
      <filter id="tg${id}"><feGaussianBlur stdDeviation="7"/></filter>
    </defs>
    ${glow ? `<path d="${d}" stroke="url(#th${id})" stroke-width="${width * 6}" filter="url(#tg${id})" opacity="${opacity * 0.42}"/>` : ''}
    <path d="${d}" stroke="url(#th${id})" stroke-width="${width}" opacity="${opacity}"/>
  </svg>`;
}

/* C — MEMBRANE. A translucent plane with one lit leading edge. Crossing it is
   the event; the aperture is where something got through. */
function membrane(style, edge = 'left', tone = 'light') {
  const face = tone === 'deep'
    ? 'linear-gradient(158deg, rgb(151 220 199 / 9%), rgb(53 176 202 / 5%) 60%, rgb(151 220 199 / 3%))'
    : 'linear-gradient(158deg, rgb(255 255 255 / 62%), rgb(203 240 248 / 26%) 60%, rgb(206 192 235 / 18%))';
  const lit = tone === 'deep' ? 'rgb(151 220 199 / 62%)' : 'rgb(255 255 255 / 92%)';
  const e = { left: 'left:0;top:0;width:1.5px;height:100%', right: 'right:0;top:0;width:1.5px;height:100%',
              top: 'left:0;top:0;height:1.5px;width:100%' }[edge];
  return `<div style="position:absolute;${style};background:${face};
    backdrop-filter:blur(9px) saturate(1.2);overflow:hidden">
    <div style="position:absolute;${e};background:${lit}"></div></div>`;
}

/* The aperture: where the thermal line pierces a membrane. Not a dot — a
   bright opening with the membrane's own colour bleeding through it. */
const aperture = (x, y, r, tone = 'deep') => `<div style="position:absolute;left:${x};top:${y};
  width:${r}px;height:${r}px;margin:${-r / 2}px 0 0 ${-r / 2}px;border-radius:50%;
  background:radial-gradient(circle at 38% 34%, #fff 0%, ${tone === 'deep' ? 'var(--tc-palette-mint-300)' : 'var(--tc-optic-ice)'} 52%, transparent 100%);
  box-shadow:0 0 ${r * 1.6}px ${r * 0.4}px rgb(53 176 202 / ${tone === 'deep' ? 34 : 24}%)"></div>`;


/* The mass palette. Mid-tones, not near-whites — see the note on .atmos. */
const C = {
  ice:   a => `rgb(158 194 220 / ${a}%)`,   // azul névoa
  cyan:  a => `rgb(150 219 240 / ${a}%)`,   // azul gelo
  mint:  a => `rgb(168 224 205 / ${a}%)`,   // mint claro
  nacre: a => `rgb(206 192 235 / ${a}%)`,   // lilás perolado
  peach: a => `rgb(248 216 196 / ${a}%)`,   // o único quente
  sage:  a => `rgb(180 210 196 / ${a}%)`,   // verde acinzentado
  pearl: a => `rgb(255 255 255 / ${a}%)`,
};

const grain = () => `<div class="L grain"></div><div class="L scan"></div><div class="L dither"></div>`;
const refract = (o = 0.34) => `<div class="L refract" style="opacity:${o}"></div>`;
const arc = (st, a = 200, blur = 1, op = 0.8) =>
  `<div class="arc arc--glow" style="${st};--a:${a}deg;opacity:${op * 0.55}"></div>
   <div class="arc" style="${st};--a:${a}deg;--ab:${blur}px;opacity:${op}"></div>`;

/* --- The twelve compositions --------------------------------------------
   Each returns HTML for one plate. The comment above each declares the type
   zone build.js must respect. No two share a layout, a light source, or a
   density. */

const PLATES = {

/* 01 CAPA — type zone: left 52%, below y 44%.
   A translucent membrane cut by the right AND top edges, two arcs of light
   crossing the frame at different scales, and a fibre macro so far out of
   focus it is only a warm pressure in the corner. Product launch, not report
   cover. */
'art-01': () => `
  ${atmos([[16,18,52,48,C.cyan(78),1],[80,32,74,70,C.nacre(58),1],
           [56,88,60,50,C.mint(64),1],[98,80,46,44,C.peach(38),1],
           [6,74,48,44,C.ice(52),1]])}
  <div class="crop crop--far fade-t" style="right:-8%;bottom:-16%;width:48%;height:72%;opacity:.55">
    <img src="${img('fibre')}"></div>
  <div class="obj" style="right:-16%;top:-30%;width:68%;height:126%;opacity:.96">
    <img src="${img('membrane')}" style="object-fit:contain"></div>
  ${arc('right:-30%;top:-48%;width:100%;height:176%', 150, 1.2, 0.9)}
  ${arc('left:-40%;top:22%;width:82%;height:132%', 330, 2, 0.42)}
  <div class="L bloom" style="background-image:var(--tc-lightleak-top)"></div>
  ${refract(0.3)}${grain()}`,

/* 02 OPORTUNIDADE — type zone: left 58% above the line; the supply→gap→demand
   axis sits at y 68%. A colossal faded halo at the right, and a ghost 100 that
   is the demand the market cannot reach. */
'art-02': () => `
  ${atmos([[14,24,54,50,C.cyan(72),1],[86,42,82,76,C.nacre(52),1],
           [44,92,66,46,C.mint(60),1],[68,6,40,36,C.pearl(78),1],
           [2,62,44,52,C.ice(48),1]])}
  <div class="obj" style="right:-20%;top:-20%;width:66%;height:136%;opacity:.6">
    <img src="${img('membrane')}" style="object-fit:contain"></div>
  <div class="ghost" style="right:2.5%;top:26%;font-size:330px;text-align:right">100</div>
  <div class="ghost" style="right:3.5%;top:60%;font-size:74px;letter-spacing:.06em">Mt / ano</div>
  <div class="rule" style="left:5%;right:5%;top:68%"></div>
  <div class="tick" style="left:5%;top:66.2%;height:3.6%"></div>
  <div class="tick" style="left:47%;top:66.2%;height:3.6%"></div>
  <div class="tick" style="right:5%;top:64.6%;height:6.8%;background:rgb(31 115 112 / 60%)"></div>
  <div class="node" style="left:4.4%;top:67.2%;width:16px;height:16px"></div>
  <div class="node" style="right:4.4%;top:66.8%;width:24px;height:24px"></div>
  ${arc('left:-26%;bottom:-74%;width:74%;height:138%', 20, 1.6, 0.55)}
  ${refract(0.26)}${grain()}`,

/* 03 A TESE — three material states in a BROKEN sequence: three sizes, three
   vertical offsets, three different crops, each dissolving on a different
   edge. material → technology → value. Type sits under each. */
'art-03': () => `
  ${atmos([[8,16,50,46,C.pearl(88),1],[60,28,60,56,C.cyan(58),1],
           [92,70,52,48,C.nacre(48),1],[32,94,58,42,C.mint(58),1],
           [76,2,36,32,C.peach(32),1]])}
  <div class="crop fade-b" style="left:4%;top:18%;width:19%;height:44%">
    <img src="${img('fibre')}"></div>
  <div class="iri-edge" style="left:4%;top:18%;width:2.5px;height:34%"></div>

  <div class="crop crop--soft fade-r" style="left:30%;top:8%;width:33%;height:38%">
    <img src="${img('steel')}"></div>
  <div class="iri-edge" style="left:30%;top:8%;width:24%;height:2.5px"></div>

  <div class="crop fade-l" style="left:66%;top:30%;width:34%;height:44%">
    <img src="${img('carbon-macro')}"></div>
  <div class="iri-edge" style="right:0;top:30%;width:2.5px;height:44%"></div>

  <div class="rule" style="left:4%;right:4%;top:88%;opacity:.55"></div>
  ${arc('right:-42%;top:-32%;width:84%;height:156%', 190, 2, 0.4)}
  ${refract(0.24)}${grain()}`,

/* 04 O PILOTO — type zone: left 55%. A hairline section of the three-zone
   fluidised bed at the right, over a steel silhouette so soft it is only a
   pressure in the frame. A technical drawing, never a dashboard. */
'art-04': () => {
  /* MASS AND CARBON BALANCE.
     Four bands on one axis, and every height is the real ratio:
       biomassa 4.000 t  ->  band height H
       char       810 t  ->  H x 0,2025   (the yield, drawn)
       remoção  1.620 t  ->  char x 2,0   (tCO2e per t of char, drawn)
     The reactor section sits at the point where the narrowing happens, so the
     drop in height IS the conversion rather than a label about it. */
  const H = 122;                                   // px for 4.000 t
  const yieldR = M.PILOTO.charAno / M.PILOTO.biomassaAno;
  const hChar = H * yieldR;
  const hCO2  = hChar * M.PILOTO.tCO2ePorTChar;
  const cy = 590;                                  // eixo do fluxo, em px
  const band = (x1, x2, hL, hR, fill, extra = '') =>
    `<path d="M${x1} ${cy - hL / 2} L${x2} ${cy - hR / 2} L${x2} ${cy + hR / 2} L${x1} ${cy + hL / 2} Z"
      fill="${fill}" ${extra}/>`;
  return `
  ${atmos([[14,16,50,46,C.pearl(88),1],[64,26,58,52,C.cyan(58),1],
           [92,72,50,48,C.nacre(46),1],[30,94,56,42,C.mint(56),1],
           [4,66,42,44,C.ice(46),1]])}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    ${band(120, 860, H, H, 'rgb(158 194 220 / 42%)')}
    ${band(1100, 1440, hChar, hChar, 'rgb(31 115 112 / 68%)')}
    ${band(1500, 1880, hCO2 * 0.62, hCO2, 'rgb(53 176 202 / 34%)')}
    <path d="M1440 ${cy} H1500" stroke="rgb(31 115 112 / 55%)" stroke-width="1" stroke-dasharray="3 4"/>
    <g stroke="rgb(91 138 174 / 45%)" stroke-width="1" fill="none">
      <path d="M120 ${cy - H / 2} H860 M120 ${cy + H / 2} H860"/>
      <path d="M1100 ${cy - hChar / 2} H1880 M1100 ${cy + hChar / 2} H1880"/>
    </g>
  </svg>
  <!-- the pore field only appears once the matter has become char -->
  <div style="position:absolute;left:55%;top:${((cy - hChar / 2 - 3) / 1125 * 100).toFixed(1)}%;
    width:18%;height:${((hChar + 6) / 1125 * 100).toFixed(1)}%;overflow:hidden;opacity:.85">
    ${pores(41, 360, 34, 1, 'rgb(20 55 67', 7)}
  </div>
  <!-- the reactor: three zones, sand recirculating, at the point of conversion -->
  ${membrane('left:43%;top:24%;width:12%;height:56%', 'left')}
  <svg style="position:absolute;left:43%;top:24%;width:12%;height:56%" viewBox="0 0 240 630"
    fill="none" stroke="rgb(31 115 112 / 72%)" stroke-width="1.3">
    <rect x="52" y="18" width="136" height="168" rx="3"/>
    <rect x="52" y="214" width="136" height="196" rx="3"/>
    <rect x="52" y="438" width="136" height="168" rx="3"/>
    <path d="M120 0 V18 M120 606 V630"/>
    <path d="M188 102 C226 102 226 522 188 522" stroke-dasharray="4 6"/>
    <g stroke="rgb(91 138 174 / 40%)" stroke-width=".8">
      <path d="M66 44 H174 M66 66 H174 M66 240 H174 M66 262 H174 M66 284 H174"/>
    </g>
  </svg>
  ${thermal('04', 'M120 830 H820 C880 830 880 300 940 300 H1060 C1120 300 1120 780 1180 780 H1900', 2, 0.95, true, 52)}
  ${arc('left:-30%;top:-26%;width:70%;height:140%', 340, 1.6, 0.4)}
  ${refract(0.2)}${grain()}`;
},


/* 05 CAPEX — type zone: left 62%. A steel crop cut by the right edge and
   dissolving into the field, with one iridescent break down its leading edge.
   The cost bar itself is drawn in the .pptx so its numbers stay live. */
'art-05': () => `
  ${atmos([[12,20,52,48,C.pearl(86),1],[50,72,60,50,C.cyan(60),1],
           [88,18,46,44,C.nacre(48),1],[28,96,54,40,C.mint(56),1],
           [98,88,40,38,C.ice(44),1]])}
  <div class="crop crop--soft fade-l" style="right:0;top:4%;width:34%;height:92%">
    <img src="${img('steel')}"></div>
  <div class="iri-edge" style="right:34%;top:4%;width:2.5px;height:92%;opacity:.85"></div>
  ${arc('left:-22%;bottom:-62%;width:68%;height:124%', 10, 1.4, 0.48)}
  ${refract(0.2)}${grain()}`,

/* 06 OPEX DO PROJETO — a typographic field, not a chart. The 15,0 total sits
   behind everything as a ghost cut by the right edge; the two halves of it are
   set live on top. Type zone: the whole frame, over the ghost. */
'art-06': () => `
  ${atmos([[18,16,54,50,C.cyan(70),1],[78,68,68,58,C.mint(58),1],
           [94,14,42,40,C.nacre(52),1],[8,86,50,44,C.ice(50),1],
           [48,46,74,60,C.pearl(64),1]])}
  <div class="ghost" style="left:41%;top:6%;font-size:560px;letter-spacing:-.07em">15,0</div>
  <div class="crop crop--far fade-r" style="left:-8%;bottom:-20%;width:40%;height:64%;opacity:.5">
    <img src="${img('glass-condens')}"></div>
  <div class="rule" style="left:6%;right:6%;top:78%;opacity:.5"></div>
  ${arc('right:-36%;top:-42%;width:82%;height:156%', 170, 1.8, 0.44)}
  ${refract(0.24)}${grain()}`,

/* 07 OPEX EM REGIME — two overlapping translucent fields: what it costs and
   what it earns. The overlap IS the argument. Type zone: upper left and the
   right column. */
'art-07': () => `
  ${atmos([[16,22,52,48,C.pearl(84),1],[72,72,64,54,C.cyan(56),1],
           [92,28,44,42,C.nacre(46),1],[34,96,56,42,C.mint(56),1],
           [2,58,42,46,C.ice(46),1]])}
  <div class="stratum" style="left:6%;top:44%;width:46%;height:36%;
    background:linear-gradient(168deg, rgb(53 176 202 / 30%), rgb(53 176 202 / 7%))"></div>
  <div class="stratum" style="left:23%;top:55%;width:46%;height:31%;
    background:linear-gradient(168deg, rgb(255 255 255 / 82%), rgb(203 240 248 / 26%))"></div>
  <div class="iri-edge" style="left:23%;top:55%;width:46%;height:2.5px"></div>
  <div class="rule" style="left:6%;right:28%;top:80%;background:rgb(31 115 112 / 55%)"></div>
  <div class="crop crop--far fade-l" style="right:-4%;top:2%;width:36%;height:58%;opacity:.55">
    <img src="${img('carbon-macro')}"></div>
  ${refract(0.2)}${grain()}`,

/* 08 UNIT ECONOMICS — three translucent strata, overlapping and offset: the
   three revenues stacking into one margin. Each carries its own temperature —
   cyan for carbon, mint for material, warm pearl for the gate fee.
   Type zone: left 38%, plus a label on each stratum. */
'art-08': () => {
  /* VALUE CONSTRUCTION.
     Two bars on one origin and one scale, so the comparison is geometric:
       receita  = 995 + 2.000 + 182  (three [DOC] streams, stacked)
       custo    = OPEX pleno a 810 t/ano
     The cost bar is longer, and the amount by which it overshoots is the
     entire argument of the slide. Nothing here is a card. */
  const rev = M.UNIT.corcPorTChar + M.UNIT.contratoBPorT + M.UNIT.gateFeePorTChar;
  const cost = M.OPEX_REGIME.porT;
  const X0 = 640, XW = 1180;                 // origem e largura util, em px
  const k = XW / cost;                       // o maior valor define a escala
  const seg = [[M.UNIT.corcPorTChar, 'rgb(53 176 202 / 62%)'],
               [M.UNIT.contratoBPorT, 'rgb(151 220 199 / 62%)'],
               [M.UNIT.gateFeePorTChar, 'rgb(248 216 196 / 78%)']];
  let x = X0;
  const bars = seg.map(([v, f]) => {
    const w = v * k, r = `<rect x="${x.toFixed(0)}" y="330" width="${(w - 3).toFixed(0)}" height="74" fill="${f}"/>`
      + `<rect x="${x.toFixed(0)}" y="330" width="${(w - 3).toFixed(0)}" height="2" fill="rgb(255 255 255 / 88%)"/>`;
    x += w; return r;
  }).join('');
  const over = (cost - rev) * k;
  return `
  ${atmos([[12,18,50,46,C.cyan(66),1],[80,58,60,54,C.mint(54),1],
           [52,94,58,42,C.nacre(46),1],[96,10,38,34,C.peach(32),1],
           [2,72,44,46,C.ice(46),1]])}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    ${bars}
    <rect x="${X0}" y="530" width="${(rev * k - 3).toFixed(0)}" height="74" fill="rgb(91 138 174 / 26%)"/>
    <rect x="${(X0 + rev * k).toFixed(0)}" y="530" width="${over.toFixed(0)}" height="74" fill="rgb(201 101 74 / 60%)"/>
    <rect x="${X0}" y="530" width="${(cost * k).toFixed(0)}" height="2" fill="rgb(255 255 255 / 80%)"/>
    <!-- a única linha de governança: o mesmo quilo nunca é vendido duas vezes -->
    <path d="M${X0} 292 H${(X0 + XW).toFixed(0)}" stroke="rgb(31 115 112 / 55%)" stroke-width="1" stroke-dasharray="3 5"/>
    <g stroke="rgb(91 138 174 / 40%)" stroke-width="1">
      <path d="M${X0} 300 V640 M${(X0 + rev * k).toFixed(0)} 404 V530"/>
    </g>
  </svg>

  ${arc('left:-32%;top:-28%;width:74%;height:148%', 350, 1.6, 0.45)}
  ${refract(0.2)}${grain()}`;
},


/* 09 BREAKEVEN — one capacity line crossing the entire frame with the four
   thresholds marked on it. The story is told by where the nodes sit and how
   big they are. Type zone: above and below the line at each node. */
'art-09': () => {
  /* THRESHOLDS ON ONE SCALE.
     Four capacities, positioned by value on a shared axis, so the distance
     between them is readable. The two gaps that matter are drawn as spans:
       Módulo 1 -> breakeven pleno   (o que falta)
       breakeven -> sem gate fee     (o que a destinação vale)
     Both are arithmetic on [DOC] figures, not new claims. */
  const B = M.BREAKEVEN;
  const lo = 3500, hi = 7100, X0 = 150, XW = 1700;
  const at = v => X0 + ((v - lo) / (hi - lo)) * XW;
  const y = 620;
  const marks = [[B.caixa, 13], [B.capacidadeModulo1, 17], [B.ebitdaZero, 23], [B.semGateFee, 11]];
  return `
  ${atmos([[18,16,50,46,C.pearl(84),1],[74,62,60,54,C.cyan(54),1],
           [94,22,42,40,C.nacre(44),1],[24,94,54,40,C.mint(54),1],
           [0,56,40,44,C.ice(44),1]])}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    <!-- o vão que falta: Módulo 1 não alcança o breakeven pleno -->
    <rect x="${at(B.capacidadeModulo1).toFixed(0)}" y="${y - 46}" width="${(at(B.ebitdaZero) - at(B.capacidadeModulo1)).toFixed(0)}"
      height="92" fill="rgb(201 101 74 / 16%)"/>
    <!-- o que o gate fee da PepsiCo vale, em toneladas de breakeven -->
    <defs><pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(58)">
      <rect width="10" height="10" fill="rgb(31 115 112 / 5%)"/>
      <path d="M0 0 V10" stroke="rgb(31 115 112 / 26%)" stroke-width="1"/></pattern></defs>
    <rect x="${at(B.ebitdaZero).toFixed(0)}" y="${y - 26}" width="${(at(B.semGateFee) - at(B.ebitdaZero)).toFixed(0)}"
      height="52" fill="url(#hatch)"/>
    <path d="M${X0} ${y} H${X0 + XW}" stroke="rgb(31 115 112 / 55%)" stroke-width="1.4"/>
    ${marks.map(([v, h]) => `<path d="M${at(v).toFixed(0)} ${y - h * 4} V${y + h * 4}"
      stroke="rgb(91 138 174 / 60%)" stroke-width="1"/>`).join('')}
    <g stroke="rgb(31 115 112 / 45%)" stroke-width="1">
      <path d="M${at(B.capacidadeModulo1).toFixed(0)} ${y - 46} V${y - 92} M${at(B.ebitdaZero).toFixed(0)} ${y - 46} V${y - 92}"/>
      <path d="M${at(B.capacidadeModulo1).toFixed(0)} ${y - 84} H${at(B.ebitdaZero).toFixed(0)}"/>
    </g>
  </svg>
  ${marks.map(([v, h], i) => aperture(`${(at(v) / 2000 * 100).toFixed(2)}%`, `${(y / 1125 * 100).toFixed(2)}%`,
      [15, 21, 28, 12][i], 'light')).join('')}

  ${arc('right:-30%;top:-58%;width:66%;height:124%', 210, 2, 0.32)}
  ${refract(0.18)}${grain()}`;
},


/* 10 ESCALA — the cinematic frame. A luminous trajectory rising across an
   abstract, almost-white industrial horizon. Momentum, not a bar chart.
   Type zone: under each node, plus the headline top-left. */
'art-10': () => `
  ${atmos([[10,20,50,46,C.pearl(90),1],[60,18,58,52,C.cyan(60),1],
           [94,56,54,52,C.nacre(50),1],[38,98,64,46,C.mint(62),1],
           [80,94,46,38,C.peach(32),1]])}
  <div class="crop crop--far fade-t" style="left:0;bottom:0;width:100%;height:56%;opacity:.5">
    <img src="${img('steel')}"></div>
  <svg style="position:absolute;inset:0;width:100%;height:100%" fill="none">
    <defs>
      <linearGradient id="traj" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(122 168 201 / 34%)"/>
        <stop offset="46%" stop-color="rgb(53 176 202 / 82%)"/>
        <stop offset="100%" stop-color="rgb(151 220 199 / 98%)"/></linearGradient>
      <filter id="soft10"><feGaussianBlur stdDeviation="11"/></filter>
    </defs>
    <path d="M180 830 C560 800 900 690 1180 520 C1420 375 1640 300 1880 250"
      stroke="url(#traj)" stroke-width="20" filter="url(#soft10)" opacity=".55"/>
    <path d="M180 830 C560 800 900 690 1180 520 C1420 375 1640 300 1880 250"
      stroke="url(#traj)" stroke-width="2.2"/>
  </svg>
  <div class="node" style="left:8.4%;top:72.6%;width:16px;height:16px"></div>
  <div class="node" style="left:32%;top:65.2%;width:22px;height:22px"></div>
  <div class="node" style="left:58.4%;top:45.2%;width:28px;height:28px"></div>
  <div class="node" style="left:88%;top:20.2%;width:36px;height:36px"></div>
  ${arc('right:-28%;top:-56%;width:70%;height:132%', 200, 1.6, 0.55)}
  ${refract(0.24)}${grain()}`,

/* 11 DISCIPLINA — the single deep frame. Deep petroleum, never near-black,
   with mint light, one cyan glow and visible grain. Five gates as luminous
   points growing along a horizontal. Type zone: upper half for the sentence,
   the gates below it. */
'art-11': () => {
  /* GATE ARCHITECTURE — the graphic DNA of the deck.

     Not a timeline. Five membranes standing across the frame, each one a
     technical barrier, with the thermal line piercing them in sequence. What
     encodes the argument is the PORE DENSITY: each membrane is less porous
     than the last, because each gate closes a risk. By M15 the material is
     resolved. That is the slide's whole idea, and it is carried by the
     material rather than by a caption.

     The one deep frame in the deck, and deep petroleum — never near-black. */
  const dens = [0.82, 0.62, 0.44, 0.27, 0.12];
  const cols = dens.map((d, i) => {
    const left = 4 + i * 19;
    return membrane(`left:${left}%;top:36%;width:17.5%;height:62%`, 'left', 'deep')
      + `<div style="position:absolute;left:${left}%;top:36%;width:17.5%;height:62%;
          overflow:hidden;opacity:.9">${pores(100 + i * 7, 350, 730, d, 'rgb(9 32 30', 17, 'lit')}</div>`;
  }).join('');
  const apx = dens.map((_, i) => aperture(`${(4 + i * 19 + 8.75).toFixed(2)}%`, '44%', 13 + i * 4, 'deep')).join('');
  return `
  <div class="L" style="background:
    radial-gradient(64% 54% at 18% 10%, rgb(53 176 202 / 30%) 0%, transparent 68%),
    radial-gradient(58% 48% at 86% 74%, rgb(151 220 199 / 18%) 0%, transparent 72%),
    radial-gradient(50% 44% at 96% 6%, rgb(201 182 228 / 16%) 0%, transparent 70%),
    linear-gradient(168deg, #16382f 0%, #12302a 46%, #0e2a34 100%)"></div>
  ${cols}
  ${thermal('11', 'M40 495 C420 495 520 492 900 492 C1300 492 1500 490 1960 488', 1.8, 1)}
  ${apx}
  <div class="L" style="background-image:var(--tc-specular-brushed);opacity:.24;filter:blur(3px)"></div>
  ${arc('left:-36%;bottom:-70%;width:76%;height:132%', 24, 2, 0.3)}
  <div class="L grain" style="opacity:.4;mix-blend-mode:screen"></div>
  <div class="L scan" style="opacity:.28"></div>`;
},


/* 12 FINANCIAMENTO — back into the light, and brighter than the cover. One
   refraction band crosses the whole frame; a membrane closes the bottom-right
   corner. It has to read as an opening, not an ending. */
'art-12': () => `
  ${atmos([[14,14,54,50,C.pearl(94),1],[68,32,64,58,C.cyan(66),1],
           [94,72,52,50,C.nacre(50),1],[24,92,58,46,C.mint(66),1],
           [54,52,76,62,C.pearl(66),1]])}
  <div class="L" style="background:linear-gradient(104deg,
    transparent 0%, transparent 24%,
    rgb(150 219 240 / 60%) 36%, rgb(255 255 255 / 86%) 45%,
    rgb(206 192 235 / 54%) 54%, rgb(248 216 196 / 40%) 63%,
    transparent 78%, transparent 100%);filter:blur(30px);mix-blend-mode:screen"></div>
  <div class="obj" style="right:-24%;bottom:-46%;width:56%;height:112%;opacity:.9">
    <img src="${img('membrane')}" style="object-fit:contain"></div>
  ${arc('right:-18%;bottom:-50%;width:60%;height:118%', 290, 1.2, 0.85)}
  ${arc('left:-42%;top:-36%;width:88%;height:156%', 120, 2.2, 0.36)}
  ${refract(0.3)}${grain()}`,
};

/* --- Render -------------------------------------------------------------- */

const html = `<!doctype html><meta charset="utf-8"><style>${css}${CSS}</style>
<body data-theme="light">${Object.entries(PLATES)
  .map(([id, f]) => `<div class="plate" id="${id}">${f()}</div>`).join('\n')}</body>`;

fs.writeFileSync('.preview/art.html', html);

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + path.resolve('.preview/art.html'));
await p.waitForTimeout(1400);
for (const id of Object.keys(PLATES)) {
  await p.locator('#' + id).screenshot({ path: path.join(OUT, id + '.jpg'), type: 'jpeg', quality: 94 });
}
await b.close();
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log('art plates:', Object.keys(PLATES).length);
