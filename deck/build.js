/* ===========================================================================
   POC BIOCHAR — PETROLINA · CAPEX E OPEX

   Twelve slides, twelve compositions. There is no master layout here and no
   repeated "background + headline + cards + chart": each frame is laid out
   against its own art plate, and every coordinate below is keyed to a zone
   that plate deliberately left clear.

   The division of labour:
     art.mjs  — atmosphere, matter, optics, ghost numerals, graphic lines.
                Everything pptxgenjs physically cannot do (blur, mask,
                gradient field, overlap, translucency).
     this file — TYPE ONLY, which is what a reader edits.

   Consequences that are load-bearing:
   - No PowerPoint charts anywhere. The cost bar on 05 is drawn from rects so
     it is a continuous editorial band rather than a default bar chart.
   - No cards, no boxes, no three-equal-columns. Structure is hairlines and
     position.
   - Scale contrast is extreme by design: a 150pt numeral against 7.5pt
     tracked microtype on the same frame.
   - Microtype is used as texture, not only as labelling — the technical
     columns on 01 and 04 exist to make the frame read as an instrument.
   =========================================================================== */

const pptxgen = require('pptxgenjs');
const M = require('./model.js');
const A = '/home/user/clipping/design-system/.preview/deck-assets/';

/* --- Paleta. Sem '#': pptxgenjs corrompe o arquivo com ele. --------------- */
const TEXT    = '143743';   // petrol-900 — o único escuro numa página clara
const GRAPH   = '52666B';   // corpo
const HAZE500 = '7AA8C9';
const HAZE600 = '5B8AAE';
const MINERAL = '1F7370';
const MINERAL7= '175D5C';
const CYAN6   = '1F92AB';
const FLARE   = 'C9654A';   // o único sinal quente
const MINT    = '97DCC7';
const MINT100 = 'EEFAF5';
const HAZE300 = 'BED7E9';

const brl  = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const brlM = n => (n / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const num  = (n, d = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';               // 10" × 5.625"
pres.author = 'RECICLAR · EPA';
pres.title  = 'POC Biochar Petrolina — CAPEX e OPEX';

/* --- Primitivas tipográficas ---------------------------------------------
   Cada uma monta um objeto de opções NOVO: pptxgenjs converte para EMU no
   lugar, então compartilhar um objeto entre duas chamadas quebra a segunda. */

/** Microtype. Uppercase, tracking alto, minúsculo. É textura, não só rótulo. */
const micro = (s, t, x, y, w, color = HAZE600, align = 'left', size = 7.5) =>
  s.addText(String(t).toUpperCase(), { x, y, w, h: 0.17, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: size, charSpacing: 2.6, color, align, valign: 'middle' });

/** Código técnico: monoespaçado, para números que precisam alinhar. */
const code = (s, t, x, y, w, color = TEXT, align = 'left', size = 8.5) =>
  s.addText(String(t), { x, y, w, h: 0.19, isTextBox: true, margin: 0,
    fontFace: 'Courier New', fontSize: size, color, align, valign: 'middle' });

const hair = (s, x, y, w, color = HAZE600, transparency = 58) =>
  s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.008, fill: { color, transparency } });

const vhair = (s, x, y, h, color = HAZE600, transparency = 62) =>
  s.addShape(pres.ShapeType.rect, { x, y, w: 0.008, h, fill: { color, transparency } });

/** Headline: lowercase, grande, tracking negativo.
    A altura é linhas x entrelinha em polegadas — nada de constante inventada,
    porque tudo que se posiciona "abaixo da headline" depende dela. */
const headH = (size, lines) => (size * 1.06 * lines) / 72;
const head = (s, t, x, y, w, size = 44, color = TEXT) =>
  s.addText(t, { x, y, w, h: headH(size, String(t).split('\n').length), isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: size, color,
    lineSpacing: size * 1.06, charSpacing: -1.1, valign: 'top' });

/** Número protagonista. Ancorado ao TOPO de uma caixa de uma linha exata, para
    que nada abaixo dele possa ser coberto pelos glifos. */
