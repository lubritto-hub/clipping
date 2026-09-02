/* ===========================================================================
   PEPSICO · PETROLINA — "POR QUE O COCO"

   Sete quadros, uma gramática. Ao contrário do baralho da venture, aqui a
   PADRONIZAÇÃO é o pedido: cada slide traz exatamente os mesmos três níveis,
   sempre nos mesmos lugares, para que a leitura seja previsível e a atenção
   sobre no conteúdo.

     NÍVEL 1 · o cabeçalho e a frase — o que se entende em dois segundos
     NÍVEL 2 · o mecanismo desenhado — por que aquilo é verdade
     NÍVEL 3 · a régua de evidência no pé — de onde vem, com a citação

   O que muda de slide para slide é a COMPOSIÇÃO do nível 2, nunca a estrutura.

   Duas regras de conteúdo que valem para o baralho inteiro:
   - Não há pedido, preço, TIR nem número da POC própria. Este deck mostra um
     porquê; o business case é outro documento.
   - Nada de [EST]. Só literatura, documento público da PepsiCo, ensaio da
     Embrapa e transação de mercado, cada um com a sua citação no pé.

   Registro: coco. Creme, casca, endocarpo, verde de palmeira. O azul-menta
   pertence à identidade da venture e não aparece aqui.

   ---------------------------------------------------------------------------
   A CAMADA DE ENGENHARIA

   Cada nível 2 é indexado por ÍCONES, e os ícones obedecem a uma regra: nada
   de folha, planeta ou símbolo de reciclagem. Cada um é uma coisa específica
   deste projeto — um endocarpo, um leito fluidizado de três zonas, uma muda de
   caju do ensaio da Embrapa. Um ícone que serviria para qualquer empresa de
   sustentabilidade não serve para esta.

   Todos vivem na MESMA caixa de 0,28", sempre alinhados pela esquerda com o
   texto que indexam, e mudam de cor conforme o que descrevem:
     palm   matéria viva e processo biológico
     husk   a casca e o que ainda é resíduo
     steel  equipamento — a prata é a cor da máquina
     dark   o produto e o registro
     light  o único quadro profundo

   E prata é ESTRUTURA, nunca preenchimento: os fios de separação são de aço,
   as marcas de cota estão nas chapas, e não existe nenhuma área prateada.
   =========================================================================== */

const pptxgen = require('pptxgenjs');
const P = require('./pepsico.js');
const A = '/home/user/clipping/design-system/.preview/deck-assets/';

/* --- Registro do coco. Sem '#': pptxgenjs corrompe o arquivo com ele. ----- */
const TEXT   = '2F3A26';   // verde-marrom profundo — o texto
const BODY   = '5C5B48';
const HUSK   = '8A7050';   // casca
const HUSK_L = 'A8875C';
const SHELL  = '3D2A1C';   // endocarpo, o mais escuro do baralho claro
const PALM   = '4D6640';   // verde de palmeira — a cor de instrumento
const PALM_L = '6D8F60';
const SAGE   = '93B183';
const EMBER  = 'B87A3C';   // o único quente: a pirólise
const COIR   = 'C9B48C';
const STEEL  = '7E8C90';   // aço escovado — só em estrutura, nunca em área
const LEAF   = 'D9E7C6';   // texto sobre o quadro profundo
const LEAF_D = 'A9C48F';

const num = (n, d = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';               // 10" × 5.625"
pres.author = 'RECICLAR · EPA';
pres.title  = 'PepsiCo Petrolina — por que o coco';

/* --- Primitivas ---------------------------------------------------------- */

const micro = (s, t, x, y, w, color = HUSK, align = 'left', size = 7.5) =>
  s.addText(String(t).toUpperCase(), { x, y, w, h: 0.17, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: size, charSpacing: 2.6, color, align, valign: 'middle' });

const code = (s, t, x, y, w, color = TEXT, align = 'left', size = 8.5) =>
  s.addText(String(t), { x, y, w, h: 0.19, isTextBox: true, margin: 0,
    fontFace: 'Courier New', fontSize: size, color, align, valign: 'middle' });

const hair = (s, x, y, w, color = HUSK, transparency = 58) =>
  s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.008, fill: { color, transparency } });

