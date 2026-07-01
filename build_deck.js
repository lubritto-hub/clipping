const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// Initialize presentation with 16:9 (10 x 5.625 inches)
const prs = new PptxGenJS();
prs.defineLayout({ name: 'default', width: 10, height: 5.625 });

// Premium Color Palette - Tim Cook aesthetic
const colors = {
  espresso: '#0F0C0A',           // Deep luxury black
  off_white: '#FAFAF8',          // Refined white
  gold: '#D4AF37',               // Premium gold (bamboo legs reference)
  gold_light: '#E8C547',         // Light gold accent
  caramelo: '#8B6F47',           // Warm wood tone
  caramelo_claro: '#C4A06A',     // Light warm wood
  caramelo_escuro: '#6B5635',    // Deep wood
  oliva: '#3E4A35',              // Elegant olive
  bege_pedra: '#E7DED1',         // Stone beige
  cinza_quente: '#7A7570',       // Warm gray
  tinta: '#1A1512',              // Deep ink black
  claro_base: '#FCFBF9',         // Ultra light
};

// Helper to create a slide with background
function createSlide(bgPath = null) {
  const slide = prs.addSlide();
  if (bgPath && fs.existsSync(bgPath)) {
    slide.background = { path: bgPath };
  }
  return slide;
}

// Helper for text with consistent styling
function addTitle(slide, text, options = {}) {
  slide.addText(text, {
    x: options.x || 0.5,
    y: options.y || 0.5,
    w: options.w || 9,
    h: options.h || 1.2,
    fontSize: options.fontSize || 54,
    bold: true,
    fontFace: 'Cambria',
    color: options.color || colors.off_white,
    align: 'left',
    valign: 'top',
    wrap: true,
    ...options
  });
}

function addKicker(slide, text, options = {}) {
  slide.addText(text, {
    x: options.x || 0.5,
    y: options.y || 0.3,
    w: options.w || 9,
    h: options.h || 0.4,
    fontSize: 12,
    bold: true,
    fontFace: 'Calibri',
    color: options.color || colors.caramelo,
    align: 'left',
    valign: 'top',
    wrap: false,
    ...options
  });
}

function addBody(slide, text, options = {}) {
  slide.addText(text, {
    x: options.x || 0.5,
    y: options.y || 1.5,
    w: options.w || 9,
    h: options.h || 3.5,
    fontSize: options.fontSize || 18,
    fontFace: 'Calibri',
    color: options.color || colors.tinta,
    align: options.align || 'left',
    valign: options.valign || 'top',
    ...options
  });
}

function addFooter(slide, text, color = colors.off_white) {
  slide.addText(text, {
    x: 0.5,
    y: 5.1,
    w: 9,
    h: 0.4,
    fontSize: 10,
    fontFace: 'Calibri',
    color: color,
    align: 'left',
    valign: 'bottom',
  });
}

// ======================
// SLIDE 1: COVER
// ======================
function slide1() {
  const slide = createSlide('output/backgrounds/dark_cover.png');

  // Premium subtitle (kicker)
  slide.addText('DESIGN CONSCIOUS PET LIVING', {
    x: 0.5,
    y: 0.4,
    w: 5,
    h: 0.3,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.gold,
    align: 'left',
    charSpacing: 2
  });

  // Hero Title - VERY LARGE
  slide.addText('Cadeira Beni', {
    x: 0.5,
    y: 0.85,
    w: 5.5,
    h: 1.3,
    fontSize: 76,
    bold: true,
    fontFace: 'Cambria',
    color: colors.off_white,
    align: 'left',
    valign: 'top',
    wrap: false
  });

  // Gold accent line
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 2.2,
    w: 2.0,
    h: 0.03,
    fill: { color: colors.gold },
    line: { type: 'none' }
  });

  // Premium tagline
  slide.addText('Furniture crafted for the discerning pet owner.', {
    x: 0.5,
    y: 2.4,
    w: 4.5,
    h: 0.5,
    fontSize: 16,
    italic: true,
    fontFace: 'Cambria',
    color: colors.caramelo_claro,
    align: 'left'
  });

  // Core values (refined)
  const values = [
    'Reclaimed Wood — Circular Design',
    'Replaceable Bamboo Legs — Sustainable',
    'Removable Linen — Washable Care'
  ];

  let y = 3.1;
  values.forEach(val => {
    slide.addText('• ' + val, {
      x: 0.5,
      y: y,
      w: 4.5,
      h: 0.25,
      fontSize: 11,
      fontFace: 'Calibri',
      color: colors.caramelo_claro,
      align: 'left'
    });
    y += 0.35;
  });

  // Footer
  addFooter(slide, 'Luiza Britto · Projeto Aplicado em Sustentabilidade — Insper · 2026', colors.gold);

  // Hero photo - LARGE
  if (fs.existsSync('fotos/cachorro.jpg')) {
    slide.addImage({
      path: 'fotos/cachorro.jpg',
      x: 5.3,
      y: 0.3,
      w: 4.2,
      h: 5.1,
      sizing: { type: 'cover', w: 4.2, h: 5.1 }
    });

    // Subtle overlay for text legibility
    slide.addShape(prs.ShapeType.rect, {
      x: 5.3,
      y: 0.3,
      w: 4.2,
      h: 2.0,
      fill: { color: colors.espresso, transparency: 70 },
      line: { type: 'none' }
    });
  }
}

