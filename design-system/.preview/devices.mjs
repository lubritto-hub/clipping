/* ===========================================================================
   SHARED VISUAL MACHINERY

   Both decks run on the same three signature devices and the same layer
   primitives. They differ only in REGISTER — the venture deck is blue-mint
   pearl, the PepsiCo deck is coconut green-brown — and a register is a set of
   colours, not a set of mechanisms.

   Keeping the devices here is the point: if the pore field or the thermal line
   is improved for one deck, the other inherits it. Two copies would have
   started diverging on the first fix.
   =========================================================================== */

/* Both decks render 16:9 plates at the same pixel size. */
const W = 2000, H = 1125;

const CSS = `
*{box-sizing:border-box;margin:0}
body{background:#888}
.plate{width:${W}px;height:${H}px;position:relative;overflow:hidden;isolation:isolate;
  background:var(--tc-palette-pearl-blue);
  font-family:Helvetica,Arial,"Liberation Sans",sans-serif}
.L{position:absolute;inset:0;pointer-events:none}

/* 2 — atmospheric masses. Always FIVE, always off-axis, always different
   radii. Four would resolve into a pattern; equal radii read as a blob. */
.atmos{filter:blur(3px)}
/* Palette for the masses. These are MID-TONES on purpose: near-whites layered
   over a pearl ground average back to the ground and the field disappears —
   which is exactly how a "soft gradient" becomes a flat pastel background. */


/* 3 — bloom / refraction. Screened so it only ever ADDS light. */
.bloom{mix-blend-mode:screen;opacity:.6;filter:blur(48px)}
.refract{background-image:var(--tc-gradient-prism);mix-blend-mode:screen;
  opacity:.34;filter:blur(70px) saturate(.8)}

/* 4 — the substrate. Fine enough to read as a scan, never as VHS. */
.grain{background-image:var(--tc-texture-grain);opacity:.28;mix-blend-mode:multiply}
.scan{background-image:repeating-linear-gradient(0deg,
  rgb(20 55 67 / 5%) 0 1px, transparent 1px 3px);opacity:.5}
.dither{background-image:var(--tc-texture-mineral);opacity:.06;mix-blend-mode:multiply}

/* 5 — objects */
.obj{position:absolute;overflow:hidden}
.obj img{width:100%;height:100%;object-fit:cover;display:block}

/* An optical halo: a thin ARC of light, not a ring. Two masks do the work —
   an elliptical annulus (so only the rim survives) and the conic gradient's
   own transparent sweep (so only part of that rim is lit). A full ring reads
   as a loading spinner; this reads as light grazing a curved surface. */
.arc{position:absolute;border-radius:50%;
  background:conic-gradient(from var(--a,200deg),
    transparent 0deg, var(--tc-optic-ice) 34deg, #ffffff 72deg,
    var(--tc-optic-mint) 112deg, var(--tc-optic-nacre) 148deg,
    var(--tc-optic-peach) 176deg, transparent 210deg);
  -webkit-mask:radial-gradient(transparent 0 98.4%, #000 98.9%, #000 100%);
  mask:radial-gradient(transparent 0 98.4%, #000 98.9%, #000 100%);
  filter:blur(var(--ab,1px)) saturate(1.15)}
/* The same arc, wide and soft: the bloom the hard arc throws. */
.arc--glow{-webkit-mask:radial-gradient(transparent 0 92%, #000 97%, #000 100%);
  mask:radial-gradient(transparent 0 92%, #000 97%, #000 100%);
  filter:blur(26px);opacity:.5}

/* Iridescence only ever appears on an EDGE, and only where a surface turns
   away from the light. A field of it is a rainbow gradient, which is the
   thing to avoid. */
.iri-edge{position:absolute;background:var(--tc-edge-iridescent);
  filter:blur(1.2px);opacity:.62}

/* A ghost numeral: too large, too faint, cut by the frame. Lives in the plate
   rather than the .pptx because it needs a gradient fade and a blur. */
.ghost{position:absolute;font-weight:200;letter-spacing:-.05em;line-height:.8;
  background:linear-gradient(178deg,
    rgb(122 168 201 / 30%) 0%, rgb(122 168 201 / 13%) 52%, rgb(122 168 201 / 0%) 92%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:blur(1.4px)}
.ghost--deep{background:linear-gradient(178deg,
  rgb(151 220 199 / 26%) 0%, rgb(151 220 199 / 8%) 60%, transparent 95%)}

/* A hairline that carries meaning: an axis, a baseline, a capacity line. */
.rule{position:absolute;height:1px;background:rgb(91 138 174 / 42%)}
.rule--v{width:1px;height:auto}
.tick{position:absolute;width:1px;background:rgb(91 138 174 / 55%)}
.node{position:absolute;border-radius:50%;
  box-shadow:0 0 0 1px rgb(31 115 112 / 55%), 0 0 26px 6px rgb(53 176 202 / 26%);
  background:radial-gradient(circle at 34% 30%, #fff 0%, var(--tc-optic-ice) 60%, var(--tc-palette-cyan-300) 100%)}

/* A material crop. Always cut by something — the frame, or another plane —
   and always dissolving on at least one edge. A rectangle with four hard
   edges floating in a field reads as a pasted image, which is the single
   clearest tell of a template. */
.crop{position:absolute;overflow:hidden}
.crop img{width:100%;height:100%;object-fit:cover;display:block}
.crop--soft img{filter:blur(3px) saturate(.9)}
.crop--far img{filter:blur(18px) saturate(.7);opacity:.62}
.fade-r{-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 52%,transparent 100%);
  mask-image:linear-gradient(90deg,#000 0%,#000 52%,transparent 100%)}
.fade-l{-webkit-mask-image:linear-gradient(270deg,#000 0%,#000 52%,transparent 100%);
  mask-image:linear-gradient(270deg,#000 0%,#000 52%,transparent 100%)}
.fade-b{-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 46%,transparent 100%);
  mask-image:linear-gradient(180deg,#000 0%,#000 46%,transparent 100%)}
.fade-t{-webkit-mask-image:linear-gradient(0deg,#000 0%,#000 46%,transparent 100%);
  mask-image:linear-gradient(0deg,#000 0%,#000 46%,transparent 100%)}
.fade-o{-webkit-mask-image:radial-gradient(72% 72% at 42% 40%,#000 42%,transparent 100%);
  mask-image:radial-gradient(72% 72% at 42% 40%,#000 42%,transparent 100%)}

/* Translucent strata — overlapping planes of light, for the layered slides. */
.stratum{position:absolute;backdrop-filter:blur(14px) saturate(1.3);
  border-top:1px solid rgb(255 255 255 / 75%)}
`;
/* Five atmospheric masses. Radii, positions and colours all differ; nothing
   is centred, because 50% is banned anywhere that describes light. */
