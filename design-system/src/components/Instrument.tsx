import * as React from 'react';
import { cx } from '../utils';

export interface InstrumentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The series. Plotted evenly across the width; two points minimum. */
  points: number[];
  /** Field name above the plot, e.g. `removals · 2021–2026`. */
  label?: React.ReactNode;
  /** Current reading, printed at the top right in the accent colour. */
  reading?: React.ReactNode;
  /** Plot height in px. Defaults to `88` — these are readouts, not hero charts. */
  height?: number;
  /** Fill the area under the trace at very low opacity. */
  area?: boolean;
  /** Mark the latest point with the luminous head. Defaults to `true`. */
  head?: boolean;
  /** Draw the hairline baseline under the trace. */
  baseline?: boolean;
  /** Evenly spaced hairline ticks — a scale, not a grid. */
  ticks?: number;
  /** Small labels under the plot, e.g. `['2021', '2026']`. */
  scale?: [React.ReactNode, React.ReactNode];
}

/**
 * A conceptual data readout.
 *
 * Deliberately not a business chart: one hairline trace, no gridlines, no axis
 * furniture, and a single luminous point at the head. It should read as a
 * scientific instrument — an oscilloscope or a spectrometer — rather than a
 * dashboard widget.
 *
 * @example
 * <Instrument
 *   label="removals · tCO₂"
 *   reading="1,876,320"
 *   points={[12, 18, 26, 31, 44, 58, 61, 79, 96]}
 *   scale={['2021', '2026']}
 *   area
 * />
 */
export const Instrument = React.forwardRef<HTMLDivElement, InstrumentProps>(function Instrument(
  { points, label, reading, height = 88, area = false, head = true, baseline = false, ticks = 0, scale, className, ...rest },
  ref
) {
  const W = 100;
  const H = 40;
  const PAD = 2;
  const clean = points.filter((n) => Number.isFinite(n));
  const min = Math.min(...clean);
  const max = Math.max(...clean);
  const span = max - min || 1;
  const coords = clean.map((n, i) => {
    const x = clean.length === 1 ? W / 2 : (i / (clean.length - 1)) * W;
    const y = H - PAD - ((n - min) / span) * (H - PAD * 2);
    return [x, y] as const;
  });
  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const last = coords[coords.length - 1];

  return (
    <div ref={ref} className={cx('tc-instrument', className)} {...rest}>
      {(label != null || reading != null) && (
        <div className="tc-instrument__header">
          {label != null && <span className="tc-instrument__label">{label}</span>}
          {reading != null && <span className="tc-instrument__reading">{reading}</span>}
        </div>
      )}
      <svg
        className="tc-instrument__plot"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ height }}
        role="img"
        aria-label={typeof label === 'string' ? label : 'Data trace'}
      >
        {ticks > 0 &&
          Array.from({ length: ticks }, (_, i) => {
            const x = (i / (ticks - 1 || 1)) * W;
            return <line key={i} className="tc-instrument__tick" x1={x} y1={H - 3} x2={x} y2={H} />;
          })}
        {baseline && <line className="tc-instrument__baseline" x1={0} y1={H} x2={W} y2={H} />}
        {area && coords.length > 1 && (
          <path className="tc-instrument__area" d={`${path} L${W} ${H} L0 ${H} Z`} />
        )}
        {coords.length > 1 && <path className="tc-instrument__trace" d={path} />}
        {head && last && (
          <>
            <circle className="tc-instrument__head-glow" cx={last[0]} cy={last[1]} r={2.6} />
            <circle className="tc-instrument__head" cx={last[0]} cy={last[1]} r={0.9} />
          </>
        )}
      </svg>
      {scale && (
        <div className="tc-instrument__scale">
          <span>{scale[0]}</span>
          <span>{scale[1]}</span>
        </div>
      )}
    </div>
  );
});
