import * as React from 'react';
import { cx } from '../utils';

export type BadgeTone =
  | 'neutral' | 'accent' | 'success' | 'info' | 'warning' | 'danger'
  | 'organic' | 'earth' | 'iridescent';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children?: React.ReactNode;
  /**
   * `organic` and `earth` are the material tones - use them for what a thing
   * *is* (biomass, soil) rather than how it is doing. `iridescent` is the
   * pearlescent chip: at most one per view.
   */
  tone?: BadgeTone;
  /** Show the glowing status dot before the label. */
  dot?: boolean;
  /** Square off the pill into a tag. */
  square?: boolean;
}

/**
 * A small uppercase chip for status and classification. Labels are one or
 * two words; the component tracks and uppercases them for you, so pass
 * ordinary text.
 *
 * @example
 * <Badge tone="success" dot>verified</Badge>
 * <Badge tone="earth">soil carbon</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, tone = 'neutral', dot = false, square = false, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cx('tc-badge', `tc-badge--${tone}`, square && 'tc-badge--square', className)}
      {...rest}
    >
      {dot && <span className="tc-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
});
