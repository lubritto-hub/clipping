import * as React from 'react';
import { Heading, Stack, TerraCarbonProvider } from '@terra-carbon/design-system';

export const Scale = () => (
  <Stack gap="md">
    <Heading level={6}>our impact</Heading>
    <Heading level={1}>transforming waste into climate impact.</Heading>
    <Heading level={2}>engineered by nature, scalable by technology.</Heading>
    <Heading level={3}>capturing carbon, restoring tomorrow.</Heading>
    <Heading level={4}>Section heading</Heading>
    <Heading level={5}>Subsection heading</Heading>
  </Stack>
);

export const Iridescent = () => (
  <Heading level={2} iridescent>capturing carbon, restoring tomorrow.</Heading>
);

export const Glowing = () => (
  <TerraCarbonProvider theme="dark" halo style={{ padding: 40, borderRadius: 18 }}>
    <Heading level={2} glow="strong">transforming waste into climate impact.</Heading>
  </TerraCarbonProvider>
);
