/* Cadeira Beni — Pitch enxuto (banca 02/jul). Uma ideia por slide;
   detalhe vai na fala. Identidade v5 do site. */
const pptxgen = require('pptxgenjs');
const P = new pptxgen();
P.defineLayout({ name: 'W', width: 10, height: 5.625 });
P.layout = 'W';

const C = {
  ink:'11100D', paper:'EFE7D6', paper2:'E6DAC2',
  woodDark:'4B2A17', woodMid:'8A4A22', clay:'D65A2B', sun:'F26A1B',
  bamboo:'C89B48', moss:'243D2C', haze:'9FB4BD',
  muted:'8A7B60', mutedD:'BFB49E', ink70:'3A362E'
};
const F = { disp:'League Gothic', sans:'IBM Plex Sans', mono:'IBM Plex Mono', serif:'Instrument Serif' };
const A = 'site/assets/';

function bg(s,c){ s.background={color:c}; }
function streak(s){ const seg=[[C.woodDark,1.6],[C.woodMid,1.8],[C.clay,1.9],[C.sun,1.4],[C.woodMid,1.7],[C.woodDark,1.6]];
  let x=0; seg.forEach(([c,w])=>{ s.addShape('rect',{x,y:0,w,h:.055,fill:{color:c},line:{type:'none'}}); x+=w; }); }
function slats(s,x,y,hIn,legs=C.woodDark){ const u=hIn/72;
  const put=(rx,ry,rw,rh,c)=>s.addShape('roundRect',{x:x+rx*u,y:y+ry*u,w:rw*u,h:rh*u,rectRadius:Math.min(rw,rh)*u*0.45,fill:{color:c},line:{type:'none'}});
  put(6,4,8,52,C.woodMid); put(14,4,30,7,C.woodMid); put(14,14,40,7,C.woodMid); put(14,24,28,7,C.woodMid);
  put(14,30,28,7,C.clay); put(14,40,42,7,C.clay); put(14,50,32,7,C.clay);
  put(10,58,7,12,legs); put(42,58,7,12,legs); }
function kick(s,t,x,y,color){ s.addText(t.toUpperCase(),{x,y,w:9,h:.3,fontFace:F.mono,fontSize:10.5,charSpacing:4,color}); }
function title(s,t,x,y,size,color,w=9,o={}){ s.addText(t.toUpperCase(),{x,y,w,h:size/46,fontFace:F.disp,fontSize:size,color,lineSpacing:size*.86,valign:'top',...o}); }
function foot(s,dark=true){ s.addText('Luiza Britto · PAS — Programa Avançado de Sustentabilidade · Insper · 02 jul 2026',{x:.45,y:5.28,w:9.1,h:.28,fontFace:F.mono,fontSize:8,charSpacing:2,color:dark?C.mutedD:C.muted}); }
function chip(s,t,x,y,color,w=1.4){ s.addText(t.toUpperCase(),{x,y,w,h:.26,fontFace:F.mono,fontSize:8,charSpacing:1,color,align:'center',line:{color,width:.75}}); }

/* S1 · CAPA */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  slats(s,.45,.38,.95,C.bamboo);
  s.addText('MÓVEL PET EM MADEIRA DE REUSO · PROTÓTIPO V2',{x:4.2,y:.45,w:5.35,h:.25,fontFace:F.mono,fontSize:9.5,charSpacing:3,color:C.bamboo,align:'right'});
  s.addText([{text:'CADEIRA\n',options:{color:C.paper}},{text:'BENI',options:{color:C.clay}}],
    {x:.4,y:1.35,w:5.4,h:3.1,fontFace:F.disp,fontSize:124,lineSpacing:103,valign:'top'});
  s.addText('A caminha saiu do canto. Virou mobiliário.',{x:.47,y:4.35,w:4.9,h:.42,fontFace:F.serif,italic:true,fontSize:18,color:C.paper});
  s.addImage({path:A+'product-hero.png',x:5.45,y:1.05,w:4.3,h:4.3*830/920});
  foot(s);
})();

