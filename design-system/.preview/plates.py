import os, textwrap
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'img')

def noise_plate(name, w, h, *, base, freq, octaves, seed,
                diffuse, specular, surface, spec_const, spec_exp,
                elev, azim, veil, veil2=None, blur=0):
    """A lit micro-surface. Every plate is HIGH KEY: the diffuse lighting
    colour is a mid-tone, never a near-black, so the surface has a floor of
    light in it before any wash is applied."""
    v2 = f'<rect width="{w}" height="{h}" fill="url(#v2)"/>' if veil2 else ''
    d2 = (f'<radialGradient id="v2" cx="{veil2[0]}" cy="{veil2[1]}" r="{veil2[2]}">'
          f'<stop offset="0%" stop-color="{veil2[3]}" stop-opacity="{veil2[4]}"/>'
          f'<stop offset="100%" stop-color="{veil2[3]}" stop-opacity="0"/></radialGradient>') if veil2 else ''
    blurf = f'<feGaussianBlur stdDeviation="{blur}"/>' if blur else ''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}">
<defs>
<filter id="m">
  <feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="{octaves}" seed="{seed}" result="n"/>
  <feDiffuseLighting in="n" lighting-color="{diffuse}" surfaceScale="{surface}" result="d">
    <feDistantLight azimuth="{azim}" elevation="{elev}"/></feDiffuseLighting>
  <feSpecularLighting in="n" surfaceScale="{surface*2}" specularConstant="{spec_const}"
      specularExponent="{spec_exp}" lighting-color="{specular}" result="s">
    <feDistantLight azimuth="{azim}" elevation="{min(elev+30,88)}"/></feSpecularLighting>
  <feComposite in="s" in2="d" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
  {blurf}
