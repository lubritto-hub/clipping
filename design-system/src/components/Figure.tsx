import * as React from 'react';
import { cx } from '../utils';

export interface FigureProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Image source. The system ships the treatment, never the photograph. */
  src: string;
  /** Alternative text. Required — these are content images, not decoration. */
  alt: string;
  /** Aspect ratio as `width / height`, e.g. `16 / 9`. Defaults to `4 / 5`. */
  ratio?: number;
  /**
   * **The first decision.** Pick a SUBJECT register, not a filter:
   * `char` (biochar as a cut mineral — crushed blacks, hard specular),
   * `plant` (industry at blue hour — mist, backlight, lifted blacks),
   * `terrain` (soil, biomass, cropland from above — matter, not landscape),
   * `figures` (people in motion, never identifiable, never facing camera).
   * Each owns its tonal curve, grain plate, light direction and crop origin.
   * `tone`, `focus`, `flash` and `chroma` are trim applied afterwards.
   */
  register?: 'none' | 'char' | 'plant' | 'terrain' | 'figures';
  /**
   * How loudly this image speaks. In any row, at most ONE may be `lead`, and
   * the largest figure in a composition should be the one out of focus.
   * `ambient` is deliberately barely readable — the sacrificed-legibility
   * register for imagery, which is what lets the numerals stay crisp.
   */
  weight?: 'normal' | 'lead' | 'ambient';
  /** The register's own light veil. On by default when a register is set. */
  veil?: boolean;
  /** Density falling away from the light source. On by default with a register. */
  pressure?: boolean;
  /**
   * Which plane this sits on. `soft` is a gentle defocus, `lost` is a
   * background out of focus, `fore` is a foreground element the eye is meant
   * to look past. Depth in this system is built from these planes.
   */
  focus?: 'sharp' | 'soft' | 'lost' | 'fore';
  /**
   * Push the photograph into the brand register. `cool` and `mineral` are the
   * blue-green duotones, `earth` the warm material one, `flare` the rare hot
   * frame. Untreated photography is the fastest way to look like stock.
   */
  tone?: 'none' | 'cool' | 'mineral' | 'earth' | 'flare';
  /** A soft, offset duplicate behind the subject — motion blur and ghosting. */
  ghost?: boolean;
  /**
   * Stacked, decaying echoes instead of one ghost — a long exposure. Use it
   * on people and machines in motion; it is the most editorial of the
   * treatments and the least like stock photography.
   */
  smear?: boolean;
  /** Blown highlights and lifted blacks, as if lit on-camera with soft flash. */
  flash?: boolean;
  /** Crush the subject to a shape against the light. */
  silhouette?: boolean;
  /** Chromatic aberration — the lens failing to focus all wavelengths together. */
  chroma?: boolean;
  /** An iridescent veil across the frame, as if light entered the lens. */
  prism?: boolean;
  /** Horizontal offset of the ghost, in px. Defaults to `14`. */
  ghostOffset?: number;
  /** Blown highlights leaking across the frame. */
  bloom?: boolean;
  /** Film grain. On by default — a clean photograph is the tell. */
  grain?: boolean;
  /** The coarse, unevenly-developed wash plate over the grain. */
  wash?: boolean;
  /** Dissolve the bottom edge into the page instead of cutting it. */
  fade?: boolean;
  radius?: 'none' | 'md' | 'lg' | 'full';
  /** Technical caption, e.g. `feedstock · rice husk · 18.08.26`. */
  caption?: React.ReactNode;
  /** Small index printed before the caption, e.g. `fig. 04`. */
  captionIndex?: React.ReactNode;
  /** Lay the caption over the bottom-left of the image. */
  captionOver?: boolean;
}

/**
 * Editorial photography, treated.
 *
 * Terra Carbon's imagery is people, hands, operators, farmers, researchers and
 * silhouettes, alongside laboratories, industry, biomass, material macro, soil
 * and machines — shot at unusual crops. **Never smiling-at-camera ESG stock,
 * and never the literal set** (a seedling, a glowing planet, hands holding
 * earth). This component supplies the treatment that makes a photograph belong
 * to the brand: duotone, defocus, motion, optics, bloom and grain.
 *
 * The house tension is hyper-precision against imperfection: `84.7% FIXED
 * CARBON` set beside a photograph that is almost entirely out of focus.
 *
 * @example
 * <Figure src="/kiln.jpg" alt="Pyrolysis kiln at night" ratio={3 / 2}
 *         tone="mineral" ghost bloom captionOver
 *         captionIndex="fig. 04" caption="kiln 3 · cerrado · 18.08.26" />
 */
export const Figure = React.forwardRef<HTMLElement, FigureProps>(function Figure(
  {
    src, alt, ratio = 4 / 5, register = 'none', weight = 'normal', veil, pressure,
    focus = 'sharp', tone = 'none', ghost = false, smear = false,
    flash = false, silhouette = false, chroma = false, prism = false, ghostOffset = 14,
    bloom = false, grain = true, wash = false, fade = false, radius = 'none',
    caption, captionIndex, captionOver = false, className, style, ...rest
  },
  ref
) {
  const captionNode = (caption != null || captionIndex != null) && (
    <figcaption className="tc-figure__caption">
      {captionIndex != null && <span className="tc-figure__caption-index">{captionIndex}</span>}
      {caption}
    </figcaption>
  );

  return (
    <figure
      ref={ref}
      className={cx(
        'tc-figure',
        `tc-figure--radius-${radius}`,
        register !== 'none' && `tc-figure--reg-${register}`,
        weight !== 'normal' && `tc-figure--weight-${weight}`,
        focus !== 'sharp' && `tc-figure--focus-${focus}`,
        tone !== 'none' && `tc-figure--tone-${tone}`,
        flash && 'tc-figure--flash',
        silhouette && 'tc-figure--silhouette',
        fade && 'tc-figure--fade',
        captionOver && 'tc-figure--caption-over',
        className
      )}
      style={style}
      {...rest}
    >
      <span
        className="tc-figure__frame"
        style={{ aspectRatio: String(ratio), ['--tc-figure-ghost-x' as string]: `${ghostOffset}px` }}
      >
        {smear &&
          [1, 2, 3].map((n) => (
            <span
              key={n}
              className={`tc-figure__smear tc-figure__smear--${n}`}
              aria-hidden="true"
              style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
            />
          ))}
        {ghost && (
          <span
            className="tc-figure__ghost"
            aria-hidden="true"
            style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
          />
        )}
        <img className="tc-figure__image" src={src} alt={alt} />
        {chroma && (
          <>
            <span className="tc-figure__chroma tc-figure__chroma--warm" aria-hidden="true"
              style={{ backgroundImage: `url(${JSON.stringify(src)})` }} />
            <span className="tc-figure__chroma tc-figure__chroma--cool" aria-hidden="true"
              style={{ backgroundImage: `url(${JSON.stringify(src)})` }} />
          </>
        )}
        {prism && <span className="tc-figure__prism" aria-hidden="true" />}
        {(veil ?? register !== 'none') && <span className="tc-figure__veil" aria-hidden="true" />}
        {(pressure ?? register !== 'none') && <span className="tc-figure__pressure" aria-hidden="true" />}
        {bloom && <span className="tc-figure__bloom" aria-hidden="true" />}
        {wash && <span className="tc-figure__wash" aria-hidden="true" />}
        {grain && <span className="tc-figure__grain" aria-hidden="true" />}
        {captionOver && captionNode}
      </span>
      {!captionOver && captionNode}
    </figure>
  );
});
