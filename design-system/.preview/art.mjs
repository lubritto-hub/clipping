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
import { W, H, CSS, atmos, pores, thermal, membrane, aperture } from './devices.mjs';

/* The geometry on plates 04, 08 and 09 is DERIVED from the model, not drawn by
   eye. A band that is 20% of another band because the yield is 20% is the
   difference between a diagram and a decoration. */
const M = createRequire(import.meta.url)('../../deck/model.js');

const OUT = path.resolve('.preview/deck-assets');
const css = fs.readFileSync('dist/styles.css', 'utf8');
const img = n => `./img/${n}.svg`;



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
/* MODE A — hero atmosférico. A membrana não é uma esfera de vidro: tem um
   campo de poros dentro dela, então é uma MEMBRANA DE CARBONO. É o device da
   permanência, apresentado antes de ser explicado. */
'art-01': () => `
  ${atmos([[16,18,52,48,C.cyan(78),1],[80,32,74,70,C.nacre(58),1],
           [56,88,60,50,C.mint(64),1],[98,80,46,44,C.peach(38),1],
           [6,74,48,44,C.ice(52),1]])}
  <div class="crop crop--far fade-t" style="right:-8%;bottom:-16%;width:48%;height:72%;opacity:.5">
    <img src="${img('fibre')}"></div>
  <div class="obj" style="right:-16%;top:-30%;width:68%;height:126%;opacity:.96">
    <img src="${img('membrane')}" style="object-fit:contain"></div>
  <div style="position:absolute;right:-16%;top:-30%;width:68%;height:126%;overflow:hidden;
    border-radius:50%;opacity:.5;-webkit-mask-image:radial-gradient(closest-side,#000 62%,transparent 96%);
    mask-image:radial-gradient(closest-side,#000 62%,transparent 96%)">
    ${pores(3, 1360, 1420, 0.5, 'rgb(20 55 67', 22)}
  </div>
  ${thermal('01', 'M0 806 C420 806 620 790 900 764 C1240 733 1540 716 2000 706', 1.4, 0.6)}
  ${arc('right:-30%;top:-48%;width:100%;height:176%', 150, 1.2, 0.9)}
  ${arc('left:-40%;top:22%;width:82%;height:132%', 330, 2, 0.42)}
  <div class="L bloom" style="background-image:var(--tc-lightleak-top)"></div>
  ${refract(0.3)}${grain()}`,


/* 02 OPORTUNIDADE — type zone: left 58% above the line; the supply→gap→demand
   axis sits at y 68%. A colossal faded halo at the right, and a ghost 100 that
   is the demand the market cannot reach. */
'art-02': () => {
  /* MODE A — a lacuna DESENHADA EM ESCALA VERDADEIRA.
     A barra inteira é a demanda anual projetada para 2030 (100 Mt). O que já
     foi entregue no mundo — 1,5 Mt, acumulado — é a lasca na ponta esquerda.
     Um gráfico de três caixas esconderia essa razão de 66x; a barra a mostra.
     O campo de poros ocupa o que ainda NÃO existe: demanda não resolvida. */
  const X0 = 100, XW = 1800;
  const sliver = XW * (M.MERCADO.entregueMundoMt / M.MERCADO.demandaMt2030);
  const y = 470, h = 128;
  return `
  ${atmos([[14,24,54,50,C.cyan(72),1],[86,42,82,76,C.nacre(52),1],
           [44,92,66,46,C.mint(60),1],[68,6,40,36,C.pearl(78),1],
           [2,62,44,52,C.ice(48),1]])}
  <div style="position:absolute;left:${(X0 / 20).toFixed(1)}%;top:${(y / 11.25).toFixed(1)}%;
    width:${(XW / 20).toFixed(1)}%;height:${(h / 11.25).toFixed(1)}%;overflow:hidden;opacity:.6">
    ${pores(22, 1800, 130, 0.85, 'rgb(20 55 67', 13)}
  </div>
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    <rect x="${X0}" y="${y}" width="${XW}" height="${h}" fill="rgb(158 194 220 / 16%)"/>
    <rect x="${X0}" y="${y}" width="${XW}" height="1.4" fill="rgb(91 138 174 / 55%)"/>
    <rect x="${X0}" y="${y + h - 1.4}" width="${XW}" height="1.4" fill="rgb(91 138 174 / 40%)"/>
    <rect x="${X0}" y="${y}" width="${sliver.toFixed(1)}" height="${h}" fill="rgb(31 115 112 / 82%)"/>
    <path d="M${X0} ${y - 44} V${y} M${(X0 + XW).toFixed(0)} ${y - 44} V${y}"
      stroke="rgb(91 138 174 / 50%)" stroke-width="1"/>
    <path d="M${X0} ${y - 34} H${(X0 + XW).toFixed(0)}" stroke="rgb(91 138 174 / 40%)" stroke-width="1"/>
  </svg>
  ${aperture(`${((X0 + sliver) / 20).toFixed(2)}%`, `${((y + h) / 11.25).toFixed(2)}%`, 16, 'light')}
  ${arc('left:-26%;bottom:-74%;width:74%;height:138%', 20, 1.6, 0.5)}
  ${refract(0.24)}${grain()}`;
},


