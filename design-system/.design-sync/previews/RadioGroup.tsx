import * as React from 'react';
import { RadioGroup, Stack } from '@terra-carbon/design-system';

export const Vertical = () => (
  <RadioGroup name="horizon-v" legend="reporting horizon" defaultValue="12m"
    options={[
      { value: '12m', label: '12 months' },
      { value: '24m', label: '24 months' },
      { value: 'all', label: 'All time', description: 'Since project inception' },
    ]} />
);

export const Horizontal = () => (
  <RadioGroup name="unit-h" legend="unit" defaultValue="t" direction="horizontal"
    options={[
      { value: 't', label: 'Tonnes' },
      { value: 'kt', label: 'Kilotonnes' },
      { value: 'mt', label: 'Megatonnes' },
    ]} />
);

export const WithDisabled = () => (
  <RadioGroup name="tier-d" legend="verification tier" defaultValue="full"
    options={[
      { value: 'full', label: 'Full audit', description: 'Third-party site visit' },
      { value: 'desk', label: 'Desk review' },
      { value: 'none', label: 'Self-reported', description: 'Not eligible for issuance', disabled: true },
    ]} />
);
