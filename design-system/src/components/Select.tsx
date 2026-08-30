import * as React from 'react';
import { cx } from '../utils';

export interface SelectOption {
  /** Submitted value. */
  value: string;
  /** Visible text. */
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  /** The choices. Prefer this over passing `<option>` children. */
  options?: SelectOption[];
  /** Uppercase micro-label above the control. */
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Error message. Its presence marks the control invalid. */
  error?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  /** Leading empty choice, e.g. `'Select a project'`. */
  placeholder?: string;
  /** Stretch to the container width. Defaults to `true`. */
  fullWidth?: boolean;
}

/**
 * A native single-choice control, styled to match the other fields. Native
 * on purpose: the popup is the platform's, so it behaves correctly on touch
 * and with assistive tech.
 *
 * @example
 * <Select
 *   label="region"
 *   placeholder="All regions"
 *   options={[{ value: 'br', label: 'Brazil' }, { value: 'ke', label: 'Kenya' }]}
 * />
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options = [], label, hint, error, size = 'md', required = false, placeholder, fullWidth = true, className, id, ...rest },
  ref
) {
  const reactId = React.useId();
  const selectId = id ?? reactId;
  const messageId = `${selectId}-message`;
  const invalid = error != null;

  return (
    <div className={cx('tc-field', fullWidth && 'tc-field--full')}>
      {label != null && (
        <label className="tc-field__label" htmlFor={selectId}>
          {label}
          {required && <span className="tc-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="tc-select">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={hint != null || invalid ? messageId : undefined}
          className={cx(
            'tc-control',
            'tc-select__control',
            `tc-control--size-${size}`,
            invalid && 'tc-control--invalid',
            className
          )}
          {...rest}
        >
          {placeholder != null && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="tc-select__chevron" aria-hidden="true" />
      </div>
      {invalid ? (
        <span className="tc-field__error" id={messageId}>{error}</span>
      ) : (
        hint != null && <span className="tc-field__hint" id={messageId}>{hint}</span>
      )}
    </div>
  );
});
