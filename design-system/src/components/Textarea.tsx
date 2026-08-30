import * as React from 'react';
import { cx } from '../utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Uppercase micro-label above the control. */
  label?: React.ReactNode;
  /** Helper line below the control. Hidden while `error` is set. */
  hint?: React.ReactNode;
  /** Error message. Its presence marks the control invalid. */
  error?: React.ReactNode;
  required?: boolean;
  /** Stretch to the container width. Defaults to `true`. */
  fullWidth?: boolean;
}

/**
 * A multi-line text field. Vertically resizable; set `rows` for the resting
 * height rather than a fixed CSS height.
 *
 * @example
 * <Textarea label="site notes" rows={4} placeholder="Observations from the field visit" />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, required = false, fullWidth = true, rows = 4, className, id, ...rest },
  ref
) {
  const reactId = React.useId();
  const fieldId = id ?? reactId;
  const messageId = `${fieldId}-message`;
  const invalid = error != null;

  return (
    <div className={cx('tc-field', fullWidth && 'tc-field--full')}>
      {label != null && (
        <label className="tc-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="tc-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={hint != null || invalid ? messageId : undefined}
        className={cx('tc-control', 'tc-control--textarea', invalid && 'tc-control--invalid', className)}
        {...rest}
      />
      {invalid ? (
        <span className="tc-field__error" id={messageId}>{error}</span>
      ) : (
        hint != null && <span className="tc-field__hint" id={messageId}>{hint}</span>
      )}
    </div>
  );
});