function atmos(seedSet) {
  const g = seedSet.map(([x, y, rx, ry, c, a]) =>
    `radial-gradient(${rx}% ${ry}% at ${x}% ${y}%, ${c} 0%, transparent 70%)`).join(',');
  const op = seedSet.map(s => s[5]);
  return `<div class="L atmos" style="background-image:${g};opacity:${Math.max(...op)}"></div>`;
}

/* ===========================================================================
   SIGNATURE DEVICES

   Three, and only three. Each one is derived from something real in the
   system, which is the whole point: a sphere or a blob could belong to any
   company, and a pore field could not.

     A · PORE FIELD    the actual porous structure of biochar. Used as
                       texture, as data points, and — critically — as a
                       DENSITY ENCODING: more pores means more unresolved
                       uncertainty. It thins out as risk closes.

     B · THERMAL LINE  the pyrolysis temperature curve, reduced to a single
                       spectral line. Used as axis, threshold scale, gate
                       progression and trajectory. It is the only place in
                       the system where warm colour is allowed to travel.

     C · MEMBRANE      a translucent plane you cross and cannot recross.
                       Permanence, the reactor's zones, and a gate are all
                       the same object seen from different angles.

   Everything graphic in the deck is built from these three. Nothing else
   gets invented per slide.
   =========================================================================== */

/* Deterministic PRNG so a plate renders identically every build. */
function rng(seed) {
  let x = seed >>> 0;
  return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/* A — PORE FIELD. `density` 0..1 drives count, size AND irregularity, because
   a field that only loses count reads as the same material sampled less, not
   as a material resolving.

   The cells are irregular polygons, not circles. Biochar under magnification
   is a honeycomb of collapsed plant cell walls — angular, uneven, elongated
   along the grain. Circles read as foam or champagne, which is exactly what
   the first attempt looked like. */
function pores(seed, w, h, density = 1, tint = 'rgb(20 55 67', maxR = 26, mode = 'void') {
  const r = rng(seed);
  const n = Math.round(90 * density);
  const out = [];
  for (let i = 0; i < n; i++) {
    const cx = r() * w, cy = r() * h;
    const rad = Math.max(2.2, (0.28 + r() * 0.72) * maxR * (0.5 + density * 0.5));
    const ecc = 0.55 + r() * 0.85;              // cells elongate along the grain
    const rot = (r() - 0.5) * 0.7;              // but only roughly align
    const sides = 5 + Math.floor(r() * 4);
    const pts = [];
    for (let k = 0; k < sides; k++) {
      const a = (k / sides) * Math.PI * 2 + rot;
      const rr = rad * (0.72 + r() * 0.5);
      pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr * ecc).toFixed(1)}`);
    }
    const o = (0.14 + r() * 0.4) * (0.45 + density * 0.55);
    // Two modes, because a pore is defined by contrast with its ground:
    //   void — a dark cavity on a bright material (the light registers)
    //   lit  — an opening letting light THROUGH a backlit membrane (the deep
    //          register). Dark cells on a dark ground are simply invisible,
    //          which left the first attempt showing only stray white marks.
    const fill = mode === 'lit'
      ? `rgb(214 244 236 / ${(o * 62).toFixed(0)}%)`
      : `${tint} / ${(o * 100).toFixed(0)}%)`;
    out.push(`<polygon points="${pts.join(' ')}" fill="${fill}"/>`);
    if (rad > 5) {
      const half = pts.slice(0, Math.ceil(sides / 2) + 1).join(' L');
      const stroke = mode === 'lit'
        ? `rgb(255 255 255 / ${(o * 120).toFixed(0)}%)`
        : `rgb(255 255 255 / ${(o * 175).toFixed(0)}%)`;
      out.push(`<path d="M${half}" fill="none" stroke="${stroke}"`
        + ` stroke-width="${Math.max(0.7, rad * 0.1).toFixed(1)}" stroke-linejoin="round"/>`);
    }
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0">${out.join('')}</svg>`;
}

