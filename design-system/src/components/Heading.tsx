import * as React from 'react';
import { cx } from '../utils';

export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> {
  children?: React.ReactNode;
  /**
   * Visual and semantic level. `1`-`3` are the light-weight editorial display
   * sizes; `4`-`5` are section headings; **`6` is the eyebrow** - small,
   * uppercase and widely tracked, not a tiny headline.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Render a different tag than `level` implies, to keep the outline correct. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  /** Fill the type with the pearlescent sweep. One line per view, never a paragraph. */
  iridescent?: boolean;
  /** Emit light. `'strong'` is the hero treatment and belongs on dark grounds. */
  glow?: false | 'normal' | 'strong';
}

/**
 * Display and section type.
 *
 * The editorial voice comes from weight and tracking, not size alone: levels
 * 1-3 render at `--tc-font-weight-light` with negative tracking. Set copy in
 * sentence case - the brand's wordmark and headlines are lowercase.
 *
 * @example
 * <Heading level={6}>our impact</Heading>
 * <Heading level={1} glow="strong">capturing carbon, restoring tomorrow.</Heading>
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { children, level = 2, as, iridescent = false, glow = false, className, ...rest },
  ref
) {
  const Component = (as ?? (`h${level}` as const)) as React.ElementType;
  return (
    <Component
      ref={ref}
      className={cx(
        'tc-heading',
        `tc-heading--level-${level}`,
        iridescent && 'tc-heading--iridescent',
        glow === 'normal' && 'tc-heading--glow',
        glow === 'strong' && 'tc-heading--glow-strong',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
