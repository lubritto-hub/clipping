import * as React from 'react';
import { cx } from '../utils';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: React.ReactNode;
  /**
   * `primary` is the one committed action on a view. `frost` is the
   * translucent glass control - it only reads correctly over imagery or a
   * gradient wash, never on a flat surface.
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'frost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Swap the label for a spinner and block interaction. */
  loading?: boolean;
  /** Stretch to the full width of the container. */
  fullWidth?: boolean;
  /** Glyph before the label. Keep it to a single small mark. */
  startIcon?: React.ReactNode;
  /** Glyph after the label. */
  endIcon?: React.ReactNode;
}

/**
 * The action control. Pill geometry throughout; on hover the primary variant
 * blooms rather than lifting on a shadow.
 *
 * Labels are sentence case and short - two words where possible.
 *
 * @example
 * <Button variant="primary" size="lg">Read the report</Button>
 * <Button variant="frost">Explore projects</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', loading = false, fullWidth = false, startIcon, endIcon, disabled, className, type = 'button', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'tc-button',
        `tc-button--${variant}`,
        `tc-button--size-${size}`,
        fullWidth && 'tc-button--full',
        className
      )}
      {...rest}
    >
      {loading ? <span className="tc-button__spinner" aria-hidden="true" /> : startIcon}
      {children}
      {!loading && endIcon}
    </button>
  );
});
