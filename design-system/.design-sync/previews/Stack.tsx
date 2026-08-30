import * as React from 'react';
import { Badge, Card, Stack, Text } from '@terra-carbon/design-system';

const Box = ({ children }: { children: React.ReactNode }) => (
  <Card elevation="none" style={{ padding: '10px 16px' }}>
    <Text size="sm" tone="muted">{children}</Text>
  </Card>
);

export const Vertical = () => (
  <Stack gap="sm" style={{ maxWidth: 280 }}>
    <Box>Feedstock intake</Box>
    <Box>Pyrolysis</Box>
    <Box>Field application</Box>
  </Stack>
);

export const Horizontal = () => (
  <Stack direction="horizontal" gap="sm" align="center">
    <Box>Brazil</Box>
    <Box>Kenya</Box>
    <Box>Vietnam</Box>
  </Stack>
);

export const GapScale = () => (
  <Stack gap="lg">
    <Stack direction="horizontal" gap="2xs"><Badge>2xs</Badge><Badge>gap</Badge></Stack>
    <Stack direction="horizontal" gap="sm"><Badge>sm</Badge><Badge>gap</Badge></Stack>
    <Stack direction="horizontal" gap="xl"><Badge>xl</Badge><Badge>gap</Badge></Stack>
  </Stack>
);

export const SpacedApart = () => (
  <Stack direction="horizontal" justify="between" align="center" style={{ width: 420 }}>
    <Text eyebrow tone="subtle">active projects</Text>
    <Badge tone="success" dot>23 live</Badge>
  </Stack>
);
