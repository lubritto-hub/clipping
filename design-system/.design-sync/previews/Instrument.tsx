import * as React from 'react';
import { Instrument, Stack } from '@terra-carbon/design-system';

const SERIES = [8, 11, 17, 15, 24, 33, 39, 52, 61, 78, 96];

export const Readout = () => (
  <Instrument label="removals · tCO₂" reading="1,876,320" points={SERIES}
    scale={['2021', '2026']} area baseline style={{ maxWidth: 460 }} />
);

export const Bare = () => (
  <Instrument points={SERIES} height={64} style={{ maxWidth: 380 }} />
);

export const WithTicks = () => (
  <Instrument label="kiln temperature · °C" reading="540" ticks={9} baseline
    points={[470, 505, 528, 512, 540, 552, 538, 541, 540]}
    scale={['t−8h', 'now']} style={{ maxWidth: 460 }} />
);

export const Small = () => (
  <Stack direction="horizontal" gap="xl" wrap>
    <Instrument label="soil carbon" reading="+0.4pp" height={48} points={[3, 4, 6, 5, 8, 11]} style={{ width: 200 }} />
    <Instrument label="moisture" reading="11.2%" height={48} points={[18, 16, 15, 13, 12, 11]} style={{ width: 200 }} />
  </Stack>
);