/* S2 · PROBLEMA — uma frase por ótica + 3 números grandes */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'o problema sistêmico',.45,.36,C.woodMid);
  title(s,'O pet ficou definitivo.\nO produto pet, não.',.42,.72,44,C.ink,9.2);
  s.addText('CLIENTE',{x:.47,y:2.5,w:2,h:.26,fontFace:F.mono,fontSize:10,charSpacing:3,color:C.clay});
  s.addText('A caminha deforma, não lava e vai inteira pro lixo — escondida no canto da sala.',
    {x:.45,y:2.78,w:4.3,h:.85,fontFace:F.sans,fontSize:14,color:C.ink70,lineSpacingMultiple:1.15});
  s.addText('ECOSSISTEMA',{x:5.2,y:2.5,w:2.5,h:.26,fontFace:F.mono,fontSize:10,charSpacing:3,color:C.moss});
  s.addText('Madeira maciça de móveis antigos vira descarte volumoso — e cada peça reusada substitui madeira nova.',
    {x:5.18,y:2.78,w:4.35,h:.85,fontFace:F.sans,fontSize:14,color:C.ink70,lineSpacingMultiple:1.15});
  const num=(x,big,small)=>{ s.addText(big,{x,y:3.9,w:3,h:.72,fontFace:F.disp,fontSize:44,color:C.ink});
    s.addText(small.toUpperCase(),{x:x+.03,y:4.62,w:3,h:.26,fontFace:F.mono,fontSize:9,charSpacing:2,color:C.muted}); };
  num(.45,'R$ 76 BI','mercado pet BR · 2º do mundo');
  num(3.75,'12–16 H','de descanso por dia');
  num(7.05,'12–24 MESES','vida útil de uma caminha');
  foot(s,false);
})();

/* S3 · PÚBLICO — persona em 3 linhas curtas + foto grande */
(()=>{ const s=P.addSlide(); bg(s,C.paper2); streak(s);
  kick(s,'público-alvo',.45,.36,C.woodMid);
  title(s,'Para casas onde\no pet também mora.',.42,.72,42,C.ink,5.8);
  s.addText('Tutor urbano consciente',{x:.45,y:2.62,w:5.4,h:.4,fontFace:F.sans,bold:true,fontSize:17,color:C.ink});
  s.addText('28–50 · capitais · apartamento · cão pequeno',{x:.45,y:3.0,w:5.4,h:.3,fontFace:F.mono,fontSize:10,charSpacing:1,color:C.muted});
  s.addText([
    {text:'Quer móvel que fica na sala.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Aceita pátina como história.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Paga por durar e reparar.',options:{bullet:{code:'2022'}}}],
    {x:.45,y:3.42,w:5.2,h:1.2,fontFace:F.sans,fontSize:14,color:C.ink70,lineSpacingMultiple:1.35});
  s.addImage({path:A+'dog-look.jpg',x:6.2,y:1.45,w:3.45,h:3.45});
  s.addShape('rect',{x:6.2,y:1.45,w:3.45,h:3.45,fill:{color:'FFFFFF',transparency:100},line:{color:C.ink,width:1}});
  s.addText('CACHORRO DE VERDADE',{x:6.2,y:4.96,w:3.45,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:C.muted,align:'center'});
  foot(s,false);
})();

/* S4 · VALIDAÇÃO — só as 3 frases de ouro */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  kick(s,'validação · certezas & suposições da pesquisa · 6 entrevistas — tutores, marceneiro, veterinário, catador',.45,.36,C.bamboo);
  const q=(y,quote,who,dec)=>{
    s.addShape('rect',{x:.47,y:y+.08,w:.04,h:.9,fill:{color:C.clay},line:{type:'none'}});
    s.addText('“'+quote+'”',{x:.66,y,w:8.9,h:.66,fontFace:F.serif,italic:true,fontSize:23,color:C.paper,valign:'top'});
    s.addText(who.toUpperCase()+'      →  '+dec.toUpperCase(),{x:.66,y:y+.64,w:8.9,h:.26,fontFace:F.mono,fontSize:9,charSpacing:2,color:C.bamboo}); };
  q(1.05,'Higiene — urina, pelos, ácaros — é fator obrigatório de aceitação.','Certeza · pesquisa','virou: verniz lavável agora, capa removível no roadmap');
  q(2.35,'Só confio no reaproveitado com protocolo claro de sanitização.','Suposição · consumidores','virou: triagem, tratamento e verniz no processo');
  q(3.65,'Peroba e jacarandá, hoje, só se obtêm por reuso.','Certeza · madeira-fonte','virou: mineração urbana como valor');
  foot(s);
})();

