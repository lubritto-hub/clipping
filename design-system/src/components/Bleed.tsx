import * as React from 'react';
import { cx } from '../utils';

export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Which edges the content escapes past. Defaults to `['right']`. */
  sides?: Array<'left' | 'right' | 'top' | 'bottom'>;
  /** How far it escapes. A CSS length; defaults to `var(--tc-space-3xl)`. */
  amount?: string;
  /** Clip at the container edge, so the child is genuinely cut off. */
  clip?: boolean;
}

/**
 * Breaks the grid.
 *
 * The layouts in this system are deliberately asymmetric: a photograph runs
 * into the text column, a numeral is cut by the frame, one element is far
 * larger than the page. Wrap that element in a Bleed.
 *
 * @example
 * <Bleed sides={['right']} amount="var(--tc-space-4xl)">
 *   <Figure src="/biomass.jpg" alt="Rice husk feedstock" ratio={3 / 2} tone="earth" />
 * </Bleed>
 */
export const Bleed = React.forwardRef<HTMLDivElement, BleedProps>(function Bleed(
  { children, sides = ['right'], amount, clip = false, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        'tc-bleed',
        ...sides.map((side) => `tc-bleed--${side}`),
        clip && 'tc-bleed--clip',
        className
      )}
      style={amount ? { ['--tc-bleed-amount' as string]: amount, ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
});
