import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  TerraCarbonProvider, Slide, Canvas, Place, Stack, Heading, Text, Figure, Spec,
  Instrument, Mark, Rule, Glass, Stat, Process, ProcessStep,
} from '../src/index';

/* ---------------------------------------------------------------------------
   EIGHT ARCHETYPES — luminous climate-tech editorial.

   A grammar, not a template. Each frame is composed from the system; none of
   them shares a layout, a weather condition or a register with its neighbour.

   The register mix across these eight: six light frames (air / haze /
   mineral), one atmospheric, one deep. That single deep frame is the whole
   dark ration — it lands because everything around it is bright.

   The copy is solution-led throughout. Nothing here states the problem; the
   argument is made by what the numbers and the process show.
   ------------------------------------------------------------------------- */

const IMG = (n: string) => `./img/${n}.svg`;
const Edge = ({ children, side = 'left' as 'left' | 'right' }: any) => (
  <span className={`tc-micro-edge tc-micro-edge--${side}`}>{children}</span>
);

/* 01 LUMINOUS COVER — the frame opens on light. A bright, blown-out figure
   fills it; type sits low-left with a great deal of air above; the mark is
   small and high. The scrim ADDS light under the type rather than dimming
   the image. */
const Cover = () => (
  <Slide flush tone="air" weather="cove" artefact="quiet" scrim="bottom"
    backdrop={<Figure register="figures" src={IMG('figures')} alt="" ratio={16 / 9} smear
      ghostOffset={18} weight="lead" style={{ height: '100%' }} />}>
    <Canvas rows={6} frame={{ top: 'var(--tc-space-lg)', right: 'var(--tc-space-3xl)', bottom: 'var(--tc-space-xl)', left: 'var(--tc-space-xl)' }}>
      <Place col={1} span={3} row={1}><Mark size={26} /></Place>
      <Place col={1} span={8} row={5} rowSpan={2} align="end">
        <Stack gap="sm">
          <Heading level={1}>transforming waste<br />into climate impact.</Heading>
          <Text eyebrow data-register="secondary">biochar · durable carbon removal · petrolina, brasil</Text>
        </Stack>
      </Place>
      <Edge side="right">lat −9.3891 · long −40.5030</Edge>
    </Canvas>
  </Slide>
);

/* 02 BIG STATEMENT — one sentence over two thirds of the frame; a translucent
   bead enters from the right, mostly off-canvas, catching the weather. The
   lower-left quadrant stays empty on purpose. */
const Statement = () => (
  <Slide tone="air" weather="blue-hour">
    <Canvas rows={6} frame={{ top: 'var(--tc-space-3xl)', right: 'var(--tc-space-lg)', bottom: 'var(--tc-space-2xl)', left: 'var(--tc-space-2xl)' }}>
      <Place col={1} span={7} row={2} rowSpan={3}>
        <Heading level={2}>engineered by nature,<br />scaled by technology.</Heading>
      </Place>
      <Place col={1} span={3} row={6} align="end">
        <Text size="sm" data-register="secondary" className="tc-drift" drift="-0.7deg">
          Designed for permanence.
        </Text>
      </Place>
      <Place col={8} span={6} row={1} rowSpan={6} escape={['right', 'top']} escapeBy="var(--tc-space-4xl)">
        <Glass orb pearl droplets style={{ width: '128%', aspectRatio: '1' }} />
      </Place>
      <Edge>02 — the thesis</Edge>
    </Canvas>
  </Slide>
);

/* 03 REFINED BIG NUMBER — the numeral is the image, cropped by the left edge.
   Confident rather than loud: hairline weight, wide frame, soft glow only,
   and the meaning kept tiny at the foot. */
