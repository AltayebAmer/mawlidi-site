/* قالب صفحة التقويم الهجري السنوي — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';
const INTROS = require('./intros.js');

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@300;400;700;900&family=Cairo:wght@300;400;600;700;900",
    title:'التقويم الهجري لسنة كاملة',
    h1:'التقويم الهجري',
    desc:'استعرض أي سنة هجرية كاملة بأشهرها وأيامها مقابل التاريخ الميلادي، واطبعها بضغطة واحدة.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    year:'السنة الهجرية', prev:'السابقة', next:'التالية', print:'🖨 طباعة', today:'اليوم',
    days:'يوماً', corresponds:'يوافق',
    err:'أدخل سنة هجرية بين 1318 و 1523',
    note:'الحساب بالتقويم الهجري الجدولي (خوارزمية كويتية) — حسابي لا رصدي، وقد يفرق يوماً واحداً عن الرؤية الشرعية في بلدك.',
    conv:'محوّل التاريخ', convHref:'../converter/',
    more:'اقرأ عن التقويم الهجري', moreHref:'../articles/hijri-calendar-civilization/',
    occ:'مناسبات السنة',
    events:[[1,1,'رأس السنة الهجرية'],[1,10,'عاشوراء'],[3,12,'المولد النبوي'],
            [9,1,'غرة رمضان'],[10,1,'عيد الفطر'],[12,9,'يوم عرفة'],[12,10,'عيد الأضحى']]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900",
    title:'Full-Year Hijri Calendar',
    h1:'Hijri Calendar',
    desc:'Browse any complete Hijri year, month by month, against the Gregorian dates — and print it in one click.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    year:'Hijri year', prev:'Previous', next:'Next', print:'🖨 Print', today:'Today',
    days:'days', corresponds:'corresponds to',
    err:'Enter a Hijri year between 1318 and 1523',
    note:'Based on the tabular Hijri calendar (Kuwaiti algorithm) — arithmetic, not observational. It may differ by one day from the local moon sighting.',
    conv:'Date Converter', convHref:'../converter/',
    more:'Read about the Hijri calendar', moreHref:'../articles/hijri-calendar-civilization/',
    occ:'Occasions this year',
    events:[[1,1,'Islamic New Year'],[1,10,'Ashura'],[3,12,'Mawlid al-Nabi'],
            [9,1,'First of Ramadan'],[10,1,'Eid al-Fitr'],[12,9,'Day of Arafah'],[12,10,'Eid al-Adha']]
  }
};

const MONTHS = {
  arb: {
    g:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    h:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
    w:['أحد','إثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'], sg:'م', sh:'هـ'
  },
  eng: {
    g:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    h:['Muharram','Safar','Rabiʿ al-Awwal','Rabiʿ al-Thani','Jumada al-Ula','Jumada al-Akhira','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿda','Dhu al-Hijja'],
    w:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], sg:'CE', sh:'AH'
  }
};

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

module.exports = function calendarPage(lang) {
  const INTRO = INTROS['calendar'][lang];
  const L = T[lang], M = MONTHS[lang];
  const url = `${SITE}/${lang}/calendar/`;
  const other = lang === 'arb' ? 'eng' : 'arb';
  const ld = { '@context':'https://schema.org','@type':'WebApplication', name:L.title,
    description:L.desc, url, applicationCategory:'UtilityApplication', inLanguage:L.code,
    offers:{'@type':'Offer', price:'0', priceCurrency:'USD'} };

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
<link rel="alternate" hreflang="${other === 'eng' ? 'en' : 'ar'}" href="${SITE}/${other}/calendar/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/calendar/">
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
<link rel="stylesheet" href="../../assets/calendar.css">
<style>body{font-family:${L.font};}</style>
</head>
<body>
<nav class="crumb no-print"><a href="../">${L.home}</a> <span>/</span> <span>${esc(L.h1)}</span></nav>

<main class="cal">
  <h1>${esc(L.h1)}</h1>
  <p class="tool-sub no-print">${esc(L.desc)}</p>

  <div class="yr-bar no-print">
    <button class="ghost" onclick="step(-1)">${L.prev}</button>
    <label class="yr-in"><span>${L.year}</span>
      <input id="yr" type="number" inputmode="numeric" onchange="render()"></label>
    <button class="ghost" onclick="step(1)">${L.next}</button>
  </div>
  <div class="acts no-print">
    <button class="go" onclick="window.print()">${L.print}</button>
    <button class="ghost" onclick="goToday()">${L.today}</button>
  </div>
  <p class="err no-print" id="err" hidden></p>

  <h2 class="yr-head" id="yrHead"></h2>
  <p class="yr-span" id="yrSpan"></p>

  <section class="occ" id="occ"></section>
  <div class="months" id="months"></div>

  <section class="anwa intro-block no-print">
    <h2 class="mini-h">${esc(INTRO[0])}</h2>
${INTRO[1].map(t=>`    <p>${esc(t)}</p>`).join('\n')}
  </section>

  <p class="note no-print">${esc(L.note)}</p>
  <div class="no-print" data-ad-slot="leaderboard"></div>
  <p class="tool-link no-print">
    <a href="${L.convHref}">${esc(L.conv)} →</a> &nbsp;·&nbsp;
    <a href="${L.moreHref}">${esc(L.more)} →</a>
  </p>
</main>

<div class="no-print" data-artist-corner></div>
<footer class="foot no-print"><a class="btn" href="../">${L.back}</a></footer>
<script src="../../assets/ads.js"></script>

<script src="../../assets/hijri.js"></script>
<script>
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)}, WD=${JSON.stringify(M.w)};
const SG=${JSON.stringify(M.sg)}, SH=${JSON.stringify(M.sh)};
const EVENTS=${JSON.stringify(L.events)};
const TXT={days:${JSON.stringify(L.days)}, corr:${JSON.stringify(L.corresponds)},
           err:${JSON.stringify(L.err)}, occ:${JSON.stringify(L.occ)}};

function gLabel(g){ return g.d+' '+MG[g.m-1]+' '+g.y; }

function render(){
  const y=+document.getElementById('yr').value, err=document.getElementById('err');
  if(!y||y<1318||y>1523){ err.textContent=TXT.err; err.hidden=false; return; }
  err.hidden=true;

  const startJD=hToJ(y,1,1), endJD=hToJ(y+1,1,1)-1;
  document.getElementById('yrHead').textContent=y+SH;
  document.getElementById('yrSpan').textContent=
    TXT.corr+' '+gLabel(jToG(startJD))+SG+' — '+gLabel(jToG(endJD))+SG;

  // مناسبات السنة
  const occ=EVENTS.map(([m,d,name])=>{
    const g=jToG(hToJ(y,m,d));
    return '<div class="occ-row"><span class="occ-name">'+name+'</span>'+
           '<span class="occ-h">'+d+' '+MH[m-1]+'</span>'+
           '<span class="occ-g">'+gLabel(g)+SG+'</span></div>';
  }).join('');
  document.getElementById('occ').innerHTML='<h3>'+TXT.occ+'</h3>'+occ;

  // الأشهر
  const todayJD=(n=>gToJ(n.getFullYear(),n.getMonth()+1,n.getDate()))(new Date());
  let html='';
  for(let m=1;m<=12;m++){
    const jd0=hToJ(y,m,1), len=hMonthLen(y,m), lead=(jd0+1)%7;
    let cells='';
    for(let i=0;i<lead;i++) cells+='<div class="c empty"></div>';
    for(let d=1;d<=len;d++){
      const jd=jd0+d-1, g=jToG(jd);
      const cls='c'+(jd===todayJD?' now':'')+((jd+1)%7===5?' fri':'');
      cells+='<div class="'+cls+'"><b>'+d+'</b><i>'+g.d+'/'+g.m+'</i></div>';
    }
    html+='<section class="mo"><h3>'+MH[m-1]+' <small>'+len+' '+TXT.days+'</small></h3>'+
          '<div class="wd">'+WD.map(w=>'<span>'+w+'</span>').join('')+'</div>'+
          '<div class="grid7">'+cells+'</div></section>';
  }
  document.getElementById('months').innerHTML=html;
  history.replaceState(null,'','?y='+y);
}
function step(n){ const i=document.getElementById('yr'); i.value=+i.value+n; render(); }
function goToday(){
  const n=new Date();
  document.getElementById('yr').value=jToH(gToJ(n.getFullYear(),n.getMonth()+1,n.getDate())).y;
  render();
}
const qy=+new URLSearchParams(location.search).get('y');
if(qy>=1318&&qy<=1523){ document.getElementById('yr').value=qy; render(); } else goToday();
</script>
</body>
</html>
`;
};
