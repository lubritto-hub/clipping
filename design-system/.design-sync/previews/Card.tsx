import * as React from 'react';
import { Badge, Button, Card, Stack, Stat, Text } from '@terra-carbon/design-system';

export const WithMetric = () => (
  <Card
    title="Carbon removal"
    description="Verified tonnes, last 12 months"
    action={<Badge tone="success" dot>live</Badge>}
    footer={<Button size="sm" variant="ghost">View report</Button>}
    style={{ maxWidth: 340 }}
  >
    <Stat label="total removed" value="1,876,320" unit="tCO₂" delta="+8.2%" deltaDirection="up" variant="plain" />
  </Card>
);

export const Surfaces = () => (
  <Stack direction="horizontal" gap="lg" wrap align="stretch">
    <Card title="Pearlescent" description="The hero surface" surface="iridescent" style={{ width: 240 }}>
      <Text size="sm" tone="muted">One per view. Catches the light.</Text>
    </Card>
    <Card title="Solid" description="The everyday container" style={{ width: 240 }}>
      <Text size="sm" tone="muted">Used for everything else.</Text>
    </Card>
  </Stack>
);

export const Elevations = () => (
  <Stack direction="horizontal" gap="lg" wrap align="stretch">
    <Card title="None" elevation="none" style={{ width: 190 }}><Text size="sm" tone="muted">Flat</Text></Card>
    <Card title="Small" elevation="sm" style={{ width: 190 }}><Text size="sm" tone="muted">Default bloom</Text></Card>
    <Card title="Large" elevation="lg" style={{ width: 190 }}><Text size="sm" tone="muted">Lifted</Text></Card>
  </Stack>
);
