import * as React from 'react';
import { Canvas, Place, Text, TerraCarbonProvider } from '@terra-carbon/design-system';

const Box = ({ label }: { label: string }) => (
  <div style={{
    height: '100%', minHeight: 30, display: 'flex', alignItems: 'center', padding: '0 10px',
    background: 'var(--tc-color-accent-subtle)', border: '1px solid var(--tc-color-accent-border)',
  }}>
    <Text size="xs" mono>{label}</Text>
  </div>
);

export const Columns = () => (
  <TerraCarbonProvider theme="dark" style={{ height: 260 }}>
    <Canvas rows={6}>
      <Place col={1} span={5} row={1} rowSpan={2}><Box label="col 1 · span 5" /></Place>
      <Place col={7} span={6} row={3} rowSpan={2}><Box label="col 7 · span 6" /></Place>
      <Place col={2} span={4} row={5} rowSpan={2}><Box label="col 2 · span 4" /></Place>
    </Canvas>
  </TerraCarbonProvider>
);

export const Escapes = () => (
  <TerraCarbonProvider theme="dark" style={{ height: 260 }}>
    <Canvas rows={4}>
      <Place col={1} span={6} row={1} rowSpan={2} escape={['left']}><Box label="escape left" /></Place>
      <Place col={7} span={6} row={3} rowSpan={2} escape={['right']}><Box label="escape right" /></Place>
    </Canvas>
  </TerraCarbonProvider>
);

/** Drift only takes effect on a demoted register — a drifted headline reads as a bug. */
export const Drift = () => (
  <TerraCarbonProvider theme="dark" style={{ height: 200 }}>
    <Canvas rows={3}>
      <Place col={2} span={7} row={2} drift="-1.2deg">
        <Text size="sm" data-register="secondary">a drifted caption reads as a print artefact</Text>
      </Place>
    </Canvas>
  </TerraCarbonProvider>
);
