/* Cadeira Beni — Pitch (banca 02/jul) na identidade v5 do site.
   Estrutura exigida: 1) Viabilidade sistêmica (capa, problema, público,
   validação, proposta de valor) 2) Protótipo (físico + digital)
   3) Processo (ciclo/economia circular + produtivo v1→v2/tensões). */
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

function bg(s,color){ s.background = { color }; }
function streak(s, y=0, h=0.055){
  const seg=[[C.woodDark,1.6],[C.woodMid,1.8],[C.clay,1.9],[C.sun,1.4],[C.woodMid,1.7],[C.woodDark,1.6]];
  let x=0; seg.forEach(([c,w])=>{ s.addShape('rect',{x,y,w,h,fill:{color:c},line:{type:'none'}}); x+=w; });
}
function slats(s,x,y,hIn,legs=C.woodDark){ // logo "B" de ripas (SVG 66x72)
  const u=hIn/72;
  const put=(rx,ry,rw,rh,c)=>s.addShape('roundRect',{x:x+rx*u,y:y+ry*u,w:rw*u,h:rh*u,rectRadius:Math.min(rw,rh)*u*0.45,fill:{color:c},line:{type:'none'}});
  put(6,4,8,52,C.woodMid); put(14,4,30,7,C.woodMid); put(14,14,40,7,C.woodMid); put(14,24,28,7,C.woodMid);
  put(14,30,28,7,C.clay); put(14,40,42,7,C.clay); put(14,50,32,7,C.clay);
  put(10,58,7,12,legs); put(42,58,7,12,legs);
}
function kick(s,txt,x,y,color,w=8){ s.addText(txt.toUpperCase(),{x,y,w,h:.3,fontFace:F.mono,fontSize:10.5,charSpacing:4,color,align:'left'}); }
function title(s,txt,x,y,size,color,w=9,opts={}){ s.addText(txt.toUpperCase(),{x,y,w,h:size/50,fontFace:F.disp,fontSize:size,color,align:'left',lineSpacing:size*0.86,valign:'top',...opts}); }
function foot(s,dark=true){ s.addText('Luiza Britto · Design Thinking e Prototipagem · Insper · 02 jul 2026',{x:.45,y:5.26,w:9.1,h:.3,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:dark?C.mutedD:C.muted}); }
function chip(s,txt,x,y,color,w=1.35){ s.addText(txt.toUpperCase(),{x,y,w,h:.26,fontFace:F.mono,fontSize:8,charSpacing:1,color,align:'center',line:{color,width:.75}}); }

