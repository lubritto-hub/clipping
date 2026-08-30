import * as React from 'react';
import {
  Slide, Stack, Heading, Text, Spec, Instrument, Stat, Glass, Mark, Rule, Bleed, Halo,
  Figure, Process, ProcessStep,
} from '@terra-carbon/design-system';

/* Stand-in plates. Real decks pass their own editorial photography. */
const plate = (seed: number, a: string, b: string, freq: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
<defs><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}"/><feColorMatrix type="saturate" values="0.3"/></filter>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient></defs>
<rect width="900" height="600" fill="url(#g)"/><rect width="900" height="600" filter="url(#f)" opacity="0.5"/></svg>`
  );
const FIGURES = plate(11, '#5b6f78', '#141c22', '0.16');
const INDUSTRY = plate(7, '#31474f', '#0b1418', '0.35');

/** 01 — Cover / manifesto. Full bleed, one headline, one technical line. */
export const CoverManifesto = () => (
  <Slide flush scrim="bottom" backdrop={
    <Figure src={FIGURES} alt="" ratio={16 / 9} smear ghostOffset={20} tone="cool" focus="soft" flash prism style={{ height: '100%' }} />
  }>
    <Stack style={{ height: '100%', padding: 'var(--tc-space-2xl)' }} justify="between">
      <Mark size={26} wordmark glow />
      <Stack gap="md">
        <Heading level={2} glow="strong">transforming waste<br />into climate impact.</Heading>
        <Text eyebrow tone="subtle">terra carbon · biochar · climate solutions · 2026</Text>
      </Stack>
    </Stack>
  </Slide>
);

/** 02 — Big statement. One sentence, an optical object entering the frame. */
export const BigStatement = () => (
  <Slide>
    <Stack style={{ height: '100%' }} justify="center" gap="lg">
      <Heading level={3} style={{ maxWidth: '70%' }}>carbon removal has a<br />permanence problem.</Heading>
      <Text eyebrow tone="subtle">01 — the problem</Text>
    </Stack>
    <Glass orb size={260} droplets style={{ position: 'absolute', right: -90, top: '20%' }} />
  </Slide>
);

/** 03 — Big number. The figure IS the image; meaning arrives tiny. */
export const BigNumber = () => (
  <Slide>
    <Stack style={{ height: '100%' }} justify="center" gap="lg">
      <Halo>
        <Bleed sides={['left']} amount="var(--tc-space-2xl)">
          <Stat variant="colossal" optic="edge" value="128,400" />
        </Bleed>
      </Halo>
      <Spec layout="columns" items={[
        { label: 'project', value: 'Cerrado Biochar' },
        { label: 'location', value: 'Goiás, BR' },
        { label: 'methodology', value: 'Verra VM0044' },
        { label: 'verified', value: '18.08.26', accent: true },
      ]} />
      <Text eyebrow tone="subtle">tonnes of durable CO₂ removal · verified</Text>
    </Stack>
  </Slide>
);

/** 04 — Science. Dark, one instrument, three or four parameters. */
export const ScienceEvidence = () => (
  <Slide>
    <Stack direction="horizontal" gap="3xl" style={{ height: '100%' }} align="center">
      <Stack gap="lg" style={{ flex: 1 }}>
        <Heading level={4}>engineered by nature,<br />scaled by technology.</Heading>
        <Spec items={[
          { label: 'feedstock', value: 'rice husk' },
          { label: 'pyrolysis', value: '540 °C' },
          { label: 'fixed c', value: '84.7%', accent: true },
          { label: 'verified', value: '18.08.26' },
        ]} />
      </Stack>
      <Instrument label="removals · tCO₂" reading="1,876,320" area style={{ flex: 1 }}
        points={[8, 11, 17, 15, 24, 33, 39, 52, 61, 78, 96]} scale={['2021', '2026']} height={150} />
    </Stack>
  </Slide>
);

/** 05 — Process. Four stages, four different treatments. */
export const ProcessSequence = () => (
  <Slide>
    <Stack gap="md" style={{ height: '100%' }}>
      <Rule label="04 — process" />
      <Process style={{ flex: 1 }}>
        <ProcessStep stage="earth" index="01" name="biomass" datum="12,400 t/yr">
          <Figure src={INDUSTRY} alt="" ratio={4 / 5} tone="earth" grain wash />
        </ProcessStep>
        <ProcessStep stage="heat" index="02" name="pyrolysis" datum="540 °C">
          <Figure src={INDUSTRY} alt="" ratio={4 / 5} tone="flare" flash bloom />
        </ProcessStep>
        <ProcessStep stage="carbon" index="03" name="biochar" datum="84.7% fixed C">
          <Figure src={INDUSTRY} alt="" ratio={4 / 5} tone="earth" silhouette grain />
        </ProcessStep>
        <ProcessStep stage="atmosphere" index="04" name="permanence" datum=">1000 yr">
          <Figure src={FIGURES} alt="" ratio={4 / 5} tone="cool" focus="soft" prism />
        </ProcessStep>
      </Process>
    </Stack>
  </Slide>
);

/** 06 — Project case. Almost an archive record. */
export const ProjectCase = () => (
  <Slide flush scrim="bottom" backdrop={
    <Figure src={INDUSTRY} alt="" ratio={16 / 9} tone="mineral" focus="soft" chroma grain style={{ height: '100%' }} />
  }>
    <Stack style={{ height: '100%', padding: 'var(--tc-space-2xl)' }} justify="end" gap="md">
      <Text eyebrow tone="subtle">project 04 / 23</Text>
      <Heading level={4}>Rift Valley Kilns</Heading>
      <Spec layout="columns" items={[
        { label: 'coordinates', value: '−0.3031 · 36.0800' },
        { label: 'feedstock', value: 'macadamia husk' },
        { label: 'capacity', value: '9,200 t/yr' },
        { label: 'removed', value: '84,120 tCO₂', accent: true },
      ]} />
    </Stack>
  </Slide>
);

/** 07 — Data. The mineral register: hairlines, no boxes, heavy negative space. */
export const DataComparison = () => (
  <Slide tone="mineral">
    <Stack gap="lg" style={{ height: '100%' }}>
      <Rule label="07 — durability" />
      <Stack direction="horizontal" gap="3xl" align="start" style={{ flex: 1 }}>
        <Stack gap="2xs">
          <Stat variant="display" value="1000" unit="yr" />
          <Text eyebrow tone="subtle">biochar · permanence</Text>
        </Stack>
        <Stack gap="2xs">
          <Stat variant="display" value="~40" unit="yr" />
          <Text eyebrow tone="subtle">afforestation · permanence</Text>
        </Stack>
        <Instrument label="durability · yr (log)" points={[4, 6, 12, 40, 300, 1000]}
          scale={['soil', 'biochar']} style={{ flex: 1, minWidth: 200 }} height={110} />
      </Stack>
    </Stack>
  </Slide>
);

/** 08 — Section divider. Nearly empty, so the deck can breathe. */
export const SectionDivider = () => (
  <Slide tone="atmospheric">
    <Stack style={{ height: '100%' }} align="center" justify="center">
      <Glass orb size={180} pearl droplets />
      <Text eyebrow tone="subtle" style={{ marginTop: 'var(--tc-space-xl)' }}>03 — science</Text>
    </Stack>
  </Slide>
);