/* S5 · PROPOSTA DE VALOR — 3 versus curtos */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'proposta de valor sistêmica',.45,.36,C.woodMid);
  title(s,'Não é caminha descartável.\nÉ mobiliário reparável.',.42,.72,42,C.ink,9.2);
  s.addText('CAMINHA',{x:.45,y:2.62,w:3,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.muted});
  s.addText('BENI',{x:5.0,y:2.62,w:3,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.clay});
  const row=(y,a,b)=>{ s.addShape('rect',{x:.45,y:y-.1,w:6.9,h:.011,fill:{color:C.ink70},line:{type:'none'}});
    s.addText(a,{x:.45,y,w:4.2,h:.42,fontFace:F.sans,fontSize:14,color:C.muted});
    s.addText(b,{x:5.0,y,w:2.6,h:.42,fontFace:F.sans,bold:true,fontSize:14,color:C.ink}); };
  row(2.98,'Madeira nova, insumo virgem','Madeira que já existia');
  row(3.56,'Estragou? Joga tudo fora','Troca por componente');
  row(4.14,'Some no canto','Fica na sala');
  chip(s,'tecidos — em breve',5.0,4.72,C.haze,1.6);
  s.addImage({path:A+'product-hero.png',x:7.7,y:2.6,w:2.1,h:2.1*830/920});
  foot(s,false);
})();

/* S6 · PROTÓTIPO FÍSICO — foto grande + callouts de 3 palavras */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  kick(s,'protótipo físico · demonstração ao vivo',.45,.36,C.bamboo);
  title(s,'A cadeira,\npor partes.',.42,.78,46,C.paper,4.4);
  s.addImage({path:A+'product-hero.png',x:.42,y:2.45,w:3.6,h:3.6*830/920});
  const call=(y,k,v,st,stc)=>{ s.addShape('rect',{x:4.75,y:y-.08,w:5.13,h:.009,fill:{color:'4A4438'},line:{type:'none'}});
    s.addText(k.toUpperCase(),{x:4.75,y,w:2,h:.24,fontFace:F.mono,fontSize:9,charSpacing:2,color:C.bamboo});
    s.addText(v,{x:6.35,y:y-.03,w:2.6,h:.32,fontFace:F.sans,bold:true,fontSize:13,color:C.paper});
    chip(s,st,9.02,y-.01,stc,.85); };
  call(1.2,'estrutura','Madeira reaproveitada','ok',C.bamboo);
  call(1.98,'pernas','Bambu — 4 estacas','v2',C.clay);
  call(2.76,'fixação','Encaixe, sem cola','ok',C.bamboo);
  call(3.54,'acabamento','Verniz + vinil','ok',C.bamboo);
  call(4.32,'assento','Tecidos','breve',C.haze);
  s.addText('resiste a unha, xixi e mordida',{x:6.35,y:3.86,w:3.3,h:.26,fontFace:F.serif,italic:true,fontSize:11,color:C.mutedD});
  foot(s);
})();

/* S7 · USO REAL — foto + 3 observações */
(()=>{ const s=P.addSlide(); bg(s,C.ink);
  s.addImage({path:A+'uso-home.jpg',x:0,y:0,w:6.55,h:5.625,sizing:{type:'cover',w:6.55,h:5.625}});
  kick(s,'teste em uso real',6.78,.55,C.bamboo);
  title(s,'Na sala,\ncom cachorro.',6.75,.92,40,C.paper,3.1);
  s.addText([
    {text:'Subiu sozinho no primeiro dia.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Aguentou pata, peso e soneca.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Ficou na sala. Não no canto.',options:{bullet:{code:'2022'}}}],
    {x:6.78,y:2.75,w:3,h:1.6,fontFace:F.sans,fontSize:13,color:C.paper,lineSpacingMultiple:1.5});
  s.addText('teste nº 1 · aprovado',{x:6.78,y:4.5,w:2.4,h:.35,fontFace:'Permanent Marker',fontSize:14,color:C.bamboo,rotate:-4});
  foot(s);
})();

