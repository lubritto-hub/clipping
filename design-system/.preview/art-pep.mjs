/* ===========================================================================
   ART LAYERS — PEPSICO / PETROLINA, REGISTRO DO COCO

   Mesmos três devices do outro baralho (campo de poros, linha térmica,
   membrana), importados de devices.mjs — o que muda é o REGISTRO, e um
   registro é um conjunto de cores, não um conjunto de mecanismos.

   Aqui o registro é o próprio fruto: casca marrom, endocarpo quase preto,
   verde de palmeira, creme de coir. O azul-menta pertence à identidade da
   venture e não aparece neste baralho.

   ---------------------------------------------------------------------------
   A CAMADA DE ENGENHARIA

   O que faz sete quadros lerem como UM SISTEMA não é o fundo — fundos variam
   por assunto — é a MOLDURA. Todos os sete carregam exatamente a mesma:
   grade usinada muito fraca, quadro de prancha com marcas de registro nos
   cantos, escala cotada no pé e uma régua de aço escovado com o código da
   chapa. É a linguagem de um desenho técnico, e é a repetição idêntica que
   constrói a identidade.

   Prata é ESTRUTURA, nunca preenchimento: fios, marcas, réguas. Não existe
   nenhuma área prateada neste baralho.

   E o pátio de casca está no fundo de três quadros, porque ele é a premissa:
   a biomassa já existe, nesta quantidade, hoje.
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { W, H, CSS, atmos, pores, thermal, membrane, aperture,
         regMarks, techGrid, metalRule } from './devices.mjs';

const P = createRequire(import.meta.url)('../../deck/pepsico.js');

const OUT = path.resolve('.preview/deck-assets');
const css = fs.readFileSync('dist/styles.css', 'utf8');
const img = n => `./img/${n}.svg`;

/* --- O registro do coco --------------------------------------------------
   Meio-tons, pela mesma razão de sempre: quase-brancos sobre um chão creme
   voltam à média do chão e o campo desaparece. */
const C = {
  coir:  a => `rgb(232 214 182 / ${a}%)`,   // creme de fibra
  husk:  a => `rgb(198 166 118 / ${a}%)`,   // casca
  palm:  a => `rgb(150 178 132 / ${a}%)`,   // verde de palmeira
  sage:  a => `rgb(178 196 162 / ${a}%)`,   // verde acinzentado
  ember: a => `rgb(226 172 110 / ${a}%)`,   // o único quente — a pirólise
  cream: a => `rgb(253 249 240 / ${a}%)`,
};

const STEEL = a => `rgb(126 140 144 / ${a}%)`;

/* Sobre o chão creme o grão precisa ser mais fino que sobre o perolado, ou
   lê como sujeira num material que é justamente sobre limpeza. */
const grain = () => `<div class="L grain" style="opacity:.2"></div>
  <div class="L scan" style="opacity:.34"></div><div class="L dither" style="opacity:.05"></div>`;

/* A refração perde o prisma frio: aqui a luz atravessa fibra, não vidro. */
const bloom = (o = 0.5) => `<div class="L" style="background:
  radial-gradient(62% 48% at 26% 14%, rgb(255 248 228 / 78%) 0%, transparent 66%),
  radial-gradient(52% 44% at 84% 84%, rgb(150 178 132 / 26%) 0%, transparent 70%);
  mix-blend-mode:screen;filter:blur(52px);opacity:${o}"></div>`;

const arc = (st, a = 200, blur = 1.2, op = 0.6) =>
  `<div class="arc arc--glow" style="${st};--a:${a}deg;opacity:${op * 0.5};
     background:conic-gradient(from ${a}deg, transparent 0deg,
       rgb(255 246 224) 60deg, rgb(198 166 118) 130deg, transparent 200deg)"></div>
   <div class="arc" style="${st};--a:${a}deg;--ab:${blur}px;opacity:${op};
     background:conic-gradient(from ${a}deg, transparent 0deg,
       rgb(255 250 236) 56deg, rgb(226 214 182) 116deg,
       rgb(150 178 132) 158deg, transparent 206deg)"></div>`;

const CREAM = 'rgb(90 68 40';   // tinta dos poros sobre chão claro

/* --- O PÁTIO -------------------------------------------------------------
   A fotografia de referência, redesenhada. Entra por baixo de tudo, esfumada
   no topo, porque acima dela mora o texto. Nunca aparece inteira: é uma
   premissa, não uma paisagem. */
