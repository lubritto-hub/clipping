import * as React from 'react';
import { cx } from '../utils';

export interface HaloProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** `cool` is the cyan/lilac pool; `flare` is the warm one. */
  tone?: 'cool' | 'flare';
  /** Keep the pool close to the content instead of spilling well past it. */
  tight?: boolean;
}

/**
 * A plane of diffuse light behind its children.
 *
 * Depth here is luminance, not shadow: put a Halo behind a card, a number or a
 * figure and it stops sitting flat on the page.
 *
 * @example
 * <Halo>
 *   <Stat variant="projected" value="1.8M+" unit="tons of CO₂ removed" />
 * </Halo>
 */
export const Halo = React.forwardRef<HTMLDivElement, HaloProps>(function Halo(
  { children, tone = 'cool', tight = false, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx('tc-halo', tone === 'flare' && 'tc-halo--flare', tight && 'tc-halo--tight', className)}
      {...rest}
    >
      {children}
    </div>
  );
});
