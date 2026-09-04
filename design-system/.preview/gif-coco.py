"""GIF fotográfico: a casca de coco virando biochar.

É a VARIANTE, não a que está no baralho. O slide 02 usa a versão de painel de
instrumento (gif-tech.mjs), que mostra a mesma conversão lida por leitura de
temperatura, curva térmica e balanço de massa. Este arquivo continua aqui
porque a leitura puramente material tem o seu lugar, e a troca é de um nome de
arquivo. Os dois escrevem em caminhos diferentes de propósito: apontados para
o mesmo, o último a rodar apagaria o outro.

Feito com as DUAS FOTOGRAFIAS do próprio cliente, o coir e o char, e não com
imagem de estoque. A transformação é uma dissolução cruzada com uma fase
térmica no meio: a frente quente sobe pelo quadro, atravessa, e o que sai do
outro lado é o char. O ciclo fecha voltando ao coir, porque o processo é
contínuo, não um antes e depois.

O PowerPoint anima GIF em modo apresentação, então ele roda sozinho na tela e
continua sendo uma imagem única no arquivo, sem depender de animação de slide
nem de vídeo embutido.

TAMANHO
A primeira versão saiu com 20 MB, mais que o resto do arquivo inteiro. Numa
dissolução cruzada TODO pixel muda a cada quadro, então a compressão entre
quadros do GIF não ajuda em nada, e a única saída é menos pixel, menos quadro
e menos cor. 720x405, 26 quadros, 64 cores, cerca de 3,4 MB.
"""
from PIL import Image, ImageEnhance, ImageChops, ImageFilter
import math, os

W, H = 720, 405
SRC = '.preview/img/foto'
OUT = '.preview/deck-assets/coco-biochar-foto.gif'


def prep(path):
    """Recorte central em 16:9, na resolução do GIF."""
    im = Image.open(path).convert('RGB')
    r = max(W / im.width, H / im.height)
    im = im.resize((int(im.width * r), int(im.height * r)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


coir, char = prep(f'{SRC}/coir.jpg'), prep(f'{SRC}/char.jpg')
ease = lambda t: t * t * (3 - 2 * t)

# A vinheta é a mesma em todos os quadros e casa com o tratamento das chapas:
# calcula uma vez, multiplica em cada quadro.
vin = Image.new('L', (W, H))
vp = vin.load()
for y in range(H):
    dy = (y - H / 2) / (H / 2)
    for x in range(W):
        dx = (x - W / 2) / (W / 2)
        vp[x, y] = int(255 * max(0.0, 1 - 0.6 * (dx * dx + dy * dy) ** 1.1))
VIN = Image.merge('RGB', (vin, vin, vin))


def brasa(f):
    """A frente térmica: uma faixa quente que atravessa o quadro de baixo para
    cima. É ela que faz a dissolução ler como PROCESSO e não como transição de
    slide. O pico é contido de propósito: no ajuste anterior a fibra sumia
    dentro do laranja, e o que a animação precisa mostrar é a matéria mudando,
    não o brilho."""
    g = Image.new('L', (1, H))
    gp = g.load()
    centro = (1.3 - 1.6 * f) * H
    for y in range(H):
        d = abs(y - centro) / (H * 0.34)
        gp[0, y] = int(255 * math.exp(-d * d * 2.6))
    g = g.resize((W, H)).filter(ImageFilter.GaussianBlur(14))
    return Image.merge('RGB', (g, g.point(lambda v: int(v * 0.5)),
                                  g.point(lambda v: int(v * 0.16))))


N = 26
frames, duracoes = [], []
for i in range(N):
    t = i / (N - 1)
    if t < 0.14:                       # a casca, parada
        mix = calor = 0.0
    elif t < 0.62:                     # a conversão
        f = (t - 0.14) / 0.48
        mix, calor = ease(f), (math.sin(f * math.pi) ** 0.8) * 0.62
    elif t < 0.80:                     # o char, assentando
        mix, calor = 1.0, max(0.0, (0.80 - t) / 0.18) * 0.1
    else:                              # o ciclo volta
        f = (t - 0.80) / 0.20
        mix, calor = 1.0 - ease(f), 0.0

    base = Image.blend(coir, char, mix)
    if calor > 0.01:
        quente = brasa(min(1.0, max(0.0, (t - 0.14) / 0.48)))
        base = ImageChops.screen(base, quente.point(lambda v, c=calor: int(v * c)))
        base = ImageEnhance.Color(base).enhance(1 + 0.3 * calor)
    base = ImageEnhance.Contrast(base).enhance(1.1)
    base = ImageEnhance.Brightness(base).enhance(0.92)
    base = ImageChops.multiply(base, VIN)

    frames.append(base.convert('P', palette=Image.ADAPTIVE, colors=64))
    duracoes.append(130 if (t < 0.14 or 0.62 <= t < 0.80) else 80)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
frames[0].save(OUT, save_all=True, append_images=frames[1:],
               duration=duracoes, loop=0, optimize=True)
print('gif:', os.path.getsize(OUT) // 1024, 'KB,', len(frames), 'quadros')
