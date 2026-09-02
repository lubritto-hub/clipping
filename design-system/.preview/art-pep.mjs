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

/* --- FOTOS DE VERDADE ----------------------------------------------------
   Os materiais aqui são desenhados. Se houver uma foto licenciada com o mesmo
   nome em deck/fotos/, ela entra no lugar do desenho sem mais nenhuma
   alteração — basta largar o arquivo e rodar o build.

     deck/fotos/coco-yard.jpg     o pátio de casca
     deck/fotos/coco-macro.jpg    o close da casca
     deck/fotos/coco-char.jpg     o biochar
     deck/fotos/coco-section.jpg  a secção do fruto
     deck/fotos/coco-husk.jpg     a fibra

   Nenhuma imagem de banco com marca d'água entra num material de cliente. */
const FOTOS = path.resolve('../deck/fotos');
const img = n => fs.existsSync(`${FOTOS}/${n}.jpg`)
  ? `file://${FOTOS}/${n}.jpg`
  : (fs.existsSync(`${FOTOS}/${n}.png`) ? `file://${FOTOS}/${n}.png` : `./img/${n}.svg`);

/* --- A paleta ------------------------------------------------------------
   Preto, prata, marrom escuro, verde e branco. Duas regras a governam:

     1. O CAMPO É ESCURO. Cinco dos sete quadros têm chão preto; os dois
        claros existem para dar respiração no meio do baralho, não por
        alternância decorativa.
     2. VERDE NUNCA É CAMPO. Ele aparece em número, ícone, pílula e numa
        única faixa do baralho inteiro — a do próximo passo. Um quadro
        inteiro de verde é marca-texto, não capa.

   A prata é estrutural: fios, réguas e a chapa escovada. Não existe área
   prateada, e o marrom vem quase todo da própria matéria fotografada. */
const PRETO  = '#0c0c0b';
const CARVAO = '#17181a';
const VERDE  = '#8fb04e';   // acento — maduro, não fluorescente
const MATA   = '#1e3320';
const MARROM = '#4a3320';
const BRANCO = '#ffffff';

/* --- Primitivas ---------------------------------------------------------- */

/** Um painel de matéria. O tratamento fotográfico é o que separa foto de
    ilustração, e são três coisas — faixa tonal aberta, vinheta e grão — não
    mais detalhe. */
const panel = (src, style, radius = 20, pos = '50% 50%', zoom = 1, vinheta = 0.4) =>
  `<div style="position:absolute;${style};border-radius:${radius}px;overflow:hidden">
     <img src="${img(src)}" style="width:100%;height:100%;object-fit:cover;
       object-position:${pos};display:block;transform:scale(${zoom});
       transform-origin:${pos};filter:contrast(1.12) saturate(0.9) brightness(1.02)">
     <div style="position:absolute;inset:0;box-shadow:inset 0 0 130px 34px rgb(6 6 5 / ${vinheta * 100}%)"></div>
     <div class="L grain" style="opacity:.22;mix-blend-mode:overlay"></div>
   </div>`;

/** Uma régua de aço escovado. A prata do baralho é sempre esta chapa, nunca
    um cinza chapado: metal é anisotrópico, e é a escovação que o denuncia. */
const aco = (style, op = 0.9) =>
  `<div style="position:absolute;${style};overflow:hidden;opacity:${op}">
     <img src="./img/metal-plate.svg" style="width:100%;height:100%;object-fit:cover;display:block"></div>`;

/** A luz. Sem núcleo estourado e sem listra de lente: só um levantamento vindo
    de um canto, que é como a luz se comporta numa sala. */
const luz = (spec) => `<div class="L" style="background:${spec}"></div>`;

const grain = (o = 0.14) => `<div class="L grain" style="opacity:${o}"></div>`;