const bigH = size => (size * 1.3) / 72;
const big = (s, t, x, y, w, size, color = TEXT, align = 'left') =>
  s.addText(t, { x, y, w, h: bigH(size), isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, align, charSpacing: size > 90 ? -4 : -2, valign: 'top' });

const body = (s, t, x, y, w, h, color = GRAPH, size = 10) =>
  s.addText(t, { x, y, w, h, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, lineSpacing: size * 1.55, valign: 'top' });

const plate = n => ({ path: A + `art-${n}.jpg` });

/** A coluna de metadados que corre pela margem. Existe para dar ao quadro a
    densidade de um instrumento — microtexto como textura. */
function metaColumn(s, rows, x, y, w, color = HAZE600, align = 'left') {
  rows.forEach(([k, v], i) => {
    const yy = y + i * 0.235;
    micro(s, k, x, yy, w * 0.52, color, align, 6.8);
    code(s, v, x + (align === 'right' ? 0 : w * 0.5), yy, w * 0.5,
      color === HAZE600 ? HAZE500 : color, 'right', 7.6);
  });
}

/** A mesma coluna de metadados, deitada: uma régua de dados no pé do quadro.
    Existe porque numa composição de numeral gigante a coluna vertical não cabe. */
function metaRow(s, rows, x, y, w, color = HAZE600) {
  const cw = w / rows.length;
  rows.forEach(([k, v], i) => {
    hair(s, x + i * cw, y, cw - 0.12, color, 62);
    micro(s, k, x + i * cw, y + 0.08, cw - 0.14, color, 'left', 6.5);
    code(s, v, x + i * cw, y + 0.26, cw - 0.16, TEXT, 'left', 9);
  });
}

/** Etiqueta girada na borda. Y2K editorial: informação fora do fluxo. */
const edge = (s, t, x, y, color = HAZE500) =>
  s.addText(String(t).toUpperCase(), { x, y, w: 2.6, h: 0.18, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 6.8, charSpacing: 3, color, rotate: 90 });