</filter>
<radialGradient id="v" cx="{veil[0]}" cy="{veil[1]}" r="{veil[2]}">
  <stop offset="0%" stop-color="{veil[3]}" stop-opacity="{veil[4]}"/>
  <stop offset="100%" stop-color="{veil[3]}" stop-opacity="0"/></radialGradient>
{d2}
</defs>
<rect width="{w}" height="{h}" fill="{base}"/>
<rect width="{w}" height="{h}" filter="url(#m)" opacity="0.9"/>
<rect width="{w}" height="{h}" fill="url(#v)"/>
{v2}
</svg>'''

PLATES = {
  # Biochar macro. The whole argument of the brand in one image: a cut mineral
  # with cold speculars on a LIT ground, never soot on black.
  'char-macro': dict(w=1000, h=1250, base='#6d8798', freq=0.02, octaves=5, seed=9,
      diffuse='#39505f', specular='#ffffff', surface=2.2, spec_const=1.15, spec_exp=26,
      elev=34, azim=228, veil=('30%','20%','78%','#dcf4ec',0.3),
      veil2=('82%','86%','70%','#efeafb',0.3)),
  # Char at particle scale — finer, brighter, almost powder.
  'particles': dict(w=1200, h=800, base='#93a9b8', freq=0.055, octaves=4, seed=3,
      diffuse='#93a9b8', specular='#ffffff', surface=1.5, spec_const=1.3, spec_exp=22,
      elev=42, azim=196, veil=('68%','24%','76%','#cbf0f8',0.44)),
  # Terrain from above — matter, held, not muddy.
  'aerial': dict(w=1400, h=1000, base='#93a89f', freq=0.008, octaves=6, seed=14,
      diffuse='#8ba69c', specular='#f4fbff', surface=3.4, spec_const=0.7, spec_exp=30,
      elev=30, azim=118, veil=('24%','16%','84%','#e8f9fd',0.46),
      veil2=('86%','92%','62%','#efe6d8',0.4)),
  # Soil macro — earth as a premium material.
  'soil': dict(w=1100, h=900, base='#b09a84', freq=0.03, octaves=5, seed=21,
      diffuse='#a89684', specular='#fffaf3', surface=2.6, spec_const=0.8, spec_exp=24,
      elev=32, azim=142, veil=('34%','22%','80%','#fbe9dc',0.56)),
  # Biomass — coconut husk fibre. Directional, so the noise is anisotropic.
  'biomass': dict(w=900, h=1250, base='#aca38b', freq='0.006 0.09', octaves=4, seed=6,
      diffuse='#a8a48f', specular='#fffdf6', surface=2.0, spec_const=0.95, spec_exp=20,
      elev=38, azim=94, veil=('40%','14%','82%','#f2f7f4',0.42)),
  # Condensation — the pure atmosphere plate. Almost no structure at all.
  'condensation': dict(w=1400, h=740, base='#c6dbe8', freq=0.012, octaves=3, seed=31,
      diffuse='#bcd3e2', specular='#ffffff', surface=2.0, spec_const=1.5, spec_exp=18,
      elev=52, azim=76, veil=('50%','30%','90%','#ffffff',0.52),
      veil2=('14%','84%','66%','#efeafb',0.5), blur=1.4),
}

for name, kw in PLATES.items():
    if name in ('char-macro', 'condensation'):
        continue
    open(os.path.join(OUT, name + '.svg'), 'w').write(noise_plate(name, **kw))

# --- Biochar macro ---------------------------------------------------------
# The one image that has to be exactly right, because it IS the product.
# A dark, cool, faceted mineral with hard white speculars — the reason the
# generic recipe failed here is that a bright specular over high-frequency
# noise averages out to chalk. So the lit noise sits at partial opacity over a
# genuinely dark ground, and the speculars are few, small and hard.
open(os.path.join(OUT, 'char-macro.svg'), 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1250">
<defs>
  <filter id="rock">
    <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="6" seed="11" result="n"/>
    <feDiffuseLighting in="n" lighting-color="#5e7a8b" surfaceScale="4.2" result="d">
      <feDistantLight azimuth="222" elevation="26"/></feDiffuseLighting>
  </filter>
  <filter id="spec">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="n"/>
    <feSpecularLighting in="n" surfaceScale="9" specularConstant="1.6" specularExponent="60"
        lighting-color="#ffffff"><feDistantLight azimuth="222" elevation="68"/></feSpecularLighting>
  </filter>
  <radialGradient id="lit" cx="28%" cy="18%" r="76%">
    <stop offset="0%" stop-color="#cbf0f8" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#cbf0f8" stop-opacity="0"/></radialGradient>
  <radialGradient id="iri2" cx="84%" cy="88%" r="60%">
    <stop offset="0%" stop-color="#efeafb" stop-opacity="0.36"/>
    <stop offset="100%" stop-color="#efeafb" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1000" height="1250" fill="#2c3f4c"/>
<rect width="1000" height="1250" filter="url(#rock)" opacity="0.85"/>
<rect width="1000" height="1250" filter="url(#spec)" opacity="0.5" style="mix-blend-mode:screen"/>
<rect width="1000" height="1250" fill="url(#lit)"/>
<rect width="1000" height="1250" fill="url(#iri2)"/>
</svg>''')

# --- Condensation ----------------------------------------------------------
# The atmosphere plate. Beads of water on cold glass, lit from behind: this is
# the image that carries "light diffusion / atmospheric optimism" on its own.
import random
random.seed(7)
beads = []
for _ in range(150):
    x = random.uniform(0, 1400); y = random.uniform(0, 740)
    r = random.uniform(2.5, 15)
    o = random.uniform(0.25, 0.85)
    beads.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r:.1f}" fill="#ffffff" opacity="{o:.2f}"/>')
    beads.append(f'<circle cx="{x-r*0.3:.0f}" cy="{y-r*0.3:.0f}" r="{r*0.34:.1f}" fill="#ffffff" opacity="{min(o+0.25,1):.2f}"/>')
    beads.append(f'<circle cx="{x+r*0.25:.0f}" cy="{y+r*0.35:.0f}" r="{r*0.75:.1f}" fill="#7aa8c9" opacity="{o*0.35:.2f}"/>')
