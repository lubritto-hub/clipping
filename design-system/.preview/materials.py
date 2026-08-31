"""Material plates for the deck's art layers.

These are not backgrounds. They are MATERIAL: things that get cropped, blurred,
overlapped and cut by the frame. Each one is built to survive being shown at
20% of its area, because that is how they are used.
"""
import os, random
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')

# --- 01 CARBON MACRO -------------------------------------------------------
# Biochar at extreme magnification: an engineered carbon material, porous,
# with reflective edges on the pore walls. NOT charcoal, NOT a black blob.
# The pores are drawn, not filtered — turbulence alone gives crumpled paper.
random.seed(4)
pores = []
for _ in range(150):
    x, y = random.uniform(-40, 1240), random.uniform(-40, 1040)
    r = random.lognormvariate(2.7, 0.7)
    r = max(5, min(r, 96))
    e = random.uniform(0.72, 1.35)          # slight ellipticity
    rot = random.uniform(0, 180)
    # The pore itself: a dark void.
    pores.append(
        f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{r:.1f}" ry="{r*e:.1f}" '
        f'transform="rotate({rot:.0f} {x:.0f} {y:.0f})" fill="url(#void)"/>')
    # The lit rim on the light side — this single detail is what makes carbon
    # read as a cut mineral instead of soot.
    # One-sided rim only. A pore stroked all the way round reads as a bubble;
    # light catches a real cavity on the wall facing the source and nowhere else.
    if r > 11:
        pores.append(
            f'<path d="M {x-r:.1f} {y:.1f} A {r:.1f} {r*e:.1f} 0 0 1 {x+r:.1f} {y:.1f}" '
            f'transform="rotate({rot-40:.0f} {x:.0f} {y:.0f})" fill="none" '
            f'stroke="url(#rim)" stroke-width="{max(1.6, r*0.13):.1f}" stroke-linecap="round"/>')

