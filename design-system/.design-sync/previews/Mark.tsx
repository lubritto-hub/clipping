import * as React from 'react';
import { Mark, Stack, TerraCarbonProvider } from '@terra-carbon/design-system';

export const Glyph = () => (
  <Stack direction="horizontal" gap="xl" align="center">
    <Mark size={24} />
    <Mark size={40} />
    <Mark size={64} />
    <Mark size={96} />
  </Stack>
);

export const Wordmark = () => <Mark size={40} wordmark />;

export const OnDark = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 44, borderRadius: 16 }}>
    <Mark size={48} wordmark glow />
  </TerraCarbonProvider>
);