const BigNumber = () => (
  <Slide tone="haze" weather="kiln" artefact="quiet">
    <Canvas rows={6} frame={{ top: 'var(--tc-space-2xl)', right: 'var(--tc-space-2xl)', bottom: 'var(--tc-space-lg)', left: 'var(--tc-space-md)' }}>
      <Place col={1} span={9} row={2} rowSpan={3} escape={['left']} escapeBy="var(--tc-space-2xl)">
        <Stat variant="crop" light="crossing" seed={3} note="foot"
          value="100.000" unit="toneladas de casca de coco por ano · na porta da fábrica" />
      </Place>
      <Place col={9} span={4} row={5} rowSpan={2} align="end">
        <Spec items={[
          { label: 'origem', value: 'PepsiCo · Kero Coco' },
          { label: 'local', value: 'Petrolina · PE' },
          { label: 'método', value: 'VM0044' },
          { label: 'destino', value: 'material + CORC', accent: true },
        ]} />
      </Place>
      <Edge side="right">03 — feedstock</Edge>
    </Canvas>
  </Slide>
);

/* 04 SCIENCE — the mineral register, which is where precision belongs. Char
   macro bleeds off the top-right as a lifted mineral, the instrument reads
   low-left, and the spec column holds the far margin. */
const Science = () => (
  <Slide tone="mineral" weather="condensation">
    <Canvas rows={8} frame={{ top: 'var(--tc-space-lg)', right: 'var(--tc-space-md)', bottom: 'var(--tc-space-2xl)', left: 'var(--tc-space-2xl)' }}>
      <Place col={7} span={6} row={1} rowSpan={5} escape={['right', 'top']}>
        <Figure register="char" src={IMG('char-macro')} alt="Biochar macro" ratio={1.25}
          captionIndex="fig. 01" caption="char de coco · 400× · lote 0241" captionOver style={{ height: '100%' }} />
      </Place>
      <Place col={1} span={5} row={2} rowSpan={2}>
        <Heading level={3}>H/C<sub>org</sub> ≤ 0,40 —<br />estável por séculos.</Heading>
      </Place>
      <Place col={1} span={5} row={5} rowSpan={2}>
        <Instrument label="rendimento · % massa" reading="28,2%" area
          points={[72, 64, 55, 47, 41, 38, 34, 30, 28]} scale={['400 °C', '850 °C']} height={86} />
      </Place>
      <Place col={7} span={5} row={7} rowSpan={2} align="end">
        <Spec layout="columns" items={[
          { label: 'reator', value: 'leito fluidizado' },
          { label: 'pirólise', value: '600 °C' },
          { label: 'permanência', value: '>200 anos', accent: true },
        ]} />
      </Place>
    </Canvas>
  </Slide>
);

/* 05 PROCESS — four stages, four registers, four ratios, never four equal
   boxes. The sequence is an ascent into light: residue, transformation,
   material, atmosphere. */
const ProcessSlide = () => (
  <Slide tone="haze" weather="kiln">
    <Canvas rows={6} frame={{ top: 'var(--tc-space-lg)', right: 'var(--tc-space-xl)', bottom: 'var(--tc-space-2xl)', left: 'var(--tc-space-lg)' }}>
      <Place col={1} span={12} row={1}><Rule label="05 — process" /></Place>
      <Place col={1} span={12} row={2} rowSpan={5} escape={['right']}>
        <Process style={{ alignItems: 'flex-start' }}>
          <ProcessStep stage="earth" index="01" name="casca de coco" datum="100.000 t/ano">
            <Figure register="terrain" src={IMG('biomass')} alt="" ratio={0.72} />
          </ProcessStep>
          <ProcessStep stage="heat" index="02" name="leito fluidizado" datum="600 °C">
            <Figure register="plant" src={IMG('industry')} alt="" ratio={1.5} weight="lead" />
          </ProcessStep>
          <ProcessStep stage="carbon" index="03" name="char de especificação" datum="&lt;75 µm">
            <Figure register="char" src={IMG('char-macro')} alt="" ratio={0.9} />
          </ProcessStep>
          <ProcessStep stage="atmosphere" index="04" name="bloco + CORC" datum="0,5 kgCO₂/un">
            <Figure register="plant" src={IMG('condensation')} alt="" ratio={1.4} />
          </ProcessStep>
        </Process>
      </Place>
    </Canvas>
  </Slide>
);

