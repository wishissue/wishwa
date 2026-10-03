window.ICN=function(){try{window.lucide&&lucide.createIcons()}catch(e){}};

let W=1280,H=720;const $=s=>document.querySelector(s);let S={o:[],bg:{c:'#0a0a0a',c2:'#4a0a12',g:1,a:135}},sel=null,zoom=1,snap=true,hist=[],fut=[],tab='templates',uid=1,asset={cat:'All',q:'',items:[],pg:0,tk:0},tool={},cropId=null;
const FONTS=['Inter','Bebas Neue','Anton','Pacifico','Montserrat','Oswald','Bangers','Permanent Marker','Orbitron','Playfair Display','Lobster','Righteous','Georgia','Courier New'];
const ic=n=>`<i data-lucide="${n}"></i>`;
const tplGet=()=>{try{return JSON.parse(localStorage.getItem('ws_tpl')||'[]')}catch(e){return[]}};
const TABS=[['templates','layout-template','Templates'],['elements','shapes','Elements'],['assets','search','Assets'],['text','type','Text'],['uploads','upload','Uploads'],['background','image','Backdrop'],['effects','sparkles','Effects'],['brand','palette','Brand'],['layers','layers','Layers']];
const sv=()=>JSON.stringify(S);
function push(){hist.push(hsv());if(hist.length>80)hist.shift();fut=[];sched()}
function undo(){if(hist.length>1){fut.push(hist.pop());S=hpar(hist[hist.length-1]);sel=null;ms=[];cropId=null;all()}}
function redo(){if(fut.length){const s=fut.pop();hist.push(s);S=hpar(s);sel=null;ms=[];cropId=null;all()}}
const get=()=>S.o.find(o=>o.id===sel);
function add(o){o=Object.assign({id:uid++,x:440,y:230,w:400,h:260,r:0,o:1,rad:0,fill:'#e11d2e',c2:'#ff3b47',g:0,stops:null,stroke:'#ffffff',sw:0,fx:'',f:{},fl:1,fv:1,cz:1,cx:0,cy:0,fit:'cover',name:o.t},o);S.o.push(o);sel=o.id;push();all();return o}
function grad(o){const st=o.stops||[[0,o.fill],[1,o.c2]];return `linear-gradient(${o.a||135}deg,${st.map(s=>s[1]+' '+s[0]*100+'%').join(',')})`}
function filt(f){f=f||{};return `brightness(${f.b??1}) contrast(${f.c??1}) saturate(${f.s??1}) hue-rotate(${f.h??0}deg) blur(${f.bl??0}px) grayscale(${f.gr??0}) sepia(${f.se??0}) invert(${f.inv??0})`}
function render(){const cv=$('#cv');cv.style.background=S.bg.g?`linear-gradient(${S.bg.a}deg,${S.bg.c},${S.bg.c2})`:S.bg.c;cv.innerHTML='';
S.o.forEach(o=>{if(o.hide)return;const e=document.createElement('div');e.className='o';e.dataset.id=o.id;
Object.assign(e.style,{left:o.x+'px',top:o.y+'px',width:o.w+'px',height:o.h+'px',opacity:o.o,transform:`rotate(${o.r}deg) scale(${o.t=='img'?1:(o.fl||1)},${o.t=='img'?1:(o.fv||1)})`,filter:(filt(o.f)+' '+fxf(o)).trim(),borderRadius:o.rad+'px',cursor:o.lock?'default':'move'});
const bg=o.fx=='metal'?MET:o.g?grad(o):o.fill;
if(o.t=='text'){Object.assign(e.style,{font:`${o.fw} ${o.fs}px/${o.lh} '${o.font}'`,letterSpacing:o.ls+'px',textAlign:o.al,color:o.fill,display:'flex',alignItems:'center',justifyContent:o.al=='left'?'flex-start':o.al=='right'?'flex-end':'center',whiteSpace:'pre-wrap'});
e.style.fontFamily=`'${o.font}'`;if(o.g||o.fx=='metal'){e.style.background=bg;e.style.webkitBackgroundClip='text';e.style.color='transparent'}
if(o.sw)e.style.webkitTextStroke=o.sw+'px '+o.stroke;e.style.textShadow=tshadow(o);if(o.fx=='glass'){e.style.color='rgba(255,255,255,.28)';e.style.webkitTextStroke='1.5px rgba(255,255,255,.75)';e.style.textShadow='0 8px 24px rgba(0,0,0,.4)'}e.textContent=o.txt;}
else if(o.t=='img'){if(!o.iw){const t=new Image();t.onload=()=>{o.iw=t.width||1;o.ih=t.height||1;render()};t.src=o.src;e.style.background='rgba(255,255,255,.05)'}else{e.style.overflow='hidden';const i=document.createElement('img'),g=igeo(o);i.src=o.src;i.draggable=false;i.style.cssText=`position:absolute;left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px;max-width:none;transform:scale(${o.fl||1},${o.fv||1})`;e.appendChild(i)}e.style.filter+=' '+imgfx(o);if(o.sw){e.style.outline=o.sw+'px solid '+o.stroke;e.style.outlineOffset=-o.sw+'px'}}
else{e.style.background=(o.t=='glass'||o.fx=='glass')?'linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.05))':bg;if(o.t=='glass'||o.fx=='glass'){e.style.backdropFilter='blur(14px)';e.style.border='1px solid rgba(255,255,255,.4)'}
if(o.t=='ellipse')e.style.borderRadius='50%';if(o.t=='poly')e.style.clipPath=o.cp;if(o.t=='line'){e.style.height=(o.sw||6)+'px'}else if(o.sw&&o.t!='poly')e.style.border=o.sw+'px solid '+o.stroke;e.style.boxShadow=shadow(o);}
if(o.fx=='scan'){const t=Math.max(2,Math.round(3*fi(o)));e.style.webkitMaskImage=e.style.maskImage=`repeating-linear-gradient(0deg,#000 0 ${t}px,transparent ${t}px ${2*t}px)`}if(o.fx=='grain'){e.style.webkitMaskImage=e.style.maskImage=GRAIN;e.style.webkitMaskSize=e.style.maskSize='200px'}e.onpointerdown=ev=>{ev.preventDefault();const a=document.activeElement;if(a&&a!==document.body)a.blur();down(ev,o)};e.oncontextmenu=ev=>ctx(ev,o);cv.appendChild(e)});
updDefs();box()}
function setZ(z){zoom=Math.max(.15,Math.min(3,z));$('#cv').style.transform=`scale(${zoom})`;$('#sz').style.cssText=`width:${W*zoom}px;height:${H*zoom}px`;$('#zl').textContent=Math.round(zoom*100)+'%';box()}
function fit(){const r=$('#ws').getBoundingClientRect();setZ(Math.min((r.width-128)/W,(r.height-160)/H))}
function pt(ev){const r=$('#cv').getBoundingClientRect();return[(ev.clientX-r.left)/zoom,(ev.clientY-r.top)/zoom]}
function drag(ev,fn,done){const mv=e=>fn(e),up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);done&&done()};addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up)}
$('#cv').onpointerdown=e=>{if(e.target.id=='cv'){sel=null;panels();box()}};
addEventListener('click',()=>$('#cm').style.display='none');
/* inputs */
function sl(k,l,min,max,st,tgt,sc=1){const o=get(),t=tgt(o);return `<label class="r">${l}<input type="range" min="${min}" max="${max}" step="${st}" value="${(t[k]??(k=='b'||k=='c'||k=='s'?1:0))}" data-k="${k}" data-sc="${sc}"><span>${(t[k]??(k=='b'||k=='c'||k=='s'?1:0))}</span></label>`}
function bindSl(root,tgt){root.querySelectorAll('input[type=range][data-k]').forEach(i=>{i.oninput=()=>{const o=get();tgt(o)[i.dataset.k]=+i.value;i.nextElementSibling.textContent=i.value;render()};i.onchange=()=>push()})}
function seg(arr,cur,a){return `<div class="seg">${arr.map(v=>`<button class="b ${v[0]==cur?'on':''}" data-${a}="${v[0]}">${v[1]||v[0]}</button>`).join('')}</div>`}
const IMGP={Original:{},Vivid:{s:1.5,c:1.15},Dark:{b:.6,c:1.2},Cold:{h:190,s:1.1},Warm:{se:.4,s:1.3,b:1.05},Noir:{gr:1,c:1.5,b:.8},'B&W':{gr:1},Cyber:{h:270,s:1.8,c:1.2},Horror:{b:.55,c:1.5,s:.5,se:.5},Dream:{b:1.1,s:1.3,bl:1.5,h:-20}};
function rp(){const o=get(),p=$('#rp');
if(!o){p.innerHTML=`<h4>${ic('settings')} Document</h4><label class="r">Size<b>${W}×${H}</b><span></span></label><label class="r">Layers<b>${S.o.length}</b><span></span></label><h4 style="margin-top:14px">Quick actions</h4><div class="g2"><button class="b" data-q="fit">${ic('maximize')}Fit</button><button class="b" data-q="snap">${ic('magnet')}Snap</button><button class="b" data-q="clear">${ic('eraser')}Clear</button><button class="b" data-q="up">${ic('upload')}Upload</button></div><p style="color:var(--mu)">Shortcuts: Ctrl/Cmd+K command palette · Ctrl+Z/Y undo/redo · Ctrl+D duplicate · Ctrl+C/V copy/paste (also images) · Ctrl+A select all · Shift-click multi-select · Del delete · arrows nudge · Ctrl+scroll zoom · right-click for menu.</p>`;
p.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const q=b.dataset.q;if(q=='fit')fit();if(q=='snap')$('#sn').click();if(q=='clear'){S.o=[];push();all()}if(q=='up')$('#fi').click()});ICN();return}
let h=`<h4>${ic('sliders-horizontal')} ${o.t}</h4>`;
h+=`<div class="g2"><label class="r" style="grid-template-columns:14px 1fr">X<input type="text" data-p="x" value="${o.x}"></label><label class="r" style="grid-template-columns:14px 1fr">Y<input type="text" data-p="y" value="${o.y}"></label><label class="r" style="grid-template-columns:14px 1fr">W<input type="text" data-p="w" value="${o.w}"></label><label class="r" style="grid-template-columns:14px 1fr">H<input type="text" data-p="h" value="${o.h}"></label></div>`;
h+=`<label class="r">${ic('rotate-cw')}Rotate<input type="range" min="-180" max="180" value="${o.r}" data-p="r"><span>${o.r}</span></label><label class="r">${ic('blend')}Opacity<input type="range" min="0" max="1" step=".01" value="${o.o}" data-p="o"><span>${o.o}</span></label>`;
if(o.t!='text'&&o.t!='line')h+=`<label class="r">${ic('square')}Radius<input type="range" min="0" max="400" value="${o.rad}" data-p="rad"><span>${o.rad}</span></label>`;
if(o.t=='text'){h+=`<h4>${ic('type')} Type</h4><textarea data-p="txt" rows="3">${esc(o.txt)}</textarea><br><br><select data-p="font">${FONTS.map(f=>`<option ${f==o.font?'selected':''}>${f}</option>`).join('')}</select>`+seg([['left',ic('align-left')],['center',ic('align-center')],['right',ic('align-right')]],o.al,'al')+`<label class="r">Size<input type="range" min="8" max="400" value="${o.fs}" data-p="fs"><span>${o.fs}</span></label><label class="r">Weight<input type="range" min="300" max="900" step="100" value="${o.fw}" data-p="fw"><span>${o.fw}</span></label><label class="r">Spacing<input type="range" min="-5" max="40" value="${o.ls}" data-p="ls"><span>${o.ls}</span></label><label class="r">Line<input type="range" min=".7" max="2" step=".05" value="${o.lh}" data-p="lh"><span>${o.lh}</span></label>`}
h+=o.t=='img'?`<h4 style="margin-top:10px">${ic('square')} Border</h4><div style="display:flex;gap:6px;align-items:center"><input type="color" data-p="stroke" value="${o.stroke}" data-t="Border color"><span style="color:var(--mu)">border color</span></div>`:`<h4 style="margin-top:10px">${ic('palette')} Fill</h4><div style="display:flex;gap:6px;align-items:center"><input type="color" data-p="fill" value="${o.fill}"><button class="b ${o.g?'on':''}" data-gt>${ic('blend')}Gradient</button><input type="color" data-p="stroke" value="${o.stroke}" data-t="Stroke color"><span style="color:var(--mu)">stroke</span></div>`;
if(o.g){const st=o.stops||[[0,o.fill],[1,o.c2]];h+=`<div id="ge" style="background:linear-gradient(90deg,${st.map(s=>s[1]+' '+s[0]*100+'%').join(',')})">${st.map((s,i)=>`<div class="stop" data-i="${i}" style="left:${s[0]*100}%;background:${s[1]}"></div>`).join('')}</div><div style="display:flex;gap:5px"><input type="color" data-sc value="${st[st.length-1][1]}"><button class="b" data-as>${ic('plus')}Stop</button></div><label class="r">Angle<input type="range" min="0" max="360" value="${o.a||135}" data-p="a"><span>${o.a||135}</span></label>`}
h+=`<label class="r">Border<input type="range" min="0" max="30" value="${o.sw}" data-p="sw"><span>${o.sw}</span></label>`;
if(o.t=='img'){const pr=Object.keys(IMGP).find(k=>JSON.stringify(IMGP[k])==JSON.stringify(o.f||{}))||'',rs=(k,l,a,b,st,d)=>`<label class="r">${l}<input type="range" min="${a}" max="${b}" step="${st}" value="${o[k]??d}" data-p="${k}"><span>${o[k]??d}</span></label>`;h+=`<button class="b" data-im="replace" style="width:100%;justify-content:center;margin-bottom:8px">${ic('image-up')}Replace image</button><h4>${ic('crop')} Crop & Position</h4><div class="seg"><button class="b ${cropId==o.id?'on':''}" data-im="crop">${ic('crop')}Crop</button><button class="b ${o.fit!='contain'?'on':''}" data-im="fill">${ic('maximize')}Fill</button><button class="b ${o.fit=='contain'?'on':''}" data-im="fit">${ic('minimize')}Fit</button><button class="b" data-im="reset">${ic('rotate-ccw')}Reset</button></div>`+rs('cz','Zoom',.5,4,.01,1)+rs('cx','Pos X',-1,1,.01,0)+rs('cy','Pos Y',-1,1,.01,0)+`<div class="seg"><button class="b" data-im="fh">${ic('flip-horizontal-2')}Flip H</button><button class="b" data-im="fv">${ic('flip-vertical-2')}Flip V</button><button class="b" data-im="r90">${ic('rotate-cw')}90°</button></div><h4>${ic('wand-sparkles')} Filters</h4>`+seg(Object.keys(IMGP).map(k=>[k]),pr,'ip')+['b|Brightness|0|2|.05','c|Contrast|0|2|.05','s|Saturate|0|3|.05','h|Hue|-180|180|1','bl|Blur|0|20|.5','gr|Gray|0|1|.05','se|Sepia|0|1|.05','inv|Invert|0|1|.05'].map(s=>{const[k,l,a,b,c]=s.split('|');return sl(k,l,a,b,c,o=>o.f)}).join('')+`<button class="b" data-bsave style="margin-top:6px">${ic('bookmark-plus')}Save to Brand</button>`+(o.credit?`<p class="mu" style="font-size:10px;margin:8px 0 0">${ic('info')} <a style="color:#ff6b74" href="${esc(o.link||'#')}" target="_blank" rel="noopener noreferrer">${esc(o.credit)}</a></p>`:'')}
h+=`<h4 style="margin-top:10px">${ic('lock')} State</h4><div class="g2"><button class="b" id="r1">${ic('lock')}${o.lock?'Unlock':'Lock'}</button><button class="b" id="r2">${ic('eye-off')}Hide</button></div>`;
p.innerHTML=h;ICN();
p.querySelectorAll('[data-p]').forEach(i=>{const k=i.dataset.p,ev=i.type=='range'||i.type=='color'?'input':'change';i.addEventListener(ev,()=>{let v=i.value;if(!['txt','font','fill','stroke'].includes(k)){v=+v;if(isNaN(v))return}if(i.type=='range'&&i.nextElementSibling)i.nextElementSibling.textContent=v;o[k]=v;if(k=='fill'&&o.stops)o.stops[0][1]=v;render()});i.addEventListener('change',()=>{push();if(i.type=='text')rp()});if(i.tagName=='TEXTAREA')i.addEventListener('input',()=>{o.txt=i.value;render()})});
p.querySelectorAll('[data-al]').forEach(b=>b.onclick=()=>{o.al=b.dataset.al;push();all()});
const gt=p.querySelector('[data-gt]');if(gt)gt.onclick=()=>{o.g=o.g?0:1;push();all()};
p.querySelectorAll('[data-ip]').forEach(b=>b.onclick=()=>{o.f={...IMGP[b.dataset.ip]};push();all()});
p.querySelectorAll('[data-im]').forEach(b=>b.onclick=()=>{const a=b.dataset.im;if(a=='crop')return setCrop(o);if(a=='replace')return replaceImg(o);if(a=='fill'){o.fit='cover';o.cx=o.cy=0;o.cz=1}else if(a=='fit'){o.fit='contain';o.cx=o.cy=0;o.cz=1}else if(a=='reset'){o.fit='cover';o.cx=o.cy=0;o.cz=1;if(o.iw)o.h=Math.round(o.w*o.ih/o.iw)}else if(a=='fh')o.fl=(o.fl||1)*-1;else if(a=='fv')o.fv=(o.fv||1)*-1;else if(a=='r90')rot90(o);push();all()});const bsv=p.querySelector('[data-bsave]');if(bsv)bsv.onclick=()=>brandLogo(o.src);
bindSl(p,o=>o.f);
p.querySelector('#r1').onclick=()=>{o.lock=!o.lock;push();all()};p.querySelector('#r2').onclick=()=>{o.hide=true;sel=null;push();all()};
const sc=p.querySelector('input[type=color][data-sc]');if(sc)sc.oninput=()=>{o.stops=o.stops||[[0,o.fill],[1,o.c2]];o.stops[o.stops.length-1][1]=sc.value;o.c2=sc.value;render()},sc&&(sc.onchange=()=>{push();rp()});
const as=p.querySelector('[data-as]');if(as)as.onclick=()=>{o.stops=o.stops||[[0,o.fill],[1,o.c2]];o.stops.splice(o.stops.length-1,0,[.5,'#ffffff']);o.stops.sort((a,b)=>a[0]-b[0]);push();all()};
p.querySelectorAll('.stop').forEach(s=>s.onpointerdown=ev=>{ev.stopPropagation();ev.preventDefault();const ge=$('#ge'),i=+s.dataset.i;o.stops=o.stops||[[0,o.fill],[1,o.c2]];drag(ev,e=>{const r=ge.getBoundingClientRect();o.stops[i][0]=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));s.style.left=o.stops[i][0]*100+'%';render()},()=>{o.stops.sort((a,b)=>a[0]-b[0]);push();rp()})})}
/* left panel */
const SH={rect:{t:'rect'},rounded:{t:'rect',rad:50},circle:{t:'ellipse',w:300,h:300},glass:{t:'glass',rad:30},line:{t:'line',w:500,h:6,sw:8},triangle:{t:'poly',cp:'polygon(50% 0,100% 100%,0 100%)'},star:{t:'poly',cp:'polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)'},hex:{t:'poly',cp:'polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)'},arrow:{t:'poly',cp:'polygon(0 30%,60% 30%,60% 0,100% 50%,60% 100%,60% 70%,0 70%)'}};
/* ---- templates: every one is built from the editor's own features ---- */
const RED='#e11d2e',RED2='#ff3b47',RED3='#ff6b74',DRK='#7a0c14',INK='#0a0a0a',GRY='#8b8b90';
const PHI=(a,b,k=0)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='400' height='400' fill='url(#g)'/>${k?`<circle cx='200' cy='150' r='64' fill='#fff' opacity='.9'/><path d='M60 400Q70 260 200 250Q330 260 340 400Z' fill='#fff' opacity='.9'/>`:`<circle cx='290' cy='110' r='54' fill='#fff' opacity='.85'/><path d='M0 400V270Q90 190 170 260T400 230V400Z' fill='#000' opacity='.35'/><path d='M0 400V320Q120 250 220 310T400 290V400Z' fill='#000' opacity='.5'/>`}</svg>`);
const T_=(txt,x,y,w,h,fs,o={})=>{const n=txt.split('\n').length;return{t:'text',txt,x,y,w,h:h||Math.round(n*fs*(o.lh||1.1)+10),fs,fw:700,font:'Inter',fill:'#ffffff',al:'left',name:txt.split('\n')[0].slice(0,22),...o}};
const R_=(t,x,y,w,h,o={})=>({t,x,y,w,h,...o});
const I_=(x,y,w,h,a,b,k,o={})=>({t:'img',src:PHI(a,b,k),iw:400,ih:400,x,y,w,h,name:'Photo',...o});
const TCATS=['All','Video','Social','Promo','Business','Creative','Showcase'];
const FXS=[['neon','Neon',RED2,0],['glow','Glow',RED2,0],['hard','Hard shadow',RED,1],['long','Long shadow',RED,1],['d3','3D',RED,1],['echo','Echo',RED2,0],['hollow','Hollow',RED3,0],['splice','Splice',RED2,0],['rgb','RGB split',null,0],['chroma','Chromatic',null,0],['metal','Metallic',null,0],['box','Text box',RED,0]];
const MSK=[['Circle',{rad:9999}],['Rounded',{rad:48}],['Star',{cp:SH.star.cp}],['Hexagon',{cp:SH.hex.cp}],['Triangle',{cp:SH.triangle.cp}],['Feather',{fe:.6}],
['Duotone',{duo:[INK,RED2]}],['Vignette',{vg:.85}],['Border',{rad:24,sw:8,stroke:RED}],['Glow',{rad:24,fx:'glow',fxc:RED2}],['Corners',{rc:[90,0,90,0]}],['Noir filter',{f:{...IMGP.Noir},rad:24}]];
const TPL=[
{n:'Gaming Thumbnail',cat:'Video',w:1280,h:720,bg:{c:'#050505',c2:'#5a0a12',g:1,a:125},o:[
 R_('ellipse',700,-60,640,640,{fill:RED,c2:'#050505',g:1,a:40,o:.9,fx:'glow',name:'Glow orb'}),
 R_('rect',-100,520,1500,120,{fill:RED,c2:DRK,g:1,a:90,r:-6,name:'Stripe'}),
 R_('rect',0,0,1280,720,{fill:'#000000',o:.22,fx:'scan',name:'Scanlines'}),
 I_(800,90,380,380,RED2,'#3a0a10',1,{rad:9999,sw:10,stroke:'#ffffff',fx:'glow',fxc:RED2,name:'Streamer photo'}),
 T_('EPIC\nWIN',60,130,720,null,190,{font:'Anton',fw:400,fx:'neon',fxc:RED2,lh:.92,name:'Title'}),
 T_('SEASON 2 · EP 14',70,60,420,null,34,{fw:800,fx:'box',fill:'#ffffff',fxc:RED,ls:3,al:'center',name:'Tag'}),
 T_('NO CLICKBAIT · JUST HYPE',70,562,760,null,42,{fw:800,font:'Montserrat',name:'Subtitle'})]},
{n:'Tech Explainer',cat:'Video',w:1280,h:720,bg:{c:'#070707',c2:'#2a0a0e',g:1,a:160},o:[
 R_('ellipse',820,100,420,420,{fill:RED2,c2:RED,g:1,a:45,fx:'glow',fxi:.8,name:'Orb'}),
 R_('glass',80,90,760,540,{rad:40,name:'Glass card'}),
 T_('The Future\nIs Here',130,170,660,null,100,{fw:800,g:1,fill:'#ffffff',c2:RED3,lh:1,name:'Headline'}),
 T_('AI · ROBOTS · CHIPS',130,470,560,null,30,{ls:5,fill:RED3,name:'Topics'}),
 T_('WATCH NOW',130,535,260,null,30,{fw:800,fx:'box',fill:'#ffffff',fxc:RED,al:'center',name:'Button'}),
 T_('2026',850,215,380,null,110,{font:'Orbitron',fw:800,fx:'metal',al:'center',name:'Metallic year'}),
 R_('hex',930,470,180,180,{fill:'#ffffff',c2:RED,g:1,a:90,name:'Hex badge'}),
 T_('NEW',930,540,180,null,44,{fw:800,fill:INK,al:'center',name:'Badge text'})]},
{n:'Mystery Thumbnail',cat:'Video',w:1280,h:720,bg:{c:'#050000',c2:'#3a0000',g:1,a:180},o:[
 R_('ellipse',380,-180,520,520,{fill:'#8b0000',c2:'#050000',g:1,o:.8,name:'Blood moon'}),
 T_('I FOUND SOMETHING…',140,110,1000,null,54,{font:'Georgia',al:'center',fill:'#cfcfcf',ls:6,it:true,name:'Kicker'}),
 T_("DON'T\nLOOK",140,190,1000,null,230,{font:'Bebas Neue',fw:400,al:'center',fill:'#d10000',fx:'distort',lh:.9,name:'Title'}),
 T_('EPISODE 07 · THE BASEMENT',140,630,1000,null,34,{ls:8,al:'center',name:'Episode'}),
 R_('rect',0,0,1280,720,{fill:'#ffffff',o:.14,fx:'grain',name:'Film grain'})]},
{n:'Channel Banner',cat:'Video',w:1500,h:500,bg:{c:'#050505',c2:'#3a0a10',g:1,a:90},o:[
 R_('rect',930,-120,720,740,{fill:RED,c2:DRK,g:1,a:60,r:14,o:.9,name:'Slab'}),
 T_('CREATOR',120,110,1000,null,130,{font:'Orbitron',fw:800,fx:'metal',name:'Channel name'}),
 T_('Gaming · Tech · Tutorials',120,290,900,null,44,{fw:600,ls:6,fill:RED3,name:'Tagline'}),
 T_('NEW VIDEOS EVERY WEEK',120,370,520,null,30,{fw:800,fx:'box',fill:'#ffffff',fxc:RED,al:'center',name:'Schedule'}),
 R_('ellipse',1060,90,320,320,{fill:'#ffffff',c2:RED3,g:1,a:135,fx:'soft',name:'Logo circle'}),
 T_('C',1060,90,320,320,200,{font:'Anton',fw:400,al:'center',fill:INK,name:'Logo mark'})]},
{n:'Quote Card',cat:'Social',w:1080,h:1080,bg:{c:'#0a0a0a',c2:'#1d0608',g:1,a:160},o:[
 R_('ellipse',700,700,620,620,{fill:RED,c2:'#0a0a0a',g:1,a:45,o:.55,name:'Corner glow'}),
 T_('“',70,10,300,null,420,{font:'Playfair Display',fw:900,fill:RED,name:'Quote mark'}),
 T_('Make it simple,\nbut significant.',90,340,900,null,92,{font:'Playfair Display',fw:900,name:'Quote'}),
 R_('rect',90,640,120,8,{fill:RED,name:'Accent rule'}),
 T_('— YOUR NAME',90,680,700,null,40,{ls:8,name:'Author'}),
 T_('@yourhandle',90,960,500,null,32,{fw:600,fill:GRY,name:'Handle'})]},
{n:'Story Announcement',cat:'Social',w:1080,h:1920,bg:{c:'#050505',c2:'#3d0a10',g:1,a:170},o:[
 I_(90,140,900,760,RED3,'#2a0a10',0,{rad:60,vg:.55,f:{c:1.1,s:1.2},name:'Hero photo'}),
 T_('NEW DROP',90,930,900,null,130,{font:'Anton',fw:400,al:'center',cv:25,name:'Curved title'}),
 T_('OUT NOW',90,1100,900,null,220,{font:'Bebas Neue',fw:400,al:'center',fill:RED,fx:'neon',fxc:RED2,name:'Title'}),
 R_('glass',90,1390,900,260,{rad:40,name:'Info panel'}),
 T_('FRI · OCT 09 · 8 PM',90,1430,900,null,52,{fw:800,al:'center',ls:3,name:'Date'}),
 T_('Mumbai · Free entry · Limited seats',90,1520,900,null,38,{fw:500,al:'center',fill:'#d0d0d4',name:'Details'}),
 T_('SWIPE UP',90,1720,900,null,36,{ls:10,al:'center',fill:RED3,name:'CTA'}),
 R_('arrow',480,1800,120,60,{fill:RED,r:-90,name:'Arrow'})]},
{n:'Event Poster',cat:'Social',w:1080,h:1350,bg:{c:'#050505',c2:'#2a0508',g:1,a:180},o:[
 T_('NIGHT\nMARKET',60,60,960,null,260,{font:'Bebas Neue',fw:400,fx:'hollow',lh:.88,name:'Title outline'}),
 I_(640,440,380,380,RED2,'#1a0508',1,{rad:9999,sw:8,stroke:RED,duo:[INK,RED3],fx:'soft',name:'Duotone photo'}),
 R_('star',850,350,180,180,{fill:'#ffffff',c2:RED3,g:1,r:15,name:'Sticker'}),
 T_('FREE\nENTRY',850,400,180,null,34,{fw:900,fill:INK,al:'center',lh:1,r:15,name:'Sticker text'}),
 T_('10 · 10 · 2026',60,475,540,null,46,{font:'Montserrat',fw:900,fill:RED,name:'Date'}),
 T_('7 PM TILL LATE',60,560,520,null,40,{ls:4,name:'Time'}),
 R_('rect',60,640,420,6,{fill:RED,name:'Rule'}),
 T_('Live music · Street food\nArt stalls · Free entry',60,680,540,null,38,{fw:500,fill:'#c8c8cc',lh:1.4,name:'Details'}),
 R_('rect',60,1100,420,110,{fill:RED,rad:55,name:'Button'}),
 T_('GET TICKETS',60,1100,420,110,40,{fw:800,al:'center',name:'Button label'}),
 T_('www.yourevent.com',60,1270,960,null,32,{fw:600,fill:GRY,name:'URL'})]},
{n:'Mega Sale',cat:'Promo',w:1080,h:1080,bg:{c:'#e11d2e',c2:'#6a0a12',g:1,a:150},o:[
 R_('ellipse',-220,-220,700,700,{fill:'#ffffff',o:.08,name:'Ring A'}),
 R_('ellipse',640,640,640,640,{fill:'#ffffff',o:.08,name:'Ring B'}),
 T_('MEGA SALE',40,110,1000,null,210,{font:'Anton',fw:400,al:'center',fx:'long',name:'Headline'}),
 T_('50% OFF',40,380,1000,null,230,{font:'Bebas Neue',fw:400,al:'center',fill:INK,fx:'echo',fxc:'#ffffff',name:'Discount'}),
 R_('star',110,660,260,260,{fill:'#ffffff',c2:'#ffd0d3',g:1,r:-12,name:'Badge'}),
 T_('LIMITED\nTIME',110,745,260,null,38,{fw:800,fill:RED,al:'center',lh:1,r:-12,name:'Badge text'}),
 R_('rect',470,730,500,120,{fill:INK,rad:60,fx:'soft',name:'Button'}),
 T_('SHOP NOW →',470,730,500,120,46,{fw:800,al:'center',name:'Button label'}),
 T_('Free shipping over $50 · Ends Sunday',60,970,960,null,30,{fw:600,al:'center',o:.9,name:'Fine print'})]},
{n:'Business Banner',cat:'Business',w:1200,h:630,bg:{c:'#f5f5f5',c2:'#dcdcde',g:1,a:160},o:[
 I_(640,60,500,510,RED,'#1a0508',0,{rc:[200,40,200,40],fx:'soft',name:'Hero image'}),
 R_('rect',60,70,90,10,{fill:RED,name:'Accent'}),
 T_('Grow your\nbrand online',60,105,560,null,76,{font:'Playfair Display',fw:900,fill:INK,lh:1.08,name:'Headline'}),
 T_('Design, strategy and content that actually convert.',60,295,520,100,30,{fw:500,fill:'#4a4a50',lh:1.4,name:'Subhead'}),
 ...[['120+','Clients'],['98%','Retention'],['24/7','Support']].flatMap((s,i)=>[R_('rect',60+i*170,430,150,110,{fill:'#ffffff',rad:20,sw:1,stroke:'#d4d4d4',name:'Stat card'}),T_(s[0],60+i*170,448,150,null,46,{font:'Montserrat',fw:800,fill:RED,al:'center',name:'Stat '+s[1]}),T_(s[1],60+i*170,502,150,null,22,{fw:600,fill:'#4a4a50',al:'center',name:'Label '+s[1]})]),
 T_('yourbrand.com',60,570,400,null,26,{fill:INK,name:'URL'})]},
{n:'Minimal Statement',cat:'Business',w:1280,h:720,bg:{c:'#f5f5f5',c2:'#e4e4e6',g:1,a:160},o:[
 R_('rect',80,80,14,560,{fill:RED,name:'Red bar'}),
 T_('A NOTE ON DESIGN',140,110,700,null,28,{ls:8,fill:RED,name:'Kicker'}),
 T_('Less, but\nbetter.',140,180,1000,null,170,{font:'Playfair Display',fw:900,fill:INK,lh:1,name:'Statement'}),
 T_('yourname.com',140,600,600,null,28,{fw:600,fill:GRY,name:'URL'})]},
{n:'Podcast Cover',cat:'Creative',w:1080,h:1080,bg:{c:'#050505',c2:'#1a0507',g:1,a:135},o:[
 I_(0,0,1080,1080,RED3,'#1a0508',0,{duo:[INK,RED2],vg:.7,name:'Cover photo (duotone)'}),
 R_('glass',240,170,600,600,{rad:9999,name:'Frosted circle'}),
 T_('THE LATE\nSHOW',90,300,900,null,130,{font:'Montserrat',fw:900,al:'center',fx:'splice',fxc:RED,lh:.95,name:'Title'}),
 T_('EP 24 · AFTER-HOURS STORIES',90,650,900,null,34,{ls:6,al:'center',name:'Episode'}),
 T_('NEW EPISODES EVERY FRIDAY',90,960,900,null,30,{fw:600,ls:4,al:'center',fill:RED3,name:'Schedule'})]},
{n:'Retro Neon',cat:'Creative',w:1280,h:720,bg:{c:'#050505',c2:'#2a0510',g:1,a:180},o:[
 R_('ellipse',440,120,400,400,{fill:RED3,c2:RED,g:1,a:180,fx:'glow',name:'Sun'}),
 ...[[380,8],[415,12],[452,16],[490,20]].map(([y,h])=>R_('rect',400,y,480,h,{fill:'#050505',name:'Sun cut'})),
 ...[540,570,610,665].map(y=>R_('rect',0,y,1280,3,{fill:RED,o:.8,name:'Grid line'})),
 T_('Open 24 Hours',140,70,1000,null,150,{font:'Lobster',fw:400,al:'center',fx:'neon',fxc:RED2,name:'Neon script'}),
 T_('RETRO DINER · EST. 1986',140,590,1000,null,44,{font:'Orbitron',fw:800,al:'center',fx:'chroma',ls:6,name:'Chromatic line'})]},
{n:'Text Effects Guide',cat:'Showcase',w:1280,h:720,bg:{c:'#050505',c2:'#160608',g:1,a:160},o:[
 T_('Text effects',40,28,600,null,54,{font:'Anton',fw:400,name:'Heading'}),
 T_('Select a text layer → Effects tab',640,44,600,null,26,{fw:500,al:'right',fill:GRY,name:'Hint'}),
 ...FXS.flatMap(([k,l,c,lt],i)=>{const x=40+(i%4)*305,y=120+Math.floor(i/4)*190;return[
  R_('rect',x,y,285,170,{fill:lt?'#e8e8ea':'#121212',rad:22,sw:1,stroke:lt?'#cfcfd2':'#2a2a2a',name:l+' card'}),
  T_('Aa',x,y+10,285,115,100,{font:'Anton',fw:400,al:'center',fill:k=='hollow'?RED3:lt?RED:'#ffffff',fx:k,...(c?{fxc:c}:{}),name:l+' sample'}),
  T_(l,x,y+132,285,null,22,{fw:600,ls:2,al:'center',fill:lt?'#4a4a50':GRY,name:l+' label'})]})]},
{n:'Images & Shapes Guide',cat:'Showcase',w:1280,h:720,bg:{c:'#050505',c2:'#160608',g:1,a:160},o:[
 T_('Masks, filters & shapes',40,28,700,null,54,{font:'Anton',fw:400,name:'Heading'}),
 T_('Select an image → right panel',700,44,540,null,26,{fw:500,al:'right',fill:GRY,name:'Hint'}),
 ...MSK.flatMap(([l,o],i)=>{const x=40+(i%6)*204,y=i<6?115:385;return[
  I_(x,y,180,180,i%2?RED3:RED2,i%3?'#2a0a10':'#1a0508',i%2,{...o,name:l}),
  T_(l,x-10,y+190,200,null,22,{fw:600,ls:2,al:'center',fill:GRY,name:l+' label'})]})]}
];
let tplCat='All';
function loadT(t){if(t.w>0&&t.h>0&&(t.w!=W||t.h!=H)){W=t.w;H=t.h;const c=$('#cv');c.style.width=W+'px';c.style.height=H+'px'}S=norm(t);delete S.w;delete S.h;sel=null;cropId=null;ms=[];push();all();fit()}
function lp(){const p=$('#lp');let h='';
if(tab=='templates'){const mine=tplGet(),bgc=b=>b.g?`linear-gradient(${b.a}deg,${b.c},${b.c2})`:b.c,list=TPL.map((x,i)=>[x,i]).filter(([x])=>tplCat=='All'||x.cat==tplCat);h=seg(TCATS.map(c=>[c]),tplCat,'tc')+`<div class="g2">${list.map(([x,i])=>`<div class="card" data-tpl="${i}"><div class="tp" style="background:${bgc(x.bg)}"></div><span>${esc(x.n)}<small class="mu">${x.w}×${x.h}</small></span></div>`).join('')}</div><h4 style="margin-top:14px">My Templates</h4><div class="g2">${mine.map((m,i)=>`<div class="card" data-my="${i}"><div class="tp" style="background:${bgc(m.s.bg)}"></div><span>${esc(m.n)}</span></div>`).join('')||'<p class="mu" style="grid-column:1/3">Nothing saved yet — use “Save as Template”.</p>'}</div>`}
if(tab=='elements')h=`<h4>Shapes</h4><div class="g2">${Object.keys(SH).map(k=>`<button class="b" data-sh="${k}">${ic({rect:'square',rounded:'square',circle:'circle',glass:'glass-water',line:'minus',triangle:'triangle',star:'star',hex:'hexagon',arrow:'move-right'}[k])}${k}</button>`).join('')}</div>`;
if(tab=='assets'){h=`<input type="search" id="aq" placeholder="Search ${asset.cat.toLowerCase()}…" value="${esc(asset.q)}">${seg(AC.map(c=>[c]),asset.cat,'ac')}<div class="g2" id="ag">${asset.items.map(acard).join('')}</div>${asset.busy?'<p class="mu">Loading…</p>':''}${asset.msg?`<p class="mu">${asset.msg}</p>`:''}<br><button class="b" id="more" ${asset.busy?'disabled':''} style="width:100%;justify-content:center">${ic('cloud-download')}Fetch 30 more</button><p class="mu" style="font-size:9px">Icons &amp; logos: Iconify open-source sets · Photos &amp; art: Openverse (CC0/PD/CC BY/BY-SA) with Wikimedia Commons fallback · Avatars: DiceBear. Tap a credit to open the source and license.</p>`}
if(tab=='text')h=`<h4>Add text</h4>${[['Heading','Add a heading',120,800,'Inter'],['Subheading','Add a subheading',64,700,'Inter'],['Body','Body text goes here',34,400,'Inter'],['Display','BIG TITLE',150,400,'Bebas Neue'],['Script','Script style',90,400,'Pacifico']].map((t,i)=>`<button class="b" style="width:100%;margin-bottom:6px;font:${t[3]} 15px '${t[4]}'" data-tx="${i}">${t[0]}</button>`).join('')}`;
if(tab=='uploads')h=`<h4>Uploads</h4><button class="b" style="width:100%;justify-content:center;padding:20px" id="upb">${ic('upload')}Choose image / PNG</button><p style="color:var(--mu)">Or drop files onto the canvas, or paste an image (Ctrl+V).</p>${UP.length?`<h4 style="margin-top:12px">This session</h4><div class="g2">${UP.map((u,i)=>`<div class="card" data-up="${i}"><img class="ti" src="${u}"></div>`).join('')}</div>`:''}`;
if(tab=='background')h=`<h4>Background</h4>${seg([['Solid'],['Gradient']],S.bg.g?'Gradient':'Solid','bg')}<div style="display:flex;gap:8px"><input type="color" id="bc1" value="${S.bg.c}"><input type="color" id="bc2" value="${S.bg.c2}"></div><label class="r">Angle<input type="range" id="ba" min="0" max="360" value="${S.bg.a}"><span></span></label><h4>Presets</h4><div class="g2">${[['#050505','#e11d2e'],['#0a0a0a','#4a0a12'],['#111','#444'],['#1a0505','#8f0f1a'],['#2b0a0a','#000'],['#f5f5f5','#d4d4d4']].map((c,i)=>`<div class="card" data-bp="${i}" style="height:44px;background:linear-gradient(135deg,${c[0]},${c[1]})"></div>`).join('')}</div>`;
if(tab=='effects'){const o=get();h=`<h4>Effects</h4><div class="g2">${FXL.map(f=>`<button class="b ${o&&(o.fx||'')==f[0]?'on':''}" data-fx="${f[0]}">${ic(f[1])}${f[2]}</button>`).join('')}</div>`+(o?(o.fx?`<details><summary>Advanced</summary><label class="r">Color<input type="color" data-fp="fxc" value="${fc(o)}"><span></span></label><label class="r">Strength<input type="range" min=".2" max="2.5" step=".05" value="${fi(o)}" data-fp="fxi"><span>${fi(o)}</span></label></details>`:''):`<p class="mu">Select an object, then pick an effect.</p>`)}
if(tab=='brand'){const b=brand();h=`<h4>${ic('palette')} Colors</h4><div class="g5">${b.colors.map((c,i)=>`<div class="sw" data-bc="${i}" style="background:${esc(c)}" data-t="Apply ${esc(c)}"><b class="rm" data-rm="c${i}">×</b></div>`).join('')}</div><div style="display:flex;gap:6px;margin:8px 0"><input type="color" id="bnc" value="#e11d2e"><button class="b" id="bna" style="flex:1">${ic('plus')}Add color</button></div><h4>${ic('blend')} Gradients</h4><div class="g5">${b.grads.map((g,i)=>`<div class="sw" data-bg2="${i}" style="background:linear-gradient(135deg,${esc(g[0])},${esc(g[1])})"><b class="rm" data-rm="g${i}">×</b></div>`).join('')}</div><div style="display:flex;gap:6px;margin:8px 0"><input type="color" id="bg1" value="#e11d2e"><input type="color" id="bg2" value="#ff3b47"><button class="b" id="bga" style="flex:1">${ic('plus')}Save</button></div><h4>${ic('type')} Favorite fonts</h4>${b.fonts.map((f,i)=>`<div class="fch" data-bf="${i}" style="font-family:'${esc(f)}';font-size:15px"><span style="flex:1">${esc(f)}</span><b class="rm" data-rm="f${i}">×</b></div>`).join('')}<div style="display:flex;gap:6px"><select id="bfs">${FONTS.map(f=>`<option>${f}</option>`).join('')}</select><button class="b" id="bfa">${ic('star')}Save</button></div><h4 style="margin-top:12px">${ic('image')} Logos &amp; images</h4><div class="g2">${b.logos.map((l,i)=>`<div class="card" data-bl="${i}"><img class="ti" src="${l}"><b class="rm" data-rm="l${i}">×</b></div>`).join('')}</div><button class="b" id="bla" style="width:100%;margin-top:8px;justify-content:center">${ic('upload')}Add logo / image</button><p class="mu" style="font-size:10px">Saved only in this browser. Tap to apply or add. Selected object → applies to it, otherwise the backdrop.</p>`}
if(tab=='layers')h=`<h4>Layers</h4><div id="lys">${[...S.o].reverse().map(o=>`<div class="ly ${o.id==sel?'on':''}" draggable="true" data-id="${o.id}">${ic('grip-vertical')}<input value="${esc(o.name)}" data-n="${o.id}"><span data-lh="${o.id}">${ic(o.hide?'eye-off':'eye')}</span><span data-ll="${o.id}">${ic(o.lock?'lock':'lock-open')}</span><span data-ld="${o.id}">${ic('trash-2')}</span></div>`).join('')||'<p style="color:var(--mu)">Empty canvas.</p>'}</div>`;
const st=p.scrollTop;p.innerHTML=h;ICN();bindL(p);p.scrollTop=st;if(tab=='assets'&&!asset.items.length&&!asset.busy&&!asset.tried)more()}
function bindL(p){const q=(s,f)=>p.querySelectorAll(s).forEach(f);
q('[data-tc]',e=>e.onclick=()=>{tplCat=e.dataset.tc;lp()});q('[data-tpl]',e=>e.onclick=()=>loadT(TPL[+e.dataset.tpl]));q('[data-my]',e=>e.onclick=()=>{const m=tplGet()[e.dataset.my];loadT({...m.s,w:m.w,h:m.h})});
q('[data-sh]',e=>e.onclick=()=>add({...SH[e.dataset.sh],name:e.dataset.sh}));
q('[data-ac]',e=>e.onclick=()=>{asset.cat=e.dataset.ac;resetA();more()});
const aq=p.querySelector('#aq');if(aq)aq.onchange=()=>{asset.q=aq.value;resetA();more()};const mo=p.querySelector('#more');if(mo)mo.onclick=more;
q('[data-ai]',e=>e.onclick=ev=>{if(ev.target.closest('a'))return;addAsset(asset.items[+e.dataset.ai])});
q('[data-fp]',e=>{e.oninput=()=>{const o=get();if(!o)return;o[e.dataset.fp]=e.type=='range'?+e.value:e.value;if(e.type=='range')e.nextElementSibling.textContent=e.value;render()};e.onchange=()=>push()});
q('[data-rm]',e=>e.onclick=ev=>{ev.stopPropagation();const b=brand();b[{c:'colors',g:'grads',f:'fonts',l:'logos'}[e.dataset.rm[0]]].splice(+e.dataset.rm.slice(1),1);bsave(b);lp()});
q('[data-bc]',e=>e.onclick=()=>applyColor(brand().colors[+e.dataset.bc]));q('[data-bg2]',e=>e.onclick=()=>applyGrad(brand().grads[+e.dataset.bg2]));q('[data-bf]',e=>e.onclick=()=>applyFont(brand().fonts[+e.dataset.bf]));q('[data-bl]',e=>e.onclick=()=>addImg(brand().logos[+e.dataset.bl],{name:'Logo'}));
const $p=x=>p.querySelector(x);if($p('#bna'))$p('#bna').onclick=()=>{const b=brand(),c=$p('#bnc').value;if(!b.colors.includes(c)){b.colors.push(c);bsave(b)}lp()};
if($p('#bga'))$p('#bga').onclick=()=>{const b=brand();b.grads.push([$p('#bg1').value,$p('#bg2').value]);bsave(b);lp()};
if($p('#bfa'))$p('#bfa').onclick=()=>{const b=brand(),f=$p('#bfs').value;if(!b.fonts.includes(f)){b.fonts.push(f);bsave(b)}lp()};
if($p('#bla'))$p('#bla').onclick=()=>$('#fb').click();
q('[data-tx]',e=>e.onclick=()=>{const t=[['Heading','Add a heading',120,800,'Inter'],['Subheading','Add a subheading',64,700,'Inter'],['Body','Body text goes here',34,400,'Inter'],['Display','BIG TITLE',150,400,'Bebas Neue'],['Script','Script style',90,400,'Pacifico']][+e.dataset.tx];add({t:'text',txt:t[1],fs:t[2],fw:t[3],font:t[4],fill:'#ffffff',al:'left',ls:0,lh:1.1,x:100,y:250,w:900,h:t[2]*1.4,name:t[0]})});
const ub=p.querySelector('#upb');if(ub)ub.onclick=()=>$('#fi').click();
q('[data-bg]',e=>e.onclick=()=>{S.bg.g=e.dataset.bg=='Gradient'?1:0;push();all()});
const b1=p.querySelector('#bc1');if(b1){[['#bc1','c'],['#bc2','c2'],['#ba','a']].forEach(([s,k])=>{const i=p.querySelector(s);i.oninput=()=>{S.bg[k]=k=='a'?+i.value:i.value;render()};i.onchange=push})}
q('[data-bp]',e=>e.onclick=()=>{const c=[['#050505','#e11d2e'],['#0a0a0a','#4a0a12'],['#111','#444'],['#1a0505','#8f0f1a'],['#2b0a0a','#000'],['#f5f5f5','#d4d4d4']][e.dataset.bp];S.bg.c=c[0];S.bg.c2=c[1];S.bg.g=1;push();all()});
q('[data-fx]',e=>e.onclick=()=>{const o=get();if(!o)return toast('Select an object first');const f=e.dataset.fx,old=o.fx;if(f=='glass'){o.fx='glass'}else{if(old=='glass'&&o.t=='glass')o.t='rect';if((old=='sticker'||old=='outline')&&f!='sticker'&&f!='outline')o.sw=0;o.fx=f;if(f=='sticker'){o.sw=10;o.stroke='#ffffff'}if(f=='outline'){o.sw=o.t=='text'?3:6;o.stroke='#ffffff'}}push();all()});
q('.ly',e=>{const id=+e.dataset.id;e.onclick=()=>{sel=id;panels();box();lp()};
e.ondragstart=ev=>ev.dataTransfer.setData('t',id);e.ondragover=ev=>{ev.preventDefault();e.classList.add('dr')};e.ondragleave=()=>e.classList.remove('dr');
e.ondrop=ev=>{ev.preventDefault();const a=S.o.findIndex(o=>o.id==ev.dataTransfer.getData('t')),b=S.o.findIndex(o=>o.id==id);const[m]=S.o.splice(a,1);S.o.splice(b,0,m);push();all()}});
q('[data-n]',e=>{e.onclick=ev=>ev.stopPropagation();e.onchange=()=>{S.o.find(o=>o.id==e.dataset.n).name=e.value;push()}});
q('[data-lh]',e=>e.onclick=ev=>{ev.stopPropagation();const o=S.o.find(o=>o.id==e.dataset.lh);o.hide=!o.hide;push();all()});
q('[data-ll]',e=>e.onclick=ev=>{ev.stopPropagation();const o=S.o.find(o=>o.id==e.dataset.ll);o.lock=!o.lock;push();all()});
q('[data-ld]',e=>e.onclick=ev=>{ev.stopPropagation();S.o=S.o.filter(o=>o.id!=e.dataset.ld);sel=null;push();all()})}
function toast(m){const t=$('#tt');t.textContent=m;t.style.cssText+=';display:block;left:50%;top:80px;transform:translateX(-50%)';clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display='none',1800)}
function panels(){rp();if(tab=='layers'||tab=='effects')lp()}
const LPT=['layers','effects','background','uploads'];
function all(){render();rp();if(LPT.includes(tab))lp();sched()}
$('#rail').innerHTML=TABS.map(t=>`<button class="b ${t[0]==tab?'on':''}" data-tab="${t[0]}">${ic(t[1])}${t[2]}</button>`).join('');
$('#rail').onclick=e=>{const b=e.target.closest('[data-tab]');if(b)setTab(b.dataset.tab)};
/* actions */
$('#undo').onclick=()=>undo();$('#redo').onclick=()=>redo();$('#kbtn').onclick=()=>openKP();
$('#zi').onclick=()=>setZ(zoom+.1);$('#zo').onclick=()=>setZ(zoom-.1);$('#zf').onclick=fit;$('#zl').onclick=()=>setZ(1);$('#sn').onclick=()=>{snap=!snap;$('#sn').classList.toggle('on',snap)};$('#sn').classList.add('on');
function readF(f){shrink(f).then(u=>{UP.unshift(u);UP.length=Math.min(UP.length,12);addImg(u)}).catch(()=>toast('Could not read image'))}
$('#fi').onchange=e=>{[...e.target.files].forEach(readF);e.target.value=''};
$('#ws').ondragover=e=>e.preventDefault();$('#ws').ondrop=e=>{e.preventDefault();[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/')).forEach(readF)};
$('#impj').onclick=()=>$('#fj').click();$('#fj').onchange=e=>{const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);if(!j.o||!j.bg)throw 0;S=j;if(j.W>0&&j.H>0)setCanvas(j.W,j.H);uid=Math.max(0,...S.o.map(o=>o.id||0))+1;sel=null;cropId=null;ms=[];push();all()}catch(x){toast('Invalid JSON')}};r.readAsText(e.target.files[0]);e.target.value=''};
function dl(url,name){const a=document.createElement('a');a.href=url;a.download=name;a.click()}
async function drawAll(T){const S=T||curS(),CW=T&&T.w||W,CH=T&&T.h||H;const c=document.createElement('canvas');c.width=CW;c.height=CH;let x=c.getContext('2d');const base=x;
const gr=(o,w,h)=>{const a=((o.a||135)-90)*Math.PI/180,cx=w/2,cy=h/2,L=Math.abs(w*Math.cos(a))/2+Math.abs(h*Math.sin(a))/2,g=x.createLinearGradient(cx-Math.cos(a)*L,cy-Math.sin(a)*L,cx+Math.cos(a)*L,cy+Math.sin(a)*L);(o.stops||[[0,o.fill],[1,o.c2]]).forEach(s=>g.addColorStop(s[0],s[1]));return g};
x.fillStyle=S.bg.g?gr({a:S.bg.a,fill:S.bg.c,c2:S.bg.c2},CW,CH):S.bg.c;x.fillRect(0,0,CW,CH);
for(const o of S.o){if(o.hide)continue;let tc=null;if(o.fx=='grain'||o.fx=='scan'||o.fe){tc=document.createElement('canvas');tc.width=CW;tc.height=CH;x=tc.getContext('2d')}x.save();x.translate(o.x+o.w/2,o.y+o.h/2);x.rotate(o.r*Math.PI/180);if(o.t!='img')x.scale(o.fl||1,o.fv||1);x.translate(-o.w/2,-o.h/2);x.globalAlpha=o.o;x.filter=(filt(o.f)+' '+fxf(o)).trim();
const fs=o.fx=='metal'?gr({a:135,stops:[[0,'#f5f5f7'],[.22,'#8d93a1'],[.4,'#fff'],[.62,'#59606e'],[.82,'#d9dce3'],[1,'#7b8190']]},o.w,o.h):o.g?gr(o,o.w,o.h):o.fill;
{const k=o.fx=='sticker'?'soft':o.fx,i=fi(o),gl=['glow','neon','inner'].includes(k);if(gl||['soft','hard','long','d3'].includes(k)){x.shadowColor=gl?fc(o):k=='soft'?'rgba(0,0,0,.6)':'#000';x.shadowBlur=gl?50*i:k=='soft'?30*i:0;x.shadowOffsetX=x.shadowOffsetY=['long','d3','hard'].includes(k)?10*i:0;if(k=='soft')x.shadowOffsetY=10*i}}
if(o.t=='text'){x.fillStyle=o.fx=='glass'?'rgba(255,255,255,.28)':fs;x.font=`${o.it?'italic ':''}${o.fw} ${o.fs}px '${o.font}'`;x.textBaseline='middle';x.textAlign=o.al;x.letterSpacing=o.ls+'px';const ls=o.cv?o.txt.split('\n'):wrapT(x,o.txt,o.w),lh=o.fs*o.lh,y0=o.h/2-(ls.length-1)*lh/2,px=o.al=='left'?0:o.al=='right'?o.w:o.w/2;ls.forEach((l,i)=>{if((o.sw||o.fx=='glass')&&!o.cv){x.lineWidth=o.fx=='glass'?3:o.sw*2;x.strokeStyle=o.fx=='glass'?'rgba(255,255,255,.75)':o.stroke;x.strokeText(l,px,y0+i*lh)}TX(x,o,l,px,y0+i*lh,i,fs)})}
else if(o.t=='img'){const im=await new Promise(r=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>r(i);i.onerror=()=>r(null);i.src=o.src});if(im){MK(x,o);x.clip();const g=igeo(o,im.width,im.height);x.save();x.translate(g.x+g.w/2,g.y+g.h/2);x.scale(o.fl||1,o.fv||1);x.drawImage(im,-g.w/2,-g.h/2,g.w,g.h);x.restore();VG(x,o);if(o.sw){x.lineWidth=o.sw*2;x.strokeStyle=o.stroke;x.stroke()}}}
else{x.beginPath();if(o.t=='ellipse')x.ellipse(o.w/2,o.h/2,o.w/2,o.h/2,0,0,7);else if(o.t=='poly'&&o.cp){const pts=[...o.cp.matchAll(/([\d.]+)%\s+([\d.]+)%/g)];pts.forEach((m,i)=>x[i?'lineTo':'moveTo'](m[1]/100*o.w,m[2]/100*o.h));x.closePath()}else x.roundRect(0,0,o.w,o.t=='line'?(o.sw||6):o.h,o.rc||o.rad);
x.fillStyle=(o.t=='glass'||o.fx=='glass')?'rgba(255,255,255,.2)':fs;x.fill();if(o.sw&&o.t!='line'){x.lineWidth=o.sw;x.strokeStyle=o.stroke;x.stroke()}}
fxmask(x,o);x.restore();if(tc){x=base;x.drawImage(tc,0,0)}}return c}
$('#exp').onclick=async()=>{const f=$('#fmt').value;if(f=='JSON'){return dl(URL.createObjectURL(new Blob([JSON.stringify({...JSON.parse(sv()),W,H})],{type:'application/json'})),'project.json')}
toast('Rendering…');const c=await drawAll();
if(f=='PDF'){const j=c.toDataURL('image/jpeg',.95),b=atob(j.split(',')[1]),n=b.length,u=new Uint8Array(n);for(let i=0;i<n;i++)u[i]=b.charCodeAt(i);const E=s=>new TextEncoder().encode(s),parts=[],off=[];let len=0;const P=d=>{parts.push(d);len+=d.length};
P(E('%PDF-1.4\n'));const ob=[`<</Type/Catalog/Pages 2 0 R>>`,`<</Type/Pages/Kids[3 0 R]/Count 1>>`,`<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${W} ${H}]/Contents 4 0 R/Resources<</XObject<</I 5 0 R>>>>>>`];
ob.forEach((s,i)=>{off.push(len);P(E(`${i+1} 0 obj\n${s}\nendobj\n`))});const ct=`q ${W} 0 0 ${H} 0 0 cm /I Do Q`;off.push(len);P(E(`4 0 obj\n<</Length ${ct.length}>>\nstream\n${ct}\nendstream\nendobj\n`));off.push(len);P(E(`5 0 obj\n<</Type/XObject/Subtype/Image/Width ${W}/Height ${H}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${n}>>\nstream\n`));P(u);P(E('\nendstream\nendobj\n'));const xr=len;P(E(`xref\n0 6\n0000000000 65535 f \n${off.map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')}trailer\n<</Size 6/Root 1 0 R>>\nstartxref\n${xr}\n%%EOF`));return dl(URL.createObjectURL(new Blob(parts,{type:'application/pdf'})),'thumbnail.pdf')}
const m={PNG:'image/png',JPG:'image/jpeg',WebP:'image/webp'}[f];c.toBlob(b=>dl(URL.createObjectURL(b),'thumbnail.'+f.toLowerCase()),m,.95)};
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)&&(e.target.type!='range'||!(e.ctrlKey||e.metaKey)))return;const k=e.key.toLowerCase(),c=e.ctrlKey||e.metaKey,o=get();
if(c&&k=='z'){e.preventDefault();e.shiftKey?redo():undo()}else if(c&&k=='y'){e.preventDefault();redo()}else if(c&&k=='d'){e.preventDefault();dup()}else if(k=='delete'||k=='backspace')del();
else if(o&&!o.lock&&k.startsWith('arrow')){e.preventDefault();const d=e.shiftKey?10:1;if(k=='arrowleft')o.x-=d;if(k=='arrowright')o.x+=d;if(k=='arrowup')o.y-=d;if(k=='arrowdown')o.y+=d;render();rp()}});
/* tooltips */
document.addEventListener('mouseover',e=>{const b=e.target.closest('[data-t]'),t=$('#tt');if(!b){t.style.display='none';return}const r=b.getBoundingClientRect();t.textContent=b.dataset.t;t.style.cssText+=`;display:block;left:${r.left}px;top:${r.bottom+6}px;transform:none`});
addEventListener('resize',fit);

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MET='linear-gradient(135deg,#f5f5f7 0%,#8d93a1 22%,#fff 40%,#59606e 62%,#d9dce3 82%,#7b8190 100%)';
const EMB='<filter id="wse" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b"/><feSpecularLighting in="b" surfaceScale="5" specularConstant="1" specularExponent="22" lighting-color="#fff" result="s"><feDistantLight azimuth="225" elevation="48"/></feSpecularLighting><feComposite in="s" in2="SourceAlpha" operator="in" result="sc"/><feComposite in="SourceGraphic" in2="sc" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter>';
const GRAIN='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 0 0 0 -3.6"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>')+'")';
const fc=o=>o.fxc||o.fill,fi=o=>o.fxi??1,bh=o=>o.t=='line'?(o.sw||6):o.h;
function wrapT(x,s,w){return s.split('\n').flatMap(p=>{const r=[];let c='';for(const wd of p.split(' ')){const n=c?c+' '+wd:wd;if(c&&x.measureText(n).width>w){r.push(c);c=wd}else c=n}r.push(c);return r})}
function shadow(o){const c=fc(o),i=fi(o);return({soft:`0 ${12*i}px ${40*i}px rgba(0,0,0,.5)`,sticker:'0 6px 12px rgba(0,0,0,.5)',hard:`${8*i}px ${8*i}px 0 #000`,long:Array.from({length:Math.round(40*i)},(_,k)=>`${k+1}px ${k+1}px 0 rgba(0,0,0,.35)`).join(','),glow:`0 0 ${40*i}px ${c},0 0 ${80*i}px ${c}`,neon:`0 0 8px #fff,0 0 ${24*i}px ${c},0 0 ${60*i}px ${c}`,inner:`inset 0 0 ${40*i}px ${c}`,d3:`${6*i}px ${6*i}px 0 #000,${12*i}px ${12*i}px 0 rgba(0,0,0,.5)`})[o.fx]||''}
function tshadow(o){const c=fc(o),i=fi(o);return({glow:`0 0 ${20*i}px ${c},0 0 ${50*i}px ${c}`,neon:`0 0 4px #fff,0 0 ${20*i}px ${c},0 0 ${50*i}px ${c}`,soft:`0 ${6*i}px ${20*i}px rgba(0,0,0,.6)`,sticker:'0 6px 12px rgba(0,0,0,.5)',hard:`${5*i}px ${5*i}px 0 #000`,long:Array.from({length:Math.round(30*i)},(_,k)=>`${k+1}px ${k+1}px 0 rgba(0,0,0,.4)`).join(','),d3:`${4*i}px ${4*i}px 0 #000,${8*i}px ${8*i}px 0 #000`,inner:`0 0 ${12*i}px ${c}`})[o.fx]||''}
function fxf(o){const i=fi(o),x=Math.round(5*i);return({rgb:`drop-shadow(${-x}px 0 rgba(255,0,60,.9)) drop-shadow(${x}px 0 rgba(0,230,255,.9))`,chroma:`drop-shadow(${-x/2}px 0 rgba(255,0,60,.8)) drop-shadow(${x/2}px 0 rgba(0,255,120,.6)) drop-shadow(0 0 ${x/2}px rgba(80,120,255,.8))`,distort:`url(#wsd${o.id})`,emboss:'url(#wse)',metal:'url(#wse) contrast(1.1)'})[o.fx]||''}
function imgfx(o){const c=fc(o),i=fi(o);return({glass:'saturate(1.3) drop-shadow(0 0 1px rgba(255,255,255,.9)) drop-shadow(0 10px 24px rgba(0,0,0,.45))',glow:`drop-shadow(0 0 ${20*i}px ${c}) drop-shadow(0 0 ${40*i}px ${c})`,neon:`drop-shadow(0 0 4px #fff) drop-shadow(0 0 ${24*i}px ${c})`,soft:`drop-shadow(0 ${8*i}px ${20*i}px rgba(0,0,0,.6))`,hard:`drop-shadow(${8*i}px ${8*i}px 0 #000)`,d3:`drop-shadow(${6*i}px ${6*i}px 0 #000) drop-shadow(${12*i}px ${12*i}px 0 rgba(0,0,0,.5))`,sticker:'drop-shadow(0 6px 10px rgba(0,0,0,.5))',long:`drop-shadow(${12*i}px ${12*i}px 0 rgba(0,0,0,.4))`,inner:`drop-shadow(0 0 ${16*i}px ${c})`})[o.fx]||''}
function igeo(o,iw=o.iw,ih=o.ih){const z=o.cz||1;let w,h;if(o.fit=='stretch'){w=o.w*z;h=o.h*z}else{const k=(o.fit=='contain'?Math.min:Math.max)(o.w/iw,o.h/ih)*z;w=iw*k;h=ih*k}return{w,h,x:(o.w-w)/2+(o.cx||0)*o.w,y:(o.h-h)/2+(o.cy||0)*o.h}}
function updDefs(){$('#fxdefs').innerHTML=S.o.filter(o=>o.fx=='distort').map(o=>`<filter id="wsd${o.id}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="2" seed="${o.id}"/><feDisplacementMap in="SourceGraphic" scale="${Math.round(30*fi(o))}"/></filter>`).join('')+EMB}
function fxmask(x,o){if(o.fx!='scan'&&o.fx!='grain')return;x.save();x.filter='none';x.shadowColor='transparent';x.globalAlpha=1;x.globalCompositeOperation='destination-out';x.fillStyle='#000';
if(o.fx=='scan'){const t=Math.max(2,Math.round(3*fi(o)));for(let y=t;y<o.h;y+=2*t)x.fillRect(0,y,o.w,t)}else{const n=Math.min(60000,o.w*o.h/12);for(let i=0;i<n;i++)x.fillRect(Math.random()*o.w,Math.random()*o.h,1.6,1.6)}x.restore()}
const FXL=[['glass','glass-water','Glass'],['neon','zap','Neon'],['glow','sun','Glow'],['soft','cloud','Soft Shadow'],['hard','copy','Hard Shadow'],['inner','circle-dot','Inner Glow'],['long','move-diagonal','Long Shadow'],['d3','box','3D'],['outline','square-dashed','Outline'],['sticker','sticker','Sticker'],['grain','grip','Grain'],['scan','align-justify','Scanlines'],['rgb','layers','RGB Split'],['chroma','aperture','Chromatic'],['distort','waves','Distortion'],['emboss','stamp','Emboss'],['metal','gem','Metallic'],['hollow','type','Hollow'],['echo','copy-plus','Echo'],['lift','arrow-up-from-line','Lift'],['box','rectangle-horizontal','Text Box'],['splice','split','Splice'],['','ban','None']];
/* selection box + contextual toolbar */
const TB=[['dup','copy','Duplicate'],['del','trash-2','Delete'],['lk','lock','Lock / unlock'],['hd','eye-off','Hide'],['al','align-center-horizontal','Align'],['ar','layers','Arrange'],['fp','flip-horizontal-2','Flip'],['rp','image-up','Replace image'],['cr','crop','Crop'],['rt','rotate-cw','Rotate 90°']];
function zord(o,k){const a=S.o,i=a.indexOf(o);if(k=='front')a.push(a.splice(i,1)[0]);else if(k=='back')a.unshift(a.splice(i,1)[0]);else if(k=='fwd'&&i<a.length-1)[a[i],a[i+1]]=[a[i+1],a[i]];else if(k=='bwd'&&i>0)[a[i],a[i-1]]=[a[i-1],a[i]]}
const rot90=o=>o.r=((o.r+90+180)%360)-180;
let repId=null;
function replaceImg(o){repId=o.id;$('#fr').click()}
$('#fr').onchange=async e=>{const f=e.target.files[0];e.target.value='';const o=S.o.find(q=>q.id==repId);if(!f||!o)return;
 try{const u=await shrink(f);const im=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});
 Object.assign(o,{src:u,iw:im.naturalWidth||im.width||1,ih:im.naturalHeight||im.height||1,cz:1,cx:0,cy:0,fit:'cover',credit:'',link:''});UP.unshift(u);UP.length=Math.min(UP.length,12);push();all();toast('Image replaced')}catch(x){toast('Could not read image')}};
