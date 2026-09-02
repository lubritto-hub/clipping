/* ===========================================================================
   CHAPAS — PEPSICO / PETROLINA
   "CASCA VIRA CARBONO"

   Refeito do zero. O baralho anterior era atmosférico: névoa, véu, fio de
   cabelo, tudo bem-comportado. Lia como software. Este é o contrário —
   gráfico, chapado, com contraste alto e a matéria em tamanho real.

   A DIVISÃO DE TRABALHO
     A chapa traz o CHÃO, as FOTOS em painéis de canto arredondado, o objeto
     cromado, o bloom e a granulação. Os BLOCOS de cor, os números, as pílulas
     e os ícones são vetor vivo no .pptx — assim eles ficam nítidos e andam
     junto com o texto que descrevem.

   A ABERTURA E O RESTO
     A capa estabelece um objeto: um coco cromado sobre verde-coco puro. Todo
     quadro seguinte responde a ela com o mesmo verde, o mesmo bloom e a mesma
     lógica de painel — nunca repetindo o cromo, que é da capa e só dela.

   O Y2K entra em três lugares e em nenhum outro: o cromo iridescente, o
   estouro de luz (bloom + flare) e a estrela de quatro pontas. Fora disso é
   editorial chapado.
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { W, H, CSS } from './devices.mjs';

const OUT = path.resolve('.preview/deck-assets');
const css = fs.readFileSync('dist/styles.css', 'utf8');
const img = n => `./img/${n}.svg`;

/* --- A paleta. Poucas cores, muito contraste. ---------------------------- */
const ACID  = '#c8e85c';   // verde-coco: o coco verde é literalmente esta cor
const MATA  = '#16331f';
const CREME = '#f5f1e6';
const PRETO = '#0b0a09';

/* --- Primitivas ---------------------------------------------------------- */

/** Um painel de foto: canto arredondado, matéria em força total. Nada de
    opacidade 20% — a foto ou está no quadro ou não está. */
const panel = (src, style, radius = 26, extra = '', pos = '50% 50%', zoom = 1) =>
  `<div style="position:absolute;${style};border-radius:${radius}px;overflow:hidden;
     ${extra}"><img src="${img(src)}"
     style="width:100%;height:100%;object-fit:cover;object-position:${pos};display:block;
     transform:scale(${zoom});transform-origin:${pos}"></div>`;

/** O estouro de luz. Um núcleo, um halo e uma listra horizontal — é a
    anatomia de um flare de lente, e é o que faz a luz parecer física. */
const flare = (x, y, s = 1, tint = '255 249 214') => `
  <div style="position:absolute;left:${x};top:${y};width:${420 * s}px;height:${420 * s}px;
    margin:${-210 * s}px 0 0 ${-210 * s}px;border-radius:50%;
    background:radial-gradient(circle, rgb(${tint} / 92%) 0%, rgb(${tint} / 30%) 34%, transparent 70%);
    filter:blur(${26 * s}px);mix-blend-mode:screen"></div>
  <div style="position:absolute;left:${x};top:${y};width:${1500 * s}px;height:${5 * s}px;
    margin:${-2.5 * s}px 0 0 ${-750 * s}px;
    background:linear-gradient(90deg, transparent, rgb(${tint} / 88%) 46%, rgb(${tint} / 88%) 54%, transparent);
    filter:blur(${2.5 * s}px);mix-blend-mode:screen"></div>`;

/** A estrela de quatro pontas, desenhada grande. Pontuação, não decoração:
    marca um lugar da composição e some. */
const star = (x, y, r, colour = '#ffffff', op = 1, blur = 0) => `
  <svg style="position:absolute;left:${x};top:${y};width:${r * 2}px;height:${r * 2}px;
    margin:${-r}px 0 0 ${-r}px;opacity:${op};filter:blur(${blur}px)" viewBox="0 0 32 32">
    <path d="M16 0c0 9 2.4 14 16 16-13.6 2-16 7-16 16 0-9-2.4-14-16-16 13.6-2 16-7 16-16z"
      fill="${colour}"/></svg>`;

/** O grão. Bem mais fraco que no baralho anterior: sobre cor chapada, grão é
    ruído, e a superfície tem de parecer impressa, não gasta. */
const grain = (o = 0.12) => `<div class="L grain" style="opacity:${o}"></div>`;

/** Uma lavagem de luz vinda de um canto, para que a cor chapada não fique
    morta. É a única coisa que sobrou da versão atmosférica. */
const wash = (spec) => `<div class="L" style="background:${spec}"></div>`;

