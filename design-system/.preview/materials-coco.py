"""Coconut material plates — the visual raw material for the PepsiCo deck.

The blue-mint register belongs to the venture's own identity. This deck is
addressed to the plant, and its subject is a fruit, so it runs in a COCONUT
register: husk brown, shell near-black-brown, palm green, coir cream.

The important one is `coco-section`. It is not decoration — the cross-section
IS the argument of the "why coconut" slide: the fruit is mostly husk, and the
drawing says so before any number does.
"""

import os, math, random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')

# --- 01 COCONUT CROSS-SECTION ----------------------------------------------
# Concentric layers at their real mass proportions: husk dominates, the shell
# is a thin hard line, the flesh and cavity are the small remainder.
random.seed(11)
fibres = []
for i in range(560):
    a = random.uniform(0, math.tau)
    r0 = random.uniform(300, 470)
    r1 = r0 + random.uniform(14, 70)
    w = random.uniform(0.7, 2.6)
    o = random.uniform(0.10, 0.42)
    x0, y0 = 600 + math.cos(a) * r0, 600 + math.sin(a) * r0
    x1, y1 = 600 + math.cos(a) * r1, 600 + math.sin(a) * r1
    fibres.append(f'<path d="M{x0:.0f} {y0:.0f} L{x1:.0f} {y1:.0f}" stroke="#f0e2c8" '
                  f'stroke-opacity="{o:.2f}" stroke-width="{w:.1f}" stroke-linecap="round"/>')

open(f'{OUT}/coco-section.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
<defs>
  <radialGradient id="husk" cx="38%" cy="30%" r="72%">
    <stop offset="0%" stop-color="#b99a6e"/><stop offset="62%" stop-color="#967a52"/>
    <stop offset="100%" stop-color="#6f5638"/></radialGradient>
  <radialGradient id="shell" cx="40%" cy="32%">
    <stop offset="0%" stop-color="#4a3524"/><stop offset="100%" stop-color="#2e2013"/></radialGradient>
  <radialGradient id="flesh" cx="40%" cy="32%">
    <stop offset="0%" stop-color="#fdfbf5"/><stop offset="100%" stop-color="#ece2cd"/></radialGradient>
  <radialGradient id="cav" cx="42%" cy="34%">
    <stop offset="0%" stop-color="#8f7a5c"/><stop offset="100%" stop-color="#5d4c37"/></radialGradient>
  <radialGradient id="lit" cx="30%" cy="20%" r="80%">
    <stop offset="0%" stop-color="#fff6e4" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#fff6e4" stop-opacity="0"/></radialGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<circle cx="600" cy="600" r="540" fill="url(#husk)"/>
<g filter="url(#soft)">{''.join(fibres)}</g>
<circle cx="600" cy="600" r="290" fill="url(#shell)"/>
<circle cx="600" cy="600" r="290" fill="none" stroke="#1f150c" stroke-width="3" stroke-opacity="0.6"/>
<circle cx="600" cy="600" r="248" fill="url(#flesh)"/>
<circle cx="600" cy="600" r="176" fill="url(#cav)"/>
<circle cx="600" cy="600" r="538" fill="none" stroke="#efe0c4" stroke-width="3" stroke-opacity="0.55"/>
<rect width="1200" height="1200" fill="url(#lit)"/>
</svg>''')

# --- 02 HUSK FIBRE MACRO ----------------------------------------------------
# Coir at magnification. Anisotropic on purpose: coir is a directional fibre
# and a fibre that runs every way reads as felt, not as husk.
open(f'{OUT}/coco-husk.svg', 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500">
<defs>
  <filter id="fb">
    <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.16" numOctaves="5" seed="23" result="n"/>
    <feDiffuseLighting in="n" lighting-color="#a08256" surfaceScale="3.6" result="d">
      <feDistantLight azimuth="105" elevation="32"/></feDiffuseLighting>
  </filter>
  <filter id="fs">
    <feTurbulence type="fractalNoise" baseFrequency="0.005 0.34" numOctaves="2" seed="7" result="n"/>
    <feSpecularLighting in="n" surfaceScale="8" specularConstant="1.35" specularExponent="38"
      lighting-color="#fff3dd"><feDistantLight azimuth="105" elevation="64"/></feSpecularLighting>
  </filter>
  <radialGradient id="fl" cx="34%" cy="16%" r="84%">
    <stop offset="0%" stop-color="#fff4e0" stop-opacity="0.52"/>
    <stop offset="100%" stop-color="#fff4e0" stop-opacity="0"/></radialGradient>
  <radialGradient id="fg" cx="86%" cy="90%" r="60%">
    <stop offset="0%" stop-color="#5c7a4e" stop-opacity="0.24"/>
    <stop offset="100%" stop-color="#5c7a4e" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="1500" fill="#7d6242"/>
<rect width="1200" height="1500" filter="url(#fb)" opacity="0.93"/>
<rect width="1200" height="1500" filter="url(#fs)" opacity="0.46" style="mix-blend-mode:screen"/>
<rect width="1200" height="1500" fill="url(#fl)"/>
<rect width="1200" height="1500" fill="url(#fg)"/>
</svg>''')