// ======================
// SLIDE 2: PROBLEMA SISTÊMICO
// ======================
function slide2() {
  const slide = createSlide('output/backgrounds/light_base.png');

  addKicker(slide, '01 — PROBLEMA SISTÊMICO', { color: colors.caramelo });
  addTitle(slide, 'O problema não é estético. É sistêmico.', {
    y: 0.7,
    w: 9,
    h: 1.3,
    fontSize: 44,
    color: colors.tinta
  });

  slide.addText('Três óticas que se conectam — desejo, uso diário e descarte urbano de material.', {
    x: 0.5,
    y: 2.05,
    w: 9,
    h: 0.7,
    fontSize: 13,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left',
    wrap: true
  });

  // Three columns
  const col_x = [0.5, 3.5, 6.5];
  const col_labels = ['O tutor', 'O pet', 'A cidade'];
  const col_texts = [
    'Não quer esconder o objeto pet — quer um móvel que combine com a casa.',
    'Usa a peça todos os dias, por horas. Conforto, higiene e acesso não são opcionais.',
    'Descarta madeira maciça de boa qualidade como resíduo, sem rota clara de reuso.'
  ];
  const col_keywords = ['frágil · feio · difícil de manter', '12–16 h/dia em descanso', 'resíduo volumoso sem reaproveitamento'];

  col_x.forEach((x, i) => {
    // Label
    slide.addText(col_labels[i], {
      x: x,
      y: 2.85,
      w: 2.8,
      h: 0.35,
      fontSize: 13,
      bold: true,
      fontFace: 'Calibri',
      color: colors.tinta,
      align: 'left'
    });

    // Divider
    slide.addShape(prs.ShapeType.rect, {
      x: x,
      y: 3.22,
      w: 2.8,
      h: 0.02,
      fill: { color: colors.caramelo },
      line: { type: 'none' }
    });

    // Text
    slide.addText(col_texts[i], {
      x: x,
      y: 3.35,
      w: 2.8,
      h: 1.3,
      fontSize: 11,
      fontFace: 'Calibri',
      color: colors.tinta,
      align: 'left',
      valign: 'top'
    });

    // Keywords
    slide.addText(col_keywords[i], {
      x: x,
      y: 4.7,
      w: 2.8,
      h: 0.4,
      fontSize: 10,
      italic: true,
      fontFace: 'Calibri',
      color: colors.cinza_quente,
      align: 'left'
    });
  });

  // Strategic bar
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 5.15,
    w: 9,
    h: 0.5,
    fill: { color: colors.oliva },
    line: { type: 'none' }
  });

  slide.addText('Mercado pet: 2º maior do mundo, ~R$ 76 bi/ano. Grande — porém dominado por produtos de baixa durabilidade, difícil reparo e estética que não conversa com a casa.', {
    x: 0.7,
    y: 5.2,
    w: 8.6,
    h: 0.4,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.off_white,
    align: 'left',
    valign: 'middle'
  });
}