open(os.path.join(OUT, 'condensation.svg'), 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="740">
<defs>
  <linearGradient id="cg" x1="0" y1="0" x2="0.4" y2="1">
    <stop offset="0%" stop-color="#eaf6fc"/><stop offset="46%" stop-color="#cfe4f0"/>
    <stop offset="100%" stop-color="#b6d2e4"/></linearGradient>
  <radialGradient id="back" cx="34%" cy="24%" r="70%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  <radialGradient id="mn" cx="80%" cy="82%" r="58%">
    <stop offset="0%" stop-color="#dcf4ec" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="#dcf4ec" stop-opacity="0"/></radialGradient>
  <filter id="bl"><feGaussianBlur stdDeviation="0.7"/></filter>
</defs>
<rect width="1400" height="740" fill="url(#cg)"/>
<rect width="1400" height="740" fill="url(#back)"/>
<g filter="url(#bl)">''' + ''.join(beads) + '''</g>
<rect width="1400" height="740" fill="url(#mn)"/>
</svg>''')

# --- Figures: people, shot into the light, blown out and soft ---------------
open(os.path.join(OUT, 'figures.svg'), 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0%" stop-color="#ffffff"/><stop offset="46%" stop-color="#e9f3fa"/>
    <stop offset="100%" stop-color="#d6e6f1"/></linearGradient>
  <radialGradient id="sun" cx="26%" cy="14%" r="62%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
    <stop offset="52%" stop-color="#e8f9fd" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  <radialGradient id="iri" cx="84%" cy="76%" r="54%">
    <stop offset="0%" stop-color="#efeafb" stop-opacity="0.72"/>
    <stop offset="100%" stop-color="#efeafb" stop-opacity="0"/></radialGradient>
  <filter id="soft"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="softer"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="gr"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3"/>
    <feColorMatrix type="saturate" values="0"/></filter>
</defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<!-- Figures read as translucent masses of tone, not silhouettes: they are
     LIGHTER than the ground in their cores and only darker at their edges,
     which is what a body shot into the sun actually does. -->
<g filter="url(#softer)" opacity="0.72">
  <ellipse cx="330" cy="620" rx="120" ry="230" fill="#5b8aae"/>
  <ellipse cx="1210" cy="600" rx="104" ry="210" fill="#7aa8c9"/>
</g>
<g filter="url(#soft)" opacity="0.86">
  <ellipse cx="620" cy="560" rx="128" ry="255" fill="#3f6f92"/>
  <circle cx="620" cy="288" r="76" fill="#3f6f92"/>
  <ellipse cx="880" cy="596" rx="106" ry="215" fill="#5b8aae"/>
  <circle cx="880" cy="360" r="64" fill="#5b8aae"/>
</g>
<g filter="url(#soft)" opacity="0.4">
  <ellipse cx="620" cy="500" rx="76" ry="150" fill="#ffffff"/>
  <ellipse cx="880" cy="540" rx="58" ry="120" fill="#ffffff"/>
</g>
<rect width="1600" height="900" fill="url(#sun)"/>
<rect width="1600" height="900" fill="url(#iri)"/>
<rect width="1600" height="900" filter="url(#gr)" opacity="0.09"/>
</svg>''')

