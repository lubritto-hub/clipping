import * as React from 'react';
import { cx } from '../utils';

export type ProcessStage = 'earth' | 'heat' | 'carbon' | 'atmosphere';

export interface ProcessStepProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Which moment of the transformation this is. The stage — not a prop you
   * tune — decides the colour wash, so the four steps of a process never read
   * as four equal boxes: `earth` is warm and granular, `heat` industrial and
   * flaring, `carbon` near-black and tactile, `atmosphere` icy and weightless.
   */
  stage: ProcessStage;
  /** Ordinal, e.g. `'01'`. Rendered as tracked monospace. */
  index?: React.ReactNode;
  /** Step name, e.g. `'pyrolysis'`. */
  name: React.ReactNode;
  /** **One** technical figure. Resist adding a second. */
  datum?: React.ReactNode;
  /** The photograph for this step. */
  children?: React.ReactNode;
}

/**
 * One moment in biomass → pyrolysis → biochar → permanence.
 *
 * The palette tells the transformation: earth → heat → carbon → atmosphere.
 * Give each step a differently-treated photograph (`Figure` `tone` and
 * `focus`) and exactly one number; a row of identically-treated cards is the
 * failure mode this component exists to prevent.
 *
 * @example
 * <ProcessStep stage="heat" index="02" name="pyrolysis" datum="540 °C">
 *   <Figure src="/kiln.jpg" alt="Kiln interior" ratio={3 / 4} tone="flare" flash />
 * </ProcessStep>
 */
export const ProcessStep = React.forwardRef<HTMLDivElement, ProcessStepProps>(function ProcessStep(
  { stage, index, name, datum, children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx('tc-step', `tc-step--${stage}`, className)} {...rest}>
      <div className="tc-step__frame">
        {children}
        <span className="tc-step__wash" aria-hidden="true" />
      </div>
      {index != null && <span className="tc-step__index">{index}</span>}
      <span className="tc-step__name">{name}</span>
      {datum != null && <span className="tc-step__datum">{datum}</span>}
    </div>
  );
});

export interface ProcessProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** Row container for `ProcessStep`s. */
export const Process = React.forwardRef<HTMLDivElement, ProcessProps>(function Process(
  { children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx('tc-process', className)} {...rest}>
      {children}
    </div>
  );
});