function setCrop(o){cropId=cropId==o.id?null:o.id;if(cropId)toast('Crop: drag image to pan · scroll to zoom · corner handle resizes frame');all()}
$('#ctb').onclick=ev=>{const b=ev.target.closest('[data-tb]');if(!b)return;ev.stopPropagation();const o=get(),a=b.dataset.tb;if(!o)return;
if(a=='dup')dup();else if(a=='del')del();else if(a=='lk'){o.lock=!o.lock;push();all()}else if(a=='hd'){o.hide=true;sel=null;push();all();toast('Hidden — show it again in Layers')}else if(a=='rt'){rot90(o);push();all()}else if(a=='cr')setCrop(o);else if(a=='rp')replaceImg(o);
else if(a=='fp')menu(b,[['flip-horizontal-2','Flip horizontal',()=>o.fl=(o.fl||1)*-1],['flip-vertical-2','Flip vertical',()=>o.fv=(o.fv||1)*-1]]);
else if(a=='al')menu(b,[['align-horizontal-justify-start','Left',()=>o.x=0],['align-horizontal-justify-center','Center',()=>o.x=Math.round((W-o.w)/2)],['align-horizontal-justify-end','Right',()=>o.x=W-o.w],['align-vertical-justify-start','Top',()=>o.y=0],['align-vertical-justify-center','Middle',()=>o.y=Math.round((H-bh(o))/2)],['align-vertical-justify-end','Bottom',()=>o.y=H-bh(o)]]);
else if(a=='ar')menu(b,[['arrow-up-to-line','Bring to front',()=>zord(o,'front')],['arrow-up','Bring forward',()=>zord(o,'fwd')],['arrow-down','Send backward',()=>zord(o,'bwd')],['arrow-down-to-line','Send to back',()=>zord(o,'back')]])};
$('#scroll').addEventListener('scroll',()=>box());
/* smart alignment */
function clrG(){document.querySelectorAll('#cv .sg,#cv .sl').forEach(e=>e.remove())}
function gl(t,a,b,c,eq){const d=document.createElement('div');d.className='sg'+(eq?' eq':'');const k=1/zoom;if(t=='v')Object.assign(d.style,{left:a-k/2+'px',top:b+'px',width:k+'px',height:c-b+'px'});else Object.assign(d.style,{top:a-k/2+'px',left:b+'px',height:k+'px',width:c-b+'px'});$('#cv').appendChild(d)}
function lb(x,y,v,eq){const d=document.createElement('div');d.className='sl'+(eq?' eq':'');d.textContent=v;d.style.cssText=`left:${x}px;top:${y}px;font-size:${11/zoom}px;padding:${2/zoom}px ${6/zoom}px;border-radius:${6/zoom}px`;$('#cv').appendChild(d)}
function down(ev,o){if(ev.button)return;sel=o.id;if(cropId&&cropId!=o.id)cropId=null;document.body.classList.add('mp');panels();box();if(o.lock)return;
const[sx,sy]=pt(ev),ox=o.x,oy=o.y,ocx=o.cx||0,ocy=o.cy||0,crop=cropId==o.id&&o.t=='img',oth=S.o.filter(q=>q!==o&&!q.hide),mw=o.w,mh=bh(o);let mv=0;
const nb=(nx,ny)=>{let L=null,R=null,T=null,B=null;oth.forEach(q=>{const qh=bh(q),oy_=q.y<ny+mh&&q.y+qh>ny,ox_=q.x<nx+mw&&q.x+q.w>nx;if(oy_){if(q.x+q.w<=nx&&(!L||q.x+q.w>L.x+L.w))L=q;if(q.x>=nx+mw&&(!R||q.x<R.x))R=q}if(ox_){if(q.y+qh<=ny&&(!T||q.y+qh>T.y+bh(T)))T=q;if(q.y>=ny+mh&&(!B||q.y<B.y))B=q}});return{L,R,T,B}};
drag(ev,e=>{const[x,y]=pt(e);mv=1;
if(crop){o.cx=Math.round((ocx+(x-sx)/o.w)*1000)/1000;o.cy=Math.round((ocy+(y-sy)/o.h)*1000)/1000;render();return}
let nx=ox+x-sx,ny=oy+y-sy;clrG();let eqx=0,eqy=0;const tx=[[0,0],[W/2,0],[W,0]],ty=[[0,0],[H/2,0],[H,0]],th=8/zoom;
if(snap){oth.forEach(q=>{const qh=bh(q);tx.push([q.x,q],[q.x+q.w/2,q],[q.x+q.w,q]);ty.push([q.y,q],[q.y+qh/2,q],[q.y+qh,q])});
const bs=(n,len,tg)=>{let b=null;for(const[t]of tg)for(const d of[0,len/2,len]){const dl=t-(n+d);if(Math.abs(dl)<th&&(b===null||Math.abs(dl)<Math.abs(b)))b=dl}return b};
const dx=bs(nx,mw,tx),dy=bs(ny,mh,ty);if(dx!==null)nx+=dx;if(dy!==null)ny+=dy;
let n=nb(nx,ny);if(n.L&&n.R){const t=(n.L.x+n.L.w+n.R.x-mw)/2;if(Math.abs(t-nx)<th){nx=t;eqx=1}}if(n.T&&n.B){const t=(n.T.y+bh(n.T)+n.B.y-mh)/2;if(Math.abs(t-ny)<th){ny=t;eqy=1}}}
const fx=Math.round(nx),fy=Math.round(ny);
if(snap){tx.forEach(([t,q])=>[0,mw/2,mw].forEach(d=>{if(Math.abs(t-(fx+d))<.6)gl('v',t,q?Math.min(q.y,fy):0,q?Math.max(q.y+bh(q),fy+mh):H)}));ty.forEach(([t,q])=>[0,mh/2,mh].forEach(d=>{if(Math.abs(t-(fy+d))<.6)gl('h',t,q?Math.min(q.x,fx):0,q?Math.max(q.x+q.w,fx+mw):W)}));
const n=nb(fx,fy),mid=(a1,a2,b1,b2)=>(Math.max(a1,b1)+Math.min(a2,b2))/2;
if(n.L){const g=fx-(n.L.x+n.L.w),yy=mid(n.L.y,n.L.y+bh(n.L),fy,fy+mh);if(g>.5){gl('h',yy,n.L.x+n.L.w,fx,eqx);lb(n.L.x+n.L.w+g/2,yy,Math.round(g),eqx)}}
if(n.R){const a=fx+mw,g=n.R.x-a,yy=mid(n.R.y,n.R.y+bh(n.R),fy,fy+mh);if(g>.5){gl('h',yy,a,n.R.x,eqx);lb(a+g/2,yy,Math.round(g),eqx)}}
if(n.T){const a=n.T.y+bh(n.T),g=fy-a,xx=mid(n.T.x,n.T.x+n.T.w,fx,fx+mw);if(g>.5){gl('v',xx,a,fy,eqy);lb(xx,a+g/2,Math.round(g),eqy)}}
if(n.B){const a=fy+mh,g=n.B.y-a,xx=mid(n.B.x,n.B.x+n.B.w,fx,fx+mw);if(g>.5){gl('v',xx,a,n.B.y,eqy);lb(xx,a+g/2,Math.round(g),eqy)}}}
o.x=fx;o.y=fy;const el=$(`.o[data-id="${o.id}"]`);el.style.left=fx+'px';el.style.top=fy+'px';box()},()=>{clrG();if(mv){push();rp()}})}
let wt;$('#cv').addEventListener('wheel',e=>{const o=get();if(cropId&&o&&o.id==cropId){e.preventDefault();o.cz=Math.max(.5,Math.min(4,Math.round((o.cz||1)*(e.deltaY<0?1.06:.94)*100)/100));render();rp();clearTimeout(wt);wt=setTimeout(push,300)}},{passive:false});
/* images */
function addImg(src,m={}){const i=new Image();i.onload=()=>{const iw=i.naturalWidth||256,ih=i.naturalHeight||256,k=Math.max(iw,ih)<200?260/Math.max(iw,ih):Math.min(1,600/iw,400/ih),w=Math.round(iw*k),h=Math.round(ih*k);add({t:'img',src,iw,ih,w,h,x:Math.round((W-w)/2),y:Math.round((H-h)/2),name:m.name||'Image',credit:m.credit||'',link:m.link||''})};i.onerror=()=>toast('Could not read image');i.src=src}
const rd=b=>new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(b)});
const shrinkURL=(src,max,type)=>new Promise(r=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height));if(k==1&&src.length<1.5e6)return r(src);const c=document.createElement('canvas');c.width=Math.max(1,Math.round(i.width*k));c.height=Math.max(1,Math.round(i.height*k));c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL(type||'image/png',.9))};i.onerror=()=>r(src);i.src=src});
async function shrink(b){const u=await rd(b);return /svg/.test(b.type)?u:shrinkURL(u,1600,/png|webp|gif/.test(b.type)?'image/png':'image/jpeg')}
/* assets */
const AC=['All','PNGs','Icons','Logos','Photos','People','Objects','Textures','Art','Emoji','Avatars'],DEF={All:'star',PNGs:'sticker',Icons:'star',Logos:'google',Photos:'nature',People:'portrait',Objects:'object',Textures:'texture',Art:'painting',Emoji:'smile',Avatars:'avatar'};
const tmo=(p,ms=9000)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r('timeout'),ms))]);
const LIC={lucide:'ISC',tabler:'MIT',ph:'MIT',mdi:'Apache-2.0',logos:'CC0','simple-icons':'CC0',noto:'Apache-2.0','fluent-emoji':'MIT',twemoji:'CC BY 4.0'};
const ICO=(q,off,n,pre,col)=>tmo(fetch(`https://api.iconify.design/search?query=${encodeURIComponent(q)}&limit=32&start=${off}&prefixes=${pre}`)).then(r=>{if(!r.ok)throw r.status;return r.json()}).then(j=>(j.icons||[]).slice(0,n).map(id=>{const[p,nm]=id.split(':'),u=`https://api.iconify.design/${p}/${nm}.svg`;return{id,thumb:`${u}?${col?'color=%23dddddd&':''}height=96`,full:`${u}?${col?'color=%23ffffff&':''}height=512`,title:nm.replace(/-/g,' '),credit:`${p} · ${LIC[p]||'open source'}`,link:`https://icon-sets.iconify.design/${p}/${nm}/`}}));
const OV=async(q,off,n,ex='')=>{const ps=n>20?Math.ceil(n/2):n,np=Math.ceil(n/ps),p0=Math.floor(off/ps)+1;const rs=await Promise.all(Array.from({length:np},(_,k)=>tmo(fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=${ps}&page=${p0+k}&license=cc0,pdm,by,by-sa${ex}`)).then(r=>{if(!r.ok)throw r.status;return r.json()}).catch(()=>null)));if(rs.every(r=>!r))throw 0;return rs.flatMap(j=>((j&&j.results)||[]).map(i=>({id:i.id,thumb:i.thumbnail||i.url,full:i.url,thumb2:i.thumbnail,title:i.title||'Untitled',credit:`${i.creator||'Unknown'} · ${(i.license||'').toUpperCase()}${i.license_version?' '+i.license_version:''}`,link:i.foreign_landing_url||i.url})))};
const WM=(q,off,n)=>tmo(fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent('filetype:bitmap '+q)}&gsrlimit=${n}&gsroffset=${off}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200`)).then(r=>r.json()).then(j=>Object.values(j.query?.pages||{}).sort((a,b)=>a.index-b.index).map(p=>{const ii=p.imageinfo?.[0]||{},m=ii.extmetadata||{};return{id:'wm'+p.pageid,thumb:ii.thumburl,full:ii.thumburl,title:p.title.replace(/^File:/,''),credit:`${(m.Artist?.value||'Wikimedia Commons').replace(/<[^>]+>/g,'').slice(0,40)} · ${m.LicenseShortName?.value||'see source'}`,link:ii.descriptionurl}}).filter(a=>a.thumb));
const DS=['lorelei','notionists','thumbs','shapes'];
const DB=(q,off,n)=>tmo(fetch(`https://api.dicebear.com/9.x/${DS[0]}/svg?seed=x`)).then(r=>{if(!r.ok)throw 0;const s=DS[Math.floor(off/n)%DS.length];return Array.from({length:n},(_,i)=>{const u=`https://api.dicebear.com/9.x/${s}/svg?seed=${encodeURIComponent(q+'-'+(off+i))}`;return{id:'db'+s+(off+i),thumb:u,full:u,title:s,credit:`DiceBear ${s} · CC0`,link:'https://www.dicebear.com/styles/'+s}})});
const ph=(c,s='')=>[(q,o,n)=>OV(q+s,o,n,c),(q,o,n)=>WM(q+s,o,n)];
const SRC={Icons:[(q,o,n)=>ICO(q,o,n,'lucide,tabler,ph,mdi',1)],Logos:[(q,o,n)=>ICO(q,o,n,'logos,simple-icons')],Emoji:[(q,o,n)=>ICO(q,o,n,'noto,fluent-emoji,twemoji')],Photos:ph('&category=photograph'),People:ph('&category=photograph',' people'),Objects:ph('&category=photograph',' object'),Textures:ph('',' texture'),Art:ph('&category=illustration'),PNGs:[(q,o,n)=>OV(q,o,n,'&extension=png'),(q,o,n)=>WM(q+' png',o,n)],Avatars:[DB,(q,o,n)=>ICO('user '+q,o,n,'ph,lucide',1)]};
async function run(c,q,o,n){for(const f of SRC[c]){try{const r=await f(q,o,n);if(r&&r.length)return r.slice(0,n)}catch(e){}}return[]}
SRC.All=[async(q,o,n)=>{const h=Math.ceil(n/2),oo=o/n*h,[a,b]=await Promise.all([run('Photos',q,oo,h),run('Icons',q,oo,n-h)]),r=[];for(let i=0;i<n;i++){if(a[i])r.push(a[i]);if(b[i])r.push(b[i])}return r}];
function resetA(){asset.items=[];asset.pg=0;asset.msg='';asset.busy=0;asset.tk++;asset.tried=0}
async function more(){if(asset.busy)return;const tk=++asset.tk;asset.busy=1;asset.tried=1;asset.msg='';lp();const q=asset.q.trim()||DEF[asset.cat];let r=[];try{r=await run(asset.cat,q,asset.pg*30,30)}catch(e){}
if(tk!=asset.tk)return;const seen=new Set(asset.items.map(a=>a.id));r=r.filter(a=>!seen.has(a.id)).slice(0,30);asset.items.push(...r);if(r.length)asset.pg++;asset.busy=0;if(!r.length)asset.msg=asset.items.length?'No more results.':'No results — try another search or category, or check your connection.';lp()}
const acard=(a,i)=>`<div class="card" data-ai="${i}" title="${esc(a.title)}"><img class="ti" loading="lazy" referrerpolicy="no-referrer" src="${esc(a.thumb)}" onerror="this.style.opacity=.15"><a class="cr" href="${esc(a.link)}" target="_blank" rel="noopener noreferrer">${esc(a.credit)}</a></div>`;
async function addAsset(a){if(!a)return;toast('Adding…');for(const u of[a.full,a.thumb2,a.thumb]){if(!u)continue;try{const r=await tmo(fetch(u),15000);if(!r.ok)throw 0;addImg(await shrink(await r.blob()),{name:a.title.slice(0,24),credit:a.credit,link:a.link});return}catch(e){}}toast('Could not load this asset — try another')}
/* brand */
const BK='ws_brand',brand=()=>{try{return Object.assign({colors:['#e11d2e','#ff6b74','#7a0c14','#ffffff','#8b8b90'],grads:[['#e11d2e','#ff6b74'],['#0a0a0a','#e11d2e']],fonts:[],logos:[]},JSON.parse(localStorage.getItem(BK)||'{}'))}catch(e){return{colors:[],grads:[],fonts:[],logos:[]}}};
const bsave=b=>{try{localStorage.setItem(BK,JSON.stringify(b))}catch(e){toast('Browser storage is full')}};
function applyColor(c){const o=get();if(o){o.fill=c;if(o.stops)o.stops[0][1]=c}else{S.bg.c=c;S.bg.g=0}push();all()}
function applyGrad(g){const o=get();if(o){o.g=1;o.fill=g[0];o.c2=g[1];o.stops=null}else{S.bg.c=g[0];S.bg.c2=g[1];S.bg.g=1}push();all()}
function addText(f){add({t:'text',txt:'Add a heading',fs:120,fw:800,font:f||'Inter',fill:'#ffffff',al:'left',ls:0,lh:1.1,x:100,y:250,w:900,h:168,name:'Heading'})}
function applyFont(f){const o=get();if(o&&o.t=='text'){o.font=f;push();all()}else addText(f)}
async function brandLogo(src){const b=brand();b.logos.push(await shrinkURL(src,600));bsave(b);toast('Saved to Brand');if(tab=='brand')lp()}
$('#fb').onchange=async e=>{for(const f of e.target.files)await brandLogo(await rd(f));e.target.value=''};
/* tabs & palette */
function setTab(t){tab=t;document.body.classList.remove('mp');$('#rail').querySelectorAll('.b').forEach(x=>x.classList.toggle('on',x.dataset.tab==t));lp()}
function cmds(){const need=f=>()=>{const o=get();o?f(o):toast('Select an object first')},P=f=>need(o=>{f(o);push();all()});return[
['Add text','type',()=>addText(),'heading title'],['Add image','image-plus',()=>$('#fi').click(),'upload photo'],
...Object.keys(SH).map(k=>['Add shape: '+k,'shapes',()=>add({...SH[k],name:k}),'shape']),
['Open templates','layout-template',()=>setTab('templates')],['Open assets','search',()=>setTab('assets'),'search icons photos'],['Open effects','sparkles',()=>setTab('effects')],['Open brand','palette',()=>setTab('brand'),'colors fonts logos'],['Open layers','layers',()=>setTab('layers')],['Open elements','shapes',()=>setTab('elements')],['Open text','type',()=>setTab('text')],['Open backdrop','image',()=>setTab('background'),'background'],
['Export','download',()=>$('#exp').click(),'download png jpg pdf'],['Save as template','bookmark-plus',()=>$('#savetpl').click()],['Import project JSON','folder-input',()=>$('#impj').click()],
['Duplicate','copy',need(()=>dup())],['Delete','trash-2',need(()=>del())],
['Bring forward','arrow-up',P(o=>zord(o,'fwd'))],['Send backward','arrow-down',P(o=>zord(o,'bwd'))],['Bring to front','arrow-up-to-line',P(o=>zord(o,'front'))],['Send to back','arrow-down-to-line',P(o=>zord(o,'back'))],
['Lock / unlock','lock',P(o=>o.lock=!o.lock)],['Hide','eye-off',need(o=>{o.hide=true;sel=null;push();all()})],['Flip horizontal','flip-horizontal-2',P(o=>o.fl=(o.fl||1)*-1)],['Flip vertical','flip-vertical-2',P(o=>o.fv=(o.fv||1)*-1)],['Rotate 90°','rotate-cw',P(rot90)],
['Replace image','image-up',need(o=>o.t=='img'?replaceImg(o):toast('Select an image first'))],['Crop image','crop',need(o=>o.t=='img'?setCrop(o):toast('Select an image first'))],
['Zoom in','zoom-in',()=>setZ(zoom+.1)],['Zoom out','zoom-out',()=>setZ(zoom-.1)],['Zoom 100%','scan',()=>setZ(1)],['Fit canvas','maximize',fit,'zoom'],['Toggle snapping','magnet',()=>$('#sn').click()],['Undo','undo-2',undo],['Redo','redo-2',redo],['Clear canvas','eraser',()=>{S.o=[];sel=null;ms=[];push();all()}],['Select all','square-dashed-mouse-pointer',selAll,'multi group'],['Align & distribute selection','align-center-horizontal',()=>{if(ms.length<2)return toast('Shift-click or Ctrl+A to select several objects');menu($('#ws'),groupItems(ms.map(id=>S.o.find(q=>q.id==id)).filter(Boolean)))},'align distribute space'],['Copy','clipboard-copy',copyO],['Paste','clipboard-paste',pasteO],['Group selection','group',grp,'combine'],['Ungroup','ungroup',ungrp,'split']]}
let kpI=0,kpL=[];const kpOpen=()=>$('#kp').style.display=='flex';
function openKP(){$('#kp').style.display='flex';$('#kq').value='';kpF();$('#kq').focus()}
function closeKP(){$('#kp').style.display='none'}
function kpF(){const q=$('#kq').value.toLowerCase().split(/\s+/).filter(Boolean);kpL=cmds().filter(c=>q.every(w=>(c[0]+' '+(c[3]||'')).toLowerCase().includes(w)));kpI=0;kpR()}
function kpR(){const l=$('#kl');l.innerHTML=kpL.map((c,i)=>`<div class="ki ${i==kpI?'on':''}" data-ki="${i}">${ic(c[1])}<span>${c[0]}</span></div>`).join('')||'<p class="mu" style="padding:10px">No matches</p>';ICN();const on=l.querySelector('.on');on&&on.scrollIntoView({block:'nearest'});l.querySelectorAll('.ki').forEach(e=>{e.onmouseenter=()=>{kpI=+e.dataset.ki;l.querySelectorAll('.ki').forEach(x=>x.classList.toggle('on',x==e))};e.onclick=()=>kpRun(+e.dataset.ki)})}
function kpRun(i){const c=kpL[i];if(!c)return;closeKP();c[2]()}
$('#kq').oninput=kpF;$('#kq').onkeydown=e=>{if(e.key=='ArrowDown'){e.preventDefault();kpI=Math.min(kpL.length-1,kpI+1);kpR()}else if(e.key=='ArrowUp'){e.preventDefault();kpI=Math.max(0,kpI-1);kpR()}else if(e.key=='Enter'){e.preventDefault();kpRun(kpI)}else if(e.key=='Escape')closeKP()};
$('#kp').onpointerdown=e=>{if(e.target.id=='kp')closeKP()};
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='k'){e.preventDefault();kpOpen()?closeKP():openKP()}else if(e.key=='Escape'&&!kpOpen()&&cropId){cropId=null;all()}});

