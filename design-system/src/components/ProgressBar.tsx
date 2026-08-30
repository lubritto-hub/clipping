import * as React from 'react';
import { cx } from '../utils';

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Completion, 0-100. Values outside the range are clamped. */
  value: number;
  /** Uppercase micro-label above the track. */
  label?: React.ReactNode;
  /** Show the percentage at the top-right. */
  showValue?: boolean;
  /** Override the printed value, e.g. `'1.8M / 2M tCO₂'`. */
  valueLabel?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Fill colour. `verdant` is the biomass-to-instrument gradient. */
  tone?: 'accent' | 'organic' | 'earth' | 'warning' | 'danger' | 'iridescent' | 'verdant';
}

/**
 * A determinate progress track. The fill glows in its own colour, so it holds
 * up on the dark register without a border.
 *
 * @example
 * <ProgressBar label="2030 removal target" value={62} showValue tone="verdant" />
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, label, showValue = false, valueLabel, size = 'md', tone = 'accent', className, ...rest },
  ref
) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  return (
    <div ref={ref} className={cx('tc-progress', className)} {...rest}>
      {(label != null || showValue) && (
        <div className="tc-progress__header">
          {label != null && <span className="tc-progress__label">{label}</span>}
          {showValue && (
            <span className="tc-progress__value">{valueLabel ?? `${Math.round(clamped)}%`}</span>
          )}
        </div>
      )}
      <div
        className={cx('tc-progress__track', `tc-progress__track--size-${size}`)}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cx('tc-progress__fill', tone !== 'accent' && `tc-progress__fill--${tone}`)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
});