/* 03 A TESE — three material states in a BROKEN sequence: three sizes, three
   vertical offsets, three different crops, each dissolving on a different
   edge. material → technology → value. Type sits under each. */
/* MODE B — três estados da matéria numa sequência quebrada. A linha térmica
   costura os três, porque é o calor que os liga; o campo de poros só aparece no
   terceiro, porque é ali que a estrutura porosa passa a existir. */
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

  <div class="crop fade-l" style="left:66%;top:28%;width:34%;height:38%">
    <img src="${img('carbon-macro')}"></div>
  <div style="position:absolute;left:66%;top:30%;width:34%;height:44%;overflow:hidden;opacity:.7;
    -webkit-mask-image:linear-gradient(270deg,#000 0%,#000 52%,transparent 100%);
    mask-image:linear-gradient(270deg,#000 0%,#000 52%,transparent 100%)">
    ${pores(55, 700, 500, 0.9, 'rgb(20 55 67', 24)}
  </div>
  <div class="iri-edge" style="right:0;top:28%;width:2.5px;height:38%"></div>

  ${thermal('03', 'M120 700 C420 700 520 380 760 340 C980 304 1120 470 1340 560 C1520 634 1700 620 1960 600', 1.6, 0.75, true, 40)}
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
'art-05': () => {
  /* MODE C — CAPEX. Duas membranas dimensionadas pela proporção real dos work
     packages: engenharia e construção. O aço atrás é o que o dinheiro compra. */
  const wp = M.WP.filter(w => w[2] === 'CAPEX');
  const tot = wp.reduce((a, w) => a + w[1], 0);
  const X0 = 100, XW = 1180, y = 690, h = 168;
  let x = X0;
  const planes = wp.map(([, v], i) => {
    const w = v * XW / tot - (i ? 8 : 0);
    const xx = x + (i ? 8 : 0);
    x = xx + w;
    return membrane(`left:${(xx / 20).toFixed(2)}%;top:${(y / 11.25).toFixed(2)}%;
      width:${(w / 20).toFixed(2)}%;height:${(h / 11.25).toFixed(2)}%`, 'left')
      + `<div style="position:absolute;left:${(xx / 20).toFixed(2)}%;top:${(y / 11.25).toFixed(2)}%;
          width:${(w / 20).toFixed(2)}%;height:${(h / 11.25).toFixed(2)}%;
          background:${i ? 'rgb(31 115 112 / 26%)' : 'rgb(91 138 174 / 20%)'}"></div>`;
  }).join('');
  return `
  ${atmos([[12,20,52,48,C.pearl(86),1],[50,72,60,50,C.cyan(60),1],
           [88,18,46,44,C.nacre(48),1],[28,96,54,40,C.mint(56),1],
           [98,88,40,38,C.ice(44),1]])}
  <div class="crop crop--soft fade-l" style="right:0;top:4%;width:34%;height:92%">
    <img src="${img('steel')}"></div>
  <div class="iri-edge" style="right:34%;top:4%;width:2.5px;height:92%;opacity:.85"></div>
  ${planes}
  ${arc('left:-22%;bottom:-62%;width:68%;height:124%', 10, 1.4, 0.48)}
  ${refract(0.2)}${grain()}`;
},


/* 06 OPEX DO PROJETO — a typographic field, not a chart. The 15,0 total sits
   behind everything as a ghost cut by the right edge; the two halves of it are
   set live on top. Type zone: the whole frame, over the ghost. */
'art-06': () => {
  /* MODE C — campo tipográfico. O fantasma "15,0" é o total; sobre ele, duas
     bandas em proporção real: o que vira ativo e o que se consome provando-o,
     e depois quem paga cada parte. */
  const X0 = 100, XW = 1800, k = XW / M.TOTAL_POC;
  return `
  ${atmos([[18,16,54,50,C.cyan(70),1],[78,68,68,58,C.mint(58),1],
           [94,14,42,40,C.nacre(52),1],[8,86,50,44,C.ice(50),1],
           [48,46,74,60,C.pearl(64),1]])}
  <div class="ghost" style="left:41%;top:4%;font-size:520px;letter-spacing:-.07em">15,0</div>
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    <rect x="${X0}" y="720" width="${(M.CAPEX_POC * k - 6).toFixed(0)}" height="58" fill="rgb(91 138 174 / 34%)"/>
    <rect x="${(X0 + M.CAPEX_POC * k).toFixed(0)}" y="720" width="${(M.OPEX_POC * k).toFixed(0)}" height="58" fill="rgb(31 115 112 / 52%)"/>
    <rect x="${X0}" y="720" width="${XW}" height="1.6" fill="rgb(255 255 255 / 85%)"/>
    <rect x="${X0}" y="880" width="${(M.FINEP.subvencao * k - 6).toFixed(0)}" height="26" fill="rgb(53 176 202 / 46%)"/>
    <rect x="${(X0 + M.FINEP.subvencao * k).toFixed(0)}" y="880" width="${(M.FINEP.contrapartida * k).toFixed(0)}" height="26" fill="rgb(206 192 235 / 62%)"/>
  </svg>
  <div class="crop crop--far fade-r" style="left:-8%;top:-14%;width:34%;height:50%;opacity:.42">
    <img src="${img('glass-condens')}"></div>
  ${arc('right:-36%;top:-42%;width:82%;height:156%', 170, 1.8, 0.44)}
  ${refract(0.24)}${grain()}`;
},


/* 07 OPEX EM REGIME — two overlapping translucent fields: what it costs and
   what it earns. The overlap IS the argument. Type zone: upper left and the
   right column. */
'art-07': () => {
  /* MODE C — o mecanismo do slide: a curva de custo unitário contra o volume.
     custo/t = fixo/volume + variável. É por isso que a POC não fecha e a escala
     fecha, e a curva mostra isso sem precisar afirmá-lo.
     Deliberadamente SEM linha de receita cruzando: esta curva usa a base de
     custo [EST], e os limiares do slide 09 vêm do solver do plano com salários
     plenos. Desenhar um cruzamento aqui contradiria aqueles números. */
  const f = M.OPEX_REGIME.fixoAno, v = M.OPEX_REGIME.varPorT;
  const cost = t => f / t + v;
  const X0 = 260, XW = 1560, Y0 = 250, YH = 520;
  const vmin = 700, vmax = 13000, cmax = 3600, cmin = 700;
  const px = t => X0 + (Math.log(t / vmin) / Math.log(vmax / vmin)) * XW;
  const py = c => Y0 + (1 - (c - cmin) / (cmax - cmin)) * YH;
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = vmin * Math.pow(vmax / vmin, i / 60);
    pts.push(`${px(t).toFixed(0)} ${py(cost(t)).toFixed(0)}`);
  }
  const d = 'M' + pts.join(' L');
  return `
  ${atmos([[16,22,52,48,C.pearl(84),1],[72,72,64,54,C.cyan(56),1],
           [92,28,44,42,C.nacre(46),1],[34,96,56,42,C.mint(56),1],
           [2,58,42,46,C.ice(46),1]])}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    <g stroke="rgb(91 138 174 / 30%)" stroke-width="1" fill="none">
      <path d="M${X0} ${Y0} V${Y0 + YH} H${X0 + XW}"/>
      ${[1000, 2000, 3000].map(c => `<path d="M${X0} ${py(c).toFixed(0)} H${X0 + XW}" stroke-dasharray="2 7"/>`).join('')}
    </g>
    <path d="${d} L${px(vmax).toFixed(0)} ${(Y0 + YH).toFixed(0)} L${X0} ${(Y0 + YH).toFixed(0)} Z"
      fill="#35B0CA" fill-opacity="0.1"/>
  </svg>
  ${thermal('07', d, 2.2, 1, true, 12)}
  ${aperture(`${(px(M.PILOTO.charAno) / 20).toFixed(2)}%`, `${(py(cost(M.PILOTO.charAno)) / 11.25).toFixed(2)}%`, 22, 'light')}
  ${aperture(`${(px(M.BREAKEVEN.capacidadeModulo1) / 20).toFixed(2)}%`, `${(py(cost(M.BREAKEVEN.capacidadeModulo1)) / 11.25).toFixed(2)}%`, 16, 'light')}
  ${aperture(`${(px(M.BREAKEVEN.grupo) / 20).toFixed(2)}%`, `${(py(cost(M.BREAKEVEN.grupo)) / 11.25).toFixed(2)}%`, 12, 'light')}
  <div class="crop crop--far fade-l" style="right:-4%;top:2%;width:30%;height:44%;opacity:.4">
    <img src="${img('carbon-macro')}"></div>
  ${refract(0.2)}${grain()}`;
},


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
    <g stroke="rgb(91 138 174 / 40%)" stroke-width="1" fill="none">
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
      stroke="rgb(91 138 174 / 60%)" stroke-width="1" fill="none"/>`).join('')}
    <g stroke="rgb(31 115 112 / 45%)" stroke-width="1" fill="none">
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
'art-10': () => {
  /* MODE A — escala como INFRAESTRUTURA crescendo, não como curva genérica.
     Quatro membranas, cada uma dimensionada pela capacidade da sua fase; a
     trajetória luminosa fica atrás, como camada secundária. */
  const caps = M.ESCALA.map(e => e[2]);
  const maxC = Math.max(...caps);
  const planes = caps.map((c, i) => {
    const w = 7 + 11 * Math.pow(c / maxC, 0.42);
    const h = 16 + 46 * Math.pow(c / maxC, 0.42);
    const left = 5 + i * 24;
    return membrane(`left:${left}%;bottom:22%;width:${w.toFixed(1)}%;height:${h.toFixed(1)}%`, 'left')
      + `<div style="position:absolute;left:${left}%;bottom:22%;width:${w.toFixed(1)}%;
          height:${h.toFixed(1)}%;overflow:hidden;opacity:.4">
          ${pores(200 + i * 11, 260, 620, 0.3 + i * 0.16, 'rgb(20 55 67', 11)}</div>`;
  }).join('');
  return `
  ${atmos([[10,20,50,46,C.pearl(90),1],[60,18,58,52,C.cyan(60),1],
           [94,56,54,52,C.nacre(50),1],[38,98,64,46,C.mint(62),1],
           [80,94,46,38,C.peach(32),1]])}
  <div class="crop crop--far fade-t" style="left:0;bottom:0;width:100%;height:48%;opacity:.4">
    <img src="${img('steel')}"></div>
  ${thermal('10', 'M180 900 C560 880 900 800 1180 660 C1420 540 1640 420 1900 330', 1.6, 0.6)}
  ${planes}
  ${arc('right:-28%;top:-56%;width:70%;height:132%', 200, 1.6, 0.5)}
  ${refract(0.24)}${grain()}`;
},


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
/* MODE A — conclusão luminosa, e mais clara que a capa. O campo de poros
   aparece uma última vez quase totalmente resolvido: é o eco do slide 11,
   depois que todos os gates fecharam. */
'art-12': () => `
  ${atmos([[14,14,54,50,C.pearl(94),1],[68,32,64,58,C.cyan(66),1],
           [94,72,52,50,C.nacre(50),1],[24,92,58,46,C.mint(66),1],
           [54,52,76,62,C.pearl(66),1]])}
  <div style="position:absolute;left:4%;top:60%;width:56%;height:30%;overflow:hidden;opacity:.5;
    -webkit-mask-image:linear-gradient(90deg,#000 0%,transparent 88%);
    mask-image:linear-gradient(90deg,#000 0%,transparent 88%)">
    ${pores(255, 1120, 340, 0.1, 'rgb(20 55 67', 15)}
  </div>
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