let ms=[];
function box(){const o=get(),s=$('#sel');document.querySelectorAll('#sz .msel').forEach(e=>e.remove());ms=ms.filter(id=>S.o.some(q=>q.id==id&&!q.hide));if(!o||o.hide||!ms.includes(o.id)||ms.length<2)ms=[];
if(!o||o.hide){s.style.display='none';ctb();return}
Object.assign(s.style,{display:'block',left:o.x*zoom+'px',top:o.y*zoom+'px',width:o.w*zoom+'px',height:bh(o)*zoom+'px',transform:`rotate(${o.r}deg)`,borderStyle:cropId==o.id?'dashed':'solid'});
s.querySelectorAll('.h').forEach(h=>h.style.display=(o.lock||ms.length>1)?'none':'block');
if(ms.length>1)ms.forEach(id=>{const q=S.o.find(z=>z.id==id);if(!q||q.id==o.id)return;const d=document.createElement('div');d.className='msel';Object.assign(d.style,{left:q.x*zoom+'px',top:q.y*zoom+'px',width:q.w*zoom+'px',height:bh(q)*zoom+'px',transform:`rotate(${q.r}deg)`});$('#sz').appendChild(d)});
ctb()};
let ctbS='';
function ctb(){const o=get(),t=$('#ctb');if(!o||o.hide){t.style.display='none';ctbS='';return}const multi=ms.length>1;
const list=multi?[['dup','copy','Duplicate all'],['del','trash-2','Delete all'],['lk','lock','Lock / unlock all'],['al','align-center-horizontal','Align & distribute']]:TB.filter(b=>(b[0]!='cr'&&b[0]!='rp')||o.t=='img');
const sg=[multi,o.id,o.lock,o.t,cropId==o.id].join();if(sg!=ctbS){ctbS=sg;t.innerHTML=list.map(b=>`<button class="b ${(b[0]=='lk'&&o.lock&&!multi)||(b[0]=='cr'&&cropId==o.id)?'on':''}" data-tb="${b[0]}" data-t="${b[2]}">${ic(b[0]=='lk'&&o.lock&&!multi?'lock-open':b[1])}</button>`).join('');ICN()}
t.style.display='flex';let L,T,R,B;const w=$('#ws').getBoundingClientRect();
if(multi){const g=ms.map(id=>S.o.find(q=>q.id==id)).filter(Boolean),c=$('#cv').getBoundingClientRect();L=c.left+Math.min(...g.map(q=>q.x))*zoom;R=c.left+Math.max(...g.map(q=>q.x+q.w))*zoom;T=c.top+Math.min(...g.map(q=>q.y))*zoom;B=c.top+Math.max(...g.map(q=>q.y+bh(q)))*zoom}else{const r=$('#sel').getBoundingClientRect();L=r.left;R=r.right;T=r.top;B=r.bottom}
const tw=t.offsetWidth,th=t.offsetHeight;let x=(L+R)/2-tw/2,y=T-th-(multi?10:42);if(y<w.top+6)y=B+70;x=Math.max(w.left+6,Math.min(x,w.right-tw-6));y=Math.max(w.top+6,Math.min(y,w.bottom-th-60));t.style.left=x+'px';t.style.top=y+'px'};
function groupItems(g){const b=()=>({x1:Math.min(...g.map(q=>q.x)),x2:Math.max(...g.map(q=>q.x+q.w)),y1:Math.min(...g.map(q=>q.y)),y2:Math.max(...g.map(q=>q.y+bh(q)))});
const dist=h=>{if(g.length<3)return toast('Select 3+ objects to distribute');const B=b(),s=[...g].sort((p,q)=>h?p.x-q.x:p.y-q.y),sum=s.reduce((a,q)=>a+(h?q.w:bh(q)),0),gap=((h?B.x2-B.x1:B.y2-B.y1)-sum)/(s.length-1);let p=h?B.x1:B.y1;s.forEach(q=>{if(h)q.x=Math.round(p);else q.y=Math.round(p);p+=(h?q.w:bh(q))+gap})};
return[['align-horizontal-justify-start','Left',()=>{const B=b();g.forEach(q=>q.x=B.x1)}],['align-horizontal-justify-center','Center',()=>{const B=b();g.forEach(q=>q.x=Math.round((B.x1+B.x2)/2-q.w/2))}],['align-horizontal-justify-end','Right',()=>{const B=b();g.forEach(q=>q.x=B.x2-q.w)}],['align-vertical-justify-start','Top',()=>{const B=b();g.forEach(q=>q.y=B.y1)}],['align-vertical-justify-center','Middle',()=>{const B=b();g.forEach(q=>q.y=Math.round((B.y1+B.y2)/2-bh(q)/2))}],['align-vertical-justify-end','Bottom',()=>{const B=b();g.forEach(q=>q.y=B.y2-bh(q))}],['align-horizontal-space-between','Distribute horizontally',()=>dist(1)],['align-vertical-space-between','Distribute vertically',()=>dist(0)]]}
{const _h=$('#ctb').onclick;$('#ctb').onclick=ev=>{const b=ev.target.closest('[data-tb]');if(b&&ms.length>1){ev.stopPropagation();const a=b.dataset.tb,g=ms.map(id=>S.o.find(q=>q.id==id)).filter(Boolean);if(a=='dup')dup();else if(a=='del')del();else if(a=='lk'){const v=!g[0].lock;g.forEach(q=>q.lock=v);push();all()}else if(a=='al')menu(b,groupItems(g));return}_h(ev)}}
function dup(){const o=get();if(!o)return;const nw=[];(ms.length>1?[...ms]:[o.id]).forEach(id=>{const q=S.o.find(z=>z.id==id);if(!q)return;const c=JSON.parse(JSON.stringify(q));c.id=uid++;c.x+=30;c.y+=30;c.name+=' copy';S.o.push(c);nw.push(c.id)});sel=nw[nw.length-1];ms=nw.length>1?nw:[];push();all()};
function del(){const o=get();if(!o)return;const ids=ms.length>1?[...ms]:[o.id];S.o=S.o.filter(q=>!ids.includes(q.id));sel=null;ms=[];push();all()};
{const _d=down;down=function(ev,o){if(ev.button)return;
if(ev.shiftKey){let m=ms.length?[...ms]:(sel?[sel]:[]);if(m.includes(o.id))m=m.filter(i=>i!=o.id);else m.push(o.id);ms=m.length>1?m:[];sel=m.length?m[m.length-1]:null;document.body.classList.add('mp');panels();box();return}
if(ms.length>1&&ms.includes(o.id)){sel=o.id;panels();box();const[sx,sy]=pt(ev),st=ms.map(id=>S.o.find(q=>q.id==id)).filter(q=>q&&!q.lock).map(q=>[q,q.x,q.y]);let mv=0;drag(ev,e=>{const[x,y]=pt(e);mv=1;st.forEach(([q,a,b])=>{q.x=Math.round(a+x-sx);q.y=Math.round(b+y-sy);const el=$(`.o[data-id="${q.id}"]`);el&&(el.style.left=q.x+'px',el.style.top=q.y+'px')});box()},()=>{if(mv){push();rp()}});return}
ms=[];_d(ev,o)}}
function selAll(){const v=S.o.filter(o=>!o.hide);ms=v.length>1?v.map(o=>o.id):[];sel=v.length?v[v.length-1].id:null;panels();box();if(v.length>1)toast(v.length+' objects selected · shift-click to add/remove')}
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='a'&&!/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)&&!kpOpen()){e.preventDefault();selAll()}});

