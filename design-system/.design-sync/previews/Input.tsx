import * as React from 'react';
import { Input, Stack } from '@terra-carbon/design-system';

export const Basic = () => (
  <Stack gap="md" style={{ maxWidth: 320 }}>
    <Input label="project id" placeholder="TC-0000" hint="Case sensitive." />
    <Input label="registry account" defaultValue="terra-carbon-br" />
  </Stack>
);

export const Adornments = () => (
  <Stack gap="md" style={{ maxWidth: 320 }}>
    <Input label="tonnes removed" endAdornment="tCO₂" defaultValue="1,200" />
    <Input label="price per tonne" startAdornment="US$" defaultValue="132.00" />
  </Stack>
);

export const States = () => (
  <Stack gap="md" style={{ maxWidth: 320 }}>
    <Input label="required field" required placeholder="Cannot be empty" />
    <Input label="registry" defaultValue="XX-01" error="Registry not recognised." />
    <Input label="locked" defaultValue="TC-0417" disabled />
  </Stack>
);

export const Sizes = () => (
  <Stack gap="md" style={{ maxWidth: 320 }}>
    <Input label="small" size="sm" placeholder="Compact" />
    <Input label="medium" size="md" placeholder="Default" />
    <Input label="large" size="lg" placeholder="Prominent" />
  </Stack>
);
