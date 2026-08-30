import * as React from 'react';
import { cx } from '../utils';

export interface TerraCarbonProviderProps {
  /** The application tree. */
  children?: React.ReactNode;
  /**
   * Which colour register to render in. `'system'` follows the OS setting.
   * Anything else is written to `data-theme` on this element, so a subtree
   * can opt into the opposite register from the rest of the page.
   */
  theme?: 'light' | 'dark' | 'system';
  /**
   * Lay the film-grain plate over everything inside. This is the scanned
   * -magazine texture that keeps large flat areas from looking sterile.
   */
  grain?: boolean;
  /** Use the heavier grain. Only meaningful when `grain` is set. */
  grainStrength?: 'normal' | 'strong';
  /** Paint the ambient halo wash behind the content - for hero areas. */
  halo?: boolean;
  /** Stretch to at least the full height of its container. */
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Root wrapper for every Terra Carbon interface.
 *
 * It establishes the type stack, the base text colour and the page
 * background, and it is where the theme is chosen. **Components rendered
 * outside a `TerraCarbonProvider` still work, but inherit the host page's
 * font and background** - so wrap the app once, at the top.
 *
 * @example
 * <TerraCarbonProvider theme="dark" grain halo fill>
 *   <Dashboard />
 * </TerraCarbonProvider>
 */
export const TerraCarbonProvider = React.forwardRef<HTMLDivElement, TerraCarbonProviderProps>(
  function TerraCarbonProvider(
    { children, theme = 'system', grain = false, grainStrength = 'normal', halo = false, fill = false, className, style },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-theme={theme === 'system' ? undefined : theme}
        className={cx(
          'tc-root',
          fill && 'tc-root--fill',
          halo && 'tc-root--halo',
          grain && 'tc-grain',
          grain && grainStrength === 'strong' && 'tc-grain--strong',
          className
        )}
        style={style}
      >
        {children}
      </div>
    );
  }
);
