import * as React from 'react';
import { Figure, Stack } from '@terra-carbon/design-system';

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

/** Pick a SUBJECT register, never a filter. Each owns its own tonal curve,
    grain plate, light direction and crop origin. */
export const Registers = () => (
  <Stack direction="horizontal" gap="lg" wrap align="start">
    <Figure register="char" src={CHAR} alt="Biochar macro" ratio={0.9}
      style={{ width: 190 }} captionIndex="01" caption="char" />
    <Figure register="plant" src={PLANT} alt="Kiln at blue hour" ratio={1.5}
      style={{ width: 250 }} captionIndex="02" caption="plant" />
    <Figure register="terrain" src={TERRAIN} alt="Soil close" ratio={0.72}
      style={{ width: 170 }} captionIndex="03" caption="terrain" />
    <Figure register="figures" src={FIGURES} alt="Figures in motion" ratio={1.9}
      style={{ width: 280 }} captionIndex="04" caption="figures" />
  </Stack>
);

/** Weight decides how loudly an image speaks. `ambient` is meant to be barely
    readable - that sacrifice is what lets the numerals stay crisp. */
export const Weight = () => (
  <Stack direction="horizontal" gap="lg" wrap align="start">
    <Figure register="plant" src={PLANT} alt="Lead" ratio={1.3} weight="lead"
      style={{ width: 250 }} captionIndex="01" caption="lead" />
    <Figure register="plant" src={PLANT} alt="Normal" ratio={1.3}
      style={{ width: 200 }} captionIndex="02" caption="normal" />
    <Figure register="plant" src={PLANT} alt="Ambient" ratio={1.3} weight="ambient"
      style={{ width: 160 }} captionIndex="03" caption="ambient" />
  </Stack>
);

export const DepthPlanes = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Figure register="figures" src={FIGURES} alt="Sharp" ratio={3 / 4} focus="sharp" style={{ width: 165 }} captionIndex="01" caption="sharp" />
    <Figure register="figures" src={FIGURES} alt="Soft" ratio={3 / 4} focus="soft" style={{ width: 165 }} captionIndex="02" caption="soft" />
    <Figure register="figures" src={FIGURES} alt="Lost" ratio={3 / 4} focus="lost" style={{ width: 165 }} captionIndex="03" caption="lost" />
    <Figure register="figures" src={FIGURES} alt="Fore" ratio={3 / 4} focus="fore" style={{ width: 165 }} captionIndex="04" caption="fore" />
  </Stack>
);

export const MotionAndOptics = () => (
  <Stack direction="horizontal" gap="lg" wrap>
    <Figure register="figures" src={FIGURES} alt="Long exposure" ratio={3 / 4} smear ghostOffset={16}
      style={{ width: 200 }} captionIndex="01" caption="long exposure" />
    <Figure register="figures" src={FIGURES} alt="Soft flash" ratio={3 / 4} flash
      style={{ width: 200 }} captionIndex="02" caption="soft flash" />
    <Figure register="char" src={CHAR} alt="Chroma" ratio={3 / 4} chroma prism
      style={{ width: 200 }} captionIndex="03" caption="chroma · prism" />
  </Stack>
);

export const CaptionOver = () => (
  <Figure register="char" src={CHAR} alt="Char macro" ratio={4 / 3} captionOver
    captionIndex="fig. 04" caption="char · macro · 400× · batch 0241" style={{ maxWidth: 440 }} />
);
