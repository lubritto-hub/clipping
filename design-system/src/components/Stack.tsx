import * as React from 'react';
import { cx } from '../utils';

export type StackGap = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface StackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode;
  /** Main axis. Defaults to `'vertical'`. */
  direction?: 'vertical' | 'horizontal';
  /** Space between children, from the spacing scale. Defaults to `'md'`. */
  gap?: StackGap;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Allow children to wrap onto more lines. */
  wrap?: boolean;
  /** Render as a different element, e.g. `'section'` or `'ul'`. */
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'nav' | 'ul' | 'li';
}

/**
 * The layout primitive. Everything in a Terra Carbon layout is a Stack -
 * reach for it before writing a bespoke flex rule, so spacing stays on the
 * scale. Composition in this system is deliberately airy: prefer a gap one
 * step larger than feels necessary.
 *
 * @example
 * <Stack gap="xl" align="center">
 *   <Heading level={2}>transforming waste into climate impact.</Heading>
 *   <Button>Read the report</Button>
 * </Stack>
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
  { children, direction = 'vertical', gap = 'md', align, justify, wrap = false, as = 'div', className, ...rest },
  ref
) {
  const Component = as as React.ElementType;
  return (
    <Component
      ref={ref}
      className={cx(
        'tc-stack',
        `tc-stack--${direction}`,
        `tc-stack--gap-${gap}`,
        align && `tc-stack--align-${align}`,
        justify && `tc-stack--justify-${justify}`,
        wrap && 'tc-stack--wrap',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
