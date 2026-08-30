# terra carbon — building with this system

**biochar · climate solutions.**

> **Sony 2001 × Apple Aqua × climate science × biochar materiality,
> reinterpreted for 2026.**
>
> This is *Y2K soft-tech editorial applied to a scientific climate-tech* —
> not a scientific climate brand with a Y2K veneer. That order matters: light,
> refraction and optics come first, and the science reads through them.
> Softer, stranger, more atmospheric, more tactile, more photographic, more
> premium. Never an ESG startup, never carbon-credit software.

Voice: science-rooted, future-focused. Clarity, humility, optimism. Headlines
are lowercase.

## 0. The rule that governs everything else

**Do not make this look like a dashboard.** A page should first say "this is a
serious climate-tech company", and only later show the software that proves the
impact. Aim for roughly **60% brand/editorial, 40% product/data**, in this
order:

| # | Section | Register |
|---|---|---|
| 01 | Hero | Atmosphere, photography, one message. Almost nothing else. |
| 02 | Impact | The big numbers. |
| 03 | Science | Technical detail, specs, instruments. |
| 04 | Process | biomass → pyrolysis → biochar → removal. |
| 05 | Projects | Editorial photography beside real data. |
| 06 | MRV / dashboard | **Here, and only here, it becomes UI.** |

Concretely: use `Card surface="bare"` and `Rule` for sections 01–05, and keep
bordered cards, tables and forms for 06.

## 1. Always wrap in TerraCarbonProvider

It sets the type stack, base colour, background and theme. **Without it,
components inherit the host page's font and background.** Wrap once, at the top.

```jsx
<TerraCarbonProvider theme="dark" grain wash leak halo fill>
  <App />
</TerraCarbonProvider>
```

- `theme`: `"light"` (warm paper), `"dark"` (**petrol — the native register**,
  and deliberately never black), `"system"`.
- **`grain`** fine film noise · **`wash`** the coarse, unevenly-developed plate
  · **`leak`** light entering from outside the frame · **`halo`** ambient pool ·
  `fill` full height. Use `grain wash` together on any large flat area —
  digitally perfect surfaces are the thing that breaks the spell.
- Theme comes from a `data-theme` attribute on the element, so nesting a second
  provider flips a subtree (a dark band inside a light page).

## 2. Style with CSS custom properties — never raw values

Components are configured **by props, not class names**. For your own layout
glue use `var(--tc-*)`. Never a hex, a px shadow, or an off-scale space.

| Family | Real names |
|---|---|
| Surfaces | `--tc-color-bg`, `--tc-color-surface`, `--tc-color-surface-sunken`, `--tc-color-surface-raised` |
| Text | `--tc-color-text`, `--tc-color-text-muted`, `--tc-color-text-subtle` |
| **Hairlines** | `--tc-color-hairline`, `--tc-hairline-width`, `--tc-rule-width` |
| Accent + status | `--tc-color-accent`, `--tc-color-success-subtle`, `--tc-color-danger-text`, … (`-subtle` / `-border` / `-text` on each role) |
| **Material tones** | `--tc-color-organic` (sage, living biomass), `--tc-color-earth` (soil, char), `--tc-color-mineral` (deep teal) |
| **Depth = bloom** | `--tc-bloom-sm/md/lg`, `--tc-bloom-accent`, `--tc-bloom-inner`, `--tc-halo-behind` |
| **Atmosphere** | `--tc-lightleak-top`, `--tc-lightleak-corner`, `--tc-lightleak-edge`, `--tc-texture-grain`, `--tc-texture-wash`, `--tc-grain-opacity`, `--tc-wash-opacity` |
| **Optical light** | `--tc-optic-ice`, `--tc-optic-mint`, `--tc-optic-silver`, `--tc-optic-lilac`, `--tc-optic-peach` (+ `-deep` variants) |
| **Refraction** | `--tc-gradient-prism`, `--tc-gradient-caustic`, `--tc-gradient-sheen`, `--tc-edge-iridescent`, `--tc-flare-soft` |
| Iridescence | `--tc-gradient-iridescent`, `--tc-gradient-iridescent-text`, `--tc-gradient-chrome`, `--tc-gradient-halo`, `--tc-gradient-glass`, `--tc-gradient-verdant`, `--tc-gradient-terra`, `--tc-gradient-flare` |
| Glow | `--tc-glow-text`, `--tc-glow-text-strong` |
| Blur | `--tc-blur-focus`, `--tc-blur-ghost`, `--tc-blur-fore`, `--tc-blur-frost`, `--tc-frost-tint-strong` |
| Spacing | `--tc-space-*`: `2xs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl` |
| Radius | `--tc-radius-none/sm/md/lg/xl/full` |
| Type | `--tc-font-size-3xs … 7xl`, `--tc-font-weight-thin/light`, `--tc-letter-spacing-widest`, `--tc-letter-spacing-ultra` |

