import * as React from 'react';
import { cx } from '../utils';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** The tip text. Keep it to a line or two. */
  content: React.ReactNode;
  /** The element the tip describes. */
  children: React.ReactNode;
  /** Which side the bubble sits on. Defaults to `'top'`. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Force the bubble open. Useful for documentation and previews; leave it
   * unset in an app so hover and focus drive it.
   */
  open?: boolean;
}

/**
 * A small hover/focus label. It shows on pointer enter *and* keyboard focus,
 * so the tip is reachable without a mouse.
 *
 * @example
 * <Tooltip content="Verified under Verra VM0044">
 *   <Badge tone="success" dot>verified</Badge>
 * </Tooltip>
 */
export const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, children, placement = 'top', open, className, ...rest },
  ref
) {
  const [hovered, setHovered] = React.useState(false);
  const visible = open ?? hovered;
  const tipId = React.useId();

  return (
    <span
      ref={ref}
      className={cx('tc-tooltip', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-describedby={visible ? tipId : undefined}
      {...rest}
    >
      {children}
      {visible && (
        <span role="tooltip" id={tipId} className={cx('tc-tooltip__bubble', `tc-tooltip__bubble--${placement}`)}>
          {content}
        </span>
      )}
    </span>
  );
});
