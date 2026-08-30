import * as React from 'react';
import { Alert, Stack } from '@terra-carbon/design-system';

export const Tones = () => (
  <Stack gap="sm">
    <Alert tone="info" title="reporting window">Q3 data consolidates on 15 October.</Alert>
    <Alert tone="success" title="verification complete">128,400 tCO₂ verified under Verra VM0044.</Alert>
    <Alert tone="warning" title="data delayed">Field sensors last reported 6 hours ago.</Alert>
    <Alert tone="danger" title="threshold breached">Kiln temperature exceeded the permitted range.</Alert>
  </Stack>
);

export const MaterialTones = () => (
  <Stack gap="sm">
    <Alert tone="organic" title="soil health">Organic carbon up 0.4pp across monitored plots.</Alert>
    <Alert tone="earth" title="feedstock">Next delivery of rice husk arrives Thursday.</Alert>
  </Stack>
);

export const Dismissible = () => (
  <Alert tone="info" title="new methodology" onDismiss={() => {}}>
    VM0044 v1.2 applies to registrations from January.
  </Alert>
);
