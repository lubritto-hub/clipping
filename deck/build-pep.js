/* ===========================================================================
   PEPSICO · PETROLINA — "CASCA VIRA CARBONO"

   Refeito do zero, em outra língua.

   O baralho anterior era um documento técnico bem-comportado: parágrafo,
   fio de cabelo, régua de evidência, tudo alinhado. Lia como relatório.
   Este é editorial gráfico: BLOCO, NÚMERO, ÍCONE — nessa ordem de tamanho.

   AS TRÊS REGRAS DE COMPOSIÇÃO
     1. Nenhum quadro tem mais de doze palavras fora dos rótulos.
     2. Todo número que importa é maior que qualquer palavra do quadro.
     3. Todo bloco é um retângulo de canto arredondado, chapado, sem sombra e
        sem borda. Cor faz a hierarquia; contorno não faz nada.

   A ABERTURA E O RESTO
     A capa é verde-coco puro com um coco cromado. Os seis quadros seguintes
     respondem a ela sempre com o mesmo verde — ora como bloco, ora como
     número, ora como pílula — e nunca repetem o cromo, que é da capa.

   O QUE NÃO MUDOU
     A regra de conteúdo. ESTE DECK NÃO PEDE NADA E NÃO PROMETE NADA, e toda
     procedência continua no pé do quadro a que pertence.
   =========================================================================== */

const pptxgen = require('pptxgenjs');
const P = require('./pepsico.js');
const A = '/home/user/clipping/design-system/.preview/deck-assets/';

/* --- Paleta. Sem '#': pptxgenjs corrompe o arquivo com ele. --------------
   Cinco cores e nada mais. O verde-coco não é um verde de marca escolhido no
   escuro: coco verde é literalmente desta cor. */
const ACID  = 'C8E85C';   // verde-coco
const MATA  = '16331F';   // verde de mata — o escuro do baralho
const CREME = 'F5F1E6';
const CASCA = '8A5A34';
const PRETO = '0B0A09';
const BRANCO = 'FFFFFF';
const CINZA = '6E7A62';   // única cor de apoio, para procedência

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

/** PROCEDÊNCIA — uma linha, no pé, e só uma. */
const fonte = (s, t, colour = CINZA) =>
  s.addText(String(t), { x: 0.55, y: 5.10, w: 8.9, h: 0.22, isTextBox: true, margin: 0,
    fontFace: 'Arial', fontSize: 7.5, color: colour, valign: 'middle' });

const chapa = n => ({ path: A + `pep-${n}.jpg` });

