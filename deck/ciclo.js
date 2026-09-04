/* ===========================================================================
   O CICLO FECHADO DO CARBONO — geometria e conteúdo

   Este arquivo existe por um motivo estrutural: o diagrama é desenhado na
   CHAPA (trilhos curvos, círculos, cantos arredondados, coisas que pptxgenjs
   não faz) mas os ícones e os rótulos são vetor vivo no .pptx. São dois
   programas diferentes desenhando a mesma figura, e se cada um guardasse a
   sua cópia das coordenadas elas divergiriam no primeiro ajuste.

   Então a geometria mora aqui, em POLEGADAS do quadro de 13,333 x 7,5, e os
   dois leem daqui.

   O diagrama é o ciclo do carbono, não um fluxo de equipamento: não há foto
   de máquina nem nome de fornecedor. A carbonização aparece como uma etapa do
   ciclo, que é o que ela é do ponto de vista de quem decide.
   =========================================================================== */

const Y = 4.42;          // altura do eixo dos nós
const R = 0.66;          // raio dos nós grandes

const CICLO = {
  eixoY: Y,
  raio: R,
  retorno: { topo: 2.78, esq: 0.86, dir: 12.06, curva: 0.34 },

  /* Os cinco nós do ciclo, da captura à devolução ao solo. */
  nos: [
    { x: 1.52,  r: R,    nome: 'Fotossíntese',     ic: 'muda',     acento: false },
    { x: 3.18,  r: 0.32, nome: 'CO₂',              ic: null,       acento: false },
    { x: 5.16,  r: R,    nome: 'Biomassa de coco', ic: 'coco',     acento: false },
    { x: 7.86,  r: R,    nome: 'Carbonização',     ic: 'reator',   acento: false },
    { x: 10.56, r: R,    nome: 'Biochar',          ic: 'char',     acento: true  },
  ],

  /* As duas saídas laterais. Penduradas nos nós de onde saem, e não no fim da
     fila: energia sai da carbonização, certificado sai do biochar. */
  saidas: [
    { de: 3, x: 7.86,  y: 6.24, r: 0.40, nome: 'Energia recuperável', ic: 'calor' },
    { de: 4, x: 10.56, y: 6.24, r: 0.40, nome: 'Certificado de CO₂',  ic: 'registro' },
  ],

  /* O que fecha o ciclo, dito no trilho de retorno. */
  retornoRotulo: 'o carbono volta ao solo e à planta',
};

module.exports = { CICLO };
