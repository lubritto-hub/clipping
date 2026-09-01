/* ===========================================================================
   PEPSICO · PETROLINA — "POR QUE O COCO"
   ---------------------------------------------------------------------------
   Modelo de conteúdo. A regra aqui é mais estrita que a do deck da venture:

   ESTE DECK NÃO PEDE NADA E NÃO PROMETE NADA.

   Ele mostra por que a casca de coco é uma biomassa naturalmente boa para
   pirólise, e por que o biochar conversa com metas que a PepsiCo já publicou.
   Nenhum preço, nenhuma TIR, nenhum número da POC própria — esses pertencem
   ao outro baralho e, ditos aqui, transformariam um "por quê" num pitch.

   Procedência:
     [LIT] literatura técnica, com a citação ao lado.
     [PEP] documento público da própria PepsiCo.
     [MKT] transação ou preço de mercado verificável.
     [EMB] ensaio da Embrapa Semiárido.
   Nada aqui é [EST]: este deck não estima.

   Os números vêm do deck de origem (PepsiCo_Petrolina_v4_porque.pptx) e foram
   mantidos com as suas citações. Onde o projeto próprio tem número diferente
   — o rendimento contratado da POC é >=20% em base seca, contra os ~30% de
   benchmark de literatura aqui — os dois NÃO foram misturados: este deck fala
   de literatura, o outro fala de contrato.
   =========================================================================== */

const LOCAL = {
  cidade: 'Petrolina',
  uf: 'PE',
  coords: '09°23′S / 40°30′W',
};

/* --- O material ---------------------------------------------------------- */
const COCO = {
  ligninaMin: 25, ligninaMax: 53,          // [LIT] Devens et al. 2018
  cinzasMax: 4,                            // [LIT] Windeatt et al. 2014
  fracaoCascaMin: 80, fracaoCascaMax: 85,  // [LIT] Devens et al. 2018
  umidadeMin: 30, umidadeMax: 70,          // [LIT] as-received
  fonte: 'Devens et al., 2018 · Windeatt et al., 2014',
};

/* --- O processo ----------------------------------------------------------
   Rendimento de benchmark de literatura para casca de coco, a validar com a
   biomassa da própria unidade. Deliberadamente NÃO é o >=20% contratado da
   POC: ali é um indicador de entrega, aqui é uma faixa publicada. */
const PROCESSO = {
  tempMin: 400, tempMax: 600,              // [LIT] °C
  rendimentoKgPorT: 300,                   // [LIT] ~300 kg biochar / t seca
  perdaMassa: 70,                          // [LIT] derivado: 1 − 0,3
  co2PorTMin: 2.5, co2PorTMax: 3.0,        // [LIT] benchmark, a validar
  certificacao: 'Puro.earth · EBC',
};

/* --- O que a PepsiCo já publicou ---------------------------------------- */
const PEPSICO = {
  netZero: 2050,                           // [PEP] validado pela SBTi
  flagReducao: 30,                         // [PEP] −30% Escopo 3 FLAG até 2030
  flagBase: 2022,
  acresRegenerativos: 10,                  // [PEP] milhões de acres até 2030
  acresEntregues: 3.5,                     // [PEP] até 2024
  escopo12: 50,                            // [PEP] −50% Escopos 1+2 até 2030
  escopo3EI: 42,                           // [PEP] −42% Escopo 3 E&I até 2030
  fonte: 'PepsiCo Climate Transition Plan, mai/2025 · metas validadas pela SBTi',
};

/* --- Evidência local ----------------------------------------------------- */
const EMBRAPA = {
  sobrevivenciaSem: 26,                    // [EMB] %
  sobrevivenciaCom: 68,                    // [EMB] %
  cultura: 'mudas de caju',
  local: 'Embrapa Semiárido, Petrolina',
  ano: 2026,
};
EMBRAPA.delta = EMBRAPA.sobrevivenciaCom - EMBRAPA.sobrevivenciaSem;  // 42 p.p.

/* --- Mercado ------------------------------------------------------------- */
const MERCADO = {
  exomadMt: 1.24,                          // [MKT] Microsoft × Exomad Green
  exomadAnos: 10,
  exomadData: 'mai/2025',
  registro: 'Puro.earth',
};

/* --- As três condições ---------------------------------------------------
   A mesma gramática de gates do deck da venture: cada condição diz o que
   precisa ser verdade e o que ela destrava. Sem pedido, sem prazo. */
const CONDICOES = [
  ['01', 'biomassa regular',
   'Volume e frequência que sustentem uma operação contínua.',
   'uma rota térmica dimensionada, não um experimento'],
  ['02', 'espaço na rotina',
   'Uma etapa térmica que caiba na operação da unidade.',
   'a casca deixa de ser uma pilha e vira um fluxo'],
  ['03', 'destino para o biochar',
   'Solo, produtores ou materiais que absorvam o produto.',
   'a remoção fica dentro da própria cadeia'],
];

/* --- Os três caminhos de valor ------------------------------------------- */
const CAMINHOS = [
  ['01', 'fluxo', 'Nova rota de valorização',
   'Massa −70%, material seco e estável — sem novo passivo.'],
  ['02', 'produto', 'Biochar',
   'Solo, substratos e materiais: um produto físico com mercado real.'],
  ['03', 'carbono', 'Carbon removal',
   '≈2,5–3 t de CO₂ por t de biochar (benchmark) — certificável e já comprado em escala.'],
];

/* --- As cinco etapas do processo ---------------------------------------- */
const ETAPAS = [
  ['biomassa',    'casca úmida, como sai da unidade'],
  ['preparo',     'secagem com calor do próprio processo'],
  ['pirólise',    '400–600 °C, pouco oxigênio'],
  ['gases',       'recirculam como calor'],
  ['biochar',     'carbono estável, seco'],
];

module.exports = { LOCAL, COCO, PROCESSO, PEPSICO, EMBRAPA, MERCADO, CONDICOES, CAMINHOS, ETAPAS };
