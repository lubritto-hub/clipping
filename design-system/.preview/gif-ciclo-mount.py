"""Monta o GIF do ciclo. Fundo chapado e traços finos: pouca cor basta, e a
compressão entre quadros trabalha bem porque só o tracejado muda."""
from PIL import Image
import glob, os

OUT = '.preview/deck-assets/ciclo.gif'
arqs = sorted(glob.glob('.preview/gif-frames-ciclo/c*.png'))
assert arqs, 'sem quadros: rode antes node .preview/gif-ciclo.mjs'
frames = [Image.open(a).convert('RGB').convert('P', palette=Image.ADAPTIVE, colors=48)
          for a in arqs]
frames[0].save(OUT, save_all=True, append_images=frames[1:],
               duration=80, loop=0, optimize=True, disposal=1)
print('gif do ciclo:', os.path.getsize(OUT) // 1024, 'KB,', len(frames), 'quadros')
