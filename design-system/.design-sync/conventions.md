# terra carbon — building with this system

**biochar · climate solutions.** Y2K ethereal soft-tech read through Sony
2000–2004, the Apple Aqua era and Nothing's restraint: glass and translucency,
bloom instead of shadow, pearlescence, film grain, cool blue-dominant palette,
one very large number, a lot of empty space. Voice: science-rooted and
future-focused — clarity, humility, optimism. Headlines are lowercase.

## 1. Always wrap in TerraCarbonProvider

It sets the type stack, the base text colour, the page background and the
theme. **Without it components inherit the host page's font and background and
the design collapses to browser defaults.** Wrap once, at the top.

```jsx
<TerraCarbonProvider theme="dark" grain halo fill>
  <App />
</TerraCarbonProvider>
```

- `theme`: `"light"` (warm paper), `"dark"` (abyss navy — **the brand's native
  register**, use it for hero and dashboard work), `"system"`.
- `grain` lays the film-grain plate over everything; `halo` paints the ambient
  wash behind a hero; `fill` stretches to full height.
- The theme is read from a `data-theme` attribute on the element, so nesting a
  second provider flips a subtree — e.g. a dark hero band inside a light page.

## 2. Style with CSS custom properties — never raw values

Components are configured **by props, not by class names**. For your own layout
glue, use `var(--tc-*)`. Never write a hex colour, a px shadow or an off-scale
spacing value.

| Family | Pattern | Real examples |
|---|---|---|
| Surfaces | `--tc-color-bg`, `--tc-color-surface*` | `--tc-color-surface`, `--tc-color-surface-sunken`, `--tc-color-surface-raised` |
| Text | `--tc-color-text*` | `--tc-color-text`, `--tc-color-text-muted`, `--tc-color-text-subtle` |
| Borders | `--tc-color-border*` | `--tc-color-border`, `--tc-color-border-subtle`, `--tc-color-border-strong` |
| Accent + status | `--tc-color-<role>[-subtle\|-border\|-text]` | `--tc-color-accent`, `--tc-color-success-subtle`, `--tc-color-danger-text` |
| **Material tones** | `--tc-color-organic*`, `--tc-color-earth*` | `--tc-color-organic` (living biomass), `--tc-color-earth` (soil, char) |
| **Elevation = bloom** | `--tc-bloom-*` | `--tc-bloom-sm/md/lg`, `--tc-bloom-accent`, `--tc-bloom-inner` |
| Iridescence | `--tc-gradient-*` | `--tc-gradient-iridescent`, `--tc-gradient-chrome`, `--tc-gradient-halo`, `--tc-gradient-glass`, `--tc-gradient-verdant`, `--tc-gradient-terra` |
| Glow (big numbers) | `--tc-glow-text*` | `--tc-glow-text`, `--tc-glow-text-strong` |
| Blur / frost | `--tc-blur-*`, `--tc-frost-tint*` | `--tc-blur-frost`, `--tc-frost-tint-strong` |
| Spacing | `--tc-space-*` | `2xs xs sm md lg xl 2xl 3xl 4xl` |
| Radius | `--tc-radius-*` | `sm md lg xl full` — controls are `full`, containers `lg`/`xl` |
| Type | `--tc-font-size-*`, `--tc-font-weight-*`, `--tc-letter-spacing-*` | `--tc-font-size-6xl` (the big number), `--tc-font-weight-light`, `--tc-letter-spacing-widest` |

**Depth is light, not shadow.** Use `box-shadow: var(--tc-bloom-md)`; never a
grey drop shadow.

**Status vs material.** `success/warning/danger/info` describe how something is
*doing*; `organic`/`earth` describe what it *is*. `Badge`, `Alert`, `Text` and
`ProgressBar` all take both.

## 3. The gestures that make it this brand

- **BIG NUMBER** — `<Stat variant="display" value="1.8M+" unit="tons of CO₂ removed" />`.
  104px, light weight, glowing. **One per view**, with near-empty space around
  it. It is the single loudest thing in the system.
- **Eyebrows** — `<Text eyebrow>` and `<Heading level={6}>` are uppercase,
  widely tracked 11px micro-labels. Use them for metric labels and captions;
  level 6 is *not* a small headline.
- **Display type is light** — `Heading` levels 1–3 render at weight 300 with
  negative tracking. Set copy in sentence case, lowercase.
- **Glass** — `<Glass orb size={180} />` only reads as glass **over something**
  (imagery, or a provider with `halo`). Over a flat background it is a plain panel.
  Same for `<Button variant="frost">` and `<Card surface="frost">`.
- **Pearlescence** — `<Card surface="iridescent">`, `<Stat variant="iridescent">`,
  `<Badge tone="iridescent">`, `<Heading iridescent>`: **at most one per view.**

## 4. Where the truth lives

Read these before styling: `_ds/<folder>/styles.css` and the `tokens/` files it
imports (every token above, both registers), and `components/<group>/<Name>/<Name>.prompt.md`
plus `<Name>.d.ts` for each component's real props. The files beat this summary.

## 5. A build in the idiom

```jsx
<TerraCarbonProvider theme="dark" grain halo fill>
  <Stack gap="3xl" style={{ padding: 'var(--tc-space-3xl) var(--tc-space-2xl)' }}>
    <Stack gap="xs">
      <Heading level={6}>our impact</Heading>
      <Heading level={1} glow="strong">transforming waste into climate impact.</Heading>
    </Stack>
    <Stat variant="display" value="1.8M+" unit="tons of CO₂ removed" caption="and counting" />
    <Stack direction="horizontal" gap="lg" wrap>
      <Card title="Carbon removal" description="Verified tonnes, last 12 months"
            action={<Badge tone="success" dot>live</Badge>}>
        <Stat label="total removed" value="1,876,320" unit="tCO₂"
              delta="+8.2%" deltaDirection="up" variant="plain" />
      </Card>
      <ProgressBar label="2030 removal target" value={62} showValue tone="verdant" />
    </Stack>
  </Stack>
</TerraCarbonProvider>
```

**Typeface note:** Satoshi is the brand face but is **not bundled** — the stack
falls through to the system grotesque unless the host app loads it. Do not
reference other font families.