/* ===========================================================================
   01 — CAPA
   Zona livre da chapa: esquerda 52%, abaixo de y 44%. A membrana ocupa a
   direita e é cortada pelo topo. Lançamento de produto, não capa de relatório.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('01');
  s.addImage({ path: A + 'mark-dark.png', x: 0.52, y: 0.42, w: 0.3, h: 0.3 });
  micro(s, 'POC / Petrolina / Pernambuco', 0.95, 0.47, 3.4, HAZE600);

  head(s, 'transformando resíduo\nem impacto climático.', 0.52, 2.62, 6.4, 46);

  hair(s, 0.52, 4.28, 3.6, MINERAL, 50);
  micro(s, 'estimativas de capex e opex da prova de conceito', 0.52, 4.4, 6, GRAPH, 'left', 8);

  // Microtexto como textura: a régua técnica dá ao quadro densidade de
  // instrumento sem competir com a headline.
  metaRow(s, [
    ['reator', 'FBR 3 zonas'],
    ['capacidade', '500 kg/h'],
    ['trl', '04 → 07'],
    ['método', 'VM0044'],
  ], 0.52, 4.74, 5.0);

  edge(s, 'lat −9,3891 · long −40,5030', 9.42, 0.42);
  s.addNotes('Capa. A membrana translúcida é cortada pelo topo e pela direita; a headline '
    + 'ocupa a zona clara à esquerda. Nenhum quadro escuro antes do slide 11.');
}

/* ===========================================================================
   02 — A OPORTUNIDADE
   A chapa traz o eixo oferta → lacuna → demanda em y 68% (3,825") com nós em
   x 0,44" e 9,56", e o fantasma "100 Mt/ano" à direita. Os três números vivem
   NO eixo, em escalas completamente diferentes.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('02');
  micro(s, '01 / mercado', 0.5, 0.44, 3);
  head(s, 'Remoção durável é o mercado\ncom a demanda travada pela oferta.', 0.5, 0.92, 6.4, 26);

  // O herói absoluto, sentado sobre o eixo.
  big(s, '1,5', 0.42, 1.80, 3.2, 110, TEXT);
  s.addText('Mt', { x: 2.34, y: 2.70, w: 1, h: 0.55, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 28, color: MINERAL, charSpacing: -0.6, valign: 'top' });

  micro(s, '01 · oferta', 0.5, 3.93, 2.4, MINERAL);
  body(s, 'entregues no mundo inteiro até jun/26', 0.5, 4.12, 2.4, 0.5, GRAPH, 9.5);

  micro(s, '02 · lacuna', 4.7, 3.93, 2.4, HAZE600);
  body(s, 'a oferta certificada é o gargalo — não a demanda', 4.7, 4.12, 1.95, 0.5, GRAPH, 9.5);

  // O extremo oposto do eixo, propositalmente pequeno: o comprador é enorme,
  // mas a história é a lacuna.
  big(s, '34,6 Mt', 6.85, 2.74, 2.3, 26, MINERAL7, 'right');
  micro(s, '03 · demanda · microsoft', 6.85, 3.93, 2.3, MINERAL, 'right');
  body(s, '63% de todas as compras de CDR em 2024', 6.85, 4.12, 2.3, 0.5, GRAPH, 9.5);

  // Preço como etiqueta lateral, fora do fluxo de leitura.
  micro(s, 'referência de preço', 6.85, 1.62, 2.3, HAZE600, 'right');
  s.addText('US$ 150 / tCO₂', { x: 6.85, y: 1.8, w: 2.3, h: 0.32, isTextBox: true, margin: 0,
    fontFace: 'Courier New', fontSize: 15, color: TEXT, align: 'right', valign: 'top' });

  micro(s, 'poc biochar · petrolina', 0.5, 5.26, 4, HAZE500);
  edge(s, 'mckinsey · cdr.fyi · s&p global', 9.42, 0.42);
  s.addNotes('1,5 Mt entregues contra 100 Mt/ano de demanda projetada em 2030. '
    + 'O fantasma "100 Mt/ano" na chapa é a demanda que o mercado não alcança.');
}

/* ===========================================================================
   03 — A TESE
   Três matérias em sequência quebrada: fibra (4–23%), aço (30–63%), carbono
   (66–100%), em três alturas diferentes. Rótulos ACIMA, escalonados; texto
   abaixo de cada recorte. material → tecnologia → valor.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('03');
  micro(s, '02 / tese', 0.4, 0.32, 3);

  // As legendas vivem ABAIXO de cada recorte, a três alturas diferentes — o
  // escalonamento é a composição, não um acidente.
  const cols = [
    // [x, w, labelY, textY, textH, idx, name, en, text]
    [0.4, 1.9, 3.60, 4.00, 0.9, '01', 'resíduo cativo', 'FEEDSTOCK',
     '~120 mil t de coco por ano EM Petrolina. 100 mil t úmidas de casca na porta da fábrica.'],
    [3.0, 3.3, 2.70, 3.10, 1.1, '02', 'tecnologia nacional', 'CONVERSION',
     'Leito fluidizado circulante de três zonas (Finep, TRL 4→7): char fino por atrito, redução '
     + 'de potássio pelo leito e syngas queimado no riser — o risco de metano resolvido por projeto.'],
    [6.6, 3.0, 4.28, 4.66, 0.5, '03', 'três receitas', 'VALUE',
     'Destinação + material + crédito. O mesmo quilo nunca é vendido duas vezes.'],
  ];
  cols.forEach(([x, w, ly, ty, th, idx, name, en, text]) => {
    code(s, idx, x, ly, 0.4, MINERAL, 'left', 9);
    micro(s, en, x + 0.42, ly, w - 0.42, HAZE600);
    s.addText(name, { x, y: ly + 0.2, w, h: 0.28, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 13, color: TEXT, charSpacing: -0.3, valign: 'top' });
    body(s, text, x, ty, w, th, GRAPH, 8.5);
  });

  micro(s, 'material → tecnologia → valor', 0.4, 5.06, 4, MINERAL);
  micro(s, 'nenhuma planta latino-americana produz char de especificação para construção',
    5.0, 5.06, 4.6, HAZE600, 'right');
  s.addNotes('Três estados da matéria, não três colunas. O elo do meio é o que está vazio '
    + 'na América Latina.');
}

/* ===========================================================================
   04 — O PILOTO
   Zona livre: esquerda 55%. O desenho técnico do reator de três zonas ocupa a
   direita. O numeral toma ~35% do quadro.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('04');
  micro(s, '03 / piloto', 0.5, 0.44, 3);

  big(s, '810', 0.36, 1.28, 4.6, 168, TEXT);
  s.addText('t biochar / ano', { x: 0.56, y: 4.42, w: 3.2, h: 0.3, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 15, color: MINERAL, charSpacing: -0.2, valign: 'top' });
  hair(s, 0.52, 4.34, 3.0, MINERAL, 45);

  metaRow(s, [
    ['capacidade', '500 kg/h'],
    ['biomassa', '4.000 t/ano'],
    ['rendimento', '≥ 20 %'],
    ['remoção líquida', '1.620 tCO₂e'],
  ], 0.52, 4.76, 5.2);

  // Legenda do desenho, encostada na margem da própria seção.
  micro(s, 'zona 1 · combustão', 4.6, 1.42, 1.8, HAZE600, 'right');
  micro(s, 'zona 2 · pirólise', 4.6, 2.72, 1.8, MINERAL, 'right');
  micro(s, 'zona 3 · freeboard', 4.6, 4.06, 1.8, HAZE600, 'right');
  micro(s, 'recirculação de areia', 8.5, 3.34, 1.1, HAZE500, 'left', 6.5);

  micro(s, '30 meses · trl 04 → 07', 0.52, 5.24, 3.2, HAZE500);
  edge(s, '2,0 tCO₂e por tonelada de char', 9.42, 0.42);
  s.addNotes('810 t/ano de char equivalem a 4.000 t de biomassa a ~20% de rendimento. '
    + 'O laço tracejado no desenho é a recirculação de areia entre as zonas.');
}

/* ===========================================================================
   05 — CAPEX
   Zona livre: esquerda 62%. A barra de custo é desenhada com retângulos — uma
   faixa editorial contínua, não um gráfico de barras.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('05');
  micro(s, '04 / capex', 0.5, 0.44, 3);
  head(s, 'O ativo físico e a engenharia\nque o produz.', 0.5, 0.9, 5.4, 26);

  big(s, '7,7', 0.42, 1.78, 3.0, 96, TEXT);
  s.addText('R$ M', { x: 2.16, y: 2.52, w: 1.2, h: 0.46, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 24, color: MINERAL, charSpacing: -0.4, valign: 'top' });

  /* A barra editorial: uma faixa contínua de 5,4", partida uma única vez.
     Uma barra por WP seria um gráfico; uma faixa partida é uma proporção. */
  const capexWP = M.WP.filter(w => w[2] === 'CAPEX');
  const total = capexWP.reduce((a, w) => a + w[1], 0);
  const BAR_X = 0.5, BAR_Y = 3.86, BAR_W = 5.4, BAR_H = 0.075;
  let cx = BAR_X;
  capexWP.forEach(([label, v], i) => {
    const w = (v / total) * BAR_W - (i ? 0.03 : 0);
    const x = cx + (i ? 0.03 : 0);
    s.addShape(pres.ShapeType.rect, { x, y: BAR_Y, w, h: BAR_H,
      fill: { color: i === 0 ? HAZE500 : MINERAL, transparency: i === 0 ? 20 : 0 } });
    micro(s, label.replace(/^WP\d — /, ''), x, BAR_Y + 0.16, Math.max(w, 1.5),
      i === 0 ? HAZE600 : MINERAL, 'left', 6.8);
    s.addText(brlM(v), { x, y: BAR_Y - 0.34, w: 1.2, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Courier New', fontSize: 12, color: TEXT, valign: 'middle' });
    cx = x + w;
  });
  micro(s, 'WP1', BAR_X, BAR_Y + 0.38, 1.2, HAZE500);
  micro(s, 'WP2', BAR_X + (capexWP[0][1] / total) * BAR_W + 0.03, BAR_Y + 0.38, 1.2, MINERAL);

  metaColumn(s, [
    ['por t de capacidade', brl(M.CAPEX_POC / M.PILOTO.charAno) + '/t'],
    ['precisão', 'AACE 4 · −30/+50%'],
  ], 0.5, 4.72, 3.2);

  body(s, 'A engenharia básica e de detalhamento é capitalizada junto com o equipamento: '
    + 'num piloto ela não tem valor separável dele.', 0.5, 5.26, 5.4, 0.3, GRAPH, 8.5);
  edge(s, 'wp1 + wp2 · finep economia circular', 9.42, 0.42);
  s.addNotes('CAPEX = WP1 (projeto) + WP2 (construção e montagem) = R$ 7,7 M dos R$ 15,0 M.');
}

/* ===========================================================================
   06 — OPEX DO PROJETO
   Campo tipográfico sobre o fantasma "15,0" da chapa. As duas metades do total
   são postas VIVAS por cima dele; a proporção 85/15 fica na lateral.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('06');
  micro(s, '05 / opex do projeto', 0.5, 0.44, 3);
  head(s, 'O que se consome provando\no ativo, em 30 meses.', 0.5, 0.9, 5.2, 26);

  // As duas metades, sobre o fantasma do total.
  big(s, '7,3', 0.42, 1.86, 2.6, 96, TEXT);
  s.addText('R$ M · OPEX', { x: 0.56, y: 3.86, w: 2.6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 14, color: MINERAL, valign: 'top' });
  hair(s, 0.52, 3.78, 2.2, MINERAL, 45);

  big(s, '7,7', 2.62, 2.68, 1.9, 50, HAZE600);
  micro(s, 'R$ M · capex', 2.72, 3.86, 2, HAZE600);
  hair(s, 2.68, 3.78, 1.5, HAZE600, 55);

  // A proporção do financiamento, como razão e não como tabela.
  s.addText('85 / 15', { x: 6.9, y: 1.5, w: 2.6, h: 0.62, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 44, color: MINERAL7, align: 'right',
    charSpacing: -1.4, valign: 'top' });
  micro(s, 'subvenção finep / contrapartida', 6.9, 2.16, 2.6, HAZE600, 'right');
  metaColumn(s, [
    ['subvenção finep', brl(M.FINEP.subvencao)],
    ['contrapartida', brl(M.FINEP.contrapartida)],
    ['média mensal', brl(M.OPEX_POC / 30)],
  ], 6.5, 2.56, 3.0);

  // Os work packages como rótulos numa régua, não como barras.
  const opexWP = M.WP.filter(w => w[2] === 'OPEX');
  const oTotal = opexWP.reduce((a, w) => a + w[1], 0);
  let ox = 0.5;
  opexWP.forEach(([label, v, , wp]) => {
    const w = (v / oTotal) * 9.0;
    hair(s, ox, 4.42, w - 0.06, MINERAL, 55);
    code(s, wp, ox, 4.5, 0.6, MINERAL, 'left', 8);
    micro(s, label.replace(/^WP\d — /, ''), ox, 4.72, w - 0.1, HAZE600, 'left', 6.8);
    code(s, brlM(v), ox, 4.92, w - 0.14, TEXT, 'left', 9.5);
    ox += w;
  });

  micro(s, 'poc biochar · petrolina', 0.5, 5.26, 4, HAZE500);
  s.addNotes('R$ 7,3 M de custeio sobre R$ 7,7 M de investimento: R$ 15,0 M no total, '
    + '85% via subvenção Finep.');
}

/* ===========================================================================
   07 — OPEX EM REGIME
   Dois campos translúcidos sobrepostos na chapa: o que custa e o que entra.
   A sobreposição É o argumento. Insight de engenharia, não slide pessimista.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('07');
  micro(s, '06 / opex em regime', 0.5, 0.44, 3);
  head(s, 'O piloto não se paga.\nE não deveria.', 0.5, 0.9, 5.4, 30);

  // Os dois números partilham a baseline, e o de cima é o custo.
  big(s, brl(M.OPEX_REGIME.porT), 0.62, 2.5, 3.4, 40, TEXT);
  micro(s, 'custo por tonelada, em regime', 0.66, 3.28, 3.2, HAZE600);

  big(s, brl(M.UNIT.receitaBrutaPorT), 2.5, 3.28, 3.4, 40, MINERAL7);
  micro(s, 'receita bruta por tonelada', 2.54, 4.06, 3.2, MINERAL);

  // O delta. Coral, não vermelho de alerta: é uma constatação, não uma falha.
  s.addText('−160 / t', { x: 6.4, y: 4.28, w: 1.6, h: 0.34, isTextBox: true, margin: 0,
    fontFace: 'Courier New', fontSize: 16, color: FLARE, align: 'right', valign: 'top' });
  micro(s, 'resultado a 810 t/ano', 5.4, 4.66, 2.6, HAZE600, 'right');

  metaColumn(s, [
    ['custo fixo', brl(M.OPEX_REGIME.fixoAno) + '/ano'],
    ['custo variável', brl(M.OPEX_REGIME.varPorT) + '/t'],
    ['opex anual', brl(M.OPEX_REGIME.totalAno)],
  ], 6.1, 1.5, 3.4);

  body(s, 'O custo fixo não cai com a escala — e é exatamente por isso que o Módulo 1 '
    + 'fecha a conta e a POC não. A escala é o destravamento.',
    0.5, 4.88, 4.9, 0.6, GRAPH, 9.5);
  s.addNotes('Honestidade deliberada: R$ 3.336/t de custo contra R$ 3.177/t de receita. '
    + 'O breakeven do slide seguinte é a resposta.');
}

/* ===========================================================================
   08 — UNIT ECONOMICS
   Três estratos translúcidos e sobrepostos na chapa (x 4,4 / 3,9 / 4,8;
   y 0,84 / 2,25 / 3,66), cada um com a sua temperatura. Nunca três cartões.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('08');
  micro(s, '07 / unit economics', 0.5, 0.44, 3);

  big(s, '763', 0.36, 1.58, 3.6, 108, TEXT);
  s.addText('R$ / t', { x: 0.56, y: 3.62, w: 2, h: 0.4, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 22, color: MINERAL, charSpacing: -0.4, valign: 'top' });
  hair(s, 0.52, 3.54, 2.6, MINERAL, 45);
  micro(s, 'margem de contribuição por tonelada de char', 0.52, 4.06, 3.6, HAZE600);
  micro(s, 'cenário conservador · câmbio ' + num(M.CAMBIO, 2), 0.52, 4.28, 3.6, HAZE500);

  const strata = [
    [4.5, 0.92, 'CARBONO',  brl(M.UNIT.corcPorTChar),
     'US$ 150/tCO₂e · −25% offtake · −15% comissão · 2,0 tCO₂e líquidas'],
    [4.0, 2.33, 'MATERIAL', brl(M.UNIT.contratoBPorT),
     'contrato B: a fábrica fica com o carbono no EPD e não há CORC'],
    [4.9, 3.74, 'GATE FEE', brl(M.UNIT.gateFeePorTChar),
     'R$ 38/t úmida × 4,8 t — o resíduo paga antes do primeiro crédito'],
  ];
  strata.forEach(([x, y, name, value, note]) => {
    micro(s, name, x + 0.16, y + 0.12, 2.2, MINERAL);
    s.addText(value + ' / t', { x: x + 2.2, y: y + 0.06, w: 2.6, h: 0.3, isTextBox: true,
      margin: 0, fontFace: 'Courier New', fontSize: 15, color: TEXT, align: 'right', valign: 'top' });
    body(s, note, x + 0.16, y + 0.42, 4.4, 0.5, GRAPH, 8.5);
  });

  micro(s, 'regra do carbono único: o mesmo quilo nunca é vendido duas vezes',
    0.5, 5.26, 6, MINERAL);
  s.addNotes('Três receitas independentes empilhadas numa margem. O contrato B existe para '
    + 'o caso de a cimenteira reivindicar o carbono no próprio EPD.');
}

/* ===========================================================================
   09 — BREAKEVEN
   Uma única linha de capacidade atravessa o quadro em y 3,15", com quatro nós
   em x 1,5 / 3,9 / 6,3 / 8,7. Os números vivem NA linha. Sem caixas.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('09');
  micro(s, '08 / breakeven', 0.5, 0.44, 3);
  head(s, 'O solver diz exatamente\no que precisa ser verdade.', 0.5, 0.9, 4.4, 26);

  const marks = [
    [1.5,  2.03, num(M.BREAKEVEN.caixa),     'breakeven de caixa', 'com subvenções de custeio', HAZE600, 26],
    [3.9,  1.86, num(M.BREAKEVEN.capacidadeModulo1), 'capacidade módulo 1', 'CAPEX de ' + brlM(M.BREAKEVEN.capexModulo1) + ' M', MINERAL7, 32],
    [6.3,  1.62, num(M.BREAKEVEN.ebitdaZero), 'EBITDA = 0 em 2028', 'a mercado pleno, 15 pessoas', TEXT, 40],
    [8.7,  3.62, num(M.BREAKEVEN.semGateFee), 'sem o gate fee', 'a destinação vale ~1.500 t', FLARE, 22],
  ];
  marks.forEach(([x, y, n, label, note, color, size]) => {
    const below = y > 3.15;
    big(s, n, x - 1.25, y, 2.5, size, color, 'center');
    const ly = below ? y + bigH(size) + 0.06 : y + bigH(size) + 0.06;
    micro(s, label, x - 1.25, ly, 2.5, color === FLARE ? FLARE : MINERAL, 'center');
    body(s, note, x - 1.25, ly + 0.2, 2.5, 0.4, GRAPH, 8.5);
  });

  micro(s, 'toneladas de biochar por ano', 0.5, 3.32, 3, HAZE500);
  micro(s, 'poc biochar · petrolina', 0.5, 5.26, 4, HAZE500);
  s.addNotes('4.700 t de capacidade contra 5.448 t de necessidade: o Módulo 1 sozinho não '
    + 'fecha a conta a mercado pleno. Por isso a Planta 1 entra em 2029.');
}

/* ===========================================================================
   10 — ESCALA
   O quadro cinematográfico. A trajetória luminosa sobe da esquerda-baixo para
   a direita-alto, com nós em (0,84 / 4,08) (3,2 / 3,67) (5,84 / 2,54)
   (8,8 / 1,14). Os rótulos seguem os nós, não uma linha de base.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('10');
  micro(s, '09 / escala', 0.5, 0.44, 3);
  head(s, 'De 810 toneladas a um grupo\nque cruza o zero.', 0.5, 0.9, 5.6, 26);

  const nodes = [
    [0.62, 4.12, '2027', 'POC',       '810',    't char/ano',    22, HAZE600],
    [2.98, 3.80, '2028', 'Módulo 1',  '4,7 K',  't char/ano',    26, MINERAL7],
    [5.62, 2.76, '2029', 'Planta 1',  '20 K',   't biomassa/ano', 30, MINERAL],
    [8.10, 1.36, '2031', 'Planta 2',  '40 K',   't biomassa/ano', 36, TEXT],
  ];
  nodes.forEach(([x, y, ano, nome, val, unit, size, color]) => {
    code(s, ano, x, y, 0.8, color, 'left', 9);
    s.addText(nome, { x, y: y + 0.2, w: 1.7, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 11.5, color: TEXT, valign: 'top' });
    big(s, val, x, y + 0.46, 1.85, size, color);
    micro(s, unit, x, y + 0.46 + bigH(size) + 0.02, 1.85, HAZE600, 'left', 6.8);
  });

  micro(s, 'o breakeven do grupo fica em ~13 mil t/ano — a segunda planta não é réplica, é o dobro',
    0.5, 5.38, 7.4, MINERAL);
  edge(s, 'bndes fundo clima · sudene · fne verde', 9.42, 0.42);
  s.addNotes('A trajetória é momentum, não um gráfico. Cada nó é um marco de capacidade.');
}

/* ===========================================================================
   11 — DISCIPLINA
   O ÚNICO quadro profundo do baralho, e petróleo profundo, nunca quase-preto.
   Os cinco gates são pontos luminosos sobre a linha em y 4,16", em
   x 0,95 / 2,85 / 4,75 / 6,65 / 8,55. A frase ocupa quase metade do quadro.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('11');
  s.addImage({ path: A + 'mark-light.png', x: 0.5, y: 0.42, w: 0.28, h: 0.28 });
  micro(s, '10 / disciplina', 0.92, 0.47, 3, MINT);

  s.addText('Cada tonelada da POC compra\no que dinheiro não compra depois.', {
    x: 0.5, y: 1.42, w: 8.4, h: 1.5, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 36, color: MINT100, lineSpacing: 41, charSpacing: -1, valign: 'top' });

  const gates = [
    [0.95, 'M03', 'H/Corg ≤ 0,40', 'mantém Puro e EBC abertas'],
    [2.85, 'M06', 'leito não aglomera', 'com o potássio do coco'],
    [4.75, 'M09', 'CH₄ sob o teto', 'e areia dentro da spec'],
    [6.65, 'M12', 'destinação assinada', 'condição de CAPEX'],
    [8.55, 'M15', 'facility audit', 'primeira emissão'],
  ];
  gates.forEach(([x, m, gate, note]) => {
    code(s, m, x - 0.28, 4.42, 0.8, MINT, 'left', 9);
    s.addText(gate, { x: x - 0.28, y: 4.62, w: 1.75, h: 0.24, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 10.5, color: MINT100, valign: 'top' });
    micro(s, note, x - 0.28, 4.88, 1.8, HAZE300, 'left', 6.5);
  });

  micro(s, 'poc biochar · petrolina', 0.5, 5.28, 4, HAZE500);
  s.addNotes('Cinco gates binários. Nenhum é uma meta: cada um é condição para o degrau seguinte.');
}

/* ===========================================================================
   12 — FINANCIAMENTO
   Volta inteiramente para a luz, e mais clara que a capa. Estrutura como
   razão, não como tabela. Deve terminar como abertura, não como fim.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('12');
  micro(s, '11 / financiamento', 0.5, 0.44, 3);
  head(s, 'Não-dilutivo primeiro.\nEquity com marco provado.', 0.5, 0.92, 5.6, 32);

  // A estrutura como proporção.
  big(s, '85', 0.42, 2.30, 1.7, 84, MINERAL7);
  micro(s, '% subvenção finep', 0.56, 3.92, 1.55, MINERAL);
  code(s, brl(M.FINEP.subvencao), 0.56, 4.14, 1.9, HAZE600, 'left', 8.5);

  big(s, '15', 2.22, 2.92, 1.2, 44, HAZE600);
  micro(s, '% contrapartida', 2.28, 3.92, 1.6, HAZE600);
  code(s, brl(M.FINEP.contrapartida), 2.28, 4.14, 1.6, HAZE500, 'left', 8.5);

  vhair(s, 4.06, 2.5, 1.9, MINERAL, 55);
  big(s, brlM(M.TOTAL_POC), 4.34, 2.62, 2.4, 54, TEXT);
  micro(s, 'R$ M · total da POC', 4.4, 3.72, 2.4, MINERAL);
  metaColumn(s, [
    ['capex', brlM(M.CAPEX_POC) + ' M'],
    ['opex · 30 meses', brlM(M.OPEX_POC) + ' M'],
  ], 4.4, 3.98, 2.3);

  micro(s, 'próximos 90 dias', 7.2, 1.5, 2.3, MINERAL);
  [['01', 'Finep Economia Circular protocolada'],
   ['02', 'Contrato de destinação PepsiCo'],
   ['03', 'Fábrica de blocos parceira + seed de R$ 2–3 M']].forEach(([n, t], i) => {
    const y = 1.78 + i * 0.72;
    hair(s, 7.2, y, 2.3, MINERAL, 60);
    code(s, n, 7.2, y + 0.1, 0.4, MINERAL, 'left', 8.5);
    body(s, t, 7.2, y + 0.3, 2.3, 0.42, TEXT, 9);
  });

  micro(s, 'valores [EST] com precisão AACE classe 4 (−30% / +50%) · valores [DOC] lidos da '
    + 'proposta Finep e do plano da POC', 0.5, 5.26, 8.2, HAZE500, 'left', 6.8);
  s.addNotes('Fecha na luz e mais claro que a capa. Grant → offtake parcial com dMRV → '
    + 'dívida e equity de infraestrutura.');
}

pres.writeFile({ fileName: 'poc-biochar-capex-opex.pptx' })
  .then(f => console.log('escrito:', f));
