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
   01 — CAPA · MODE A
   A membrana translúcida tem um campo de poros dentro dela: é uma membrana de
   CARBONO, não uma esfera de vidro. O device da permanência aparece antes de
   ser explicado, e volta resolvido no slide 12.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('01');
  s.addImage({ path: A + 'mark-dark.png', x: 0.52, y: 0.42, w: 0.3, h: 0.3 });
  micro(s, 'POC / Petrolina / Pernambuco', 0.95, 0.47, 3.4, HAZE600);
  head(s, 'transformando resíduo\nem impacto climático.', 0.52, 2.42, 6.4, 46);
  hair(s, 0.52, 4.16, 3.6, MINERAL, 50);
  micro(s, 'estimativas de capex e opex da prova de conceito', 0.52, 4.28, 6, GRAPH, 'left', 8);
  metaRow(s, [
    ['reator', 'FBR 3 zonas'], ['capacidade', '500 kg/h'],
    ['char', '810 t/ano'], ['trl', '04 → 07'],
  ], 0.52, 4.62, 5.0);
  micro(s, 'reciclar · epa/bioecotec · união soluções · uel   ·   agosto 2026',
    0.52, 5.26, 6.4, HAZE500, 'left', 6.8);
  edge(s, 'lat −9,3891 · long −40,5030', 9.42, 0.42);
  s.addNotes('A membrana é o device da permanência e carrega poros — matéria, não vidro.');
}

