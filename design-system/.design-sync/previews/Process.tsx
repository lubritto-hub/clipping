import * as React from 'react';
import { Figure, Process, ProcessStep } from '@terra-carbon/design-system';

const plate = (seed: number, a: string, b: string, freq: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
<defs><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}"/><feColorMatrix type="saturate" values="0.3"/></filter>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient></defs>
<rect width="900" height="600" fill="url(#g)"/><rect width="900" height="600" filter="url(#f)" opacity="0.5"/></svg>`
  );
const P = plate(7, '#31474f', '#0b1418', '0.35');

/** Row container. Each step must be treated differently - see ProcessStep. */
export const Sequence = () => (
  <Process>
    <ProcessStep stage="earth" index="01" name="biomass" datum="12,400 t/yr">
      <Figure src={P} alt="" ratio={4 / 5} tone="earth" grain wash />
    </ProcessStep>
    <ProcessStep stage="heat" index="02" name="pyrolysis" datum="540 °C">
      <Figure src={P} alt="" ratio={4 / 5} tone="flare" flash bloom />
    </ProcessStep>
    <ProcessStep stage="carbon" index="03" name="biochar" datum="84.7% fixed C">
      <Figure src={P} alt="" ratio={4 / 5} tone="earth" silhouette grain />
    </ProcessStep>
    <ProcessStep stage="atmosphere" index="04" name="permanence" datum=">1000 yr">
      <Figure src={P} alt="" ratio={4 / 5} tone="cool" focus="soft" prism />
    </ProcessStep>
  </Process>
);
