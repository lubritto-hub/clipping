import * as React from 'react';
import { Stack, Text } from '@terra-carbon/design-system';

export const Sizes = () => (
  <Stack gap="xs">
    <Text size="xl">Extra large — 22px</Text>
    <Text size="lg">Large — 17px, for lead paragraphs</Text>
    <Text size="md">Medium — 15px, the body default</Text>
    <Text size="sm">Small — 13px, supporting detail</Text>
    <Text size="xs">Extra small — 12px, captions</Text>
  </Stack>
);

export const Tones = () => (
  <Stack gap="2xs">
    <Text tone="default">Default — primary reading colour</Text>
    <Text tone="muted">Muted — secondary detail</Text>
    <Text tone="subtle">Subtle — captions and metadata</Text>
    <Text tone="accent">Accent — linked or emphasised</Text>
    <Text tone="organic">Organic — living biomass</Text>
    <Text tone="earth">Earth — soil and char</Text>
    <Text tone="danger">Danger — a failed check</Text>
  </Stack>
);

export const Eyebrow = () => (
  <Stack gap="2xs">
    <Text eyebrow tone="subtle">tons of CO₂ removed</Text>
    <Text size="lg">The micro-label above is the system's most recognisable type gesture.</Text>
  </Stack>
);

export const Paragraph = () => (
  <Stack gap="sm" style={{ maxWidth: 480 }}>
    <Text size="lg" tone="muted">
      We scale biochar solutions that remove carbon, regenerate soils and build a more
      resilient future.
    </Text>
    <Text mono size="sm">1,876,320 tCO₂ · 250,412 ha · 23 projects</Text>
  </Stack>
);
