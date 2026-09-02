# Fotos reais

Os materiais deste baralho são **desenhados** — pátio de casca, macro da casca,
biochar, secção do fruto e fibra. Eles são desenhos porque não havia foto
licenciada disponível, e porque a única foto de referência recebida vinha com
marca d'água de banco de imagens, o que não entra num material de cliente.

**Para trocar por fotos de verdade**, largue os arquivos aqui com estes nomes
(`.jpg` ou `.png`) e rode o build. Nenhuma outra alteração é necessária — a
chapa usa a foto no lugar do desenho automaticamente.

| arquivo             | o que é                                  | onde aparece   |
|---------------------|------------------------------------------|----------------|
| `coco-yard.jpg`     | o pátio de casca, plano aberto           | capa e slide 2 |
| `coco-macro.jpg`    | close de meias-cascas empilhadas         | slides 3 e 4   |
| `coco-char.jpg`     | biochar de casca de coco, lascas         | slides 4, 5, 7 |
| `coco-section.jpg`  | secção transversal do fruto              | slide 3        |
| `coco-husk.jpg`     | fibra de coir, macro                     | slide 6        |

Formato: 16:9 ou mais largo, no mínimo 2000 px de largura. A chapa aplica o
tratamento (contraste, vinheta e grão), então mande o arquivo sem tratamento.

Rodar depois de largar os arquivos:

    cd design-system && node .preview/art-pep.mjs
    cd .. && node deck/build-pep.js
