import * as React from 'react';
import { Pagination, Stack, Text } from '@terra-carbon/design-system';

export const Middle = () => <Pagination page={7} pageCount={24} />;

export const FirstPage = () => <Pagination page={1} pageCount={24} />;

export const ShortRange = () => <Pagination page={2} pageCount={4} />;

export const InContext = () => (
  <Stack direction="horizontal" justify="between" align="center" style={{ width: 520 }}>
    <Text size="sm" tone="subtle">Showing 61–70 of 236 projects</Text>
    <Pagination page={7} pageCount={24} />
  </Stack>
);