# --- 03 SHELL MACRO ---------------------------------------------------------
# The hard endocarp: the densest part of the fruit and the precursor of the
# best char. Dark, but never black — it keeps a warm specular.
random.seed(5)
pits = []
for _ in range(180):
    x, y = random.uniform(0, 1200), random.uniform(0, 900)
    r = random.lognormvariate(1.4, 0.55); r = max(2, min(r, 20))
    o = random.uniform(0.2, 0.6)
    pits.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{r:.1f}" ry="{r*0.7:.1f}" '
                f'fill="#241a10" fill-opacity="{o:.2f}"/>')
    if r > 6:
        pits.append(f'<path d="M{x-r:.0f} {y:.0f} A{r:.0f} {r*0.7:.0f} 0 0 1 {x+r:.0f} {y:.0f}" '
                    f'transform="rotate(-34 {x:.0f} {y:.0f})" fill="none" '
                    f'stroke="#e8cfa4" stroke-opacity="{o*0.8:.2f}" stroke-width="{r*0.11:.1f}"/>')

open(f'{OUT}/coco-shell.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
<defs>
  <filter id="sg">
    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="5" seed="17" result="n"/>
    <feDiffuseLighting in="n" lighting-color="#6b4f33" surfaceScale="3.2" result="d">
      <feDistantLight azimuth="212" elevation="30"/></feDiffuseLighting>
  </filter>
  <radialGradient id="sl" cx="28%" cy="18%" r="78%">
    <stop offset="0%" stop-color="#f8e2bd" stop-opacity="0.34"/>
    <stop offset="100%" stop-color="#f8e2bd" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="900" fill="#38271a"/>
<rect width="1200" height="900" filter="url(#sg)" opacity="0.85"/>
{''.join(pits)}
<rect width="1200" height="900" fill="url(#sl)"/>
</svg>''')

# --- 04 GROVE ---------------------------------------------------------------
# Palms in warm haze. Recedes by hazing, never by darkening — the same rule
# the whole system runs on, just with a green horizon instead of a blue one.
random.seed(31)
palms = []
for i in range(26):
    x = random.uniform(-40, 1640)
    scale = random.uniform(0.45, 1.0)
    base = 940 - (1 - scale) * 120
    h = 300 * scale
    o = 0.16 + scale * 0.42
    trunk = (f'<path d="M{x:.0f} {base:.0f} C{x + 12 * scale:.0f} {base - h * 0.5:.0f} '
             f'{x - 8 * scale:.0f} {base - h * 0.8:.0f} {x + 4 * scale:.0f} {base - h:.0f}" '
             f'stroke="#4d6640" stroke-opacity="{o:.2f}" stroke-width="{5 * scale:.1f}" fill="none"/>')
    fronds = ''.join(
        f'<path d="M{x + 4 * scale:.0f} {base - h:.0f} q{math.cos(a) * 70 * scale:.0f} '
        f'{math.sin(a) * 40 * scale - 18 * scale:.0f} {math.cos(a) * 118 * scale:.0f} '
        f'{math.sin(a) * 86 * scale + 22 * scale:.0f}" stroke="#4d6640" '
        f'stroke-opacity="{o * 0.9:.2f}" stroke-width="{3.4 * scale:.1f}" fill="none"/>'
        for a in [math.radians(d) for d in (-165, -130, -95, -60, -25, 10)])
    palms.append(trunk + fronds)

open(f'{OUT}/coco-grove.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
<defs>
  <linearGradient id="sky2" x1="0" y1="0" x2="0.2" y2="1">
    <stop offset="0%" stop-color="#fbf7ec"/><stop offset="46%" stop-color="#eef0dd"/>
    <stop offset="100%" stop-color="#d7e0c4"/></linearGradient>
  <radialGradient id="sun2" cx="72%" cy="16%" r="64%">
    <stop offset="0%" stop-color="#fffaee" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#fffaee" stop-opacity="0"/></radialGradient>
  <filter id="haze2"><feGaussianBlur stdDeviation="2.4"/></filter>
  <filter id="far3"><feGaussianBlur stdDeviation="12"/></filter>
</defs>
<rect width="1600" height="1000" fill="url(#sky2)"/>
<g filter="url(#far3)" opacity="0.5">
  <rect x="0" y="880" width="1600" height="120" fill="#9caf86"/></g>
<g filter="url(#haze2)">{''.join(palms)}</g>
<rect width="1600" height="1000" fill="url(#sun2)"/>
</svg>''')

