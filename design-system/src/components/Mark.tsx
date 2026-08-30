import * as React from 'react';
import { cx } from '../utils';

export interface MarkProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Glyph edge length in px. Defaults to `32`. */
  size?: number;
  /** Show `terra carbon` and the descriptor beside the glyph. */
  wordmark?: boolean;
  /** The line under the name. Defaults to `biochar — climate solutions`. */
  descriptor?: React.ReactNode;
  /** Let the glyph emit accent light — for dark hero placements. */
  glow?: boolean;
}

/**
 * The terra carbon symbol.
 *
 * Deliberately abstract: two open, off-axis arcs around an irregular cluster
 * of voids. It can be read as a particle, a pore, carbon, a cycle, an orbit,
 * matter or transformation — without depicting any of them. There is no leaf,
 * and the arcs are broken so it never resolves into a generic eco roundel.
 *
 * **It has to work alone.** In presentations the glyph is used without the
 * wordmark far more often than with it.
 *
 * @example
 * <Mark size={40} wordmark />
 * <Mark size={64} glow />
 */
export const Mark = React.forwardRef<HTMLSpanElement, MarkProps>(function Mark(
  { size = 32, wordmark = false, descriptor = 'biochar — climate solutions', glow = false, className, ...rest },
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
        aria-label="terra carbon"
      >
        {/* Two open arcs, off-axis and never concentric. Closed rings read as
            a generic eco/orbit icon; the gaps keep it a trajectory. */}
        <path className="tc-mark__orbit" d="M4.31 9.25 A13.5 13.5 0 1 1 9.25 27.69" />
        <path className="tc-mark__orbit tc-mark__orbit--faint" d="M25.78 20.61 A9.5 9.5 0 1 1 23.25 6.27" />
        {/* Porosity: an irregular cluster of unequal voids, offset from centre.
            Read as particle, pore, carbon, matter - none of them literally. */}
        <circle className="tc-mark__pore" cx="14.2" cy="17.8" r="2.1" />
        <circle className="tc-mark__pore" cx="18.9" cy="15.1" r="1.15" />
        <circle className="tc-mark__pore" cx="17.6" cy="20.4" r="1.4" />
        <circle className="tc-mark__pore" cx="12.1" cy="13.4" r="0.85" />
        <circle className="tc-mark__pore" cx="21.2" cy="19" r="0.72" />
        <circle className="tc-mark__pore" cx="10.6" cy="19.6" r="0.6" />
        <circle className="tc-mark__pore" cx="15" cy="11.6" r="0.5" />
      </svg>
      {wordmark && (
        <span className="tc-mark__wordmark">
          <span className="tc-mark__name">terra carbon</span>
          {descriptor != null && <span className="tc-mark__descriptor">{descriptor}</span>}
        </span>
      )}
    </span>
  );
});
