/* ===========================================================================
   CHAPAS — PROPOSTA PEPSICO / PETROLINA
   Formato 16:9 largo (13,333" × 7,5"), 2400 × 1350 px.

   Este baralho tem uma vantagem que o outro não tinha: QUATRO FOTOGRAFIAS DE
   VERDADE, vindas do próprio arquivo do cliente — coir, biochar, uma planta de
   pirólise e a agricultura irrigada do Semiárido. Elas são o material aqui;
   nada é desenhado.

   ---------------------------------------------------------------------------
   O FADE

   O pedido era "fade realmente profissional", e é uma coisa técnica, não de
   gosto. Um fade profissional tem três propriedades:

     1. É uma MÁSCARA, não uma sobreposição de cor. Cobrir a foto com um
        retângulo semitransparente lava a imagem inteira; mascarar deixa a
        parte de dentro intacta e faz só a borda desaparecer.
     2. Tem MUITAS PARADAS com curva de easing. Um degradê de duas paradas
        cria banda visível em superfície escura, que é exatamente onde este
        baralho vive.
     3. Vai a ZERO dentro do quadro, nunca na aresta. Fade que termina na
        borda ainda é uma borda.

   pptxgenjs não faz nada disso — não tem máscara nem degradê. Por isso a
   fotografia mora na chapa, composta no navegador, e só o texto fica vivo no
   .pptx.
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { CSS } from './devices.mjs';

const W = 2400, H = 1350;
const OUT = path.resolve('.preview/deck-assets');
const css = fs.readFileSync('dist/styles.css', 'utf8');
const foto = n => `./img/foto/${n}.jpg`;

/* --- A paleta ------------------------------------------------------------
   A mesma do outro baralho: preto, prata, marrom escuro, verde e branco. Duas
   regras a governam — o campo é escuro, e verde nunca é campo grande. */
const PRETO  = '#0c0c0b';
const VERDE  = '#8fb04e';
const BRANCO = '#ffffff';

/* --- O FADE --------------------------------------------------------------
   Nove paradas numa curva de ease-in-out. É mais do que parece necessário e
   é exatamente o que separa um fade de um degradê: em superfície escura, três
   ou quatro paradas deixam anéis visíveis. */
const STOPS = [
  [0, 1], [0.18, 0.995], [0.32, 0.97], [0.44, 0.9], [0.55, 0.76],
  [0.65, 0.56], [0.75, 0.34], [0.85, 0.15], [0.93, 0.04], [1, 0],
];

/** Constrói a máscara numa direção. `to` diz para onde a imagem desaparece. */
function mask(to, from = 0, until = 1) {
  const dir = { r: '90deg', l: '270deg', b: '180deg', t: '0deg' }[to];
  const g = STOPS.map(([p, a]) =>
    `rgb(0 0 0 / ${(a * 100).toFixed(1)}%) ${((from + p * (until - from)) * 100).toFixed(1)}%`).join(',');
  return `linear-gradient(${dir}, ${g})`;
}

/** Uma fotografia. Sempre com máscara, nunca com véu de cor por cima: véu lava
    a imagem toda, máscara preserva o miolo e some só na borda.
    `grade` é a correção de cor; a base é sempre a mesma para que as quatro
    fotos, de origens diferentes, leiam como um só conjunto. */
function fotografia(src, style, { to = 'r', from = 0.05, until = 1,
                                  pos = '50% 50%', zoom = 1, grade = '',
                                  radius = 0 } = {}) {
  const m = mask(to, from, until);
  return `<div style="position:absolute;${style};border-radius:${radius}px;overflow:hidden;
      -webkit-mask-image:${m};mask-image:${m}">
      <img src="${foto(src)}" style="width:100%;height:100%;object-fit:cover;
        object-position:${pos};display:block;transform:scale(${zoom});
        transform-origin:${pos};
        filter:contrast(1.1) saturate(0.82) brightness(0.96) ${grade}">
      <div class="L" style="background:linear-gradient(180deg,
        rgb(12 12 11 / 22%) 0%, rgb(12 12 11 / 0%) 34%, rgb(12 12 11 / 46%) 100%)"></div>
      <div class="L grain" style="opacity:.2;mix-blend-mode:overlay"></div>
    </div>`;
}

/** Duas máscaras não se somam — a segunda sobrescreve a primeira. Quando a foto
    precisa sumir em duas direções, o segundo lado vira uma camada de cor com a
    mesma curva, por cima e só ali. */
const cortina = (style, dir = '180deg', cor = '12 12 11') => {
  const g = STOPS.map(([p, a]) =>
    `rgb(${cor} / ${((1 - a) * 100).toFixed(1)}%) ${(p * 100).toFixed(1)}%`).join(',');
  return `<div style="position:absolute;${style};background:linear-gradient(${dir}, ${g})"></div>`;
};

const luz = (spec) => `<div class="L" style="background:${spec}"></div>`;
const grain = (o = 0.14) => `<div class="L grain" style="opacity:${o}"></div>`;

/** Régua de aço escovado. Continua definida porque é a prata do sistema, mas
    não é mais usada nestas chapas: posta às cegas, ela caía sobre linhas de
    texto em três quadros. A estrutura de prata mora no .pptx, onde a posição
    do texto é conhecida. */
const aco = (style, op = 0.85) =>
  `<div style="position:absolute;${style};overflow:hidden;opacity:${op}">
     <img src="./img/metal-plate.svg" style="width:100%;height:100%;object-fit:cover;display:block"></div>`;

