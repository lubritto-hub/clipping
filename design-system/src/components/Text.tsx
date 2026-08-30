import * as React from 'react';
import { cx } from '../utils';

export type TextTone =
  | 'default' | 'muted' | 'subtle' | 'accent'
  | 'success' | 'warning' | 'danger' | 'inverse'
  | 'organic' | 'earth';

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  children?: React.ReactNode;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold';
  /** Colour role. `organic` and `earth` are the material tones, not statuses. */
  tone?: TextTone;
  /** Tabular monospace - use for any figure that sits in a column. */
  mono?: boolean;
  /**
   * The micro-label treatment: uppercase, widely tracked, 11px. This is the
   * system's most recognisable type gesture - use it for captions, legends
   * and metric labels.
   */
  eyebrow?: boolean;
  /** Clip to a single line with an ellipsis. */
  truncate?: boolean;
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'li';
}

/**
 * Body and label type.
 *
 * @example
 * <Text eyebrow tone="subtle">tons of CO₂ removed</Text>
 * <Text size="lg" tone="muted">We scale biochar solutions that remove carbon.</Text>
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { children, size = 'md', weight, tone = 'default', mono = false, eyebrow = false, truncate = false, as = 'p', className, ...rest },
  ref
) {
  const Component = as as React.ElementType;
  return (
    <Component
      ref={ref}
      className={cx(
        'tc-text',
        `tc-text--size-${size}`,
        weight && `tc-text--weight-${weight}`,
        `tc-text--tone-${tone}`,
        mono && 'tc-text--mono',
        eyebrow && 'tc-text--eyebrow',
        truncate && 'tc-text--truncate',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