const headH = (size, lines) => (size * 1.06 * lines) / 72;
const head = (s, t, x, y, w, size = 34, color = TEXT) =>
  s.addText(t, { x, y, w, h: headH(size, String(t).split('\n').length), isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: size, color,
    lineSpacing: size * 1.06, charSpacing: -1, valign: 'top' });

const bigH = size => (size * 1.3) / 72;
const big = (s, t, x, y, w, size, color = TEXT, align = 'left') =>
  s.addText(t, { x, y, w, h: bigH(size), isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, align, charSpacing: size > 80 ? -3 : -1.6, valign: 'top' });

const body = (s, t, x, y, w, h, color = BODY, size = 10) =>
  s.addText(t, { x, y, w, h, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color, lineSpacing: size * 1.55, valign: 'top' });

/** Um ícone. Caixa fixa: o tamanho é o mesmo em todo o baralho, e é isso que
    faz vinte ícones lerem como um sistema em vez de vinte desenhos. */
const ICO = 0.28;
const icon = (s, name, x, y, tone = 'palm', size = ICO) =>
  s.addImage({ path: `${A}ico/${name}-${tone}.png`, x, y, w: size, h: size });

/** O fio de aço: a régua estrutural. Mais claro que o fio de casca, e usado
    onde a separação é de SISTEMA (entre etapas, entre colunas), não de assunto. */
const steel = (s, x, y, w, transparency = 46) =>
  s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.01, fill: { color: STEEL, transparency } });

const plate = n => ({ path: A + `pep-${n}.jpg` });

/** NÍVEL 1 — o cabeçalho, idêntico em todos os quadros. */
function header(s, idx, section, place = `${P.LOCAL.cidade} / ${P.LOCAL.uf}`, onDark = false) {
  micro(s, `${idx} · ${section}`, 0.5, 0.42, 5.4, onDark ? LEAF_D : PALM);
  micro(s, place, 6.3, 0.42, 3.2, onDark ? LEAF_D : HUSK, 'right');
}

/** NÍVEL 3 — a régua de evidência, sempre na mesma altura, sempre com fonte. */
function evidence(s, lines, onDark = false) {
  hair(s, 0.5, 5.06, 9.0, onDark ? LEAF_D : HUSK, onDark ? 62 : 68);
  lines.forEach((t, i) =>
    micro(s, t, 0.5, 5.16 + i * 0.18, 9.0, onDark ? LEAF_D : HUSK, 'left', 6.2));
}