const UP=[],THC={},curS=()=>S;
document.body.insertAdjacentHTML('beforeend','<div id="dlg"><div class="glass"><h4 id="dt"></h4><input type="text" id="dv" autocomplete="off"><div style="display:flex;gap:6px;justify-content:flex-end;margin-top:10px"><button class="b" id="dn">Cancel</button><button class="b pri" id="dk">Save</button></div></div></div>');
function ask(t,d){return new Promise(res=>{const D=$('#dlg'),v=$('#dv');$('#dt').textContent=t;v.value=d;D.style.display='flex';v.focus();v.select();const end=r=>{D.style.display='none';$('#dk').onclick=$('#dn').onclick=v.onkeydown=null;res(r)};$('#dk').onclick=()=>end(v.value.trim()||null);$('#dn').onclick=()=>end(null);v.onkeydown=e=>{if(e.key=='Enter')end(v.value.trim()||null);else if(e.key=='Escape')end(null)}})}
/* history without duplicating image data */
const IMG={},IMR=new Map();let imgN=0;
const hsv=()=>JSON.stringify(S,(k,v)=>{if(k=='src'&&typeof v=='string'&&v.length>300&&v.startsWith('data:')){let r=IMR.get(v);if(!r){r='@img:'+(++imgN);IMR.set(v,r);IMG[r]=v}return r}return v});
const hpar=t=>JSON.parse(t,(k,v)=>typeof v=='string'&&v.startsWith('@img:')?IMG[v]:v);
/* menus */
function menuAt(x,y,items){const m=$('#cm');m.innerHTML=items.map((a,i)=>`<button class="b" data-mi="${i}">${ic(a[0])}${a[1]}</button>`).join('');m.style.display='block';ICN();const mw=m.offsetWidth,mh=m.offsetHeight;m.style.left=Math.max(4,Math.min(x,innerWidth-mw-4))+'px';m.style.top=Math.max(4,Math.min(y,innerHeight-mh-4))+'px';m.querySelectorAll('button').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const it=items[+b.dataset.mi];m.style.display='none';it[2]();if(!it[3]){push();all()}})}
function menu(b,items){const r=b.getBoundingClientRect();menuAt(r.left,r.bottom+6,items)}
let CB=null;
function copyO(){const o=get();if(!o)return toast('Select an object first');CB=(ms.length>1?ms:[o.id]).map(id=>JSON.parse(JSON.stringify(S.o.find(q=>q.id==id))));toast('Copied')}
function pasteO(){if(!CB)return toast('Nothing copied yet');const ids=[];CB.forEach(c=>{const n={...JSON.parse(JSON.stringify(c)),id:uid++};n.x+=30;n.y+=30;S.o.push(n);ids.push(n.id)});CB=CB.map(c=>({...c,x:c.x+30,y:c.y+30}));sel=ids[ids.length-1];ms=ids.length>1?ids:[];push();all()}
function ctx(ev,o){ev.preventDefault();sel=o.id;if(!ms.includes(o.id))ms=[];panels();box();const g=()=>ms.length>1?ms.map(id=>S.o.find(q=>q.id==id)).filter(Boolean):[o];
menuAt(ev.clientX,ev.clientY,[['copy','Duplicate',dup,1],['clipboard-copy','Copy',copyO,1],['clipboard-paste','Paste',pasteO,1],['arrow-up-to-line','Bring to front',()=>g().forEach(q=>zord(q,'front'))],['arrow-up','Bring forward',()=>g().forEach(q=>zord(q,'fwd'))],['arrow-down','Send backward',()=>g().forEach(q=>zord(q,'bwd'))],['arrow-down-to-line','Send to back',()=>g().forEach(q=>zord(q,'back'))],['flip-horizontal-2','Flip horizontal',()=>g().forEach(q=>q.fl=(q.fl||1)*-1)],['lock','Lock / unlock',()=>g().forEach(q=>q.lock=!q.lock)],['eye-off','Hide',()=>{g().forEach(q=>q.hide=true);sel=null;toast('Hidden — show it again in Layers')}],['trash-2','Delete',del,1]])};
/* brand fixes */
applyColor=function(c){const o=get();if(o&&o.t=='img')return toast('Images: use Border color, or pick a text/shape');(ms.length>1?ms.map(id=>S.o.find(q=>q.id==id)):o?[o]:[]).forEach(q=>{q.fill=c;if(q.stops)q.stops[0][1]=c});if(!o){S.bg.c=c;S.bg.g=0}push();all()};
applyGrad=function(g){const o=get();if(o&&o.t=='img')return toast('Gradients apply to text, shapes and the backdrop');(ms.length>1?ms.map(id=>S.o.find(q=>q.id==id)):o?[o]:[]).forEach(q=>{q.g=1;q.fill=g[0];q.c2=g[1];q.stops=null});if(!o){S.bg.c=g[0];S.bg.c2=g[1];S.bg.g=1}push();all()};
/* templates: previews, delete, dialog naming */
const norm=t=>({w:t.w,h:t.h,bg:{...t.bg},o:t.o.map(o=>({id:uid++,x:440,y:230,w:400,h:260,r:0,o:1,rad:0,fill:'#e11d2e',c2:'#ff3b47',g:0,stroke:'#fff',sw:0,fx:'',f:{},fl:1,txt:'',fs:60,fw:700,font:'Inter',ls:0,lh:1.1,al:'left',name:o.t,...o}))});
async function thumb(st){const T=norm(st);await Promise.all(T.o.filter(o=>o.font).map(o=>(document.fonts?document.fonts.load(`${o.fw} 40px '${o.font}'`).catch(()=>0):0)));const c=await drawAll(T),s=document.createElement('canvas');const k=Math.min(1,360/c.width,360/c.height);s.width=Math.round(c.width*k);s.height=Math.round(c.height*k);s.getContext('2d').drawImage(c,0,0,s.width,s.height);return s.toDataURL('image/jpeg',.8)}
const sty=(d,u)=>{if(d)d.style.background=`url(${u}) center/contain no-repeat #000`};
{const _b=bindL;bindL=function(p){_b(p);
p.querySelectorAll('[data-up]').forEach(e=>e.onclick=()=>addImg(UP[+e.dataset.up],{name:'Upload'}));
p.querySelectorAll('[data-tpl]').forEach(async e=>{try{const k=e.dataset.tpl;sty(e.firstElementChild,THC[k]||(THC[k]=await thumb(TPL[k])))}catch(x){}});
p.querySelectorAll('[data-my]').forEach(async e=>{const i=+e.dataset.my;e.insertAdjacentHTML('beforeend',`<b class="rm" title="Delete template">×</b>`);e.querySelector('.rm').onclick=ev=>{ev.stopPropagation();const m=tplGet();m.splice(i,1);try{localStorage.setItem('ws_tpl',JSON.stringify(m))}catch(x){}lp()};try{const m=tplGet()[i];sty(e.firstElementChild,m.th||await thumb({...m.s,w:m.w||1280,h:m.h||720}))}catch(x){}})}}
$('#savetpl').onclick=async()=>{const n=await ask('Save as template','My Template');if(!n)return;const st=JSON.parse(sv());let th='';try{th=await thumb({...st,w:W,h:H})}catch(e){}const m=tplGet();m.push({n,s:st,th,w:W,h:H});try{localStorage.setItem('ws_tpl',JSON.stringify(m));toast('Saved to My Templates')}catch(e){toast('Storage full — template not saved')}setTab('templates')};
/* shortcuts: copy/paste, multi nudge, undoable nudge, gutter deselect, ctrl+wheel zoom */
const inField=e=>/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)&&(e.target.type!='range'||!(e.ctrlKey||e.metaKey));
addEventListener('keydown',e=>{if(inField(e))return;const c=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();if(c&&k=='c'){if(get()){e.preventDefault();copyO()}}else if(k=='escape'){$('#cm').style.display='none'}
else if(k.startsWith('arrow')&&ms.length>1){e.preventDefault();const d=e.shiftKey?10:1;ms.forEach(id=>{const q=S.o.find(z=>z.id==id);if(q&&!q.lock&&q.id!=sel){if(k=='arrowleft')q.x-=d;if(k=='arrowright')q.x+=d;if(k=='arrowup')q.y-=d;if(k=='arrowdown')q.y+=d}});render()}});
addEventListener('keyup',e=>{if(!inField(e)&&e.key.startsWith('Arrow')&&get())push()});
addEventListener('paste',e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName))return;const it=[...(e.clipboardData?.items||[])].find(i=>i.type.startsWith('image/'));if(it){e.preventDefault();readF(it.getAsFile())}else if(CB){e.preventDefault();pasteO()}});
$('#scroll').addEventListener('pointerdown',e=>{if(e.target.id=='scroll'||e.target.id=='sz'){sel=null;ms=[];cropId=null;panels();box()}});
$('#ws').addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();setZ(zoom*(e.deltaY<0?1.1:.9))}},{passive:false});
ICN();

