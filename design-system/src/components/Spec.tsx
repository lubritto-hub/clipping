import * as React from 'react';
import { cx } from '../utils';

export interface SpecItem {
  /** Field name, e.g. `feedstock` or `permanence`. Rendered uppercase. */
  label: React.ReactNode;
  /** The reading. Monospaced and tabular — keep it terse. */
  value: React.ReactNode;
  /** Print the value in the accent colour, for the one figure that matters. */
  accent?: boolean;
}

export interface SpecProps extends Omit<React.HTMLAttributes<HTMLDListElement>, 'children'> {
  items: SpecItem[];
  /**
   * `rows` is a ruled list (label left, value right). `columns` lays the pairs
   * out side by side under hairline verticals — use it beneath a big number.
   */
  layout?: 'rows' | 'columns';
}

/**
 * Technical microtypography — the science layer.
 *
 * This is the counterweight to the big numbers: batch IDs, coordinates,
 * feedstock, fixed carbon, permanence, MRV standard, verification dates. The
 * tension between a 120px numeral and a 10px tracked spec row is most of what
 * makes the system read as instrumentation rather than marketing.
 *
 * @example
 * <Spec items={[
 *   { label: 'batch', value: '0241' },
 *   { label: 'fixed carbon', value: '84.7%', accent: true },
 *   { label: 'permanence', value: '>1000 yr' },
 *   { label: 'verified', value: '18.08.26' },
 * ]} />
 */
export const Spec = React.forwardRef<HTMLDListElement, SpecProps>(function Spec(
  { items, layout = 'rows', className, ...rest },
  ref
) {
  return (
    <dl
      ref={ref}
      className={cx('tc-spec', layout === 'columns' && 'tc-spec--columns', className)}
      {...rest}
    >
      {items.map((item, index) => (
        <div className="tc-spec__row" key={index}>
          <dt className="tc-spec__label">{item.label}</dt>
          <dd className={cx('tc-spec__value', item.accent && 'tc-spec__value--accent')}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
});
