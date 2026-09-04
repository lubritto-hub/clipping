/* ===========================================================================
   GIF DO CICLO — a circulação correndo pelos trilhos

   O diagrama estava parado. Um ciclo desenhado parado é um organograma; o que
   faz ler como CICLO é a matéria andando nele. Então os trilhos e os nós saem
   da chapa estática e viram um GIF, e por cima dele o .pptx continua pousando
   ícone e rótulo vivos.

   O circuito é UM caminho contínuo — entra pela esquerda, atravessa os cinco
   nós, sobe pela direita, volta por cima e desce na fotossíntese. Sendo um
   caminho só, o tracejado que corre nele nunca tem emenda: as marcas dão a
   volta inteira sem sumir e reaparecer numa junta.

   O fundo é CHAPADO e é exatamente o mesmo tom que a chapa desenha atrás dele.
   GIF só tem transparência de um bit, então uma borda recortada ficaria
   serrilhada sobre o marrom; casar a cor resolve sem transparência nenhuma.
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const { CICLO, PAINEL } = createRequire(import.meta.url)('../../deck/ciclo.js');

/* O quadro do GIF é o painel do diagrama, em polegadas do slide. O viewBox usa
   as MESMAS coordenadas de ciclo.js, então nada precisa ser convertido. */
const GW = 1440, GH = Math.round(GW * PAINEL.h / PAINEL.w);
const N = 24;
const OUT = path.resolve('.preview/gif-frames-ciclo');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const FUNDO = PAINEL.cor;
const TRILHO = 'rgb(174 183 185 / 22%)';
const VERDE = '#8fb04e';

/* O circuito inteiro num caminho só. */
function circuito() {
  const { eixoY: Y, nos, retorno: RT } = CICLO;
  const c = RT.curva;
  const a = nos[0].x, z = nos[nos.length - 1].x;
  return `M${a} ${Y} H${z}
    H${RT.dir - c} Q${RT.dir} ${Y} ${RT.dir} ${Y - c}
    V${RT.topo + c} Q${RT.dir} ${RT.topo} ${RT.dir - c} ${RT.topo}
    H${RT.esq + c} Q${RT.esq} ${RT.topo} ${RT.esq} ${RT.topo + c}
    V${Y - c} Q${RT.esq} ${Y} ${RT.esq + c} ${Y} H${a}`;
}

function frame(u) {
  const { eixoY: Y, nos, saidas } = CICLO;
  const g = [];
  const PASSO = 1.9;                     // período do tracejado, em polegadas

  // Grade usinada, muito fraca: o painel precisa de chão, não de vazio.
  g.push(`<g stroke="rgb(174 183 185 / 100%)" stroke-width="0.006" opacity="0.05">
    ${Array.from({ length: 26 }, (_, i) => {
      const x = PAINEL.x + i * 0.5;
      return `<path d="M${x} ${PAINEL.y} V${PAINEL.y + PAINEL.h}"/>`;
    }).join('')}
    ${Array.from({ length: 10 }, (_, i) => {
      const y = PAINEL.y + i * 0.5;
      return `<path d="M${PAINEL.x} ${y} H${PAINEL.x + PAINEL.w}"/>`;
    }).join('')}</g>`);

  const d = circuito();
  g.push(`<path d="${d}" stroke="${TRILHO}" stroke-width="0.17" fill="none"
    stroke-linecap="round"/>`);

  // A circulação: marcas correndo pelo circuito. Duas camadas, uma clara e
  // fina e outra verde e larga meio período atrás, para o movimento ter
  // direção legível e não virar pontilhado piscando.
  const off = -u * PASSO;
  g.push(`<path d="${d}" stroke="rgb(143 176 78 / 62%)" stroke-width="0.1" fill="none"
    stroke-linecap="round" stroke-dasharray="0.3 ${(PASSO - 0.3).toFixed(2)}"
    stroke-dashoffset="${off.toFixed(3)}"/>`);
  g.push(`<path d="${d}" stroke="rgb(238 244 244 / 82%)" stroke-width="0.045" fill="none"
    stroke-linecap="round" stroke-dasharray="0.11 ${(PASSO - 0.11).toFixed(2)}"
    stroke-dashoffset="${off.toFixed(3)}"/>`);

  // As descidas para as saídas, com a sua própria circulação, mais lenta.
  saidas.forEach((sa, i) => {
    const dd = `M${sa.x} ${Y} V${sa.y}`;
    g.push(`<path d="${dd}" stroke="rgb(174 183 185 / 20%)" stroke-width="0.055" fill="none"/>`);
    g.push(`<path d="${dd}" stroke="rgb(143 176 78 / 78%)" stroke-width="0.07" fill="none"
      stroke-linecap="round" stroke-dasharray="0.12 0.62"
      stroke-dashoffset="${(-(u + i * 0.33) * 0.74).toFixed(3)}"/>`);
  });

  // Os nós. O anel do biochar pulsa junto com a passagem da circulação: é o
  // único nó que é PRODUTO e não etapa, e o pulso diz isso sem rótulo.
  const pulso = 0.5 + 0.5 * Math.sin(u * Math.PI * 2 - 1.2);
  nos.forEach(n => {
    g.push(`<circle cx="${n.x}" cy="${Y}" r="${n.r}" fill="${FUNDO}"/>`);
    g.push(`<circle cx="${n.x}" cy="${Y}" r="${n.r}" fill="none"
      stroke="${n.acento ? `rgb(143 176 78 / ${(62 + 34 * pulso).toFixed(0)}%)`
                         : 'rgb(174 183 185 / 46%)'}"
      stroke-width="${n.acento ? (0.03 + 0.014 * pulso).toFixed(3) : 0.02}"/>`);
  });
  saidas.forEach(sa => {
    g.push(`<circle cx="${sa.x}" cy="${sa.y}" r="${sa.r}" fill="${FUNDO}"/>`);
    g.push(`<circle cx="${sa.x}" cy="${sa.y}" r="${sa.r}" fill="none"
      stroke="rgb(174 183 185 / 46%)" stroke-width="0.02"/>`);
  });

  return `<svg width="${GW}" height="${GH}"
    viewBox="${PAINEL.x} ${PAINEL.y} ${PAINEL.w} ${PAINEL.h}">
    <rect x="${PAINEL.x}" y="${PAINEL.y}" width="${PAINEL.w}" height="${PAINEL.h}"
      fill="${FUNDO}"/>${g.join('')}</svg>`;
}

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: GW, height: GH }, deviceScaleFactor: 1 });
for (let i = 0; i < N; i++) {
  await p.setContent(`<!doctype html><meta charset="utf-8">
    <style>*{margin:0}body{background:${FUNDO}}</style>${frame(i / N)}`);
  await p.waitForTimeout(60);
  await p.locator('svg').screenshot({ path: path.join(OUT, `c${String(i).padStart(3, '0')}.png`) });
}
await b.close();
console.log('quadros do ciclo:', N, `${GW}x${GH}`);