const yard = (op = 0.34, h = 38) =>
  `<div class="crop fade-t" style="left:0;bottom:0;width:100%;height:${h}%;opacity:${op}">
     <img src="${img('coco-yard')}" style="object-position:50% 100%"></div>`;

/* O véu. O pátio é a premissa, não a paisagem: onde mora o texto ele tem de
   recuar. A luz do baralho vem da esquerda, então o véu vem com ela — é uma
   decisão de iluminação, não um remendo sobre a fotografia. */
const veil = (to = 66) => `<div class="L" style="background:linear-gradient(96deg,
  rgb(253 249 240 / 92%) 0%, rgb(253 249 240 / 74%) ${to * 0.45}%,
  rgb(253 249 240 / 20%) ${to}%, transparent 100%)"></div>`;

/* --- A MOLDURA TÉCNICA ---------------------------------------------------
   Idêntica nos sete quadros. `code` é a cota da chapa; `dark` inverte o fio
   para o único quadro profundo. */
function frame(code, dark = false) {
  const line = dark ? 'rgb(186 200 202 / 34%)' : STEEL(38);
  const tick = dark ? 'rgb(186 200 202 / 26%)' : STEEL(30);
  const I = 34;                                        // recuo do quadro
  const scale = [];                                    // escala cotada no pé
  for (let x = I; x <= W - I; x += 62)
    scale.push(`<path d="M${x} ${H - I} v${(x - I) % 310 === 0 ? -13 : -6}"/>`);
  return `
    ${techGrid(125, dark ? 'rgb(186 200 202 / 100%)' : 'rgb(126 140 144 / 100%)', dark ? 0.05 : 0.06)}
    <svg style="position:absolute;inset:0;width:100%;height:100%" fill="none"
      stroke="${line}" stroke-width="1">
      <rect x="${I}" y="${I}" width="${W - I * 2}" height="${H - I * 2}"/>
    </svg>
    <svg style="position:absolute;inset:0;width:100%;height:100%" fill="none"
      stroke="${tick}" stroke-width="1">${scale.join('')}</svg>
    ${regMarks(dark ? 'rgb(186 200 202 / 52%)' : STEEL(58), 34, 18)}
    ${metalRule(`right:34px;top:44px;width:190px;height:6px`, './img/metal-plate.svg', dark ? 0.5 : 0.78)}
    <div style="position:absolute;right:238px;top:41px;
      font:400 12px/1 Helvetica,Arial,sans-serif;letter-spacing:.24em;
      color:${dark ? 'rgb(186 200 202 / 62%)' : STEEL(72)}">${code}</div>`;
}

