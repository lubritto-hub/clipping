import * as React from 'react';
import { Select, Stack } from '@terra-carbon/design-system';

const REGIONS = [
  { value: 'br', label: 'Brazil' },
  { value: 'ke', label: 'Kenya' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'in', label: 'India' },
];

export const Basic = () => (
  <Select label="region" placeholder="All regions" options={REGIONS} style={{ maxWidth: 300 }} />
);

export const Selected = () => (
  <Select label="methodology" defaultValue="vm0044" style={{ maxWidth: 300 }}
    options={[
      { value: 'vm0044', label: 'Verra VM0044' },
      { value: 'puro', label: 'Puro.earth Biochar' },
      { value: 'isometric', label: 'Isometric Biochar' },
    ]} />
);

export const States = () => (
  <Stack gap="md" style={{ maxWidth: 300 }}>
    <Select label="required" required placeholder="Pick one" options={REGIONS} />
    <Select label="invalid" placeholder="Pick one" options={REGIONS} error="Select a region to continue." />
    <Select label="disabled" disabled defaultValue="br" options={REGIONS} />
  </Stack>
);
