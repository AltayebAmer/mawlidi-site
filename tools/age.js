/* قالب صفحة حاسبة العمر — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';
const INTROS = require('./intros.js');

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@300;400;700;900&family=Cairo:wght@300;400;600;700;900",
    title:'حاسبة العمر بالهجري والميلادي',
    h1:'حاسبة العمر',
    desc:'احسب عمرك بالضبط بالسنوات والأشهر والأيام، في التقويمين الهجري والميلادي معاً، مع موعد ميلادك القادم.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    day:'اليوم', month:'الشهر', year:'السنة', go:'احسب',
    errY:'أدخل سنة بين 1900 و 2099', errD:'التاريخ غير صحيح، تحقق من اليوم والشهر',
    errF:'تاريخ الميلاد في المستقبل',
    gAge:'عمرك بالميلادي', hAge:'عمرك بالهجري',
    yrs:'سنة', mos:'شهراً', dys:'يوماً',
    born:'وُلدت يوم', bornH:'ويوافق',
    totals:'بالأرقام', tDays:'يوماً عشته', tWeeks:'أسبوعاً', tHours:'ساعة', tBreath:'نفَساً تقريباً',
    nextG:'ميلادك الميلادي القادم', nextH:'ميلادك الهجري القادم', after:'بعد', dleft:'يوماً',
    note:'الفرق بين العمرين ليس خطأً: السنة القمرية أقصر من الشمسية بأحد عشر يوماً، فكل 33 سنة ميلادية تعادل نحو 34 سنة هجرية.',
    l1:'التقويم الهجري السنوي', h1r:'../calendar/',
    l2:'محوّل التاريخ', h2r:'../converter/',
    l3:'كيف كان القمر يوم ميلادك؟',
    occ:'اقرأ: لماذا يختلف شخصان وُلدا في اليوم نفسه؟', occr:'../articles/why-two-people-born-same-day-differ/',
    faq:[
      ['كيف أحسب عمري بالهجري؟',
       'عمرك الهجري يُحسب بتحويل تاريخ ميلادك الميلادي إلى ما يقابله في التقويم الهجري، ثم حساب الفارق بينه وبين التاريخ الهجري اليوم. ولأن السنة القمرية أقصر بنحو أحد عشر يوماً، يكون عمرك الهجري أكبر من الميلادي دائماً — بفارق سنة تقريباً كل 33 سنة.'],
      ['لماذا يزيد عمري الهجري عن الميلادي؟',
       'السنة الهجرية اثنا عشر شهراً قمرياً مجموعها نحو 354 يوماً، بينما السنة الميلادية 365 يوماً. الفارق أحد عشر يوماً سنوياً يتراكم، فمن بلغ 33 عاماً ميلادياً يكون قد أتمّ نحو 34 عاماً هجرياً.'],
      ['هل الحساب هنا دقيق؟',
       'الحساب يعتمد التقويم الهجري الجدولي المستخدم في الأنظمة الرسمية والبرمجية. أما بداية الشهر في بعض البلدان فتُحدَّد برؤية الهلال، وقد تفرق يوماً واحداً عن الحساب الجدولي.']
    ]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900",
    title:'Age Calculator — Hijri and Gregorian',
    h1:'Age Calculator',
    desc:'Work out your exact age in years, months and days across both the Hijri and Gregorian calendars, with your next birthday in each.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    day:'Day', month:'Month', year:'Year', go:'Calculate',
    errY:'Enter a year between 1900 and 2099', errD:'Invalid date — check the day and month',
    errF:'That birth date is in the future',
    gAge:'Gregorian age', hAge:'Hijri age',
    yrs:'years', mos:'months', dys:'days',
    born:'You were born on', bornH:'which corresponds to',
    totals:'In numbers', tDays:'days lived', tWeeks:'weeks', tHours:'hours', tBreath:'breaths, roughly',
    nextG:'Next Gregorian birthday', nextH:'Next Hijri birthday', after:'in', dleft:'days',
    note:'The gap between the two ages is not an error: the lunar year is eleven days shorter than the solar one, so 33 Gregorian years amount to about 34 Hijri years.',
    l1:'Full-year Hijri calendar', h1r:'../calendar/',
    l2:'Date converter', h2r:'../converter/',
    l3:'What did the Moon look like on your birthday?',
    occ:'Read: Why do two people born on the same day differ?', occr:'../articles/why-two-people-born-same-day-differ/',
    faq:[
      ['How do I calculate my age in Hijri years?',
       'Your Hijri age comes from converting your Gregorian birth date into the Hijri calendar, then measuring the gap to today’s Hijri date. Because the lunar year is about eleven days shorter, your Hijri age is always the larger of the two — by roughly one year for every 33 years lived.'],
      ['Why is my Hijri age higher than my Gregorian age?',
       'A Hijri year is twelve lunar months, about 354 days. A Gregorian year is 365 days. That eleven-day annual gap accumulates, so someone who has lived 33 Gregorian years has completed about 34 Hijri years.'],
      ['Is this calculation exact?',
       'It uses the tabular Hijri calendar adopted in official and computational systems. Where the month begins with a physical moon sighting, the date may differ by one day.']
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

module.exports = function agePage(lang){
  const INTRO = INTROS['age'][lang];
  const L=T[lang], M=MONTHS[lang];
  const url=`${SITE}/${lang}/age/`;
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
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/age/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/age/">
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
    <div class="age-pair">
      <div class="age-box"><div class="age-lbl">${L.gAge}</div><div class="age-val" id="agG"></div></div>
      <div class="age-box"><div class="age-lbl">${L.hAge}</div><div class="age-val" id="agH"></div></div>
    </div>
    <div class="out"><div class="out-lbl">${L.born}</div>
      <div class="out-main" id="bornG"></div>
      <div class="out-week" id="bornH"></div>
      <div class="out-week" id="bornW"></div>
    </div>
    <h2 class="mini-h">${L.totals}</h2>
    <div class="tot-grid" id="tot"></div>
    <h2 class="mini-h">${L.nextG}</h2>
    <div class="out"><div class="out-main" id="nxG"></div><div class="out-week" id="nxGd"></div></div>
    <h2 class="mini-h">${L.nextH}</h2>
    <div class="out"><div class="out-main" id="nxH"></div><div class="out-week" id="nxHd"></div></div>
  </section>

  <p class="note">${esc(L.note)}</p>
  <p class="tool-link">
    <a href="${L.h1r}">${esc(L.l1)} →</a> &nbsp;·&nbsp;
    <a href="${L.h2r}">${esc(L.l2)} →</a><br>
    <a href="../moon/">${esc(L.l3)} →</a><br>
    <a href="${L.occr}">${esc(L.occ)} →</a>
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
<script>
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)}, WD=${JSON.stringify(M.w)};
const SG=${JSON.stringify(M.sg)}, SH=${JSON.stringify(M.sh)};
const L=${JSON.stringify({errY:L.errY,errD:L.errD,errF:L.errF,yrs:L.yrs,mos:L.mos,dys:L.dys,
  bornH:L.bornH,tDays:L.tDays,tWeeks:L.tWeeks,tHours:L.tHours,tBreath:L.tBreath,
  after:L.after,dleft:L.dleft})};

(function(){
  const d=document.getElementById('fD'), m=document.getElementById('fM');
  for(let i=1;i<=31;i++) d.innerHTML+='<option value="'+i+'">'+i+'</option>';
  MG.forEach((n,i)=>m.innerHTML+='<option value="'+(i+1)+'">'+n+'</option>');
})();

const nf=n=>n.toLocaleString(${JSON.stringify(L.code==='ar'?'ar-EG':'en-US')});
function show(msg){const e=document.getElementById('err');e.textContent=msg;e.hidden=false;document.getElementById('out').hidden=true;}

// فارق تقويمي بالسنوات والأشهر والأيام، يعمل للتقويمين
function diff(b,t,lenOfMonth){
  let y=t.y-b.y, m=t.m-b.m, d=t.d-b.d;
  if(d<0){ m--; const pm=t.m===1?12:t.m-1, py=t.m===1?t.y-1:t.y; d+=lenOfMonth(py,pm); }
  if(m<0){ m+=12; y--; }
  return {y,m,d};
}
const gLen=(y,m)=>new Date(y,m,0).getDate();

function run(){
  const d=+document.getElementById('fD').value, m=+document.getElementById('fM').value,
        y=+document.getElementById('fY').value;
  if(!y||y<1900||y>2099) return show(L.errY);
  const t=new Date(y,m-1,d);
  if(t.getFullYear()!==y||t.getMonth()!==m-1||t.getDate()!==d) return show(L.errD);
  const now=new Date(), bJD=gToJ(y,m,d),
        tJD=gToJ(now.getFullYear(),now.getMonth()+1,now.getDate());
  if(bJD>tJD) return show(L.errF);
  document.getElementById('err').hidden=true;

  const bH=jToH(bJD), tH=jToH(tJD);
  const dg=diff({y,m,d},{y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate()},gLen);
  const dh=diff(bH,tH,hMonthLen);
  const fmt=o=>o.y+' '+L.yrs+' · '+o.m+' '+L.mos+' · '+o.d+' '+L.dys;
  document.getElementById('agG').textContent=fmt(dg);
  document.getElementById('agH').textContent=fmt(dh);

  document.getElementById('bornG').textContent=d+' '+MG[m-1]+' '+y+SG;
  document.getElementById('bornH').textContent=L.bornH+' '+bH.d+' '+MH[bH.m-1]+' '+bH.y+SH;
  document.getElementById('bornW').textContent=WD[(bJD+1)%7];

  const days=tJD-bJD;
  document.getElementById('tot').innerHTML=
    [[nf(days),L.tDays],[nf(Math.floor(days/7)),L.tWeeks],
     [nf(days*24),L.tHours],[nf(days*24*60*16),L.tBreath]]
    .map(([v,l])=>'<div class="tot"><b>'+v+'</b><span>'+l+'</span></div>').join('');

  // الميلاد الميلادي القادم
  let ng=new Date(now.getFullYear(),m-1,d);
  if(gToJ(ng.getFullYear(),m,d)<=tJD) ng=new Date(now.getFullYear()+1,m-1,d);
  const ngJD=gToJ(ng.getFullYear(),m,d);
  document.getElementById('nxG').textContent=d+' '+MG[m-1]+' '+ng.getFullYear()+SG;
  document.getElementById('nxGd').textContent=L.after+' '+nf(ngJD-tJD)+' '+L.dleft;

  // الميلاد الهجري القادم — يتخطّى السنوات التي لا يوجد فيها هذا اليوم
  let hy=tH.y, nhJD=null;
  for(let k=0;k<4 && nhJD===null;k++,hy++){
    if(!hValid(hy,bH.m,bH.d)) continue;
    const jd=hToJ(hy,bH.m,bH.d);
    if(jd>tJD) nhJD=jd; }
  const nhH=jToH(nhJD), nhG=jToG(nhJD);
  document.getElementById('nxH').textContent=
    nhH.d+' '+MH[nhH.m-1]+' '+nhH.y+SH+' — '+nhG.d+' '+MG[nhG.m-1]+' '+nhG.y+SG;
  document.getElementById('nxHd').textContent=L.after+' '+nf(nhJD-tJD)+' '+L.dleft;

  document.getElementById('out').hidden=false;
}
document.getElementById('fY').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
</script>
</body>
</html>
`;
};
