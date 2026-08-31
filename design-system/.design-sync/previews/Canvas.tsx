import * as React from 'react';
import { Canvas, Place, Heading, Spec, Stat, Text, TerraCarbonProvider } from '@terra-carbon/design-system';

const Cell = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ outline: '1px dashed var(--tc-color-hairline)', height: '100%', minHeight: 26 }}>{children}</div>
);

/** The frame is never symmetric — equal padding is the institutional-deck tell. */
export const AsymmetricFrame = () => (
  <TerraCarbonProvider theme="dark" style={{ height: 300 }}>
    <Canvas rows={6} ground substrate
      frame={{ top: 'var(--tc-space-lg)', right: 'var(--tc-space-3xl)', bottom: 'var(--tc-space-2xl)', left: 'var(--tc-space-xs)' }}>
      <Place col={1} span={7} row={2} rowSpan={2}>
        <Heading level={4}>one protagonist,<br />breaking an edge.</Heading>
      </Place>
      <Place col={1} span={4} row={6} align="end">
        <Text eyebrow data-register="secondary">micro against display — 14× apart</Text>
      </Place>
      <span className="tc-micro-edge tc-micro-edge--right">canvas · 12 col</span>
    </Canvas>
  </TerraCarbonProvider>
);

/** Escape is how the grid stops being a container. */
export const Escape = () => (
  <TerraCarbonProvider theme="dark" style={{ height: 300 }}>
    <Canvas rows={6} ground>
      <Place col={1} span={8} row={3} rowSpan={2} escape={['left']} escapeBy="var(--tc-space-2xl)">
        <Stat variant="hero" light="crossing" seed={4} note="foot" value="1000" unit="years · permanence" />
      </Place>
      <Place col={9} span={4} row={5} rowSpan={2} align="end">
        <Spec items={[{ label: 'batch', value: '0241' }, { label: 'verified', value: '18.08.26', accent: true }]} />
      </Place>
    </Canvas>
  </TerraCarbonProvider>
);

/** Placement grid: at least one quadrant stays completely empty. */
export const Placement = () => (
  <TerraCarbonProvider theme="light" style={{ height: 280 }}>
    <Canvas rows={6}>
      <Place col={1} span={3} row={1} rowSpan={2}><Cell /></Place>
      <Place col={5} span={4} row={2} rowSpan={3}><Cell /></Place>
      <Place col={10} span={3} row={1} rowSpan={1}><Cell /></Place>
      <Place col={9} span={4} row={5} rowSpan={2}><Cell /></Place>
    </Canvas>
  </TerraCarbonProvider>
);
