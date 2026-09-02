const pptxgen = require('pptxgenjs');
const P = require('./pepsico.js');
const A = '/home/user/clipping/design-system/.preview/deck-assets/';

/* --- Paleta. Sem '#': pptxgenjs corrompe o arquivo com ele. --------------
   Preto, prata, marrom escuro, verde e branco. Duas regras a governam:

     1. O CAMPO É ESCURO. Cinco dos sete quadros têm chão preto; os dois
        brancos existem para dar respiração no meio do baralho.
     2. VERDE NUNCA É CAMPO GRANDE. Ele aparece em número, ícone e pílula, e
        preenche uma única faixa no baralho inteiro: a do próximo passo. É
        exatamente por isso que essa faixa é a coisa mais visível do deck.

   A prata é estrutural — fios e réguas — e o marrom vem quase todo da
   própria matéria fotografada, não de blocos pintados. */
const PRETO  = '0C0C0B';
const CARVAO = '1B1C1A';   // cartão sobre o preto: um degrau, não um salto
const PRATA  = 'AEB7B9';
const VERDE  = '8FB04E';   // o acento
const MATA   = '1E3320';
const MARROM = '4A3320';
const BRANCO = 'FFFFFF';
const CREME  = 'F2EEE3';
const CINZA  = '8B928C';   // procedência

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';               // 10" × 5.625"
pres.author = 'RECICLAR · EPA';
pres.title  = 'PepsiCo Petrolina — casca vira carbono';

const num = (n, d = 0) => n.toLocaleString('pt-BR',
  { minimumFractionDigits: d, maximumFractionDigits: d });

/* ===========================================================================
   PRIMITIVAS
   Seis, e o baralho inteiro é feito delas.
   =========================================================================== */

/** BLOCO — retângulo de canto arredondado, chapado. A unidade de construção. */
const bloco = (s, x, y, w, h, fill, radius = 0.05) =>
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: radius,
    fill: { color: fill }, line: { color: fill, width: 0 } });

/** PÍLULA — bloco baixo com rótulo dentro. O rótulo é sempre curto: se não
    couber em três palavras, não era uma pílula. */
function pilula(s, t, x, y, w, fill, colour, size = 9) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.30, rectRadius: 0.5,
    fill: { color: fill }, line: { color: fill, width: 0 } });
  s.addText(String(t).toUpperCase(), { x, y, w, h: 0.30, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: size, bold: true, charSpacing: 1.4,
    color: colour, align: 'center', valign: 'middle' });
}

/** NÚMERO — a peça mais pesada de qualquer quadro. Sempre bold, sempre com o
    tracking fechado, porque número grande com espaço largo lê como preço. */
const numH = size => (size * 1.16) / 72;
const numero = (s, t, x, y, w, size, colour, align = 'left') =>
  s.addText(t, { x, y, w, h: numH(size), isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, bold: true, color: colour, align, valign: 'top',
    charSpacing: size > 60 ? -3.4 : -1.8 });

/** MANCHETE — no máximo quatro palavras. */
const tituloH = (size, lines) => (size * 1.04 * lines) / 72;
const titulo = (s, t, x, y, w, size, colour) =>
  s.addText(t, { x, y, w, h: tituloH(size, String(t).split('\n').length), isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: size, bold: true, color: colour,
    lineSpacing: size * 1.04, charSpacing: -1.4, valign: 'top' });

/** RÓTULO — a única letra pequena do baralho. */
const rotulo = (s, t, x, y, w, colour, align = 'left', size = 9) =>
  s.addText(String(t), { x, y, w, h: 0.2, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: size, color: colour, align, valign: 'middle' });

/** ÍCONE — caixa fixa. Vinte ícones no mesmo tamanho leem como um sistema;
    vinte tamanhos leem como vinte desenhos. */
const ICO = 0.34;
const icone = (s, name, x, y, tone = 'dark', size = ICO) =>
  s.addImage({ path: `${A}ico/${name}-${tone}.png`, x, y, w: size, h: size });

/** ÍCONE EM DISCO — o ícone dentro de um círculo de cor. É como ele aparece
    quando indexa uma etapa, e não uma linha. */
function disco(s, name, cx, cy, r, fill, tone) {
  s.addShape(pres.ShapeType.ellipse, { x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: fill }, line: { color: fill, width: 0 } });
  icone(s, name, cx - r * 0.56, cy - r * 0.56, tone, r * 1.12);
}

