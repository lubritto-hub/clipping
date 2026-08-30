import * as React from 'react';
import { Checkbox, Stack } from '@terra-carbon/design-system';

export const Basic = () => (
  <Stack gap="sm">
    <Checkbox label="Include retired credits" defaultChecked />
    <Checkbox label="Include pending verification" />
  </Stack>
);

export const WithDescription = () => (
  <Stack gap="sm" style={{ maxWidth: 380 }}>
    <Checkbox label="Include retired credits" defaultChecked
      description="Adds credits already retired on-chain to the total." />
    <Checkbox label="Group by methodology"
      description="Splits the report into VM0044, Puro and Isometric sections." />
  </Stack>
);

export const States = () => (
  <Stack gap="sm">
    <Checkbox label="Checked" defaultChecked />
    <Checkbox label="Unchecked" />
    <Checkbox label="Indeterminate" indeterminate />
    <Checkbox label="Disabled" disabled defaultChecked />
  </Stack>
);
