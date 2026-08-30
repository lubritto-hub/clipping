import * as React from 'react';
import { Stack, Stat, TerraCarbonProvider } from '@terra-carbon/design-system';

/** The BIG NUMBER, in the dark register it was designed for. */
export const BigNumber = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 40, borderRadius: 18 }}>
    <Stat variant="display" value="1.8M+" unit="tons of CO₂ removed" caption="and counting" />
  </TerraCarbonProvider>
);

export const ImpactRow = () => (
  <TerraCarbonProvider theme="dark" style={{ padding: 40, borderRadius: 18 }}>
    <Stack gap="xl">
      <Stat variant="display" value="250K+" unit="hectares of soils enhanced" />
      <Stat variant="display" value="40+" unit="partners driving global change" />
    </Stack>
  </TerraCarbonProvider>
);

export const Cards = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Stat label="active projects" value="23" caption="across 12 countries" style={{ minWidth: 210 }} />
    <Stat label="removed this quarter" value="412K" unit="tCO₂" delta="+8.2%" deltaDirection="up" style={{ minWidth: 210 }} />
    <Stat label="pending verification" value="88K" unit="tCO₂" delta="−2.1%" deltaDirection="down" style={{ minWidth: 210 }} />
  </Stack>
);

export const Pearl = () => (
  <Stat variant="iridescent" label="soil organic carbon" value="98.4" unit="%" caption="of monitored plots improving" style={{ maxWidth: 300 }} />
);
