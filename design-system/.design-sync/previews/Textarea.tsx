import * as React from 'react';
import { Stack, Textarea } from '@terra-carbon/design-system';

export const Basic = () => (
  <Textarea
    label="site notes"
    rows={4}
    style={{ maxWidth: 380 }}
    defaultValue="Kiln 3 running at reduced load. Feedstock moisture above target; drying extended by two days."
  />
);

export const WithHint = () => (
  <Textarea label="verification comment" rows={3} style={{ maxWidth: 380 }}
    hint="Visible to the auditor only." placeholder="Add context for this submission" />
);

export const Invalid = () => (
  <Textarea label="methodology deviation" rows={3} style={{ maxWidth: 380 }}
    defaultValue="n/a" error="Describe the deviation in at least 40 characters." />
);