const PLATES = {

/* ---------------------------------------------------------------------------
   01 CAPA — o pátio ocupa o quadro inteiro, rebaixado quase ao preto, e o coco
   cromado flutua sobre ele. É a única peça de cromo do baralho.
--------------------------------------------------------------------------- */
'pep-01': () => `
  ${panel('coco-yard', 'inset:0', 0, '50% 100%', 1.95, 0.55)}
  ${luz(`linear-gradient(100deg, rgb(12 12 11 / 96%) 0%, rgb(12 12 11 / 90%) 36%,
          rgb(12 12 11 / 62%) 64%, rgb(30 51 32 / 42%) 100%)`)}
  ${luz(`radial-gradient(56% 50% at 76% 28%, rgb(143 176 78 / 20%) 0%, transparent 66%)`)}
  <div style="position:absolute;left:57%;top:10%;width:39%;height:80%">
    <img src="${img('coco-chrome')}" style="width:100%;height:100%;object-fit:contain;
      display:block;filter:drop-shadow(0 44px 80px rgb(0 0 0 / 66%)) saturate(0.86)">
  </div>
  ${aco('left:5.5%;top:82%;width:15%;height:5px', 0.8)}
  ${grain(0.18)}`,

/* ---------------------------------------------------------------------------
   02 A BIOMASSA — o pátio de novo, agora em painel e em plano aberto: aqui ele
   conta ESCALA, e é a única chapa em que ele aparece cortado.
--------------------------------------------------------------------------- */
'pep-02': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${luz(`radial-gradient(70% 60% at 4% 4%, rgb(30 51 32 / 80%) 0%, transparent 68%)`)}
  ${panel('coco-yard', 'left:48%;top:5%;width:48%;height:90%', 22, '50% 100%', 1.5, 0.44)}
  ${aco('left:5.5%;top:88%;width:15%;height:5px', 0.72)}
  ${grain(0.16)}`,

/* ---------------------------------------------------------------------------
   03 O MATERIAL — a secção grande à direita. No escuro os anéis param de ler
   como alvo e passam a ler como estratos.
--------------------------------------------------------------------------- */
'pep-03': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${luz(`radial-gradient(64% 56% at 88% 20%, rgb(30 51 32 / 74%) 0%, transparent 68%)`)}
  <div style="position:absolute;right:-15%;top:-13%;width:64%;height:113.8%;
    border-radius:50%;overflow:hidden">
    <img src="${img('coco-section')}" style="width:100%;height:100%;object-fit:cover;
      display:block;filter:contrast(1.14) saturate(0.86) brightness(0.94)">
    <div style="position:absolute;inset:0;box-shadow:inset 0 0 150px 46px rgb(6 6 5 / 58%)"></div>
  </div>
  ${aco('left:5.5%;top:88%;width:15%;height:5px', 0.72)}
  ${grain(0.16)}`,

/* ---------------------------------------------------------------------------
   04 O PROCESSO — a matéria antes e depois, em dois painéis largos no pé, e
   uma régua de aço entre eles. O vão é o reator.
--------------------------------------------------------------------------- */
'pep-04': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${luz(`radial-gradient(60% 52% at 50% 2%, rgb(30 51 32 / 66%) 0%, transparent 70%)`)}
  ${panel('coco-macro', 'left:5.5%;top:67.5%;width:41.5%;height:20.6%', 16, '50% 50%', 1.15, 0.7)}
  ${panel('coco-char',  'left:53%;top:67.5%;width:41.5%;height:20.6%', 16, '50% 50%', 1.05, 0.3)}
  ${aco('left:10.5%;top:50.4%;width:67%;height:4px', 0.55)}
  ${grain(0.16)}`,

/* ---------------------------------------------------------------------------
   05 O PRODUTO — o quadro branco do baralho. Existe para dar respiração e
   para que o char, que é a coisa mais preta que há, tenha contra o que
   aparecer.
--------------------------------------------------------------------------- */
'pep-05': () => `
  <div class="L" style="background:${BRANCO}"></div>
  ${panel('coco-char', 'right:0;top:0;width:56%;height:100%', 0, '50% 50%', 1.05, 0.24)}
  <div style="position:absolute;left:41%;top:0;width:16%;height:100%;
    background:linear-gradient(90deg, #ffffff 0%, rgb(255 255 255 / 0%) 100%)"></div>
  ${aco('left:5.5%;top:88%;width:15%;height:5px', 0.85)}
  ${grain(0.1)}`,

/* ---------------------------------------------------------------------------
   06 AS METAS — o segundo quadro branco. Os quatro números publicados pedem
   um chão neutro; a fibra de coir fecha o pé.
--------------------------------------------------------------------------- */
'pep-06': () => `
  <div class="L" style="background:${BRANCO}"></div>
  ${luz(`radial-gradient(58% 50% at 92% 6%, rgb(143 176 78 / 14%) 0%, transparent 68%)`)}
  ${panel('coco-husk', 'left:4%;top:84%;width:92%;height:12%', 14, '50% 50%', 1.0, 0.42)}
  ${grain(0.1)}`,

/* ---------------------------------------------------------------------------
   07 AS CONDIÇÕES E O PRÓXIMO PASSO — o char como chão de verdade. Fecha o
   baralho no mesmo material com que ele abriu, mas em matéria, não em cromo.
--------------------------------------------------------------------------- */
'pep-07': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${panel('coco-char', 'inset:0', 0, '50% 50%', 1.12, 0)}
  ${luz(`linear-gradient(168deg, rgb(12 12 11 / 88%) 0%, rgb(12 12 11 / 78%) 50%, rgb(30 51 32 / 88%) 100%)`)}
  ${luz(`radial-gradient(54% 46% at 14% 8%, rgb(143 176 78 / 16%) 0%, transparent 66%)`)}
  ${grain(0.2)}`,
};

const html = `<!doctype html><meta charset="utf-8"><style>${css}${CSS}
  .plate{background:${PRETO}}
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
