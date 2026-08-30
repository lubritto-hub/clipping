import * as React from 'react';
import { Badge, Table } from '@terra-carbon/design-system';

const COLUMNS = [
  { key: 'project', header: 'project' },
  { key: 'region', header: 'region' },
  { key: 'methodology', header: 'methodology' },
  { key: 'status', header: 'status' },
  { key: 'tonnes', header: 'tCO₂', numeric: true },
];

const ROWS = [
  { project: 'Cerrado Biochar', region: 'Brazil', methodology: 'VM0044', status: <Badge tone="success" dot>verified</Badge>, tonnes: '128,400' },
  { project: 'Rift Valley Kilns', region: 'Kenya', methodology: 'Puro', status: <Badge tone="warning">pending</Badge>, tonnes: '84,120' },
  { project: 'Mekong Husk', region: 'Vietnam', methodology: 'VM0044', status: <Badge tone="organic">in field</Badge>, tonnes: '39,880' },
  { project: 'Deccan Residue', region: 'India', methodology: 'Isometric', status: <Badge tone="neutral">draft</Badge>, tonnes: '12,640' },
];

export const Default = () => (
  <Table columns={COLUMNS} rows={ROWS} hoverable
    caption="Verified removals by project, last 12 months." />
);

export const Striped = () => <Table columns={COLUMNS} rows={ROWS} striped />;

export const Compact = () => <Table columns={COLUMNS} rows={ROWS} compact striped />;

export const Empty = () => (
  <Table columns={COLUMNS} rows={[]} emptyMessage="No projects match these filters." />
);