/* ===========================================================================
   01 — CAPA
   Verde-coco puro, o coco cromado à direita. Quatro palavras.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('01');

  pilula(s, `${P.LOCAL.cidade} · ${P.LOCAL.uf}`, 0.55, 0.5, 1.8, MATA, ACID);
  icone(s, 'estrela', 2.48, 0.48, 'dark', 0.34);

  titulo(s, 'Casca\nvira\ncarbono.', 0.55, 1.30, 5.0, 62, MATA);

  bloco(s, 0.55, 4.28, 4.3, 0.5, MATA, 0.14);
  icone(s, 'coco', 0.75, 4.36, 'acid', 0.34);
  rotulo(s, 'por que a pirólise faz sentido para a casca de coco',
    1.22, 4.38, 3.5, ACID, 'left', 9);

  fonte(s, 'documento técnico e estratégico · não é proposta comercial', MATA);
  s.addNotes('Tese em uma frase: a casca de coco é uma biomassa naturalmente boa '
    + 'para pirólise, e o biochar conversa com o que a PepsiCo já decidiu. '
    + 'Não pedir nada.');
}

/* ===========================================================================
   02 — O QUE JÁ EXISTE
   O pátio em foto, força total, à direita. À esquerda o número da premissa.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('02');

  pilula(s, 'hoje', 0.55, 0.5, 1.0, MATA, ACID);

  titulo(s, 'A pilha\njá existe.', 0.55, 1.02, 4.2, 40, MATA);

  bloco(s, 0.55, 2.28, 4.05, 1.62, MATA, 0.1);
  numero(s, `${P.COCO.fracaoCascaMin}–${P.COCO.fracaoCascaMax}%`, 0.85, 2.46, 3.5, 62, ACID);
  icone(s, 'secao', 0.85, 3.40, 'cream', 0.3);
  rotulo(s, 'da massa do fruto é casca', 1.28, 3.44, 3.0, CREME, 'left', 11);

  bloco(s, 0.55, 4.06, 1.95, 0.72, ACID, 0.1);
  numero(s, `${P.COCO.umidadeMin}–${P.COCO.umidadeMax}%`, 0.75, 4.14, 1.6, 26, MATA);
  rotulo(s, 'umidade', 0.75, 4.56, 1.6, MATA, 'left', 8);

  bloco(s, 2.65, 4.06, 1.95, 0.72, CASCA, 0.1);
  icone(s, 'pilha', 2.85, 4.16, 'cream', 0.3);
  rotulo(s, 'perecível', 2.85, 4.56, 1.6, CREME, 'left', 8);

  fonte(s, `caracterização de casca e fibra · ${P.COCO.fonte}`);
  s.addNotes('80–85% da massa do fruto é casca. A biomassa já está no pátio, '
    + 'hoje, nesta quantidade. A umidade as-received de 30–70% é o desafio '
    + 'conhecido — secagem integrada com calor do próprio processo.');
}

/* ===========================================================================
   03 — POR QUE O COCO
   Fundo escuro, a secção grande à direita. Duas propriedades, dois números.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('03');

  pilula(s, 'o material', 0.55, 0.5, 1.5, ACID, MATA);

  titulo(s, 'Nasce pronta\npara queimar\nsem oxigênio.', 0.55, 1.02, 4.6, 34, CREME);

  bloco(s, 0.55, 2.72, 2.0, 1.5, ACID, 0.1);
  icone(s, 'endocarpo', 0.75, 2.88, 'dark', 0.3);
  numero(s, `${P.COCO.ligninaMin}–${P.COCO.ligninaMax}%`, 0.75, 3.24, 1.7, 34, MATA);
  rotulo(s, 'lignina', 0.75, 3.86, 1.6, MATA, 'left', 9);

  bloco(s, 2.68, 2.72, 2.0, 1.5, CREME, 0.1);
  icone(s, 'char', 2.88, 2.88, 'dark', 0.3);
  numero(s, `< ${P.COCO.cinzasMax}%`, 2.88, 3.24, 1.7, 34, MATA);
  rotulo(s, 'cinzas', 2.88, 3.86, 1.6, MATA, 'left', 9);

  rotulo(s, 'mais lignina, mais carbono fixo   ·   menos cinza, char mais limpo',
    0.55, 4.42, 4.6, ACID, 'left', 9);

  fonte(s, `literatura técnica · ${P.COCO.fonte}`, CINZA);
  s.addNotes('Lignina alta e cinzas baixas favorecem rendimento e chars aromáticos '
    + 'estáveis. A secção ao lado é o argumento: o fruto é quase todo casca.');
}

/* ===========================================================================
   04 — O PROCESSO
   Cinco etapas em disco, a temperatura como número central, e a matéria antes
   e depois nos dois cantos de baixo.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('04');

  pilula(s, 'o processo', 0.55, 0.5, 1.5, MATA, ACID);

  titulo(s, 'Calor.\nPouco oxigênio.', 0.55, 1.02, 4.4, 34, MATA);

  // O número que manda no quadro é a temperatura.
  numero(s, `${P.PROCESSO.tempMin}–${P.PROCESSO.tempMax}`, 5.05, 0.90, 4.4, 58, MATA, 'right');
  rotulo(s, 'graus celsius, sem oxigênio', 5.05, 1.90, 4.4, CASCA, 'right', 10);

  // As cinco etapas, em disco. É a única fila do baralho em que a ordem
  // importa, então ela é literalmente uma fila.
  s.addShape(pres.ShapeType.rect, { x: 1.05, y: 2.86, w: 6.7, h: 0.014,
    fill: { color: MATA, transparency: 72 } });
  P.ETAPAS.forEach(([label, ic], i) => {
    const cx = 1.05 + i * 1.675;
    disco(s, ic, cx, 2.86, 0.31, i === 4 ? MATA : ACID, i === 4 ? 'acid' : 'dark');
    rotulo(s, label, cx - 0.7, 3.32, 1.4, MATA, 'center', 9);
  });

  // O balanço de massa entra SOBRE a matéria: o número da casca no painel de
  // fibra, o do char no painel de char. É a leitura mais curta possível.
  numero(s, '1 t', 0.85, 3.98, 1.6, 32, MATA);
  rotulo(s, 'casca seca entra', 0.85, 4.56, 2.2, MATA, 'left', 9);
  numero(s, `~${P.PROCESSO.rendimentoKgPorT} kg`, 5.60, 3.98, 2.6, 32, ACID);
  rotulo(s, 'biochar sai', 5.60, 4.56, 2.2, ACID, 'left', 9);

  fonte(s, 'rendimento de benchmark de literatura para casca de coco — a validar com a biomassa da unidade');
  s.addNotes('Entra casca, acontece calor com pouco oxigênio (400–600 °C), sai '
    + 'biochar e energia. Os gases recirculam como calor. ~300 kg/t é benchmark '
    + 'de literatura, a validar com a biomassa da unidade.');
}

/* ===========================================================================
   05 — O QUE SAI
   Creme à esquerda, char em força total à direita. Um número, três palavras.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('05');

  pilula(s, 'o produto', 0.55, 0.5, 1.5, MATA, ACID);

  titulo(s, 'Sai um\nsólido preto\ne estável.', 0.55, 1.02, 3.6, 34, MATA);

  numero(s, `−${P.PROCESSO.perdaMassa}%`, 0.55, 2.36, 3.6, 92, MATA);
  rotulo(s, 'de massa, em relação à casca úmida', 0.55, 3.86, 3.8, CASCA, 'left', 10);

  P.PRODUTO.forEach(([label, ic], i) => {
      const x = 0.55 + i * 1.24;
      bloco(s, x, 4.28, 1.12, 0.66, i === 1 ? ACID : MATA, 0.12);
      icone(s, ic, x + 0.14, 4.38, i === 1 ? 'dark' : 'acid', 0.28);
      rotulo(s, label, x + 0.14, 4.74, 0.9, i === 1 ? MATA : CREME, 'left', 8.5);
    });

  fonte(s, `carbono estável · ${P.PROCESSO.certificacao} · metano evitado em pilhas úmidas: metodologia Puro.earth (2025)`);
  s.addNotes('Casca úmida é volumosa e perecível; biochar é seco, ~30% da massa, '
    + 'inerte e estável por séculos — não vira passivo.');
}

/* ===========================================================================
   06 — O QUE A PEPSICO JÁ DECIDIU
   Quatro números publicados numa faixa, e a única evidência de campo — que é
   daqui — como bloco verde.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('06');

  pilula(s, 'já publicado', 0.55, 0.5, 1.7, MATA, ACID);
  titulo(s, 'Conversa com o que já foi decidido.', 0.55, 1.0, 5.6, 30, MATA);

  P.METAS.forEach(([v, label, ic], i) => {
    const x = 0.55 + i * 2.27;
    bloco(s, x, 1.78, 2.05, 1.28, i === 0 ? MATA : CREME, 0.1);
    icone(s, ic, x + 0.18, 1.92, i === 0 ? 'acid' : 'dark', 0.28);
    numero(s, v, x + 0.18, 2.24, 1.8, 30, i === 0 ? ACID : MATA);
    rotulo(s, label, x + 0.18, 2.76, 1.8, i === 0 ? CREME : CASCA, 'left', 8);
  });

  bloco(s, 0.55, 3.36, 8.9, 0.92, ACID, 0.1);
  icone(s, 'muda', 0.80, 3.60, 'dark', 0.44);
  numero(s, `+${P.EMBRAPA.delta} p.p.`, 1.42, 3.48, 2.3, 34, MATA);
  rotulo(s, `sobrevivência de ${P.EMBRAPA.cultura} com biochar: `
    + `${P.EMBRAPA.sobrevivenciaSem}% → ${P.EMBRAPA.sobrevivenciaCom}%`,
    3.82, 3.66, 5.4, MATA, 'left', 12);

  // A procedência mora DENTRO da faixa do palmeiral, em verde-mata sobre a foto.
  s.addText(`${P.EMBRAPA.local} · ${P.EMBRAPA.ano}   ·   ${P.PEPSICO.fonte}   ·   `
    + `${num(P.MERCADO.exomadMt, 2)} Mt já contratadas pela Microsoft (Exomad Green, ${P.MERCADO.registro})`,
    { x: 0.75, y: 4.86, w: 8.5, h: 0.22, isTextBox: true, margin: 0, fontFace: 'Arial',
      fontSize: 7.5, bold: true, color: MATA, valign: 'middle' });
  s.addNotes('Net-zero 2050 validado SBTi; 2030 vs 2022: Escopo 3 FLAG −30%, '
    + 'Escopo 3 E&I −42%; 10 milhões de acres regenerativos até 2030 (3,5 mi em '
    + '2024). Biochar no solo dos produtores é prática regenerativa com resultado '
    + 'medido nesta região.');
}

/* ===========================================================================
   07 — O QUE PRECISA SER VERDADE
   Escuro, o char como chão. Três cartões, três condições, nenhum pedido.
   =========================================================================== */
{
  const s = pres.addSlide();
  s.background = chapa('07');

  pilula(s, 'as três condições', 0.55, 0.5, 2.1, ACID, MATA);
  titulo(s, 'O que precisa ser verdade.', 0.55, 1.02, 6.4, 36, CREME);

  P.CONDICOES.forEach(([idx, nome, nota, ic], i) => {
    const x = 0.55 + i * 3.02, w = 2.86;
    bloco(s, x, 2.14, w, 1.94, i === 1 ? ACID : MATA, 0.09);
    disco(s, ic, x + 0.5, 2.62, 0.3, i === 1 ? MATA : ACID, i === 1 ? 'acid' : 'dark');
    numero(s, idx, x + 1.02, 2.40, 0.8, 26, i === 1 ? MATA : ACID);
    s.addText(nome, { x: x + 0.26, y: 3.10, w: w - 0.52, h: 0.46, isTextBox: true,
      margin: 0, fontFace: 'Arial', fontSize: 17, bold: true,
      color: i === 1 ? MATA : CREME, charSpacing: -0.6, valign: 'top' });
    rotulo(s, nota, x + 0.26, 3.68, w - 0.52, i === 1 ? MATA : ACID, 'left', 9);
  });

  s.addText('Se isso for verdade, o coco tem uma segunda vida.', {
    x: 0.55, y: 4.36, w: 8.9, h: 0.42, isTextBox: true, margin: 0, fontFace: 'Arial',
    fontSize: 20, bold: true, color: ACID, charSpacing: -0.6, valign: 'top' });
  fonte(s, 'nenhuma das três é um pedido — são as condições que tornariam a rota real', CINZA);
  s.addNotes('Sem pedido. As três condições são a aderência dita de forma indireta — '
    + 'deixar o gerente reagir a cada uma. Se ele puxar o próximo passo: dados, '
    + 'amostra, teste, tecnologia, business case.');
}

pres.writeFile({ fileName: 'deck/pepsico-petrolina-porque.pptx' })
  .then(f => console.log('escrito:', f));
