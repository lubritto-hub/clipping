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
 * Deliberately abstract: two offset orbits around a porous core. It can be
 * read as carbon, a cycle, matter, transformation, an orbit, or the porosity
 * of biochar itself — without depicting any of them. There is no leaf.
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
        {/* Two orbits, offset — cycle and transformation, never concentric. */}
        <circle className="tc-mark__orbit" cx="16" cy="16" r="14" />
        <circle className="tc-mark__orbit tc-mark__orbit--faint" cx="18.5" cy="14" r="10.5" />
        {/* The core, held open. */}
        <circle className="tc-mark__core" cx="16" cy="16" r="5.2" />
        {/* Porosity — irregular voids, the material read at macro. */}
        <circle className="tc-mark__pore" cx="16" cy="16" r="1.5" />
        <circle className="tc-mark__pore" cx="10.2" cy="20.4" r="1.05" />
        <circle className="tc-mark__pore" cx="22.6" cy="21.2" r="0.8" />
        <circle className="tc-mark__pore" cx="21.4" cy="9.6" r="1.25" />
        <circle className="tc-mark__pore" cx="9.4" cy="12.2" r="0.62" />
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
