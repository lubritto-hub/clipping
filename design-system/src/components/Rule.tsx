import * as React from 'react';
import { cx } from '../utils';

export interface RuleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Technical label set into the line, e.g. `02 — science`. */
  label?: React.ReactNode;
}

/**
 * A hairline divider, optionally carrying a section label.
 *
 * Structure in this system is drawn with the thinnest line that renders —
 * reach for a Rule before a bordered container.
 *
 * @example
 * <Rule label="02 — science" />
 */
export const Rule = React.forwardRef<HTMLDivElement, RuleProps>(function Rule(
  { label, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx('tc-rule', label == null && 'tc-rule--plain', className)} role="separator" {...rest}>
      {label != null && <span className="tc-rule__line" />}
      {label != null && <span className="tc-rule__label">{label}</span>}
    </div>
  );
});
