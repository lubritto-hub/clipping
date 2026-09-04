/* ===========================================================================
   PROPOSTA PEPSICO / PETROLINA, BIOCHAR
   Formato largo: 13,333" × 7,5".

   O conteúdo é o do arquivo de origem. O que mudou é a execução, em quatro
   frentes:

   1. FOTOGRAFIA COM FADE DE VERDADE. As quatro fotos do arquivo original
      entram inteiras, mascaradas com uma curva de nove paradas, e somem
      dentro do quadro em vez de terminarem numa aresta. Isso não é possível
      em pptxgenjs, não há máscara nem degradê, então a fotografia mora na
      chapa, composta no navegador, e só o texto fica vivo aqui.

   2. TOM. Preto, prata, marrom escuro, verde e branco. Verde nunca é campo
      grande: aparece em número, ícone, pílula e numa única faixa no baralho
      inteiro, a do próximo passo.

   3. CAIXA DE SENTENÇA nas manchetes. Versal em frase de oito palavras
      apaga a silhueta das palavras e custa velocidade de leitura.

   4. RITMO CLARO/ESCURO. Cinco quadros escuros e dois brancos, e os brancos
      caem onde o assunto é econômico, não por alternância decorativa.
   =========================================================================== */

const pptxgen = require('pptxgenjs');
const P = require('./proposta.js');
const A = '/home/user/clipping/design-system/.preview/deck-assets/';

/* --- Paleta. Sem '#': pptxgenjs corrompe o arquivo com ele. -------------- */
const PRETO  = '0C0C0B';
const CARVAO = '17181A';
const PRATA  = 'AEB7B9';
const VERDE  = '8FB04E';
const MATA   = '1E3320';
const MARROM = '4A3320';
const BRANCO = 'FFFFFF';
const CREME  = 'F2EEE3';
const CINZA  = '7C837D';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';               // 13,333" × 7,5"
pres.author = 'RECICLAR, EPA';
pres.title  = 'Proposta PepsiCo Petrolina, Biochar';

/* --- A grade -------------------------------------------------------------
   Margem de 0,72", que é a mesma proporção de recuo do baralho de 10". */
const M = 0.72, LARG = 13.333, DIR = LARG - M;

/* ===========================================================================
   PRIMITIVAS
   =========================================================================== */

const bloco = (s, x, y, w, h, fill, radius = 0.04) =>
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: radius,
    fill: { color: fill }, line: { color: fill, width: 0 } });

function pilula(s, t, x, y, w, fill, colour, size = 9) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.32, rectRadius: 0.5,
    fill: { color: fill }, line: { color: fill, width: 0 } });
  s.addText(String(t).toUpperCase(), { x, y, w, h: 0.32, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: size, bold: true, charSpacing: 1.4,
    color: colour, align: 'center', valign: 'middle' });
}

/** MANCHETE, caixa de sentença, bold, tracking fechado. */
const tituloH = (size, lines) => (size * 1.06 * lines) / 72;
const titulo = (s, t, x, y, w, size, colour) =>
  s.addText(t, { x, y, w, h: tituloH(size, String(t).split('\n').length), isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: size, bold: true, color: colour,
    lineSpacing: size * 1.06, charSpacing: -1.2, valign: 'top' });

const corpo = (s, t, x, y, w, h, colour = CREME, size = 12) =>
  s.addText(t, { x, y, w, h, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color: colour, lineSpacing: size * 1.5, valign: 'top' });

const rotulo = (s, t, x, y, w, colour, align = 'left', size = 11) =>
  s.addText(String(t), { x, y, w, h: 0.26, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color: colour, align, valign: 'middle' });

const micro = (s, t, x, y, w, colour, align = 'left', size = 8) =>
  s.addText(String(t).toUpperCase(), { x, y, w, h: 0.2, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: size, charSpacing: 1.8, color: colour, align,
    valign: 'middle' });

/** FIO DE PRATA, estrutural, nunca decorativo. */
const fio = (s, x, y, w, transparency = 50) =>
  s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.011,
    fill: { color: PRATA, transparency } });

const ICO = 0.32;
const icone = (s, name, x, y, tone = 'steel', size = ICO) =>
  s.addImage({ path: `${A}ico/${name}-${tone}.png`, x, y, w: size, h: size });

function disco(s, name, cx, cy, r, fill, tone) {
  s.addShape(pres.ShapeType.ellipse, { x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: fill }, line: { color: fill, width: 0 } });
  icone(s, name, cx - r * 0.55, cy - r * 0.55, tone, r * 1.1);
}

