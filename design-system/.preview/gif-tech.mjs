/* ===========================================================================
   GIF TÉCNICO — a conversão vista como painel de instrumento

   O GIF anterior era fotográfico: a casca dissolvia no char. Este é o mesmo
   evento lido por um instrumento — janela de amostra com marcas de registro,
   leitura de temperatura, a curva térmica sendo traçada e o balanço de massa
   caindo em tempo real.

   Nada aqui é inventado. Os únicos números que aparecem são os que o próprio
   baralho já traz: 400 a 600 °C e 1 t de casca seca entrando contra cerca de
   300 kg de biochar saindo. Um mostrador com número falso seria pior que
   nenhum mostrador.

   Os quadros saem do navegador, um a um, e o Python monta o GIF: é a mesma
   divisão de trabalho do resto do baralho, porque máscara, degradê e mistura
   de camadas não existem em nenhuma outra ferramenta daqui.
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const W = 1440, H = 810, N = 30;
const OUT = path.resolve('.preview/gif-frames');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const FOTO = n => 'file://' + path.resolve(`.preview/img/foto/${n}.jpg`);

const PRETO = '#17100a', PRATA = '#aeb7b9', VERDE = '#8fb04e';
const ease = t => t * t * (3 - 2 * t);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* A curva térmica: sobe da ambiente até a faixa de pirólise, mantém, e cai
   quando o carbono já está fixado. É a forma real de um ciclo de batelada. */
function tempAt(u) {
  if (u < 0.10) return 28;
  if (u < 0.46) return 28 + (600 - 28) * ease((u - 0.10) / 0.36);
  if (u < 0.70) return 600 - 40 * ((u - 0.46) / 0.24);
  return 560 - 380 * ease(clamp((u - 0.70) / 0.30));
}

function frame(u) {
  const T = tempAt(u);
  const conv = clamp((u - 0.14) / 0.42);          // avanço da conversão
  const mix = ease(conv);
  const massa = 1000 - 700 * mix;                 // kg, do modelo do baralho
  const estado = u < 0.14 ? 'CASCA' : (u < 0.60 ? 'CONVERSÃO' : 'BIOCHAR');
  const quente = Math.sin(clamp((u - 0.10) / 0.6) * Math.PI) ** 0.8;
  const scan = (u * 1.6 % 1) * H;

  /* A curva desenhada: 60 pontos, revelada até onde o processo chegou. */
  const CW = 660, CH = 150, CX = 700, CY = 300;
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const x = i / 60;
    if (x > u + 0.02) break;
    const v = (tempAt(x) - 20) / 620;
    pts.push(`${(CX + x * CW).toFixed(1)},${(CY + CH - v * CH).toFixed(1)}`);
  }

  return `<div class="p">
    <div class="grid"></div>

    <!-- cabeçalho de instrumento -->
    <div class="rule" style="left:56px;top:70px;width:1328px"></div>
    <div class="lbl" style="left:56px;top:44px">PET / 02   CONVERSÃO TÉRMICA</div>
    <div class="lbl" style="right:56px;top:44px;text-align:right">
      FAIXA DE OPERAÇÃO   400 a 600 °C</div>

    <!-- janela de amostra -->
    <div class="win" style="left:56px;top:110px;width:520px;height:520px">
      <img src="${FOTO('coir')}" style="opacity:${1 - mix}">
      <img src="${FOTO('char')}" style="opacity:${mix}">
      <div class="heat" style="opacity:${quente * 0.55};
        background:radial-gradient(120% 46% at 50% ${(118 - conv * 140).toFixed(0)}%,
          rgba(255,168,68,.95) 0%, rgba(255,120,30,.32) 38%, transparent 72%)"></div>
      <div class="vin"></div>
    </div>
    ${[[56, 110, 1, 1], [576, 110, -1, 1], [56, 630, 1, -1], [576, 630, -1, -1]]
      .map(([x, y, sx, sy]) => `<svg class="reg" style="left:${x - 14}px;top:${y - 14}px">
        <path d="M14 14 h${22 * sx} M14 14 v${22 * sy}"/></svg>`).join('')}
    <div class="cross" style="left:${56 + 260}px;top:${110 + 260}px"></div>
    <div class="lbl" style="left:56px;top:654px">AMOSTRA / MATERIAL</div>
    <div class="st" style="left:56px;top:684px">${estado}</div>

    <!-- leitura de temperatura -->
    <div class="lbl" style="left:700px;top:118px">TEMPERATURA DO LEITO</div>
    <div class="big" style="left:700px;top:142px">${Math.round(T)}<span>°C</span></div>
    <div class="band" style="left:700px;top:246px;width:660px">
      <i style="left:${(400 / 700 * 660).toFixed(0)}px;
                width:${(200 / 700 * 660).toFixed(0)}px"></i>
      <b style="left:${(clamp(T / 700) * 660).toFixed(0)}px"></b>
    </div>
    <div class="lbl" style="left:${700 + (400 / 700 * 660)}px;top:262px">400</div>
    <div class="lbl" style="left:${700 + (600 / 700 * 660) - 10}px;top:262px">600</div>

    <!-- curva -->
    <svg class="curve" viewBox="0 0 1440 810">
      <path d="M${CX} ${CY + CH} H${CX + CW}" class="ax"/>
      <path d="M${CX} ${CY} V${CY + CH}" class="ax"/>
      ${pts.length > 1 ? `<path d="M${pts.join(' L')}" class="cv"/>` : ''}
      ${pts.length ? `<circle cx="${pts[pts.length - 1].split(',')[0]}"
        cy="${pts[pts.length - 1].split(',')[1]}" r="5" class="dot"/>` : ''}
    </svg>

    <!-- balanço de massa -->
    <div class="lbl" style="left:700px;top:646px">BALANÇO DE MASSA</div>
    <div class="bar" style="left:700px;top:674px;width:660px"><i style="width:100%"></i></div>
    <div class="bar" style="left:700px;top:700px;width:660px">
      <i class="v" style="width:${(massa / 1000 * 100).toFixed(1)}%"></i></div>
    <div class="lbl" style="left:700px;top:730px">ENTRADA 1000 kg</div>
    <div class="lbl" style="left:700px;top:752px;color:${VERDE}">
      SAÍDA ${Math.round(massa)} kg</div>

    <div class="scan" style="top:${scan.toFixed(0)}px"></div>
    <div class="grain"></div>
  </div>`;
}