(()=>{const s=$('#sel'),D=['nw','n','ne','e','se','s','sw','w'],CUR={nw:'nwse',se:'nwse',ne:'nesw',sw:'nesw',n:'ns',s:'ns',e:'ew',w:'ew'};
s.innerHTML=D.map(d=>`<div class="h ${d.length>1?'cn':'ed'}" data-d="${d}" style="cursor:${CUR[d]}-resize"></div>`).join('')+'<div class="h rot" data-t="Rotate (Shift = 15° steps)"><svg viewBox="0 0 24 24" fill="none" stroke="#8f0f1a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg></div>';
function rs(ev,d){ev.preventDefault();ev.stopPropagation();const o=get();if(!o||o.lock)return;const oh=bh(o),rd=o.r*Math.PI/180,c=Math.cos(rd),sn=Math.sin(rd),cx=o.x+o.w/2,cy=o.y+oh/2,ratio=o.w/Math.max(1,oh),ow=o.w,oth=S.o.filter(q=>q!==o&&!q.hide),ln=o.t=='line';
drag(ev,e=>{const[px,py]=pt(e),dx=px-cx,dy=py-cy,lx=dx*c+dy*sn,ly=-dx*sn+dy*c;let L=-ow/2,R=ow/2,T=-oh/2,B=oh/2;
if(d.includes('e'))R=lx;if(d.includes('w'))L=lx;if(!ln){if(d.includes('s'))B=ly;if(d.includes('n'))T=ly}
const gs=[];if(snap&&!o.r){const th=8/zoom,tx=[0,W/2,W],ty=[0,H/2,H];oth.forEach(q=>{tx.push(q.x,q.x+q.w/2,q.x+q.w);ty.push(q.y,q.y+bh(q)/2,q.y+bh(q))});const f=(v,tg)=>{for(const t of tg)if(Math.abs(t-v)<th)return t;return null};let t;
if(d.includes('e')&&(t=f(cx+R,tx))!==null){R=t-cx;gs.push(['v',t])}if(d.includes('w')&&(t=f(cx+L,tx))!==null){L=t-cx;gs.push(['v',t])}
if(!ln){if(d.includes('s')&&(t=f(cy+B,ty))!==null){B=t-cy;gs.push(['h',t])}if(d.includes('n')&&(t=f(cy+T,ty))!==null){T=t-cy;gs.push(['h',t])}}}
if(R-L<20){if(d.includes('e'))R=L+20;else L=R-20}if(!ln&&B-T<20){if(d.includes('s'))B=T+20;else T=B-20}
if(e.shiftKey&&!ln&&d.length==2){const h=(R-L)/ratio;if(d.includes('n'))T=B-h;else B=T+h}
const w=R-L,mx=(L+R)/2,my=ln?0:(T+B)/2,wx=cx+mx*c-my*sn,wy=cy+mx*sn+my*c;o.w=Math.round(w);if(!ln)o.h=Math.round(B-T);o.x=Math.round(wx-o.w/2);o.y=Math.round(wy-bh(o)/2);
if(o.t=='text'&&(d.includes('n')||d.includes('s')))o.fs=Math.max(8,Math.round(o.h*.6));
RF(()=>{render();clrG();gs.forEach(g=>g[0]=='v'?gl('v',g[1],0,H):gl('h',g[1],0,W))})},()=>{cancelAnimationFrame(_rq);render();clrG();push();rp()})}
s.querySelectorAll('.h:not(.rot)').forEach(h=>h.onpointerdown=ev=>rs(ev,h.dataset.d));
s.querySelector('.rot').onpointerdown=ev=>{ev.preventDefault();ev.stopPropagation();const o=get();if(!o||o.lock)return;drag(ev,e=>{const[x,y]=pt(e);let a=Math.atan2(y-(o.y+bh(o)/2),x-(o.x+o.w/2))*180/Math.PI-90;a=((a+540)%360)-180;const st=e.shiftKey?15:45,m=((a%st)+st)%st;if(m<4||m>st-4)a=Math.round(a/st)*st;o.r=Math.round(a);RF(render)},()=>{cancelAnimationFrame(_rq);render();push();rp()})};
const _bx=box;box=function(){_bx();const o=get();if(!o||o.hide)return;s.classList.toggle('sm-w',o.w*zoom<90);s.classList.toggle('sm-h',bh(o)*zoom<90);s.classList.toggle('ln',o.t=='line')};
})();
document.addEventListener('mouseover',()=>{const t=$('#tt');if(t.style.display=='block'){t.style.left=Math.max(6,Math.min(parseFloat(t.style.left)||0,innerWidth-t.offsetWidth-6))+'px'}});
setTimeout(()=>{fit();box()},80);

