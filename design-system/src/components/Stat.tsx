import * as React from 'react';
import { cx } from '../utils';

export interface StatProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Uppercase micro-label. Keep it short: "tons of CO₂ removed". */
  label?: React.ReactNode;
  /** The figure itself. Pre-format it - the component does not format numbers. */
  value: React.ReactNode;
  /** Unit shown beside the value, e.g. `'tCO₂'`. */
  unit?: React.ReactNode;
  /** Signed change, e.g. `'+12.4%'`. Rendered in the direction's colour. */
  delta?: React.ReactNode;
  /** Which way `delta` points. `'up'` is the organic green, `'down'` the flare. */
  deltaDirection?: 'up' | 'down' | 'flat';
  /** Small line under everything, e.g. `'vs. last quarter'`. */
  caption?: React.ReactNode;
  /**
   * `display` is the BIG NUMBER: 120px, thin weight, glowing. It is the
   * brand's loudest gesture - **one per view**, with near-empty space around
   * it. `projected` is the same numeral thrown onto an old screen: a blurred
   * duplicate sits behind the glyphs so it reads soft, never illegible.
   * `colossal` is 176px, meant to be cut by the frame (wrap it in `Bleed`).
   * `plain` drops the card chrome; `iridescent` fills it with pearl.
   */
  variant?: 'card' | 'plain' | 'display' | 'projected' | 'colossal' | 'iridescent';
  /** Add the glow without going to `display` size. */
  glow?: boolean;
  /**
   * Optical treatment of the numeral itself. `edge` adds the chromatic
   * dispersion fringe; `soft` puts it gently out of focus; `veiled` dissolves
   * its trailing edge into light. Vary these across a deck - a number that is
   * always crisp reads as a data label, not as the image of the slide.
   */
  optic?: 'none' | 'edge' | 'soft' | 'veiled';
}

/**
 * A single metric.
 *
 * The `display` variant is the signature of the whole system - the
 * `1.8M+` treatment from the brand board. Give it room: a display Stat in a
 * cramped grid loses the entire effect.
 *
 * @example
 * <Stat variant="display" value="1.8M+" unit="tons of CO₂ removed" caption="and counting" />
 * <Stat label="hectares of soils enhanced" value="250,412" delta="+8.2%" deltaDirection="up" />
 */
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(function Stat(
  { label, value, unit, delta, deltaDirection = 'flat', caption, variant = 'card', glow = false, optic = 'none', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        'tc-stat',
        variant !== 'card' && `tc-stat--${variant}`,
        // `projected` and `colossal` build on the display treatment.
        (variant === 'projected' || variant === 'colossal') && 'tc-stat--display',
        glow && variant === 'card' && 'tc-stat--glow',
        optic !== 'none' && `tc-stat--${optic}`,
        className
      )}
      {...rest}
    >
      {label != null && <span className="tc-stat__label">{label}</span>}
      <span className="tc-stat__value-row">
        {variant === 'projected' && (
          <span className="tc-stat__ghost" aria-hidden="true">{value}</span>
        )}
        <span className="tc-stat__value">{value}</span>
        {unit != null && <span className="tc-stat__unit">{unit}</span>}
        {delta != null && (
          <span className={cx('tc-stat__delta', `tc-stat__delta--${deltaDirection}`)}>{delta}</span>
        )}
      </span>
      {caption != null && <span className="tc-stat__caption">{caption}</span>}
    </div>
  );
});
