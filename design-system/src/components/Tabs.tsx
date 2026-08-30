import * as React from 'react';
import { cx } from '../utils';

export interface TabItem {
  /** Stable id, used as the selected value. */
  id: string;
  /** Tab text. Rendered uppercase and widely tracked. */
  label: React.ReactNode;
  /** Small count beside the label. */
  badge?: React.ReactNode;
  disabled?: boolean;
  /** Panel content for this tab. */
  content?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  items: TabItem[];
  /** Uncontrolled initial tab. Defaults to the first enabled tab. */
  defaultValue?: string;
  /** Controlled selection. Pair with `onChange`. */
  value?: string;
  onChange?: (id: string) => void;
  /** `underline` is the editorial default; `pills` is the compact segmented control. */
  variant?: 'underline' | 'pills';
}

/**
 * Tabbed navigation with its panels. Works uncontrolled out of the box; pass
 * `value` and `onChange` to drive it from outside.
 *
 * @example
 * <Tabs items={[
 *   { id: 'overview', label: 'overview', content: <Overview /> },
 *   { id: 'projects', label: 'projects', badge: 23, content: <Projects /> },
 * ]} />
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, defaultValue, value, onChange, variant = 'underline', className, ...rest },
  ref
) {
  const firstEnabled = items.find((item) => !item.disabled)?.id;
  const [internal, setInternal] = React.useState(defaultValue ?? firstEnabled);
  const active = value ?? internal;
  const activeItem = items.find((item) => item.id === active);

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  return (
    <div ref={ref} className={cx('tc-tabs', variant === 'pills' && 'tc-tabs--pills', className)} {...rest}>
      <div className="tc-tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tc-tab-${item.id}`}
            aria-selected={item.id === active}
            aria-controls={`tc-panel-${item.id}`}
            disabled={item.disabled}
            onClick={() => select(item.id)}
            className={cx('tc-tabs__tab', item.id === active && 'tc-tabs__tab--active')}
          >
            {item.label}
            {item.badge != null && <span className="tc-tabs__tab-badge">{item.badge}</span>}
          </button>
        ))}
      </div>
      {activeItem?.content != null && (
        <div
          className="tc-tabs__panel"
          role="tabpanel"
          id={`tc-panel-${activeItem.id}`}
          aria-labelledby={`tc-tab-${activeItem.id}`}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
});
