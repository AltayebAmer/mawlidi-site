/* قالب صفحة العد التنازلي للمناسبات الهجرية — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';
const INTROS = require('./intros.js');

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@300;400;700;900&family=Cairo:wght@300;400;600;700;900",
    title:'كم باقي على رمضان والعيد؟ عد تنازلي',
    h1:'العد التنازلي',
    desc:'كم بقي على رمضان وعيد الفطر وعيد الأضحى ورأس السنة الهجرية؟ عد تنازلي مباشر بالأيام والساعات.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    d:'يوم', h:'ساعة', m:'دقيقة', s:'ثانية', todayIs:'اليوم! 🌙',
    note:'المواعيد محسوبة بالتقويم الهجري الجدولي — حسابية لا رصدية، وقد تفرق يوماً واحداً عن إعلان بلدك المبني على رؤية الهلال.',
    l1:'التقويم الهجري السنوي', h1r:'../calendar/',
    l2:'محوّل التاريخ', h2r:'../converter/',
    events:[[9,1,'🌙','غرة رمضان'],[10,1,'🎉','عيد الفطر'],[12,9,'🕋','يوم عرفة'],
            [12,10,'🐑','عيد الأضحى'],[1,1,'✨','رأس السنة الهجرية'],[1,10,'📿','عاشوراء'],
            [3,12,'🕌','المولد النبوي']],
    faq:[
      ['كم باقي على رمضان؟',
       'العدّاد في أعلى هذه الصفحة يحسب المدة المتبقية حتى غرة رمضان بالتقويم الهجري الجدولي، ويتحدّث كل ثانية. انتبه إلى أن بداية الشهر في كثير من البلدان تُعلَن برؤية الهلال، وقد تتقدّم أو تتأخّر يوماً واحداً عن الحساب.'],
      ['لماذا يتغيّر موعد رمضان كل سنة؟',
       'رمضان شهر قمري، والسنة القمرية أقصر من الشمسية بأحد عشر يوماً تقريباً. لذلك يتقدّم رمضان في التقويم الميلادي أحد عشر يوماً كل عام، فيدور عبر الفصول الأربعة ويعود إلى الموضع نفسه بعد نحو 33 سنة.'],
      ['هل موعد العيد هنا رسمي؟',
       'لا. هذه الصفحة تعرض الحساب الفلكي الجدولي وهو تقدير دقيق لكنه ليس إعلاناً شرعياً. الإعلان الرسمي يصدر عن الجهة المختصة في بلدك بعد ثبوت الرؤية.']
    ]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900",
    title:'How Long Until Ramadan and Eid? Live Countdown',
    h1:'Countdown',
    desc:'How many days until Ramadan, Eid al-Fitr, Eid al-Adha and the Islamic New Year — a live countdown in days and hours.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    d:'days', h:'hours', m:'min', s:'sec', todayIs:'Today! 🌙',
    note:'Dates are computed with the tabular Hijri calendar — arithmetic, not observational. Your country’s announcement, based on sighting the crescent, may differ by one day.',
    l1:'Full-year Hijri calendar', h1r:'../calendar/',
    l2:'Date converter', h2r:'../converter/',
    events:[[9,1,'🌙','First of Ramadan'],[10,1,'🎉','Eid al-Fitr'],[12,9,'🕋','Day of Arafah'],
            [12,10,'🐑','Eid al-Adha'],[1,1,'✨','Islamic New Year'],[1,10,'📿','Ashura'],
            [3,12,'🕌','Mawlid al-Nabi']],
    faq:[
      ['How long until Ramadan?',
       'The counter at the top of this page measures the time remaining until the first of Ramadan in the tabular Hijri calendar, updating every second. Bear in mind that many countries announce the start of the month by sighting the crescent, which can fall a day earlier or later.'],
      ['Why does Ramadan move every year?',
       'Ramadan is a lunar month, and the lunar year is about eleven days shorter than the solar one. Ramadan therefore shifts eleven days earlier in the Gregorian calendar each year, travelling through all four seasons and returning to the same point after roughly 33 years.'],
      ['Is the Eid date here official?',
       'No. This page shows an astronomical, tabular calculation — precise, but not a religious announcement. The official date is declared by the relevant authority in your country once the crescent has been sighted.']
    ]
  }
};

const MONTHS = {
  arb:{ g:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
        h:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
        w:['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'], sg:'م', sh:'هـ' },
  eng:{ g:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        h:['Muharram','Safar','Rabiʿ al-Awwal','Rabiʿ al-Thani','Jumada al-Ula','Jumada al-Akhira','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿda','Dhu al-Hijja'],
        w:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], sg:'CE', sh:'AH' }
};

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

module.exports = function countdownPage(lang){
  const INTRO = INTROS['countdown'][lang];
  const L=T[lang], M=MONTHS[lang];
  const url=`${SITE}/${lang}/countdown/`;
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
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/countdown/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/countdown/">
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
  <div class="cd-list" id="list"></div>
  <p class="note">${esc(L.note)}</p>
  <p class="tool-link">
    <a href="../ramadan-2027/">${lang==='arb'?'متى رمضان 2027؟':'When is Ramadan 2027?'} →</a><br>
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
<script>
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)}, WD=${JSON.stringify(M.w)};
const SG=${JSON.stringify(M.sg)}, SH=${JSON.stringify(M.sh)};
const EV=${JSON.stringify(L.events)};
const U=${JSON.stringify({d:L.d,h:L.h,m:L.m,s:L.s,today:L.todayIs})};

// أقرب وقوع قادم لكل مناسبة: منتصف ليل اليوم الهجري بالتوقيت المحلي
function nextOccurrence(hm,hd){
  const n=new Date(), todayJD=gToJ(n.getFullYear(),n.getMonth()+1,n.getDate());
  let y=jToH(todayJD).y;
  for(let k=0;k<3;k++,y++){
    if(!hValid(y,hm,hd)) continue;
    const jd=hToJ(y,hm,hd);
    if(jd>=todayJD){ const g=jToG(jd); return {jd,g,hy:y}; }
  }
  return null;
}
const ITEMS=EV.map(([hm,hd,icon,name])=>{
  const o=nextOccurrence(hm,hd);
  return {icon,name,hm,hd,...o,date:new Date(o.g.y,o.g.m-1,o.g.d)};
}).sort((a,b)=>a.jd-b.jd);

document.getElementById('list').innerHTML=ITEMS.map((it,i)=>
  '<div class="cd'+(i===0?' soon':'')+'">'+
    '<div class="cd-top"><span class="cd-name">'+it.icon+' '+it.name+'</span>'+
    '<span class="cd-when">'+it.hd+' '+MH[it.hm-1]+' '+it.hy+SH+' — '+
      it.g.d+' '+MG[it.g.m-1]+' '+it.g.y+SG+' · '+WD[(it.jd+1)%7]+'</span></div>'+
    '<div class="cd-clock" id="c'+i+'"></div>'+
  '</div>').join('');

function tick(){
  const now=Date.now();
  ITEMS.forEach((it,i)=>{
    const el=document.getElementById('c'+i), ms=it.date.getTime()-now;
    if(ms<=0){ el.outerHTML='<div class="cd-today" id="c'+i+'">'+U.today+'</div>'; return; }
    const d=Math.floor(ms/864e5), h=Math.floor(ms/36e5)%24,
          m=Math.floor(ms/6e4)%60, s=Math.floor(ms/1e3)%60;
    el.innerHTML=[[d,U.d],[h,U.h],[m,U.m],[s,U.s]]
      .map(([v,l])=>'<div class="cd-u"><b>'+v+'</b><span>'+l+'</span></div>').join('');
  });
}
tick(); setInterval(tick,1000);
</script>
</body>
</html>
`;
};
