/* ===========================================================================
   PROPOSTA PEPSICO / PETROLINA, BIOCHAR
   ---------------------------------------------------------------------------
   Modelo de conteúdo. O texto é o do arquivo de origem
   (Proposta_PepsiCo_Petrolina_Biochar_v4.pptx), preservado: o pedido foi
   melhorar os slides, não reescrever a proposta.

   Duas liberdades foram tomadas, e só estas:
   - Caixa alta virou caixa de sentença nas manchetes. VERSAL EM FRASE LONGA
     custa cerca de um quinto da velocidade de leitura, porque some a silhueta
     das palavras, e aqui as manchetes têm oito a dez palavras.
   - Onde uma linha não cabia no bloco sem quebrar em quatro, ela foi cortada
     no ponto, nunca resumida.

   O rodapé "CONCEITO PARA DISCUSSÃO, CONFIGURAÇÃO A VALIDAR" está em todos os
   sete quadros no original e continua em todos: é uma ressalva, e ressalva que
   aparece só uma vez não é ressalva.
   =========================================================================== */

const MARCA = {
  cliente: 'PepsiCo / Petrolina',
  linha: 'Biochar',
  ressalva: 'Conceito para discussão, configuração a validar',
};

const CAPA = {
  titulo: 'A biomassa de coco\npode se tornar um\nnovo ativo industrial.',
  sub: 'Uma rota tecnológica para combinar biochar, energia recuperável e carbono '
     + 'durável, desenhada a partir da realidade da unidade.',
  eixos: ['coco', 'tecnologia', 'valor'],
};

const PROCESSO = {
  titulo: 'A pirólise concentra valor\nem um fluxo que já existe.',
  sub: 'Um processo térmico converte a biomassa de coco em um sólido rico em carbono '
     + 'e permite recuperar parte da energia dos gases.',
  etapas: [
    ['01', 'Biomassa de coco',  '(resíduo)',         'matéria-prima local',       'pilha'],
    ['02', 'Conversão térmica', '(autossustentada)', 'calor + oxigênio limitado', 'reator'],
    ['03', 'Biochar',           '(gera crédito)',    'produto rico em carbono',   'char'],
  ],
  circuito: ['Gases do processo', 'Calor / energia recuperável'],
  saidas: [['Produto físico', 'bloco'], ['Eficiência', 'calor'], ['Remoção de carbono', 'removal']],
};

const INTEGRACAO = {
  titulo: 'A solução ganha eficiência\nquando nasce integrada à planta.',
  legenda: 'Configuração ilustrativa, tecnologia a selecionar',
  itens: [
    ['01', 'Matéria-prima', 'O sistema parte do fluxo já gerado na unidade, '
     + 'reduzindo etapas de manejo, logística e disposição.', 'pilha'],
    ['02', 'Energia em circuito', 'Os gases do processo podem retornar como calor, '
     + 'elevando a eficiência e reduzindo demanda externa.', 'gases'],
    ['03', 'Configuração sob demanda', 'Preparo e tecnologia se adequam à escala, '
     + 'umidade, granulometria e rotina operacional de Petrolina.', 'unidade'],
  ],
  fecho: 'Não é uma máquina isolada. É um sistema industrial.',
  /* Os eixos sobre os quais o sistema é especificado. São EIXOS, não promessas:
     o próprio deck diz que a tecnologia ainda será selecionada, então listar
     desempenho aqui seria comprometer o que ainda não foi escolhido. O que
     mostra robustez é o rigor da especificação, não um número inventado. */
  eixos: ['escala', 'preparo', 'recuperação de calor', 'controle de processo',
          'manutenção', 'segurança'],
};

const ALAVANCAS = {
  titulo: 'O business case combina\nquatro alavancas de valor.',
  sub: 'A atratividade econômica aumenta quando a solução soma ganhos operacionais, '
     + 'produto, energia e carbono.',
  itens: [
    ['01', 'Fluxo atual', 'custo evitado ou valor preservado', 'pilha'],
    ['02', 'Biochar',     'receita e rota de aplicação',       'char'],
    ['03', 'Energia',     'integração e eficiência térmica',   'calor'],
    ['04', 'Carbono',     'remoção líquida certificável',      'removal'],
  ],
  robustez: 'O valor não precisa vir de uma única fonte. O desenho mais eficiente '
     + 'captura o conjunto, e valida cada alavanca com dados reais.',
  fecho: 'A economia do projeto é resultado da integração.',
};

const CARBONO = {
  titulo: 'Biochar transforma carbono\nbiogênico em produto durável.',
  sub: 'A biomassa capturou CO₂ durante o crescimento. A pirólise estabiliza uma '
     + 'fração desse carbono no biochar.',
  etapas: [
    ['01', 'Biomassa',    'carbono de origem biogênica',    'muda'],
    ['02', 'Pirólise',    'conversão sob controle',         'reator'],
    ['03', 'Biochar',     'carbono em material estável',    'char'],
    ['04', 'Uso elegível','armazenamento de longa duração', 'solo'],
  ],
  fecho: 'Emissões do ciclo são medidas e descontadas.',
};

const DADOS = {
  titulo: 'O projeto começa\ncom quatro dados.',
  sub: 'O dimensionamento começa pelo fluxo real de Petrolina.',
  itens: [
    ['01', 'Volume + sazonalidade',        'massa crítica e perfil de geração',       'pilha'],
    ['02', 'Umidade + propriedades',       'preparo necessário e comportamento em teste', 'secao'],
    ['03', 'Destinação + economia atual',  'baseline real para o business case',      'registro'],
    ['04', 'Espaço + energia + operação',  'condições para integrar o sistema',       'unidade'],
  ],
  saida: 'Saída:  escala, tecnologia, produto, economia',
};

const PROXIMO = {
  titulo: 'Vamos construir o\nbusiness case de Petrolina.',
  sub: 'Um próximo passo simples para transformar a oportunidade em decisão.',
  entradas: [
    ['01', 'Visita técnica',  'Operações + Sustentabilidade',            'unidade'],
    ['02', 'Dados essenciais','fluxo, destinação, integração',         'registro'],
    ['03', 'Amostra',         'representativa, caracterização + teste', 'secao'],
  ],
  entrega: ['balanço preliminar', 'screening tecnológico', 'rotas de uso do biochar',
            'faixa econômica', 'recomendação de teste / piloto'],
  cta: 'Próximo passo: apresentação da viabilidade do projeto.',
};

module.exports = { MARCA, CAPA, PROCESSO, INTEGRACAO, ALAVANCAS, CARBONO, DADOS, PROXIMO };
