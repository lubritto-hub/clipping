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

/** Projected: a blurred duplicate behind the glyphs - soft, never illegible. */
export const Projected = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 48, borderRadius: 18 }}>
    <Stat variant="projected" value="250K+" unit="hectares of soils enhanced" />
  </TerraCarbonProvider>
);

/** The number is the image: vary the optics so it never reads as a data label. */
export const Optics = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 44, borderRadius: 18 }}>
    <Stack gap="xl">
      <Stat variant="display" optic="edge" value="1.8M+" unit="chromatic edge" />
      <Stat variant="display" optic="soft" value="1.8M+" unit="soft focus" />
      <Stat variant="display" optic="veiled" value="1.8M+" unit="veiled" />
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
