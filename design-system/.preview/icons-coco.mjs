/* ===========================================================================
   ÍCONES — COCO / PIRÓLISE

   Desenhados no mesmo traço técnico do resto do baralho: fio de 1,4 numa
   grade de 32, sem preenchimento a não ser onde a matéria é sólida.

   A regra que os governa é a mesma da marca: NADA de folha genérica, planeta
   ou símbolo de reciclagem. Cada ícone é uma coisa específica deste projeto —
   um coco, um endocarpo, um leito fluidizado de três zonas, uma muda de caju
   do ensaio da Embrapa. Um ícone que serviria para qualquer empresa de
   sustentabilidade não serve para esta.

   Dois casos exigiram cuidado:
   - `gases` é um diagrama de recuperação de calor, não um símbolo de
     reciclagem: a seta sai do topo e volta pela lateral do mesmo corpo.
   - `muda` é uma muda de caju, que é o sujeito do ensaio citado no slide 05 —
     não é uma folhinha de ESG.

   Exportados como PNG transparente em duas cores, porque pptxgenjs não
   desenha caminhos: escuro para os quadros claros, claro para o profundo.
   =========================================================================== */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('.preview/deck-assets/ico');
fs.mkdirSync(OUT, { recursive: true });

const S = 1.4;   // espessura do fio, na grade de 32