# --- 05 CHAR FROM COCONUT ---------------------------------------------------
# The same porous carbon as the venture deck, graded warm: this char came from
# a fruit, and the register should remember that.
random.seed(9)
cells = []
for _ in range(150):
    cx, cy = random.uniform(0, 1200), random.uniform(0, 1000)
    rad = max(4, min(random.lognormvariate(2.6, 0.66), 84))
    ecc = 0.6 + random.random() * 0.8
    rot = random.uniform(0, 180)
    o = random.uniform(0.16, 0.5)
    sides = 5 + int(random.random() * 4)
    pts = []
    for k in range(sides):
        a = (k / sides) * math.tau
        rr = rad * (0.72 + random.random() * 0.5)
        pts.append(f'{cx + math.cos(a) * rr:.1f},{cy + math.sin(a) * rr * ecc:.1f}')
    cells.append(f'<polygon points="{" ".join(pts)}" transform="rotate({rot:.0f} {cx:.0f} {cy:.0f})" '
                 f'fill="#170f07" fill-opacity="{min(o*1.6,0.86):.2f}"/>')
    if rad > 11:
        half = ' L'.join(pts[:sides // 2 + 1])
        cells.append(f'<path d="M{half}" transform="rotate({rot:.0f} {cx:.0f} {cy:.0f})" fill="none" '
                     f'stroke="#f2ddb8" stroke-opacity="{min(o*1.7,0.9):.2f}" '
                     f'stroke-width="{max(1.0, rad*0.1):.1f}" stroke-linejoin="round"/>')

open(f'{OUT}/coco-char.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000">
<defs>
  <filter id="cg2">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="41" result="n"/>
    <feDiffuseLighting in="n" lighting-color="#7d6244" surfaceScale="3.6" result="d">
      <feDistantLight azimuth="216" elevation="28"/></feDiffuseLighting>
  </filter>
  <filter id="cs2">
    <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="3" result="n"/>
    <feSpecularLighting in="n" surfaceScale="10" specularConstant="2.0" specularExponent="70"
      lighting-color="#fff2d8"><feDistantLight azimuth="216" elevation="70"/></feSpecularLighting>
  </filter>
  <radialGradient id="cl2" cx="26%" cy="18%" r="78%">
    <stop offset="0%" stop-color="#ffeccd" stop-opacity="0.36"/>
    <stop offset="100%" stop-color="#ffeccd" stop-opacity="0"/></radialGradient>
  <radialGradient id="cgn" cx="84%" cy="86%" r="58%">
    <stop offset="0%" stop-color="#5c7a4e" stop-opacity="0.22"/>
    <stop offset="100%" stop-color="#5c7a4e" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="1000" fill="#54402a"/>
<rect width="1200" height="1000" filter="url(#cg2)" opacity="0.88"/>
{''.join(cells)}
<rect width="1200" height="1000" filter="url(#cs2)" opacity="0.4" style="mix-blend-mode:screen"/>
<rect width="1200" height="1000" fill="url(#cl2)"/>
<rect width="1200" height="1000" fill="url(#cgn)"/>
</svg>''')

print('coconut plates: coco-section, coco-husk, coco-shell, coco-grove, coco-char')
