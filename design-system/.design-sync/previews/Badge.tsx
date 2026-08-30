import * as React from 'react';
import { Badge, Stack } from '@terra-carbon/design-system';

export const StatusTones = () => (
  <Stack direction="horizontal" gap="xs" wrap align="center">
    <Badge tone="neutral">draft</Badge>
    <Badge tone="accent">registered</Badge>
    <Badge tone="success" dot>verified</Badge>
    <Badge tone="info">under review</Badge>
    <Badge tone="warning">pending</Badge>
    <Badge tone="danger">rejected</Badge>
  </Stack>
);

export const MaterialTones = () => (
  <Stack direction="horizontal" gap="xs" wrap align="center">
    <Badge tone="organic">biomass</Badge>
    <Badge tone="earth">soil carbon</Badge>
    <Badge tone="iridescent">flagship</Badge>
  </Stack>
);

export const Shapes = () => (
  <Stack direction="horizontal" gap="xs" wrap align="center">
    <Badge tone="accent">pill</Badge>
    <Badge tone="accent" square>square</Badge>
    <Badge tone="success" dot>with dot</Badge>
  </Stack>
);
