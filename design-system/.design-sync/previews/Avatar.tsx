import * as React from 'react';
import { Avatar, Stack } from '@terra-carbon/design-system';

export const Sizes = () => (
  <Stack direction="horizontal" gap="sm" align="center">
    <Avatar initials="TC" size="sm" />
    <Avatar initials="AR" size="md" />
    <Avatar initials="MK" size="lg" />
    <Avatar initials="JS" size="xl" />
  </Stack>
);

export const Shapes = () => (
  <Stack direction="horizontal" gap="sm" align="center">
    <Avatar initials="TC" size="lg" />
    <Avatar initials="TC" size="lg" square />
  </Stack>
);

export const GhostEcho = () => (
  <Stack direction="horizontal" gap="2xs" align="center">
    <Avatar initials="TC" size="lg" ghost />
    <Avatar initials="TC" size="lg" />
  </Stack>
);