**Depth is light, not shadow.** `box-shadow: var(--tc-bloom-md)` — never a grey
drop shadow. For real separation put a `Halo` behind the element.

**Palette rules.** Green is sage / eucalyptus / mineral / celadon — never flag
or forest green. The dark ground is petrol, never `#000`. The light ground is
mineral white / mist / blue-white, like a very refined old LCD — **never cream
and never corporate white**; warm paper reads as SaaS.

**Optical light is not brand colour.** `--tc-optic-*` are the colours *produced
by light* passing through glass: ice, pale mint, silver, washed lilac, optical
peach. Use them only in gradients, glows and edges — never as a fill, never as
a text colour. And never build a plain two-stop linear ramp: `--tc-gradient-prism`
(conic dispersion), `--tc-gradient-caustic` (layered off-axis radials) and
`--tc-gradient-sheen` exist because a Figma-looking gradient breaks the spell.
It has to read as light through glass, not as a colour transition.

**Status vs material.** `success/warning/danger/info` = how something is
*doing*. `organic` / `earth` / `mineral` = what it *is*. `Badge`, `Alert`,
`Text` and `ProgressBar` take both.

## 3. The gestures that make it this brand

- **BIG NUMBER — a brand signature, not a metric** — it should occupy 30–50%
  of a frame and effectively *be* the image. `<Stat variant="display" />`
  (120px) · `projected` (blurred duplicate behind the glyphs — light thrown on
  an old screen) · `colossal` (176px, meant to be **cut by the frame**: wrap in
  `<Bleed>`). Vary the optics with `optic`: `edge` (chromatic dispersion
  fringe), `soft` (gently out of focus), `veiled` (dissolving into light).
  A number that is always crisp reads as a dashboard label. The meaning arrives
  tiny and widely tracked underneath: `TONNES OF DURABLE CO₂ REMOVAL · VERIFIED`.
  **One per view**, surrounded by near-empty space.
- **Scale tension** — pair every big number with `<Spec>` microtypography.
  `1.8M+` above `84.7% fixed carbon · batch 0241 · verified 18.08.26` is the
  single most characteristic move in the system.
- **Break the grid** — `<Bleed sides={['left']}>` runs a figure into the text
  column or pushes a numeral off the edge. Layouts are asymmetric on purpose.
- **Hairlines, not boxes** — `<Rule label="03 — science" />` before a bordered
  container. `<Card surface="bare">` removes the container entirely;
  `square` removes the radius. Not everything is a pill.
- **Precision against imperfection** — the house tension. `84.7% FIXED CARBON`
  set beside a photograph that is almost entirely out of focus. `VM0044 · batch
  0241 · 540 °C` beside an ethereal sphere with barely any form. Pair every
  exact figure with something soft; that contrast is what reads as editorial
  *and* technological at once.
- **Treated photography** — `<Figure>` never ships images, it ships their
  treatment. Duotone `tone` (cool/mineral/earth/flare) · depth `focus`
  (sharp/soft/lost/fore) · motion `ghost` and `smear` (long exposure) · optics
  `flash`, `silhouette`, `chroma` (chromatic aberration), `prism` · texture
  `grain`, `wash`, `bloom`. They compose — a duotone, an exposure and a defocus
  all apply together. **Untreated photography is the fastest way to look like
  stock.** Subjects: people, hands, operators, farmers, researchers,
  silhouettes, laboratory, industry, biomass, material macro, soil, machines,
  smoke and vapour, reflections, glass, near-abstract aerials — unusual crops,
  never posed. **Never** a seedling, a glowing planet, hands holding earth, or
  generic "sustainable industry". Treat biochar as a luxury material.
- **Instruments, not charts** — `<Instrument>` is a hairline trace with one
  luminous head and no gridlines. Use it instead of any conventional chart.
- **Glass as a subject, not a container** — `<Glass orb pearl droplets />` is
  an abstract object with real optics: caustics through the body, a dispersion
  fringe on the rim, a specular catch-light. Use it as an image in its own
  right — a sphere, a lens, a bead entering the frame. It only reads as glass
  **over something** (a figure, or a provider with `halo`). Not glassmorphism UI.
