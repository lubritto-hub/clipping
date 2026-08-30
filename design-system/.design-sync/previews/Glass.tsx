import * as React from 'react';
import { Glass, Heading, Stack, TerraCarbonProvider, Text } from '@terra-carbon/design-system';

/** Glass only reads as glass over something - always shown on a halo wash. */
export const Orb = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 48, borderRadius: 18 }}>
    <Stack direction="horizontal" gap="xl" align="center" justify="center">
      <Glass orb size={160} />
      <Glass orb size={96} />
    </Stack>
  </TerraCarbonProvider>
);

export const Panel = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 48, borderRadius: 18 }}>
    <Glass style={{ padding: 28, maxWidth: 360 }}>
      <Stack gap="xs">
        <Text eyebrow tone="subtle">capturing carbon</Text>
        <Heading level={4}>restoring tomorrow.</Heading>
      </Stack>
    </Glass>
  </TerraCarbonProvider>
);

/** Real optics: caustics through the body, a dispersion fringe on the rim. */
export const PearlAndDroplets = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 48, borderRadius: 18 }}>
    <Stack direction="horizontal" gap="2xl" align="center" justify="center">
      <Glass orb size={150} droplets />
      <Glass orb size={150} pearl />
      <Glass orb size={150} pearl droplets />
    </Stack>
  </TerraCarbonProvider>
);

export const OnLight = () => (
  <TerraCarbonProvider theme="light" halo style={{ padding: 48, borderRadius: 18 }}>
    <Stack direction="horizontal" gap="xl" align="center" justify="center">
      <Glass orb size={140} />
      <Glass style={{ padding: 24, width: 220 }}>
        <Text size="sm" tone="muted">Frosted panel over a halo wash.</Text>
      </Glass>
    </Stack>
  </TerraCarbonProvider>
);
