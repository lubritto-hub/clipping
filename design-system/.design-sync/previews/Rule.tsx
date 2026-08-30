import * as React from 'react';
import { Rule, Stack, Text } from '@terra-carbon/design-system';

export const Labelled = () => (
  <Stack gap="2xl" style={{ width: 520 }}>
    <Rule label="02 — impact" />
    <Rule label="03 — science" />
    <Rule label="06 — mrv / dashboard" />
  </Stack>
);

export const Plain = () => (
  <Stack gap="lg" style={{ width: 520 }}>
    <Text tone="muted">Structure is drawn with the thinnest line that renders.</Text>
    <Rule />
    <Text size="sm" tone="subtle">Reach for a Rule before a bordered container.</Text>
  </Stack>
);
