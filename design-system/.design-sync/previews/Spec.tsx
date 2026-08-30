import * as React from 'react';
import { Spec, Stack, Stat } from '@terra-carbon/design-system';

export const Rows = () => (
  <Spec style={{ maxWidth: 360 }} items={[
    { label: 'feedstock', value: 'rice husk · 62%' },
    { label: 'pyrolysis', value: '540 °C' },
    { label: 'h/c org ratio', value: '0.31' },
    { label: 'permanence', value: '>1000 yr', accent: true },
    { label: 'standard', value: 'Verra VM0044' },
  ]} />
);

export const Columns = () => (
  <Spec layout="columns" style={{ maxWidth: 620 }} items={[
    { label: 'fixed carbon', value: '84.7%', accent: true },
    { label: 'batch', value: '0241' },
    { label: 'permanence', value: '>1000 yr' },
    { label: 'verified', value: '18.08.26' },
  ]} />
);

/** The scale tension the brand runs on: 120px numeral, 10px spec. */
export const UnderABigNumber = () => (
  <Stack gap="lg">
    <Stat variant="display" value="1.8M+" unit="tons of CO₂ removed" />
    <Spec layout="columns" style={{ maxWidth: 620 }} items={[
      { label: 'lat', value: '−15.7801' },
      { label: 'long', value: '−47.9292' },
      { label: 'batch', value: '0241' },
      { label: 'mrv', value: 'VM0044' },
    ]} />
  </Stack>
);
