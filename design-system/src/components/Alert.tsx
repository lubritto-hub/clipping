import * as React from 'react';
import { cx } from '../utils';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'organic' | 'earth';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactNode;
  tone?: AlertTone;
  /** Short uppercase lead-in. The component tracks and uppercases it. */
  title?: React.ReactNode;
  /** Show a dismiss control and call this when it is activated. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss control. Defaults to `'Dismiss'`. */
  dismissLabel?: string;
}

/**
 * An inline message. Terra Carbon's voice is calm and factual - state what
 * happened and what it means, without exclamation.
 *
 * @example
 * <Alert tone="warning" title="data delayed">
 *   Field sensors last reported 6 hours ago.
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { children, tone = 'info', title, onDismiss, dismissLabel = 'Dismiss', className, ...rest },
  ref
) {
  return (
    <div ref={ref} role="status" className={cx('tc-alert', `tc-alert--${tone}`, className)} {...rest}>
      <span className="tc-alert__marker" aria-hidden="true" />
      <div className="tc-alert__content">
        {title != null && <p className="tc-alert__title">{title}</p>}
        {children != null && <div className="tc-alert__body">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="tc-alert__dismiss" onClick={onDismiss} aria-label={dismissLabel}>
          &times;
        </button>
      )}
    </div>
  );
});