const PLATES = {

/* 01 CAPA — o coir ocupa a direita e desaparece para dentro do preto muito
   antes da borda do texto. */
'pr-01': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${fotografia('coir', 'right:0;top:0;width:62%;height:100%',
    { to: 'l', from: 0.02, until: 0.86, zoom: 1.12, grade: 'brightness(0.9)' })}
  ${luz(`radial-gradient(52% 46% at 78% 22%, rgb(143 176 78 / 14%) 0%, transparent 68%)`)}
  ${cortina('right:0;top:0;width:62%;height:100%', '0deg')}
  ${grain(0.16)}`,

/* 02 O PROCESSO — o char entra como faixa de rodapé e evapora para cima. */
'pr-02': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${luz(`radial-gradient(64% 54% at 8% 6%, rgb(30 51 32 / 62%) 0%, transparent 68%)`)}
  ${fotografia('char', 'left:0;bottom:0;width:100%;height:38%',
    { to: 't', from: 0.0, until: 0.9, pos: '50% 40%', zoom: 1.15 })}
  ${grain(0.16)}`,

/* 03 INTEGRAÇÃO — a planta de pirólise. É a foto mais baixa de resolução do
   conjunto (400 px de largura), então entra em tamanho contido e com o fade
   fazendo o trabalho: borda macia lê como profundidade, não como falta de
   pixel. */
'pr-03': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${fotografia('planta', 'left:0;top:0;width:52%;height:100%',
    { to: 'r', from: 0.1, until: 0.98, pos: '56% 46%', zoom: 1.25,
      grade: 'brightness(0.82) contrast(1.16)' })}
  ${cortina('left:0;top:0;width:52%;height:100%', '0deg')}
  ${luz(`radial-gradient(56% 48% at 86% 18%, rgb(30 51 32 / 56%) 0%, transparent 70%)`)}
  ${grain(0.18)}`,

/* 04 AS ALAVANCAS — o quadro claro. Só a vista aérea, num rodapé que dissolve
   para cima no branco. */
'pr-04': () => `
  <div class="L" style="background:${BRANCO}"></div>
  ${luz(`radial-gradient(58% 50% at 92% 4%, rgb(143 176 78 / 12%) 0%, transparent 68%)`)}
  ${fotografia('campo', 'left:0;bottom:0;width:100%;height:26%',
    { to: 't', from: 0, until: 0.94, pos: '50% 46%', zoom: 1.2,
      grade: 'brightness(1.02) saturate(0.9)' })}
  <div class="L" style="background:linear-gradient(0deg,
    rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 0%) 12%, rgb(255 255 255 / 74%) 22%,
    rgb(255 255 255 / 96%) 30%, #ffffff 34%)"></div>
  ${grain(0.08)}`,

/* 05 CARBONO DURÁVEL — o char de novo, agora inteiro à esquerda: é a matéria
   de que o slide fala, e o quadro é sobre permanência. */
'pr-05': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${fotografia('char', 'left:0;top:0;width:56%;height:100%',
    { to: 'r', from: 0.06, until: 0.94, pos: '42% 50%', zoom: 1.3 })}
  ${cortina('left:0;top:0;width:56%;height:100%', '0deg')}
  ${luz(`radial-gradient(54% 46% at 88% 16%, rgb(30 51 32 / 52%) 0%, transparent 70%)`)}
  ${grain(0.18)}`,

/* 06 OS QUATRO DADOS — o segundo quadro claro. A vista aérea à direita: os
   dados que o slide pede são os da unidade, e é essa a paisagem dela. */
'pr-06': () => `
  <div class="L" style="background:${BRANCO}"></div>
  ${fotografia('campo', 'right:0;top:0;width:46%;height:100%',
    { to: 'l', from: 0.02, until: 0.9, pos: '58% 50%', zoom: 1.35,
      grade: 'brightness(1.0) saturate(0.88)' })}
  ${cortina('right:0;top:0;width:46%;height:100%', '0deg', '255 255 255')}
  ${luz(`radial-gradient(46% 40% at 6% 6%, rgb(143 176 78 / 12%) 0%, transparent 68%)`)}
  ${grain(0.08)}`,

/* 07 O PRÓXIMO PASSO — o coir volta, agora como rodapé que evapora: fecha o
   baralho no mesmo material com que ele abriu. */
'pr-07': () => `
  <div class="L" style="background:${PRETO}"></div>
  ${luz(`radial-gradient(60% 52% at 10% 6%, rgb(30 51 32 / 58%) 0%, transparent 68%)`)}
  ${fotografia('coir', 'left:0;bottom:0;width:100%;height:30%',
    { to: 't', from: 0, until: 0.88, pos: '50% 60%', zoom: 1.3,
      grade: 'brightness(0.78)' })}
  ${grain(0.18)}`,
};

const html = `<!doctype html><meta charset="utf-8"><style>${css}${CSS}
  .plate{width:${W}px;height:${H}px;background:${PRETO}}
</style>
<body data-theme="light">${Object.entries(PLATES)
  .map(([id, f]) => `<div class="plate" id="${id}">${f()}</div>`).join('\n')}</body>`;

fs.writeFileSync('.preview/art-prop.html', html);

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + path.resolve('.preview/art-prop.html'));
await p.waitForTimeout(1800);
for (const id of Object.keys(PLATES)) {
  await p.locator('#' + id).screenshot({ path: path.join(OUT, id + '.jpg'), type: 'jpeg', quality: 94 });
}
await b.close();
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log('chapas da proposta:', Object.keys(PLATES).length);