let _rq=0;const RF=f=>{cancelAnimationFrame(_rq);_rq=requestAnimationFrame(f)};
const hx=c=>{let h=String(c||'').replace('#','');if(h.length==3)h=h.replace(/./g,'$&$&');if(!/^[0-9a-f]{6}$/i.test(h))return[0,0,0];const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255].map(v=>+(v/255).toFixed(3))};
const rga=(c,a)=>`rgba(${hx(c).map(v=>Math.round(v*255))},${a})`;
const bgc=o=>o.fxc&&o.fxc!=o.fill?o.fxc:(String(o.fill).toLowerCase()=='#e11d2e'?'#111111':'#e11d2e');
const TXF=['hollow','echo','lift','box','splice'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-fx]');if(b&&TXF.includes(b.dataset.fx)){const o=get();if(o&&o.t!='text'){e.stopImmediatePropagation();toast('This effect is for text only')}}},true);
{const _ts=tshadow;tshadow=function(o){const t=fi(o),c=fc(o);if(o.fx=='echo')return`${12*t}px ${12*t}px 0 ${rga(c,.5)},${24*t}px ${24*t}px 0 ${rga(c,.25)}`;if(o.fx=='lift')return`0 ${5*t}px ${14*t}px rgba(0,0,0,.45)`;return _ts(o)}}
{const _f=fxf;fxf=function(o){const r=_f(o);return o.duo?(r+' url(#wsduo'+o.id+')').trim():r}}
{const _u=updDefs;updDefs=function(){_u();const d=S.o.filter(o=>o.duo&&!o.hide).map(o=>{const a=hx(o.duo[0]),b=hx(o.duo[1]);return`<filter id="wsduo${o.id}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${a[0]} ${b[0]}"/><feFuncG type="table" tableValues="${a[1]} ${b[1]}"/><feFuncB type="table" tableValues="${a[2]} ${b[2]}"/></feComponentTransfer></filter>`}).join('');if(d)$('#fxdefs').insertAdjacentHTML('beforeend',d)}}
{const _r=render;render=function(){_r();S.o.forEach(o=>{if(o.hide)return;const e=$(`.o[data-id="${o.id}"]`);if(!e)return;
if(o.t=='text'){if(o.it)e.style.fontStyle='italic';if(o.fx=='hollow'){e.style.background='none';e.style.color='transparent';e.style.webkitTextStroke=3*fi(o)+'px '+o.fill}
else if(o.fx=='box'){e.style.background=bgc(o);e.style.webkitBackgroundClip='border-box';e.style.color=o.fill;e.style.borderRadius='14px'}}
else if(o.t=='img'){if(o.cp)e.style.clipPath=o.cp;if(o.vg&&o.iw){const v=document.createElement('div');v.style.cssText=`position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,${o.vg}) 100%)`;e.appendChild(v)}}})}}
function MK(x,o){x.beginPath();if(o.cp){[...o.cp.matchAll(/([\d.]+)%\s+([\d.]+)%/g)].forEach((m,i)=>x[i?'lineTo':'moveTo'](m[1]/100*o.w,m[2]/100*o.h));x.closePath()}else x.roundRect(0,0,o.w,o.h,o.rc||o.rad)}
function VG(x,o){if(!o.vg)return;x.save();x.filter='none';x.shadowColor='transparent';x.translate(o.w/2,o.h/2);x.scale(1,o.h/o.w);const r=o.w/2*Math.SQRT2,g=x.createRadialGradient(0,0,r*.45,0,0,r);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${o.vg})`);x.fillStyle=g;x.fillRect(-o.w/2,-o.w/2,o.w,o.w);x.restore()}
/* canvas sizes */
const PRE=[['YouTube',1280,720],['Full HD',1920,1080],['Square',1080,1080],['Story',1080,1920],['Facebook',1200,630],['Banner',1500,500]];
function setCanvas(w,h){W=w;H=h;const c=$('#cv');c.style.width=w+'px';c.style.height=h+'px';fit();all();toast(w+' × '+h)}
/* panels: sizes, italic, masks, duotone, vignette */
{const _rp=rp;rp=function(){_rp();const o=get(),p=$('#rp');
if(!o){p.insertAdjacentHTML('beforeend',`<h4 style="margin-top:14px">${ic('ruler')} Canvas size</h4><div class="g2">${PRE.map((s,i)=>`<button class="b ${s[1]==W&&s[2]==H?'on':''}" data-pre="${i}" style="flex-direction:column;gap:2px"><b>${s[0]}</b><span class="mu">${s[1]}×${s[2]}</span></button>`).join('')}</div>`);ICN();p.querySelectorAll('[data-pre]').forEach(b=>b.onclick=()=>{const s=PRE[+b.dataset.pre];setCanvas(s[1],s[2])});return}
const st=[...p.querySelectorAll('h4')].find(h=>/State/.test(h.textContent));if(!st)return;let h='';
if(o.t=='text')h=`<div class="seg"><button class="b ${o.it?'on':''}" data-it>${ic('italic')}Italic</button></div>`;
if(o.t=='img'){const M=['none','circle','rounded','star','hex','triangle'],cur=o.cp?(M.find(k=>SH[k]&&SH[k].cp==o.cp)||''):o.rad>=999?'circle':o.rad==48?'rounded':!o.rad?'none':'';
h=`<h4>${ic('shapes')} Mask</h4><div class="seg">${M.map(k=>`<button class="b ${k==cur?'on':''}" data-mk="${k}">${k}</button>`).join('')}</div><h4>${ic('contrast')} Duotone &amp; vignette</h4><div style="display:flex;gap:8px;align-items:center"><button class="b ${o.duo?'on':''}" data-du>${ic('droplets')}Duotone</button>${o.duo?`<input type="color" data-dc="0" value="${o.duo[0]}"><input type="color" data-dc="1" value="${o.duo[1]}">`:''}</div><label class="r">Vignette<input type="range" min="0" max="1" step=".05" value="${o.vg||0}" data-vg><span>${o.vg||0}</span></label>`}
st.insertAdjacentHTML('beforebegin',h);ICN();
p.querySelectorAll('[data-it]').forEach(b=>b.onclick=()=>{o.it=!o.it;push();all()});
p.querySelectorAll('[data-mk]').forEach(b=>b.onclick=()=>{const k=b.dataset.mk;o.cp=null;o.rc=null;o.rad=0;if(k=='circle')o.rad=9999;else if(k=='rounded')o.rad=48;else if(k!='none')o.cp=SH[k].cp;push();all()});
const du=p.querySelector('[data-du]');if(du)du.onclick=()=>{o.duo=o.duo?null:['#0a0a0a','#ff3b47'];push();all()};
p.querySelectorAll('[data-dc]').forEach(i=>{i.oninput=()=>{o.duo[+i.dataset.dc]=i.value;render()};i.onchange=()=>push()});
const vg=p.querySelector('[data-vg]');if(vg){vg.oninput=()=>{o.vg=+vg.value;vg.nextElementSibling.textContent=vg.value;render()};vg.onchange=()=>push()}}}
/* live size/angle readout */
{const s=$('#sel');s.insertAdjacentHTML('beforeend','<div class="rdo"></div>');s.addEventListener('pointerdown',e=>{if(e.target.closest('.h'))document.body.classList.add('dr')},true);addEventListener('pointerup',()=>document.body.classList.remove('dr'));addEventListener('pointercancel',()=>document.body.classList.remove('dr'));
const _b=box;box=function(){_b();const o=get(),r=s.querySelector('.rdo');if(!o||o.hide||!r)return;r.textContent=`${o.w} × ${bh(o)}  ·  ${o.r}°`;r.style.transform=`translateX(-50%) rotate(${-o.r}deg)`}}
/* autosave */
let _st=0,_wn=0;const sched=()=>{clearTimeout(_st);_st=setTimeout(()=>{try{localStorage.setItem('ws_auto',JSON.stringify({S,W,H}))}catch(e){if(!_wn){_wn=1;toast('Autosave paused: project too big for browser storage')}}},900)};
/* init + restore last session */
S={o:[],bg:{c:'#0a0a0a',c2:'#0a0a0a',g:0,a:135}};hist=[hsv()];
try{const a=JSON.parse(localStorage.getItem('ws_auto')||'null');if(a&&a.S&&a.S.o&&a.S.o.length){W=a.W||W;H=a.H||H;const c=$('#cv');c.style.width=W+'px';c.style.height=H+'px';S=a.S;uid=Math.max(0,...S.o.map(o=>o.id||0))+1;hist=[hsv()];fut=[];sel=null;all();fit();toast('Restored your last session')}}catch(e){}
rp();

let CELL=12;
const MC=document.createElement('canvas').getContext('2d');
function arc(o){MC.font=`${o.it?'italic ':''}${o.fw} ${o.fs}px '${o.font}'`;try{MC.letterSpacing=o.ls+'px'}catch(e){}const ch=[...o.txt.replace(/\n/g,' ')],ws=ch.map(c=>MC.measureText(c).width),L=ws.reduce((a,b)=>a+b,0)||1,th=Math.max(.05,Math.abs(o.cv)/100*Math.PI),R=L/th,sg=o.cv>0?1:-1,cx=o.w/2,cy=o.h/2+sg*R;let s=0;return ch.map((c,i)=>{const m=s+ws[i]/2;s+=ws[i];const p=(m-L/2)/R;return{ch:c,x:cx+R*Math.sin(p),y:cy-sg*R*Math.cos(p),a:sg*p}})}
const TD=(x,o,l,px,y,fs)=>{const k=o.fx,t=fi(o),c=o.fxc||o.fill;
if(k=='hollow'){x.save();x.lineWidth=3*t;x.lineJoin='round';x.strokeStyle=fs;x.strokeText(l,px,y);x.restore();return}
if(k=='splice'&&!o.cv){x.save();x.lineWidth=3;x.lineJoin='round';x.strokeStyle=c;x.strokeText(l,px+10*t,y+10*t);x.restore()}
if(k=='echo')[[24,.25],[12,.5]].forEach(([d,a])=>{x.save();x.globalAlpha*=a;x.fillStyle=c;x.fillText(l,px+d*t,y+d*t);x.restore()});
if(k=='lift'){x.save();x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=14*t;x.shadowOffsetY=5*t;x.fillText(l,px,y);x.restore();return}
x.fillText(l,px,y)};
function TX(x,o,l,px,y,i,fs){if(o.fx=='box'&&i==0){x.save();x.shadowColor='transparent';x.fillStyle=bgc(o);x.beginPath();x.roundRect(0,0,o.w,o.h,14);x.fill();x.restore()}
if(!o.cv){TD(x,o,l,px,y,fs);return}if(i)return;x.save();x.textAlign='center';try{x.letterSpacing='0px'}catch(e){}x.fillStyle=o.fill;arc(o).forEach(q=>{x.save();x.translate(q.x,q.y);x.rotate(q.a);TD(x,o,q.ch,0,0,o.fill);x.restore()});x.restore()};
{const _fm=fxmask;fxmask=function(x,o){_fm(x,o);if(o.fe&&o.t=='img'){x.save();x.filter='none';x.shadowColor='transparent';x.globalAlpha=1;x.globalCompositeOperation='destination-in';x.translate(o.w/2,o.h/2);x.scale(1,o.h/o.w);const r=o.w/2,g=x.createRadialGradient(0,0,r*(1-o.fe),0,0,r);g.addColorStop(0,'#000');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(-o.w/2,-o.w/2,o.w,o.w);x.restore()}}}
{const _r=render;render=function(){_r();S.o.forEach(o=>{if(o.hide)return;const e=$(`.o[data-id="${o.id}"]`);if(!e)return;
if(o.t=='text'){if(o.fx=='splice'&&!o.cv){e.classList.add('sp');e.dataset.txt=o.txt;e.style.setProperty('--sc',fc(o));e.style.setProperty('--so',10*fi(o)+'px')}
if(o.cv){e.textContent='';e.style.webkitBackgroundClip='border-box';e.style.background=o.fx=='box'?bgc(o):'none';if(o.fx!='hollow')e.style.color=o.fill;arc(o).forEach(q=>{const s=document.createElement('span');s.textContent=q.ch;s.style.cssText=`position:absolute;left:${q.x}px;top:${q.y}px;letter-spacing:0;white-space:pre;transform:translate(-50%,-50%) rotate(${q.a}rad)`;e.appendChild(s)})}}
if(o.rc&&['rect','glass','img'].includes(o.t))e.style.borderRadius=o.rc.map(v=>v+'px').join(' ');
if(o.t=='img'&&o.fe&&o.fx!='scan'&&o.fx!='grain')e.style.webkitMaskImage=e.style.maskImage=`radial-gradient(ellipse closest-side at 50% 50%,#000 ${(1-o.fe)*100}%,transparent 100%)`})}}
if(document.fonts)document.fonts.addEventListener('loadingdone',()=>RF(render));
document.addEventListener('input',e=>{if(e.target.dataset&&e.target.dataset.p=='rad'){const o=get();if(o)o.rc=null}},true);
/* pixelate / halftone (baked into the image, undoable) */
async function bake(o,kind,n){const im=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=o.src});if(!im)return toast('Could not read image');
const k=Math.min(1,1600/Math.max(im.width,im.height)),w=Math.max(1,Math.round(im.width*k)),h=Math.max(1,Math.round(im.height*k)),c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');let png=1;
if(kind=='px'){const s=document.createElement('canvas');s.width=Math.max(1,Math.round(w/n));s.height=Math.max(1,Math.round(h/n));s.getContext('2d').drawImage(im,0,0,s.width,s.height);x.imageSmoothingEnabled=false;x.drawImage(s,0,0,w,h)}
else{png=0;x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;x.fillStyle='#fff';x.fillRect(0,0,w,h);x.fillStyle='#111';for(let y=0;y<h;y+=n)for(let a=0;a<w;a+=n){let L=0,m=0;for(let yy=y;yy<Math.min(h,y+n);yy+=2)for(let xx=a;xx<Math.min(w,a+n);xx+=2){const i=(yy*w+xx)*4,al=d[i+3]/255;L+=(.299*d[i]+.587*d[i+1]+.114*d[i+2])*al+255*(1-al);m++}L/=m*255;const r=n*.55*Math.sqrt(1-L);if(r>.3){x.beginPath();x.arc(a+n/2,y+n/2,r,0,7);x.fill()}}}
o.src=c.toDataURL(png?'image/png':'image/jpeg',.92);o.iw=w;o.ih=h;push();all();toast(kind=='px'?'Pixelated':'Halftone applied')}
/* grouping */
function grp(){if(ms.length<2)return toast('Select 2+ objects first (Shift-click or Ctrl+A)');const g=uid++;ms.forEach(id=>{const q=S.o.find(z=>z.id==id);if(q)q.gid=g});push();all();toast('Grouped')}
function ungrp(){const o=get();if(!o||!o.gid)return toast('Not a group');const g=o.gid;S.o.forEach(q=>{if(q.gid==g)delete q.gid});ms=[];push();all();toast('Ungrouped')}
{const _d=down;down=function(ev,o){if(o.gid&&!ev.shiftKey&&!ev.button){const g=S.o.filter(q=>q.gid==o.gid&&!q.hide);if(g.length>1){ms=g.map(q=>q.id);sel=o.id;document.body.classList.add('mp')}}_d(ev,o)}}
const regid=n=>{const m={};let ch=0;S.o.slice(n).forEach(q=>{if(q.gid){m[q.gid]=m[q.gid]||uid++;q.gid=m[q.gid];ch=1}});if(ch)push()};
{const _u=dup;dup=function(){const n=S.o.length;_u();regid(n)};const _p=pasteO;pasteO=function(){const n=S.o.length;_p();regid(n)}}
{const _c=ctb;ctb=function(){_c();const t=$('#ctb'),o=get();if(!o||o.hide)return;const ids=ms.length>1?ms:[o.id],gs=ids.map(id=>(S.o.find(q=>q.id==id)||{}).gid),same=gs[0]&&gs.every(g=>g==gs[0]),need=ids.length>1?(same?'ug':'gp'):(o.gid?'ug':'');
t.querySelectorAll('[data-tb=gp],[data-tb=ug]').forEach(b=>{if(b.dataset.tb!=need)b.remove()});if(need&&!t.querySelector(`[data-tb=${need}]`)){t.insertAdjacentHTML('beforeend',`<button class="b" data-tb="${need}" data-t="${need=='gp'?'Group (Ctrl+G)':'Ungroup (Ctrl+Shift+G)'}">${ic(need=='gp'?'group':'ungroup')}</button>`);ICN()}}}
$('#ctb').addEventListener('click',e=>{const b=e.target.closest('[data-tb=gp],[data-tb=ug]');if(!b)return;e.stopImmediatePropagation();e.stopPropagation();b.dataset.tb=='gp'?grp():ungrp()},true);
addEventListener('keydown',e=>{if(inField(e)||!(e.ctrlKey||e.metaKey)||e.key.toLowerCase()!='g')return;e.preventDefault();e.shiftKey?ungrp():grp()});
/* panels */
{const _rp=rp;rp=function(){_rp();const o=get(),p=$('#rp');if(!o)return;const st=[...p.querySelectorAll('h4')].find(h=>/State/.test(h.textContent));if(!st)return;let h='';
const R=(l,a,min,max,stp,v)=>`<label class="r">${l}<input type="range" min="${min}" max="${max}" step="${stp}" value="${v}" ${a}><span>${v}</span></label>`;
if(o.t=='text')h+=R('Curve','data-cv',-100,100,1,o.cv||0);
if(o.t=='img')h+=`<h4>${ic('sparkles')} Edge &amp; pixel</h4>`+R('Feather','data-fe',0,1,.05,o.fe||0)+R('Cell size','data-cs',4,40,1,CELL)+`<div class="seg"><button class="b" data-bk="px">${ic('grid-3x3')}Pixelate</button><button class="b" data-bk="ht">${ic('circle-dot')}Halftone</button></div>`;
if(['rect','glass','img'].includes(o.t)){const rc=o.rc||[0,1,2,3].map(()=>Math.min(300,o.rad||0));h+=`<h4>${ic('square')} Corners</h4>`+['TL','TR','BR','BL'].map((l,i)=>R(l,`data-rc="${i}"`,0,300,1,rc[i])).join('')+`<button class="b" data-rcx>${ic('rotate-ccw')}Reset corners</button>`}
if(o.gid)h+=`<button class="b" data-ug style="margin:8px 0">${ic('ungroup')}Ungroup</button>`;
st.insertAdjacentHTML('beforebegin',h);ICN();const q=(s,f)=>p.querySelectorAll(s).forEach(f);
q('[data-cv]',i=>{i.oninput=()=>{o.cv=+i.value;i.nextElementSibling.textContent=i.value;RF(render)};i.onchange=()=>push()});
q('[data-fe]',i=>{i.oninput=()=>{o.fe=+i.value;i.nextElementSibling.textContent=i.value;RF(render)};i.onchange=()=>push()});
q('[data-cs]',i=>i.oninput=()=>{CELL=+i.value;i.nextElementSibling.textContent=i.value});q('[data-bk]',b=>b.onclick=()=>bake(o,b.dataset.bk,CELL));
q('[data-rc]',i=>{i.oninput=()=>{o.rc=o.rc||[0,1,2,3].map(()=>Math.min(300,o.rad||0));o.rc[+i.dataset.rc]=+i.value;i.nextElementSibling.textContent=i.value;RF(render)};i.onchange=()=>push()});
q('[data-rcx]',b=>b.onclick=()=>{o.rc=null;push();all()});q('[data-ug]',b=>b.onclick=ungrp)}}
all();lp();fit();

{const T=['black','charcoal','crimson'],N={black:'Black + red',charcoal:'Charcoal + red',crimson:'Deep crimson'};let t=null;try{t=localStorage.getItem('ws_theme')}catch(e){}if(!T.includes(t))t='black';document.documentElement.dataset.theme=t;
$('#exp').insertAdjacentHTML('beforebegin','<button class="b" id="thm" data-t="Switch color theme"><i data-lucide="palette"></i></button>');
$('#thm').onclick=()=>{t=T[(T.indexOf(t)+1)%T.length];document.documentElement.dataset.theme=t;try{localStorage.setItem('ws_theme',t)}catch(e){}toast(N[t])};ICN()};

