/* ===========================================================================
   POC BIOCHAR — PETROLINA · CAPEX E OPEX
   Construído sobre o sistema visual luminoso: as chapas de fundo são
   renderizadas do próprio CSS do design system, e não aproximadas aqui.
   =========================================================================== */

const pptxgen = require('pptxgenjs');
const M = require('./model.js');
const A = '/home/user/clipping/design-system/.preview/deck-assets/';

/* --- Paleta luminosa. Sem '#': pptxgenjs corrompe o arquivo com ele. ------ */
const PEARL   = 'FAFCFE';   // o chão
const WHITE   = 'FFFFFF';
const HAZE50  = 'F2F7FB';
const HAZE200 = 'D6E6F1';
const HAZE300 = 'BED7E9';
const HAZE500 = '7AA8C9';   // microtipografia
const HAZE600 = '5B8AAE';   // hairlines e rótulos
const TEXT    = '143743';   // petrol-900 — o único escuro numa página clara
const GRAPH   = '657779';   // corpo de texto
const MINERAL = '1F7370';   // a cor de instrumento
const MINERAL7= '175D5C';
const CYAN    = '35B0CA';   // o brilho
const CYAN6   = '1F92AB';
const MINT    = '97DCC7';
const NACRE   = 'C9B6E4';
const FLARE   = 'C9654A';   // o único sinal quente
const EARTH   = '6B5442';
const DEEP    = '12302A';   // a pontuação escura, uma vez em doze
const MINT100 = 'EEFAF5';

const brl  = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const brlM = n => 'R$ ' + (n / 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' M';
const num  = (n, d = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';               // 10" × 5.625"
pres.author = 'RECICLAR · EPA';
pres.title  = 'POC Biochar Petrolina — CAPEX e OPEX';
pres.subject = 'Estimativas de CAPEX e OPEX da prova de conceito';

/* --- Primitivas ----------------------------------------------------------
   Cada uma constrói um objeto de opções NOVO a cada chamada: pptxgenjs
   converte as opções para EMU no lugar, então um objeto compartilhado entre
   duas chamadas sai errado na segunda. */

const micro = (s, t, x, y, w, color = HAZE600, align = 'left') =>
  s.addText(String(t).toUpperCase(), {
    x, y, w, h: 0.2, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 7.5, charSpacing: 3, color, align, valign: 'middle' });

const hair = (s, x, y, w, color = HAZE600, transparency = 62) =>
  s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.007, fill: { color, transparency } });

const title = (s, t, x, y, w, color = TEXT, size = 25) =>
  s.addText(t, { x, y, w, h: 1.05, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, lineSpacing: size * 1.1, charSpacing: -0.6, valign: 'top' });

/* Um número protagonista é ancorado ao TOPO de uma caixa de exatamente uma
   linha, para que o rótulo abaixo nunca possa ser coberto pelos glifos. */
const bigNumH = size => (size * 1.32) / 72;
const bigNum = (s, t, x, y, w, size, color = TEXT, align = 'left') =>
  s.addText(t, { x, y, w, h: bigNumH(size), isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, align, charSpacing: -2, valign: 'top' });

const body = (s, t, x, y, w, h, color = GRAPH, size = 10.5) =>
  s.addText(t, { x, y, w, h, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, lineSpacing: size * 1.5, valign: 'top' });

const bg = f => ({ path: A + f });

const edgeTag = (s, t, color = HAZE500) =>
  s.addText(String(t).toUpperCase(), { x: 9.34, y: 0.44, w: 2.3, h: 0.2, isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: 7, charSpacing: 3, color, rotate: 90 });

const foot = (s, t = 'POC BIOCHAR · PETROLINA · CAPEX E OPEX', color = HAZE500) =>
  micro(s, t, 0.55, 5.24, 6, color);

/* Uma linha de especificação: rótulo minúsculo à esquerda, valor à direita,
   separados por uma hairline. Nunca uma caixa. */