/* S8 · PROTÓTIPO DIGITAL — 3 telas + 1 linha */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'protótipo digital',.45,.36,C.woodMid);
  title(s,'Do objeto ao sistema.',.42,.72,44,C.ink,9);
  const shot=(x,f,cap)=>{ s.addImage({path:'entrega/shots/'+f,x,y:2.0,w:2.95,h:2.95*860/1280});
    s.addShape('rect',{x,y:2.0,w:2.95,h:2.95*860/1280,fill:{color:'FFFFFF',transparency:100},line:{color:C.ink,width:1}});
    s.addText(cap.toUpperCase(),{x,y:4.04,w:2.95,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:C.muted,align:'center'}); };
  shot(.45,'site-hero.jpg','a peça');
  shot(3.55,'site-prancha.jpg','prancha técnica');
  shot(6.65,'site-suporte.jpg','suporte circular');
  s.addText('Documentação navegável do projeto — entregue em HTML + PDF.',
    {x:.45,y:4.55,w:9.1,h:.4,fontFace:F.serif,italic:true,fontSize:15,color:C.woodMid});
  foot(s,false);
})();

/* S9 · CICLO — fluxo gigante + 1 frase */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  kick(s,'economia circular · ciclo de vida',.45,.36,C.bamboo);
  title(s,'O ciclo não termina\nna venda.',.42,.78,44,C.paper,9);
  s.addText([
    {text:'COMPROU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'USOU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'REPAROU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'DEVOLVEU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'REAPROVEITOU',options:{color:C.bamboo}}],
    {x:.45,y:2.7,w:9.2,h:.62,fontFace:F.disp,fontSize:33});
  const lab=(x,k,v)=>{ s.addText(k.toUpperCase(),{x,y:3.62,w:2.2,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:C.bamboo});
    s.addText(v,{x,y:3.88,w:2.15,h:.62,fontFace:F.sans,fontSize:10.5,color:C.mutedD,valign:'top'}); };
  lab(.45,'matéria-prima','O lote de madeira define a peça.');
  lab(2.79,'manutenção','Risco se lixa; verniz reaplica.');
  lab(5.13,'reparo','Estaca sai, estaca entra.');
  lab(7.47,'fim de vida','Devolve → triagem → reuso.');
  s.addText('“Não jogue a Beni fora.”',{x:.45,y:4.62,w:9,h:.45,fontFace:F.serif,italic:true,fontSize:19,color:C.paper});
  foot(s);
})();

/* S10 · PROCESSO — 2 fotos, 2 lições cada */
(()=>{ const s=P.addSlide(); bg(s,C.paper2); streak(s);
  kick(s,'processo produtivo · erros e acertos',.45,.36,C.woodMid);
  title(s,'O erro também é material.',.42,.72,40,C.ink,9);
  s.addImage({path:A+'v1-chair-bw.jpg',x:.45,y:1.85,w:2.1,h:2.5,sizing:{type:'cover',w:2.1,h:2.5}});
  s.addText('NÃO FECHOU',{x:.52,y:2.0,w:1.55,h:.32,fontFace:F.mono,fontSize:10.5,charSpacing:2,color:C.clay,rotate:-6,line:{color:C.clay,width:1.2},align:'center'});
  s.addText('V1 · MARCHETARIA',{x:.45,y:4.42,w:2.2,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:1,color:C.muted});
  s.addText([
    {text:'Cada pé saía diferente — precisão que o reuso não dá.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Quebrou uma parte, perdeu a peça.',options:{bullet:{code:'2022'}}}],
    {x:2.75,y:1.95,w:2.15,h:2.2,fontFace:F.sans,fontSize:12,color:C.ink70,lineSpacingMultiple:1.3,valign:'top'});
  s.addImage({path:A+'dog-chair.jpg',x:5.15,y:1.85,w:2.1,h:2.5,sizing:{type:'cover',w:2.1,h:2.5}});
  s.addText('MAIS REPARÁVEL',{x:5.2,y:2.0,w:1.8,h:.32,fontFace:F.mono,fontSize:10,charSpacing:2,color:C.moss,rotate:-6,line:{color:C.moss,width:1.2},align:'center'});
  s.addText('V2 · BAMBU',{x:5.15,y:4.42,w:2.2,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:1,color:C.muted});
  s.addText([
    {text:'Partes independentes: estaca sai, estaca entra.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Menos madeira. Mais leve.',options:{bullet:{code:'2022'}}}],
    {x:7.45,y:1.95,w:2.2,h:2.2,fontFace:F.sans,fontSize:12,color:C.ink70,lineSpacingMultiple:1.3,valign:'top'});
  s.addShape('rect',{x:.45,y:4.78,w:9.1,h:.5,fill:{color:C.ink},line:{type:'none'}});
  s.addText('TENSÕES:  USUÁRIO  ×  MATERIAL  ×  LABORATÓRIO',
    {x:.65,y:4.8,w:8.8,h:.46,fontFace:F.mono,fontSize:10,charSpacing:2,color:C.paper,valign:'middle'});
  foot(s,false);
})();

