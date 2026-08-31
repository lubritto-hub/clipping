import * as React from 'react';
import { Mark, Stack, TerraCarbonProvider, Text } from '@terra-carbon/design-system';

/** There is no company name yet - the symbol has to carry the identity alone. */
export const Symbol = () => (
  <Stack direction="horizontal" gap="xl" align="center">
    <Mark size={16} />
    <Mark size={24} />
    <Mark size={40} />
    <Mark size={72} />
    <Mark size={128} />
  </Stack>
);

export const OnDark = () => (
  <TerraCarbonProvider theme="dark" style={{ padding: 48, borderRadius: 4 }}>
    <Stack direction="horizontal" gap="2xl" align="center">
      <Mark size={96} />
      <Mark size={96} glow />
    </Stack>
  </TerraCarbonProvider>
);

/** Refraction: a diffuse input, an interface, an output that does not return. */
export const Reading = () => (
  <Stack gap="lg" style={{ maxWidth: 420 }}>
    <Mark size={110} />
    <Text size="sm" tone="muted">
      A wide band arrives, meets a curved interface, and leaves on a permanently
      different path — narrower, deflected, exiting the frame. The beam never
      returns to where it started, which is what permanent removal means.
    </Text>
  </Stack>
);
