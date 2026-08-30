import * as React from 'react';
import { Button, Modal, Text } from '@terra-carbon/design-system';

/* `contained` keeps the backdrop inside this frame instead of the viewport,
   so the dialog renders inside the card. Omit it in an app. */
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative', height: 380, borderRadius: 18, overflow: 'hidden' }}>{children}</div>
);

export const Confirm = () => (
  <Frame>
    <Modal open contained title="Retire credits" description="This action is permanent."
      footer={<><Button variant="ghost">Cancel</Button><Button>Retire 1,200 tCO₂</Button></>}>
      <Text>
        Retiring removes these credits from circulation and issues a public retirement
        certificate. It cannot be undone.
      </Text>
    </Modal>
  </Frame>
);

export const Small = () => (
  <Frame>
    <Modal open contained size="sm" title="Discard draft?"
      footer={<><Button variant="ghost">Keep editing</Button><Button variant="danger">Discard</Button></>}>
      <Text size="sm" tone="muted">Unsaved changes to TC-0417 will be lost.</Text>
    </Modal>
  </Frame>
);
