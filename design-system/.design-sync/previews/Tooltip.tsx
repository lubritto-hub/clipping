import * as React from 'react';
import { Badge, Stack, Text, Tooltip } from '@terra-carbon/design-system';

/* `open` is forced so the bubble renders in a static capture. In an app,
   leave it unset and let hover and focus drive it. */
export const Placements = () => (
  <Stack gap="3xl" align="center" style={{ padding: '56px 24px' }}>
    <Stack direction="horizontal" gap="3xl" align="center" justify="center">
      <Tooltip content="Sits above" placement="top" open><Badge tone="accent">top</Badge></Tooltip>
      <Tooltip content="Sits below" placement="bottom" open><Badge tone="accent">bottom</Badge></Tooltip>
    </Stack>
    <Stack direction="horizontal" gap="3xl" align="center" justify="center">
      <Tooltip content="Sits left" placement="left" open><Badge tone="accent">left</Badge></Tooltip>
      <Tooltip content="Sits right" placement="right" open><Badge tone="accent">right</Badge></Tooltip>
    </Stack>
  </Stack>
);

export const OnStatus = () => (
  <Stack style={{ padding: '48px 24px' }} align="center">
    <Tooltip content="Verified under Verra VM0044 on 14 March 2026" open>
      <Badge tone="success" dot>verified</Badge>
    </Tooltip>
  </Stack>
);

export const Interactive = () => (
  <Stack style={{ padding: 24 }} align="center">
    <Tooltip content="Hover or focus to reveal">
      <Text tone="accent">Hover this label</Text>
    </Tooltip>
  </Stack>
);