open(f'{OUT}/carbon-macro.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000">
<defs>
  <filter id="grit">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="5" seed="17" result="n"/>
    <feDiffuseLighting in="n" lighting-color="#3c5261" surfaceScale="4.0" result="d">
      <feDistantLight azimuth="215" elevation="30"/></feDiffuseLighting>
  </filter>
  <filter id="sparkle">
    <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="n"/>
    <feSpecularLighting in="n" surfaceScale="11" specularConstant="2.6" specularExponent="80"
      lighting-color="#ffffff"><feDistantLight azimuth="215" elevation="72"/></feSpecularLighting>
  </filter>
  <radialGradient id="void" cx="42%" cy="38%">
    <stop offset="0%" stop-color="#0e161c" stop-opacity="0.94"/>
    <stop offset="72%" stop-color="#1b2830" stop-opacity="0.78"/>
    <stop offset="100%" stop-color="#243541" stop-opacity="0.32"/></radialGradient>
  <linearGradient id="rim" x1="0" y1="1" x2="0.6" y2="0">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
    <stop offset="52%" stop-color="#f2fbff" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.1"/></linearGradient>
  <radialGradient id="lit" cx="26%" cy="18%" r="80%">
    <stop offset="0%" stop-color="#cbf0f8" stop-opacity="0.42"/>
    <stop offset="100%" stop-color="#cbf0f8" stop-opacity="0"/></radialGradient>
  <radialGradient id="iri" cx="86%" cy="88%" r="56%">
    <stop offset="0%" stop-color="#efeafb" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#efeafb" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="1000" fill="#141f27"/>
<rect width="1200" height="1000" filter="url(#grit)" opacity="0.88"/>
{''.join(pores)}
<g opacity="0.5" stroke="#8fb3c4" fill="none" stroke-width="1.1">
  <path d="M-20 300 L180 220 L420 300 L640 190 L900 260 L1220 160"/>
  <path d="M-20 640 L240 700 L520 610 L780 690 L1040 600 L1220 660"/>
  <path d="M120 -20 L200 260 L150 560 L260 880 L200 1020"/>
  <path d="M880 -20 L960 240 L900 540 L1010 820 L960 1020"/>
</g>
<rect width="1200" height="1000" filter="url(#sparkle)" opacity="0.46" style="mix-blend-mode:screen"/>
<rect width="1200" height="1000" fill="url(#lit)"/>
<rect width="1200" height="1000" fill="url(#iri)"/>
</svg>''')

# --- 02 STEEL / PIPING at blue hour ---------------------------------------
# Precision climate infrastructure, not heavy industry: stainless cylinders
# raking light, deep negative space, vapour lit from behind.
def cyl(x, w, y0, y1, o=1.0):
    return (f'<rect x="{x}" y="{y0}" width="{w}" height="{y1-y0}" fill="url(#steel)" opacity="{o}"/>'
            f'<rect x="{x+w*0.13:.0f}" y="{y0}" width="{max(2,w*0.055):.0f}" height="{y1-y0}" fill="#ffffff" opacity="{0.8*o:.2f}"/>'
            f'<rect x="{x+w*0.82:.0f}" y="{y0}" width="{max(1,w*0.03):.0f}" height="{y1-y0}" fill="#dcf4ec" opacity="{0.34*o:.2f}"/>')

open(f'{OUT}/steel.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
<defs>
  <linearGradient id="air" x1="0" y1="0" x2="0.25" y2="1">
    <stop offset="0%" stop-color="#f6fbfe"/><stop offset="42%" stop-color="#d5e6f2"/>
    <stop offset="100%" stop-color="#a9c8de"/></linearGradient>
  <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#8fa9bd"/><stop offset="16%" stop-color="#f4f9fc"/>
    <stop offset="38%" stop-color="#b6cad9"/><stop offset="62%" stop-color="#7e9ab0"/>
    <stop offset="84%" stop-color="#a8c0d0"/><stop offset="100%" stop-color="#69869c"/></linearGradient>
  <radialGradient id="back" cx="70%" cy="16%" r="62%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  <filter id="far2"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="near"><feGaussianBlur stdDeviation="1.2"/></filter>
  <filter id="mid"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="vap"><feGaussianBlur stdDeviation="26"/></filter>
</defs>
<rect width="1600" height="1000" fill="url(#air)"/>
<g filter="url(#far2)" opacity="0.5">{cyl(60,110,300,1000)}{cyl(1420,150,220,1000)}</g>
<g filter="url(#vap)" opacity="0.55">
  <ellipse cx="980" cy="180" rx="300" ry="120" fill="#ffffff"/>
  <ellipse cx="420" cy="260" rx="220" ry="90" fill="#ffffff"/></g>
<g filter="url(#mid)" opacity="0.72">{cyl(250,168,150,1000)}{cyl(1170,180,240,1000)}</g>
<g filter="url(#vap)" opacity="0.42"><ellipse cx="700" cy="620" rx="520" ry="240" fill="#dceaf4"/></g>
<g filter="url(#near)">
  {cyl(700,232,40,1000)}{cyl(975,132,400,1000)}
  <!-- one horizontal run, catching the light along its top -->
  <rect x="120" y="548" width="1360" height="26" fill="#8ba6ba" opacity="0.8"/>
  <rect x="120" y="548" width="1360" height="6" fill="#ffffff" opacity="0.9"/>
  <rect x="470" y="742" width="760" height="14" fill="#9db4c6" opacity="0.55"/>
  <circle cx="700" cy="561" r="34" fill="none" stroke="#f0f7fb" stroke-width="7" opacity="0.85"/>
</g>
<rect width="1600" height="1000" fill="url(#back)"/>
</svg>''')

