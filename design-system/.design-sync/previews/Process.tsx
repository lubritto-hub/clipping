import * as React from 'react';
import { Figure, Process, ProcessStep } from '@terra-carbon/design-system';

const plate = (seed: number, a: string, b: string, freq: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
<defs><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}"/><feColorMatrix type="saturate" values="0.3"/></filter>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient></defs>
<rect width="800" height="800" fill="url(#g)"/><rect width="800" height="800" filter="url(#f)" opacity="0.5"/></svg>`
  );
const CHAR = plate(9, "#5a6b68", "#161d1c", "0.05");
const PLANT = plate(7, "#8fb0c0", "#16262c", "0.02");
const TERRAIN = plate(41, "#8a7358", "#221a12", "0.06");
const FIGURES = plate(11, "#a8c0cc", "#1b262c", "0.015");

/** Row container. Ratios must differ by at least 2:1 across the sequence. */
export const Sequence = () => (
  <Process style={{ alignItems: 'flex-start' }}>
    <ProcessStep stage="earth" index="01" name="biomass" datum="12,400 t/yr">
      <Figure register="terrain" src={TERRAIN} alt="" ratio={0.72} />
    </ProcessStep>
    <ProcessStep stage="heat" index="02" name="pyrolysis" datum="540 °C">
      <Figure register="plant" src={PLANT} alt="" ratio={1.5} weight="lead" />
    </ProcessStep>
    <ProcessStep stage="carbon" index="03" name="biochar" datum="84.7% fixed C">
      <Figure register="char" src={CHAR} alt="" ratio={0.9} />
    </ProcessStep>
    <ProcessStep stage="atmosphere" index="04" name="permanence" datum=">1000 yr">
      <Figure register="figures" src={FIGURES} alt="" ratio={1.9} weight="ambient" />
    </ProcessStep>
  </Process>
);