# --- Industry: clean industrial. Vertical volumes in haze, not a dark plant --
open(os.path.join(OUT, 'industry.svg'), 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
<defs>
  <linearGradient id="air" x1="0" y1="0" x2="0.2" y2="1">
    <stop offset="0%" stop-color="#fdfeff"/><stop offset="54%" stop-color="#eaf2f8"/>
    <stop offset="100%" stop-color="#dbe8f1"/></linearGradient>
  <linearGradient id="vol" x1="0" y1="0" x2="1" y2="0.2">
    <stop offset="0%" stop-color="#f2f8fc" stop-opacity="0.98"/>
    <stop offset="42%" stop-color="#9fbacd" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#5f83a0" stop-opacity="0.92"/></linearGradient>
  <radialGradient id="glow" cx="62%" cy="22%" r="58%">
    <stop offset="0%" stop-color="#e8f9fd" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="#e8f9fd" stop-opacity="0"/></radialGradient>
  <filter id="haze"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="far"><feGaussianBlur stdDeviation="11"/></filter>
</defs>
<rect width="1600" height="900" fill="url(#air)"/>
<!-- Distance is DEPTH BY HAZE: the far volumes are blurred and desaturated
     toward the sky, never darkened. -->
<g filter="url(#far)" opacity="0.6">
  <rect x="120" y="430" width="150" height="470" fill="#7d9bb2"/>
  <rect x="1290" y="380" width="180" height="520" fill="#89a6bb"/>
  <rect x="900" y="470" width="120" height="430" fill="#9bb4c6"/>
</g>
<g filter="url(#haze)">
  <rect x="330" y="300" width="196" height="600" fill="url(#vol)"/>
  <rect x="596" y="182" width="126" height="718" fill="url(#vol)"/>
  <rect x="760" y="392" width="164" height="508" fill="url(#vol)"/>
  <rect x="1042" y="266" width="188" height="634" fill="url(#vol)"/>
  <rect x="596" y="470" width="446" height="16" fill="#7f9db3" opacity="0.9"/>
  <rect x="330" y="560" width="266" height="12" fill="#7f9db3" opacity="0.8"/>
</g>
<!-- The specular break on the lit edge of each volume. -->
<g opacity="0.9">
  <rect x="330" y="300" width="7" height="600" fill="#ffffff"/>
  <rect x="596" y="182" width="6" height="718" fill="#ffffff"/>
  <rect x="1042" y="266" width="7" height="634" fill="#ffffff"/>
</g>
<!-- Vapour, lit from behind. -->
<g opacity="0.5" filter="url(#far)">
  <ellipse cx="659" cy="150" rx="180" ry="86" fill="#ffffff"/>
  <ellipse cx="1136" cy="214" rx="150" ry="70" fill="#ffffff"/>
</g>
<rect width="1600" height="900" fill="url(#glow)"/>
</svg>''')

# --- Hands: a human scale, high key ----------------------------------------
open(os.path.join(OUT, 'hands.svg'), 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
<defs>
  <radialGradient id="hg" cx="38%" cy="26%" r="76%">
    <stop offset="0%" stop-color="#ffffff"/><stop offset="60%" stop-color="#f2ece3"/>
    <stop offset="100%" stop-color="#dfe7ec"/></radialGradient>
  <filter id="hs"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="grain2"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/>
    <feColorMatrix type="saturate" values="0"/></filter>
</defs>
<rect width="1200" height="900" fill="url(#hg)"/>
<g filter="url(#hs)" opacity="0.66">
  <ellipse cx="470" cy="560" rx="270" ry="150" fill="#cbb9a4" transform="rotate(-12 470 560)"/>
  <ellipse cx="730" cy="600" rx="250" ry="140" fill="#d8c8b3" transform="rotate(9 730 600)"/>
</g>
<!-- The material held in them: fine, dark-cool, catching one specular. -->
<g opacity="0.72"><ellipse cx="600" cy="520" rx="150" ry="72" fill="#8fa2b3"/></g>
<g opacity="0.9"><ellipse cx="556" cy="492" rx="52" ry="20" fill="#ffffff" opacity="0.7"/></g>
<rect width="1200" height="900" filter="url(#grain2)" opacity="0.1"/>
</svg>''')
print('regenerated', len(PLATES) + 3, 'plates')