/** FIO DE PRATA — a única linha do baralho. Estrutural, nunca decorativa. */
const fio = (s, x, y, w, transparency = 52) =>
  s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.01,
    fill: { color: PRATA, transparency } });

/** PROCEDÊNCIA — uma linha, no pé, e só uma. */
const fonte = (s, t, colour = CINZA) =>
  s.addText(String(t), { x: 0.55, y: 5.10, w: 8.9, h: 0.22, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 7.5, color: colour, valign: 'middle' });

const chapa = n => ({ path: A + `pep-${n}.jpg` });

/* ===========================================================================
   01 — CAPA
   O pátio ocupa o quadro inteiro, rebaixado quase ao preto. Quatro palavras.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('01');

  pilula(s, `${P.LOCAL.cidade} · ${P.LOCAL.uf}`, 0.55, 0.5, 1.8, VERDE, PRETO);

  titulo(s, 'Casca\nvira\ncarbono.', 0.55, 1.20, 5.2, 54, BRANCO);

  rotulo(s, 'Pirólise de casca de coco na unidade de Petrolina',
    0.55, 3.86, 4.6, CREME, 'left', 12);
  rotulo(s, 'RECICLAR · EPA', 0.55, 4.80, 3.0, PRATA, 'left', 8.5);

  s.addNotes('Tese em uma frase: a casca de coco é boa biomassa para pirólise, e o '
    + 'biochar conversa com metas que a PepsiCo já publicou. O deck termina num '
    + 'próximo passo objetivo — amostra, volume e destinação.');
}

/* ===========================================================================
   02 — A BIOMASSA
   O pátio em plano aberto à direita. À esquerda, o número da premissa.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('02');

  pilula(s, 'a biomassa', 0.55, 0.5, 1.5, VERDE, PRETO);
  titulo(s, 'A casca já\nestá no pátio.', 0.55, 1.02, 4.2, 38, BRANCO);

  bloco(s, 0.55, 2.32, 4.05, 1.5, CARVAO, 0.1);
  numero(s, `${P.COCO.fracaoCascaMin}–${P.COCO.fracaoCascaMax}%`, 0.85, 2.50, 3.5, 58, VERDE);
  icone(s, 'secao', 0.85, 3.34, 'steel', 0.28);
  rotulo(s, 'da massa do fruto é casca', 1.24, 3.38, 3.0, CREME, 'left', 11);

  bloco(s, 0.55, 3.98, 1.95, 0.72, MARROM, 0.1);
  numero(s, `${P.COCO.umidadeMin}–${P.COCO.umidadeMax}%`, 0.75, 4.06, 1.6, 24, CREME);
  rotulo(s, 'umidade', 0.75, 4.48, 1.6, PRATA, 'left', 8);

  bloco(s, 2.65, 3.98, 1.95, 0.72, CARVAO, 0.1);
  icone(s, 'pilha', 2.85, 4.08, 'steel', 0.28);
  rotulo(s, 'perecível em pilha', 2.85, 4.48, 1.7, PRATA, 'left', 8);

  fonte(s, `caracterização de casca e fibra · ${P.COCO.fonte}`);
  s.addNotes('80–85% da massa do fruto é casca. A biomassa já está no pátio, hoje, '
    + 'nesta quantidade. A umidade de 30–70% as-received é o desafio conhecido — '
    + 'secagem integrada com calor do próprio processo.');
}

/* ===========================================================================
   03 — O MATERIAL
   A secção grande à direita. Dois números, uma frase de leitura.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('03');

  pilula(s, 'o material', 0.55, 0.5, 1.5, VERDE, PRETO);
  titulo(s, 'Alta lignina.\nPouca cinza.', 0.55, 1.02, 4.6, 38, BRANCO);

  bloco(s, 0.55, 2.42, 2.0, 1.5, CARVAO, 0.1);
  icone(s, 'endocarpo', 0.75, 2.58, 'steel', 0.28);
  numero(s, `${P.COCO.ligninaMin}–${P.COCO.ligninaMax}%`, 0.75, 2.94, 1.7, 32, VERDE);
  rotulo(s, 'lignina', 0.75, 3.54, 1.6, PRATA, 'left', 9);

  bloco(s, 2.68, 2.42, 2.0, 1.5, CARVAO, 0.1);
  icone(s, 'char', 2.88, 2.58, 'steel', 0.28);
  numero(s, `< ${P.COCO.cinzasMax}%`, 2.88, 2.94, 1.7, 32, VERDE);
  rotulo(s, 'cinzas', 2.88, 3.54, 1.6, PRATA, 'left', 9);

  fio(s, 0.55, 4.20, 4.13, 40);
  rotulo(s, 'Mais carbono fixo, e um char mais limpo.',
    0.55, 4.38, 4.2, CREME, 'left', 11);

  fonte(s, `literatura técnica · ${P.COCO.fonte}`);
  s.addNotes('Lignina alta e cinzas baixas favorecem rendimento e chars aromáticos '
    + 'estáveis. A secção ao lado mostra o argumento: o fruto é quase todo casca.');
}

/* ===========================================================================
   04 — O PROCESSO
   A temperatura como número, cinco etapas sobre a régua de aço, e a matéria
   antes e depois nos dois painéis do pé.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('04');

  pilula(s, 'o processo', 0.55, 0.5, 1.5, VERDE, PRETO);
  titulo(s, 'Calor,\nsem oxigênio.', 0.55, 1.02, 4.4, 38, BRANCO);

  numero(s, `${P.PROCESSO.tempMin}–${P.PROCESSO.tempMax}`, 5.05, 0.94, 4.4, 56, VERDE, 'right');
  rotulo(s, 'graus celsius', 5.05, 1.92, 4.4, PRATA, 'right', 11);

  P.ETAPAS.forEach(([label, ic], i) => {
    const cx = 1.05 + i * 1.675;
    disco(s, ic, cx, 2.84, 0.31, i === 4 ? VERDE : CARVAO, i === 4 ? 'dark' : 'steel');
    rotulo(s, label, cx - 0.7, 3.30, 1.4, i === 4 ? VERDE : PRATA, 'center', 9);
  });

  numero(s, '1 t', 0.85, 3.94, 1.6, 30, CREME);
  rotulo(s, 'casca seca entra', 0.85, 4.50, 2.2, CREME, 'left', 9);
  numero(s, `~${P.PROCESSO.rendimentoKgPorT} kg`, 5.60, 3.94, 2.6, 30, VERDE);
  rotulo(s, 'biochar sai', 5.60, 4.50, 2.2, VERDE, 'left', 9);

  fonte(s, 'rendimento de benchmark de literatura para casca de coco — a validar com a biomassa da unidade');
  s.addNotes('Entra casca, acontece calor com pouco oxigênio (400–600 °C), sai '
    + 'biochar e energia. Os gases recirculam como calor. ~300 kg/t é benchmark de '
    + 'literatura, a validar com a biomassa da unidade.');
}

/* ===========================================================================
   05 — O PRODUTO
   O primeiro dos dois quadros brancos. O char sangra pela direita.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('05');

  pilula(s, 'o produto', 0.55, 0.5, 1.5, MATA, VERDE);
  titulo(s, 'Sólido,\nseco,\nestável.', 0.55, 1.02, 3.6, 36, MATA);

  numero(s, `−${P.PROCESSO.perdaMassa}%`, 0.55, 2.62, 3.6, 86, MATA);
  rotulo(s, 'de massa em relação à casca úmida', 0.55, 4.02, 3.8, MARROM, 'left', 11);

  P.PRODUTO.forEach(([label, ic], i) => {
    const x = 0.55 + i * 1.24;
    bloco(s, x, 4.36, 1.12, 0.62, MATA, 0.12);
    icone(s, ic, x + 0.14, 4.44, 'acid', 0.26);
    rotulo(s, label, x + 0.14, 4.76, 0.9, CREME, 'left', 8.5);
  });

  // A linha inteira atravessava o painel de char e sumia na metade preta.
  s.addText(`certificável em ${P.PROCESSO.certificacao} · metano evitado em pilhas úmidas: `
    + 'metodologia Puro.earth (2025)',
    { x: 0.55, y: 5.06, w: 3.5, h: 0.34, isTextBox: true, margin: 0, fontFace: 'Arial',
      fontSize: 7.5, color: MARROM, valign: 'top' });
  s.addNotes('Casca úmida é volumosa e perecível; biochar é seco, cerca de 30% da '
    + 'massa, inerte e estável por séculos — não vira passivo.');
}

/* ===========================================================================
   06 — AS METAS
   O segundo quadro branco. Quatro números publicados e a única evidência de
   campo, que é daqui.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('06');

  pilula(s, 'já publicado', 0.55, 0.5, 1.7, MATA, VERDE);
  titulo(s, 'As metas já estão publicadas.', 0.55, 1.0, 6.4, 30, MATA);

  P.METAS.forEach(([v, label, ic], i) => {
    const x = 0.55 + i * 2.27;
    bloco(s, x, 1.86, 2.05, 1.24, i === 0 ? MATA : 'F4F2EC', 0.1);
    icone(s, ic, x + 0.18, 2.00, i === 0 ? 'acid' : 'dark', 0.26);
    numero(s, v, x + 0.18, 2.30, 1.8, 28, i === 0 ? VERDE : MATA);
    rotulo(s, label, x + 0.18, 2.80, 1.8, i === 0 ? CREME : MARROM, 'left', 8);
  });

  bloco(s, 0.55, 3.26, 8.9, 0.9, MATA, 0.1);
  icone(s, 'muda', 0.80, 3.48, 'acid', 0.42);
  numero(s, `+${P.EMBRAPA.delta} p.p.`, 1.42, 3.38, 2.3, 32, VERDE);
  rotulo(s, `sobrevivência de ${P.EMBRAPA.cultura} com biochar: `
    + `${P.EMBRAPA.sobrevivenciaSem}% → ${P.EMBRAPA.sobrevivenciaCom}%`,
    3.78, 3.56, 5.4, CREME, 'left', 12);

  s.addText(`${P.EMBRAPA.local} · ${P.EMBRAPA.ano}   ·   ${P.PEPSICO.fonte}   ·   `
    + `${num(P.MERCADO.exomadMt, 2)} Mt já contratadas pela Microsoft (Exomad Green, ${P.MERCADO.registro})`,
    { x: 0.55, y: 4.38, w: 8.9, h: 0.22, isTextBox: true, margin: 0, fontFace: 'Arial',
      fontSize: 7.5, color: MARROM, valign: 'middle' });

  s.addNotes('Net-zero 2050 validado SBTi; 2030 vs 2022: Escopo 3 FLAG −30%, Escopo 3 '
    + 'E&I −42%; 10 milhões de acres regenerativos até 2030 (3,5 mi em 2024). Biochar '
    + 'no solo dos produtores é prática regenerativa com resultado medido nesta região.');
}

/* ===========================================================================
   07 — AS CONDIÇÕES E O PRÓXIMO PASSO
   O char como chão. Três cartões e a única faixa verde do baralho — que é
   verde justamente porque é o único lugar onde se pede alguma coisa.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('07');

  pilula(s, 'próximo passo', 0.55, 0.5, 1.9, VERDE, PRETO);
  titulo(s, 'O que precisa ser verdade.', 0.55, 1.02, 6.4, 34, BRANCO);

  P.CONDICOES.forEach(([idx, nome, nota, ic], i) => {
    const x = 0.55 + i * 3.02, w = 2.86;
    bloco(s, x, 2.02, w, 1.62, CARVAO, 0.09);
    disco(s, ic, x + 0.5, 2.46, 0.28, MATA, 'acid');
    numero(s, idx, x + 1.0, 2.26, 0.8, 24, VERDE);
    s.addText(nome, { x: x + 0.26, y: 2.88, w: w - 0.52, h: 0.32, isTextBox: true,
      margin: 0, fontFace: 'Arial', fontSize: 16, bold: true,
      color: BRANCO, charSpacing: -0.6, valign: 'top' });
    rotulo(s, nota, x + 0.26, 3.28, w - 0.52, PRATA, 'left', 9);
  });

  // A faixa do pedido. É a única área verde do baralho inteiro.
  bloco(s, 0.55, 3.86, 8.9, 1.02, VERDE, 0.1);
  s.addText(P.PROXIMO.acao, { x: 0.82, y: 4.04, w: 6.4, h: 0.34, isTextBox: true,
    margin: 0, fontFace: 'Arial', fontSize: 17, bold: true, color: PRETO,
    charSpacing: -0.5, valign: 'top' });
  P.PROXIMO.pede.forEach((t, i) =>
    rotulo(s, `${i + 1}.  ${t}`, 0.82 + i * 2.9, 4.48, 2.8, MATA, 'left', 10));

  fonte(s, 'RECICLAR · EPA · Petrolina / PE', CINZA);
  s.addNotes('As três condições são a aderência dita de forma indireta — deixar o '
    + 'gerente reagir a cada uma. O pedido é único e objetivo: amostra, volume '
    + 'mensal e destinação atual. Nada disso exige trabalho novo do lado deles.');
}

pres.writeFile({ fileName: 'deck/pepsico-petrolina-porque.pptx' })
  .then(f => console.log('escrito:', f));
