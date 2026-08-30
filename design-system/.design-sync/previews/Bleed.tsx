import * as React from 'react';
import { Bleed, Card, Stack, Stat, Text, TerraCarbonProvider } from '@terra-carbon/design-system';

/** A numeral escaping the left edge of its frame — the grid, broken. */
export const NumberCutByFrame = () => (
  <TerraCarbonProvider theme="dark" style={{ padding: 0, borderRadius: 16, overflow: 'hidden' }}>
    <Bleed sides={['left']} amount="var(--tc-space-2xl)" clip>
      <div style={{ padding: 'var(--tc-space-2xl) 0' }}>
        <Stat variant="colossal" value="1.8M+" unit="tons of CO₂ removed" />
      </div>
    </Bleed>
  </TerraCarbonProvider>
);

export const ContentRunningOut = () => (
  <Card surface="bare" style={{ border: '1px dashed var(--tc-color-hairline)', padding: 24, overflow: 'hidden' }}>
    <Stack gap="md">
      <Text size="sm" tone="subtle">The dashed frame is the container.</Text>
      <Bleed sides={['right']} amount="var(--tc-space-2xl)">
        <Card square style={{ padding: 16 }}>
          <Text size="sm">This module runs past the right edge.</Text>
        </Card>
      </Bleed>
    </Stack>
  </Card>
);
