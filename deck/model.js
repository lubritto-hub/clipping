/* ===========================================================================
   POC BIOCHAR — PETROLINA · MODELO PARAMÉTRICO
   ---------------------------------------------------------------------------
   Toda linha carrega a sua procedência:

     [DOC] valor lido diretamente de um documento do projeto.
     [EST] estimativa derivada, com o método declarado ao lado.

   Fontes primárias:
     P1  POC_Petrolina_Deck.pptx (v1, 30/08/2026) — tese, unit economics,
         breakeven, plano de escala, financiamento, gates.
     P2  Proposta_Biochar_Finep_Bloco1_2.docx + Bloco2_1.docx —
         orçamento por Work Package, prazo, TRL, escopo do piloto.
     P3  Plano_Projeto_Biochar_Finep.docx — capacidade do piloto, planta
         industrial de referência.
     P4  Business_Case_Biochar_Brasil.docx — caso-base da planta contínua.
     P5  Bench_Biochar_Cimento_Players_Globais.xlsx — mercado, traços,
         preços de crédito, players.
     P6  VERRA VM0044 v1.2 — metodologia de quantificação.

   A precisão de classe AACE 4/5 (−30% / +50%) vale para tudo marcado [EST].
   =========================================================================== */

const CAMBIO = 5.20;              // [DOC] P1, premissa de unit economics

/* --- O piloto -------------------------------------------------------------
   500 kg/h de biomassa é a capacidade nominal do reator de leito fluidizado
   circulante de três zonas (P2/P3). As 810 t/ano de char do plano (P1) são
   coerentes com essa capacidade: ~4.000 t de biomassa por ano a ~20% de
   rendimento em base seca — que é exatamente o indicador contratado da
   Campanha 1 (soja) na E3.1. */
const PILOTO = {
  capacidadeKgH: 500,             // [DOC] P2/P3
  horasAno: 8000,                 // [EST] 91% de disponibilidade, padrão para
                                  //       planta contínua em regime
  biomassaAno: 4000,              // [EST] 500 kg/h × 8.000 h
  rendimento: 0.203,              // [DOC] E3.1 exige >=20% (soja); 25% (florestal)
  charAno: 810,                   // [DOC] P1, "o piloto entrega 810 t"
  tCO2ePorTChar: 2.0,             // [DOC] E5.2 exige remoção líquida >=2,0
  prazoMeses: 30,                 // [DOC] P2
};
PILOTO.co2eAno = PILOTO.charAno * PILOTO.tCO2ePorTChar;   // 1.620 tCO2e/ano

/* --- CAPEX e OPEX da POC --------------------------------------------------
   O orçamento Finep de R$ 15,0 M cobre os 30 meses inteiros e mistura
   investimento com custeio. A separação abaixo NÃO inventa números: agrupa os
   Work Packages tal como estão orçados em P2.

   CAPEX = o ativo físico e a engenharia que o produz (WP1 + WP2).
   OPEX  = tudo que se consome operando e provando o ativo (WP3..WP6).

   Essa fronteira é a convencional para um piloto de P&D: a engenharia básica
   e de detalhamento é capitalizada junto com o equipamento porque não tem
   valor separável dele. */
const WP = [
  ['WP1 — Modelagem, simulação e projeto',        2_200_000, 'CAPEX', 'WP1'],
  ['WP2 — Construção e montagem do piloto',       5_500_000, 'CAPEX', 'WP2'],
  ['WP3 — Campanhas experimentais',               2_500_000, 'OPEX',  'WP3'],
  ['WP4 — Caracterização e validação agronômica', 2_300_000, 'OPEX',  'WP4'],
  ['WP5 — ACV e créditos de carbono',             1_000_000, 'OPEX',  'WP5'],
  ['WP6 — Engenharia industrial e negócio',       1_500_000, 'OPEX',  'WP6'],
];                                                          // [DOC] P2, todos

const CAPEX_POC = WP.filter(w => w[2] === 'CAPEX').reduce((a, w) => a + w[1], 0);  // 7.700.000
const OPEX_POC  = WP.filter(w => w[2] === 'OPEX').reduce((a, w) => a + w[1], 0);   // 7.300.000
const TOTAL_POC = CAPEX_POC + OPEX_POC;                                            // 15.000.000

/* Financiamento do total, conforme submetido. */
const FINEP = {
  total: TOTAL_POC,               // [DOC] P2 — R$ 15.000.000
  subvencao: 12_750_000,          // [DOC] P2 — 85%
  contrapartida: 2_250_000,       // [DOC] P2 — 15%
  linha: 'Finep — Economia Circular (Recuperação de Valor)',   // [DOC] P2
  arranjo: 'Arranjo em Rede · TRL 4 → 7',                      // [DOC] P2
};

/* --- OPEX em regime -------------------------------------------------------
   O que custa OPERAR o piloto depois que o projeto termina, sem a estrutura
   de P&D. Derivado do caso-base de P4 (planta contínua de 3.200 t char/ano,
   OPEX R$ 5,3 M/ano => R$ 1.656/t) com uma decomposição fixo/variável e o
   fixo mantido praticamente inteiro na escala menor — que é justamente a
   razão pela qual um piloto não se paga e a planta se paga. */
