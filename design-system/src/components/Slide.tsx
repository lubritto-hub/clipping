import * as React from 'react';
import { cx } from '../utils';

export interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * The register this slide is in. Aim for roughly **55–60% `dark`,
   * 25–30% `mineral`, 10–15% `atmospheric`** across a deck — an all-dark
   * presentation goes gloomy and the dark slides stop landing.
   */
  tone?: 'dark' | 'mineral' | 'atmospheric';
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
 * 1. **Cover / manifesto** — full-bleed `Figure`, huge `Heading`, one `Spec` line.
 * 2. **Big statement** — one sentence over 60–70% of the frame, a `Glass` orb entering from the edge.
 * 3. **Big number** — `Stat variant="colossal"` in a `Bleed`, `Spec` beneath it as a lab caption.
 * 4. **Science / evidence** — dark, one `Instrument`, one large insight, 3–4 spec rows.
 * 5. **Process** — `Process` with four differently-treated `ProcessStep`s.
 * 6. **Project case** — huge `Figure`, small project name, `Spec` as an archive record.
 * 7. **Data / comparison** — `tone="mineral"`, hairlines, no boxes, heavy negative space.
 * 8. **Section divider** — `tone="atmospheric"`, nearly empty, one tiny `Rule` label.
 *
 * Alternate dense visual slides with clean technical ones; that rhythm is
 * what reads as premium.
 *
 * @example
 * <Slide tone="dark" flush backdrop={<Figure src="/field.jpg" alt="" ratio={16/9} smear tone="cool" />}>
 *   <Stack gap="lg" style={{ margin: 'auto 0 0', padding: 'var(--tc-space-2xl)' }}>
 *     <Heading level={1} glow="strong">carbon removal has a permanence problem.</Heading>
 *   </Stack>
 * </Slide>
 */
export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(function Slide(
  { children, tone = 'dark', flush = false, grain = true, weather = 'default', artefact = 'normal', backdrop, scrim = 'none', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-theme={tone === 'dark' ? 'dark' : 'light'}
      data-weather={weather === 'default' ? undefined : weather}
      data-artefact={artefact === 'normal' ? undefined : artefact}
      className={cx(
        'tc-slide',
        `tc-slide--${tone}`,
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
      {tone === 'atmospheric' && <div className="tc-slide__atmos" aria-hidden="true" />}
      {scrim !== 'none' && <span className={cx('tc-slide__scrim', `tc-slide__scrim--${scrim}`)} aria-hidden="true" />}
      {grain && <span className="tc-slide__grain" aria-hidden="true" />}
      <div className="tc-slide__body">{children}</div>
    </div>
  );
});
