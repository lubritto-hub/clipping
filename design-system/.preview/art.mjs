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
'art-04': () => `
  ${atmos([[22,12,52,46,C.cyan(74),1],[82,52,66,64,C.mint(56),1],
           [56,94,62,44,C.nacre(46),1],[98,8,38,34,C.pearl(76),1],
           [4,82,46,44,C.ice(50),1]])}
  <div class="crop crop--far fade-l" style="right:0;top:0;width:46%;height:100%;opacity:.5">
    <img src="${img('steel')}"></div>
  <svg style="position:absolute;right:4%;top:7%;width:36%;height:86%" viewBox="0 0 380 840"
    fill="none" stroke="rgb(31 115 112 / 70%)" stroke-width="1.2">
    <rect x="96" y="40" width="188" height="230" rx="4"/>
    <rect x="96" y="300" width="188" height="250" rx="4"/>
    <rect x="96" y="580" width="188" height="200" rx="4"/>
    <path d="M96 270 H284 M96 550 H284"/>
    <path d="M190 40 V0 M190 780 V840"/>
    <path d="M60 155 H96 M284 425 H340 M60 680 H96"/>
    <circle cx="60" cy="155" r="5"/><circle cx="340" cy="425" r="5"/><circle cx="60" cy="680" r="5"/>
    <path d="M284 155 C356 155 356 680 284 680" stroke-dasharray="5 7"/>
    <g stroke="rgb(91 138 174 / 46%)" stroke-width=".9">
      <path d="M112 70 H268 M112 96 H268 M112 122 H268"/>
      <path d="M112 330 H268 M112 356 H268 M112 382 H268 M112 408 H268"/>
    </g>
  </svg>
  ${arc('left:-34%;top:-22%;width:78%;height:146%', 340, 1.4, 0.5)}
  ${refract(0.22)}${grain()}`,

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
'art-08': () => `
  ${atmos([[14,18,50,46,C.cyan(70),1],[82,54,62,56,C.mint(58),1],
           [54,94,60,44,C.nacre(48),1],[96,10,38,36,C.peach(34),1],
           [4,76,46,46,C.ice(48),1]])}
  <div class="stratum" style="left:44%;top:15%;width:52%;height:22%;
    background:linear-gradient(160deg, rgb(53 176 202 / 32%), rgb(53 176 202 / 6%))"></div>
  <div class="iri-edge" style="left:44%;top:15%;width:52%;height:2.5px"></div>
  <div class="stratum" style="left:39%;top:40%;width:54%;height:22%;
    background:linear-gradient(160deg, rgb(151 220 199 / 36%), rgb(151 220 199 / 7%))"></div>
  <div class="iri-edge" style="left:39%;top:40%;width:54%;height:2.5px"></div>
  <div class="stratum" style="left:48%;top:65%;width:48%;height:22%;
    background:linear-gradient(160deg, rgb(248 216 196 / 56%), rgb(248 216 196 / 10%))"></div>
  <div class="iri-edge" style="left:48%;top:65%;width:48%;height:2.5px"></div>
  ${arc('left:-32%;top:-26%;width:74%;height:146%', 350, 1.5, 0.5)}
  ${refract(0.22)}${grain()}`,

/* 09 BREAKEVEN — one capacity line crossing the entire frame with the four
   thresholds marked on it. The story is told by where the nodes sit and how
   big they are. Type zone: above and below the line at each node. */
'art-09': () => `
  ${atmos([[20,16,52,48,C.pearl(86),1],[76,66,62,54,C.cyan(54),1],
           [94,22,42,40,C.nacre(44),1],[26,94,54,40,C.mint(54),1],
           [0,56,40,44,C.ice(44),1]])}
  <div class="rule" style="left:0;right:0;top:56%;height:1.5px;
    background:linear-gradient(90deg, transparent 0%, rgb(31 115 112 / 62%) 8%,
      rgb(31 115 112 / 62%) 92%, transparent 100%)"></div>
  <div class="node" style="left:15%;top:55.1%;width:19px;height:19px"></div>
  <div class="node" style="left:39%;top:54.7%;width:25px;height:25px"></div>
  <div class="node" style="left:63%;top:54.2%;width:32px;height:32px"></div>
  <div class="node" style="left:87%;top:55.3%;width:15px;height:15px;
    box-shadow:0 0 0 1px rgb(201 101 74 / 55%), 0 0 24px 5px rgb(226 128 98 / 24%);
    background:radial-gradient(circle at 34% 30%, #fff 0%, var(--tc-optic-peach) 70%)"></div>
  <div class="tick" style="left:15%;top:44%;height:11%;opacity:.55"></div>
  <div class="tick" style="left:39%;top:41%;height:14%;opacity:.55"></div>
  <div class="tick" style="left:63%;top:37%;height:18%;opacity:.6"></div>
  <div class="tick" style="left:87%;top:57.5%;height:12%;opacity:.5"></div>
  ${arc('right:-30%;top:-58%;width:64%;height:120%', 210, 2, 0.34)}
  ${refract(0.18)}${grain()}`,

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
'art-11': () => `
  <div class="L" style="background:
    radial-gradient(64% 54% at 20% 12%, rgb(53 176 202 / 32%) 0%, transparent 68%),
    radial-gradient(58% 48% at 84% 76%, rgb(151 220 199 / 20%) 0%, transparent 72%),
    radial-gradient(50% 44% at 96% 6%, rgb(201 182 228 / 18%) 0%, transparent 70%),
    linear-gradient(168deg, #16382f 0%, #12302a 46%, #0e2a34 100%)"></div>
  <div class="crop fade-l" style="right:-6%;top:-14%;width:42%;height:68%;opacity:.3;
    mix-blend-mode:screen"><img src="${img('carbon-macro')}" style="filter:blur(2px)"></div>
  <div class="L" style="background-image:var(--tc-specular-brushed);opacity:.3;filter:blur(2px)"></div>
  <div class="rule" style="left:5%;right:5%;top:74%;background:rgb(151 220 199 / 38%)"></div>
  ${[9.5, 28.5, 47.5, 66.5, 85.5].map((l, i) =>
    `<div class="node" style="left:${l}%;top:${73.3 - i * 0.1}%;width:${13 + i * 3}px;height:${13 + i * 3}px;
      box-shadow:0 0 0 1px rgb(151 220 199 / 62%), 0 0 ${24 + i * 7}px ${4 + i}px rgb(53 176 202 / ${28 + i * 6}%);
      background:radial-gradient(circle at 34% 30%, #fff 0%, var(--tc-palette-mint-300) 70%)"></div>`).join('')}
  ${arc('left:-36%;bottom:-68%;width:76%;height:132%', 24, 2, 0.34)}
  <div class="L grain" style="opacity:.42;mix-blend-mode:screen"></div>
  <div class="L scan" style="opacity:.3"></div>`,

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
