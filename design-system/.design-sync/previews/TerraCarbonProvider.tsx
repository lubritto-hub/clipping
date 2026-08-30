import * as React from 'react';
import { Badge, Button, Heading, Stack, Stat, TerraCarbonProvider, Text } from '@terra-carbon/design-system';

const Sample = () => (
  <Stack gap="md">
    <Text eyebrow tone="subtle">terra carbon</Text>
    <Heading level={4}>capturing carbon, restoring tomorrow.</Heading>
    <Stack direction="horizontal" gap="sm" align="center">
      <Button size="sm">Read the report</Button>
      <Badge tone="success" dot>live</Badge>
    </Stack>
  </Stack>
);

export const LightRegister = () => (
  <TerraCarbonProvider theme="light" style={{ padding: 32, borderRadius: 18 }}>
    <Sample />
  </TerraCarbonProvider>
);

export const DarkRegister = () => (
  <TerraCarbonProvider theme="dark" style={{ padding: 32, borderRadius: 18 }}>
    <Sample />
  </TerraCarbonProvider>
);

export const Atmosphere = () => (
  <TerraCarbonProvider theme="dark" grain wash leak halo style={{ padding: 40, borderRadius: 18 }}>
    <Stack gap="lg">
      <Sample />
      <Stat variant="display" value="1.8M+" unit="tons of CO₂ removed" />
    </Stack>
  </TerraCarbonProvider>
);