/* ---------- S1 · CAPA ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  slats(s,.45,.38,.95,C.bamboo);
  s.addText('MARCENARIA EM MADEIRA DE REUSO · PARA CÃES PEQUENOS',{x:4.4,y:.42,w:5.15,h:.25,fontFace:F.mono,fontSize:9.5,charSpacing:3,color:C.bamboo,align:'right'});
  s.addText('PROTÓTIPO V2',{x:4.4,y:.68,w:5.15,h:.25,fontFace:F.mono,fontSize:9.5,charSpacing:3,color:C.clay,align:'right'});
  s.addText([{text:'CADEIRA\n',options:{color:C.paper}},{text:'BENI',options:{color:C.clay}}],
    {x:.4,y:1.32,w:5.4,h:3.1,fontFace:F.disp,fontSize:120,lineSpacing:100,align:'left',valign:'top'});
  s.addText('A caminha saiu do canto. Virou mobiliário.',{x:.47,y:4.18,w:4.9,h:.4,fontFace:F.serif,italic:true,fontSize:17,color:C.paper});
  s.addText('MADEIRA REAPROVEITADA  ·  BAMBU SUBSTITUÍVEL  ·  TECIDOS EM BREVE',{x:.47,y:4.66,w:5.1,h:.3,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.bamboo});
  s.addImage({path:A+'product-hero.png',x:5.45,y:1.05,w:4.3,h:4.3*830/920});
  foot(s);
})();

/* ---------- S2 · PROBLEMA SISTÊMICO ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'1 · viabilidade sistêmica — o problema',.45,.34,C.woodMid);
  title(s,'O pet ficou definitivo.\nO produto pet, não.',.42,.66,40,C.ink,9.2);
  const col=(x,h,items,hc)=>{ s.addText(h.toUpperCase(),{x,y:2.14,w:4.3,h:.3,fontFace:F.mono,fontSize:10,charSpacing:3,color:hc});
    s.addText(items.map(t=>({text:t,options:{bullet:{code:'2022'},breakLine:true}})),
      {x,y:2.46,w:4.35,h:1.9,fontFace:F.sans,fontSize:12.5,color:C.ink70,lineSpacingMultiple:1.18,valign:'top'}); };
  col(.45,'Pela ótica do cliente',[
    'A caminha de espuma deforma, não aguenta lavagem e vai inteira pro lixo.',
    'Esteticamente, é um objeto que a casa esconde no canto.',
    'Sem reparo possível: estragou uma parte, perdeu tudo.'],C.clay);
  col(5.2,'Pela ótica do ecossistema',[
    'Madeira urbana de boa qualidade vira descarte volumoso, sem rota de reuso.',
    'O padrão do setor é espuma + plástico virgem, sem peça de reposição.',
    'Fim de vida não é pensado no design — é problema do aterro.'],C.moss);
  s.addShape('rect',{x:.45,y:4.52,w:9.1,h:.62,fill:{color:C.ink},line:{type:'none'}});
  s.addText('MERCADO PET BR: 2º MAIOR DO MUNDO, ~R$ 76 BI/ANO   ·   PETS DESCANSAM 12–16 H/DIA   ·   CAMINHAS DURAM EM MÉDIA 12–24 MESES',
    {x:.65,y:4.55,w:8.75,h:.56,fontFace:F.mono,fontSize:9.5,charSpacing:1,color:C.paper,valign:'middle'});
  foot(s,false);
})();

/* ---------- S3 · PÚBLICO-ALVO ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper2); streak(s);
  kick(s,'1 · viabilidade — público-alvo',.45,.34,C.woodMid);
  title(s,'Para casas onde\no pet também mora.',.42,.66,40,C.ink,6);
  s.addText('PERSONA',{x:.47,y:2.2,w:3,h:.26,fontFace:F.mono,fontSize:10,charSpacing:3,color:C.clay});
  s.addText('Tutor urbano consciente',{x:.45,y:2.48,w:5.6,h:.4,fontFace:F.sans,bold:true,fontSize:17,color:C.ink});
  s.addText('28–50 anos · capitais · apartamento · cão pequeno',{x:.45,y:2.86,w:5.6,h:.3,fontFace:F.mono,fontSize:10,charSpacing:1,color:C.muted});
  s.addText([
    {text:'Valoriza peça com história — pátina é narrativa, não defeito.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Quer um móvel que fica na sala, não um acessório que se esconde.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Paga por durabilidade, origem do material e reparo possível.',options:{bullet:{code:'2022'}}}],
    {x:.45,y:3.22,w:5.5,h:1.15,fontFace:F.sans,fontSize:12.5,color:C.ink70,lineSpacingMultiple:1.2});
  s.addText('TAMBÉM ALCANÇA',{x:.47,y:4.45,w:3,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:3,color:C.moss});
  s.addText('Arquitetos e designers de interiores  ·  lojas e curadorias de design  ·  economia circular urbana (ecopontos, cooperativas)',
    {x:.45,y:4.72,w:5.5,h:.5,fontFace:F.sans,fontSize:11,color:C.ink70});
  s.addImage({path:A+'dog-look.jpg',x:6.35,y:1.55,w:3.25,h:3.25});
  s.addShape('rect',{x:6.35,y:1.55,w:3.25,h:3.25,fill:{color:'FFFFFF',transparency:100},line:{color:C.ink,width:1}});
  s.addText('EM USO · CACHORRO DE VERDADE',{x:6.35,y:4.86,w:3.25,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:C.muted,align:'center'});
  foot(s,false);
})();

/* ---------- S4 · VALIDAÇÃO ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  kick(s,'1 · viabilidade — validação em campo',.45,.34,C.bamboo);
  title(s,'6 conversas.\n3 frases de ouro.',.42,.66,40,C.paper,7);
  s.addText('TUTORES · MARCENEIROS · VETERINÁRIO · CATADORES',{x:.47,y:2.02,w:8,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.mutedD});
  const q=(y,quote,who,dec)=>{
    s.addShape('rect',{x:.47,y:y+.06,w:.035,h:.78,fill:{color:C.clay},line:{type:'none'}});
    s.addText('“'+quote+'”',{x:.62,y,w:5.4,h:.62,fontFace:F.serif,italic:true,fontSize:16.5,color:C.paper,valign:'top'});
    s.addText(who.toUpperCase(),{x:.62,y:y+.56,w:5.2,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:C.bamboo});
    s.addText('→  '+dec,{x:6.15,y:y+.06,w:3.5,h:.8,fontFace:F.sans,fontSize:10.5,color:C.mutedD,valign:'top'}); };
  s.addText('O QUE VIROU DECISÃO',{x:6.15,y:2.02,w:3.5,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.bamboo});
  q(2.42,'Se parecer móvel, eu deixo na sala.','Tutora','Linguagem de cadeira, não de caminha: madeira, proporção baixa, presença de móvel.');
  q(3.34,'Lavável não é diferencial. É requisito.','Síntese das entrevistas','Capa removível e lavável entrou como requisito — em desenho para a próxima leva.');
  q(4.26,'Madeira reaproveitada precisa vir com cuidado.','Marceneiro · Veterinário','Triagem do lote + protocolo de sanitização no roadmap do protótipo.');
  foot(s);
})();

/* ---------- S5 · PROPOSTA DE VALOR ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'1 · viabilidade — proposta de valor sistêmica',.45,.34,C.woodMid);
  title(s,'Não é caminha descartável.\nÉ mobiliário reparável.',.42,.66,38,C.ink,9.2);
  const rowY=[2.32,2.92,3.52,4.12];
  const rows=[
    ['Espuma + plástico virgem','Madeira que já existia + bambu'],
    ['Estragou uma parte, joga tudo fora','Troca por componente: perna, acabamento'],
    ['Objeto escondido no canto','Presença de móvel — fica na sala'],
    ['12–24 meses e aterro','Feita pra durar, reparar e voltar ao ciclo']];
  s.addText('CAMINHA CONVENCIONAL',{x:.45,y:2.02,w:4,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.muted});
  s.addText('CADEIRA BENI',{x:4.75,y:2.02,w:3,h:.26,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.clay});
  rows.forEach((r,i)=>{ const y=rowY[i];
    s.addShape('rect',{x:.45,y:y-.09,w:7.2,h:.011,fill:{color:C.ink70},line:{type:'none'}});
    s.addText(r[0],{x:.45,y,w:3.9,h:.5,fontFace:F.sans,fontSize:11.5,color:C.muted,valign:'top'});
    s.addText(r[1],{x:4.75,y,w:2.95,h:.5,fontFace:F.sans,bold:true,fontSize:11.5,color:C.ink,valign:'top'});
  });
  chip(s,'tecidos — em breve',4.75,4.72,C.haze,1.6);
  s.addImage({path:A+'product-hero.png',x:7.85,y:2.2,w:2.0,h:2.0*830/920});
  s.addText('cada peça muda com o lote de madeira',{x:7.7,y:4.15,w:2.3,h:.5,fontFace:F.serif,italic:true,fontSize:11,color:C.woodMid,align:'center'});
  foot(s,false);
})();

/* ---------- S6 · PROTÓTIPO FÍSICO ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  kick(s,'2 · protótipo físico — demonstração ao vivo',.45,.34,C.bamboo);
  title(s,'A cadeira,\npor partes.',.42,.66,42,C.paper,4.5);
  s.addImage({path:A+'product-hero.png',x:.5,y:2.15,w:3.7,h:3.7*830/920});
  const call=(y,k,v,st,stc)=>{ s.addText(k.toUpperCase(),{x:4.6,y,w:5,h:.22,fontFace:F.mono,fontSize:9,charSpacing:2,color:C.bamboo});
    s.addText(v,{x:4.6,y:y+.21,w:4.5,h:.3,fontFace:F.sans,bold:true,fontSize:12.5,color:C.paper});
    chip(s,st,9.02,y+.06,stc,.85);
    s.addShape('rect',{x:4.6,y:y-.075,w:5.28,h:.009,fill:{color:'4A4438'},line:{type:'none'}}); };
  call(1.62,'estrutura','Madeira maciça reaproveitada','ok',C.bamboo);
  call(2.34,'pernas','Bambu substituível — 4 estacas','v2',C.clay);
  call(3.06,'fixação','Encaixe cavilhado, sem cola estrutural','ok',C.bamboo);
  call(3.78,'acabamento','Verniz + vinil: resiste a unha, xixi e mordida','ok',C.bamboo);
  call(4.5,'assento','Tecidos — capa removível e lavável','breve',C.haze);
  foot(s);
})();

/* ---------- S7 · TESTE EM USO REAL ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.ink);
  s.addImage({path:A+'uso-home.jpg',x:0,y:0,w:6.55,h:5.625,sizing:{type:'cover',w:6.55,h:5.625}});
  s.addShape('rect',{x:6.05,y:0,w:.5,h:5.625,fill:{color:C.ink,transparency:35},line:{type:'none'}});
  kick(s,'2 · protótipo físico — teste em uso real',6.75,.5,C.bamboo,3.1);
  title(s,'Na sala,\ncom cachorro.',6.72,.86,38,C.paper,3.2);
  s.addText([
    {text:'Subiu sozinho no primeiro dia — altura pensada pra cão pequeno.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Aguentou pata, peso e soneca comprida.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Ficou na sala. Não no canto.',options:{bullet:{code:'2022'}}}],
    {x:6.75,y:2.6,w:3,h:1.7,fontFace:F.sans,fontSize:12,color:C.paper,lineSpacingMultiple:1.35});
  s.addText('teste nº 1 · aprovado',{x:6.75,y:4.5,w:2.4,h:.35,fontFace:'Permanent Marker',fontSize:14,color:C.bamboo,rotate:-4});
  foot(s);
})();

/* ---------- S8 · PROTÓTIPO DIGITAL ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'2 · protótipo digital — documentação navegável',.45,.34,C.woodMid);
  title(s,'Do objeto ao sistema.',.42,.66,40,C.ink,9);
  const shot=(x,f,cap)=>{ s.addImage({path:'entrega/shots/'+f,x,y:1.78,w:2.95,h:2.95*860/1280});
    s.addShape('rect',{x,y:1.78,w:2.95,h:2.95*860/1280,fill:{color:'FFFFFF',transparency:100},line:{color:C.ink,width:1}});
    s.addText(cap.toUpperCase(),{x,y:3.82,w:2.95,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:C.muted,align:'center'}); };
  shot(.45,'site-hero.jpg','capa · a peça');
  shot(3.55,'site-prancha.jpg','prancha técnica');
  shot(6.65,'site-suporte.jpg','suporte circular');
  s.addText('Site-documentação com a história do projeto: peça, materiais, processo V1→V2, teste na casa, ciclo e suporte circular. Entregue em HTML + PDF junto com estes slides.',
    {x:.45,y:4.35,w:9.1,h:.6,fontFace:F.sans,fontSize:12,color:C.ink70});
  foot(s,false);
})();

/* ---------- S9 · CICLO DE VIDA ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  kick(s,'3 · processo sistêmico — economia circular',.45,.34,C.bamboo);
  title(s,'O ciclo não termina na venda.',.42,.66,36,C.paper,9.2);
  s.addText([
    {text:'COMPROU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'USOU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'REPAROU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'DEVOLVEU',options:{color:C.paper}},{text:'  →  ',options:{color:C.clay}},
    {text:'REAPROVEITOU',options:{color:C.bamboo}}],
    {x:.45,y:1.72,w:9.2,h:.55,fontFace:F.disp,fontSize:29,align:'left'});
  const card=(x,k,v,st,stc)=>{ s.addShape('rect',{x,y:2.62,w:2.22,h:1.78,fill:{color:'1A1712'},line:{color:'4A4438',width:.75,dashType:st==='evolução'?'dash':'solid'}});
    s.addText(k.toUpperCase(),{x:x+.12,y:2.74,w:2,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:2,color:stc});
    s.addText(v,{x:x+.12,y:3.0,w:2,h:1.1,fontFace:F.sans,fontSize:10,color:C.mutedD,valign:'top'});
    s.addText(st.toUpperCase(),{x:x+.12,y:4.08,w:2,h:.22,fontFace:F.mono,fontSize:7.5,charSpacing:1,color:stc}); };
  card(.45,'matéria-prima','Madeira de reuso como intenção de design: o lote define a peça.','protótipo',C.bamboo);
  card(2.79,'manutenção','Risco e marca se lixa; acabamento reaplicável. Capa lavável em desenho.','protótipo',C.bamboo);
  card(5.13,'reparo','A estaca de bambu sai uma, entra outra — sem desmontar o resto.','protótipo',C.bamboo);
  card(7.47,'fim de vida','Devolve → triagem: reuso, novos produtos, protótipos ou descarte responsável.','evolução',C.haze);
  s.addText('“Não jogue a Beni fora.”  —  suporte circular: troca, reparo e devolução orientados pós-venda.',
    {x:.45,y:4.68,w:9.1,h:.4,fontFace:F.serif,italic:true,fontSize:14,color:C.paper});
  foot(s);
})();

/* ---------- S10 · PROCESSO PRODUTIVO ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper2); streak(s);
  kick(s,'3 · processo produtivo — erros e acertos',.45,.34,C.woodMid);
  title(s,'O erro também é material.',.42,.66,36,C.ink,9);
  s.addImage({path:A+'v1-chair-bw.jpg',x:.45,y:1.7,w:2.3,h:2.3*1280/960*0.72,sizing:{type:'cover',w:2.3,h:2.2}});
  s.addText('NÃO FECHOU',{x:.55,y:1.86,w:1.6,h:.34,fontFace:F.mono,fontSize:11,charSpacing:2,color:C.clay,rotate:-6,line:{color:C.clay,width:1.2},align:'center'});
  s.addText('V1 · PÉS E BRAÇOS EM MARCHETARIA',{x:.45,y:4.0,w:2.5,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:1,color:C.muted});
  s.addText([
    {text:'Densidade variável: cada pé saía diferente.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Exigia precisão que a madeira de reuso não dá.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Estética colada: quebrou uma parte, perdeu a peça. E ficou pesada.',options:{bullet:{code:'2022'}}}],
    {x:2.95,y:1.78,w:3.1,h:2.4,fontFace:F.sans,fontSize:11,color:C.ink70,lineSpacingMultiple:1.25,valign:'top'});
  s.addImage({path:A+'dog-chair.jpg',x:6.35,y:1.7,w:2.2,h:2.2,sizing:{type:'cover',w:2.2,h:2.2}});
  s.addText('MAIS REPARÁVEL',{x:6.45,y:1.86,w:1.9,h:.34,fontFace:F.mono,fontSize:11,charSpacing:2,color:C.moss,rotate:-6,line:{color:C.moss,width:1.2},align:'center'});
  s.addText('V2 · ESTACAS DE BAMBU',{x:6.35,y:4.0,w:2.5,h:.24,fontFace:F.mono,fontSize:8.5,charSpacing:1,color:C.muted});
  s.addText([
    {text:'Estrutura e pernas viraram partes independentes.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Estaca padronizada: sai uma, entra outra.',options:{bullet:{code:'2022'},breakLine:true}},
    {text:'Menos madeira na base — mais leve de mover e limpar.',options:{bullet:{code:'2022'}}}],
    {x:8.7,y:1.78,w:1.25,h:2.6,fontFace:F.sans,fontSize:9.5,color:C.ink70,lineSpacingMultiple:1.2,valign:'top'});
  s.addShape('rect',{x:.45,y:4.55,w:9.1,h:.56,fill:{color:C.ink},line:{type:'none'}});
  s.addText('TENSÕES:   USUÁRIO (conforto + altura + higiene)   ×   MATERIAL (variação do reuso)   ×   LABORATÓRIO (tempo e ferramentas)',
    {x:.65,y:4.58,w:8.8,h:.5,fontFace:F.mono,fontSize:9,charSpacing:1,color:C.paper,valign:'middle'});
  foot(s,false);
})();

/* ---------- S11 · CINCO PROVAS ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'viabilidade sistêmica — síntese',.45,.34,C.woodMid);
  title(s,'Cinco provas para a cadeira existir.',.42,.66,34,C.ink,9.2);
  const rows=[
    ['CLIENTE','Cabe na sala sem parecer caminha — linguagem de móvel, presença discreta.'],
    ['PET','Altura baixa pra subir sozinho; plataforma firme e ventilada.'],
    ['PRODUÇÃO','Cortes retos e encaixes simples — marcenaria de baixa complexidade reproduz.'],
    ['ECOSSISTEMA','Aproveita sobras rígidas que virariam descarte volumoso urbano.'],
    ['NEGÓCIO','A peça dura; a reposição circula — perna vendida como componente.']];
  rows.forEach((r,i)=>{ const y=1.78+i*.68;
    s.addShape('rect',{x:.45,y,w:1.7,h:.56,fill:{color:C.woodMid},line:{type:'none'}});
    s.addText(r[0],{x:.45,y,w:1.7,h:.56,fontFace:F.mono,fontSize:9.5,charSpacing:2,color:C.paper,align:'center',valign:'middle'});
    s.addText(r[1],{x:2.35,y:y+.03,w:7.2,h:.55,fontFace:F.sans,fontSize:12.5,color:C.ink70,valign:'middle'});
    s.addShape('rect',{x:2.35,y:y+.56,w:7.2,h:.01,fill:{color:C.ink70},line:{type:'none'}});
  });
  foot(s,false);
})();

/* ---------- S12 · ENCERRAMENTO ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.ink); streak(s);
  slats(s,.47,.5,1.1,C.bamboo);
  s.addText([{text:'CADEIRA ',options:{color:C.paper}},{text:'BENI',options:{color:C.clay}}],
    {x:.4,y:1.75,w:9.2,h:1.6,fontFace:F.disp,fontSize:96,align:'left'});
  s.addText('A caminha saiu do canto. Virou mobiliário.',{x:.47,y:3.42,w:6,h:.42,fontFace:F.serif,italic:true,fontSize:19,color:C.paper});
  s.addText('OBRIGADA · PERGUNTAS?',{x:.47,y:4.05,w:4,h:.3,fontFace:F.mono,fontSize:11,charSpacing:3,color:C.bamboo});
  s.addText('Documentação digital entregue em HTML + PDF · luizambritto@gmail.com',{x:.47,y:4.4,w:6,h:.3,fontFace:F.mono,fontSize:9.5,charSpacing:1,color:C.mutedD});
  s.addImage({path:A+'dog-face.jpg',x:6.9,y:1.55,w:2.7,h:2.7,sizing:{type:'cover',w:2.7,h:2.7}});
  s.addText('soneca oficial',{x:6.9,y:4.3,w:2.7,h:.32,fontFace:'Permanent Marker',fontSize:13,color:C.bamboo,align:'center',rotate:-3});
  foot(s);
})();

/* ---------- S13 · APÊNDICE ---------- */
(()=>{ const s=P.addSlide(); bg(s,C.paper); streak(s);
  kick(s,'apêndice — o que ainda falta (honesto)',.45,.34,C.woodMid);
  title(s,'Próximo protótipo.',.42,.66,36,C.ink,7);
  const rows=[
    ['Capa de tecido removível e lavável','EM BREVE',C.haze],
    ['Padronizar medidas P e M a partir do lote','EM DESENHO',C.muted],
    ['Protocolo de sanitização da madeira','HIPÓTESE',C.haze],
    ['Testes com mais cães, casas e semanas de uso','PLANEJADO',C.muted],
    ['Rota de retorno da madeira (take-back)','HIPÓTESE',C.haze]];
  rows.forEach((r,i)=>{ const y=1.8+i*.52;
    s.addText(r[0],{x:.45,y,w:6.6,h:.4,fontFace:F.serif,fontSize:14.5,color:C.ink});
    chip(s,r[1],7.3,y+.04,r[2],1.5);
    s.addShape('rect',{x:.45,y:y+.42,w:8.35,h:.01,fill:{color:C.ink70},line:{type:'none'}}); });
  s.addText('Próxima leva sob encomenda: cada peça muda conforme a madeira disponível. Reposição: perna de bambu avulsa.',
    {x:.45,y:4.55,w:9,h:.5,fontFace:F.sans,fontSize:11.5,color:C.ink70});
  foot(s,false);
})();

P.writeFile({ fileName: 'entrega/CadeiraBeni_pitch.pptx' })
  .then(()=>console.log('PPTX ok: entrega/CadeiraBeni_pitch.pptx'));
