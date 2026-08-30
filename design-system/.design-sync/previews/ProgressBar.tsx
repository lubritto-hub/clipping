import * as React from 'react';
import { ProgressBar, Stack } from '@terra-carbon/design-system';

export const Tones = () => (
  <Stack gap="lg" style={{ width: 420 }}>
    <ProgressBar label="2030 removal target" value={62} showValue tone="verdant" />
    <ProgressBar label="soil enhancement" value={41} showValue tone="organic" />
    <ProgressBar label="feedstock secured" value={78} showValue tone="earth" />
    <ProgressBar label="kiln capacity" value={93} showValue tone="warning" />
  </Stack>
);

export const Sizes = () => (
  <Stack gap="lg" style={{ width: 420 }}>
    <ProgressBar label="small" value={45} size="sm" />
    <ProgressBar label="medium" value={65} size="md" />
    <ProgressBar label="large" value={85} size="lg" />
  </Stack>
);

export const CustomValue = () => (
  <ProgressBar label="progress to target" value={94} showValue
    valueLabel="1.88M / 2M tCO₂" tone="verdant" style={{ width: 420 }} />
);