/* B — THERMAL LINE. One stroke, spectral along its length: cool where the
   process starts, warm through pyrolysis, cool again once the carbon is
   fixed. It is a temperature curve doing the job of an axis. */
function thermal(id, d, width = 2, opacity = 1, glow = true, warmAt = 74) {
  return `<svg style="position:absolute;inset:0;width:100%;height:100%" fill="none" preserveAspectRatio="none">
    <defs>
      <linearGradient id="th${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(122 168 201 / 70%)"/>
        <stop offset="${Math.max(4, warmAt - 34)}%" stop-color="rgb(53 176 202 / 95%)"/>
        <stop offset="${Math.max(8, warmAt - 16)}%" stop-color="rgb(151 220 199 / 98%)"/>
        <stop offset="${warmAt}%" stop-color="rgb(240 161 132 / 95%)"/>
        <stop offset="${Math.min(96, warmAt + 18)}%" stop-color="rgb(151 220 199 / 80%)"/>
        <stop offset="100%" stop-color="rgb(122 168 201 / 60%)"/></linearGradient>
      <filter id="tg${id}"><feGaussianBlur stdDeviation="7"/></filter>
    </defs>
    ${glow ? `<path d="${d}" stroke="url(#th${id})" stroke-width="${width * 6}" filter="url(#tg${id})" opacity="${opacity * 0.42}"/>` : ''}
    <path d="${d}" stroke="url(#th${id})" stroke-width="${width}" opacity="${opacity}"/>
  </svg>`;
}

/* C — MEMBRANE. A translucent plane with one lit leading edge. Crossing it is
   the event; the aperture is where something got through. */
function membrane(style, edge = 'left', tone = 'light') {
  const face = tone === 'deep'
    ? 'linear-gradient(158deg, rgb(151 220 199 / 9%), rgb(53 176 202 / 5%) 60%, rgb(151 220 199 / 3%))'
    : 'linear-gradient(158deg, rgb(255 255 255 / 62%), rgb(203 240 248 / 26%) 60%, rgb(206 192 235 / 18%))';
  const lit = tone === 'deep' ? 'rgb(151 220 199 / 62%)' : 'rgb(255 255 255 / 92%)';
  const e = { left: 'left:0;top:0;width:1.5px;height:100%', right: 'right:0;top:0;width:1.5px;height:100%',
              top: 'left:0;top:0;height:1.5px;width:100%' }[edge];
  return `<div style="position:absolute;${style};background:${face};
    backdrop-filter:blur(9px) saturate(1.2);overflow:hidden">
    <div style="position:absolute;${e};background:${lit}"></div></div>`;
}

/* The aperture: where the thermal line pierces a membrane. Not a dot — a
   bright opening with the membrane's own colour bleeding through it. */
const aperture = (x, y, r, tone = 'deep') => `<div style="position:absolute;left:${x};top:${y};
  width:${r}px;height:${r}px;margin:${-r / 2}px 0 0 ${-r / 2}px;border-radius:50%;
  background:radial-gradient(circle at 38% 34%, #fff 0%, ${tone === 'deep' ? 'var(--tc-palette-mint-300)' : 'var(--tc-optic-ice)'} 52%, transparent 100%);
  box-shadow:0 0 ${r * 1.6}px ${r * 0.4}px rgb(53 176 202 / ${tone === 'deep' ? 34 : 24}%)"></div>`;



export { W, H, CSS, atmos, rng, pores, thermal, membrane, aperture };