/** CABEÇALHO E RODAPÉ, idênticos nos sete quadros, como no original. */
function moldura(s, n, escuro = true) {
  const c = escuro ? CINZA : MARROM;
  micro(s, `${P.MARCA.cliente}  /  ${P.MARCA.linha}`, M, 0.42, 4.2, c);
  micro(s, P.MARCA.ressalva, 5.1, 0.42, 6.9, c, 'right', 7.5);
  micro(s, n, DIR - 0.6, 0.42, 0.6, escuro ? PRATA : MATA, 'right', 9);
}

/** Um GIF animado. O PowerPoint anima GIF em modo apresentação, então a
    transformação roda sozinha na tela e continua sendo uma imagem única no
    arquivo, sem depender de animação de slide nem de vídeo embutido. */
const gif = (s, nome, x, y, w, h) =>
  s.addImage({ path: `${A}${nome}.gif`, x, y, w, h });

const chapa = n => ({ path: A + `pr-${n}.jpg` });

/* ===========================================================================
   01, CAPA
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('01');
  moldura(s, '01');

  pilula(s, 'Petrolina / PE', M, 1.18, 1.9, VERDE, PRETO);
  titulo(s, P.CAPA.titulo, M, 1.94, 6.6, 44, BRANCO);
  corpo(s, P.CAPA.sub, M, 4.36, 5.4, 0.9, CREME, 13);

  // A régua de prata volta aqui, onde a posição do texto é conhecida.
  fio(s, M, 5.86, 5.0, 58);
  P.CAPA.eixos.forEach((t, i) => {
    const x = M + i * 1.6;
    micro(s, t, x, 6.06, 1.5, VERDE, 'left', 9);
  });

  s.addNotes('Abertura. A biomassa de coco já existe na unidade; a proposta é uma rota '
    + 'tecnológica que combina biochar, energia recuperável e carbono durável. '
    + 'Conceito para discussão, a configuração é a validar.');
}

/* ===========================================================================
   02, O PROCESSO
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('02');
  moldura(s, '02');

  titulo(s, P.PROCESSO.titulo, M, 1.06, 6.1, 30, BRANCO);
  corpo(s, P.PROCESSO.sub, M, 2.42, 5.8, 0.9, CREME, 12);

  // A transformação, rodando. É a casca do cliente virando o char do cliente:
  // as duas fotografias do arquivo original, com a frente térmica no meio.
  gif(s, 'coco-biochar', 6.9, 1.06, 5.71, 3.21);
  s.addShape(pres.ShapeType.rect, { x: 6.9, y: 1.06, w: 5.71, h: 3.21,
    fill: { type: 'none' }, line: { color: PRATA, width: 0.75, transparency: 55 } });
  micro(s, 'casca de coco  →  biochar', 6.9, 4.36, 3.4, PRATA, 'left', 8);

  // A cadeia. Três blocos e o circuito de calor por baixo.
  P.PROCESSO.etapas.forEach(([idx, nome, qualif, nota, ic], i) => {
    const x = M + i * 4.06, w = 3.72;
    bloco(s, x, 4.72, w, 1.74, CARVAO, 0.06);
    disco(s, ic, x + 0.52, 5.18, 0.3, i === 2 ? VERDE : MATA, i === 2 ? 'dark' : 'acid');
    rotulo(s, idx, x + 1.02, 5.06, 0.5, VERDE, 'left', 12);
    s.addText(nome, { x: x + 0.28, y: 5.56, w: w - 0.56, h: 0.3, isTextBox: true,
      margin: 0, fontFace: 'Arial', fontSize: 15, bold: true, color: BRANCO,
      charSpacing: -0.4, valign: 'top' });
    rotulo(s, qualif, x + 0.28, 5.88, w - 0.56, VERDE, 'left', 12);
    rotulo(s, nota, x + 0.28, 6.14, w - 0.56, PRATA, 'left', 11);
  });

  fio(s, M, 6.72, 11.89, 58);
  icone(s, 'gases', M, 6.84, 'acid', 0.28);
  micro(s, `${P.PROCESSO.circuito[0]}  →  ${P.PROCESSO.circuito[1]}`,
    M + 0.4, 6.93, 5.0, VERDE, 'left', 9);
  P.PROCESSO.saidas.forEach(([t, ic], i) => {
    const x = 6.95 + i * 1.92;
    icone(s, ic, x, 6.84, 'acid', 0.26);
    micro(s, t, x + 0.32, 6.93, 1.78, CREME, 'left', 7.5);
  });

  s.addNotes('Entra biomassa de coco, acontece conversão térmica com oxigênio limitado, '
    + 'sai biochar. Os gases do processo voltam como calor. Três saídas: produto '
    + 'físico, eficiência e remoção de carbono.');
}

/* ===========================================================================
   03, INTEGRAÇÃO
   A foto ocupa a esquerda; os três itens ficam à direita, fora dela.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('03');
  moldura(s, '03');

  micro(s, P.INTEGRACAO.legenda, M, 7.04, 5.0, PRATA, 'left', 7.5);

  titulo(s, P.INTEGRACAO.titulo, 5.9, 1.06, 6.7, 27, BRANCO);

  P.INTEGRACAO.itens.forEach(([idx, nome, nota, ic], i) => {
    const y = 2.50 + i * 1.14;
    icone(s, ic, 5.9, y + 0.02, 'acid', 0.3);
    rotulo(s, idx, 6.34, y + 0.03, 0.5, VERDE, 'left', 11);
    s.addText(nome, { x: 6.86, y, w: 5.74, h: 0.28, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 14, bold: true, color: BRANCO,
      charSpacing: -0.3, valign: 'top' });
    corpo(s, nota, 6.86, y + 0.36, 5.6, 0.66, PRATA, 11.5);
    if (i < 2) fio(s, 5.9, y + 0.98, 6.7, 70);
  });

  micro(s, 'eixos de especificação', 5.9, 5.98, 4.0, PRATA, 'left', 8);
  fio(s, 5.9, 6.20, 6.7, 40);
  P.INTEGRACAO.eixos.forEach((t, i) => {
    const x = 5.9 + (i % 3) * 2.26, y = 6.30 + Math.floor(i / 3) * 0.28;
    micro(s, t, x, y, 2.2, i < 3 ? CREME : PRATA, 'left', 8.5);
  });

  bloco(s, 5.9, 6.90, 6.7, 0.5, MATA, 0.06);
  s.addText(P.INTEGRACAO.fecho, { x: 6.14, y: 6.90, w: 6.3, h: 0.5, isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: 13, bold: true, color: VERDE,
    charSpacing: -0.2, valign: 'middle' });

  s.addNotes('A eficiência vem da integração: matéria-prima local, energia em circuito '
    + 'e configuração sob medida. A imagem é ilustrativa, a tecnologia ainda será '
    + 'selecionada.');
}

/* ===========================================================================
   04, AS ALAVANCAS
   Quadro claro: o assunto é econômico.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('04');
  moldura(s, '04', false);

  titulo(s, P.ALAVANCAS.titulo, M, 1.06, 8.0, 32, MATA);
  corpo(s, P.ALAVANCAS.sub, M, 2.44, 6.6, 0.8, MARROM, 12);

  P.ALAVANCAS.itens.forEach(([idx, nome, nota, ic], i) => {
    const x = M + i * 3.02, w = 2.78;
    bloco(s, x, 3.36, w, 1.64, i === 3 ? MATA : 'F4F2EC', 0.06);
    icone(s, ic, x + 0.26, 3.6, i === 3 ? 'acid' : 'dark', 0.3);
    rotulo(s, idx, x + 0.7, 3.61, 0.5, i === 3 ? VERDE : MARROM, 'left', 11);
    s.addText(nome, { x: x + 0.26, y: 4.06, w: w - 0.52, h: 0.3, isTextBox: true,
      margin: 0, fontFace: 'Arial', fontSize: 15, bold: true,
      color: i === 3 ? BRANCO : MATA, charSpacing: -0.4, valign: 'top' });
    corpo(s, nota, x + 0.26, 4.44, w - 0.52, 0.52, i === 3 ? PRATA : MARROM, 11);
  });

  micro(s, 'robustez econômica', M, 5.30, 4.0, MARROM, 'left', 8.5);
  corpo(s, P.ALAVANCAS.robustez, M, 5.56, 7.6, 0.7, MATA, 12);

  bloco(s, 8.6, 5.24, 4.01, 1.1, MATA, 0.06);
  s.addText(P.ALAVANCAS.fecho, { x: 8.86, y: 5.24, w: 3.5, h: 1.1, isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: 14, bold: true, color: VERDE,
    lineSpacing: 19, charSpacing: -0.3, valign: 'middle' });

  s.addNotes('O valor não vem de uma fonte só: fluxo atual, biochar, energia e carbono. '
    + 'O desenho mais eficiente captura o conjunto, e cada alavanca é validada com '
    + 'dados reais da unidade.');
}

/* ===========================================================================
   05, CARBONO DURÁVEL
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('05');
  moldura(s, '05');

  titulo(s, P.CARBONO.titulo, 6.4, 1.18, 6.2, 27, BRANCO);
  corpo(s, P.CARBONO.sub, 6.4, 2.5, 5.9, 0.8, CREME, 12);

  P.CARBONO.etapas.forEach(([idx, nome, nota, ic], i) => {
    const y = 3.52 + i * 0.84;
    disco(s, ic, 6.66, y + 0.2, 0.26, i === 3 ? VERDE : MATA, i === 3 ? 'dark' : 'acid');
    rotulo(s, idx, 7.1, y + 0.02, 0.5, VERDE, 'left', 10.5);
    s.addText(nome, { x: 7.62, y, w: 2.3, h: 0.28, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 13.5, bold: true, color: BRANCO,
      charSpacing: -0.3, valign: 'top' });
    rotulo(s, nota, 10.0, y + 0.02, 2.62, PRATA, 'left', 11);
    if (i < 3) fio(s, 6.4, y + 0.62, 6.2, 80);
  });

  micro(s, P.CARBONO.fecho, 6.4, 6.72, 6.2, VERDE, 'left', 8.5);

  s.addNotes('A biomassa capturou CO₂ ao crescer; a pirólise estabiliza parte desse '
    + 'carbono no biochar, que é aplicado num uso elegível. As emissões do ciclo são '
    + 'medidas e descontadas do resultado.');
}

/* ===========================================================================
   06, OS QUATRO DADOS
   Segundo quadro claro. A foto fica à direita; o conteúdo, à esquerda.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('06');
  moldura(s, '06', false);

  titulo(s, P.DADOS.titulo, M, 1.06, 6.2, 30, MATA);
  corpo(s, P.DADOS.sub, M, 2.34, 5.6, 0.5, MARROM, 12);

  P.DADOS.itens.forEach(([idx, nome, nota, ic], i) => {
    const y = 3.02 + i * 0.94;
    icone(s, ic, M, y + 0.02, 'dark', 0.3);
    rotulo(s, idx, M + 0.44, y + 0.03, 0.4, VERDE, 'left', 11);
    s.addText(nome, { x: M + 0.9, y, w: 5.6, h: 0.28, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 14, bold: true, color: MATA,
      charSpacing: -0.3, valign: 'top' });
    rotulo(s, nota, M + 0.9, y + 0.34, 5.6, MARROM, 'left', 11);
    if (i < 3) fio(s, M, y + 0.72, 6.7, 62);
  });

  bloco(s, M, 6.68, 6.7, 0.5, MATA, 0.06);
  micro(s, P.DADOS.saida, M + 0.24, 6.68, 6.3, VERDE, 'left', 9);

  s.addNotes('O dimensionamento começa pelo fluxo real: volume e sazonalidade, umidade '
    + 'e propriedades, destinação e economia atual, espaço e energia. A saída é escala, '
    + 'tecnologia, produto e economia.');
}

/* ===========================================================================
   07, O PRÓXIMO PASSO
   Duas colunas: o que entra e o que sai. E a única faixa verde do baralho.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('07');
  moldura(s, '07');

  titulo(s, P.PROXIMO.titulo, M, 1.06, 7.4, 30, BRANCO);
  corpo(s, P.PROXIMO.sub, M, 2.32, 6.4, 0.5, CREME, 12);

  micro(s, 'entradas para começar', M, 3.06, 4.0, VERDE, 'left', 8.5);
  P.PROXIMO.entradas.forEach(([idx, nome, nota, ic], i) => {
    const y = 3.42 + i * 0.86;
    icone(s, ic, M, y + 0.02, 'acid', 0.3);
    rotulo(s, idx, M + 0.44, y + 0.03, 0.4, VERDE, 'left', 11);
    s.addText(nome, { x: M + 0.9, y, w: 2.4, h: 0.28, isTextBox: true, margin: 0,
      fontFace: 'Arial', fontSize: 14, bold: true, color: BRANCO,
      charSpacing: -0.3, valign: 'top' });
    rotulo(s, nota, M + 3.3, y + 0.02, 3.3, PRATA, 'left', 11);
    if (i < 2) fio(s, M, y + 0.64, 6.0, 78);
  });

  bloco(s, 7.5, 3.06, 5.11, 2.72, CARVAO, 0.06);
  micro(s, 'case pronto para decisão', 7.78, 3.3, 4.5, VERDE, 'left', 8.5);
  P.PROXIMO.entrega.forEach((t, i) => {
    icone(s, 'registro', 7.78, 3.76 + i * 0.4, 'steel', 0.22);
    rotulo(s, t, 8.14, 3.79 + i * 0.4, 4.2, CREME, 'left', 11.5);
  });

  // A faixa do pedido. É a única área verde do baralho inteiro.
  bloco(s, M, 6.02, 11.89, 0.66, VERDE, 0.06);
  s.addText(P.PROXIMO.cta, { x: M + 0.26, y: 6.02, w: 11.4, h: 0.66, isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: 15, bold: true, color: PRETO,
    charSpacing: -0.3, valign: 'middle' });

  s.addNotes('Pedido único e objetivo: agendar a sessão técnica com Operações e '
    + 'Sustentabilidade. Com dados essenciais e uma amostra representativa, a saída é '
    + 'um case pronto para decisão.');
}

pres.writeFile({ fileName: 'deck/proposta-pepsico-petrolina.pptx' })
  .then(f => console.log('escrito:', f));