- **Process stages** — `<ProcessStep stage="earth|heat|carbon|atmosphere">`.
  The palette tells the transformation: earth → heat → carbon → atmosphere.
  Give each step a differently-treated photograph and exactly one figure.
  Four identically-treated cards is the failure mode.
- **Pearlescence** — `Card surface="iridescent"`, `Stat variant="iridescent"`,
  `Badge tone="iridescent"`, `Heading iridescent`: **at most one per view.**
- **The mark** — `<Mark wordmark />` is abstract (offset orbits, porous core).
  There is no leaf. Never substitute one.

## 4. Presentations — a grammar, not a template

**Never build a repeating slide layout** (logo corner → title → subtitle →
content → footer). That structure is exactly what would flatten this identity.
`<Slide>` supplies only the register, the bleed and the grain; compose each
slide from the rest of the system. Alternate visually dense slides with clean
technical ones — that rhythm is what reads as premium.

The eight archetypes (all authored as `Slide` preview stories — read them):

| # | Archetype | Built from |
|---|---|---|
| 01 | Cover / manifesto | full-bleed `Figure` + `Heading` level 1–2 + one `Text eyebrow`. Nothing else. |
| 02 | Big statement | one sentence over 60–70% of the frame, a `Glass orb` entering from the edge |
| 03 | Big number | `Stat variant="colossal"` in a `Bleed`, `Spec` beneath as a lab caption |
| 04 | Science / evidence | dark, one `Instrument`, one large insight, 3–4 `Spec` rows |
| 05 | Process | `Process` + four differently-treated `ProcessStep`s |
| 06 | Project case | huge `Figure`, small name, `Spec` as an archive record |
| 07 | Data / comparison | `tone="mineral"`, hairlines, no boxes, heavy negative space |
| 08 | Section divider | `tone="atmospheric"`, nearly empty, one tiny `Rule` or eyebrow |

**Register mix across a deck: ~55–60% `dark`, 25–30% `mineral`, 10–15%
`atmospheric`.** An all-dark deck goes gloomy and the dark slides stop landing.

**Always set `scrim` when type sits over a `backdrop`** — the treated
photography is deliberately bright and hazy, and tracked microcopy vanishes
into it otherwise.

**The typographic code**, repeated until it is recognisable: a large, tightly
tracked neo-grotesk headline, then — far below and far smaller — monospace or
ultra-tracked metadata.

```
engineered by nature,
scaled by technology.

FEEDSTOCK   RICE HUSK
PYROLYSIS   540 °C
FIXED C     84.7%
VERIFIED    18.08.26
```

## 5. Where the truth lives

Read before styling: `_ds/<folder>/styles.css` and the `tokens/` files it
imports, then `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`
for real props. The files beat this summary.

## 6. A build in the idiom

```jsx
<TerraCarbonProvider theme="dark" grain wash leak fill>
  <Stack gap="4xl" style={{ padding: 'var(--tc-space-4xl) var(--tc-space-3xl)' }}>
    <Mark size={38} wordmark glow />
    <Heading level={1} glow="strong">transforming waste into climate impact.</Heading>

    <Rule label="02 — impact" />
    <Halo>
      <Bleed sides={['left']} amount="var(--tc-space-3xl)">
        <Stat variant="colossal" value="1.8M+" unit="tons of CO₂ removed" />
      </Bleed>
    </Halo>
    <Spec layout="columns" items={[
      { label: 'fixed carbon', value: '84.7%', accent: true },
      { label: 'batch', value: '0241' },
      { label: 'permanence', value: '>1000 yr' },
      { label: 'verified', value: '18.08.26' },
    ]} />

    <Rule label="03 — science" />
    <Stack direction="horizontal" gap="4xl" wrap align="start">
      <Figure src="/char.jpg" alt="Biochar macro" ratio={1} tone="earth" grain wash
              captionIndex="fig. 01" caption="char · macro · 400×" style={{ width: 340 }} />
      <Instrument label="removals · tCO₂" reading="1,876,320" area
                  points={[8, 17, 24, 39, 61, 96]} scale={['2021', '2026']} />
    </Stack>
  </Stack>
</TerraCarbonProvider>
```

**Typeface note:** Satoshi is the brand face but is **not bundled** — the stack
falls through to the system grotesque unless the host loads it. Do not
reference other font families.