const ICONS = {
  /* O fruto inteiro, com os três poros de germinação — é isso que faz um
     desenho ler como "coco" e não como "círculo". */
  /* Os três poros ficam AGRUPADOS num polo, como num coco de verdade.
     Espalhados pelo círculo eles viram dois olhos e uma boca — a primeira
     versão deste ícone era, literalmente, uma carinha sorridente. */
  coco: `<circle cx="16" cy="16" r="12.4"/>
    <circle cx="10.6" cy="9.8" r="1.05" fill="currentColor" stroke="none"/>
    <circle cx="13.9" cy="8.0" r="1.05" fill="currentColor" stroke="none"/>
    <circle cx="12.1" cy="12.8" r="1.05" fill="currentColor" stroke="none"/>
    <path d="M14.4 24.6q4-1.6 7.4-6.2M17.8 26.2q3.6-2.2 6-6.6M11.2 22.4q4.6-1.4 8.6-6.4"
      opacity="0.6"/>`,

  /* A secção: casca espessa, endocarpo fino, polpa, cavidade. As proporções
     são as mesmas da chapa grande — o argumento inteiro em 32 pixels. */
  secao: `<circle cx="16" cy="16" r="13"/>
    <circle cx="16" cy="16" r="7.4"/>
    <circle cx="16" cy="16" r="6.1"/>
    <circle cx="16" cy="16" r="3.6" fill="currentColor" stroke="none" opacity="0.5"/>
    <path d="M16 3v3.4M16 25.6V29M3 16h3.4M25.6 16H29
      M6.8 6.8l2.4 2.4M22.8 22.8l2.4 2.4M25.2 6.8l-2.4 2.4M9.2 22.8l-2.4 2.4" opacity="0.7"/>`,

  /* Coir: fibra direcional. Quatro fios paralelos, nunca cruzados. */
  fibra: `<path d="M3 9.5q6.5-3 13 0t13 0M3 15q6.5-3 13 0t13 0M3 20.5q6.5-3 13 0t13 0M3 26q6.5-3 13 0t13 0"/>`,

  /* Endocarpo: o arco duro, mais espesso que tudo o resto. */
  endocarpo: `<path d="M16 4.2a11.8 11.8 0 1 1 0 23.6" stroke-width="${S * 2.2}"/>
    <path d="M16 4.2a11.8 11.8 0 1 0 0 23.6" opacity="0.45"/>
    <circle cx="16" cy="16" r="5.6" opacity="0.6"/>`,

  /* A pilha úmida: um monte, e o que escorre dele. */
  pilha: `<path d="M3.5 22.5 L11 10.5 L16.5 22.5 L21 13.5 L28.5 22.5 Z"/>
    <path d="M2.5 25.6h27" opacity="0.7"/>
    <path d="M9 27.6v2.6M15 27.6v3.4M21.5 27.6v2.2" opacity="0.75"/>`,

  /* O reator de três zonas, com a areia recirculando. É o desenho da chapa 02
     reduzido — o mesmo objeto, a mesma leitura. */
  reator: `<rect x="9" y="3.4" width="12" height="7.2" rx="0.8"/>
    <rect x="9" y="12.4" width="12" height="8.2" rx="0.8"/>
    <rect x="9" y="22.4" width="12" height="6.2" rx="0.8"/>
    <path d="M15 0.6v2.8M15 28.6v2.8"/>
    <path d="M21 7q5 0 5 8.5T21 25.5" stroke-dasharray="1.6 2"/>`,

  /* Temperatura, como escala e não como chama: a faixa de pirólise marcada
     numa régua vertical. */
  calor: `<path d="M8.5 2.5v27"/>
    <path d="M8.5 6h5M8.5 11h7.5M8.5 16h7.5M8.5 21h5M8.5 26h5"/>
    <rect x="18" y="10" width="9" height="7" rx="0.8" fill="currentColor" stroke="none" opacity="0.22"/>
    <rect x="18" y="10" width="9" height="7" rx="0.8"/>`,

  /* Recuperação de calor: o gás sai do corpo e volta ao MESMO corpo. Não é um
     ciclo fechado abstrato — é um circuito de processo. */
  gases: `<rect x="6" y="12" width="14" height="12" rx="0.8"/>
    <path d="M13 12V6.5q0-3 3-3h7.5"/>
    <path d="M20.6 1.2l3.2 2.3-3.2 2.3" fill="none"/>
    <path d="M28 6.5v9.5q0 3-3 3h-5"/>
    <path d="M22.6 16.8l-2.4 2.2 2.4 2.2" fill="none"/>`,

  /* O char: grãos angulosos, nunca esferas. */
  char: `<path d="M4.6 9.6l4.2-3.4 4 2.6-1.4 4.6-4.6.6z"/>
    <path d="M15.6 5.4l5 .8 1.4 4.4-4 3-3.6-3.2z"/>
    <path d="M23 13.6l4.6 2-.6 4.8-4.8.8-1.6-4.4z"/>
    <path d="M6.4 18.4l5 1.2.8 4.8-4.4 2.4-3-3.8z"/>
    <path d="M14.8 19.2l5.4-.4 1.6 4.6-3.8 3.4-4-2.6z"/>`,

  /* Perfil de solo com char no horizonte superior — o destino agronômico. */
  solo: `<path d="M2.5 11.5h27"/>
    <path d="M2.5 20h27" opacity="0.55"/>
    <path d="M2.5 27.5h27" opacity="0.35"/>
    <path d="M6 14.6l2.6-1.6 2 1.8-1.4 2.2-3-.6z" fill="currentColor" stroke="none" opacity="0.6"/>
    <path d="M14 15.4l3-1.2 1.6 2.4-2.6 1.8-2.4-1.4z" fill="currentColor" stroke="none" opacity="0.6"/>
    <path d="M22.4 14.2l3 .8.4 2.8-3.2.8-1.4-2.4z" fill="currentColor" stroke="none" opacity="0.6"/>`,

  /* Muda de caju: o sujeito do ensaio da Embrapa citado no slide 05. */
  muda: `<path d="M4 27.5h24"/>
    <path d="M16 27.5V13"/>
    <path d="M16 16.5q-6 0-7.5-6 6-1 7.5 6z"/>
    <path d="M16 13.5q5 0 6.5-5.5-5.5-1-6.5 5.5z"/>`,

  /* Bloco pré-moldado: o produto de construção, com os seus dois vazios. */
  bloco: `<rect x="3" y="9" width="26" height="14" rx="0.8"/>
    <rect x="7.6" y="12.8" width="6.6" height="6.4" rx="0.6" opacity="0.65"/>
    <rect x="17.8" y="12.8" width="6.6" height="6.4" rx="0.6" opacity="0.65"/>`,

  /* Remoção: o carbono desce e fica abaixo da linha. A seta aponta para
     dentro do solo, não para o céu. */
  removal: `<path d="M16 3.5v17"/>
    <path d="M10.6 15.4L16 21l5.4-5.6"/>
    <path d="M2.5 25h27"/>
    <path d="M6 28.4h4M13 28.4h6M23 28.4h3.5" opacity="0.55"/>`,

  /* Coqueiro. Específico: estipe curvo e seis folhas, não uma palmeira
     genérica de ícone de férias. */
  palmeira: `<path d="M17.5 29.5q-1.5-9 -3-16"/>
    <path d="M14.5 13.5q-5-4.5-11-3.5M14.5 13.5q-3.5-6-9.5-7.5
      M14.5 13.5q0-6.5 3-10M14.5 13.5q4-5 10-5M14.5 13.5q6 -1.5 11 2.5"/>
    <circle cx="14.5" cy="13.5" r="1.3" fill="currentColor" stroke="none"/>
    <path d="M6 29.5h20" opacity="0.5"/>`,

  /* Registro / certificação: um selo com a sua linha de lote, sem "certinho"
     genérico. */
  registro: `<circle cx="16" cy="13.5" r="9.5"/>
    <path d="M11.4 13.5h9.2M11.4 10h9.2M11.4 17h5.8" opacity="0.8"/>
    <path d="M11 22.5l-2 7 7-3 7 3-2-7"/>`,

  /* A unidade: fábrica sóbria, sem fumaça. */
  unidade: `<path d="M2.5 28.5h27"/>
    <path d="M4.5 28.5V14l8 4.6V14l8 4.6V7.5h6.5v21"/>
    <path d="M23 11.5h3.5M23 15.5h3.5M23 19.5h3.5" opacity="0.6"/>`,
};

/* Renderiza cada ícone em duas cores: escuro para os quadros claros do
   baralho, claro para o único quadro profundo. */
/* `steel` é a cor da camada de engenharia: prata só aparece em estrutura —
   fios, marcas de registro, réguas — e nos ícones que descrevem o EQUIPAMENTO,
   nunca nos que descrevem a matéria viva. */
const COLOURS = { dark: '#2F3A26', light: '#D9E7C6', palm: '#4D6640',
                  husk: '#8A7050', steel: '#7E8C90' };

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 256, height: 256 }, deviceScaleFactor: 1 });
let n = 0;
for (const [name, body] of Object.entries(ICONS)) {
  for (const [tone, colour] of Object.entries(COLOURS)) {
    await p.setContent(`<body style="margin:0">
      <svg width="256" height="256" viewBox="0 0 32 32" fill="none" stroke="${colour}"
        stroke-width="${S}" stroke-linecap="round" stroke-linejoin="round">${body}</svg></body>`);
    await p.screenshot({ path: path.join(OUT, `${name}-${tone}.png`), omitBackground: true });
    n++;
  }
}
await b.close();
console.log(`ícones: ${Object.keys(ICONS).length} × ${Object.keys(COLOURS).length} = ${n} arquivos`);
