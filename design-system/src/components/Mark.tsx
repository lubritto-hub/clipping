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
 * The symbol — **Threshold**.
 *
 * Three loose strata below; one consolidated mass above, bleeding off the top
 * edge; and a single step cut into the underside of that mass.
 *
 * The argument of the business, drawn: dispersed residue crosses one
 * interface and leaves as a denser, permanent body that continues past the
 * frame. The strata thin and drift as they fall away — dispersal is losing
 * definition. The mass does not.
 *
 * **The step is the whole mark.** It is the interface the matter crossed, and
 * it is what makes this a symbol rather than an icon: no text glyph, no chart
 * and no document icon has a stepped mass, so the silhouette is unmistakable
 * even at 16px where the step reduces to two pixels.
 *
 * Rising, not settling. The permanent thing sits at the top of the frame and
 * exits it; the residue is what falls away. A mark that consolidated downward
 * would read as burial, which is the opposite of what this is.
 *
 * There is no leaf, tree, planet, globe or recycling loop, and nothing here
 * closes: permanent removal is precisely the thing that does not come back.
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
        {/* The consolidated mass. Full width, cut by the top edge so it
            continues past the mark, with one step in its underside — the
            interface the matter crossed. */}
        <path d="M0 0H32V12.4H21.6V8.2H0Z" fill="currentColor" />
        {/* Three strata falling away: each thinner and laterally offset from
            the last. They never share a left margin — that is what stops the
            mark reading as a block of text. */}
        <path d="M7.6 16.8H32V19.2H7.6Z" fill="currentColor" />
        <path d="M0 23H20.8V24.8H0Z" fill="currentColor" />
        <path d="M5.2 28.6H29.4V29.8H5.2Z" fill="currentColor" />
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