/* === Live Replace + Effects Studio + Command Palette (patch) === */
(()=>{
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const css=document.createElement('style');css.textContent=`
#swb{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;background:rgba(30,12,16,.96);border:1px solid #ff3b47;color:#fff;font-size:12px;line-height:1.4;position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:9000;max-width:92vw;box-shadow:0 8px 30px rgba(0,0,0,.5)}
#swb a{color:#ff6b74;text-decoration:underline;cursor:pointer}
/* effects studio */
#fxb{position:sticky;top:-8px;z-index:4;display:flex;align-items:center;gap:6px;padding:7px 9px;margin:-2px 0 8px;border-radius:10px;background:rgba(32,12,16,.97);border:1px solid #ff3b47;font-size:11.5px;box-shadow:0 6px 18px rgba(0,0,0,.4)}
#fxb span{flex:1}#fxb .b{padding:4px 10px}
.fxh{display:flex;align-items:baseline;gap:8px;margin:0 0 8px}.fxh b{font-size:14px;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fxh small{opacity:.55;font-size:11px}
.fxt{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-bottom:8px}.fxt .b{flex-direction:column;justify-content:center;gap:2px;padding:6px 2px;font-size:10px;text-align:center}.fxt .b svg{width:15px;height:15px}.fxt .b[disabled]{opacity:.35;pointer-events:none}
.fxsv{display:flex;gap:6px;margin-bottom:8px}.fxsv input{flex:1;min-width:0}
.fxs,.fxsv input{padding:7px 10px;border-radius:9px;border:1px solid var(--gb);background:rgba(255,255,255,.05);color:inherit;font:inherit;font-size:12px}.fxs{width:100%;margin:8px 0 2px}
.fxsec2{margin:12px 0 5px;font-size:10.5px;text-transform:uppercase;letter-spacing:.09em;opacity:.65;display:flex;gap:6px;align-items:baseline}.fxsec2 small{text-transform:none;letter-spacing:0;opacity:.7}
.fxg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.fxk{position:relative;border-radius:10px;border:1px solid var(--gb);background:#0c0c0e;cursor:pointer;padding:0;overflow:hidden;color:inherit;display:flex;flex-direction:column;align-items:center;transition:.14s;font:inherit}
.fxk:hover{border-color:#ff6b74;transform:translateY(-1px)}.fxk.on{border-color:#ff3b47;box-shadow:0 0 0 1px #ff3b47 inset,0 0 14px rgba(255,59,71,.25)}.fxk.dis{opacity:.3}
.fxk .sm{height:52px;width:100%;display:grid;place-items:center;background:#16161b}.fxk .sm span{font:800 25px/1.1 Inter,system-ui,sans-serif;color:#fff}
.fxk em{font-style:normal;font-size:10px;padding:4px 3px;opacity:.85;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fxk i.n{position:absolute;top:3px;right:3px;background:#ff3b47;color:#fff;border-radius:8px;font:700 9px/1 Inter,sans-serif;padding:2px 5px;font-style:normal}
.fxlk{display:flex;gap:6px;overflow-x:auto;padding:2px 2px 8px;scrollbar-width:thin}.fxlk .fxk{flex:0 0 84px}
.fxk .x{position:absolute;top:2px;left:4px;font-size:10px;opacity:.7;display:none;z-index:2;padding:1px 3px;background:rgba(0,0,0,.6);border-radius:5px}.fxk:hover .x{display:block}
.fxr{display:grid;grid-template-columns:minmax(60px,1fr) 26px minmax(70px,1.3fr) 20px;gap:7px;align-items:center;font-size:12px;margin:4px 0;padding:5px 8px;border-radius:9px;background:rgba(255,255,255,.05)}
.fxr input[type=color]{width:26px;height:22px;padding:0;border:0;background:none;cursor:pointer}.fxr input[type=range]{width:100%}.fxr button{background:none;border:0;color:#ff6b74;cursor:pointer;font-size:13px}
.fxm{display:flex;align-items:center;gap:8px;font-size:11px;opacity:.85;margin-top:6px}.fxm input{flex:1}
.fxe{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;padding:30px 12px;opacity:.7;font-size:12px}.fxe svg{width:28px;height:28px}.fxe b{font-size:14px}
/* command palette */
#kpb{width:min(640px,94vw)!important;max-height:70vh!important}
#kctx{font-size:11px;opacity:.6;padding:7px 4px 0}
.ki{gap:11px!important}.ki .ico{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.07);flex:none}.ki .ico svg{width:15px;height:15px}
.ki .kl{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ki mark{background:none;color:#ff6b74;font-weight:700}
.ki.dis{opacity:.42}.ki .kb{font-size:10px;opacity:.55;padding:2px 7px;border-radius:6px;background:rgba(255,255,255,.07);white-space:nowrap}
.ki kbd{font:600 10px Inter,sans-serif;opacity:.7;padding:2px 6px;border-radius:5px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.12)}
.kh{font-size:10px;letter-spacing:.09em;text-transform:uppercase;opacity:.5;padding:9px 10px 3px}
#kfoot{display:flex;gap:14px;flex-wrap:wrap;font-size:10.5px;opacity:.55;padding:8px 6px 0;border-top:1px solid var(--gb);margin-top:6px}
/* v3: clickable, gap-free, icon-based */
#swb[hidden],#fxb[hidden]{display:none!important}
#swb{top:64px;gap:12px;padding:10px 12px 10px 14px;border-radius:14px;font-size:13px;background:rgba(24,10,14,.98);align-items:center}
#swb>span,#fxb>span{flex:1}
#swb svg,#fxb svg{width:17px;height:17px;flex:none}
#swb .b,#fxb .b{min-height:38px;padding:8px 14px;font-weight:600}
.btn-ok{background:#e11d2e!important;border-color:#ff3b47!important;color:#fff!important}
#fxb{padding:8px 10px;gap:8px;font-size:12.5px}
.fxh b{font-size:15px}
.fxt{gap:6px}.fxt .b{min-height:54px;font-size:11px;border-radius:12px}.fxt .b svg{width:18px;height:18px}
.fxg,.fxlk{display:flex;flex-wrap:wrap;gap:6px;overflow:visible;padding:0}
.fxg .fxk{flex:1 1 90px}.fxlk .fxk{flex:1 1 72px}
.fxk{min-height:78px;border-radius:12px}.fxk .sm{height:56px}.fxlk .sm{height:46px}.fxk em{font-size:11px;padding:5px 3px}.fxk em svg{width:11px;height:11px;vertical-align:-1px;margin-right:3px}
.fxk i.n{width:18px;height:18px;display:grid;place-items:center;padding:0;border-radius:50%}.fxk i.n svg{width:11px;height:11px;stroke-width:3}
.fxk .x{width:22px;height:22px;display:none;place-items:center;top:3px;left:3px;padding:0;border-radius:50%;background:rgba(0,0,0,.7)}.fxk:hover .x{display:grid}.fxk .x svg{width:12px;height:12px}
.fxr{min-height:42px;grid-template-columns:minmax(64px,1fr) 30px minmax(80px,1.4fr) 28px;gap:8px;padding:6px 8px}
.fxr input[type=color]{width:30px;height:26px;border-radius:6px}
.fxr button{width:28px;height:28px;display:grid;place-items:center;border-radius:8px;background:rgba(255,255,255,.07);color:#ff8a92}.fxr button:hover{background:rgba(255,59,71,.25)}.fxr button svg{width:14px;height:14px}
.fxsw{position:relative;margin:10px 0 2px}.fxsw>svg{position:absolute;left:11px;top:50%;transform:translateY(-50%);width:15px;height:15px;opacity:.55;pointer-events:none}.fxsw .fxs{margin:0;padding:10px 12px 10px 34px}
.fxsec2{margin:14px 0 6px;font-size:11px}
.ki{padding:11px 12px!important}
#kfoot span{display:inline-flex;align-items:center;gap:5px}#kfoot svg{width:12px;height:12px}
`;
document.head.append(css);

/* ================= EFFECTS ENGINE ================= */
const STRUCT=['glass','grain','scan','metal','hollow','box','splice','echo','lift','outline','sticker','distort'],
FILT=['rgb','chroma','emboss'],
DC={glow:'#00e5ff',neon:'#ff2bd6',soft:'#000000',hard:'#000000',inner:'#ff2d55',long:'#000000',d3:'#000000'},
NOCOL=['glass','grain','scan','metal','distort','emboss','soft','lift','rgb','chroma'],
NAMES=Object.fromEntries(FXL.filter(f=>f[0]).map(f=>[f[0],f[2]])),
CATS=[['Glow & Light',['neon','glow','inner','glass']],['Shadow & Depth',['soft','hard','long','d3','lift','echo','emboss']],['Outline & Shape',['outline','sticker','hollow','box','splice']],['Texture & Glitch',['metal','grain','scan','rgb','chroma','distort']]],
B=(n,f,sw)=>({n,list:f.map(([k,c,i])=>({k,c,i:i??1})),sw}),
BUILT=[
 B('Neon Sign',[['neon','#ff2bd6',1.6],['soft','#000000',1.2]]),
 B('Comic Pop',[['sticker'],['hard','#000000',1.4]],10),
 B('Retro 3D',[['d3','#000000',1.3],['glow','#ffb300',.6]]),
 B('Glitch',[['rgb',,1.5],['glow','#00e5ff',.8],['scan',,.8]]),
 B('Gold',[['metal'],['soft','#000000',1.3],['glow','#ffb300',.5]]),
 B('Fire',[['neon','#ff5a00',1.8],['glow','#ffd000',.8]]),
 B('Ice',[['glass'],['glow','#7fd8ff',.9]]),
 B('Vintage',[['grain'],['chroma',,.8],['soft','#000000',1]]),
 B('Hologram',[['chroma',,1.2],['glow','#8a5cff',1],['scan',,.6]]),
 B('Toxic',[['neon','#7cff00',1.5],['glow','#7cff00',.8]]),
 B('Cutout',[['outline'],['soft','#000000',1.2]],6),
 B('Stone',[['emboss',,1],['soft','#000000',1]])];
let CUS=LS.get('ws_fxlooks',[]),FXCLIP=null,saveOpen=false,fq='',sess=null,hv=null;

const _fxf=fxf;fxf=function(o){let r=_fxf(o);(o.fxs||[]).forEach(e=>{const p={...o,fx:e.k,fxc:e.c,fxi:e.i};r+=' '+(FILT.includes(e.k)?_fxf(p):imgfx(p))});return r.trim()};

const KF=['fx','fxc','fxi','fxs','sw','stroke','t'],
snap=o=>JSON.stringify(KF.reduce((a,k)=>(a[k]=o[k],a),{})),
restore=(o,s)=>{const j=JSON.parse(s);KF.forEach(k=>{if(j[k]===undefined)delete o[k];else o[k]=j[k]})},
has=(o,k)=>o.fx==k||(o.fxs||[]).some(e=>e.k==k),
canUse=(o,k)=>o.t=='text'||!TXF.includes(k),
hex6=c=>/^#[0-9a-f]{6}$/i.test(c)?c:'#ffffff',
msKey=()=>{try{return ms.join(',')}catch(e){return''}},
T=()=>{let l=[];try{if(ms&&ms.length>1)l=ms.map(id=>S.o.find(q=>q.id==id)).filter(Boolean)}catch(e){}if(!l.length){const o=get();if(o)l=[o]}return l},
snapAll=l=>{const m={};l.forEach(o=>m[o.id]=snap(o));return m},
restAll=m=>{for(const id in m){const o=S.o.find(q=>q.id==id);if(o)restore(o,m[id])}},
rawList=o=>[...(o.fx?[{k:o.fx,c:o.fxc,i:o.fxi??1}]:[]),...(o.fxs||[]).map(e=>({...e}))],
ent=(o,k,c,i,idx)=>{const sz=idx==0&&(k=='outline'||k=='sticker');return{k,sz,c:sz?o.stroke:(c||DC[k]||'#ffffff'),i:sz?(o.sw||6):(i??1)}},
stk=o=>rawList(o).map((e,n)=>ent(o,e.k,e.c,e.i,n));

function clearFx(o){const st=has(o,'sticker')||has(o,'outline');o.fx='';o.fxs=[];o.fxc=undefined;o.fxi=1;if(st)o.sw=0}
function toggle(o,k,mode){
 if(!k)return clearFx(o);if(!canUse(o,k))return;
 const h=has(o,k);if(h&&mode=='add')return;if(!h&&mode=='rm')return;
 if(h){
  if(k=='sticker'||k=='outline')o.sw=0;
  if(o.fx==k){o.fx='';o.fxc=undefined;o.fxi=1;const e=(o.fxs||[]).shift();if(e){o.fx=e.k;o.fxc=e.c;o.fxi=e.i}}
  else o.fxs=o.fxs.filter(e=>e.k!=k);return}
 if(STRUCT.includes(k)){
  if(o.fx&&!STRUCT.includes(o.fx))(o.fxs=o.fxs||[]).unshift({k:o.fx,c:o.fxc||DC[o.fx],i:o.fxi??1});
  else if(o.fx&&(o.fx=='sticker'||o.fx=='outline'))o.sw=0;
  o.fx=k;o.fxc=undefined;o.fxi=1;
  if(k=='sticker'){o.sw=10;o.stroke='#ffffff'}if(k=='outline'){o.sw=o.t=='text'?3:6;o.stroke='#ffffff'}
 }else if(!o.fx){o.fx=k;o.fxc=DC[k];o.fxi=1}
 else(o.fxs=o.fxs||[]).push({k,c:DC[k],i:1})}
function setByKey(o,k,a,v){
 if(o.fx==k&&(k=='outline'||k=='sticker')){if(a=='c')o.stroke=v;else o.sw=v;return}
 if(o.fx==k){if(a=='c')o.fxc=v;else o.fxi=v;return}
 const e=(o.fxs||[]).find(q=>q.k==k);if(e){if(a=='c')e.c=v;else e.i=v}}
function applyList(o,list,sw,stroke){
 clearFx(o);list=list.filter(e=>canUse(o,e.k));
 list=[...list.filter(e=>STRUCT.includes(e.k)).slice(0,1),...list.filter(e=>!STRUCT.includes(e.k))];
 list.forEach((e,n)=>{if(n==0){o.fx=e.k;o.fxc=e.c;o.fxi=e.i??1}else(o.fxs=o.fxs||[]).push({k:e.k,c:e.c,i:e.i??1})});
 if(o.fx=='sticker'){o.sw=sw||10;o.stroke=stroke||'#ffffff'}else if(o.fx=='outline'){o.sw=sw||(o.t=='text'?3:6);o.stroke=stroke||'#ffffff'}}
function randList(){const pal=['#ff2bd6','#00e5ff','#ffb300','#ff2d55','#7cff00','#8a5cff','#ff5a00','#ffffff'],pk=a=>a[Math.random()*a.length|0],L=[];
 if(Math.random()<.6)L.push({k:pk(STRUCT.filter(k=>k!='distort')),c:pk(pal),i:1});
 const non=['neon','glow','soft','hard','long','d3','inner','rgb','chroma','emboss'],used=new Set(),n=1+(Math.random()*2|0);
 while(used.size<n){const k=pk(non);if(used.has(k))continue;used.add(k);L.push({k,c:pk(pal),i:+(.6+Math.random()*1.2).toFixed(2)})}return L}

/* tiny live samples for tiles */
function sampleCSS(list){let sh=[],st='',col='#fff',bg='',ex='';
 list.forEach(e=>{const k=e.k,c=e.c||DC[k]||'#ff2b6b';
  if(['glow','neon','soft','hard','long','d3','echo','lift'].includes(k)){try{const s=tshadow({fx:k,fxc:c,fxi:.55,fill:'#fff'});if(s)sh.push(s)}catch(_){}}
  else if(k=='inner')sh.push(`0 0 12px ${c}`);
  else if(k=='rgb')sh.push('-3px 0 rgba(255,0,60,.9)','3px 0 rgba(0,230,255,.9)');
  else if(k=='chroma')sh.push('-2px 0 rgba(255,0,60,.8)','2px 0 rgba(0,255,120,.6)','0 0 6px rgba(80,120,255,.8)');
  else if(k=='emboss')sh.push('1px 1px 0 rgba(255,255,255,.7)','-1px -1px 0 rgba(0,0,0,.8)');
  else if(k=='metal'){bg='linear-gradient(135deg,#f5f5f7,#8d93a1 30%,#fff 50%,#59606e 70%,#d9dce3)';col='transparent';ex+='-webkit-background-clip:text;background-clip:text;'}
  else if(k=='glass'){col='rgba(255,255,255,.25)';st='1.5px rgba(255,255,255,.85)'}
  else if(k=='hollow'){col='transparent';st=`2px ${c}`}
  else if(k=='outline'||k=='sticker'){st='3px #fff';if(k=='sticker')sh.push('0 3px 5px rgba(0,0,0,.6)')}
  else if(k=='box'){bg=c;ex+='padding:1px 9px;border-radius:8px;font-size:21px;'}
  else if(k=='splice')sh.push(`4px 4px 0 ${c}`);
  else if(k=='scan')ex+='-webkit-mask-image:repeating-linear-gradient(0deg,#000 0 2px,transparent 2px 4px);';
  else if(k=='grain')ex+='filter:contrast(1.5);opacity:.85;';
  else if(k=='distort')ex+='transform:skewX(-10deg) scaleY(.95);letter-spacing:1px;'});
 return `${sh.length?'text-shadow:'+sh.join(',')+';':''}${st?'-webkit-text-stroke:'+st+';':''}color:${col};${bg?'background:'+bg+';':''}${ex}`}
const nm=x=>String(x.n).replace(/^[^A-Za-z0-9]+/,''),lookList=x=>x.list.map(e=>({k:e.k,c:e.c||DC[e.k],i:e.i??1}));

/* ---- session (live preview until Apply) ---- */
const BAR=`${ic('eye')}<span>Live preview. Nothing is final until you apply.</span><button class="b btn-ok" id="fxa">${ic('check')}Apply</button><button class="b" id="fxv">${ic('undo-2')}Revert</button>`;
function ensure(l){if(!sess)sess={s:snapAll(l),sel,mk:msKey()}}
function commit(){if(!sess)return;sess=null;push()}
function revert(){if(!sess)return;restAll(sess.s);sess=null;all()}
function wireBar(){const a=$('#fxa'),v=$('#fxv');if(a)a.onclick=()=>{commit();draw();toast('Effects applied')};if(v)v.onclick=()=>{revert();toast('Reverted')}}
function touch(l){ensure(l);if(!$('#fxb')){const b=document.createElement('div');b.id='fxb';b.innerHTML=BAR;$('#lp').prepend(b);ICN();wireBar()}}
function act(fn,now){const l=T();if(!l.length)return toast('Select an object first');if(hv){restAll(hv);hv=null}ensure(l);l.forEach(fn);if(now)commit();all()}
const _undo=undo;undo=function(){if(sess){revert();return toast('Reverted pending effects')}_undo()};

const _lp=lp;lp=function(){
 if(sess&&(sess.sel!=sel||tab!='effects'||sess.mk!=msKey()))commit();
 const st=$('#lp').scrollTop;_lp();if(tab=='effects'){draw();$('#lp').scrollTop=st}};

function draw(){
 const p=$('#lp'),l=T(),o=l[0];
 if(!o){p.innerHTML=`<h4>${ic('sparkles')} Effects</h4><div class="fxe">${ic('mouse-pointer-click')}<b>Select a layer</b><span>Click text, a shape or an image on the canvas to style it.<br>Shift-click several to style them together.</span></div>`;ICN();return}
 const L=stk(o),LK=[...CUS.map((c,i)=>({n:c.n,list:c.list,sw:c.sw,stroke:c.stroke,ci:i})),...BUILT];
 let h='';
 if(sess)h+=`<div id="fxb">${BAR}</div>`;
 h+=`<div class="fxh"><b>${esc(String(o.name||o.t))}</b><small>${l.length>1?l.length+' layers selected':L.length+' active'}</small></div>
 <div class="fxt"><button class="b" data-a="rnd" title="Random combination">${ic('dices')}Surprise</button><button class="b" data-a="cp" title="Copy this stack">${ic('copy')}Copy</button><button class="b" data-a="ps" ${FXCLIP?'':'disabled'} title="Paste copied stack">${ic('clipboard-paste')}Paste</button><button class="b" data-a="sv" title="Save as your own look">${ic('bookmark-plus')}Save</button><button class="b" data-a="clr" title="Remove all effects">${ic('ban')}Clear</button></div>`;
 if(saveOpen)h+=`<div class="fxsv"><input id="fxn" maxlength="24" value="My look ${CUS.length+1}"><button class="b on" data-a="svok">Save</button></div>`;
 if(L.length){
  h+=`<div class="fxsec2">Active · ${L.length}</div>`+L.map(e=>`<div class="fxr" data-k="${e.k}"><b>${NAMES[e.k]||e.k}</b>${NOCOL.includes(e.k)&&!e.sz?'<span></span>':`<input type="color" data-a="c" value="${hex6(e.c)}" title="Colour">`}<input type="range" data-a="i" min="${e.sz?1:.2}" max="${e.sz?30:4}" step="${e.sz?1:.05}" value="${e.i}" title="${e.sz?'Size':'Strength'}"><button data-del title="Remove">${ic('x')}</button></div>`).join('')
  +`<label class="fxm">Overall<input type="range" id="fxm" min=".3" max="2.5" step=".05" value="1"><span>strength</span></label>`}
 h+=`<div class="fxsw">${ic('search')}<input class="fxs" id="fxq" placeholder="Search effects" value="${esc(fq)}" autocomplete="off"></div>`;
 h+=`<div class="fxsec2">Looks <small>click to apply, hover to preview</small></div><div class="fxlk">${LK.map((x,i)=>`<button class="fxk" data-lk="${i}" title="${esc(nm(x))}"><div class="sm"><span style="${sampleCSS(lookList(x))}">Aa</span></div><em>${x.ci!=null?ic('bookmark'):''}${esc(nm(x))}</em>${x.ci!=null?`<span class="x" data-x="${x.ci}" title="Delete look">${ic('x')}</span>`:''}</button>`).join('')}</div>`;
 CATS.forEach(([nm,ks])=>{h+=`<div class="fxsec2">${nm}</div><div class="fxg">`+ks.map(k=>{const on=has(o,k),dis=!l.some(x=>canUse(x,k));return`<button class="fxk ${on?'on':''} ${dis?'dis':''}" data-k="${k}" title="${NAMES[k]}${dis?' (text only)':''}"><div class="sm"><span style="${sampleCSS([{k}])}">Aa</span></div><em>${NAMES[k]}</em>${on?`<i class="n">${ic('check')}</i>`:''}</button>`}).join('')+'</div>'});
 p.innerHTML=h;ICN();wireBar();

 const pv=fn=>{hv=snapAll(l);try{fn()}catch(e){}render()},unpv=()=>{if(hv){restAll(hv);hv=null;render()}};
 p.querySelectorAll('.fxk[data-k]').forEach(b=>{const k=b.dataset.k,on=has(o,k),m=on?'rm':'add';
  if(!on)b.onmouseenter=()=>{if(l.some(x=>canUse(x,k)))pv(()=>l.forEach(x=>toggle(x,k,'add')))};
  b.onmouseleave=unpv;
  b.onclick=()=>{if(!l.some(x=>canUse(x,k)))return toast('This effect works on text only');act(x=>toggle(x,k,m))}});
 p.querySelectorAll('.fxk[data-lk]').forEach(b=>{const x=LK[+b.dataset.lk],ap=t=>applyList(t,x.list,x.sw,x.stroke);
  b.onmouseenter=()=>pv(()=>l.forEach(ap));b.onmouseleave=unpv;b.onclick=()=>act(ap);
  const d=b.querySelector('[data-x]');if(d)d.onclick=e=>{e.stopPropagation();CUS.splice(+d.dataset.x,1);LS.set('ws_fxlooks',CUS);hv=null;draw();toast('Look deleted')}});
 p.querySelectorAll('.fxr').forEach(r=>{const k=r.dataset.k;
  r.querySelectorAll('input').forEach(inp=>inp.oninput=()=>{touch(l);l.forEach(x=>setByKey(x,k,inp.dataset.a,inp.dataset.a=='i'?+inp.value:inp.value));render()});
  r.querySelector('[data-del]').onclick=()=>act(x=>toggle(x,k,'rm'))});
 let mb=null;const mm=$('#fxm');
 if(mm)mm.oninput=()=>{touch(l);if(!mb)mb=snapAll(l);restAll(mb);const f=+mm.value,cl=v=>Math.max(.2,Math.min(4,+(v*f).toFixed(2)));
  l.forEach(x=>{if(x.fx&&x.fx!='outline'&&x.fx!='sticker')x.fxi=cl(x.fxi??1);else if(x.fx)x.sw=Math.max(1,Math.min(30,Math.round((x.sw||6)*f)));(x.fxs||[]).forEach(e=>e.i=cl(e.i??1))});render()};
 const A={
  rnd:()=>{const r=randList();act(x=>applyList(x,r))},
  cp:()=>{const s=rawList(o);if(!s.length)return toast('Nothing to copy yet');FXCLIP={list:s,sw:o.sw,stroke:o.stroke};toast('Effects copied — select another layer and Paste');draw()},
  ps:()=>{if(FXCLIP)act(x=>applyList(x,FXCLIP.list.map(e=>({...e})),FXCLIP.sw,FXCLIP.stroke))},
  sv:()=>{if(!rawList(o).length)return toast('Add an effect first');saveOpen=!saveOpen;draw();const n=$('#fxn');n&&(n.focus(),n.select())},
  svok:()=>{const n=($('#fxn').value||'My look').trim();CUS.unshift({n:n,list:rawList(o).map(e=>({...e})),sw:(o.fx=='outline'||o.fx=='sticker')?o.sw:0,stroke:o.stroke});CUS=CUS.slice(0,24);LS.set('ws_fxlooks',CUS);saveOpen=false;draw();toast('Look saved')},
  clr:()=>act(x=>toggle(x,''))};
 p.querySelectorAll('.fxt [data-a],.fxsv [data-a]').forEach(b=>b.onclick=A[b.dataset.a]);
 const sn=$('#fxn');if(sn)sn.onkeydown=e=>{if(e.key=='Enter')A.svok()};
 const q=$('#fxq'),filt=()=>{const v=q.value.trim().toLowerCase();fq=q.value;
  p.querySelectorAll('.fxk[data-k]').forEach(b=>b.style.display=!v||b.title.toLowerCase().includes(v)?'':'none');
  p.querySelectorAll('.fxg').forEach(g=>{const any=[...g.children].some(c=>c.style.display!='none');g.style.display=any?'':'none';g.previousElementSibling.style.display=any?'':'none'})};
 q.oninput=filt;if(fq)filt()}

/* ================= COMMAND PALETTE ================= */
const _cmds=cmds,CATMAP=[[/^Add /,'Add'],[/^Open /,'Panels'],[/^(Export|Save as template|Import)/,'File'],[/^(Zoom|Fit canvas|Toggle snapping)/,'View'],[/^(Undo|Redo|Clear canvas|Select all)/,'Edit']],
SC={Undo:'Ctrl Z',Redo:'Ctrl Shift Z',Duplicate:'Ctrl D',Delete:'Del','Select all':'Ctrl A'},
NEEDSEL=/^(Duplicate|Delete|Bring|Send|Lock|Hide|Flip|Rotate|Crop|Replace|Effect:|Look:|Clear all effects|Randomize|Copy effects|Group)/;
const mode1=k=>has(T()[0],k)?'rm':'add';
function build(){
 const out=_cmds().filter(c=>c[0]!='Replace image').map(c=>({l:c[0],i:c[1],f:c[2],k:c[3]||'',c:(CATMAP.find(m=>m[0].test(c[0]))||[0,'Object'])[1],sc:SC[c[0]]}));
 out.push({l:'Replace selected (live preview)',i:'image-up',k:'swap change image icon shape text',c:'Object',f:()=>{const o=get();o?startSwap(o):toast('Select an object first')}});
 FXL.filter(f=>f[0]).forEach(f=>{const k=f[0];out.push({l:'Effect: '+f[2],i:f[1],k:'fx style add toggle stack '+k,c:'Effects',hide0:1,
  f:()=>{const l=T();if(!l.length)return toast('Select an object first');const m=mode1(k);act(o=>toggle(o,k,m),true)},
  pv:l=>{const m=has(l[0],k)?'rm':'add';l.forEach(o=>toggle(o,k,m))}})});
 BUILT.concat(CUS.map(c=>({n:c.n,list:c.list,sw:c.sw,stroke:c.stroke}))).forEach(x=>out.push({l:'Look: '+nm(x),i:'wand-sparkles',k:'preset combo style fx effect '+x.n,c:'Effects',
  f:()=>act(o=>applyList(o,x.list,x.sw,x.stroke),true),pv:l=>l.forEach(o=>applyList(o,x.list,x.sw,x.stroke))}));
 out.push({l:'Clear all effects',i:'ban',k:'remove reset fx',c:'Effects',f:()=>act(o=>toggle(o,''),true),pv:l=>l.forEach(o=>toggle(o,''))},
  {l:'Randomize effects',i:'dices',k:'surprise random fx',c:'Effects',f:()=>{const r=randList();act(o=>applyList(o,r),true)}},
  {l:'Copy effects',i:'copy',k:'fx style',c:'Effects',f:()=>{const o=get();if(!o||!rawList(o).length)return toast('Nothing to copy');FXCLIP={list:rawList(o),sw:o.sw,stroke:o.stroke};toast('Effects copied')}},
  {l:'Paste effects',i:'clipboard-paste',k:'fx style',c:'Effects',f:()=>FXCLIP?act(o=>applyList(o,FXCLIP.list.map(e=>({...e})),FXCLIP.sw,FXCLIP.stroke),true):toast('Copy effects first')});
 out.forEach(c=>{c.sel=NEEDSEL.test(c.l)||c.l=='Copy effects'||c.l=='Paste effects'});return out}
function dyn(q){const r=[],hexc=v=>'#'+(v.length==3?v.replace(/./g,'$&$&'):v),sel1=f=>()=>{const o=get();o?f(o):toast('Select an object first')};let m;
 if(m=q.match(/^rot(?:ate)?\s*(-?\d{1,3})\b/i)){const v=+m[1];r.push({l:`Rotate to ${v}°`,i:'rotate-cw',c:'Quick',sel:1,f:sel1(o=>{o.r=v;push();all()})})}
 if(m=q.match(/^op(?:acity)?\s*(\d{1,3})\b/i)){const v=Math.min(100,+m[1]);r.push({l:`Opacity ${v}%`,i:'blend',c:'Quick',sel:1,f:sel1(o=>{o.o=v/100;push();all()})})}
 if(m=q.match(/^(?:round|radius)\s*(\d{1,3})\b/i)){const v=+m[1];r.push({l:`Corner radius ${v}px`,i:'square',c:'Quick',sel:1,f:sel1(o=>{o.rad=v;push();all()})})}
 if(m=q.match(/^(?:size|resize)\s*(\d{2,4})\s*[x×*]\s*(\d{2,4})\b/i)){const w=+m[1],h=+m[2];r.push({l:`Resize to ${w} × ${h}`,i:'scaling',c:'Quick',sel:1,f:sel1(o=>{o.w=w;o.h=h;push();all()})})}
 if(m=q.match(/^zoom\s*(\d{2,3})\b/i)){const v=+m[1];r.push({l:`Zoom ${v}%`,i:'zoom-in',c:'Quick',f:()=>setZ(v/100)})}
 if(m=q.match(/^(?:fill|color|colour)\s*#?([0-9a-f]{6}|[0-9a-f]{3})\b/i)){const v=hexc(m[1]);r.push({l:`Fill ${v}`,i:'paint-bucket',c:'Quick',sel:1,f:sel1(o=>{o.fill=v;o.g=0;push();all()})})}
 if(m=q.match(/^(?:bg|background)\s*#?([0-9a-f]{6}|[0-9a-f]{3})\b/i)){const v=hexc(m[1]);r.push({l:`Background ${v}`,i:'image',c:'Quick',f:()=>{S.bg.c=v;S.bg.g=0;push();all()}})}
 return r}
function score(c,q){const L=c.l.toLowerCase(),K=(c.k||'').toLowerCase();let s=0;
 for(const w of q.split(/\s+/).filter(Boolean)){let x=0;const i=L.indexOf(w);
  if(i==0)x=100;else if(i>0&&/[\s:]/.test(L[i-1]))x=80;else if(i>0)x=55;else if(K.includes(w))x=35;
  else if(w.length>1){let j=0;for(const ch of L)if(ch==w[j])j++;if(j==w.length)x=15}
  if(!x)return 0;s+=x}
 return s-L.length/100}
function hl(label,q){const L=label.toLowerCase(),m=new Array(label.length).fill(0);
 q.split(/\s+/).filter(Boolean).forEach(w=>{const i=L.indexOf(w);if(i>=0)for(let j=i;j<i+w.length;j++)m[j]=1;else if(w.length>1){let j=0;for(let n=0;n<L.length&&j<w.length;n++)if(L[n]==w[j]){m[n]=1;j++}}});
 let o='',on=0;[...label].forEach((ch,n)=>{if(m[n]&&!on){o+='<mark>';on=1}if(!m[n]&&on){o+='</mark>';on=0}o+=esc(ch)});return o+(on?'</mark>':'')}
let kpL=[],kpI=0,kpv=null,kpt=null,kQ='';
const recent=()=>LS.get('ws_kp_recent',[]);
function kpUn(){clearTimeout(kpt);if(kpv){restAll(kpv);kpv=null;render()}}
function kpPrev(){clearTimeout(kpt);kpt=setTimeout(()=>{kpUn();const c=kpL[kpI],l=T();if(!c||!c.pv||!l.length)return;kpv=snapAll(l);try{c.pv(l)}catch(e){}render()},90)}
kpF=function(){const q=$('#kq').value.trim().toLowerCase();kQ=q;const all_=build(),hs=!!get();let L;
 if(!q){const rc=recent().map(n=>all_.find(c=>c.l==n)).filter(Boolean).map(c=>({...c,g:'Recent'}));
  const order=hs?['Effects','Object','Add','Panels','Edit','View','File']:['Add','Panels','Edit','View','File','Effects','Object'];
  L=[...rc];order.forEach(g=>all_.filter(c=>c.c==g&&!c.hide0&&!rc.some(r=>r.l==c.l)).sort((a,b)=>(!hs&&a.sel)-(!hs&&b.sel)).forEach(c=>L.push({...c,g})))}
 else L=[...dyn(q),...all_.map(c=>({c0:c,s:score(c,q)})).filter(x=>x.s>0).sort((a,b)=>(b.s-(!hs&&b.c0.sel?60:0))-(a.s-(!hs&&a.c0.sel?60:0))).map(x=>x.c0)].slice(0,40);
 kpL=L;kpI=0;kpR();kpPrev()};
kpR=function(){const l=$('#kl'),hs=!!get();let h='',last='';
 kpL.forEach((c,i)=>{if(!kQ&&c.g!=last){last=c.g;h+=`<div class="kh">${c.g}</div>`}
  const dis=c.sel&&!hs;
  h+=`<div class="ki ${i==kpI?'on':''} ${dis?'dis':''}" data-ki="${i}"><span class="ico">${ic(c.i)}</span><span class="kl">${kQ?hl(c.l,kQ):esc(c.l)}</span>${dis?'<span class="kb">select an object</span>':(kQ&&c.c?`<span class="kb">${c.c}</span>`:'')}${c.sc?`<kbd>${c.sc}</kbd>`:''}</div>`});
 l.innerHTML=h||'<p class="mu" style="padding:12px">No matches. Try “neon”, “export”, “rotate 15”, “opacity 60”, “bg #111111”.</p>';ICN();
 const on=l.querySelector('.on');on&&on.scrollIntoView({block:'nearest'});
 l.querySelectorAll('.ki').forEach(e=>{e.onmousemove=()=>{if(kpI==+e.dataset.ki)return;kpI=+e.dataset.ki;l.querySelectorAll('.ki').forEach(x=>x.classList.toggle('on',x==e));kpPrev()};e.onclick=()=>kpRun(+e.dataset.ki)});
 const o=get();$('#kctx').textContent=o?`Selected: ${o.name||o.t}${T().length>1?' + '+(T().length-1)+' more':''} — effect commands preview live as you move through them`:'Nothing selected — pick a layer to unlock object & effect commands'};
kpRun=function(i){const c=kpL[i];if(!c)return;kpUn();closeKP();
 if(c.sel&&!get())return toast('Select an object first');
 if(!c.g||c.g!='Recent'){const r=recent().filter(n=>n!=c.l);r.unshift(c.l);LS.set('ws_kp_recent',r.slice(0,6))}
 c.f()};
const _close=closeKP;closeKP=function(){kpUn();_close()};
openKP=function(){const k=$('#kp');k.style.display='flex';const kb=$('#kpb');
 if(!$('#kctx')){$('#kq').insertAdjacentHTML('afterend','<div id="kctx"></div>');kb.insertAdjacentHTML('beforeend',`<div id="kfoot"><span>${ic('arrow-up-down')}Navigate</span><span>${ic('corner-down-left')}Run</span><span>Esc Close</span><span>Ctrl K Toggle</span><span>Quick: rotate 15, opacity 60, fill #ff0000, size 800x400, zoom 75</span></div>`)}
 $('#kq').placeholder='Search commands, effects, looks…';$('#kq').value='';kpF();$('#kq').focus()};
$('#kq').oninput=kpF;
$('#kq').onkeydown=e=>{const n=kpL.length,mv=d=>{e.preventDefault();kpI=Math.max(0,Math.min(n-1,kpI+d));kpR();kpPrev()};
 if(e.key=='ArrowDown')mv(1);else if(e.key=='ArrowUp')mv(-1);else if(e.key=='PageDown')mv(6);else if(e.key=='PageUp')mv(-6);
 else if(e.key=='Enter'){e.preventDefault();kpRun(kpI)}else if(e.key=='Escape'){e.preventDefault();closeKP()}};

/* ===== Live Replace (swap) ===== */
let SW=null;
const bar=()=>{let b=$('#swb');if(!b){b=document.createElement('div');b.id='swb';b.hidden=true;
 b.innerHTML=`${ic('replace')}<span>Replacing <b id="swn"></b>. Click any photo, icon, shape or text to preview it, try as many as you like. <a id="swu">Upload image</a></span><button class="b btn-ok" id="swa">${ic('check')}Apply</button><button class="b" id="swc">${ic('x')}Cancel</button>`;ICN();
 document.body.append(b);$('#swa').onclick=applySwap;$('#swc').onclick=cancelSwap;$('#swu').onclick=()=>$('#fi').click()}return b};
function startSwap(o){if(!o)return toast('Select something first');if(SW&&SW.id!=o.id)applySwap();commit();
 SW={id:o.id,snap:JSON.parse(JSON.stringify(o)),dirty:0,prev:tab};const b=bar();b.hidden=false;b.style.display='';$('#swn').textContent=o.name||o.t;setTab('assets');toast('Pick anything to replace it live')}
function endSw(msg){const pt=SW.prev;SW=null;const b=bar();b.hidden=true;b.style.display='none';if(pt&&pt!=tab)setTab(pt);all();toast(msg)}
function applySwap(){if(!SW)return;if(SW.dirty)push();endSw('Replacement applied')}
function cancelSwap(){if(!SW)return;const i=S.o.findIndex(q=>q.id==SW.id);if(i>=0)S.o[i]=SW.snap;sel=SW.id;endSw('Replace cancelled')}
replaceImg=startSwap;
const _add=add;add=function(n){
 if(!SW)return _add(n);
 const i=S.o.findIndex(q=>q.id==SW.id);if(i<0){SW=null;bar().hidden=true;return _add(n)}
 const b=SW.snap,cx=b.x+b.w/2,cy=b.y+b.h/2;let w=n.w??400,h=n.h??260;
 const boxy=['rect','ellipse','glass','poly'];
 if(n.t=='img'||(n.t!='text'&&!boxy.includes(n.t))){const k=Math.min(b.w/w,b.h/h);w*=k;h*=k}
 else if(boxy.includes(n.t)&&boxy.includes(b.t)){w=b.w;h=b.h}
 const keep={r:b.r,o:b.o,fl:b.fl,fv:b.fv,fx:b.fx,fxc:b.fxc,fxi:b.fxi,fxs:b.fxs};
 if(n.t=='img'&&b.t=='img')keep.f=b.f;
 if(n.t!='text'&&TXF.includes(keep.fx)){keep.fx='';keep.fxs=(b.fxs||[])}
 const full=Object.assign({x:0,y:0,r:0,o:1,rad:0,fill:'#e11d2e',c2:'#ff3b47',g:0,stops:null,stroke:'#ffffff',sw:0,fx:'',f:{},fl:1,fv:1,cz:1,cx:0,cy:0,fit:'cover',name:n.t},n,{id:b.id,x:cx-w/2,y:cy-h/2,w,h},keep);
 S.o[i]=full;sel=b.id;SW.dirty=1;all();toast('Preview — try another, or press Apply');return full};
const _rp=rp;rp=function(){_rp();const o=get(),p=$('#rp');
 if(o&&o.t!='img'&&p&&!p.querySelector('[data-rpl]')){const b=document.createElement('button');b.className='b';b.dataset.rpl=1;b.style.cssText='width:100%;justify-content:center;margin-bottom:8px';b.innerHTML=ic('replace')+'Replace (live preview)';b.onclick=()=>startSwap(o);p.insertBefore(b,p.children[1]||null)}};
document.addEventListener('keydown',e=>{const t=document.activeElement.tagName,typing=/INPUT|TEXTAREA|SELECT/.test(t);
 if(e.key=='Escape'&&SW&&!typing)cancelSwap();
 else if(e.key=='Enter'&&!typing&&t!='BUTTON'&&!kpOpen()){if(SW){e.preventDefault();applySwap()}else if(sess){e.preventDefault();commit();draw();toast('Effects applied')}}});
})();

/* === Asset quality patch: verified thumbnails, junk/watermark filtering, proxy fallback === */
(()=>{
const css=document.createElement('style');
css.textContent=`.card .ti{background:repeating-conic-gradient(#5b5b63 0 25%,#7a7a83 0 50%) 0 0/14px 14px!important;opacity:1!important}`;
document.head.append(css);

const enc=encodeURIComponent,
JUNK=/watermark|shutterstock|alamy|istock|getty|dreamstime|depositphotos|123rf|adobe\s*stock|bigstock|stock\s*photo|\bsample\b|\bpreview\b|screenshot|\bscan(ned)?\b|placeholder|no\s*image|thumbnail/i,
prox=(u,w)=>`https://wsrv.nl/?url=${enc(u)}&w=${w}&output=png&we=1`,
loadI=(u,cors)=>new Promise(r=>{const i=new Image();i.referrerPolicy='no-referrer';if(cors)i.crossOrigin='anonymous';
 const t=setTimeout(()=>{i.onload=i.onerror=null;i.src='';r(null)},7000);
 i.onload=()=>{clearTimeout(t);r(i.naturalWidth>1?i:null)};i.onerror=()=>{clearTimeout(t);r(null)};i.src=u});

/* look at the real pixels: reject fully transparent / solid-colour images */
function probe(i){try{
 if(i.naturalWidth<40||i.naturalHeight<40)return{ok:false};
 const N=48,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d',{willReadFrequently:true});
 x.drawImage(i,0,0,N,N);const d=x.getImageData(0,0,N,N).data;let n=0,r=0,g=0,b=0;
 for(let k=0;k<d.length;k+=4)if(d[k+3]>24){n++;r+=d[k];g+=d[k+1];b+=d[k+2]}
 const op=n/(N*N);if(op<.02)return{ok:false};
 r/=n;g/=n;b/=n;let v=0;
 for(let k=0;k<d.length;k+=4)if(d[k+3]>24)v+=Math.abs(d[k]-r)+Math.abs(d[k+1]-g)+Math.abs(d[k+2]-b);
 if(v/n<14&&op>.95)return{ok:false};
 return{ok:true,tr:op<.92}}catch(e){return null}}   /* null = canvas tainted, can't inspect */

async function vetA(a){
 if(!a.thumb)return null;
 let i=await loadI(a.thumb,1),p;
 if(i){p=probe(i);if(p&&!p.ok)return null;if(p)return{...a,tr:p.tr};return a}
 i=await loadI(prox(a.thumb,320),1);                      /* hot-link blocked? go through proxy */
 if(i){p=probe(i);if(p&&!p.ok)return null;return{...a,thumb:prox(a.thumb,320),tr:p?p.tr:0}}
 i=await loadI(a.thumb,0);return i?a:null}                 /* displays fine, just can't inspect */
const vet=async(l,pngFirst)=>{const r=(await Promise.all(l.map(vetA))).filter(Boolean);
 return pngFirst?[...r.filter(a=>a.tr),...r.filter(a=>!a.tr)]:r};

/* cleaner sources */
const okMeta=(t,w,h)=>!JUNK.test(t||'')&&!(w&&h&&Math.max(w,h)<200);
async function OV2(q,off,n,ex=''){
 const ps=Math.min(20,n),np=Math.ceil(n/ps)+1,p0=Math.floor(off/ps)+1,
 one=async(p,x)=>{const r=await tmo(fetch(`https://api.openverse.org/v1/images/?q=${enc(q)}&page_size=${ps}&page=${p}&license=cc0,pdm,by,by-sa&mature=false${ex}${x}`));if(!r.ok)throw r.status;return r.json()};
 const rs=await Promise.all(Array.from({length:np},(_,k)=>one(p0+k,'&excluded_source=thingiverse').catch(()=>one(p0+k,'').catch(()=>null))));
 if(rs.every(r=>!r))throw 0;
 return rs.flatMap(j=>(j&&j.results)||[]).filter(i=>okMeta(i.title+' '+(i.creator||'')+' '+(i.tags||[]).map(t=>t.name).join(' '),i.width,i.height)&&(!ex.includes('png')||!i.filetype||/png/i.test(i.filetype)))
 .map(i=>({id:i.id,thumb:i.thumbnail||i.url,full:i.url,thumb2:i.thumbnail,title:i.title||'Untitled',credit:`${i.creator||'Unknown'} · ${(i.license||'').toUpperCase()}${i.license_version?' '+i.license_version:''}`,link:i.foreign_landing_url||i.url}))}
const WM2=(q,off,n,mimes=/^image\/(png|jpeg|webp)$/)=>tmo(fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrsearch=${enc('filetype:bitmap '+q)}&gsrlimit=${n}&gsroffset=${off}&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=800`)).then(r=>r.json())
 .then(j=>Object.values(j.query?.pages||{}).sort((a,b)=>a.index-b.index).map(p=>{const ii=p.imageinfo?.[0]||{},m=ii.extmetadata||{};
  return{ok:ii.thumburl&&mimes.test(ii.mime||'')&&okMeta(p.title,ii.width,ii.height),a:{id:'wm'+p.pageid,thumb:ii.thumburl,full:ii.thumburl,title:p.title.replace(/^File:/,''),credit:`${(m.Artist?.value||'Wikimedia Commons').replace(/<[^>]+>/g,'').slice(0,40)} · ${m.LicenseShortName?.value||'see source'}`,link:ii.descriptionurl}}}).filter(x=>x.ok).map(x=>x.a));
const ph2=(c,s='')=>[(q,o,n)=>OV2(q+s,o,n,c),(q,o,n)=>WM2(q+s,o,n)];
Object.assign(SRC,{
 Photos:ph2('&category=photograph'),People:ph2('&category=photograph',' people'),Objects:ph2('&category=photograph',' object'),
 Textures:ph2('',' texture'),Art:ph2('&category=illustration'),
 PNGs:[(q,o,n)=>OV2(q+' transparent',o,n,'&extension=png'),(q,o,n)=>OV2(q,o,n,'&extension=png'),(q,o,n)=>WM2(q+' transparent png',o,n,/^image\/png$/),(q,o,n)=>ICO(q,o,n,'fluent-emoji-flat,noto,twemoji',0)]});

/* collect from sources until we have enough GOOD results */
run=async function(c,q,o,n){
 const safe=['Icons','Logos','Emoji','Avatars'].includes(c);let acc=[];const seen=new Set();
 for(const f of SRC[c]){
  try{let r=await f(q,o,n);if(!r||!r.length)continue;
   r=r.filter(a=>{const k=a.thumb;if(seen.has(k))return false;seen.add(k);return true});
   if(!safe)r=await vet(r,c=='PNGs');acc.push(...r);
   if(acc.length>=Math.min(n,12))break}catch(e){}}
 return acc.slice(0,n)};

/* broken thumbnails vanish instead of leaving blank ghosts */
document.addEventListener('error',e=>{const t=e.target;if(t&&t.matches&&t.matches('.card .ti')){const c=t.closest('.card');c&&c.remove()}},true);

/* adding an asset: try full → proxied full → thumbnails (handles hot-link/CORS blocks) */
addAsset=async function(a){if(!a)return;toast('Adding…');
 const L=[a.full,a.full&&prox(a.full,1600),a.thumb2,a.thumb,a.thumb2&&prox(a.thumb2,1200)].filter(Boolean);
 for(const u of[...new Set(L)]){try{const r=await tmo(fetch(u),15000);if(!r.ok)throw 0;const b=await r.blob();if(!/^image\//.test(b.type))throw 0;addImg(await shrink(b),{name:a.title.slice(0,24),credit:a.credit,link:a.link});return}catch(e){}}
 toast('Could not load this asset — try another')};
})();
