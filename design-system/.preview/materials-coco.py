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

# --- 05 CHAR DE CASCA DE COCO ----------------------------------------------
# Desenhado a partir de uma fotografia do produto: LASCAS angulosas, com faces
# de fratura conchoidal que brilham, e arestas vivas que pegam a luz. Não é pó
# e não é esfera — é vidro preto quebrado, e é isso que faz o material parecer
# valioso em vez de sujo.
#
# A primeira versão saiu CINZA, e por dois motivos: toda lasca ganhava uma face
# clara, e duas lavagens radiais passavam por cima de tudo no fim. Carvão é
# preto com poucos brilhos fortes — não é cinza com muitos brilhos fracos.
random.seed(9)
chips = []
for _ in range(620):
    cx, cy = random.uniform(-60, 1260), random.uniform(-60, 1060)
    rad = max(11, min(random.lognormvariate(3.35, 0.52), 108))
    rot = random.uniform(0, 360)
    sides = random.choice([3, 4, 4, 5, 5, 6])
    pts = []
    for k in range(sides):
        a = (k / sides) * math.tau + random.uniform(-0.28, 0.28)
        rr = rad * random.uniform(0.5, 1.2)
        pts.append((cx + math.cos(a) * rr, cy + math.sin(a) * rr * random.uniform(0.66, 1.0)))
    poly = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    chips.append((cy, f'<polygon points="{poly}" transform="rotate({rot:.0f} {cx:.0f} {cy:.0f})" '
                      f'fill="#070706"/>'))
    # A face conchoidal. Só uma lasca em cada três a tem virada para a luz —
    # é a raridade do brilho que faz o material ler como vítreo.
    if rad > 22 and random.random() < 0.34:
        fx = [(cx + (x - cx) * 0.62, cy + (y - cy) * 0.62) for x, y in pts[:max(3, sides - 1)]]
        fpoly = ' '.join(f'{x:.1f},{y:.1f}' for x, y in fx)
        chips.append((cy + 0.1, f'<polygon points="{fpoly}" transform="rotate({rot:.0f} {cx:.0f} {cy:.0f})" '
                                f'fill="#8f9698" fill-opacity="{random.uniform(0.3, 0.72):.2f}"/>'))
    # A aresta viva, num lado só e curta.
    edge = ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts[:max(2, sides // 2)])
    chips.append((cy + 0.2, f'<path d="M{edge}" transform="rotate({rot:.0f} {cx:.0f} {cy:.0f})" '
                            f'fill="none" stroke="#eef2f2" stroke-opacity="{random.uniform(0.3, 0.95):.2f}" '
                            f'stroke-width="{max(1.0, rad * 0.048):.1f}" stroke-linejoin="round"/>'))
chips.sort(key=lambda t: t[0])

open(f'{OUT}/coco-char.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000">
<defs>
  <linearGradient id="clit" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0%" stop-color="#c9d6d8" stop-opacity="0.15"/>
    <stop offset="52%" stop-color="#c9d6d8" stop-opacity="0.02"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/></linearGradient>
</defs>
<rect width="1200" height="1000" fill="#0b0a09"/>
{''.join(c for _, c in chips)}
<rect width="1200" height="1000" fill="url(#clit)"/>
</svg>''')
print('char de lascas: coco-char')

# --- 06 PÁTIO DE CASCA ------------------------------------------------------
# Desenhado a partir de uma fotografia de referência de um pátio real: montes
# de meias-cascas até o horizonte, caminhões e galpão na poeira, coqueiros ao
# fundo. Não é a fotografia — ela vinha com marca d'água de banco de imagens e
# não entra num material de cliente. É a MESMA CENA, desenhada.
#
# É a imagem mais importante do baralho porque é a premissa: a casca já existe,
# nesta quantidade, hoje. O slide 04 diz "menos pilha"; esta chapa é a pilha.
random.seed(77)

def cup(x, y, r, o, tilt):
    """Uma meia-casca de coco vista de fora: a calota, e a sombra da concavidade
    quando ela cai virada para cima."""
    inner = r * random.uniform(0.44, 0.68)
    body = (f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{r:.1f}" ry="{r*0.74:.1f}" '
            f'transform="rotate({tilt:.0f} {x:.0f} {y:.0f})" fill="#6b4b2e" fill-opacity="{o:.2f}"/>')
    lit = (f'<path d="M{x-r:.1f} {y:.1f} A{r:.1f} {r*0.74:.1f} 0 0 1 {x+r:.1f} {y:.1f}" '
           f'transform="rotate({tilt-26:.0f} {x:.0f} {y:.0f})" fill="none" '
           f'stroke="#e0bb87" stroke-opacity="{o*0.9:.2f}" stroke-width="{max(0.6, r*0.16):.1f}"/>')
    hole = ''
    if random.random() < 0.42:
        hole = (f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{inner:.1f}" ry="{inner*0.7:.1f}" '
                f'transform="rotate({tilt:.0f} {x:.0f} {y:.0f})" fill="#33200f" '
                f'fill-opacity="{o*0.85:.2f}"/>')
    return body + hole + lit

# Um monte é uma PARÁBOLA cheia, não uma nuvem gaussiana em volta de um ponto.
# A primeira versão sorteava a altura independentemente do x, e o resultado era
# uma camada rasa de cascas espalhadas pelo chão — a leitura de "monte" só
# aparece quando a silhueta sobe no centro e desce nas bordas.
piles = []
for (px, base, pw, ph, n, rmin, rmax, op) in [
        (280,  474, 260,  74, 260, 6,  12, 0.52),   # fundo esquerda
        (780,  490, 280,  92, 320, 7,  14, 0.58),   # fundo centro
        (1480, 480, 320, 104, 360, 7,  15, 0.56),   # fundo direita
        (1800, 690, 340, 250, 340, 16, 34, 0.78),   # meio direita
        (330,  740, 380, 280, 420, 16, 36, 0.82),   # meio esquerda
        (420,  1180, 620, 520, 520, 32, 68, 0.92),   # o monte da frente
        (1560, 1240, 700, 470, 520, 34, 74, 0.94)]:  # e o seu par à direita
    for _ in range(n):
        u = random.uniform(-1, 1)
        x = px + u * pw
        top = ph * (1 - u * u)                      # a silhueta do monte
        y = base - random.random() * top
        depth = 0.5 + 0.62 * (y / 1125)            # perto = maior
        r = random.uniform(rmin, rmax) * depth
        piles.append((y, cup(x, y, r, op * random.uniform(0.72, 1.0), random.uniform(-40, 40))))
piles.sort(key=lambda t: t[0])          # painter's algorithm: fundo primeiro

open(f'{OUT}/coco-yard.svg', 'w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1125">
<defs>
  <linearGradient id="ysky" x1="0" y1="0" x2="0.1" y2="1">
    <stop offset="0%" stop-color="#f6f2e4"/><stop offset="58%" stop-color="#e9e6d2"/>
    <stop offset="100%" stop-color="#d5cdb2"/></linearGradient>
  <linearGradient id="yground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#c6b697"/><stop offset="100%" stop-color="#a8946f"/></linearGradient>
  <radialGradient id="ysun" cx="24%" cy="8%" r="62%">
    <stop offset="0%" stop-color="#fffdf4" stop-opacity="0.62"/>
    <stop offset="100%" stop-color="#fffdf4" stop-opacity="0"/></radialGradient>
  <filter id="ydust"><feGaussianBlur stdDeviation="16"/></filter>
  <filter id="yfar"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
<rect width="2000" height="1125" fill="url(#ysky)"/>
<!-- coqueiros no horizonte, longe e desbotados pela poeira -->
<g filter="url(#yfar)" opacity="0.4" stroke="#607d4e" fill="none">
  {''.join(f'<path d="M{x} 442 v-58" stroke-width="2.4"/>'
           f'<path d="M{x} 384 q-28 -13 -47 4M{x} 384 q28 -13 47 4'
           f'M{x} 384 q-15 -24 -32 -28M{x} 384 q15 -24 32 -28" stroke-width="1.8"/>'
           for x in range(1160, 2000, 58))}
</g>
<!-- galpão e caminhões, silhuetas na poeira -->
<g filter="url(#yfar)" opacity="0.46" fill="#82806a">
  <rect x="520" y="332" width="620" height="110"/>
  <rect x="470" y="356" width="60" height="86"/>
  <rect x="150" y="376" width="230" height="66"/>
  <rect x="150" y="354" width="72" height="88"/>
</g>
<rect x="0" y="442" width="2000" height="683" fill="url(#yground)"/>
{''.join(c for _, c in piles)}
<!-- poeira suspensa: o que separa os planos -->
<g filter="url(#ydust)" opacity="0.42">
  <ellipse cx="1000" cy="478" rx="1100" ry="62" fill="#efe9d6"/>
  <ellipse cx="380" cy="530" rx="420" ry="54" fill="#efe9d6"/>
</g>
<rect width="2000" height="1125" fill="url(#ysun)"/>
</svg>''')
print('pátio: coco-yard')

# --- 07 CHAPA DE METAL ------------------------------------------------------
# O registro de engenharia: aço escovado. Anisotrópico e com uma aresta
# usinada, porque é a direção da escovação que faz metal parecer metal.
# Serve de plinto para ícones, de régua e de plano de fundo técnico.
open(f'{OUT}/metal-plate.svg', 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="400">
<defs>
  <linearGradient id="mp" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f2f4f5"/><stop offset="18%" stop-color="#c9cfd2"/>
    <stop offset="42%" stop-color="#eef1f2"/><stop offset="58%" stop-color="#aeb6ba"/>
    <stop offset="78%" stop-color="#d8dee0"/><stop offset="100%" stop-color="#9ba4a8"/></linearGradient>
  <filter id="brush">
    <feTurbulence type="fractalNoise" baseFrequency="0.002 0.9" numOctaves="3" seed="12" result="n"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
  </filter>
</defs>
<rect width="1600" height="400" fill="url(#mp)"/>
<rect width="1600" height="400" filter="url(#brush)" opacity="0.5" style="mix-blend-mode:overlay"/>
<rect y="0" width="1600" height="2" fill="#ffffff" opacity="0.85"/>
<rect y="398" width="1600" height="2" fill="#7c868a" opacity="0.7"/>
</svg>''')
print('metal: metal-plate')

# --- 08 COCO CROMADO --------------------------------------------------------
# O objeto de abertura. Um coco em cromo: é a única peça Y2K declarada do
# baralho. Cromo NÃO é uma esfera clara com um brilho — é contraste de valor em
# faixas horizontais: céu branco em cima, uma banda escura no equador, e o
# ressalto do chão embaixo. A primeira versão usava um gradiente radial e saiu
# como bola de vidro fosco.
#
# Os três poros de germinação continuam lá, agrupados num polo, porque é o que
# faz a esfera ler como COCO e não como bola de metal.
open(f'{OUT}/coco-chrome.svg', 'w').write('''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
<defs>
  <linearGradient id="chb" x1="0" y1="0" x2="0.18" y2="1">
    <stop offset="0%"   stop-color="#ffffff"/>
    <stop offset="14%"  stop-color="#eef8f6"/>
    <stop offset="30%"  stop-color="#b9d2cd"/>
    <stop offset="44%"  stop-color="#5d7570"/>
    <stop offset="52%"  stop-color="#22302b"/>
    <stop offset="58%"  stop-color="#4a6146"/>
    <stop offset="68%"  stop-color="#9dba86"/>
    <stop offset="80%"  stop-color="#e9f4d8"/>
    <stop offset="92%"  stop-color="#8fa98a"/>
    <stop offset="100%" stop-color="#37452f"/></linearGradient>
  <radialGradient id="chv" cx="38%" cy="30%" r="76%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
    <stop offset="62%" stop-color="#ffffff" stop-opacity="0"/>
    <stop offset="100%" stop-color="#0d160f" stop-opacity="0.5"/></radialGradient>
  <linearGradient id="chi" x1="0.1" y1="0.2" x2="0.9" y2="0.9">
    <stop offset="0%"   stop-color="#ffd9a8"/>
    <stop offset="24%"  stop-color="#c8e85c"/>
    <stop offset="46%"  stop-color="#7fe6d6"/>
    <stop offset="66%"  stop-color="#b9a8f0"/>
    <stop offset="84%"  stop-color="#ffc2d2"/>
    <stop offset="100%" stop-color="#ffeec2"/></linearGradient>
  <filter id="chs"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="chf"><feGaussianBlur stdDeviation="3"/></filter>
  <clipPath id="chc"><circle cx="500" cy="500" r="470"/></clipPath>
</defs>
<circle cx="500" cy="500" r="470" fill="url(#chb)"/>
<g clip-path="url(#chc)">
  <!-- a franja iridescente: um arco fino na borda que vira, nunca no corpo -->
  <circle cx="500" cy="500" r="452" fill="none" stroke="url(#chi)" stroke-width="34"
    opacity="0.85" filter="url(#chf)"/>
  <!-- especular dura, e a sua fantasma -->
  <ellipse cx="342" cy="252" rx="126" ry="76" fill="#ffffff" opacity="0.95"
    transform="rotate(-26 342 252)"/>
  <ellipse cx="318" cy="300" rx="212" ry="140" fill="#ffffff" opacity="0.22"
    transform="rotate(-26 318 300)" filter="url(#chs)"/>
  <!-- o ressalto do chão, embaixo à direita -->
  <ellipse cx="716" cy="812" rx="150" ry="52" fill="#f2ffe8" opacity="0.5"
    transform="rotate(-24 716 812)" filter="url(#chs)"/>
  <!-- os três poros, agrupados num polo, na banda clara de cima -->
  <g fill="#16231a" opacity="0.66">
    <ellipse cx="626" cy="286" rx="29" ry="24" transform="rotate(-18 626 286)"/>
    <ellipse cx="702" cy="336" rx="26" ry="21" transform="rotate(-18 702 336)"/>
    <ellipse cx="646" cy="372" rx="24" ry="20" transform="rotate(-18 646 372)"/>
  </g>
  <g fill="#e8f6ec" opacity="0.45">
    <ellipse cx="622" cy="278" rx="25" ry="8" transform="rotate(-18 622 278)"/>
    <ellipse cx="698" cy="329" rx="22" ry="7" transform="rotate(-18 698 329)"/>
  </g>
</g>
<circle cx="500" cy="500" r="470" fill="url(#chv)"/>
<circle cx="500" cy="500" r="469" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
</svg>''')
print('cromo: coco-chrome')