const PLATES = {

/* 01 CAPA — o pátio é o fundo (a premissa: a casca já existe, hoje), o fruto
   ocupa a direita, cortado pelo quadro. Zona de tipo: esquerda 54%. */
'pep-01': () => `
  ${atmos([[18,18,54,50,C.coir(72),1],[80,34,74,68,C.husk(44),1],
           [52,90,62,50,C.palm(52),1],[96,84,44,42,C.ember(30),1],
           [6,72,48,46,C.sage(46),1]])}
  ${yard(0.44, 38)}${veil(84)}
  <div class="obj" style="left:62%;top:-34%;width:58%;height:126%;opacity:.96">
    <img src="${img('coco-section')}" style="object-fit:contain"></div>
  ${arc('left:60%;top:-38%;width:62%;height:134%', 138, 1.1, 0.62)}
  <svg style="position:absolute;inset:0;width:100%;height:100%" fill="none"
    stroke="rgb(126 140 144 / 62%)" stroke-width="1">
    <path d="M1352 372 h-230 M1352 372 v-9"/>
    <circle cx="1352" cy="372" r="3.5"/>
  </svg>
  ${bloom(0.55)}${grain()}
  ${frame('PET · 01 — BIOMASSA / PÁTIO')}`,

/* 02 PROCESSO — o balanço de massa desenhado em proporção: 1 t de casca seca
   entra, ~0,3 t de biochar sai. A linha térmica sobe até a faixa de pirólise
   e volta, porque é isso que a temperatura faz. */
'pep-02': () => {
  const yieldR = P.PROCESSO.rendimentoKgPorT / 1000;      // 0,30
  const H0 = 150, hChar = H0 * yieldR, cy = 560;
  const band = (x1, x2, hL, hR, fill) =>
    `<path d="M${x1} ${cy - hL / 2} L${x2} ${cy - hR / 2} L${x2} ${cy + hR / 2} L${x1} ${cy + hL / 2} Z" fill="${fill}"/>`;
  return `
  ${atmos([[14,16,50,46,C.cream(86),1],[62,26,58,52,C.coir(56),1],
           [90,72,50,48,C.palm(44),1],[30,94,56,42,C.sage(50),1],
           [4,66,42,44,C.husk(34),1]])}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    ${band(110, 780, H0, H0, 'rgb(198 166 118 / 52%)')}
    ${band(1180, 1500, hChar, hChar, 'rgb(61 42 28 / 72%)')}
    <g stroke="rgb(122 96 62 / 42%)" stroke-width="1" fill="none">
      <path d="M110 ${cy - H0 / 2} H780 M110 ${cy + H0 / 2} H780"/>
      <path d="M1180 ${cy - hChar / 2} H1880 M1180 ${cy + hChar / 2} H1880"/>
    </g>
    <g stroke="rgb(126 140 144 / 48%)" stroke-width="1" fill="none">
      <path d="M110 ${cy - H0 / 2 - 40} v-14 M780 ${cy - H0 / 2 - 40} v-14 M110 ${cy - H0 / 2 - 47} H780"/>
      <path d="M1180 ${cy + hChar / 2 + 40} v14 M1500 ${cy + hChar / 2 + 40} v14 M1180 ${cy + hChar / 2 + 47} H1500"/>
    </g>
  </svg>
  <div style="position:absolute;left:59%;top:${((cy - hChar / 2 - 3) / 1125 * 100).toFixed(1)}%;
    width:16%;height:${((hChar + 6) / 1125 * 100).toFixed(1)}%;overflow:hidden;opacity:.9">
    ${pores(61, 320, 52, 1, CREAM, 8)}
  </div>
  ${membrane('left:39%;top:22%;width:16%;height:58%', 'left')}
  <svg style="position:absolute;left:39%;top:22%;width:16%;height:58%" viewBox="0 0 320 650"
    fill="none" stroke="rgb(77 102 64 / 72%)" stroke-width="1.3">
    <rect x="72" y="24" width="176" height="176" rx="4"/>
    <rect x="72" y="238" width="176" height="200" rx="4"/>
    <rect x="72" y="476" width="176" height="150" rx="4"/>
    <path d="M160 0 V24 M160 626 V650"/>
    <path d="M248 112 C296 112 296 552 248 552" stroke-dasharray="4 6"/>
  </svg>
  ${metalRule('left:39%;top:81.5%;width:16%;height:5px', './img/metal-plate.svg', 0.8)}
  ${thermal('p2', 'M110 880 H700 C770 880 770 300 840 300 H1080 C1150 300 1150 800 1220 800 H1900', 2, 0.95, true, 50)}
  ${bloom(0.45)}${grain()}
  ${frame('PET · 02 — BALANÇO DE MASSA 1 t → 0,3 t')}`;
},

/* 03 POR QUE O COCO — a secção transversal como protagonista, com a fração de
   casca desenhada como um anel: 80–85% da massa é o que hoje é resíduo. */
'pep-03': () => `
  ${atmos([[16,20,52,48,C.coir(70),1],[78,58,64,58,C.husk(42),1],
           [46,94,58,44,C.palm(50),1],[94,12,40,36,C.cream(76),1],
           [4,70,44,44,C.sage(44),1]])}
  <div class="obj" style="right:-6%;top:2%;width:52%;height:96%;opacity:.97">
    <img src="${img('coco-section')}" style="object-fit:contain"></div>
  <div class="crop crop--soft fade-r" style="left:0;bottom:-8%;width:26%;height:44%;opacity:.5">
    <img src="${img('coco-husk')}"></div>
  ${arc('right:-4%;top:0%;width:56%;height:100%', 118, 1, 0.65)}
  <svg style="position:absolute;inset:0;width:100%;height:100%" fill="none"
    stroke="rgb(126 140 144 / 52%)" stroke-width="1">
    <path d="M1250 200 h70 M1250 200 v-8 M1320 200 v-8"/>
    <path d="M1560 560 h150"/><circle cx="1560" cy="560" r="3"/>
  </svg>
  ${bloom(0.5)}${grain()}
  ${frame('PET · 03 — SECÇÃO / CARACTERIZAÇÃO')}`,

/* 04 OPERAÇÃO — duas massas na mesma escala: a pilha úmida e o char seco. A
   diferença de área É a redução de 70%, e a de matéria é o campo de poros.
   O pátio volta ao fundo, do lado da casca: é literalmente a pilha de que o
   slide fala. */
'pep-04': () => {
  const yieldR = P.PROCESSO.rendimentoKgPorT / 1000;
  const A = 240, B = A * Math.sqrt(yieldR), base = 652;  // área proporcional
  return `
  ${atmos([[14,18,50,46,C.cream(84),1],[52,74,60,50,C.coir(52),1],
           [88,20,46,44,C.palm(42),1],[28,96,54,40,C.sage(48),1],
           [96,86,40,38,C.husk(32),1]])}
  <div class="crop fade-bl" style="left:0;bottom:0;width:62%;height:46%;opacity:.4">
    <img src="${img('coco-yard')}" style="object-position:18% 100%"></div>
  ${veil(52)}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    <rect x="180" y="${base - A}" width="${A}" height="${A}" fill="rgb(198 166 118 / 46%)"/>
    <rect x="180" y="${base - A}" width="${A}" height="${A}" fill="none"
      stroke="rgb(122 96 62 / 50%)" stroke-width="1.2"/>
    <rect x="1120" y="${base - B}" width="${B}" height="${B}" fill="rgb(61 42 28 / 76%)"/>
    <path d="M470 ${base} H1100" stroke="rgb(122 96 62 / 40%)" stroke-width="1" stroke-dasharray="4 6" fill="none"/>
    <g stroke="rgb(126 140 144 / 50%)" stroke-width="1" fill="none">
      <path d="M180 ${base - A - 22} v-11 M${180 + A} ${base - A - 22} v-11 M180 ${base - A - 28} H${180 + A}"/>
      <path d="M1120 ${base - B - 22} v-11 M${1120 + B} ${base - B - 22} v-11 M1120 ${base - B - 28} H${1120 + B}"/>
    </g>
  </svg>
  <div style="position:absolute;left:56%;top:${((base - B) / 1125 * 100).toFixed(1)}%;
    width:${(B / 20).toFixed(1)}%;height:${(B / 11.25).toFixed(1)}%;overflow:hidden;opacity:.85">
    ${pores(74, 170, 170, 1, CREAM, 13)}
  </div>
  ${bloom(0.42)}${grain()}
  ${frame('PET · 04 — ÁREA = MASSA · ESCALA COMUM')}`;
},

/* 05 ESTRATÉGIA — o palmeiral, claro e aberto. As metas da PepsiCo vivem numa
   régua horizontal; a leitura é de alinhamento, não de proposta. */
'pep-05': () => `
  ${atmos([[12,16,52,48,C.cream(90),1],[64,28,60,54,C.palm(48),1],
           [92,70,52,50,C.coir(50),1],[34,96,58,44,C.sage(56),1],
           [82,6,38,34,C.ember(24),1]])}
  <div class="crop crop--far fade-t" style="left:0;bottom:0;width:100%;height:52%;opacity:.55">
    <img src="${img('coco-grove')}"></div>
  ${metalRule('left:6%;top:58.6%;width:88%;height:4px', './img/metal-plate.svg', 0.85)}
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 2000 1125">
    ${[420, 900, 1380].map(x => `<path d="M${x} 620 V700" stroke="rgb(77 102 64 / 40%)" stroke-width="1" fill="none"/>`).join('')}
  </svg>
  ${[420, 900, 1380, 1860].map((x, i) => aperture(`${(x / 20).toFixed(1)}%`, '58.7%', 13 + i * 3, 'light')).join('')}
  ${arc('left:-30%;top:-30%;width:74%;height:146%', 340, 1.4, 0.45)}
  ${bloom(0.5)}${grain()}
  ${frame('PET · 05 — METAS PÚBLICAS / ALINHAMENTO')}`,

/* 06 VALOR — três estratos a partir de uma biomassa. Cada um com a sua
   temperatura: casca, carbono, verde. */
'pep-06': () => `
  ${atmos([[14,18,50,46,C.coir(66),1],[80,54,62,56,C.palm(46),1],
           [54,94,60,44,C.sage(48),1],[96,10,38,34,C.ember(28),1],
           [4,74,46,46,C.husk(36),1]])}
  <div class="stratum" style="left:44%;top:15%;width:52%;height:22%;
    background:linear-gradient(160deg, rgb(198 166 118 / 46%), rgb(198 166 118 / 10%))"></div>
  <div class="stratum" style="left:39%;top:40%;width:54%;height:22%;
    background:linear-gradient(160deg, rgb(61 42 28 / 34%), rgb(61 42 28 / 7%))"></div>
  <div style="position:absolute;left:39%;top:40%;width:54%;height:22%;overflow:hidden;opacity:.5">
    ${pores(66, 1080, 250, 0.55, CREAM, 12)}
  </div>
  <div class="stratum" style="left:48%;top:65%;width:48%;height:22%;
    background:linear-gradient(160deg, rgb(150 178 132 / 50%), rgb(150 178 132 / 10%))"></div>
  ${metalRule('left:44%;top:14.4%;width:52%;height:3px', './img/metal-plate.svg', 0.7)}
  ${metalRule('left:39%;top:39.4%;width:54%;height:3px', './img/metal-plate.svg', 0.7)}
  ${metalRule('left:48%;top:64.4%;width:48%;height:3px', './img/metal-plate.svg', 0.7)}
  ${arc('left:-32%;top:-28%;width:74%;height:148%', 350, 1.5, 0.42)}
  ${bloom(0.44)}${grain()}
  ${frame('PET · 06 — TRÊS ROTAS A PARTIR DE UMA BIOMASSA')}`,

/* 07 O QUE PRECISA SER VERDADE — o único quadro profundo, e em VERDE de mata,
   nunca quase-preto. Três membranas atravessadas, com a densidade caindo:
   é a arquitetura de gates do outro baralho, no registro do coco. */
'pep-07': () => {
  const dens = [0.8, 0.5, 0.22];
  const cols = dens.map((d, i) => {
    const left = 6 + i * 30;
    return membrane(`left:${left}%;top:38%;width:27%;height:58%`, 'left', 'deep')
      + `<div style="position:absolute;left:${left}%;top:38%;width:27%;height:58%;
          overflow:hidden;opacity:.85">${pores(300 + i * 9, 540, 660, d, 'rgb(214 232 198', 20, 'lit')}</div>`
      + metalRule(`left:${left}%;top:37.6%;width:27%;height:4px`, './img/metal-plate.svg', 0.55);
  }).join('');
  return `
  <div class="L" style="background:
    radial-gradient(62% 52% at 20% 12%, rgb(150 178 132 / 26%) 0%, transparent 68%),
    radial-gradient(56% 46% at 86% 78%, rgb(226 172 110 / 14%) 0%, transparent 72%),
    linear-gradient(168deg, #2c3a24 0%, #26331f 48%, #1f2b1c 100%)"></div>
  <div class="crop fade-t" style="left:0;bottom:0;width:100%;height:44%;opacity:.16;
    mix-blend-mode:screen"><img src="${img('coco-yard')}" style="object-position:50% 100%"></div>
  ${cols}
  ${thermal('p7', 'M40 463 C420 463 520 460 900 460 C1300 460 1500 458 1960 456', 1.8, 1, true, 60)}
  ${dens.map((_, i) => aperture(`${(6 + i * 30 + 13.5).toFixed(1)}%`, '41%', 15 + i * 5, 'deep')).join('')}
  <div class="crop fade-l" style="right:-8%;top:-14%;width:38%;height:60%;opacity:.22;
    mix-blend-mode:screen"><img src="${img('coco-char')}" style="filter:blur(2px)"></div>
  <div class="L grain" style="opacity:.34;mix-blend-mode:screen"></div>
  <div class="L scan" style="opacity:.24"></div>
  ${frame('PET · 07 — TRÊS CONDIÇÕES / GATES', true)}`;
},
};

const html = `<!doctype html><meta charset="utf-8"><style>${css}${CSS}
  .plate{background:rgb(253 249 240)}
</style>
<body data-theme="light">${Object.entries(PLATES)
  .map(([id, f]) => `<div class="plate" id="${id}">${f()}</div>`).join('\n')}</body>`;

fs.writeFileSync('.preview/art-pep.html', html);

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + path.resolve('.preview/art-pep.html'));
await p.waitForTimeout(1800);
for (const id of Object.keys(PLATES)) {
  await p.locator('#' + id).screenshot({ path: path.join(OUT, id + '.jpg'), type: 'jpeg', quality: 94 });
}
await b.close();
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log('coconut plates:', Object.keys(PLATES).length);
