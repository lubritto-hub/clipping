# Building with this system

A climate-infrastructure company built on **biochar**. There is **no name yet** —
the symbol carries the identity alone.

> **Sony 2001 × Apple Aqua × climate science × biochar materiality, for 2026.**
>
> This is **Y2K soft-tech editorial applied to a climate technology** — not a
> climate brand with a Y2K veneer. That order decides everything: light,
> refraction and optics come first, and the science reads *through* them.
>
> It should look like a technology company launched in Berlin, London or San
> Francisco that happens to work on carbon removal. Never an NGO, never an ESG
> consultancy, never a SaaS product.

## 0. The rule that outranks the others

**Flat is the failure state, and tidy is the second failure state.**

Secondary elements may sacrifice legibility to gain atmosphere — that is
deliberate and encoded (`data-register`, `weight="ambient"`, `--tc-artefact-gain`).
Primary content stays clear. A frame with no visible imperfection, no defocused
plane and no broken edge is not finished; it is a template.

Aim for roughly **60% brand/editorial, 40% product/data**. Sections 01–05 use
`Card surface="bare"`, `Rule` and `Canvas`; only the MRV/dashboard section uses
bordered cards, tables and forms.

## 1. Wrap in TerraCarbonProvider, then give the surface weather

```jsx
<TerraCarbonProvider theme="dark" grain wash leak fill>
  <App />
</TerraCarbonProvider>
```

- `theme`: `"dark"` (**the native register**), `"light"`, `"system"`.
- `grain` · `wash` · `leak` · `halo` — use `grain wash` on any large flat area.
- **Weather.** `data-weather` on any element re-aims every atmospheric plate
  inside it, so ground, figures and speculars share one light source:
  `kiln` (hot, low-right) · `blue-hour` (cold, high, raking) · `condensation`
  (diffuse, close, wet) · `cove` (bounced, off-canvas left).
  **Two adjacent sections must not share a condition.**
- **Artefact gain.** `data-artefact="loud"` makes the print/scan substrate
  visible; `"quiet"` pulls it back. Imperfection you cannot see is decoration.

## 2. Colour

| Family | Real names |
|---|---|
| **Two darks** | ground `--tc-palette-forest-970` (hue ~150) · surface `--tc-palette-petrol-900` (hue ~198). **Never collapse them** — a card floats by temperature, not elevation. |
| Material black | `--tc-palette-char-950`, `--tc-palette-char-gloss` (the cold specular that makes char a mineral, not charcoal) |
| Greens | `--tc-palette-sage-*` (greyed, ~7–11% sat), `--tc-palette-mineral-*` (deep teal). Never a saturated leaf green. |
| Cold flash | `--tc-palette-cyan-400`, `--tc-palette-cyan-glare` (blown-out core, glow only) |
| Ice / mist | `--tc-palette-ice-300`, `--tc-palette-mist-25/50` (green-cast off-white — **not** cream, **not** corporate white) |
| Nacre | `--tc-palette-nacre-400/500` — the iridescent pink at hue ~306 |
| Optical light | `--tc-optic-ice / -mint / -silver / -nacre / -peach` — colours *produced by light*, gradients and edges only |

**Green is a material, never a status.** `success`, positive deltas and
`verified` all resolve to cyan/ice. Green appears only through
`--tc-color-organic` and `--tc-color-mineral`.

**The nacre ration.** Pink/lilac: at most **one occurrence per frame**, never
above 18% alpha, always flanked by cool stops. It is jewellery; it stops working
the moment it becomes a theme colour. Warm (peach/flare) is rationed harder
still and never sits adjacent to nacre.

**No pure white, no pure black.** The lightest surface is `--tc-palette-mist-25`;
the darkest is `--tc-palette-char-950`. `#fff`/`#000` only inside masks.

**In the light register the accent is nearly as dark as the text**
(`--tc-color-accent: mineral-700`). If an accent could plausibly be a filled
primary button, it is a SaaS accent.

## 3. Light: hard, not just soft

A soft off-axis radial pool is the 2021 dark-mode default. Aqua, the MiniDisc
and the VAIO had **hard terminators and speculars**. Use both halves:

| Hard | `--tc-gel` (bright dome, hard terminator at the equator) · `--tc-specular-brushed` (anisotropic streak with a hard core) · `--tc-specular-edge` (the MiniDisc rim break — **one per frame**) |
|---|---|
| Soft | `--tc-ground` (four off-axis planes, two of them *removing* light) · `--tc-halo-behind` · `--tc-lightleak-*` · `--tc-gradient-caustic / -prism / -sheen` |

Utility classes: `.tc-ground` · `.tc-substrate` · `.tc-gel` · `.tc-spec-brushed`
· `.tc-spec-edge` · `.tc-fore` (the defocused foreground plane — **every
composition needs one**) · `.tc-thru--glass / --acrylic / --mist / --lens`
(photographed-through-a-medium, a container treatment, not a component).

**Depth is light, not shadow.** `box-shadow: var(--tc-bloom-md)` — never a grey
drop shadow.

## 4. Composition: `Canvas` + `Place`