function specRows(s, rows, x, y, w, o = {}) {
  const { rowH = 0.34, labelColor = HAZE600, valueColor = TEXT, accentIdx = -1,
          accentColor = MINERAL, size = 9.5 } = o;
  rows.forEach(([label, value], i) => {
    const yy = y + i * rowH;
    hair(s, x, yy, w);
    micro(s, label, x, yy + 0.06, w * 0.45, labelColor);
    s.addText(String(value), { x: x + w * 0.42, y: yy + 0.05, w: w * 0.58, h: 0.24,
      isTextBox: true, margin: 0, fontFace: 'Courier New', fontSize: size,
      color: i === accentIdx ? accentColor : valueColor, align: 'right', valign: 'middle' });
  });
  hair(s, x, y + rows.length * rowH, w);
}

/* ---------------------------------------------------------------------------
   01 — CAPA. Abre na luz. Tipo em baixo à esquerda, marca pequena em cima,
   e muito ar entre as duas.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-cove.jpg');
  // Sobre a chapa luminosa a marca é a versão escura. A clara existe para o
  // único quadro profundo do baralho.
  s.addImage({ path: A + 'mark-dark.png', x: 0.55, y: 0.44, w: 0.34, h: 0.34 });
  micro(s, 'POC · Petrolina · Pernambuco', 1.05, 0.5, 4, HAZE600);

  s.addText('transformando resíduo\nem impacto climático.', {
    x: 0.55, y: 2.75, w: 7.2, h: 1.5, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 33, color: TEXT, lineSpacing: 38, charSpacing: -1.1, valign: 'top' });

  hair(s, 0.55, 4.42, 4.4);
  micro(s, 'Estimativas de CAPEX e OPEX da prova de conceito', 0.55, 4.52, 6.5, GRAPH);
  micro(s, 'Reciclar · EPA/Bioecotec · União Soluções · UEL   ·   agosto 2026', 0.55, 4.78, 7, HAZE600);
  edgeTag(s, 'lat −9,3891 · long −40,5030');
  s.addNotes('Capa. O enquadramento abre na luz: nenhum slide escuro antes do slide 11. '
    + 'Números da POC: piloto de 500 kg/h, 810 t de biochar/ano, 1.620 tCO2e/ano.');
}

/* ---------------------------------------------------------------------------
   02 — A OPORTUNIDADE. Três números de mercado, tamanhos diferentes.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-bluehour.jpg');
  micro(s, '01 — a oportunidade', 0.55, 0.5, 4);
  title(s, 'Remoção durável é o mercado\ncom a demanda travada pela oferta.', 0.55, 0.95, 7.6, TEXT, 23);

  const items = [
    ['1,5 Mt', 'entregues no mundo até jun/26', 'contra 100 Mt/ano de demanda projetada já em 2030', 44],
    ['US$ 150', 'por tonelada de CO₂', 'referência de entrega do crédito de biochar', 34],
    ['34,6 Mt', 'compradas só pela Microsoft', '63% de todas as compras de CDR em 2024', 28],
  ];
  let x = 0.55;
  items.forEach(([n, unit, note, size], i) => {
    const w = i === 0 ? 3.4 : 2.6;
    bigNum(s, n, x, 2.35, w, size, i === 0 ? TEXT : MINERAL7);
    const yy = 2.35 + bigNumH(size) + 0.12;
    hair(s, x, yy, w - 0.35);
    micro(s, unit, x, yy + 0.1, w - 0.3, HAZE600);
    body(s, note, x, yy + 0.36, w - 0.35, 0.7, GRAPH, 9.5);
    x += w + 0.35;
  });
  foot(s);
  edgeTag(s, 'fontes: mckinsey · cdr.fyi · s&p global');
  s.addNotes('A oferta certificada é o gargalo, não a demanda. Microsoft sozinha contratou 34,6 Mt.');
}

/* ---------------------------------------------------------------------------
   03 — A TESE. Três colunas com hairlines, sem caixas.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-mineral.jpg');
  micro(s, '02 — a tese', 0.55, 0.5, 4);
  title(s, 'Um triângulo que ninguém fechou\nna América Latina.', 0.55, 0.95, 7.6, TEXT, 23);

  const cols = [
    ['01', 'Resíduo cativo',
     'A PepsiCo/Kero Coco processa ~120 mil t de coco por ano EM Petrolina — cerca de '
     + '100 mil t úmidas de casca na porta da fábrica. Um único contrato de destinação alimenta todas as fases.'],
    ['02', 'Tecnologia nacional',
     'Leito fluidizado circulante de três zonas (Finep, TRL 4→7): char fino por atrito, '
     + 'redução de potássio pelo leito e syngas queimado no riser — o risco de metano resolvido por projeto.'],
    ['03', 'Três receitas',
     'Destinação (gate fee) + material de construção + crédito de remoção. Regra do carbono único: '
     + 'o mesmo quilo nunca é vendido duas vezes.'],
  ];
  cols.forEach(([idx, name, text], i) => {
    const x = 0.55 + i * 3.05;
    hair(s, x, 2.42, 2.7, MINERAL, 40);
    micro(s, idx, x, 2.52, 1, MINERAL);
    s.addText(name, { x, y: 2.8, w: 2.7, h: 0.32, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 14, color: TEXT, charSpacing: -0.3, valign: 'top' });
    body(s, text, x, 3.22, 2.7, 1.7, GRAPH, 9.5);
  });
  foot(s);
  s.addNotes('O elo "produzir char de especificação para construção" está vazio na América Latina.');
}

/* ---------------------------------------------------------------------------
   04 — O PILOTO. Um numeral protagonista cortado pela margem esquerda.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-kiln.jpg');
  micro(s, '03 — o piloto', 0.55, 0.5, 4);

  bigNum(s, '810', 0.42, 1.45, 5.2, 118, TEXT);
  const yy = 1.45 + bigNumH(118) + 0.05;
  hair(s, 0.55, yy, 3.2);
  micro(s, 'toneladas de biochar por ano', 0.55, yy + 0.1, 4, GRAPH);
  micro(s, 'reator de leito fluidizado circulante · 500 kg/h de biomassa', 0.55, yy + 0.34, 5.2, HAZE600);

  specRows(s, [
    ['capacidade nominal', num(M.PILOTO.capacidadeKgH) + ' kg/h'],
    ['biomassa processada', num(M.PILOTO.biomassaAno) + ' t/ano'],
    ['rendimento em base seca', '≥ 20 %'],
    ['remoção líquida', num(M.PILOTO.co2eAno) + ' tCO₂e/ano'],
    ['prazo de execução', M.PILOTO.prazoMeses + ' meses'],
    ['TRL', '4 → 7'],
  ], 6.3, 1.65, 3.15, { accentIdx: 3 });
  foot(s);
  edgeTag(s, '2,0 tCO₂e por tonelada de char');
  s.addNotes('810 t/ano de char = 4.000 t de biomassa a ~20% de rendimento. '
    + 'A remoção líquida de 2,0 tCO2e/t é o indicador contratado da entrega E5.2.');
}

/* ---------------------------------------------------------------------------
   05 — CAPEX. O gráfico é nativo; a fronteira CAPEX/OPEX é declarada.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-mineral.jpg');
  micro(s, '04 — capex da poc', 0.55, 0.5, 4);
  title(s, 'CAPEX: o ativo físico e a engenharia\nque o produz.', 0.55, 0.95, 7, TEXT, 21);

  const capexWP = M.WP.filter(w => w[2] === 'CAPEX');
  s.addChart([{ type: pres.ChartType.bar, data: [{
      name: 'CAPEX', labels: capexWP.map(w => w[3]), values: capexWP.map(w => w[1] / 1e6) }] }], {
    x: 0.5, y: 2.15, w: 4.5, h: 1.9, barDir: 'bar', barGapWidthPct: 90,
    chartColors: [MINERAL, CYAN6],
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0"M"',
    dataLabelColor: TEXT, dataLabelFontFace: 'Arial', dataLabelFontSize: 10,
    showLegend: false, showTitle: false,
    catAxisLabelColor: HAZE600, catAxisLabelFontFace: 'Arial', catAxisLabelFontSize: 9,
    valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' },
    valAxisMaxVal: 7, plotArea: { fill: { color: 'FFFFFF', transparency: 100 } },
  });

  capexWP.forEach(([label, v], i) => {
    micro(s, label.replace(/^WP\d — /, ''), 0.55, 4.24 + i * 0.24, 4.6, GRAPH);
  });

  bigNum(s, brlM(M.CAPEX_POC), 5.65, 2.0, 4, 40, TEXT);
  const y2 = 2.0 + bigNumH(40) + 0.06;
  hair(s, 5.65, y2, 3.1);
  micro(s, 'CAPEX total da POC', 5.65, y2 + 0.1, 3.5, GRAPH);
  body(s, 'A engenharia básica e de detalhamento é capitalizada junto com o equipamento: '
    + 'num piloto ela não tem valor separável dele.', 5.65, y2 + 0.42, 3.4, 0.8, GRAPH, 9.5);
  specRows(s, [
    ['por t de capacidade', brl(M.CAPEX_POC / M.PILOTO.charAno) + '/t'],
    ['precisão', 'AACE classe 4  −30% / +50%'],
  ], 5.65, 4.06, 3.4);
  foot(s);
  s.addNotes('CAPEX = WP1 (projeto) + WP2 (construção e montagem) = R$ 7,7 M dos R$ 15,0 M do projeto.');
}

/* ---------------------------------------------------------------------------
   06 — OPEX DO PROJETO. Os 30 meses de custeio.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-condens.jpg');
  micro(s, '05 — opex do projeto', 0.55, 0.5, 4);
  title(s, 'OPEX do projeto: o que se consome\nprovando o ativo, em 30 meses.', 0.55, 0.95, 7.4, TEXT, 21);

  const opexWP = M.WP.filter(w => w[2] === 'OPEX');
  s.addChart([{ type: pres.ChartType.bar, data: [{
      name: 'OPEX', labels: opexWP.map(w => w[3]), values: opexWP.map(w => w[1] / 1e6) }] }], {
    x: 0.5, y: 2.15, w: 4.5, h: 2.0, barDir: 'bar', barGapWidthPct: 80,
    chartColors: [CYAN6, MINERAL],
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0"M"',
    dataLabelColor: TEXT, dataLabelFontFace: 'Arial', dataLabelFontSize: 10,
    showLegend: false, showTitle: false,
    catAxisLabelColor: HAZE600, catAxisLabelFontFace: 'Arial', catAxisLabelFontSize: 9,
    valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' },
    valAxisMaxVal: 3.2, plotArea: { fill: { color: 'FFFFFF', transparency: 100 } },
  });
  opexWP.forEach(([label], i) => {
    micro(s, label.replace(/^WP\d — /, ''), 0.55, 4.32 + i * 0.22, 4.6, GRAPH);
  });

  bigNum(s, brlM(M.OPEX_POC), 5.65, 2.0, 4, 40, TEXT);
  const y2 = 2.0 + bigNumH(40) + 0.06;
  hair(s, 5.65, y2, 3.1);
  micro(s, 'OPEX do projeto · 30 meses', 5.65, y2 + 0.1, 3.5, GRAPH);
  specRows(s, [
    ['média mensal', brl(M.OPEX_POC / 30) + '/mês'],
    ['CAPEX + OPEX', brlM(M.TOTAL_POC)],
    ['subvenção Finep · 85%', brlM(M.FINEP.subvencao)],
    ['contrapartida · 15%', brlM(M.FINEP.contrapartida)],
  ], 5.65, y2 + 0.42, 3.4, { accentIdx: 2 });
  foot(s);
  s.addNotes('Custeio: campanhas experimentais, caracterização e agronomia, ACV e carbono, '
    + 'e a engenharia da unidade industrial. 85% via subvenção Finep.');
}

/* ---------------------------------------------------------------------------
   07 — OPEX EM REGIME. Depois que o projeto acaba.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-mineral.jpg');
  micro(s, '06 — opex em regime', 0.55, 0.5, 4);
  title(s, 'Operar o piloto depois do projeto\ncusta R$ ' + num(M.OPEX_REGIME.porT) + ' por tonelada.',
    0.55, 0.95, 7.4, TEXT, 21);

  s.addChart([{ type: pres.ChartType.bar, data: [{
      name: 'OPEX',
      labels: M.OPEX_LINHAS.map(l => l[2]),
      values: M.OPEX_LINHAS.map(l => Math.round(l[1] / 1000)) }] }], {
    x: 0.5, y: 2.1, w: 4.9, h: 2.35, barDir: 'bar', barGapWidthPct: 70,
    chartColors: [MINERAL, CYAN6, HAZE500, MINERAL7, CYAN, HAZE600],
    varyColors: true,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0"k"',
    dataLabelColor: TEXT, dataLabelFontFace: 'Arial', dataLabelFontSize: 9,
    showLegend: false, showTitle: false,
    catAxisLabelColor: HAZE600, catAxisLabelFontFace: 'Arial', catAxisLabelFontSize: 9,
    valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' },
    valAxisMaxVal: 1150, plotArea: { fill: { color: 'FFFFFF', transparency: 100 } },
  });
  micro(s, 'R$ mil por ano · rateio [EST] sobre o total derivado do caso-base', 0.55, 4.56, 5.4, HAZE600);

  bigNum(s, brl(M.OPEX_REGIME.totalAno), 5.75, 1.95, 3.8, 26, TEXT);
  const y2 = 1.95 + bigNumH(26) + 0.06;
  hair(s, 5.75, y2, 3.05);
  micro(s, 'OPEX anual em regime, a 810 t/ano', 5.75, y2 + 0.1, 3.6, GRAPH);
  specRows(s, [
    ['custo fixo', brl(M.OPEX_REGIME.fixoAno) + '/ano'],
    ['custo variável', brl(M.OPEX_REGIME.varPorT) + '/t'],
    ['receita bruta', brl(M.UNIT.receitaBrutaPorT) + '/t'],
    ['resultado · 810 t', brl(M.UNIT.receitaBrutaPorT - M.OPEX_REGIME.porT) + '/t'],
  ], 5.75, y2 + 0.4, 3.05, { accentIdx: 3, accentColor: FLARE });
  body(s, 'O piloto não se paga — e não deveria. O custo fixo não cai com a escala, '
    + 'e é exatamente por isso que o Módulo 1 fecha a conta e a POC não.',
    5.75, 4.28, 3.4, 0.8, GRAPH, 9.5);
  foot(s);
  s.addNotes('Honestidade do slide: a R$ 3.336/t de OPEX contra R$ 3.177/t de receita bruta, '
    + 'o piloto opera no vermelho por tonelada. O breakeven aparece no slide seguinte.');
}

/* ---------------------------------------------------------------------------
   08 — UNIT ECONOMICS. Três receitas, uma margem.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-cove.jpg');
  micro(s, '07 — unit economics', 0.55, 0.5, 4);

  bigNum(s, brl(M.UNIT.margemContribuicaoPorT), 0.5, 1.15, 4.6, 64, TEXT);
  const yy = 1.15 + bigNumH(64) + 0.06;
  hair(s, 0.55, yy, 3.4);
  micro(s, 'de margem de contribuição por tonelada de char', 0.55, yy + 0.1, 4.5, GRAPH);
  micro(s, 'cenário conservador · câmbio ' + num(M.CAMBIO, 2), 0.55, yy + 0.34, 4.5, HAZE600);

  const linhas = [
    ['CORC', brl(M.UNIT.corcPorTChar) + '/t',
     'US$ ' + M.UNIT.corcUSD + '/tCO₂e, com 25% de desconto de offtake e 15% de comissão, sobre 2,0 tCO₂e líquidas'],
    ['Contrato B · claim/EPD', brl(M.UNIT.contratoBPorT) + '/t',
     'a fábrica fica com o carbono no EPD e não há CORC. Regra do carbono único embutida no preço'],
    ['Gate fee PepsiCo', brl(M.UNIT.gateFeePorTChar) + '/t',
     'R$ 38 por tonelada úmida × 4,8 t por tonelada de char — o feedstock-passivo paga antes do primeiro crédito'],
  ];
  linhas.forEach(([name, value, note], i) => {
    const y = 1.45 + i * 1.15;
    hair(s, 5.4, y, 4.05, MINERAL, 45);
    s.addText(name, { x: 5.4, y: y + 0.08, w: 2.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 12, color: TEXT, valign: 'top' });
    s.addText(value, { x: 7.7, y: y + 0.08, w: 1.75, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Courier New', fontSize: 12, color: MINERAL, align: 'right', valign: 'top' });
    body(s, note, 5.4, y + 0.42, 4.05, 0.62, GRAPH, 9);
  });
  foot(s);
  s.addNotes('As três receitas são independentes: a destinação paga antes do crédito, '
    + 'e o contrato B existe para o caso de a cimenteira reivindicar o carbono no próprio EPD.');
}

/* ---------------------------------------------------------------------------
   09 — BREAKEVEN. Três números, um deles rejeitado.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-bluehour.jpg');
  micro(s, '08 — breakeven', 0.55, 0.5, 4);
  title(s, 'O solver diz exatamente\no que precisa ser verdade.', 0.55, 0.95, 6.4, TEXT, 23);

  const bes = [
    [num(M.BREAKEVEN.ebitdaZero), 't por ano', 'para EBITDA = 0 em 2028, pagando mercado pleno para 15 pessoas', MINERAL7],
    [num(M.BREAKEVEN.capacidadeModulo1), 't de capacidade', 'do Módulo 1 — CAPEX de ' + brlM(M.BREAKEVEN.capexModulo1) + ' via FNE BNB e Finep', TEXT],
    [num(M.BREAKEVEN.caixa), 't por ano', 'para breakeven DE CAIXA com subvenções de custeio — rótulo honesto', HAZE600],
  ];
  bes.forEach(([n, unit, note, color], i) => {
    const x = 0.55 + i * 3.08;
    bigNum(s, n, x, 2.28, 2.9, 38, color);
    const y = 2.28 + bigNumH(38) + 0.08;
    hair(s, x, y, 2.7);
    micro(s, unit, x, y + 0.1, 2.7, GRAPH);
    body(s, note, x, y + 0.36, 2.7, 0.95, GRAPH, 9.5);
  });
  hair(s, 0.55, 4.7, 8.9, MINERAL, 40);
  body(s, 'Sem o contrato de destinação da PepsiCo o mínimo sobe para '
    + num(M.BREAKEVEN.semGateFee) + ' t — o gate fee vale cerca de 1.500 t de breakeven.',
    0.55, 4.8, 8.9, 0.35, TEXT, 10);
  foot(s);
  s.addNotes('4.700 t de capacidade contra 5.448 t de necessidade: o Módulo 1 sozinho não fecha '
    + 'a conta a mercado pleno. É por isso que a Planta 1 entra em 2029.');
}

/* ---------------------------------------------------------------------------
   10 — PLANO DE ESCALA.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-mineral.jpg');
  micro(s, '09 — plano de escala', 0.55, 0.5, 4);
  title(s, 'De 810 toneladas a um grupo\nque cruza o zero.', 0.55, 0.95, 6.4, TEXT, 23);

  M.ESCALA.forEach(([ano, nome, t, note], i) => {
    const x = 0.55 + i * 2.3;
    hair(s, x, 2.4, 2.05, MINERAL, 40);
    micro(s, ano, x, 2.5, 1.2, MINERAL);
    s.addText(nome, { x, y: 2.76, w: 2.05, h: 0.3, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 13, color: TEXT, valign: 'top' });
    s.addText(num(t), { x, y: 3.1, w: 2.05, h: 0.34, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 21, color: i === 0 ? MINERAL : TEXT,
      charSpacing: -0.8, valign: 'top' });
    micro(s, i < 2 ? 't de char/ano' : 't de biomassa/ano', x, 3.48, 2.05, HAZE600);
    body(s, note, x, 3.74, 2.05, 1.15, GRAPH, 8.5);
  });
  foot(s);
  s.addNotes('O breakeven do GRUPO fica em ~13 mil t/ano — por isso a Planta 2 é o dobro, não uma réplica.');
}

/* ---------------------------------------------------------------------------
   11 — OS GATES. O ÚNICO slide escuro do baralho. Ele funciona porque é o
   único: onze quadros luminosos antes dele.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-deep.jpg');
  micro(s, '10 — disciplina', 0.55, 0.5, 4, MINT);
  s.addText('Cada tonelada da POC compra\no que dinheiro não compra depois.', {
    x: 0.55, y: 0.95, w: 7.4, h: 1.0, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 23, color: MINT100, lineSpacing: 26, charSpacing: -0.6, valign: 'top' });

  M.GATES.forEach(([m, gate, note], i) => {
    const y = 2.42 + i * 0.55;
    hair(s, 0.55, y, 8.9, MINT, 68);
    s.addText(m, { x: 0.55, y: y + 0.09, w: 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Courier New', fontSize: 11, color: MINT, valign: 'top' });
    s.addText(gate.replace(/<\/?sub>/g, ''), { x: 1.3, y: y + 0.08, w: 4.9, h: 0.28,
      isTextBox: true, margin: 0, fontFace: 'Arial', fontSize: 11.5, color: MINT100, valign: 'top' });
    micro(s, note, 6.35, y + 0.12, 3.1, HAZE300, 'right');
  });
  foot(s, 'POC BIOCHAR · PETROLINA · CAPEX E OPEX', HAZE500);
  s.addNotes('Cinco gates binários. Nenhum deles é uma meta: cada um é uma condição para o degrau seguinte.');
}

/* ---------------------------------------------------------------------------
   12 — FINANCIAMENTO E PRÓXIMOS PASSOS. Volta para a luz.
   ------------------------------------------------------------------------- */
{
  const s = pres.addSlide();
  s.background = bg('bg-air-kiln.jpg');
  micro(s, '11 — financiamento', 0.55, 0.5, 4);
  title(s, 'Não-dilutivo primeiro.\nEquity com marco provado.', 0.55, 0.95, 6.4, TEXT, 23);

  specRows(s, [
    ['subvenção Finep · 85%', brlM(M.FINEP.subvencao)],
    ['contrapartida · 15%', brlM(M.FINEP.contrapartida)],
    ['CAPEX da POC', brlM(M.CAPEX_POC)],
    ['OPEX · 30 meses', brlM(M.OPEX_POC)],
    ['total da POC', brlM(M.TOTAL_POC)],
  ], 0.55, 2.35, 4.6, { accentIdx: 4 });

  micro(s, 'os próximos 90 dias', 5.6, 2.28, 4, MINERAL);
  const passos = [
    ['1', 'Finep Economia Circular protocolada'],
    ['2', 'Questionário de fornecedor → contrato de destinação PepsiCo'],
    ['3', 'Fábrica de blocos parceira + seed de R$ 2–3 M'],
  ];
  passos.forEach(([n, t], i) => {
    const y = 2.62 + i * 0.62;
    hair(s, 5.6, y, 3.85);
    s.addText(n, { x: 5.6, y: y + 0.1, w: 0.3, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Courier New', fontSize: 11, color: MINERAL, valign: 'top' });
    body(s, t, 6.0, y + 0.1, 3.45, 0.46, TEXT, 10);
  });

  hair(s, 0.55, 4.72, 8.9, MINERAL, 40);
  micro(s, 'Valores [EST] com precisão AACE classe 4 (−30% / +50%). '
    + 'Valores [DOC] lidos da proposta Finep e do plano da POC.', 0.55, 4.82, 8.9, HAZE600);
  foot(s);
  s.addNotes('Fecha na luz. A sequência de captação é grant → offtake parcial com dMRV → dívida/equity de infraestrutura.');
}

pres.writeFile({ fileName: 'poc-biochar-capex-opex.pptx' })
  .then(f => console.log('escrito:', f));
