import * as React from 'react';
import { cx } from '../utils';

export interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * The register this slide is in.
   *
   * Aim for roughly **70% light** (`air`, `haze`, `mineral`, `atmospheric`),
   * of which `air` should be about half, and **at most ~10% `deep`**.
   *
   * `deep` is punctuation: one dark frame after a run of bright ones, never
   * two in a row. A deck that leans on it reads as climate anxiety rather
   * than climate innovation — which is the exact failure this register mix
   * exists to prevent. `dark` is kept as a deprecated alias for `deep`.
   */
  tone?: 'air' | 'haze' | 'mineral' | 'atmospheric' | 'deep' | 'dark';
  /** Drop the padding so a photograph or number can run full bleed. */
  flush?: boolean;
  /** Film grain over the whole slide. On by default. */
  grain?: boolean;
  /**
   * The lighting condition. Every atmospheric plate inside re-aims to it, so
   * ground, figures and speculars agree on one source. **Two adjacent slides
   * must not share a condition** — that repetition is what makes a deck look
   * generated.
   */
  weather?: 'default' | 'kiln' | 'blue-hour' | 'condensation' | 'cove';
  /** How visible the print/scan substrate is. `loud` shows its making. */
  artefact?: 'quiet' | 'normal' | 'loud';
  /** Full-bleed background layer — a `Figure`, a `Glass` object, a wash. */
  backdrop?: React.ReactNode;
  /**
   * Legibility gradient between the backdrop and the type. **Set this whenever
   * text sits over a `backdrop`** — the treated photography is deliberately
   * bright and hazy, and small tracked microcopy disappears into it otherwise.
   */
  scrim?: 'none' | 'bottom' | 'left' | 'full';
}

/**
 * A 16:9 presentation frame.
 *
 * **This is deliberately not a template.** There is no locked logo slot, no
 * title/subtitle pair and no footer — that structure is exactly what would
 * flatten this identity. `Slide` supplies the register, the bleed and the
 * grain; each archetype is composed from the rest of the system:
 *
 * 1. **Luminous cover** — `tone="air"`, full-bleed bright `Figure`, huge `Heading`,
 *    one `Spec` line. The frame opens on light, never on a dark planet.
 * 2. **Big statement** — `tone="air"`, one sentence over 60–70% of the frame, a
 *    translucent `Glass` orb entering from an edge and catching the weather.
 * 3. **Refined big number** — `tone="air"` or `"haze"`, `Stat variant="colossal"`
 *    in a `Bleed`. Confident and quiet: light weight, wide frame, no glow stack.
 * 4. **Science / evidence** — `tone="mineral"`, one `Instrument`, one large
 *    insight, 3–4 spec rows. Precision reads best on the LCD-white ground.
 * 5. **Process** — `tone="haze"`, `Process` with four differently-treated steps,
 *    each stage carrying its own point on the feedstock→char→material palette.
 * 6. **Project case** — `tone="air"`, huge `Figure`, small project name, `Spec`
 *    as an archive record.
 * 7. **Data / comparison** — `tone="mineral"`, hairlines, no boxes, heavy
 *    negative space.
 * 8. **Transitional** — `tone="atmospheric"` (or the deck's single `deep`
 *    frame), nearly empty, one tiny `Rule` label.
 *
 * Alternate dense visual slides with clean technical ones; that rhythm is
 * what reads as premium.
 *
 * @example
 * <Slide tone="air" flush backdrop={<Figure src="/field.jpg" alt="" ratio={16/9} smear tone="plant" />}>
 *   <Stack gap="lg" style={{ margin: 'auto 0 0', padding: 'var(--tc-space-2xl)' }}>
 *     <Heading level={1} glow="strong">carbon removal has a permanence problem.</Heading>
 *   </Stack>
 * </Slide>
 */
export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(function Slide(
  { children, tone = 'air', flush = false, grain = true, weather = 'default', artefact = 'normal', backdrop, scrim = 'none', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-theme={tone === 'deep' || tone === 'dark' ? 'dark' : 'light'}
      data-weather={weather === 'default' ? undefined : weather}
      data-artefact={artefact === 'normal' ? undefined : artefact}
      className={cx(
        'tc-slide',
        `tc-slide--${tone === 'dark' ? 'deep' : tone}`,
        flush && 'tc-slide--flush',
        // Weather and substrate are the default state: a flat ground is the
        // failure mode this whole system exists to avoid.
        !backdrop && 'tc-ground',
        'tc-substrate',
        className
      )}
      {...rest}
    >
      {backdrop && <div className="tc-slide__atmos">{backdrop}</div>}
      {(tone === 'atmospheric' || tone === 'air' || tone === 'haze') && (
        <div className="tc-slide__atmos" aria-hidden="true" />
      )}
      {scrim !== 'none' && <span className={cx('tc-slide__scrim', `tc-slide__scrim--${scrim}`)} aria-hidden="true" />}
      {grain && <span className="tc-slide__grain" aria-hidden="true" />}
      <div className="tc-slide__body">{children}</div>
    </div>
  );
});