/* ===========================================================================
   01 — CAPA
   A secção transversal do coco ocupa a direita, cortada pelo quadro. O
   palmeiral fica longe, na névoa quente. Zona de tipo: esquerda 5,2".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('01');
  header(s, 'CONCEPT / 01', 'PepsiCo · Petrolina', '');
  micro(s, P.LOCAL.coords, 0.5, 0.62, 4.2, HUSK, 'left', 6.5);

  head(s, 'Uma nova rota\npara o coco.', 0.5, 2.30, 4.8, 44);
  body(s, 'Por que a pirólise faz sentido para a biomassa de coco — e o que ela pode '
    + 'representar para Petrolina.', 0.5, 3.86, 4.4, 0.7, BODY, 11);

  // A cadeia inteira em três ícones: o que entra, o que sai, o que vale.
  steel(s, 0.5, 4.62, 4.4);
  [['coco', 'biomassa', 'husk', HUSK], ['char', 'biochar', 'dark', TEXT],
   ['registro', 'valor', 'palm', PALM]].forEach(([ic, label, tone, colour], i) => {
    const x = 0.5 + i * 1.52;
    icon(s, ic, x, 4.76, tone);
    micro(s, label, x + 0.36, 4.83, 1.1, colour);
    if (i < 2) micro(s, '→', x + 1.26, 4.83, 0.2, STEEL, 'center', 8);
  });
  evidence(s, ['este documento não é uma proposta comercial — é o porquê técnico e estratégico']);
  s.addNotes('Tese em uma frase: a casca de coco é uma biomassa naturalmente boa para '
    + 'pirólise, e o biochar conversa com o que a PepsiCo já decidiu. Não pedir nada — '
    + 'o deck mostra o porquê.');
}

/* ===========================================================================
   02 — PROCESSO
   Balanço de massa em proporção real: a banda de char tem 30% da altura da
   banda de casca porque esse É o rendimento de benchmark. A linha térmica
   sobe até a faixa de pirólise e volta.
   Bandas em y 2,42"–3,17" (casca) e 2,69"–2,91" (char); reator em 3,9"–5,5".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('02');
  header(s, '02 · PROCESS', 'biomass / pyrolysis / biochar');

  head(s, 'Do coco ao biochar.', 0.5, 0.84, 5.0, 34);
  micro(s, 'calor.  pouco oxigênio.  carbono estável.', 0.5, 1.52, 5.0, PALM);

  // NÍVEL 2 — a cadeia, com cada número na sua banda.
  micro(s, 'casca seca', 0.55, 2.14, 2.2, HUSK);
  big(s, '1 t', 0.52, 3.30, 1.6, 34, HUSK_L);

  code(s, `${P.PROCESSO.tempMin}–${P.PROCESSO.tempMax} °C`, 2.10, 1.82, 1.7, EMBER, 'right', 11);
  micro(s, 'pouco oxigênio', 2.10, 2.06, 1.7, PALM, 'right', 6.2);
  micro(s, 'biochar', 5.95, 2.30, 2.0, SHELL);
  big(s, `~${P.PROCESSO.rendimentoKgPorT} kg`, 5.92, 3.06, 2.4, 34, TEXT);
  micro(s, `−${P.PROCESSO.perdaMassa}% de massa`, 5.96, 3.80, 2.4, HUSK);

  // As cinco etapas, indexadas. É a única fila de ícones do baralho em que a
  // ordem importa, então ela é literalmente uma fila, sobre um fio de aço.
  steel(s, 0.5, 4.18, 9.0);
  const passos = [
    ['pilha', 'husk',  HUSK],   ['calor', 'steel', STEEL], ['reator', 'steel', STEEL],
    ['gases', 'steel', STEEL],  ['char',  'dark',  TEXT],
  ];
  P.ETAPAS.forEach(([nome, nota], i) => {
    const x = 0.5 + i * 1.80;
    const [ic, tone, colour] = passos[i];
    icon(s, ic, x, 4.28, tone);
    micro(s, nome, x + 0.36, 4.35, 1.4, colour);
    body(s, nota, x, 4.64, 1.68, 0.34, BODY, 7.5);
  });

  evidence(s, [
    'benchmark técnico para casca de coco em ensaios publicados — a validar com a biomassa da unidade',
    'a altura da banda de char é 30% da banda de casca porque esse é o rendimento; a proporção é o dado',
  ]);
  s.addNotes('Entra casca, acontece calor com pouco oxigênio (400–600 °C), sai biochar e '
    + 'energia. Os gases recirculam como calor. ~300 kg/t é benchmark de literatura para '
    + 'casca de coco, a validar com a biomassa da unidade.');
}

/* ===========================================================================
   03 — POR QUE O COCO
   A secção transversal é o argumento: o fruto é majoritariamente casca. As
   três propriedades ficam à esquerda, numa escada.
   Secção em x 5,4"–10,0".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('03');
  header(s, '03 · WHY COCONUT', 'caracterização de casca e fibra');

  head(s, 'A casca já nasce\npronta para isso.', 0.5, 0.84, 4.6, 34);
  body(s, 'Três propriedades da casca e da fibra fazem dela uma biomassa naturalmente '
    + 'boa para pirólise.', 0.5, 1.94, 4.2, 0.6, BODY, 10);

  // NÍVEL 2 — as três propriedades, em escada, com a leitura de cada uma.
  const props = [
    [2.66, `${P.COCO.ligninaMin}–${P.COCO.ligninaMax}%`, 'lignina',
     'Mais lignina, mais carbono fixo — e um char mais estável.', TEXT, 28, 'endocarpo', 'husk'],
    [3.52, `< ${P.COCO.cinzasMax}%`, 'cinzas',
     'Pouca cinza, biochar limpo e com alto teor de carbono.', PALM, 26, 'char', 'dark'],
    [4.38, `${P.COCO.fracaoCascaMin}–${P.COCO.fracaoCascaMax}%`, 'da massa do fruto',
     'O fruto é majoritariamente casca: biomassa abundante por natureza.', HUSK_L, 26, 'secao', 'husk'],
  ];
  props.forEach(([y, v, label, note, color, size, ic, tone]) => {
    steel(s, 0.5, y, 4.4);
    icon(s, ic, 0.5, y + 0.20, tone);
    big(s, v, 0.92, y + 0.10, 1.6, size, color);
    micro(s, label, 2.58, y + 0.16, 2.3, PALM);
    body(s, note, 2.58, y + 0.36, 2.32, 0.42, BODY, 8.5);
  });

  evidence(s, [
    `literatura técnica de caracterização · ${P.COCO.fonte}`,
    `umidade as-received de ${P.COCO.umidadeMin}–${P.COCO.umidadeMax}% é o desafio conhecido — secagem integrada com calor do processo`,
  ]);
  s.addNotes('Lignina alta e cinzas baixas favorecem rendimento e chars aromáticos '
    + 'estáveis. 80–85% da massa do fruto é resíduo. A secção transversal ao lado é o '
    + 'próprio argumento: o fruto é quase todo casca.');
}

/* ===========================================================================
   04 — OPERAÇÃO
   Duas massas na mesma escala: a área de cada quadrado é proporcional à massa,
   então a redução de 70% é lida como área e não como afirmação.
   Quadrados em 0,90"–2,40" (casca) e 5,60"–6,42" (char), base comum em 3,10".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('04');
  header(s, '04 · OPERATION', 'propriedades do material');

  head(s, 'Menos pilha.\nMais estabilidade.', 0.5, 0.84, 4.6, 34);

  // NÍVEL 2 — o antes e o depois, cada um com a sua natureza.
  icon(s, 'pilha', 0.9, 3.36, 'husk');
  steel(s, 0.9, 3.66, 2.4);
  micro(s, 'casca úmida', 0.9, 3.72, 2.2, HUSK);
  code(s, `${P.COCO.umidadeMin}–${P.COCO.umidadeMax}% de umidade`, 0.9, 3.94, 2.4, TEXT, 'left', 9.5);
  micro(s, 'perecível', 0.9, 4.20, 2.2, EMBER);
  body(s, 'Em pilha: chorume, odor e metano.', 0.9, 4.38, 2.4, 0.4, BODY, 9);

  icon(s, 'char', 5.6, 3.36, 'dark');
  steel(s, 5.6, 3.66, 2.4);
  micro(s, 'biochar', 5.6, 3.72, 2.2, SHELL);
  code(s, 'seco · inerte', 5.6, 3.94, 2.4, TEXT, 'left', 9.5);
  micro(s, 'séculos', 5.6, 4.20, 2.2, PALM);
  body(s, 'Carbono estável, sem decomposição.', 5.6, 4.38, 2.4, 0.4, BODY, 9);

  // A relação entre as duas áreas, dita uma vez.
  micro(s, `−${P.PROCESSO.perdaMassa}% de massa`, 2.55, 2.62, 2.9, HUSK, 'center');
  micro(s, 'a área de cada quadrado é a massa', 2.55, 2.80, 2.9, HUSK, 'center', 6.2);

  evidence(s, [
    'umidade e rendimento: literatura técnica para casca de coco',
    'metano em pilhas úmidas: metodologia Puro.earth (2025)',
  ]);
  s.addNotes('Falar das propriedades do material, não de como a unidade lida hoje. '
    + 'Casca úmida é volumosa e perecível; biochar é seco, ~30% da massa, inerte e '
    + 'estável por séculos — não vira passivo.');
}

/* ===========================================================================
   05 — ESTRATÉGIA
   O quadro mais estratégico do baralho: as metas que a PepsiCo já publicou,
   numa régua, e o ensaio local como a única evidência de campo.
   Régua em y 3,30", marcas em 2,1" / 4,5" / 6,9" / 9,3".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('05');
  header(s, '05 · STRATEGY', 'PEP+ · Climate Transition Plan 2025');

  head(s, 'Conversa com o que\na PepsiCo já decidiu.', 0.5, 0.80, 5.4, 34);
  body(s, 'Remoções de carbono geradas dentro da própria cadeia agrícola — o tipo de '
    + 'instrumento que o plano já admite.', 0.5, 1.86, 4.4, 0.46, BODY, 10);

  // NÍVEL 2 — as metas na régua, em ordem de proximidade com o coco.
  const metas = [
    [2.1, `−${P.PEPSICO.flagReducao}%`, 'escopo 3 agrícola',
     'FLAG · até 2030', TEXT, 26, 'solo', 'palm'],
    [4.5, `${P.PEPSICO.acresRegenerativos} mi`, 'acres regenerativos',
     `até 2030 · ${num(P.PEPSICO.acresEntregues, 1)} mi em 2024`, PALM, 24, 'palmeira', 'palm'],
    [6.8, `−${P.PEPSICO.escopo3EI}%`, 'escopo 3 · energia', 'até 2030 · base 2022',
     HUSK_L, 22, 'unidade', 'steel'],
    [9.5, `${P.PEPSICO.netZero}`, 'net-zero · SBTi', 'longo prazo', HUSK, 20, 'removal', 'dark'],
  ];
  metas.forEach(([x, v, label, note, color, size, ic, tone], i) => {
    const align = i === 3 ? 'right' : 'center';
    const w = i === 3 ? 1.7 : 2.0;
    const xx = align === 'right' ? x - w : x - w / 2;
    icon(s, ic, xx + w / 2 - ICO / 2, 2.42, tone);
    big(s, v, xx, 3.14 - bigH(size), w, size, color, align);
    micro(s, label, xx, 3.40, w, PALM, align, 6.2);
    micro(s, note, xx, 3.56, w, HUSK, align, 6.0);
  });

  // A evidência de campo — a única do baralho, e é daqui.
  steel(s, 0.5, 4.06, 9.0);
  icon(s, 'muda', 0.5, 4.30, 'palm');
  big(s, `+${P.EMBRAPA.delta} p.p.`, 0.92, 4.18, 2.4, 30, PALM);
  body(s, `sobrevivência de ${P.EMBRAPA.cultura} com biochar no Semiárido — `
    + `${P.EMBRAPA.sobrevivenciaSem}% → ${P.EMBRAPA.sobrevivenciaCom}%`,
    3.4, 4.26, 3.4, 0.5, TEXT, 9.5);
  micro(s, `ensaio ${P.EMBRAPA.local} · ${P.EMBRAPA.ano}`, 7.0, 4.28, 2.5, HUSK, 'right', 6.2);

  evidence(s, [
    `fonte: ${P.PEPSICO.fonte} · base ${P.PEPSICO.flagBase} · pepsico.com/esg`,
    'biochar no solo dos produtores da cadeia é prática regenerativa com resultado medido nesta região',
  ]);
  s.addNotes('Net-zero 2050 validado SBTi; 2030 vs 2022: Escopos 1+2 −50%, Escopo 3 E&I '
    + '−42%, FLAG −30%; 10 milhões de acres regenerativos até 2030 (3,5 mi até 2024). '
    + 'A PepsiCo declara comprar instrumentos gerados dentro da própria cadeia.');
}

/* ===========================================================================
   06 — VALOR
   Três estratos a partir de uma biomassa, cada um na sua temperatura: casca,
   carbono, verde. Estratos em y 0,84" / 2,25" / 3,66", x 4,4" / 3,9" / 4,8".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('06');
  header(s, '06 · VALUE', 'biochar · macro');

  head(s, '1 biomassa.\n3 caminhos\nde valor.', 0.5, 0.84, 3.4, 32);

  big(s, `${num(P.MERCADO.exomadMt, 2)} Mt`, 0.5, 2.56, 3.2, 38, TEXT);
  body(s, `de remoções de biochar contratadas pela Microsoft em ${P.MERCADO.exomadAnos} anos — `
    + 'o maior acordo do mundo', 0.5, 3.34, 3.2, 0.7, BODY, 9.5);
  icon(s, 'registro', 0.5, 4.00, 'husk');
  micro(s, `exomad green · ${P.MERCADO.exomadData} · ${P.MERCADO.registro}`,
    0.88, 4.07, 2.9, HUSK, 'left', 6.2);

  // NÍVEL 2 — os três caminhos, um por estrato.
  const rows = [[4.5, 0.94, 'pilha', 'husk'], [4.0, 2.35, 'bloco', 'dark'],
                [4.9, 3.76, 'removal', 'palm']];
  P.CAMINHOS.forEach(([idx, kind, name, note], i) => {
    const [x, y, ic, tone] = rows[i];
    icon(s, ic, x + 0.16, y - 0.04, tone);
    code(s, idx, x + 0.54, y, 0.4, PALM, 'left', 8.5);
    micro(s, kind, x + 0.98, y + 0.01, 1.6, PALM);
    s.addText(name, { x: x + 0.16, y: y + 0.30, w: 3.0, h: 0.26, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 12, color: TEXT, valign: 'top' });
    body(s, note, x + 0.16, y + 0.58, 4.4, 0.42, BODY, 8.5);
  });

  evidence(s, [
    'benchmarks de literatura e de mercado — a validar com a biomassa da unidade',
    `≈${num(P.PROCESSO.co2PorTMin, 1)}–${num(P.PROCESSO.co2PorTMax, 1)} t de CO₂ por t de biochar é faixa de literatura, não compromisso deste documento`,
  ]);
  s.addNotes('Mostrar por que vale investigar, sem preço nem TIR. Microsoft × Exomad '
    + 'Green: ≥1,24 Mt CO₂ em 10 anos (mai/2025), certificação Puro.earth, biochar '
    + 'entregue a produtores locais — o mesmo desenho de uma cadeia agroindustrial.');
}

/* ===========================================================================
   07 — O QUE PRECISA SER VERDADE
   O único quadro profundo, e em verde de mata. Três membranas atravessadas,
   com a densidade caindo — a mesma arquitetura de gates do outro baralho, no
   registro do coco. Membranas em x 0,60" / 3,60" / 6,60", y 2,14"–5,40".
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = plate('07');
  header(s, '07 · WHAT MUST BE TRUE', P.LOCAL.coords, P.LOCAL.coords, true);

  s.addText('O que precisa\nser verdade.', { x: 0.5, y: 0.76, w: 5.0, h: headH(38, 2),
    isTextBox: true, margin: 0, fontFace: 'Arial', fontSize: 38, color: LEAF,
    lineSpacing: 40, charSpacing: -1, valign: 'top' });
  micro(s, 'três condições — nenhuma delas é um pedido', 0.5, 1.92, 5.0, LEAF_D);

  const gateIcons = ['pilha', 'reator', 'solo'];
  P.CONDICOES.forEach(([idx, name, what, unlocks], i) => {
    const x = 0.6 + i * 3.0, w = 2.7;
    icon(s, gateIcons[i], x + 0.14, 2.46, 'light');
    code(s, idx, x + 0.54, 2.52, 0.5, LEAF_D, 'left', 10);
    s.addText(name, { x: x + 0.14, y: 2.72, w: w - 0.28, h: 0.28, isTextBox: true,
      margin: 0, fontFace: 'Arial', fontSize: 13, color: LEAF, valign: 'top' });
    body(s, what, x + 0.14, 3.04, w - 0.28, 0.56, LEAF_D, 9);

    steel(s, x + 0.14, 3.76, w - 0.28, 30);
    micro(s, 'se for verdade', x + 0.14, 3.84, w - 0.28, SAGE, 'left', 6);
    body(s, unlocks, x + 0.14, 4.02, w - 0.28, 0.48, LEAF, 9);
  });

  s.addText('Se isso for verdade, o coco tem uma segunda vida.', {
    x: 0.5, y: 4.64, w: 8.4, h: 0.34, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 16, color: LEAF, charSpacing: -0.4, valign: 'top' });
  evidence(s, ['a densidade de cada membrana cai à medida que a condição se resolve'], true);
  s.addNotes('Sem pedido. As três condições são a aderência dita de forma indireta — '
    + 'deixar o gerente reagir a cada uma. Se ele puxar o próximo passo: dados, amostra, '
    + 'teste, tecnologia, business case.');
}

pres.writeFile({ fileName: 'pepsico-petrolina-porque.pptx' })
  .then(f => console.log('escrito:', f));
