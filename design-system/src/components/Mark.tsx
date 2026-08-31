import * as React from 'react';
import { cx } from '../utils';

export interface MarkProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Glyph edge length in px. Defaults to `32`. */
  size?: number;
  /**
   * Show a wordmark beside the glyph. **There is no company name yet**, so
   * this is off by default and the symbol is expected to carry the identity
   * alone. Pass a string only once a name exists.
   */
  wordmark?: string;
  /** The line under the wordmark. Only rendered when `wordmark` is set. */
  descriptor?: React.ReactNode;
  /** Let the glyph emit accent light — for dark hero placements. */
  glow?: boolean;
}

/**
 * The symbol.
 *
 * **Refraction as the only event.** A wide, diffuse band arrives from
 * off-canvas, meets a single curved interface, and leaves on a permanently
 * different path — narrower, angled down, exiting the frame. Diffuse abundant
 * input; an interface where matter intervenes; a redirected, denser output
 * that does not come back.
 *
 * It is deliberately **the opposite of circularity**: the beam never returns
 * to where it started, which is what permanent removal actually means. The
 * sphere survives only as an arc of an enormous, mostly-invisible curve — the
 * sphere's edge, never the ball. Nothing here is closed, concentric or
 * organic; there is no leaf, tree, planet or recycling loop.
 *
 * The mark is built from two solid masses against two 1.3-unit hairlines. That
 * extreme weight contrast belongs to product photography and editorial rules,
 * not to icon sets — which is why it does not read as an icon.
 *
 * **It has to work alone**, and does: there is no name yet.
 *
 * @example
 * <Mark size={40} />
 * <Mark size={120} glow />
 */
export const Mark = React.forwardRef<HTMLSpanElement, MarkProps>(function Mark(
  { size = 32, wordmark, descriptor, glow = false, className, ...rest },
  ref
) {
  return (
    <span ref={ref} className={cx('tc-mark', glow && 'tc-mark--glow', className)} {...rest}>
      <svg
        className="tc-mark__glyph"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        role="img"
        aria-label="Symbol"
      >
        {/* The incoming band — wide, horizontal, cropped by the left edge. */}
        <path d="M0 9H17.6V14.5H0Z" fill="currentColor" />
        {/* The outgoing band — narrower, laterally displaced and deflected
            ~20 degrees down, leaving through the right edge. The offset at the
            surface IS the refraction; a steeper angle turns the two masses
            into a chevron and the mark reads as an arrow. */}
        <path d="M17.2 11.6L32 17.6V21.6L16.9 16.4Z" fill="currentColor" />
        {/* The interface: one continuous arc of a much larger curve, running
            off the top and bottom edges. The sphere survives only as its edge. */}
        <path
          d="M21.4 0Q13.2 16 21.4 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {wordmark && (
        <span className="tc-mark__wordmark">
          <span className="tc-mark__name">{wordmark}</span>
          {descriptor != null && <span className="tc-mark__descriptor">{descriptor}</span>}
        </span>
      )}
    </span>
  );
});
