import * as React from 'react';
import { cx } from '../utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** The label beside the box. */
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  /** Render the dash state, for a partially-selected group. */
  indeterminate?: boolean;
}

/**
 * A single checkbox with its label. For a set of related options, lay several
 * out in a `<Stack gap="sm">`.
 *
 * @example
 * <Checkbox label="Include retired credits" description="Adds credits already retired on-chain." />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, disabled, className, id, ...rest },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const innerRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cx('tc-choice', disabled && 'tc-choice--disabled', className)} htmlFor={inputId}>
      <input
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className="tc-choice__input"
        {...rest}
      />
      <span className="tc-choice__text">
        {label != null && <span className="tc-choice__label">{label}</span>}
        {description != null && <span className="tc-choice__description">{description}</span>}
      </span>
    </label>
  );
});