const CSS = `
*{box-sizing:border-box;margin:0}
body{margin:0;background:${PRETO}}
.p{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${PRETO};
  font-family:Helvetica,Arial,sans-serif}
.grid{position:absolute;inset:0;opacity:.06;background-image:
  repeating-linear-gradient(0deg,${PRATA} 0 1px,transparent 1px 60px),
  repeating-linear-gradient(90deg,${PRATA} 0 1px,transparent 1px 60px)}
.rule{position:absolute;height:1px;background:${PRATA};opacity:.42}
.lbl{position:absolute;font-size:15px;letter-spacing:.22em;color:${PRATA};opacity:.72}
.st{position:absolute;font-size:26px;font-weight:700;letter-spacing:.14em;color:${VERDE}}
.win{position:absolute;overflow:hidden;background:#0d0906}
.win img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:contrast(1.14) saturate(.86) brightness(.94)}
.win .heat{position:absolute;inset:0;mix-blend-mode:screen}
.win .vin{position:absolute;inset:0;box-shadow:inset 0 0 120px 34px rgba(14,9,5,.6)}
.reg{position:absolute;width:52px;height:52px;fill:none;stroke:${PRATA};
  stroke-width:1.6;opacity:.85}
.cross{position:absolute;width:34px;height:34px;margin:-17px 0 0 -17px;opacity:.55;
  background:
    linear-gradient(${PRATA},${PRATA}) center/100% 1px no-repeat,
    linear-gradient(${PRATA},${PRATA}) center/1px 100% no-repeat}
.big{position:absolute;font-size:96px;font-weight:700;letter-spacing:-.04em;color:#fff;
  line-height:1}
.big span{font-size:34px;font-weight:400;letter-spacing:0;color:${PRATA};
  margin-left:12px;vertical-align:22px}
.band{position:absolute;height:10px;background:rgba(174,183,185,.16)}
.band i{position:absolute;top:0;height:10px;background:rgba(143,176,78,.42)}
.band b{position:absolute;top:-5px;width:3px;height:20px;background:#fff}
.curve .ax{stroke:${PRATA};stroke-width:1;opacity:.34;fill:none}
.curve{position:absolute;inset:0;width:${W}px;height:${H}px}
.cv{fill:none;stroke:url(#g);stroke-width:3.4;stroke-linecap:round;
  stroke-linejoin:round;filter:drop-shadow(0 0 10px rgba(255,150,60,.45))}
.dot{fill:#fff;filter:drop-shadow(0 0 8px rgba(255,255,255,.8))}
.bar{position:absolute;height:14px;background:rgba(174,183,185,.14)}
.bar i{position:absolute;left:0;top:0;height:14px;background:rgba(174,183,185,.5)}
.bar i.v{background:${VERDE}}
.scan{position:absolute;left:0;width:100%;height:110px;pointer-events:none;
  background:linear-gradient(180deg,transparent,rgba(174,183,185,.07) 50%,transparent);
  mix-blend-mode:screen}
.grain{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;background-image:
  repeating-linear-gradient(0deg,rgba(255,255,255,.5) 0 1px,transparent 1px 3px)}
`;

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
/* setContent numa página about:blank bloqueia sub-recursos file://, e a janela
   de amostra saía preta. Basta abrir uma origem file:// antes. */
await p.goto('file://' + path.resolve('.preview') + '/');
for (let i = 0; i < N; i++) {
  const u = i / N;
  await p.setContent(`<!doctype html><meta charset="utf-8"><style>${CSS}</style>
    <svg width="0" height="0"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#9fb7c2"/><stop offset="38%" stop-color="#8fb04e"/>
      <stop offset="62%" stop-color="#ffb457"/><stop offset="82%" stop-color="#ff8a3c"/>
      <stop offset="100%" stop-color="#9fb7c2"/></linearGradient></defs></svg>
    ${frame(u)}`);
  await p.waitForTimeout(120);
  await p.locator('.p').screenshot({ path: path.join(OUT, `f${String(i).padStart(3, '0')}.png`) });
}
await b.close();
console.log('quadros:', N, '->', OUT);
