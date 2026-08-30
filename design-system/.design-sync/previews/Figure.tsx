import * as React from 'react';
import { Figure, Stack } from '@terra-carbon/design-system';

/* Self-contained stand-in plate. The system ships photography TREATMENT, not
   photographs - a real build passes its own editorial images to `src`. */
const plate = (seed: number, a: string, b: string, freq: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750">
<defs><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}"/><feColorMatrix type="saturate" values="0.3"/></filter>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient></defs>
<rect width="600" height="750" fill="url(#g)"/><rect width="600" height="750" filter="url(#f)" opacity="0.5"/></svg>`
  );

const MATERIAL = plate(3, '#3d3128', '#0d0b09', '0.9');
const FIGURES = plate(11, '#5b6f78', '#141c22', '0.16');

export const Treatments = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Figure src={MATERIAL} alt="Biochar macro, untreated" ratio={3 / 4} tone="none"
      style={{ width: 180 }} captionIndex="01" caption="none" />
    <Figure src={MATERIAL} alt="Biochar macro, earth duotone" ratio={3 / 4} tone="earth"
      style={{ width: 180 }} captionIndex="02" caption="earth" />
    <Figure src={FIGURES} alt="Figures, mineral duotone" ratio={3 / 4} tone="mineral"
      style={{ width: 180 }} captionIndex="03" caption="mineral" />
    <Figure src={FIGURES} alt="Figures, cool duotone" ratio={3 / 4} tone="cool"
      style={{ width: 180 }} captionIndex="04" caption="cool" />
  </Stack>
);

export const DepthPlanes = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Figure src={FIGURES} alt="Sharp plane" ratio={3 / 4} tone="cool" focus="sharp"
      style={{ width: 180 }} captionIndex="01" caption="sharp" />
    <Figure src={FIGURES} alt="Soft plane" ratio={3 / 4} tone="cool" focus="soft"
      style={{ width: 180 }} captionIndex="02" caption="soft" />
    <Figure src={FIGURES} alt="Lost focus" ratio={3 / 4} tone="cool" focus="lost"
      style={{ width: 180 }} captionIndex="03" caption="lost" />
    <Figure src={FIGURES} alt="Foreground defocus" ratio={3 / 4} tone="cool" focus="fore"
      style={{ width: 180 }} captionIndex="04" caption="fore" />
  </Stack>
);

export const GhostAndBloom = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Figure src={FIGURES} alt="Ghosted subject" ratio={3 / 4} tone="cool" ghost ghostOffset={22}
      style={{ width: 220 }} captionIndex="fig. 01" caption="motion blur · ghosting" />
    <Figure src={MATERIAL} alt="Blown highlights" ratio={3 / 4} tone="earth" bloom wash
      style={{ width: 220 }} captionIndex="fig. 02" caption="bloom · wash" />
  </Stack>
);

/** Motion and optics: the treatments that keep people out of ESG-stock territory. */
export const MotionAndOptics = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Figure src={FIGURES} alt="Long exposure" ratio={3 / 4} tone="cool" smear ghostOffset={16}
      style={{ width: 190 }} captionIndex="01" caption="long exposure" />
    <Figure src={FIGURES} alt="Soft flash" ratio={3 / 4} tone="cool" flash
      style={{ width: 190 }} captionIndex="02" caption="soft flash" />
    <Figure src={FIGURES} alt="Silhouette" ratio={3 / 4} tone="mineral" silhouette
      style={{ width: 190 }} captionIndex="03" caption="silhouette" />
    <Figure src={MATERIAL} alt="Chromatic aberration" ratio={3 / 4} tone="earth" chroma prism
      style={{ width: 190 }} captionIndex="04" caption="chroma · prism" />
  </Stack>
);

export const CaptionOver = () => (
  <Figure src={MATERIAL} alt="Char macro" ratio={4 / 3} tone="earth" grain wash
    captionOver captionIndex="fig. 04" caption="char · macro · 400× · 18.08.26"
    style={{ maxWidth: 420 }} />
);
