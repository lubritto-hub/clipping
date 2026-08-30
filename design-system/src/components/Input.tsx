import * as React from 'react';
import { cx } from '../utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Uppercase micro-label above the control. */
  label?: React.ReactNode;
  /** Helper line below the control. Hidden while `error` is set. */
  hint?: React.ReactNode;
  /** Error message. Its presence marks the control invalid. */
  error?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Mark the field required, visually and for assistive tech. */
  required?: boolean;
  /** Static adornment inside the leading edge - a unit, a currency, a glyph. */
  startAdornment?: React.ReactNode;
  /** Static adornment inside the trailing edge. */
  endAdornment?: React.ReactNode;
  /** Stretch to the container width. Defaults to `true`. */
  fullWidth?: boolean;
}

/**
 * A single-line text field, with its label, hint and error.
 *
 * @example
 * <Input label="project id" placeholder="TC-0000" hint="Case sensitive." />
 * <Input label="tonnes" endAdornment="tCO₂" defaultValue="1200" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, size = 'md', required = false, startAdornment, endAdornment, fullWidth = true, className, id, ...rest },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const messageId = `${inputId}-message`;
  const invalid = error != null;

  return (
    <div className={cx('tc-field', fullWidth && 'tc-field--full')}>
      {label != null && (
        <label className="tc-field__label" htmlFor={inputId}>
          {label}
          {required && <span className="tc-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="tc-input">
        {startAdornment != null && (
          <span className="tc-input__affix tc-input__affix--start">{startAdornment}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={hint != null || invalid ? messageId : undefined}
          className={cx(
            'tc-control',
            `tc-control--size-${size}`,
            invalid && 'tc-control--invalid',
            startAdornment != null && 'tc-input__control--has-start',
            endAdornment != null && 'tc-input__control--has-end',
            className
          )}
          {...rest}
        />
        {endAdornment != null && (
          <span className="tc-input__affix tc-input__affix--end">{endAdornment}</span>
        )}
      </div>
      {invalid ? (
        <span className="tc-field__error" id={messageId}>{error}</span>
      ) : (
        hint != null && <span className="tc-field__hint" id={messageId}>{hint}</span>
      )}
    </div>
  );
});
