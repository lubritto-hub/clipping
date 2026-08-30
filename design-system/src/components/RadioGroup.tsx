import * as React from 'react';
import { cx } from '../utils';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Shared form name for the options. */
  name: string;
  options: RadioOption[];
  /** Uncontrolled initial selection. */
  defaultValue?: string;
  /** Controlled selection. Pair with `onChange`. */
  value?: string;
  onChange?: (value: string) => void;
  /** Uppercase micro-label above the set. */
  legend?: React.ReactNode;
  /** Lay the options out in a row instead of a column. */
  direction?: 'vertical' | 'horizontal';
}

/**
 * A set of mutually exclusive options, wrapped in a fieldset so the legend is
 * announced with each choice.
 *
 * @example
 * <RadioGroup
 *   name="horizon"
 *   legend="reporting horizon"
 *   defaultValue="12m"
 *   options={[{ value: '12m', label: '12 months' }, { value: 'all', label: 'All time' }]}
 * />
 */
export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { name, options, defaultValue, value, onChange, legend, direction = 'vertical', className, ...rest },
  ref
) {
  return (
    <fieldset
      ref={ref}
      className={cx('tc-radio-group', direction === 'horizontal' && 'tc-radio-group--horizontal', className)}
      {...rest}
    >
      {legend != null && <legend className="tc-radio-group__legend">{legend}</legend>}
      {options.map((option) => (
        <label
          key={option.value}
          className={cx('tc-choice', option.disabled && 'tc-choice--disabled')}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            disabled={option.disabled}
            className="tc-choice__input"
            {...(value !== undefined
              ? { checked: value === option.value }
              : { defaultChecked: defaultValue === option.value })}
            onChange={(event) => onChange?.(event.target.value)}
          />
          <span className="tc-choice__text">
            <span className="tc-choice__label">{option.label}</span>
            {option.description != null && (
              <span className="tc-choice__description">{option.description}</span>
            )}
          </span>
        </label>
      ))}
    </fieldset>
  );
});
