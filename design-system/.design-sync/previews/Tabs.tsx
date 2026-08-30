import * as React from 'react';
import { Stack, Tabs, Text } from '@terra-carbon/design-system';

export const Underline = () => (
  <Tabs items={[
    { id: 'overview', label: 'overview', content: <Text tone="muted">Total removals, active projects and this quarter's verification queue.</Text> },
    { id: 'projects', label: 'projects', badge: 23 },
    { id: 'impact', label: 'impact' },
    { id: 'reports', label: 'reports' },
  ]} />
);

export const Pills = () => (
  <Tabs variant="pills" items={[
    { id: '12m', label: '12 months', content: <Text tone="muted">Rolling twelve-month window.</Text> },
    { id: 'ytd', label: 'ytd' },
    { id: 'all', label: 'all time' },
  ]} />
);

export const WithDisabled = () => (
  <Stack gap="lg">
    <Tabs items={[
      { id: 'summary', label: 'summary', content: <Text tone="muted">Available now.</Text> },
      { id: 'audit', label: 'audit trail' },
      { id: 'issuance', label: 'issuance', disabled: true },
    ]} />
  </Stack>
);