/* S11 · CINCO PROVAS — evidências de 6 palavras */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'viabilidade sistêmica',.45,.36,C.woodMid);
  title(s,'Cinco provas para\na cadeira existir.',.42,.72,40,C.ink,9.2);
  const rows=[['CLIENTE','Fica na sala sem parecer caminha.'],
    ['PET','Sobe sozinho; plataforma firme e ventilada.'],
    ['PRODUÇÃO','Cortes retos — qualquer marcenaria reproduz.'],
    ['ECOSSISTEMA','Aproveita descarte volumoso urbano.'],
    ['NEGÓCIO','A peça dura; a reposição circula.']];
  rows.forEach((r,i)=>{ const y=2.52+i*.54;
    s.addShape('rect',{x:.45,y,w:1.65,h:.44,fill:{color:C.woodMid},line:{type:'none'}});
    s.addText(r[0],{x:.45,y,w:1.65,h:.44,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.paper,align:'center',valign:'middle'});
    s.addText(r[1],{x:2.35,y:y+.02,w:7.2,h:.42,fontFace:F.sans,fontSize:14,color:C.ink70,valign:'middle'}); });
  foot(s,false);
})();

/* S12 · ENCERRAMENTO */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  slats(s,.47,.5,1.1,C.bamboo);
  s.addText([{text:'CADEIRA ',options:{color:C.paper}},{text:'BENI',options:{color:C.clay}}],
    {x:.4,y:1.8,w:9.2,h:1.6,fontFace:F.disp,fontSize:96});
  s.addText('A caminha saiu do canto. Virou mobiliário.',{x:.47,y:3.5,w:6,h:.42,fontFace:F.serif,italic:true,fontSize:19,color:C.paper});
  s.addText('OBRIGADA · PERGUNTAS?',{x:.47,y:4.12,w:4,h:.3,fontFace:F.mono,fontSize:11,charSpacing:3,color:C.bamboo});
  s.addImage({path:A+'dog-face.jpg',x:6.9,y:1.55,w:2.7,h:2.7,sizing:{type:'cover',w:2.7,h:2.7}});
  s.addText('soneca oficial',{x:6.9,y:4.3,w:2.7,h:.32,fontFace:'Permanent Marker',fontSize:13,color:C.bamboo,align:'center',rotate:-3});
  foot(s);
})();

/* S13 · APÊNDICE (não apresentado) */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'apêndice · próximo protótipo',.45,.36,C.woodMid);
  title(s,'O que ainda falta.',.42,.72,40,C.ink,7);
  const rows=[['Capa de tecido removível e lavável','EM BREVE',C.haze],
    ['Padronizar medidas P e M a partir do lote','EM DESENHO',C.muted],
    ['Protocolo de sanitização da madeira','HIPÓTESE',C.haze],
    ['Testes com mais cães, casas e semanas','PLANEJADO',C.muted],
    ['Rota de retorno da madeira (take-back)','HIPÓTESE',C.haze]];
  rows.forEach((r,i)=>{ const y=2.35+i*.5;
    s.addText(r[0],{x:.45,y,w:6.6,h:.4,fontFace:F.serif,fontSize:15,color:C.ink});
    chip(s,r[1],7.3,y+.05,r[2],1.5);
    s.addShape('rect',{x:.45,y:y+.42,w:8.35,h:.01,fill:{color:C.ink70},line:{type:'none'}}); });
  s.addText('Próxima leva sob encomenda · reposição: perna avulsa · luizambritto@gmail.com',
    {x:.45,y:4.95,w:9,h:.35,fontFace:F.mono,fontSize:9.5,charSpacing:1,color:C.muted});
})();

P.writeFile({ fileName: 'entrega/CadeiraBeni_pitch.pptx' })
  .then(()=>console.log('PPTX ok'));