const PLATES = {

/* ---------------------------------------------------------------------------
   01 CAPA — verde-coco puro e um coco cromado. É a única peça de cromo do
   baralho: se ela se repetir, deixa de ser abertura e vira maneirismo.
   Zona de tipo: esquerda até 52%.
--------------------------------------------------------------------------- */
'pep-01': () => `
  <div class="L" style="background:${ACID}"></div>
  ${wash(`radial-gradient(72% 62% at 82% 28%, rgb(255 255 255 / 62%) 0%, transparent 66%),
          radial-gradient(58% 50% at 6% 96%, rgb(22 51 31 / 26%) 0%, transparent 70%)`)}
  <div style="position:absolute;left:56%;top:5%;width:41%;height:90%">
    <img src="${img('coco-chrome')}" style="width:100%;height:100%;object-fit:contain;display:block;
      filter:drop-shadow(0 44px 70px rgb(22 51 31 / 38%))">
  </div>
  ${flare('69%', '26%', 1.4)}
  ${star('52%', '15%', 42, '#ffffff', 0.95)}
  ${star('97%', '72%', 22, '#ffffff', 0.8)}
  ${star('60%', '92%', 15, '#16331f', 0.38)}
  ${grain(0.1)}`,

/* ---------------------------------------------------------------------------
   02 O QUE EXISTE HOJE — o pátio em força total, num painel que ocupa metade
   do quadro. Esta é a foto mais importante do baralho: é a premissa.
--------------------------------------------------------------------------- */
'pep-02': () => `
  <div class="L" style="background:${CREME}"></div>
  ${wash(`radial-gradient(66% 58% at 8% 4%, rgb(200 232 92 / 46%) 0%, transparent 66%),
          radial-gradient(50% 48% at 30% 100%, rgb(138 90 52 / 12%) 0%, transparent 70%)`)}
  ${panel('coco-yard', 'left:49%;top:6%;width:47%;height:88%', 30,
          '', '50% 100%', 1.55)}
  ${star('48%', '12%', 28, ACID, 1)}
  ${flare('74%', '28%', 0.7, '255 252 232')}
  ${grain(0.14)}`,

/* ---------------------------------------------------------------------------
   03 POR QUE O COCO — fundo escuro, a secção transversal grande e nítida.
   No escuro os anéis param de ler como alvo e passam a ler como estratos.
--------------------------------------------------------------------------- */
'pep-03': () => `
  <div class="L" style="background:${MATA}"></div>
  ${wash(`radial-gradient(66% 58% at 88% 16%, rgb(200 232 92 / 20%) 0%, transparent 68%),
          radial-gradient(50% 44% at 4% 92%, rgb(200 232 92 / 12%) 0%, transparent 70%)`)}
  <div style="position:absolute;right:-14%;top:-14%;width:64%;height:113.8%;
    border-radius:50%;overflow:hidden">
    <img src="${img('coco-section')}" style="width:100%;height:100%;object-fit:cover;display:block">
  </div>
  ${flare('58%', '18%', 0.9, '234 246 218')}
  ${star('55%', '78%', 24, ACID, 0.9)}
  ${grain(0.16)}`,

/* ---------------------------------------------------------------------------
   04 O PROCESSO — dois painéis de matéria, antes e depois, com o vão no meio
   onde mora a temperatura. O vão É o reator.
--------------------------------------------------------------------------- */
'pep-04': () => `
  <div class="L" style="background:${CREME}"></div>
  ${wash(`radial-gradient(56% 50% at 50% 6%, rgb(200 232 92 / 30%) 0%, transparent 70%)`)}
  ${panel('coco-husk', 'left:5.5%;top:67.5%;width:41.5%;height:20.6%', 22)}
  ${panel('coco-char', 'left:53%;top:67.5%;width:41.5%;height:20.6%', 22)}
  ${flare('50%', '40%', 1.0, '255 236 190')}
  ${star('50%', '56%', 26, ACID, 1)}
  ${grain(0.14)}`,

/* ---------------------------------------------------------------------------
   05 O QUE SAI — o char em força total ocupando a direita inteira, sangrando
   pelo quadro. A esquerda fica creme, para o número.
--------------------------------------------------------------------------- */
'pep-05': () => `
  <div class="L" style="background:${CREME}"></div>
  ${panel('coco-char', 'right:0;top:0;width:54%;height:100%', 0)}
  <div style="position:absolute;left:46%;top:0;width:16%;height:100%;
    background:linear-gradient(90deg, rgb(245 241 230) 0%, transparent 100%)"></div>
  ${flare('62%', '22%', 1.1, '234 246 218')}
  ${star('60%', '70%', 26, ACID, 0.95)}
  ${star('88%', '18%', 16, '#ffffff', 0.8)}
  ${grain(0.14)}`,

/* ---------------------------------------------------------------------------
   06 O QUE A PEPSICO JÁ DECIDIU — creme e o palmeiral num painel largo e
   baixo, porque as metas ocupam a faixa de cima.
--------------------------------------------------------------------------- */
'pep-06': () => `
  <div class="L" style="background:${CREME}"></div>
  ${wash(`radial-gradient(64% 56% at 88% 10%, rgb(200 232 92 / 32%) 0%, transparent 68%)`)}
  /* Uma faixa de 0,9 pol de palmeiral distante não lê como palmeiral — lê
     como uma lavagem verde. Nessa altura, a fibra de coir lê: ela é
     direcional, e o que a faixa precisa dizer é MATÉRIA. */
  ${panel('coco-husk', 'left:4%;top:80%;width:92%;height:16%', 20, '', '50% 50%', 1.0)}
  ${star('6.5%', '78%', 20, ACID, 1)}
  ${flare('80%', '20%', 0.8, '255 252 232')}
  ${grain(0.14)}`,

/* ---------------------------------------------------------------------------
   07 O QUE PRECISA SER VERDADE — escuro, o char como chão de verdade e não
   como sombra. Fecha o baralho no mesmo material com que ele abriu, mas em
   matéria, não em cromo.
--------------------------------------------------------------------------- */
'pep-07': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${panel('coco-char', 'left:0;top:0;width:100%;height:100%', 0)}
  ${wash(`linear-gradient(168deg, rgb(22 51 31 / 82%) 0%, rgb(11 10 9 / 74%) 52%, rgb(22 51 31 / 86%) 100%)`)}
  ${wash(`radial-gradient(58% 50% at 14% 8%, rgb(200 232 92 / 20%) 0%, transparent 66%)`)}
  ${flare('50%', '8%', 1.2, '200 232 92')}
  ${star('92%', '82%', 26, ACID, 0.9)}
  ${star('6%', '30%', 15, '#ffffff', 0.6)}
  ${grain(0.2)}`,
};

const html = `<!doctype html><meta charset="utf-8"><style>${css}${CSS}
  .plate{background:${CREME}}
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
console.log('chapas:', Object.keys(PLATES).length);
