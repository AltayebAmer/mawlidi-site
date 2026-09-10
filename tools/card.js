/* قالب صفحة بطاقة الميلاد القابلة للمشاركة — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';
const INTROS = require('./intros.js');

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    cvFont:'Cairo', cvFontAlt:'Tajawal',
    title:'بطاقة ميلادك الهجري',
    h1:'بطاقة ميلادك',
    desc:'اصنع بطاقة أنيقة تحمل تاريخ ميلادك الهجري وقمر تلك الليلة، واحفظها أو شاركها بضغطة واحدة.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    day:'اليوم', month:'الشهر', year:'السنة', go:'اصنع البطاقة',
    errY:'أدخل سنة بين 1900 و 2099', errD:'التاريخ غير صحيح، تحقق من اليوم والشهر',
    dl:'⬇ حفظ الصورة', share:'مشاركة', shareFail:'تعذّرت المشاركة — احفظ الصورة وشاركها يدوياً',
    hint:'اضغط مطولاً على الصورة لحفظها إن لم يعمل الزر',
    cardKicker:'تاريخ ميلادي بالتقويم الهجري',
    cardAge:'عمري القمري', cardYears:'سنة',
    phases:['محاق','هلال متزايد','تربيع أول','أحدب متزايد','بدر','أحدب متناقص','تربيع أخير','هلال متناقص'],
    l1:'قمر ميلادك', h1r:'../moon/',
    l2:'حاسبة العمر', h2r:'../age/',
    faq:[
      ['كيف أشارك البطاقة على واتساب؟',
       'اضغط زر المشاركة إن كان جهازك يدعمه، فتظهر قائمة التطبيقات مباشرة. وإن لم يظهر الزر، احفظ الصورة بزر الحفظ ثم أرسلها من معرض الصور كأي صورة أخرى. على الهاتف يمكنك أيضاً الضغط المطوّل على البطاقة لحفظها.'],
      ['هل تُرفع بياناتي إلى خادم؟',
       'لا. البطاقة تُرسم كاملة داخل متصفحك، ولا يغادر تاريخ ميلادك جهازك في أي لحظة. الصفحة تعمل حتى بلا اتصال بالإنترنت بعد تحميلها.'],
      ['لماذا يختلف تاريخي الهجري عن المكتوب في هويتي؟',
       'الحساب هنا يعتمد التقويم الهجري الجدولي، بينما تعتمد كثير من البلدان رؤية الهلال في تحديد بداية الشهر. الفارق يوم واحد غالباً. الوثيقة الرسمية هي المعتمدة في المعاملات، والبطاقة للمشاركة والتذكار.']
    ]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    cvFont:'Lato', cvFontAlt:'Playfair Display',
    title:'Your Hijri Birthday Card',
    h1:'Birthday Card',
    desc:'Create an elegant card carrying your Hijri birth date and the Moon of that night, then save or share it in one tap.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    day:'Day', month:'Month', year:'Year', go:'Create the card',
    errY:'Enter a year between 1900 and 2099', errD:'Invalid date — check the day and month',
    dl:'⬇ Save image', share:'Share', shareFail:'Sharing unavailable — save the image and share it manually',
    hint:'Press and hold the image to save it if the button does not work',
    cardKicker:'My birth date in the Hijri calendar',
    cardAge:'Lunar age', cardYears:'years',
    phases:['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'],
    l1:'Your birth moon', h1r:'../moon/',
    l2:'Age calculator', h2r:'../age/',
    faq:[
      ['How do I share the card on WhatsApp?',
       'Tap the share button if your device supports it and the app list opens directly. If the button is not shown, save the image and send it from your gallery like any other picture. On a phone you can also press and hold the card to save it.'],
      ['Is my data sent to a server?',
       'No. The card is drawn entirely inside your browser, and your birth date never leaves your device. The page works offline once it has loaded.'],
      ['Why does my Hijri date differ from the one on my ID?',
       'This calculation uses the tabular Hijri calendar, while many countries begin the month by sighting the crescent. The difference is usually a single day. Your official document is what counts for paperwork; this card is a keepsake.']
    ]
  }
};

const MONTHS = {
  arb:{ g:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
        h:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
        w:['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'], sg:'م', sh:'هـ' },
  eng:{ g:['January','February','March','April','May','June','July','August','September','October','November','December'],
        h:['Muharram','Safar','Rabiʿ al-Awwal','Rabiʿ al-Thani','Jumada al-Ula','Jumada al-Akhira','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿda','Dhu al-Hijja'],
        w:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], sg:'CE', sh:'AH' }
};

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

module.exports = function cardPage(lang){
  const INTRO = INTROS['card'][lang];
  const L=T[lang], M=MONTHS[lang];
  const url=`${SITE}/${lang}/card/`;
  const other = lang==='arb' ? 'eng' : 'arb';
  const ld=[
    {'@context':'https://schema.org','@type':'WebApplication',name:L.title,description:L.desc,
     url,applicationCategory:'UtilityApplication',inLanguage:L.code,
     offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}},
    {'@context':'https://schema.org','@type':'FAQPage',
     mainEntity:L.faq.map(([q,a])=>({'@type':'Question',name:q,
       acceptedAnswer:{'@type':'Answer',text:a}}))}
  ];
  return `<!DOCTYPE html>
<html lang="${L.code}" dir="${L.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07071A">
<title>${esc(L.title)} — ${L.site}</title>
<meta name="description" content="${esc(L.desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/card/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/card/">
<meta property="og:title" content="${esc(L.title)} — ${L.site}">
<meta property="og:description" content="${esc(L.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE}/assets/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link href="https://fonts.googleapis.com/css2?${L.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/article.css">
<link rel="stylesheet" href="../../assets/tool.css">
<style>body{font-family:${L.font};}</style>
</head>
<body>
<nav class="crumb"><a href="../">${L.home}</a> <span>/</span> <span>${esc(L.h1)}</span></nav>

<main class="tool">
  <h1>${esc(L.h1)}</h1>
  <p class="tool-sub">${esc(L.desc)}</p>

  <div class="fields">
    <label class="fld"><span>${L.day}</span><select id="fD"></select></label>
    <label class="fld"><span>${L.month}</span><select id="fM"></select></label>
    <label class="fld"><span>${L.year}</span><input id="fY" type="number" inputmode="numeric" placeholder="1990"></label>
  </div>
  <div class="acts"><button class="go" onclick="run()">${L.go}</button></div>
  <p class="err" id="err" hidden></p>

  <section id="out" hidden>
    <div class="card-wrap"><canvas id="cv" width="1080" height="1350" role="img" aria-label="${esc(L.title)}"></canvas></div>
    <div class="acts card-acts">
      <button class="go" id="dlBtn">${L.dl}</button>
      <button class="ghost" id="shBtn" hidden>${L.share}</button>
    </div>
    <p class="hint">${esc(L.hint)}</p>
  </section>

  <p class="tool-link">
    <a href="${L.h1r}">${esc(L.l1)} →</a> &nbsp;·&nbsp;
    <a href="${L.h2r}">${esc(L.l2)} →</a>
  </p>

  <div data-ad-slot="leaderboard"></div>

  <section class="anwa intro-block">
    <h2 class="mini-h">${esc(INTRO[0])}</h2>
${INTRO[1].map(t=>`    <p>${esc(t)}</p>`).join('\n')}
  </section>

  <section class="faq">
${L.faq.map(([q,a])=>`    <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
  </section>
</main>

<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${L.back}</a></footer>
<script src="../../assets/ads.js"></script>

<script src="../../assets/hijri.js"></script>
<script src="../../assets/moon.js"></script>
<script>
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)}, WD=${JSON.stringify(M.w)};
const SG=${JSON.stringify(M.sg)}, SH=${JSON.stringify(M.sh)};
const PH=${JSON.stringify(L.phases)};
const TX=${JSON.stringify({errY:L.errY,errD:L.errD,kicker:L.cardKicker,age:L.cardAge,
  years:L.cardYears,site:L.site,share:L.title,shareFail:L.shareFail})};
const RTL=${lang==='arb'};
const F1=${JSON.stringify(L.cvFont)}, F2=${JSON.stringify(L.cvFontAlt)};

(function(){
  const d=document.getElementById('fD'), m=document.getElementById('fM');
  for(let i=1;i<=31;i++) d.innerHTML+='<option value="'+i+'">'+i+'</option>';
  MG.forEach((n,i)=>m.innerHTML+='<option value="'+(i+1)+'">'+n+'</option>');
})();

const W=1080, H=1350;
let lastBlob=null, lastName='mawlidi-card.png';

function show(msg){const e=document.getElementById('err');e.textContent=msg;e.hidden=false;document.getElementById('out').hidden=true;}

// نجوم ثابتة مشتقة من التاريخ، فتخرج البطاقة نفسها في كل مرة
function stars(ctx, seed){
  let s=seed;
  const rnd=()=>{ s=(s*1664525+1013904223)>>>0; return s/4294967296; };
  for(let i=0;i<150;i++){
    const x=rnd()*W, y=rnd()*H, r=rnd()*1.9+0.4, a=rnd()*0.55+0.12;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,'+a.toFixed(2)+')'; ctx.fill();
  }
}

function drawMoon(ctx, cx, cy, R, elong){
  ctx.save();
  ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2);
  ctx.fillStyle='#141430'; ctx.fill();
  ctx.strokeStyle='rgba(201,168,76,0.30)'; ctx.lineWidth=2; ctx.stroke();

  const k=Math.cos(elong*Math.PI/180), rx=Math.abs(k)*R, right=elong<180;
  ctx.beginPath();
  ctx.ellipse(cx,cy,R,R, 0, -Math.PI/2, Math.PI/2, !right);
  // اتجاه قوس الحدّ الفاصل: يتحدّب نحو الجانب المضاء في الهلال، ونحو المظلم في الأحدب
  ctx.ellipse(cx,cy,rx,R, 0, Math.PI/2, -Math.PI/2, (k>0)===right);
  ctx.closePath();
  const g=ctx.createRadialGradient(cx-R*0.25,cy-R*0.3,R*0.15,cx,cy,R*1.05);
  g.addColorStop(0,'#FFF8E4'); g.addColorStop(0.62,'#EBD9A4'); g.addColorStop(1,'#B99B57');
  ctx.fillStyle=g; ctx.fill();

  ctx.clip();
  ctx.fillStyle='rgba(120,100,60,0.20)';
  [[-0.26,-0.34,0.16],[0.24,-0.05,0.11],[-0.10,0.34,0.19],[0.38,0.44,0.08]]
    .forEach(([dx,dy,r])=>{ ctx.beginPath(); ctx.arc(cx+dx*R,cy+dy*R,r*R,0,Math.PI*2); ctx.fill(); });
  ctx.restore();
}

function line(ctx,text,y,size,color,weight){
  ctx.font=weight+' '+size+'px "'+F1+'","'+F2+'",sans-serif';
  ctx.fillStyle=color; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(text, W/2, y);
}

function draw(y,m,d){
  const cv=document.getElementById('cv'), ctx=cv.getContext('2d');
  ctx.direction = RTL ? 'rtl' : 'ltr';

  const jd=gToJ(y,m,d), Hd=jToH(jd), p=moonPhase(y,m,d);
  const now=new Date(), tH=jToH(gToJ(now.getFullYear(),now.getMonth()+1,now.getDate()));
  let ha=tH.y-Hd.y; if(tH.m<Hd.m||(tH.m===Hd.m&&tH.d<Hd.d)) ha--;

  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'#07071A'); bg.addColorStop(0.55,'#0C0C22'); bg.addColorStop(1,'#07071A');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  stars(ctx, jd);

  ctx.strokeStyle='rgba(201,168,76,0.26)'; ctx.lineWidth=3;
  ctx.strokeRect(46,46,W-92,H-92);

  line(ctx,TX.site,150,58,'#C9A84C','900');
  line(ctx,TX.kicker,215,30,'rgba(240,237,232,0.55)','400');

  drawMoon(ctx, W/2, 430, 150, p.elongation);
  line(ctx,PH[p.idx]+' · '+Math.round(p.illum*100)+'%',632,30,'rgba(240,237,232,0.55)','400');

  line(ctx, Hd.d+' '+MH[Hd.m-1], 760, 86, '#E8C97A','900');
  line(ctx, Hd.y+SH, 850, 62, '#C9A84C','700');

  ctx.strokeStyle='rgba(201,168,76,0.22)'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(W/2-190,920); ctx.lineTo(W/2+190,920); ctx.stroke();

  line(ctx, d+' '+MG[m-1]+' '+y+SG, 985, 42,'#F0EDE8','700');
  line(ctx, WD[(jd+1)%7], 1048, 32,'rgba(240,237,232,0.55)','400');

  if(ha>=0) line(ctx, TX.age+': '+ha+' '+TX.years, 1140, 34,'#C9A84C','700');
  line(ctx,'mawlidi.com',1252,28,'rgba(240,237,232,0.38)','400');

  lastName='mawlidi-'+Hd.y+'-'+Hd.m+'-'+Hd.d+'.png';
  return new Promise(res=>cv.toBlob(b=>{lastBlob=b;res(b);},'image/png'));
}

async function run(){
  const d=+document.getElementById('fD').value, m=+document.getElementById('fM').value,
        y=+document.getElementById('fY').value;
  if(!y||y<1900||y>2099) return show(TX.errY);
  const t=new Date(y,m-1,d);
  if(t.getFullYear()!==y||t.getMonth()!==m-1||t.getDate()!==d) return show(TX.errD);
  document.getElementById('err').hidden=true;
  document.getElementById('out').hidden=false;
  if(document.fonts && document.fonts.ready) await document.fonts.ready;
  await draw(y,m,d);
}

document.getElementById('dlBtn').onclick=()=>{
  if(!lastBlob) return;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(lastBlob); a.download=lastName;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
};

(function(){
  const b=document.getElementById('shBtn');
  if(!(navigator.canShare && navigator.share)) return;
  b.hidden=false;
  b.onclick=async()=>{
    if(!lastBlob) return;
    const f=new File([lastBlob],lastName,{type:'image/png'});
    if(!navigator.canShare({files:[f]})) return show(TX.shareFail);
    try{ await navigator.share({files:[f], title:TX.share, text:TX.share}); }
    catch(e){ if(e && e.name!=='AbortError') show(TX.shareFail); }
  };
})();

document.getElementById('fY').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
</script>
</body>
</html>
`;
};