# --- 03 IRIDESCENT MEMBRANE -----------------------------------------------
# An optical coating, not a rainbow: the spectrum only appears where the
# surface turns away from the light.
open(f'{OUT}/membrane.svg', 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
<defs>
  <radialGradient id="body" cx="32%" cy="24%" r="82%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98"/>
    <stop offset="30%" stop-color="#dff4fb" stop-opacity="0.92"/>
    <stop offset="58%" stop-color="#b9e2e4" stop-opacity="0.86"/>
    <stop offset="82%" stop-color="#a8c9de" stop-opacity="0.84"/>
    <stop offset="100%" stop-color="#cbbde6" stop-opacity="0.9"/></radialGradient>
  <linearGradient id="term" x1="0.2" y1="0" x2="0.7" y2="1">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
    <stop offset="49%" stop-color="#ffffff" stop-opacity="0.04"/>
    <stop offset="50%" stop-color="#7aa8c9" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="#5b8aae" stop-opacity="0.3"/></linearGradient>
  <linearGradient id="coat" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0%" stop-color="#cbf0f8"/><stop offset="26%" stop-color="#dcf4ec"/>
    <stop offset="48%" stop-color="#ffffff"/><stop offset="68%" stop-color="#efeafb"/>
    <stop offset="86%" stop-color="#eedbee"/><stop offset="100%" stop-color="#fbe9dc"/></linearGradient>
  <radialGradient id="edgemask" cx="50%" cy="50%">
    <stop offset="0%" stop-color="#000" stop-opacity="0"/>
    <stop offset="64%" stop-color="#000" stop-opacity="0"/>
    <stop offset="84%" stop-color="#000" stop-opacity="0.9"/>
    <stop offset="97%" stop-color="#000" stop-opacity="1"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.4"/></radialGradient>
  <mask id="mk"><rect width="1200" height="1200" fill="url(#edgemask)"/></mask>
  <filter id="sm"><feGaussianBlur stdDeviation="7"/></filter>
</defs>
<circle cx="600" cy="600" r="560" fill="url(#body)"/>
<circle cx="600" cy="600" r="560" fill="url(#term)"/>
<g mask="url(#mk)" filter="url(#sm)"><circle cx="600" cy="600" r="560" fill="url(#coat)"/></g>
<ellipse cx="404" cy="368" rx="150" ry="96" fill="#ffffff" opacity="0.86" transform="rotate(-28 404 368)"/>
<ellipse cx="820" cy="828" rx="94" ry="52" fill="#efeafb" opacity="0.5" transform="rotate(18 820 828)"/>
<circle cx="600" cy="600" r="557" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.9"/>
<circle cx="600" cy="600" r="548" fill="none" stroke="#cbbde6" stroke-width="2" opacity="0.5"/>
</svg>''')

# --- 04 CONDENSATION ON GLASS ---------------------------------------------
random.seed(21)
b = []
for _ in range(150):
    x, y = random.uniform(0, 1400), random.uniform(0, 900)
    r = random.lognormvariate(1.5, 0.6); r = max(2, min(r, 22))
    o = random.uniform(0.3, 0.9)
    b.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r:.1f}" fill="#ffffff" opacity="{o:.2f}"/>')
    b.append(f'<circle cx="{x-r*0.32:.0f}" cy="{y-r*0.32:.0f}" r="{r*0.3:.1f}" fill="#ffffff" opacity="{min(o+0.3,1):.2f}"/>')
    b.append(f'<circle cx="{x+r*0.22:.0f}" cy="{y+r*0.34:.0f}" r="{r*0.7:.1f}" fill="#7aa8c9" opacity="{o*0.3:.2f}"/>')
open(f'{OUT}/glass-condens.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900">
<defs>
  <linearGradient id="cg" x1="0" y1="0" x2="0.4" y2="1">
    <stop offset="0%" stop-color="#f4fafd"/><stop offset="50%" stop-color="#d3e6f1"/>
    <stop offset="100%" stop-color="#aecde3"/></linearGradient>
  <radialGradient id="bk" cx="30%" cy="22%" r="72%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  <filter id="bl2"><feGaussianBlur stdDeviation="0.6"/></filter>
</defs>
<rect width="1400" height="900" fill="url(#cg)"/><rect width="1400" height="900" fill="url(#bk)"/>
<g filter="url(#bl2)">{''.join(b)}</g>
</svg>''')

# --- 05 COCONUT FIBRE MACRO ------------------------------------------------
open(f'{OUT}/fibre.svg', 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1400">
<defs>
  <filter id="fb">
    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.14" numOctaves="5" seed="31" result="n"/>
    <feDiffuseLighting in="n" lighting-color="#a89a80" surfaceScale="3.2" result="d">
      <feDistantLight azimuth="100" elevation="34"/></feDiffuseLighting>
  </filter>
  <filter id="fs">
    <feTurbulence type="fractalNoise" baseFrequency="0.006 0.3" numOctaves="2" seed="9" result="n"/>
    <feSpecularLighting in="n" surfaceScale="7" specularConstant="1.2" specularExponent="42"
      lighting-color="#fffdf6"><feDistantLight azimuth="100" elevation="66"/></feSpecularLighting>
  </filter>
  <radialGradient id="fl" cx="38%" cy="16%" r="82%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1000" height="1400" fill="#9c9078"/>
<rect width="1000" height="1400" filter="url(#fb)" opacity="0.92"/>
<rect width="1000" height="1400" filter="url(#fs)" opacity="0.5" style="mix-blend-mode:screen"/>
<rect width="1000" height="1400" fill="url(#fl)"/>
</svg>''')
print('material plates: carbon-macro, steel, membrane, glass-condens, fibre')
