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

## 0a. Copy is solution-led

The writing states the **solution**, never the problem. "Most carbon removal
does not stay removed" is the register this identity is not in. The lines that
are:

> transforming waste into climate impact. · engineered by nature, scaled by
> technology. · durable carbon removal, built for the real world. · from
> biomass to measurable climate value. · removing carbon. restoring systems. ·
> designed for permanence. · measurable impact. durable carbon. restored soils.

Compositions should convey solução, evolução, precisão, beleza and a possible
future — not crisis.

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
<TerraCarbonProvider theme="light" grain wash leak fill>
  <App />
</TerraCarbonProvider>
```

- `theme`: `"light"` (**the native register**), `"dark"`, `"system"`.
  The identity is **luminous**, and the light register is where it lives — not
  a "light mode" bolted onto a dark product. `"dark"` is a deep marine night
  used as punctuation, at most ~10% of a page or a deck.
- `grain` · `wash` · `leak` · `halo` — use `grain wash` on any large flat area.
- **Weather.** `data-weather` on any element re-aims every atmospheric plate
  inside it, so ground, figures and speculars share one light source:
  `kiln` (hot, low-right) · `blue-hour` (cold, high, raking) · `condensation`
  (diffuse, close, wet) · `cove` (bounced, off-canvas left).
  **Two adjacent sections must not share a condition.**
- **Artefact gain.** `data-artefact="loud"` makes the print/scan substrate
  visible; `"quiet"` pulls it back. Imperfection you cannot see is decoration.

## 2. Colour

**The rule that governs every other colour decision:**

> **Depth is achieved by desaturating toward haze, not by darkening.**

A plane that recedes goes cooler, bluer and lower in contrast. It does not go
grey and it never goes toward black. Every shadow in the light register is a
**blue** diffusion at low alpha — which is what a shadow looks like outdoors
under a bright sky. A neutral or warm shadow is the single reliable way to make
this identity read as heavy.

| Family | Real names |
|---|---|
| **The ground** | `--tc-palette-pearl-blue / -mint / -lilac / -warm`. Four whites separated by **temperature, not value** — one white is a background, four are a material. |
| **The mid** | `--tc-palette-haze-*` (azul névoa). The ~20% band: distance, air, recession. |
| Ice / mist | `--tc-palette-ice-*` (azul gelo), `--tc-palette-mist-*` (off-white frio, cinza muito claro) |
| Greens | `--tc-palette-sage-*` (cool sage / greenish grey), `--tc-palette-mineral-*` (soft teal). Never a saturated leaf green, never ESG green. |
| Soft glow | `--tc-palette-cyan-400`, `--tc-palette-cyan-glare` (blown-out core, glow only — never a fill) |
| Nacre | `--tc-palette-nacre-200..500` + `-rose` — the delicate lilac→rose iridescence |
| Material | `--tc-palette-char-950`, `--tc-palette-char-gloss` (the cold specular that makes char a mineral, not soot), `--tc-palette-earth-*` |
| **The deep** | `--tc-palette-forest-970` (hue ~150) · `--tc-palette-petrol-900` (hue ~198). **Never collapse them** — a card floats by temperature, not elevation. Rationed to ~10%. |
| Optical light | `--tc-optic-ice / -mint / -silver / -nacre / -peach` — colours *produced by light*, gradients and edges only |

**Green is a material, never a status.** `success`, positive deltas and
`verified` all resolve to cyan/ice. Green appears only through
`--tc-color-organic` and `--tc-color-mineral`.

**The nacre ration.** Pink/lilac: at most **one occurrence per frame**, never
above 18% alpha, always flanked by cool stops. It is jewellery; it stops working
the moment it becomes a theme colour. Warm (peach/flare) is rationed harder
still and never sits adjacent to nacre.

**No pure black.** The darkest value in the system is a saturated blue-teal at
roughly 18% luminance. `#000` only inside masks. Pure white is allowed as a
*surface* (`--tc-color-surface`) because a luminous register needs a true white
to measure the pearls against — but never as a page ground.

**Hairlines are blue, not grey** (`--tc-color-hairline` is a haze blue). A grey
hairline on a cool white is what makes a luminous page look printed.

**Grain is halved against the dark register.** The same noise that reads as film
on a deep plate reads as a *soiled surface* on a bright one.

**In the light register the accent is nearly as dark as the text**
(`--tc-color-accent: mineral-600`). If an accent could plausibly be a filled
primary button, it is a SaaS accent.

## 3. Light: hard, not just soft

A soft off-axis radial pool is the 2021 dark-mode default. Aqua, the MiniDisc
and the VAIO had **hard terminators and speculars**. Use both halves:

| Hard | `--tc-gel` (bright dome, hard terminator at the equator — below it the gel goes to **haze blue**, so a sphere reads as a translucent bead full of light, never a heavy object with a shadowed underside) · `--tc-specular-brushed` (anisotropic streak with a hard core) · `--tc-specular-edge` (the MiniDisc rim break — **one per frame**) |
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

- **char** — biochar as a cut mineral: cool, dense, one hard specular on a
  facet. **Never crushed to black** — a crushed image drops a hole into a
  luminous page, and one hole makes the whole spread read as heavy. Never sooty
  charcoal: char is the product, and it should look valuable.
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
archetypes are authored as `Slide` preview stories: **luminous cover** ·
big statement · **refined** big number · science/evidence · process ·
project case · data/comparison · transitional.

A protagonist number is **confident, not loud**: hairline weight, a wide frame,
the soft glow by default. `glow` opts into the strong one — and a number that
needs the strong glow to land is usually a number that is too small.

**Register mix across a deck: ~70% light — `air` (about half of it), `haze`,
`mineral`, `atmospheric` — and at most ~10% `deep`.** `deep` is punctuation:
one dark frame after a run of bright ones, never two in a row. A deck that
leans on it reads as *climate anxiety* rather than *climate innovation*, which
is the exact failure this mix exists to prevent.

Alternate dense frames with near-empty ones. Always set `scrim` when type sits
over a `backdrop` — on the light registers the scrim **adds** light under the
type rather than dimming the image.

**The typographic code**, repeated until recognisable:

```
transforming waste
into climate impact.

FEEDSTOCK   RICE HUSK
PYROLYSIS   540 °C
FIXED C     84.7%
VERIFIED    18.08.26
```

## 10. Where the truth lives

`_ds/<folder>/styles.css` and the `tokens/` files it imports, then
`components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`. The files beat
this summary.