```jsx
<Canvas rows={6} ground substrate
  frame={{ top: 'var(--tc-space-lg)', right: 'var(--tc-space-3xl)',
           bottom: 'var(--tc-space-2xl)', left: 'var(--tc-space-xs)' }}>
  <Place col={1} span={8} row={3} rowSpan={3} escape={['left']}>
    <Stat variant="crop" light="crossing" seed={3} note="foot"
          value="128,400" unit="tonnes of durable CO₂ removal · verified" />
  </Place>
  <Place col={9} span={4} row={6} align="end"><Spec items={spec} /></Place>
  <span className="tc-micro-edge tc-micro-edge--right">03 — impact</span>
</Canvas>
```

Rules, all enforceable:
- **Frame padding is never equal on four sides.** Light and heavy sides differ
  by at least two steps of the spacing scale.
- **One protagonist per frame** — a display headline *or* a numeral, never both.
  It takes ≥40% of the canvas and **breaks at least one edge** via `escape`.
- **≥14× scale contrast** between the largest and smallest type. Nothing in the
  middle of the scale.
- **Leave a quadrant empty** (≥3×4 cells).
- **One element outside the reading flow** — `.tc-micro-edge` up the frame edge,
  a caption in the numeral's counter-space.
- **`data-register`** is the legibility ladder: omit for primary (untouched),
  `secondary` (desaturated, 82%), `atmosphere` (40%, blurred, ultra-tracked —
  the only register allowed to be genuinely hard to read). `.tc-drift` rotation
  only takes effect on a demoted register; a drifted headline reads as a bug.

## 5. The numeral is the image

`<Stat variant="hero">` / `"crop"` are sized by the **frame** (`cqw`), not by
the type scale — if it does not occupy 30–50% of the frame it is not a hero.

- **`light`** — a number never glows without a source: `behind` (patch behind,
  glyph crisp) · `crossing` (trailing edge eaten and re-emitted as bloom) ·
  `through` (read through a body in front).
- **`seed` 1–5** moves the patch, mask angle and bloom together. **No two hero
  numbers in one deck share a seed.**
- **`note="foot" | "shoulder"`** — the unit is 8px, uppercase, ultra-tracked and
  **never on the numeral's baseline**. That arrangement is a financial terminal.
- Only the **trailing ~25%** may dissolve. Label, unit and caption stay crisp.

## 6. Photography: pick a register, never a filter

`<Figure register="char | plant | terrain | figures">` is the **first**
decision; `tone`, `focus`, `flash`, `chroma`, `smear`, `prism` are trim.

- **char** — biochar as a cut mineral: crushed blacks, one hard specular on a
  facet, dense mineral grain. Never sooty charcoal.
- **plant** — industry at blue hour: mist, backlight, lifted blacks, silhouettes,
  wide framing, pipework. Never a documentary factory photo.
- **terrain** — soil close-up, cropland from above, roots, biomass, condensation.
  Matter, never a landscape and never a seedling.
- **figures** — people in motion, blurred, never identifiable, never facing
  camera. Early-digital sensor structure. Never posed ESG.

`weight="lead | normal | ambient"` — at most **one `lead` per row**; the largest
figure in a composition should be the one out of focus; `ambient` is meant to be
barely readable. **Ratios in a row must differ by at least 2:1.** One veil per
composition (`prism`/`flash`/`chroma` are optics, not decoration).

## 7. Optical bodies

`<Glass orb pearl droplets />` is a **subject**, not a container: caustics
through the body, a dispersion fringe on the rim, a specular catch-light.

- **One solid body per frame, maximum.** Everything else optical must be haze,
  a `pool`, an arc of light, or a reflection.
- **Never centred.** Anchor it to an edge and let it run off-canvas, or drop it
  to punctuation scale beside a caption.
- Vary scale between frames: punctuation (a bead) · object · presence · field
  (larger than the canvas). Do not repeat a band on consecutive frames.
- A solid sphere only reads over something — a `Figure`, a `halo`, or
  `Slide tone="atmospheric"`.

## 8. The symbol

`<Mark />` — refraction as the only event: a wide band arrives, meets a curved
interface, leaves narrower and deflected, exits the frame. **Deliberately the
opposite of circularity**: the beam never returns, which is what permanent
removal means. The sphere survives only as the arc of an enormous curve.

There is **no wordmark by default** because there is no name. Never substitute a
leaf, tree, planet or recycling loop.

## 9. Presentations: a grammar, not a template

`<Slide>` supplies register, bleed, weather and grain — **no locked title, no
footer, no logo slot**. Compose each frame with `Canvas`/`Place`. The eight
archetypes are authored as `Slide` preview stories: cover/manifesto · big
statement · big number · science/evidence · process · project case ·
data/comparison · section divider.

**Register mix across a deck: ~55–60% `dark`, 25–30% `mineral`, 10–15%
`atmospheric`.** Alternate dense frames with near-empty ones. Always set
`scrim` when type sits over a `backdrop`.

**The typographic code**, repeated until recognisable:

```
carbon,
permanently removed.

FEEDSTOCK   RICE HUSK
PYROLYSIS   540 °C
FIXED C     84.7%
VERIFIED    18.08.26
```

## 10. Where the truth lives

`_ds/<folder>/styles.css` and the `tokens/` files it imports, then
`components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`. The files beat
this summary.