/* 06 PROJECT — full-bleed plant, shot bright. The record sits bottom-right,
   the name is small, and the entire left half of the frame is left empty. */
const Project = () => (
  <Slide flush tone="air" weather="cove" scrim="bottom"
    backdrop={<Figure register="plant" src={IMG('industry')} alt="" ratio={16 / 9}
      weight="lead" style={{ height: '100%' }} />}>
    <Canvas rows={6} frame={{ top: 'var(--tc-space-xl)', right: 'var(--tc-space-xl)', bottom: 'var(--tc-space-xl)', left: 'var(--tc-space-3xl)' }}>
      <Place col={7} span={6} row={4} rowSpan={3} align="end">
        <Stack gap="sm">
          <Text eyebrow data-register="secondary">POC · fase 01 / 04</Text>
          <Heading level={4}>Petrolina</Heading>
          <Spec layout="columns" items={[
            { label: 'coords', value: '−9,3891 · −40,5030' },
            { label: 'feedstock', value: 'casca de coco' },
            { label: 'piloto', value: '810 t/ano' },
          ]} />
        </Stack>
      </Place>
      <Edge>vale do são francisco · pernambuco</Edge>
    </Canvas>
  </Slide>
);

/* 07 DATA — the mineral register. Two numerals at different seeds, hairlines
   rather than boxes, one instrument, and an empty band across the top. */
const Data = () => (
  <Slide tone="mineral" weather="cove" artefact="quiet">
    <Canvas rows={6} frame={{ top: 'var(--tc-space-3xl)', right: 'var(--tc-space-2xl)', bottom: 'var(--tc-space-lg)', left: 'var(--tc-space-xl)' }}>
      <Place col={1} span={12} row={2}><Rule label="07 — durabilidade" /></Place>
      <Place col={1} span={4} row={3} rowSpan={2}>
        <Stat variant="hero" light="behind" seed={2} note="foot" value="200" unit="anos · biochar (CRCF)" />
      </Place>
      <Place col={5} span={3} row={3} rowSpan={2} align="end">
        <Stat variant="display" value="~40" unit="anos" caption="reflorestamento" />
      </Place>
      <Place col={9} span={4} row={3} rowSpan={3}>
        <Instrument label="permanência · anos (log)" points={[4, 6, 12, 40, 200, 1000]}
          scale={['solo', 'biochar']} height={130} />
      </Place>
      <Place col={1} span={6} row={6} align="end">
        <Text size="sm" data-register="secondary">
          Fração de carbono remanescente após o intervalo indicado.
        </Text>
      </Place>
    </Canvas>
  </Slide>
);

/* 08 TRANSITIONAL — the deck's single deep frame, and almost nothing in it.
   One bead, one label off-centre, one figure cut by the corner, and a great
   deal of empty ground. It lands precisely because it is the only one. */
const Divider = () => (
  <Slide tone="deep" weather="condensation">
    <Canvas rows={6} frame={{ top: 'var(--tc-space-2xl)', right: 'var(--tc-space-lg)', bottom: 'var(--tc-space-4xl)', left: 'var(--tc-space-4xl)' }}>
      <Place col={2} span={5} row={4} rowSpan={2}>
        <Stack direction="horizontal" gap="md" align="center">
          <Glass orb size={26} pearl />
          <Text eyebrow data-register="secondary">08 — o plano</Text>
        </Stack>
      </Place>
      <Place col={9} span={5} row={1} rowSpan={3} escape={['top', 'right']}>
        <Figure register="terrain" src={IMG('aerial')} alt="" ratio={1.1} weight="ambient" />
      </Place>
    </Canvas>
  </Slide>
);

const Deck = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', gap: 26, padding: 26,
    background: 'var(--tc-palette-haze-100)',
  }}>
    <Cover /><Statement /><BigNumber /><Science />
    <ProcessSlide /><Project /><Data /><Divider />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <TerraCarbonProvider theme="light"><Deck /></TerraCarbonProvider>
);
