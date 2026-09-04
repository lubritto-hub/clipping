"""Monta o GIF técnico a partir dos quadros renderizados no navegador.

Ao contrário do GIF fotográfico, aqui grandes áreas do quadro não mudam entre
um passo e outro (o chão, a grade, as réguas), então a compressão do GIF
trabalha a favor e dá para manter mais quadros e mais cor pelo mesmo peso.
"""
from PIL import Image
import glob, os

W, H = 720, 405
OUT = '.preview/deck-assets/coco-biochar.gif'
arqs = sorted(glob.glob('.preview/gif-frames/f*.png'))
assert arqs, 'sem quadros: rode antes node .preview/gif-tech.mjs'

frames = [Image.open(a).convert('RGB').resize((W, H), Image.LANCZOS)
          .convert('P', palette=Image.ADAPTIVE, colors=96) for a in arqs]
# O ciclo respira: o começo e o patamar seguram, a rampa corre.
dur = []
for i in range(len(frames)):
    u = i / len(frames)
    dur.append(200 if u < 0.12 else (150 if 0.60 <= u < 0.78 else 90))

# disposal=1 ("deixe o quadro no lugar"): sem isso o gravador escreve disposal
# indefinido, e alguns leitores limpam para a cor de fundo entre quadros — o
# painel piscava cinza claro no meio da animação.
frames[0].save(OUT, save_all=True, append_images=frames[1:],
               duration=dur, loop=0, optimize=True, disposal=1)
print('gif:', os.path.getsize(OUT) // 1024, 'KB,', len(frames), 'quadros')
