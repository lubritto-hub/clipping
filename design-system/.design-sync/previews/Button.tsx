import * as React from 'react';
import { Button, Stack } from '@terra-carbon/design-system';

export const Variants = () => (
  <Stack direction="horizontal" gap="sm" align="center" wrap>
    <Button variant="primary">Read the report</Button>
    <Button variant="secondary">Explore projects</Button>
    <Button variant="ghost">View methodology</Button>
    <Button variant="danger">Retire credits</Button>
  </Stack>
);

export const Sizes = () => (
  <Stack direction="horizontal" gap="sm" align="center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </Stack>
);

export const States = () => (
  <Stack direction="horizontal" gap="sm" align="center" wrap>
    <Button loading>Verifying</Button>
    <Button disabled>Unavailable</Button>
    <Button startIcon={<span aria-hidden="true">↓</span>}>Download data</Button>
    <Button fullWidth>Full width</Button>
  </Stack>
);
