"""QA renderer: reads the real .pptx and draws every shape at its true
coordinates, so geometry and text fit can be inspected without LibreOffice
(which cannot load any .pptx in this sandbox)."""
import base64, sys, zipfile
from pathlib import Path
from defusedxml import minidom

EMU = 914400.0
NS = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}

def el(node, ns, name):
    return node.getElementsByTagNameNS(NS[ns], name)

def first(node, ns, name):
    got = el(node, ns, name)
    return got[0] if got else None

def rels_for(z, slide):
    p = f'ppt/slides/_rels/{slide}.xml.rels'
    doc = minidom.parseString(z.read(p))
    out = {}
    for r in doc.getElementsByTagName('Relationship'):
        out[r.getAttribute('Id')] = r.getAttribute('Target').replace('../', 'ppt/')
    return out

def media_uri(z, path):
    data = z.read(path)
    ext = Path(path).suffix.lstrip('.').replace('jpg', 'jpeg')
    return f'data:image/{ext};base64,' + base64.b64encode(data).decode()

def xfrm(node):
    off, ext = first(node, 'a', 'off'), first(node, 'a', 'ext')
    if off is None or ext is None:
        return None
    return (int(off.getAttribute('x')) / EMU, int(off.getAttribute('y')) / EMU,
            int(ext.getAttribute('cx')) / EMU, int(ext.getAttribute('cy')) / EMU)

def render(pptx, out_prefix, scale=132):
    z = zipfile.ZipFile(pptx)
    slides = sorted((n for n in z.namelist()
                     if n.startswith('ppt/slides/slide') and n.endswith('.xml')),
                    key=lambda n: int(''.join(c for c in Path(n).stem if c.isdigit())))
    pages = []
    for sp in slides:
        name = Path(sp).stem
        rels = rels_for(z, name)
        doc = minidom.parseString(z.read(sp))
        parts = []

        bg = first(doc, 'p', 'bg')
        if bg is not None:
            blip = first(bg, 'a', 'blip')
            if blip is not None:
                tgt = rels.get(blip.getAttributeNS(NS['r'], 'embed'))
                if tgt:
                    parts.append(f'<img class="bg" src="{media_uri(z, tgt)}">')
            else:
                clr = first(bg, 'a', 'srgbClr')
                if clr is not None:
                    parts.append(f'<div class="bg" style="background:#{clr.getAttribute("val")}"></div>')

        for pic in el(doc, 'p', 'pic'):
            box = xfrm(pic)
            blip = first(pic, 'a', 'blip')
            if not box or blip is None:
                continue
            tgt = rels.get(blip.getAttributeNS(NS['r'], 'embed'))
            if not tgt:
                continue
            x, y, w, h = box
            parts.append(f'<img style="position:absolute;left:{x}in;top:{y}in;'
                         f'width:{w}in;height:{h}in" src="{media_uri(z, tgt)}">')

        for gf in el(doc, 'p', 'graphicFrame'):
            box = xfrm(gf)
            if not box:
                continue
            x, y, w, h = box
            parts.append(f'<div class="chart" style="left:{x}in;top:{y}in;'
                         f'width:{w}in;height:{h}in">gráfico nativo</div>')

        for sp_el in el(doc, 'p', 'sp'):
            box = xfrm(sp_el)
            if not box:
                continue
            x, y, w, h = box
            fill = first(sp_el, 'a', 'solidFill')
            tx = first(sp_el, 'p', 'txBody')
            if tx is None and fill is not None:
                clr = first(fill, 'a', 'srgbClr')
                alpha = first(clr, 'a', 'alpha') if clr is not None else None
                op = 1 - int(alpha.getAttribute('val')) / 100000 if alpha is not None else 1
                col = clr.getAttribute('val') if clr is not None else '888888'
                parts.append(f'<div style="position:absolute;left:{x}in;top:{y}in;width:{w}in;'
                             f'height:{h}in;background:#{col};opacity:{1-op if op<1 else 1}"></div>')
                continue
            if tx is None:
                continue
            runs, size, color, align, spacing, rot = [], 12, 'FFFFFF', 'left', 0, 0
            xf = first(sp_el, 'a', 'xfrm')
            if xf is not None and xf.getAttribute('rot'):
                rot = int(xf.getAttribute('rot')) / 60000
            # Walk PARAGRAPH BY PARAGRAPH. Flattening every <a:r> in the body
            # into one string fuses the last word of each paragraph onto the
            # first word of the next, which invents line-break defects that are
            # not in the file — pptxgenjs writes a "\n" as a real </a:p><a:p>,
            # not as a <a:br/>.
            paras = []
            for para in el(tx, 'a', 'p'):
                ppr = first(para, 'a', 'pPr')
                if ppr is not None and ppr.getAttribute('algn'):
                    align = {'l': 'left', 'r': 'right', 'ctr': 'center'}.get(
                        ppr.getAttribute('algn'), 'left')
                # Children in document order, so an <a:br/> lands between the
                # runs it actually separates.
                chunks = []
                for node in para.childNodes:
                    if node.nodeType != node.ELEMENT_NODE:
                        continue
                    tag = node.tagName.split(':')[-1]
                    if tag == 'br':
                        chunks.append('\n')
                    elif tag == 'r':
                        rpr = first(node, 'a', 'rPr')
                        if rpr is not None:
                            if rpr.getAttribute('sz'):
                                size = int(rpr.getAttribute('sz')) / 100
                            if rpr.getAttribute('spc'):
                                spacing = int(rpr.getAttribute('spc')) / 100
                            c = first(rpr, 'a', 'srgbClr')
                            if c is not None:
                                color = c.getAttribute('val')
                        t = first(node, 'a', 't')
                        chunks.append(t.firstChild.nodeValue if t and t.firstChild else '')
                paras.append(''.join(chunks))
            runs = paras
            text = '<br>'.join('\n'.join(paras).split('\n'))
            if not text.strip():
                continue
            tr = f'transform:rotate({rot}deg);transform-origin:left top;' if rot else ''
            parts.append(
                f'<div class="tx" style="left:{x}in;top:{y}in;width:{w}in;height:{h}in;'
                f'font-size:{size}pt;color:#{color};text-align:{align};'
                f'letter-spacing:{spacing}pt;{tr}"><span>{text}</span></div>')

        pages.append(f'<section class="slide">{"".join(parts)}'
                     f'<b class="pn">{name}</b></section>')

    html = f'''<!doctype html><meta charset="utf-8"><style>
body{{margin:0;background:#2a2f2d;font-family:Arial,Helvetica,sans-serif}}
.slide{{position:relative;width:10in;height:5.625in;overflow:hidden;margin:18px auto;
  background:#fff;box-shadow:0 2px 20px rgba(0,0,0,.5)}}
.bg{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}}
.tx{{position:absolute;display:flex;align-items:center;line-height:1.18;overflow:visible}}
.tx span{{display:block;width:100%}}
.chart{{position:absolute;border:1px dashed rgba(163,180,173,.6);color:#A3B4AD;
  font-size:10pt;display:flex;align-items:center;justify-content:center}}
.pn{{position:absolute;right:6px;bottom:4px;font-size:8pt;color:#888;font-weight:400}}
</style>{"".join(pages)}'''
    Path(out_prefix + '.html').write_text(html, encoding='utf-8')
    print(f'{len(pages)} slides -> {out_prefix}.html')

if __name__ == '__main__':
    render(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'qa')
