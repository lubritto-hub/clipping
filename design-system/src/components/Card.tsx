import * as React from 'react';
import { cx } from '../utils';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactNode;
  /** Heading line. Omit both title and description to get a bare surface. */
  title?: React.ReactNode;
  /** Supporting line under the title. */
  description?: React.ReactNode;
  /** Rendered at the top-right of the header - a Badge, a menu, a control. */
  action?: React.ReactNode;
  /** Rendered in the footer, below a hairline rule. */
  footer?: React.ReactNode;
  /**
   * Depth, expressed as bloom rather than a cast shadow. Defaults to `'sm'`.
   */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * `frost` is translucent glass and needs something behind it to refract.
   * `iridescent` is the pearlescent hero surface - one per view.
   * **`bare` removes the container entirely** (no background, border or
   * radius) so content sits directly on the page - reach for it whenever a
   * section should not read as a dashboard panel.
   */
  surface?: 'solid' | 'frost' | 'iridescent' | 'bare';
  /** Drop the corner radius. Square modules are a deliberate register here. */
  square?: boolean;
  /** Pool diffuse light behind the card, so it floats in front of a plane. */
  halo?: boolean;
  /** Let a light leak cross the surface, as if the frame were over-exposed. */
  leak?: boolean;
  /** Add hover bloom and a pointer, for a whole-card link or button. */
  interactive?: boolean;
  /** Drop the body padding, e.g. when the body is a Table. */
  flushBody?: boolean;
}

/**
 * The general content container.
 *
 * @example
 * <Card title="Carbon removal" description="Verified tonnes, last 12 months"
 *       action={<Badge tone="success" dot>live</Badge>}>
 *   <Stat label="total removed" value="1,876,320" unit="tCO₂" />
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, title, description, action, footer, elevation = 'sm', surface = 'solid', square = false, halo = false, leak = false, interactive = false, flushBody = false, className, ...rest },
  ref
) {
  const hasHeader = title != null || description != null || action != null;
  return (
    <div
      ref={ref}
      className={cx(
        'tc-card',
        `tc-card--elevation-${elevation}`,
        surface !== 'solid' && `tc-card--${surface}`,
        square && 'tc-card--square',
        halo && 'tc-card--halo',
        leak && 'tc-card--leak',
        interactive && 'tc-card--interactive',
        className
      )}
      {...rest}
    >
      {hasHeader && (
        <div className="tc-card__header">
          <div className="tc-card__titles">
            {title != null && <h3 className="tc-card__title">{title}</h3>}
            {description != null && <p className="tc-card__description">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children != null && (
        <div className={cx('tc-card__body', flushBody && 'tc-card__body--flush')}>{children}</div>
      )}
      {footer != null && <div className="tc-card__footer">{footer}</div>}
    </div>
  );
});