/* ===========================================================================
   02 — A OPORTUNIDADE · MODE A
   A lacuna desenhada EM ESCALA. A barra inteira é a demanda anual projetada
   para 2030; o que o mundo já entregou é a lasca na ponta esquerda. Três
   caixas iguais esconderiam essa razão; a barra a torna inevitável.
   Barra em x 0,50"–9,50", y 2,35"–2,99"; a lasca acaba em 0,64".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('02');
  micro(s, '01 / mercado', 0.5, 0.44, 3);
  head(s, 'A oferta é o gargalo.\nNão a demanda.', 0.5, 0.86, 5.4, 30);

  const razao = M.MERCADO.demandaMt2030 / M.MERCADO.entregueMundoMt;
  micro(s, num(M.MERCADO.demandaMt2030) + ' Mt/ano · demanda projetada para 2030',
    0.5, 1.98, 6.0, HAZE600);
  big(s, Math.round(razao) + '×', 7.2, 1.50, 2.3, 54, MINERAL7, 'right');
  micro(s, 'entre entregar e precisar', 6.6, 2.44, 2.9, MINERAL, 'right');

  big(s, '1,5', 0.42, 3.16, 2.2, 64, TEXT);
  s.addText('Mt', { x: 1.72, y: 3.72, w: 0.8, h: 0.4, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 21, color: MINERAL, charSpacing: -0.4, valign: 'top' });
  micro(s, 'entregues no mundo inteiro, acumulado até jun/26', 0.52, 4.36, 4.4, HAZE600);

  hair(s, 5.4, 3.30, 4.1, MINERAL, 55);
  micro(s, 'e um único comprador', 5.4, 3.40, 4.1, MINERAL);
  code(s, num(M.MERCADO.microsoftMt, 1) + ' Mt', 5.4, 3.60, 1.6, TEXT, 'left', 15);
  body(s, 'contratados pela Microsoft — 63% de todas as compras de CDR em 2024',
    5.4, 3.92, 4.1, 0.5, GRAPH, 9.5);
  code(s, 'US$ ' + M.MERCADO.precoCorcUSD + ' / tCO₂', 5.4, 4.44, 2.4, MINERAL7, 'left', 11);
  micro(s, 'referência de entrega do crédito de biochar', 5.4, 4.68, 4.1, HAZE600, 'left', 6.5);

  hair(s, 0.5, 5.02, 8.9, HAZE600, 68);
  micro(s, 'o entregue é estoque acumulado e a demanda é fluxo anual projetado — a barra compara ordens de grandeza, não o mesmo período',
    0.5, 5.12, 8.9, HAZE500, 'left', 6.2);
  micro(s, 'fontes: cdr.fyi · mckinsey · s&p global   ·   [DOC]', 0.5, 5.30, 8.9, HAZE600, 'left', 6.2);
  s.addNotes('1,5 Mt entregues contra 100 Mt/ano de demanda projetada em 2030: ~66x, em escala.');
}

/* ===========================================================================
   03 — A TESE · MODE B
   Três estados da matéria numa sequência quebrada, cada um com a gramática do
   slide 11: o que é, e o que aquilo destrava. A linha térmica costura os três
   porque é o calor que os liga.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('03');
  micro(s, '02 / tese', 0.4, 0.30, 3);

  const cols = [
    [0.4, 1.95, 3.58, '01', 'FEEDSTOCK', 'resíduo cativo',
     '~120 mil t de coco por ano EM Petrolina — 100 mil t úmidas de casca na porta da fábrica.',
     'um contrato alimenta todas as fases'],
    [3.0, 3.2, 2.68, '02', 'CONVERSION', 'tecnologia nacional',
     'Leito fluidizado circulante de três zonas (Finep, TRL 4→7): char fino por atrito, potássio '
     + 'reduzido pelo leito, syngas queimado no riser.',
     'o risco de metano resolvido por projeto, não por operação'],
    [6.6, 3.0, 3.84, '03', 'VALUE', 'três receitas',
     'Destinação, material de construção e crédito de remoção.',
     'o resíduo paga antes do primeiro crédito'],
  ];
  cols.forEach(([x, w, y, idx, en, name, what, unlocks]) => {
    code(s, idx, x, y, 0.4, MINERAL, 'left', 9);
    micro(s, en, x + 0.42, y, w - 0.42, HAZE600);
    s.addText(name, { x, y: y + 0.20, w, h: 0.28, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 13, color: TEXT, charSpacing: -0.3, valign: 'top' });
    // A coluna mais baixa não tem altura para três degraus soltos, então o
    // seu "destrava" corre na mesma linha do rótulo.
    const tight = y > 3.5;
    body(s, what, x, y + 0.52, w, tight ? 0.42 : 0.7, GRAPH, 8.5);
    hair(s, x, y + (tight ? 1.0 : 1.24), w - 0.1, MINERAL, 58);
    micro(s, 'destrava', x, y + (tight ? 1.08 : 1.32), w, MINERAL, 'left', 6);
    body(s, unlocks, x, y + (tight ? 1.24 : 1.48), w, 0.4, TEXT, 8.5);
  });
  micro(s, 'material → tecnologia → valor', 0.4, 5.44, 4, MINERAL);
  micro(s, 'nenhuma planta latino-americana produz char de especificação',
    5.4, 5.44, 4.1, HAZE600, 'right');
  s.addNotes('O elo do meio — char de especificação para construção — é o que está vazio na América Latina.');
}

/* ===========================================================================
   04 — O PILOTO · BALANÇO DE MASSA E CARBONO

   A chapa desenha o balanço em proporção real: a banda de char tem 20,25% da
   altura da banda de biomassa porque esse É o rendimento, e a banda de
   remoção tem o dobro da de char porque são 2,0 tCO₂e por tonelada. A queda
   de altura é a conversão — não há rótulo dizendo "20%", há 20%.

   Três níveis: a cadeia quantitativa (2 s), o reator que a produz (o
   mecanismo), e as premissas com a sua procedência (a evidência).
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('04');
  micro(s, '03 / piloto · balanço de massa', 0.5, 0.44, 4);
  head(s, 'Massa entra.\nCarbono fica.', 0.5, 0.88, 4.2, 30);

  // NÍVEL 1 — a cadeia, lida em dois segundos. Cada número dimensionado pelo
  // seu papel: a entrada é grande, o produto é o protagonista, o resultado
  // climático fecha.
  micro(s, 'biomassa · entrada', 0.6, 2.34, 2.4, HAZE600);
  big(s, '4.000', 0.58, 3.42, 2.6, 34, HAZE600);
  micro(s, 't/ano de casca de coco', 0.62, 4.06, 2.6, HAZE500, 'left', 6.8);

  micro(s, 'char · produto', 5.5, 2.34, 1.8, MINERAL);
  big(s, '810', 5.46, 3.16, 2.0, 60, TEXT);
  micro(s, 't/ano de biochar', 5.52, 4.28, 2.0, MINERAL, 'left', 6.8);

  micro(s, 'remoção · resultado', 7.5, 2.34, 1.7, CYAN6);
  big(s, '1.620', 7.48, 3.24, 2.2, 38, MINERAL7);
  micro(s, 'tCO₂e/ano · 2,0 por t de char', 7.52, 3.98, 2.4, HAZE500, 'left', 6.8);

  // NÍVEL 2 — o mecanismo. O reator que produz a queda, e a taxa que a define.
  micro(s, '500 kg/h  ·  ≥ 20 % base seca', 3.1, 1.98, 2.4, MINERAL, 'right', 6.8);
  hair(s, 4.26, 4.30, 1.1, MINERAL, 50);
  micro(s, 'z1 combustão', 4.26, 4.40, 1.7, HAZE600, 'left', 6.2);
  micro(s, 'z2 pirólise 600 °C', 4.26, 4.58, 1.7, MINERAL, 'left', 6.2);
  micro(s, 'z3 freeboard', 4.26, 4.76, 1.7, HAZE600, 'left', 6.2);
  micro(s, 'areia recircula z1↔z3', 4.26, 4.94, 1.9, HAZE500, 'left', 6.2);

  // NÍVEL 3 — evidência: de onde cada número vem.
  hair(s, 0.5, 5.06, 3.6, HAZE600, 66);
  micro(s, 'rendimento ≥20% é o indicador da entrega E3.1 · 2,0 tCO₂e/t é o piso da E5.2',
    0.5, 5.16, 8.9, HAZE500, 'left', 6.5);
  micro(s, 'trl 04 → 07 · 30 meses · leito fluidizado circulante de três zonas',
    0.5, 5.34, 8.9, HAZE600, 'left', 6.5);
  edge(s, 'a linha térmica é o perfil de temperatura', 9.42, 0.42);
  s.addNotes('A banda de char é 20,25% da altura da banda de biomassa porque esse é o '
    + 'rendimento; a banda de remoção é o dobro da de char porque são 2,0 tCO2e/t. '
    + 'A geometria é o dado.');
}

/* ===========================================================================
   05 — CAPEX · MODE C
   Duas membranas dimensionadas pela proporção real dos work packages. Não é um
   gráfico: é a divisão do investimento desenhada como duas placas de larguras
   diferentes, com o aço que o dinheiro compra atrás delas.
   Membranas em y 3,45"–4,29"; WP1 de 0,50" a 2,19", WP2 de 2,23" a 6,44".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('05');
  micro(s, '04 / capex da poc', 0.5, 0.44, 3);
  head(s, 'O ativo físico e a engenharia\nque o produz.', 0.5, 0.86, 5.4, 26);

  big(s, '7,7', 0.42, 1.72, 3.0, 96, TEXT);
  s.addText('R$ M', { x: 2.16, y: 2.46, w: 1.2, h: 0.46, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 24, color: MINERAL, charSpacing: -0.4, valign: 'top' });
  micro(s, 'capex total da poc', 0.52, 3.12, 3.0, MINERAL);

  const wp = M.WP.filter(w => w[2] === 'CAPEX');
  const tot = wp.reduce((a, w) => a + w[1], 0);
  let x = 0.5;
  wp.forEach(([label, v, , wpc], i) => {
    const w = (v / tot) * 5.9 - (i ? 0.04 : 0);
    const xx = x + (i ? 0.04 : 0);
    micro(s, wpc, xx + 0.08, 3.54, 1.0, i ? MINERAL : HAZE600, 'left', 7);
    code(s, brlM(v) + ' M', xx + 0.08, 3.74, 1.4, TEXT, 'left', 11);
    micro(s, label.replace(/^WP\d — /, ''), xx + 0.08, 4.0, w - 0.16,
      i ? MINERAL : HAZE600, 'left', 6.2);
    x = xx + w;
  });
  metaRow(s, [
    ['por t de capacidade', brl(M.CAPEX_POC / M.PILOTO.charAno) + '/t'],
    ['precisão', 'AACE 4 · −30/+50%'],
    ['fronteira', 'WP1 + WP2'],
  ], 0.5, 4.52, 5.9);
  micro(s, 'a engenharia é capitalizada junto com o equipamento: num piloto ela não tem valor separável dele',
    0.5, 5.26, 8.9, HAZE500, 'left', 6.5);
  edge(s, 'finep economia circular · 30 meses', 9.42, 0.42);
  s.addNotes('CAPEX = WP1 (projeto) + WP2 (construção e montagem) = R$ 7,7 M dos R$ 15,0 M.');
}

/* ===========================================================================
   06 — OPEX DO PROJETO · MODE C
   Campo tipográfico sobre o fantasma do total. Duas bandas em proporção real:
   a de cima divide o dinheiro entre ativo e custeio, a de baixo diz quem paga.
   Bandas em y 3,60"–3,89" e 4,40"–4,53", de x 0,50" a 9,50".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('06');
  micro(s, '05 / opex do projeto', 0.5, 0.44, 3);
  head(s, 'O que se consome provando\no ativo, em 30 meses.', 0.5, 0.86, 5.2, 26);

  big(s, '7,3', 0.42, 1.80, 2.6, 96, TEXT);
  micro(s, 'R$ M · custeio', 0.52, 2.98, 2.6, MINERAL);
  big(s, '7,7', 2.62, 2.24, 1.9, 50, HAZE600);
  micro(s, 'R$ M · investimento', 2.68, 2.98, 2.2, HAZE600);
  code(s, brl(M.OPEX_POC / 30) + ' / mês', 6.9, 2.44, 2.6, TEXT, 'right', 13);
  micro(s, 'média ao longo dos 30 meses', 6.9, 2.70, 2.6, HAZE600, 'right');

  micro(s, 'capex · 51%', 0.58, 3.28, 2.0, HAZE600);
  micro(s, 'opex · 49%', 5.20, 3.28, 2.0, MINERAL);
  micro(s, 'subvenção finep · 85%', 0.58, 4.10, 3.0, CYAN6);
  code(s, brl(M.FINEP.subvencao), 0.58, 4.60, 2.2, TEXT, 'left', 9.5);
  micro(s, 'contrapartida · 15%', 8.23, 4.10, 1.27, HAZE600, 'right', 6.2);
  code(s, brl(M.FINEP.contrapartida), 8.23, 4.60, 1.27, HAZE600, 'right', 9);

  const opexWP = M.WP.filter(w => w[2] === 'OPEX');
  metaRow(s, [
    ['campanhas', brlM(opexWP[0][1]) + ' M'],
    ['caracterização', brlM(opexWP[1][1]) + ' M'],
    ['acv e carbono', brlM(opexWP[2][1]) + ' M'],
    ['eng. industrial', brlM(opexWP[3][1]) + ' M'],
  ], 0.5, 4.90, 8.9);
  micro(s, 'wp3 · wp4 · wp5 · wp6   ·   [DOC] proposta finep', 0.5, 5.36, 8.9, HAZE500, 'left', 6.2);
  s.addNotes('R$ 7,3 M de custeio sobre R$ 7,7 M de investimento, 85% via subvenção Finep.');
}

/* ===========================================================================
   07 — OPEX EM REGIME · MODE C
   O MECANISMO do baralho inteiro: custo/t = fixo/volume + variável. A curva
   mostra por que a POC não fecha e a escala fecha, sem precisar afirmá-lo.

   Deliberadamente sem linha de receita cruzando a curva: esta base de custo é
   [EST] e cruzaria por volta de 860 t, enquanto o solver do plano põe o
   breakeven pleno em 5.448 t com quinze salários de mercado. São bases de
   custo diferentes, e o quadro diz isso em vez de desenhar a contradição.
   Curva em x 1,30"–9,10"; marcas em 1,69" / 6,38" / 9,10".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('07');
  micro(s, '06 / opex em regime', 0.5, 0.44, 3);
  head(s, 'O piloto não se paga.\nE não deveria.', 5.3, 0.80, 4.2, 30);
  micro(s, 'custo por tonelada de char · r$/t', 0.5, 4.02, 3.4, HAZE600);

  const reads = [
    [0.5,  1.02, num(Math.round(M.OPEX_REGIME.porT)), 'POC · 810 t/ano', TEXT, 30, 'left'],
    [6.30, 2.52, num(1192), 'Módulo 1 · 4.700 t/ano', MINERAL7, 24, 'left'],
    [9.20, 2.86, num(907), 'grupo · 13.000 t/ano', HAZE600, 18, 'right'],
  ];
  reads.forEach(([x, y, v, label, color, size, align]) => {
    const xx = align === 'right' ? x - 2.4 : x;
    big(s, 'R$ ' + v, xx, y, 2.4, size, color, align);
    micro(s, label, xx, y + bigH(size) + 0.04, 2.4, color === TEXT ? MINERAL : HAZE600, align);
  });

  hair(s, 0.5, 4.16, 8.9, MINERAL, 55);
  micro(s, 'custo fixo', 0.5, 4.26, 1.2, MINERAL);
  code(s, brl(M.OPEX_REGIME.fixoAno) + '/ano', 1.7, 4.24, 1.7, TEXT, 'left', 9.5);
  micro(s, 'custo variável', 3.7, 4.26, 1.3, MINERAL);
  code(s, brl(M.OPEX_REGIME.varPorT) + '/t', 5.0, 4.24, 1.2, TEXT, 'left', 9.5);
  micro(s, 'o fixo não cai com a escala — é ele que a curva dilui',
    6.4, 4.26, 3.1, HAZE600, 'right', 6.5);

  s.addText('A escala é o destravamento, e a curva é a razão.', {
    x: 0.5, y: 4.60, w: 6.0, h: 0.34, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 15, color: TEXT, charSpacing: -0.4, valign: 'top' });

  hair(s, 0.5, 5.06, 8.9, HAZE600, 68);
  micro(s, 'curva sobre a base de custo [EST] do caso-base — sem linha de receita, porque cruzaria em ~860 t',
    0.5, 5.16, 8.9, HAZE500, 'left', 6.2);
  micro(s, 'os limiares do slide 08 vêm do solver do plano [DOC], com quinze salários plenos: outra base de custo',
    0.5, 5.34, 8.9, HAZE600, 'left', 6.2);
  s.addNotes('custo/t = fixo/volume + variável. Não cruzo receita com a curva porque esta '
    + 'base [EST] cruzaria em ~860 t e contradiria o breakeven [DOC] de 5.448 t, que usa '
    + 'uma estrutura de custo maior.');
}

/* ===========================================================================
   08 — UNIT ECONOMICS · CONSTRUÇÃO DE VALOR

   Duas barras, uma origem, uma escala. A receita é empilhada a partir dos três
   fluxos; o custo é desenhado ao lado dela e é MAIS LONGO. O quanto ele
   ultrapassa é o argumento inteiro do quadro.

   Cuidado contábil declarado: a margem de contribuição de R$ 763 [DOC] vem do
   cenário conservador do plano, com premissas de custo variável próprias. Ela
   NÃO é a diferença entre estas duas barras, e o quadro diz isso.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('08');
  micro(s, '07 / unit economics', 0.5, 0.44, 3);

  // NÍVEL 1 — a margem do plano, com a sua procedência colada nela.
  big(s, '763', 0.4, 1.62, 2.8, 92, TEXT);
  s.addText('R$ / t', { x: 0.56, y: 3.34, w: 1.6, h: 0.34, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 19, color: MINERAL, charSpacing: -0.3, valign: 'top' });
  hair(s, 0.52, 3.26, 2.2, MINERAL, 45);
  micro(s, 'margem de contribuição [DOC]', 0.52, 3.74, 3.0, MINERAL, 'left', 6.5);
  micro(s, 'cenário do plano · câmbio ' + num(M.CAMBIO, 2),
    0.52, 3.92, 3.0, HAZE600, 'left', 6.5);

  // A regra de governança do sistema, sobre a barra que ela governa.
  micro(s, 'regra do carbono único · o mesmo quilo nunca é vendido duas vezes',
    3.2, 1.06, 6.1, MINERAL, 'left', 6.5);

  // NÍVEL 2 — o mecanismo: como a receita é construída, e por onde o custo passa.
  micro(s, 'receita bruta / t', 3.2, 1.36, 2.2, HAZE600);
  code(s, brl(M.UNIT.receitaBrutaPorT), 6.9, 1.32, 2.2, TEXT, 'right', 11);

  const segs = [
    [3.2,  1.76, 'carbono', brl(M.UNIT.corcPorTChar)],
    [4.98, 2.4,  'material', brl(M.UNIT.contratoBPorT)],
    [8.42, 1.0,  'gate fee', brl(M.UNIT.gateFeePorTChar)],
  ];
  segs.forEach(([x, w, name, v]) => {
    micro(s, name, x, 2.08, w, MINERAL, 'left', 6.8);
    code(s, v, x, 2.26, w, TEXT, 'left', 9);
  });

  micro(s, 'custo pleno / t · a 810 t/ano', 3.2, 3.10, 2.8, HAZE600);
  code(s, brl(M.OPEX_REGIME.porT), 6.15, 3.08, 1.6, TEXT, 'right', 11);
  s.addText('−160', { x: 8.35, y: 3.06, w: 1.05, h: 0.3, isTextBox: true, margin: 0,
    fontFace: 'Courier New', fontSize: 13, color: FLARE, align: 'right', valign: 'top' });

  // A conclusão que os dois comprimentos já mostram.
  s.addText('POC ≠ unidade econômica.  A escala é o destravamento.', {
    x: 3.2, y: 3.80, w: 6.1, h: 0.34, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 15, color: TEXT, charSpacing: -0.4, valign: 'top' });

  // NÍVEL 3 — as camadas contábeis, declaradas em vez de misturadas.
  hair(s, 3.2, 4.36, 6.1, HAZE600, 66);
  micro(s, 'receita = três fluxos [DOC] somados · custo = OPEX pleno [EST], já com o fixo',
    3.2, 4.46, 6.2, HAZE500, 'left', 6.0);
  micro(s, 'a margem de R$ 763 é outra camada: líquida só de custos variáveis',
    3.2, 4.66, 6.2, HAZE600, 'left', 6.0);
  micro(s, 'poc biochar · petrolina', 0.5, 5.26, 4, HAZE500);
  s.addNotes('As duas barras partilham origem e escala, então o excesso do custo é lido '
    + 'como distância. A margem de R$ 763 é [DOC] e pertence a outra camada contábil — '
    + 'o slide diz isso em vez de sugerir que uma deriva da outra.');
}

/* ===========================================================================
   09 — BREAKEVEN · QUATRO LIMIARES NUMA ESCALA

   Os quatro números estão posicionados POR VALOR num eixo comum, então a
   distância entre eles é legível. Os dois vãos que importam são aritmética
   sobre valores [DOC], não afirmações novas:
     Módulo 1 → breakeven pleno   = o que falta
     breakeven → sem gate fee     = o que a destinação vale
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('09');
  micro(s, '08 / breakeven', 0.5, 0.44, 3);
  head(s, 'O solver diz exatamente\no que precisa ser verdade.', 0.5, 0.88, 4.4, 26);

  const B = M.BREAKEVEN;
  const lo = 3500, hi = 7100;
  const at = v => 0.75 + ((v - lo) / (hi - lo)) * 8.5;
  const BASE = 2.60;                       // todos os numerais partilham a base

  const marks = [
    [B.caixa,             26, HAZE600,  'caixa',        'com subvenções de custeio'],
    [B.capacidadeModulo1, 30, MINERAL7, 'módulo 1',     'CAPEX de ' + brlM(B.capexModulo1) + ' M'],
    [B.ebitdaZero,        38, TEXT,     'mercado pleno','EBITDA = 0 em 2028'],
    [B.semGateFee,        22, FLARE,    'sem gate fee', 'se a destinação não fechar'],
  ];
  marks.forEach(([v, size, color, label, note], i) => {
    const x = at(v);
    big(s, num(v), x - 1.15, BASE - bigH(size), 2.3, size, color, 'center');
    // Alternado em duas alturas: os nós distam 1,77" e um rótulo completo não
    // caberia numa linha só sem encostar no vizinho.
    const y = i % 2 ? 3.62 : 3.38;
    micro(s, label, x - 0.8, y, 1.6, color === FLARE ? FLARE : MINERAL, 'center');
    micro(s, note, x - 1.15, y + 0.17, 2.3, HAZE600, 'center', 6.2);
  });
  micro(s, 'toneladas de biochar por ano', 0.5, 2.88, 2.4, HAZE500);

  // NÍVEL 3 — os dois vãos, lidos da própria escala.
  const gapFalta = B.ebitdaZero - B.capacidadeModulo1;
  const gapFee   = B.semGateFee - B.ebitdaZero;
  hair(s, 0.5, 4.36, 8.9, MINERAL, 55);
  micro(s, 'o vão', 0.5, 4.46, 1.2, FLARE);
  code(s, num(gapFalta) + ' t', 1.7, 4.44, 1.0, FLARE, 'left', 10);
  body(s, 'o Módulo 1 sozinho não alcança o breakeven a mercado pleno — a Planta 1 existe por isso',
    2.9, 4.44, 6.4, 0.3, GRAPH, 9);
  hair(s, 0.5, 4.84, 8.9, MINERAL, 66);
  micro(s, 'a destinação', 0.5, 4.94, 1.2, MINERAL);
  code(s, num(gapFee) + ' t', 1.7, 4.92, 1.0, MINERAL, 'left', 10);
  body(s, 'é quanto o contrato com a PepsiCo vale em toneladas de breakeven evitadas',
    2.9, 4.92, 6.4, 0.3, GRAPH, 9);
  micro(s, 'poc biochar · petrolina', 0.5, 5.34, 4, HAZE500);
  s.addNotes('Os quatro limiares estão em escala. Os dois vãos são subtrações sobre '
    + 'números [DOC]: 5.448 − 4.700 = 748 t, e 6.942 − 5.448 = 1.494 t.');
}

/* ===========================================================================
   10 — ESCALA · MODE A
   Infraestrutura crescendo, não uma curva genérica: quatro membranas
   dimensionadas pela capacidade de cada fase, com a trajetória luminosa atrás
   como camada secundária. Bases alinhadas em y 4,39"; esquerdas em 0,50" /
   2,90" / 5,30" / 7,70".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('10');
  micro(s, '09 / escala', 0.5, 0.44, 3);
  head(s, 'De um reator\na uma rede.', 0.5, 0.86, 3.4, 30);

  const nodes = [
    [0.5, '2027', 'POC',      '810',   't char/ano',     20, HAZE600,  'reator piloto'],
    [2.9, '2028', 'Módulo 1', '4,7 K', 't char/ano',     24, MINERAL7, 'primeiro módulo'],
    [5.3, '2029', 'Planta 1', '20 K',  't biomassa/ano', 28, MINERAL,  'planta industrial'],
    [7.7, '2031', 'Planta 2', '40 K',  't biomassa/ano', 34, TEXT,     'a rede começa'],
  ];
  nodes.forEach(([x, ano, nome, val, unit, size, color, kind]) => {
    micro(s, kind, x, 4.34, 2.0, color === TEXT ? MINERAL : HAZE500, 'left', 6.2);
    hair(s, x, 4.52, 2.0, color === TEXT ? MINERAL : HAZE600, 55);
    code(s, ano, x, 4.60, 0.8, color, 'left', 9);
    s.addText(nome, { x, y: 4.80, w: 2.0, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 11.5, color: TEXT, valign: 'top' });
    big(s, val, x, 4.98, 2.1, size, color);
  });
  micro(s, 'o breakeven do grupo fica em ~' + num(M.BREAKEVEN.grupo)
    + ' t/ano — por isso a segunda planta não é réplica, é o dobro',
    0.5, 1.96, 5.4, MINERAL, 'left', 6.8);
  micro(s, 'bndes fundo clima 6,5% + 1,3% a.a., carência de 60 meses · sudene 75% irpj · fne verde',
    0.5, 2.16, 5.4, HAZE600, 'left', 6.5);
  s.addNotes('Cada membrana está dimensionada pela capacidade da sua fase — a escala é '
    + 'física, não uma curva desenhada por cima.');
}

/* ===========================================================================
   11 — DISCIPLINA · ARQUITETURA DE GATES

   Não é uma linha do tempo. São cinco membranas atravessadas em sequência, e
   o que carrega o argumento é a DENSIDADE DE PARTÍCULAS de cada uma: ela cai
   a cada gate, porque cada gate fecha um risco. Em M15 a matéria está
   resolvida. Isso está no material, não numa legenda.

   Cada coluna diz três coisas, e é essa a estrutura que o resto do baralho
   herda: o que é PROVADO, o risco que FECHA, e o que aquilo DESTRAVA.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('11');
  s.addImage({ path: A + 'mark-light.png', x: 0.5, y: 0.42, w: 0.28, h: 0.28 });
  micro(s, '10 / disciplina · arquitetura de gates', 0.92, 0.47, 4, MINT);

  s.addText('Cada tonelada da POC compra\no que dinheiro não compra depois.', {
    x: 0.5, y: 0.9, w: 8.6, h: headH(34, 2), isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 34, color: MINT100, lineSpacing: 36, charSpacing: -0.9, valign: 'top' });

  /* [mês, domínio, o teste, risco fechado, o que destrava] — as três últimas
     colunas são a gramática que o deck inteiro passa a usar. */
  const gates = [
    ['M03', 'qualidade do carbono', 'H/Corg ≤ 0,40',   'permanência',              'Puro e EBC abertas'],
    ['M06', 'operabilidade',        'leito não aglomera',              'potássio do coco',         'operação contínua'],
    ['M09', 'integridade climática','CH₄ sob o teto',                  'fugitivas e spec da areia','crédito auditável'],
    ['M12', 'mercado',              'destinação assinada',             'feedstock e receita',      'CAPEX do Módulo 1'],
    ['M15', 'verificabilidade',     'facility audit',                  'MRV',                     'primeira emissão'],
  ];
  gates.forEach(([m, dom, test, risk, unlock], i) => {
    const x = 0.4 + i * 1.9, w = 1.75;
    code(s, m, x + 0.12, 2.74, 0.8, MINT, 'left', 10);
    micro(s, dom, x + 0.12, 2.96, w - 0.2, HAZE300, 'left', 6.2);
    s.addText(test, { x: x + 0.12, y: 3.16, w: w - 0.24, h: 0.5, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 11, color: MINT100, lineSpacing: 13, valign: 'top' });

    hair(s, x + 0.12, 3.66, w - 0.24, MINT, 62);
    micro(s, 'risco fechado', x + 0.12, 3.74, w - 0.24, HAZE300, 'left', 6);
    s.addText(risk, { x: x + 0.12, y: 3.90, w: w - 0.24, h: 0.4, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 8.5, color: MINT, lineSpacing: 10, valign: 'top' });

    hair(s, x + 0.12, 4.32, w - 0.24, MINT, 62);
    micro(s, 'destrava', x + 0.12, 4.40, w - 0.24, MINT, 'left', 6);
    s.addText(unlock, { x: x + 0.12, y: 4.56, w: w - 0.24, h: 0.4, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 8.5, color: MINT100, lineSpacing: 10, valign: 'top' });
  });

  // A chave de leitura da chapa. Sem ela, a codificação fica invisível.
  micro(s, 'a densidade de cada membrana cai à medida que o risco fecha — em M15 a matéria está resolvida',
    0.5, 5.22, 8.6, MINT, 'left', 6.8);
  s.addNotes('Cinco barreiras técnicas atravessadas, não cinco marcos numa linha. '
    + 'A densidade de partículas de cada membrana codifica a incerteza restante.');
}

/* ===========================================================================
   12 — FINANCIAMENTO · MODE A
   Volta inteiramente para a luz, e mais clara que a capa. O campo de poros
   aparece uma última vez quase totalmente resolvido — o eco do slide 11,
   depois que todos os gates fecharam. Deve ler como abertura, não como fim.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('12');
  micro(s, '11 / financiamento', 0.5, 0.44, 3);
  head(s, 'Não-dilutivo primeiro.\nEquity com marco provado.', 0.5, 0.86, 5.6, 32);

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

  micro(s, 'os cinco gates fecham a incerteza; o capital segue cada um deles',
    0.5, 4.72, 5.4, MINERAL, 'left', 6.8);
  micro(s, 'valores [EST] com precisão AACE classe 4 (−30% / +50%) · valores [DOC] lidos da '
    + 'proposta Finep e do plano da POC', 0.5, 5.26, 8.2, HAZE500, 'left', 6.8);
  s.addNotes('Fecha na luz. O campo de poros da chapa está quase resolvido — o eco visual '
    + 'do slide 11 depois de todos os gates.');
}

pres.writeFile({ fileName: 'poc-biochar-capex-opex.pptx' })
  .then(f => console.log('escrito:', f));