// ======================
// SLIDE 3: PÚBLICO-ALVO
// ======================
function slide3() {
  const slide = createSlide('output/backgrounds/light_base.png');

  addKicker(slide, '02 — PÚBLICO-ALVO', { color: colors.caramelo });
  addTitle(slide, 'Para casas onde o pet também habita o design.', {
    y: 0.8,
    fontSize: 44,
    color: colors.tinta
  });

  // Left: Persona primária
  slide.addText('PERSONA PRIMÁRIA', {
    x: 0.5,
    y: 1.6,
    w: 0.03,
    h: 0.5,
    fontSize: 11,
    bold: true,
    color: colors.caramelo,
    charSpacing: 2
  });

  // Vertical divider
  slide.addShape(prs.ShapeType.rect, {
    x: 1.0,
    y: 1.55,
    w: 0.04,
    h: 3.3,
    fill: { color: colors.caramelo },
    line: { type: 'none' }
  });

  slide.addText('Tutor urbano consciente', {
    x: 1.4,
    y: 1.55,
    w: 3.5,
    h: 0.4,
    fontSize: 18,
    bold: true,
    fontFace: 'Cambria',
    color: colors.tinta,
    align: 'left'
  });

  slide.addText('28–50 anos · classe média-alta · capitais e regiões metropolitanas', {
    x: 1.4,
    y: 2.0,
    w: 3.5,
    h: 0.4,
    fontSize: 12,
    italic: true,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  const persona_points = [
    'Valoriza peças com história — aceita a pátina como narrativa, não defeito.',
    'Quer design que conversa com a casa, não um objeto que ela esconde.',
    'Paga mais por durabilidade, origem e reparabilidade.'
  ];

  let y = 2.5;
  persona_points.forEach(point => {
    slide.addText('• ' + point, {
      x: 1.4,
      y: y,
      w: 3.5,
      h: 0.8,
      fontSize: 11,
      fontFace: 'Calibri',
      color: colors.tinta,
      align: 'left',
      valign: 'top'
    });
    y += 0.85;
  });

  // Right: Also reaches
  slide.addText('TAMBÉM ALCANÇA', {
    x: 5.2,
    y: 1.55,
    w: 4.3,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: colors.caramelo,
    charSpacing: 2
  });

  const segments = [
    { name: 'Arquitetos & designers de interiores', desc: 'especificam peças únicas, com pátina e origem.' },
    { name: 'Lojas de design & curadorias', desc: 'produto com narrativa de sustentabilidade verificável.' },
    { name: 'Economia circular urbana', desc: 'condomínios, ecopontos e cooperativas de catadores.' }
  ];

  y = 2.1;
  segments.forEach(seg => {
    slide.addText(seg.name, {
      x: 5.2,
      y: y,
      w: 4.3,
      h: 0.25,
      fontSize: 12,
      bold: true,
      fontFace: 'Calibri',
      color: colors.tinta,
      align: 'left'
    });

    slide.addText(seg.desc, {
      x: 5.2,
      y: y + 0.3,
      w: 4.3,
      h: 0.4,
      fontSize: 11,
      fontFace: 'Calibri',
      color: colors.cinza_quente,
      align: 'left'
    });

    y += 1.0;
  });
}

// ======================
// SLIDE 4: VALIDAÇÃO
// ======================
function slide4() {
  const slide = createSlide('output/backgrounds/light_base.png');

  addKicker(slide, '03 — VALIDAÇÃO EM CAMPO', { color: colors.caramelo });
  addTitle(slide, 'O que ouvimos em campo.', {
    y: 0.8,
    fontSize: 44,
    color: colors.tinta
  });

  slide.addText('6 entrevistas com público-alvo e especialistas — tutores, catadores, marceneiros, veterinários e lojistas.', {
    x: 0.5,
    y: 1.45,
    w: 9,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  // Three quotes
  const quotes = [
    { text: '"Se parecer móvel, eu deixo na sala."', attr: 'TUTOR · ENTREVISTA' },
    { text: '"Lavável não é diferencial. É requisito."', attr: 'SÍNTESE DAS ENTREVISTAS' },
    { text: '"Madeira reaproveitada precisa vir com protocolo."', attr: 'ESPECIALISTA · MARCENEIRO / VETERINÁRIO' }
  ];

  let y = 2.15;
  quotes.forEach((q, i) => {
    if (i > 0) {
      slide.addShape(prs.ShapeType.rect, {
        x: 0.5,
        y: y - 0.15,
        w: 9,
        h: 0.02,
        fill: { color: colors.caramelo },
        line: { type: 'none' }
      });
      y += 0.15;
    }

    // Quote text
    slide.addText(q.text, {
      x: 0.8,
      y: y,
      w: 8.5,
      h: 0.6,
      fontSize: 18,
      italic: true,
      fontFace: 'Cambria',
      color: colors.caramelo,
      align: 'left',
      valign: 'top'
    });

    // Attribution
    slide.addText(q.attr, {
      x: 0.8,
      y: y + 0.65,
      w: 8.5,
      h: 0.25,
      fontSize: 11,
      bold: true,
      fontFace: 'Calibri',
      color: colors.cinza_quente,
      align: 'left',
      charSpacing: 1
    });

    y += 1.15;
  });
}

// ======================
// SLIDE 5: PRODUTO COMO SISTEMA
// ======================
function slide5() {
  const slide = createSlide('output/backgrounds/dark_center.png');

  // Premium kicker - GOLD
  slide.addText('MEET THE PRODUCT', {
    x: 0.5,
    y: 0.4,
    w: 4.8,
    h: 0.3,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.gold,
    align: 'left',
    charSpacing: 2
  });

  // Hero title with line break
  slide.addText('Cadeira Beni.\nA System.', {
    x: 0.5,
    y: 0.85,
    w: 4.8,
    h: 1.2,
    fontSize: 52,
    bold: true,
    fontFace: 'Cambria',
    color: colors.off_white,
    align: 'left',
    valign: 'top',
    wrap: false
  });

  // Gold accent line
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 2.15,
    w: 1.8,
    h: 0.03,
    fill: { color: colors.gold },
    line: { type: 'none' }
  });

  // Premium tagline
  slide.addText('Design that lasts. Furniture that evolves.', {
    x: 0.5,
    y: 2.3,
    w: 4.5,
    h: 0.5,
    fontSize: 14,
    italic: true,
    fontFace: 'Cambria',
    color: colors.caramelo_claro,
    align: 'left'
  });

  // Refined features with diamond bullets
  const features = [
    'Reclaimed wood — zero new materials',
    'Replaceable bamboo legs — modularity by design',
    'Removable linen cushion — washable every week',
    'Desmontável — repaired, never discarded',
    'Elevated platform — comfort and ventilation',
    'Designed for the circular cycle'
  ];

  let y = 2.95;
  features.forEach(feature => {
    slide.addText('◆ ' + feature, {
      x: 0.5,
      y: y,
      w: 4.5,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Calibri',
      color: colors.off_white,
      align: 'left'
    });
    y += 0.38;
  });

  // Right side: Photo with gold border frame
  if (fs.existsSync('fotos/produto.jpg')) {
    // Gold border/frame
    slide.addShape(prs.ShapeType.rect, {
      x: 5.15,
      y: 0.35,
      w: 4.35,
      h: 5.15,
      fill: { color: colors.gold },
      line: { type: 'none' }
    });

    // Photo inside frame (with 15px gold border)
    slide.addImage({
      path: 'fotos/produto.jpg',
      x: 5.3,
      y: 0.5,
      w: 4.2,
      h: 5,
      sizing: { type: 'cover', w: 4.2, h: 5 }
    });
  }
}

// ======================
// SLIDE 6: PROTÓTIPO FÍSICO
// ======================
function slide6() {
  const slide = createSlide('output/backgrounds/light_base.png');

  addKicker(slide, '05 — PROTÓTIPO FÍSICO', { color: colors.caramelo });
  addTitle(slide, 'Do laboratório ao uso real.', {
    y: 0.8,
    fontSize: 44,
    color: colors.tinta
  });

  // Left: three points
  const points = [
    'Plataforma elevada — ventilação e acesso fácil para o pet.',
    'Pernas de bambu padronizadas — substituíveis e moduláveis.',
    'Estrutura desmontável — manutenção e reparo sem descarte.'
  ];

  let y = 1.6;
  points.forEach(point => {
    slide.addText('• ' + point, {
      x: 0.5,
      y: y,
      w: 3.8,
      h: 0.65,
      fontSize: 12,
      fontFace: 'Calibri',
      color: colors.tinta,
      align: 'left',
      valign: 'top'
    });
    y += 0.78;
  });

  // Callout box
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 4.0,
    w: 3.8,
    h: 0.02,
    fill: { color: colors.oliva },
    line: { type: 'none' }
  });

  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 4.0,
    w: 3.8,
    h: 1.0,
    fill: { color: colors.bege_pedra },
    line: { type: 'none' }
  });

  slide.addText('VALIDADO EM USO REAL', {
    x: 0.7,
    y: 4.05,
    w: 3.4,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: colors.oliva,
    charSpacing: 1
  });

  slide.addText('Teste em uso real: o pet sobe, permanece e desce sozinho. Estrutura estável — sem rangido, deslocamento ou deformação visível.', {
    x: 0.7,
    y: 4.35,
    w: 3.4,
    h: 0.55,
    fontSize: 11,
    fontFace: 'Calibri',
    color: colors.tinta,
    align: 'left',
    valign: 'top'
  });

  // Right: Photos
  if (fs.existsSync('fotos/construcao.jpg')) {
    slide.addImage({
      path: 'fotos/construcao.jpg',
      x: 4.6,
      y: 1.5,
      w: 4.9,
      h: 3.2,
      sizing: { type: 'cover', w: 4.9, h: 3.2 }
    });
  }

  if (fs.existsSync('fotos/bancada.jpg')) {
    slide.addImage({
      path: 'fotos/bancada.jpg',
      x: 4.6,
      y: 4.85,
      w: 2.0,
      h: 0.65,
      sizing: { type: 'cover', w: 2.0, h: 0.65 }
    });
  }

  // Captions
  slide.addText('Construção no laboratório — encaixes, colagem e prensagem', {
    x: 4.6,
    y: 4.75,
    w: 4.9,
    h: 0.25,
    fontSize: 9,
    italic: true,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  slide.addText('Protótipo na bancada', {
    x: 6.7,
    y: 5.05,
    w: 2.8,
    h: 0.2,
    fontSize: 9,
    italic: true,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });
}

// ======================
// SLIDE 7: PROTÓTIPO DIGITAL
// ======================
function slide7() {
  const slide = createSlide('output/backgrounds/dark_diagram.png');

  // Premium gold kicker
  slide.addText('THE DIGITAL PROTOTYPE', {
    x: 0.5,
    y: 0.4,
    w: 4.3,
    h: 0.3,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.gold,
    align: 'left',
    charSpacing: 2
  });

  addTitle(slide, 'A Cadeira Beni como sistema de partes.', {
    x: 0.5,
    y: 1.15,
    w: 4.3,
    fontSize: 40,
    color: colors.off_white
  });

  // Intro
  slide.addText('O modelo digital trata a Beni como um conjunto modular — não uma peça única.', {
    x: 0.5,
    y: 1.85,
    w: 4.3,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Calibri',
    color: colors.off_white,
    align: 'left'
  });

  // Bullets
  const bullets = [
    'Dimensiona encaixes e valida a montagem antes de cortar a madeira.',
    'Testa a substituição de componentes — sobretudo a troca das pernas.',
    'Documenta a montagem para reprodução, manutenção e reparo.'
  ];

  let y = 2.35;
  bullets.forEach(bullet => {
    slide.addText('• ' + bullet, {
      x: 0.5,
      y: y,
      w: 4.3,
      h: 0.6,
      fontSize: 11,
      fontFace: 'Calibri',
      color: colors.caramelo_claro,
      align: 'left',
      valign: 'top'
    });
    y += 0.75;
  });

  // Placeholder
  slide.addText('[Render 3D / documentação digital → inserir link]', {
    x: 0.5,
    y: 4.65,
    w: 4.3,
    h: 0.4,
    fontSize: 12,
    italic: true,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  // Right: Exploded view (simplified diagram)
  drawExplodedView(slide);
}

function drawExplodedView(slide) {
  const cx = 7.5;
  const cy = 2.5;

  // Central dotted axis
  slide.addShape(prs.ShapeType.line, {
    x: cx,
    y: cy - 1.8,
    w: 0,
    h: 3.6,
    line: { color: colors.cinza_quente, dashType: 'dash' }
  });

  // Parts (simplified as rectangles with labels)
  const parts = [
    { label: '1. Almofada removível e lavável', y: cy - 1.5, color: colors.bege_pedra },
    { label: '2. Proteção lateral (grades)', y: cy - 0.8, color: colors.caramelo },
    { label: '3. Plataforma — madeira reaproveitada', y: cy + 0.0, color: colors.caramelo_escuro },
    { label: '4. Encaixes', y: cy + 0.8, color: colors.cinza_quente },
    { label: '5. 4 pernas de bambu — substituíveis', y: cy + 1.5, color: colors.caramelo_claro }
  ];

  parts.forEach((part, i) => {
    // Draw part box
    slide.addShape(prs.ShapeType.rect, {
      x: cx - 1.0,
      y: part.y - 0.15,
      w: 2.0,
      h: 0.3,
      fill: { color: part.color },
      line: { type: 'none' }
    });

    // Draw line to label
    slide.addShape(prs.ShapeType.line, {
      x: cx + 1.0,
      y: part.y,
      w: 0.5,
      h: 0,
      line: { color: colors.cinza_quente }
    });

    // Label
    slide.addText(part.label, {
      x: cx + 1.6,
      y: part.y - 0.15,
      w: 2.3,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Calibri',
      color: colors.off_white,
      align: 'left',
      valign: 'middle'
    });
  });
}

// ======================
// SLIDE 8: ECONOMIA CIRCULAR
// ======================
function slide8() {
  const slide = createSlide('output/backgrounds/light_base.png');

  addKicker(slide, '07 — ECONOMIA CIRCULAR · CICLO DE VIDA', { color: colors.caramelo });
  addTitle(slide, 'Desenhada para voltar ao ciclo.', {
    y: 0.8,
    fontSize: 44,
    color: colors.tinta
  });

  slide.addText('Da madeira recuperada ao retorno ao ciclo produtivo — um circuito fechado urbano.', {
    x: 0.5,
    y: 1.45,
    w: 9,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  // Cycle flow (7 nodes horizontal)
  const nodes = [
    'Coleta',
    'Triagem',
    'Sanitização*',
    'Produção',
    'Uso',
    'Reparo',
    'Retorno'
  ];

  const nodeX = [0.7, 1.95, 3.2, 4.45, 5.7, 6.95, 8.2];
  const nodeY = 2.3;
  const nodeRadius = 0.25;

  // Draw nodes and connections
  nodeX.forEach((x, i) => {
    const color = i === 2 ? colors.oliva : colors.caramelo; // Sanitization highlighted

    // Circle node
    slide.addShape(prs.ShapeType.ellipse, {
      x: x - nodeRadius / 2,
      y: nodeY - nodeRadius / 2,
      w: nodeRadius,
      h: nodeRadius,
      fill: { color: color },
      line: { color: color }
    });

    // Label below
    slide.addText(nodes[i], {
      x: x - 0.45,
      y: nodeY + 0.3,
      w: 0.9,
      h: 0.3,
      fontSize: 10,
      bold: i === 2,
      fontFace: 'Calibri',
      color: i === 2 ? colors.oliva : colors.tinta,
      align: 'center'
    });

    // Connection line to next
    if (i < nodeX.length - 1) {
      slide.addShape(prs.ShapeType.line, {
        x: x + nodeRadius / 2,
        y: nodeY,
        w: nodeX[i + 1] - x - nodeRadius / 2,
        h: 0,
        line: { color: colors.cinza_quente }
      });
    }
  });

  // *Etapa-chave annotation
  slide.addText('*ETAPA-CHAVE', {
    x: 3.0,
    y: 2.85,
    w: 0.8,
    h: 0.25,
    fontSize: 9,
    bold: true,
    fontFace: 'Calibri',
    color: colors.oliva,
    align: 'center'
  });

  // Reverse arrow (logística reversa)
  slide.addShape(prs.ShapeType.line, {
    x: 0.7,
    y: 3.1,
    w: 0,
    h: 0.5,
    line: { color: colors.caramelo }
  });

  // Arrow marker
  slide.addText('↺', {
    x: 0.5,
    y: 3.3,
    w: 0.4,
    h: 0.3,
    fontSize: 24,
    color: colors.caramelo,
    align: 'center'
  });

  slide.addText('Logística reversa / take-back — a madeira recuperada volta como nova Beni.', {
    x: 0.5,
    y: 3.7,
    w: 3.0,
    h: 0.5,
    fontSize: 11,
    fontFace: 'Calibri',
    color: colors.tinta,
    align: 'left'
  });

  // Bottom note
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 4.5,
    w: 0.6,
    h: 0.02,
    fill: { color: colors.caramelo },
    line: { type: 'none' }
  });

  slide.addText('A circularidade não termina na venda: a Beni foi pensada para manutenção, reparo e retorno da madeira ao ciclo.', {
    x: 0.5,
    y: 4.65,
    w: 9,
    h: 0.6,
    fontSize: 12,
    italic: true,
    fontFace: 'Calibri',
    color: colors.tinta,
    align: 'left'
  });
}

// ======================
// SLIDE 9: PROCESSO V1→V2
// ======================
function slide9() {
  const slide = createSlide('output/backgrounds/light_base.png');

  addKicker(slide, '08 — PROCESSO PRODUTIVO', { color: colors.caramelo });
  addTitle(slide, 'O material decidiu o design.', {
    y: 0.8,
    fontSize: 44,
    color: colors.tinta
  });

  slide.addText('A tensão entre usuário (durável, reparável), material (densidade variável) e tempo de laboratório.', {
    x: 0.5,
    y: 1.45,
    w: 9,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  // V1: Left side
  const v1_x = 1.0;
  const v2_x = 5.5;
  const photo_y = 2.0;
  const photo_h = 2.3;

  // V1 Badge
  slide.addShape(prs.ShapeType.rect, {
    x: v1_x,
    y: photo_y - 0.25,
    w: 0.6,
    h: 0.25,
    fill: { color: colors.caramelo },
    line: { type: 'none' }
  });

  slide.addText('V1', {
    x: v1_x,
    y: photo_y - 0.25,
    w: 0.6,
    h: 0.25,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.off_white,
    align: 'center',
    valign: 'middle'
  });

  // V1 Photo
  if (fs.existsSync('fotos/v1_marchetaria.jpg')) {
    slide.addImage({
      path: 'fotos/v1_marchetaria.jpg',
      x: v1_x,
      y: photo_y,
      w: 3.0,
      h: photo_h,
      sizing: { type: 'cover', w: 3.0, h: photo_h }
    });
  }

  // V1 Text
  slide.addText('Pés quadrados em marchetaria', {
    x: v1_x,
    y: photo_y + photo_h + 0.1,
    w: 3.0,
    h: 0.3,
    fontSize: 13,
    bold: true,
    fontFace: 'Calibri',
    color: colors.tinta,
    align: 'left'
  });

  slide.addText('Baixa precisão, densidades variáveis e difícil padronização.', {
    x: v1_x,
    y: photo_y + photo_h + 0.4,
    w: 3.0,
    h: 0.5,
    fontSize: 11,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });

  // Arrow
  slide.addText('→', {
    x: 4.2,
    y: photo_y + photo_h / 2 - 0.15,
    w: 0.5,
    h: 0.3,
    fontSize: 20,
    color: colors.caramelo,
    align: 'center'
  });

  // V2: Right side
  // V2 Badge
  slide.addShape(prs.ShapeType.rect, {
    x: v2_x,
    y: photo_y - 0.25,
    w: 0.6,
    h: 0.25,
    fill: { color: colors.oliva },
    line: { type: 'none' }
  });

  slide.addText('V2', {
    x: v2_x,
    y: photo_y - 0.25,
    w: 0.6,
    h: 0.25,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.off_white,
    align: 'center',
    valign: 'middle'
  });

  // V2 Photo
  if (fs.existsSync('fotos/v2_bambu.jpg')) {
    slide.addImage({
      path: 'fotos/v2_bambu.jpg',
      x: v2_x,
      y: photo_y,
      w: 3.0,
      h: photo_h,
      sizing: { type: 'cover', w: 3.0, h: photo_h }
    });
  }

  // V2 Text
  slide.addText('Estacas de bambu', {
    x: v2_x,
    y: photo_y + photo_h + 0.1,
    w: 3.0,
    h: 0.3,
    fontSize: 13,
    bold: true,
    fontFace: 'Calibri',
    color: colors.tinta,
    align: 'left'
  });

  slide.addText('Pernas substituíveis, modulares e fáceis de reproduzir.', {
    x: v2_x,
    y: photo_y + photo_h + 0.4,
    w: 3.0,
    h: 0.5,
    fontSize: 11,
    fontFace: 'Calibri',
    color: colors.cinza_quente,
    align: 'left'
  });
}

// ======================
// SLIDE 10: FECHAMENTO
// ======================
function slide10() {
  const slide = createSlide('output/backgrounds/dark_center.png');

  // Premium gold kicker
  slide.addText('CIRCULAR FURNITURE FOR THE DISCERNING PET', {
    x: 0.5,
    y: 0.4,
    w: 4.8,
    h: 0.3,
    fontSize: 11,
    bold: true,
    fontFace: 'Calibri',
    color: colors.gold,
    align: 'left',
    charSpacing: 2
  });

  // Hero title
  slide.addText('Cadeira Beni', {
    x: 0.5,
    y: 0.85,
    w: 4.8,
    h: 1.0,
    fontSize: 76,
    bold: true,
    fontFace: 'Cambria',
    color: colors.off_white,
    align: 'left',
    valign: 'top',
    wrap: false
  });

  // Gold accent line
  slide.addShape(prs.ShapeType.rect, {
    x: 0.5,
    y: 2.0,
    w: 2.0,
    h: 0.03,
    fill: { color: colors.gold },
    line: { type: 'none' }
  });

  // Premium tagline
  slide.addText('Furniture made to last, repair, and return.', {
    x: 0.5,
    y: 2.2,
    w: 4.5,
    h: 0.5,
    fontSize: 16,
    italic: true,
    fontFace: 'Cambria',
    color: colors.caramelo_claro,
    align: 'left'
  });

  // Core promise
  const promises = [
    'Reclaimed wood dignified — never forgotten',
    'Designed for repair, not replacement',
    'Your home, elevated'
  ];

  let y = 2.9;
  promises.forEach(promise => {
    slide.addText('• ' + promise, {
      x: 0.5,
      y: y,
      w: 4.5,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Calibri',
      color: colors.off_white,
      align: 'left'
    });
    y += 0.42;
  });

  // CTA + footer
  slide.addText('Join the circular furniture movement.', {
    x: 0.5,
    y: 4.1,
    w: 4,
    h: 0.4,
    fontSize: 13,
    bold: true,
    fontFace: 'Calibri',
    color: colors.gold,
    align: 'left'
  });

  // Footer
  addFooter(slide, 'Luiza Britto · Projeto Aplicado em Sustentabilidade — Insper · 2026', colors.gold);

  // Right: Photo with gold frame
  if (fs.existsSync('fotos/produto.jpg')) {
    // Gold border/frame
    slide.addShape(prs.ShapeType.rect, {
      x: 5.15,
      y: 0.35,
      w: 4.35,
      h: 5.15,
      fill: { color: colors.gold },
      line: { type: 'none' }
    });

    // Photo inside frame
    slide.addImage({
      path: 'fotos/produto.jpg',
      x: 5.3,
      y: 0.5,
      w: 4.2,
      h: 5,
      sizing: { type: 'cover', w: 4.2, h: 5 }
    });
  }
}

// ======================
// BUILD
// ======================

console.log('Building Cadeira Beni pitch deck...\n');

console.log('Generating slides:');
console.log('  01 — Capa (Cover)');
slide1();

console.log('  02 — Problema Sistêmico');
slide2();

console.log('  03 — Público-alvo');
slide3();

console.log('  04 — Validação em campo');
slide4();

console.log('  05 — Produto como sistema');
slide5();

console.log('  06 — Protótipo físico');
slide6();

console.log('  07 — Protótipo digital');
slide7();

console.log('  08 — Economia circular');
slide8();

console.log('  09 — Processo V1→V2');
slide9();

console.log('  10 — Fechamento');
slide10();

console.log('\n✓ Saving PPTX...');
prs.writeFile({ fileName: 'output/cadeira_beni_pitch.pptx' });
console.log('✓ Pitch deck created: output/cadeira_beni_pitch.pptx\n');
