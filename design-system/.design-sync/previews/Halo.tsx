import * as React from 'react';
import { Halo, Stack, Stat, TerraCarbonProvider, Text } from '@terra-carbon/design-system';

export const BehindANumber = () => (
  <TerraCarbonProvider theme="dark" style={{ padding: 56, borderRadius: 16 }}>
    <Halo>
      <Stat variant="projected" value="1.8M+" unit="tons of CO₂ removed" />
    </Halo>
  </TerraCarbonProvider>
);

export const Tones = () => (
  <TerraCarbonProvider theme="dark" style={{ padding: 48, borderRadius: 16 }}>
    <Stack direction="horizontal" gap="3xl" justify="center">
      <Halo tight><Text eyebrow>cool</Text></Halo>
      <Halo tight tone="flare"><Text eyebrow>flare</Text></Halo>
    </Stack>
  </TerraCarbonProvider>
);
