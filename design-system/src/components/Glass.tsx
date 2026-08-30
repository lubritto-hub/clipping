import * as React from 'react';
import { cx } from '../utils';

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Render as a circle - the floating orb from the brand imagery. */
  orb?: boolean;
  /** Fixed square size in px. Handy for orbs; omit to size from content. */
  size?: number;
  /** Pearlescent sweep across the body - translucent plastic, not clear glass. */
  pearl?: boolean;
  /** Condensation: small refracting beads over the surface. */
  droplets?: boolean;
  /** The hard catch-light near the top-left. On by default. */
  specular?: boolean;
}

/**
 * A translucent, refracting plate - the liquid-glass surface the brand is
 * built on. It carries a specular highlight and blurs whatever is behind it.
 *
 * Not glassmorphism: it carries real optical behaviour - caustics thrown
 * through the body, a dispersion fringe on the rim where the glass splits
 * light into colour, and a specular catch-light.
 *
 * **It only reads as glass over something.** Place it over imagery, a
 * gradient wash, or a `TerraCarbonProvider` with `halo` - over a flat
 * background it collapses into a plain panel.
 *
 * The abstract glass object is a brand signature: an orb, a lens, a bead.
 * Use it as an image in its own right, not as a container.
 *
 * @example
 * <Glass orb size={180} />
 * <Glass style={{ padding: 24 }}>
 *   <Text eyebrow>capturing carbon</Text>
 * </Glass>
 */
export const Glass = React.forwardRef<HTMLDivElement, GlassProps>(function Glass(
  { children, orb = false, size, pearl = false, droplets = false, specular = true, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx('tc-glass', orb && 'tc-glass--orb', pearl && 'tc-glass--pearl', className)}
      style={size != null ? { width: size, height: size, ...style } : style}
      {...rest}
    >
      {specular && <span className="tc-glass__specular" aria-hidden="true" />}
      {droplets && <span className="tc-glass__droplets" aria-hidden="true" />}
      {children}
    </div>
  );
});
