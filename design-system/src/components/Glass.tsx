import * as React from 'react';
import { cx } from '../utils';

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Render as a circle - the floating orb from the brand imagery. */
  orb?: boolean;
  /** Fixed square size in px. Handy for orbs; omit to size from content. */
  size?: number;
}

/**
 * A translucent, refracting plate - the liquid-glass surface the brand is
 * built on. It carries a specular highlight and blurs whatever is behind it.
 *
 * **It only reads as glass over something.** Place it over imagery, a
 * gradient wash, or a `TerraCarbonProvider` with `halo` - over a flat
 * background it collapses into a plain panel.
 *
 * @example
 * <Glass orb size={180} />
 * <Glass style={{ padding: 24 }}>
 *   <Text eyebrow>capturing carbon</Text>
 * </Glass>
 */
export const Glass = React.forwardRef<HTMLDivElement, GlassProps>(function Glass(
  { children, orb = false, size, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx('tc-glass', orb && 'tc-glass--orb', className)}
      style={size != null ? { width: size, height: size, ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
});
