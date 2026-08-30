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
 * Terra Carbon's imagery is people, laboratories, industry, biomass, material
 * macro, soil and machines — shot at unusual crops, not "climate stock". This
 * component supplies the treatment that makes a photograph belong to the
 * brand: duotone, defocus, ghosting, bloom and grain.
 *
 * @example
 * <Figure src="/kiln.jpg" alt="Pyrolysis kiln at night" ratio={3 / 2}
 *         tone="mineral" ghost bloom captionOver
 *         captionIndex="fig. 04" caption="kiln 3 · cerrado · 18.08.26" />
 */
export const Figure = React.forwardRef<HTMLElement, FigureProps>(function Figure(
  {
    src, alt, ratio = 4 / 5, focus = 'sharp', tone = 'none', ghost = false, ghostOffset = 14,
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
        focus !== 'sharp' && `tc-figure--focus-${focus}`,
        tone !== 'none' && `tc-figure--tone-${tone}`,
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
        {ghost && (
          <span
            className="tc-figure__ghost"
            aria-hidden="true"
            style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
          />
        )}
        <img className="tc-figure__image" src={src} alt={alt} />
        {bloom && <span className="tc-figure__bloom" aria-hidden="true" />}
        {wash && <span className="tc-figure__wash" aria-hidden="true" />}
        {grain && <span className="tc-figure__grain" aria-hidden="true" />}
        {captionOver && captionNode}
      </span>
      {!captionOver && captionNode}
    </figure>
  );
});