const OPEX_REGIME = {
  refCharAno: 3200,               // [DOC] P4
  refOpexAno: 5_300_000,          // [DOC] P4
  fracaoFixa: 0.55,               // [EST] mão de obra, manutenção, utilidades
                                  //       de base, seguros, MRV
};
OPEX_REGIME.refPorT   = OPEX_REGIME.refOpexAno / OPEX_REGIME.refCharAno;          // 1.656
OPEX_REGIME.fixoAno   = OPEX_REGIME.refOpexAno * OPEX_REGIME.fracaoFixa * 0.72;   // [EST] equipe menor
OPEX_REGIME.varPorT   = (OPEX_REGIME.refOpexAno * (1 - OPEX_REGIME.fracaoFixa)) / OPEX_REGIME.refCharAno;
OPEX_REGIME.totalAno  = OPEX_REGIME.fixoAno + OPEX_REGIME.varPorT * PILOTO.charAno;
OPEX_REGIME.porT      = OPEX_REGIME.totalAno / PILOTO.charAno;

/* Linhas de OPEX em regime, para a slide de composição. [EST] em todas —
   rateio do total acima pelos pesos típicos de uma planta de pirólise
   contínua com MRV digital embarcado. */
const OPEX_LINHAS = [
  ['Equipe de operação e manutenção',      0.34, 'equipe'],
  ['Energia elétrica e utilidades',        0.16, 'utilidades'],
  ['Preparação e manuseio de biomassa',    0.14, 'biomassa'],
  ['Manutenção, peças e areia do leito',   0.13, 'manutenção'],
  ['MRV, análises e certificação',         0.12, 'MRV'],
  ['Logística, seguros e administrativo',  0.11, 'overhead'],
].map(([label, peso, curto]) => [label, peso * OPEX_REGIME.totalAno, curto, peso]);

/* --- Unit economics -------------------------------------------------------
   Todos os parâmetros vêm de P1 (cenário conservador declarado). */
const UNIT = {
  corcUSD: 150,                   // [DOC] P1/P5 — referência de entrega EUA
  descontoOfftake: 0.25,          // [DOC] P1
  comissao: 0.15,                 // [DOC] P1
  tCO2ePorT: 2.0,                 // [DOC] P1 — claim mínimo
  contratoBPorT: 2_000,           // [DOC] P1 — claim/EPD, sem CORC
  gateFeePorTUmida: 38,           // [DOC] P1
  tUmidaPorTChar: 4.8,            // [DOC] P1
  margemContribuicaoPorT: 763,    // [DOC] P1 — cenário conservador
};
UNIT.corcBRLporTCO2 = UNIT.corcUSD * CAMBIO * (1 - UNIT.descontoOfftake) * (1 - UNIT.comissao);
UNIT.corcPorTChar   = UNIT.corcBRLporTCO2 * UNIT.tCO2ePorT;
UNIT.gateFeePorTChar = UNIT.gateFeePorTUmida * UNIT.tUmidaPorTChar;
UNIT.receitaBrutaPorT = UNIT.corcPorTChar + UNIT.contratoBPorT + UNIT.gateFeePorTChar;

/* --- Breakeven e escala --------------------------------------------------- */
const BREAKEVEN = {
  ebitdaZero: 5448,               // [DOC] P1 — 2028, 15 pessoas a mercado pleno
  caixa: 3874,                    // [DOC] P1 — com subvenções de custeio
  semGateFee: 6942,               // [DOC] P1
  capacidadeModulo1: 4700,        // [DOC] P1
  capexModulo1: 21_600_000,       // [DOC] P1
  grupo: 13_000,                  // [DOC] P1 — BE do grupo
};

const ESCALA = [
  ['2027', 'POC',        810,    'Piloto 500 kg/h. Os três números que destravam capital: H/Corg, CH₄ e balanço fechado.'],
  ['2028', 'Módulo 1',   4700,   'Breakeven operacional. 50 mil blocos com pré-moldado local e a primeira emissão de CORCs.'],
  ['2029', 'Planta 1',   20000,  '20 mil t de biomassa. BNDES Fundo Clima: 6,5% + 1,3% a.a., carência de 60 meses.'],
  ['2031', 'Planta 2',   40000,  'A segunda planta não é réplica: é o dobro. Escala derruba o CAPEX por tonelada.'],
];                                // [DOC] P1 (t de biomassa nas duas últimas)

/* --- Mercado -------------------------------------------------------------- */
const MERCADO = {
  charConcretoBi2025: 1.8,        // [DOC] P5 — US$ bi
  charConcretoBi2034: 5.2,        // [DOC] P5
  cagr: 0.125,                    // [DOC] P5
  cocoPetrolinaTAno: 100_000,     // [DOC] P1 — casca úmida na porta da fábrica
  cocoProcessadoTAno: 120_000,    // [DOC] P1
  precoCorcUSD: 150,              // [DOC] P5
  microsoftMt: 34.6,              // [DOC] P5 — CDR total acumulado
  exomadMt: 1.24,                 // [DOC] P5 — maior offtake de biochar
  entregueMundoMt: 1.5,           // [DOC] P1 — até jun/26
  demandaMt2030: 100,             // [DOC] P1 — McKinsey, por ano em 2030
};

/* --- Gates --------------------------------------------------------------- */
const GATES = [
  ['M3',  'H/C<sub>org</sub> ≤ 0,40 na bancada', 'mantém Puro E EBC abertas'],
  ['M6',  'Leito não aglomera com o K do coco',  'a objeção nº 1 de quem conhece FBR'],
  ['M9',  'CH₄ sob o teto, por lote',            'e areia do leito dentro da spec'],
  ['M12', 'Contrato de destinação assinado',     'condição de CAPEX do Módulo 1'],
  ['M15', 'Facility Audit concluída',            'primeira emissão de CORCs'],
];                                // [DOC] P1

module.exports = {
  CAMBIO, PILOTO, WP, CAPEX_POC, OPEX_POC, TOTAL_POC, FINEP,
  OPEX_REGIME, OPEX_LINHAS, UNIT, BREAKEVEN, ESCALA, MERCADO, GATES,
};
