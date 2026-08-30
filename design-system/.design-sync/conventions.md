# terra carbon — building with this system

**biochar · climate solutions.**

> Less SaaS dashboard, more Y2K editorial climate technology: softer,
> stranger, more atmospheric, more tactile, more photographic, more premium.
> Sony/Apple 2001 meeting a 2030 climate-tech — not a 2026 carbon-credit
> startup.

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
| Iridescence | `--tc-gradient-iridescent`, `--tc-gradient-iridescent-text`, `--tc-gradient-chrome`, `--tc-gradient-halo`, `--tc-gradient-glass`, `--tc-gradient-verdant`, `--tc-gradient-terra`, `--tc-gradient-flare` |
| Glow | `--tc-glow-text`, `--tc-glow-text-strong` |
| Blur | `--tc-blur-focus`, `--tc-blur-ghost`, `--tc-blur-fore`, `--tc-blur-frost`, `--tc-frost-tint-strong` |
| Spacing | `--tc-space-*`: `2xs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl` |
| Radius | `--tc-radius-none/sm/md/lg/xl/full` |
| Type | `--tc-font-size-3xs … 7xl`, `--tc-font-weight-thin/light`, `--tc-letter-spacing-widest`, `--tc-letter-spacing-ultra` |

**Depth is light, not shadow.** `box-shadow: var(--tc-bloom-md)` — never a grey
drop shadow. For real separation put a `Halo` behind the element.

**Palette rules.** Green is sage / eucalyptus / mineral / celadon — never flag
or forest green. The dark ground is petrol, never `#000`. Iridescence runs
cyan → mint → lilac → peach and stays faint.

**Status vs material.** `success/warning/danger/info` = how something is
*doing*. `organic` / `earth` / `mineral` = what it *is*. `Badge`, `Alert`,
`Text` and `ProgressBar` take both.

## 3. The gestures that make it this brand

- **BIG NUMBER** — `<Stat variant="display" />` (120px) · `variant="projected"`
  puts a blurred duplicate behind the glyphs so it reads as light thrown on an
  old screen · `variant="colossal"` (176px) is meant to be **cut by the frame**:
  wrap it in `<Bleed>`. **One per view**, surrounded by near-empty space.
- **Scale tension** — pair every big number with `<Spec>` microtypography.
  `1.8M+` above `84.7% fixed carbon · batch 0241 · verified 18.08.26` is the
  single most characteristic move in the system.
- **Break the grid** — `<Bleed sides={['left']}>` runs a figure into the text
  column or pushes a numeral off the edge. Layouts are asymmetric on purpose.
- **Hairlines, not boxes** — `<Rule label="03 — science" />` before a bordered
  container. `<Card surface="bare">` removes the container entirely;
  `square` removes the radius. Not everything is a pill.
- **Treated photography** — `<Figure>` never ships images, it ships their
  treatment: `tone` (cool/mineral/earth/flare duotone), `focus`
  (sharp/soft/lost/fore depth planes), `ghost` (motion blur), `bloom`, `grain`,
  `wash`. **Untreated photography is the fastest way to look like stock.**
  Subjects: people, laboratory, industry, biomass, material macro, soil,
  machines — unusual crops. Avoid literal sustainability imagery (glowing
  planets, plants in spheres); treat biochar as a luxury material.
- **Instruments, not charts** — `<Instrument>` is a hairline trace with one
  luminous head and no gridlines. Use it instead of any conventional chart.
- **Glass** — `<Glass orb />`, `<Card surface="frost">`, `<Button variant="frost">`
  only read as glass **over something** (a figure, or a provider with `halo`).
- **Pearlescence** — `Card surface="iridescent"`, `Stat variant="iridescent"`,
  `Badge tone="iridescent"`, `Heading iridescent`: **at most one per view.**
- **The mark** — `<Mark wordmark />` is abstract (offset orbits, porous core).
  There is no leaf. Never substitute one.

## 4. Where the truth lives

Read before styling: `_ds/<folder>/styles.css` and the `tokens/` files it
imports, then `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`
for real props. The files beat this summary.

## 5. A build in the idiom

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
