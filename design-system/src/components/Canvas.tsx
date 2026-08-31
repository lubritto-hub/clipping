import * as React from 'react';
import { cx } from '../utils';

export interface CanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Grid rows. 6 is the editorial default; 8 for denser technical frames. */
  rows?: 6 | 8;
  /**
   * Frame insets, in spacing-scale steps. **They must not be equal** — the
   * light side and the heavy side should differ by at least two steps.
   * Equal padding on four sides is the single largest source of the
   * institutional-deck read. Defaults are already asymmetric.
   */
  frame?: { top?: string; right?: string; bottom?: string; left?: string };
  /** Paint the weather plates (density/lumen) behind the content. */
  ground?: boolean;
  /** Add the visible print/scan substrate over everything. */
  substrate?: boolean;
}

/**
 * A 12-column editorial frame.
 *
 * Every child should be a `Place` declaring where it sits. The rules that
 * keep a frame from looking like a template:
 *
 * - **One protagonist** — a display headline OR a numeral, never both. It
 *   occupies at least ~40% of the canvas and **breaks at least one edge**
 *   (`escape` on its `Place`).
 * - **≥14× scale contrast** between the largest and smallest type. Nothing
 *   sits in the middle of the scale.
 * - **Leave a quadrant empty.** At least one 3×4 block of cells stays bare.
 * - **One element out of the reading flow** — an edge label, a caption inside
 *   the numeral's counter-space, a spec block against the far margin.
 *
 * @example
 * <Canvas rows={6} ground substrate>
 *   <Place col={1} span={7} row={3} rowSpan={3} escape={['left']}>
 *     <Stat variant="colossal" value="128,400" />
 *   </Place>
 *   <Place col={9} span={4} row={6} align="end">
 *     <Spec items={specs} />
 *   </Place>
 * </Canvas>
 */
export const Canvas = React.forwardRef<HTMLDivElement, CanvasProps>(function Canvas(
  { children, rows = 6, frame, ground = false, substrate = false, className, style, ...rest },
  ref
) {
  const frameVars = frame
    ? {
        ...(frame.top ? { ['--tc-frame-top']: frame.top } : {}),
        ...(frame.right ? { ['--tc-frame-right']: frame.right } : {}),
        ...(frame.bottom ? { ['--tc-frame-bottom']: frame.bottom } : {}),
        ...(frame.left ? { ['--tc-frame-left']: frame.left } : {}),
      }
    : {};
  return (
    <div
      ref={ref}
      className={cx(
        'tc-canvas',
        `tc-canvas--rows-${rows}`,
        ground && 'tc-ground',
        substrate && 'tc-substrate',
        className
      )}
      style={{ ...frameVars, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface PlaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Start column, 1–12. */
  col?: number;
  /** Column span. */
  span?: number;
  /** Start row. */
  row?: number;
  /** Row span. */
  rowSpan?: number;
  /** Edges this element escapes past — how the grid stops being a container. */
  escape?: Array<'left' | 'right' | 'top' | 'bottom'>;
  /** How far it escapes. A CSS length; defaults to `var(--tc-space-2xl)`. */
  escapeBy?: string;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  /** Rotation, for controlled imperfection. Only takes effect on a demoted register. */
  drift?: string;
}

/**
 * Explicit placement inside a `Canvas`.
 *
 * In each frame, at least one element should start before column 3 or end
 * after column 10, and at least one should `escape` an edge.
 *
 * @example
 * <Place col={7} span={6} row={1} rowSpan={4} escape={['right', 'top']}>
 *   <Figure register="char" src={src} alt="Char macro" ratio={1.9} />
 * </Place>
 */
export const Place = React.forwardRef<HTMLDivElement, PlaceProps>(function Place(
  { children, col, span, row, rowSpan, escape, escapeBy, align, justify, drift, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        'tc-place',
        ...(escape ?? []).map((e) => `tc-place--escape-${e}`),
        drift && 'tc-drift',
        align && `tc-place--align-${align}`,
        justify && `tc-place--justify-${justify}`,
        className
      )}
      style={
        {
          ...(col ? { gridColumnStart: col } : {}),
          ...(span ? { gridColumnEnd: `span ${span}` } : {}),
          ...(row ? { gridRowStart: row } : {}),
          ...(rowSpan ? { gridRowEnd: `span ${rowSpan}` } : {}),
          ...(escapeBy ? { ['--tc-escape']: escapeBy } : {}),
          ...(drift ? { ['--tc-drift']: drift } : {}),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
});
