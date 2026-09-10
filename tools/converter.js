/* قالب صفحة محوّل التاريخ الهجري ↔ الميلادي — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@300;400;700;900&family=Cairo:wght@300;400;600;700;900",
    title:'محوّل التاريخ الهجري والميلادي',
    h1:'محوّل التاريخ',
    desc:'حوّل أي تاريخ من الهجري إلى الميلادي أو العكس، فوراً وبلا إنترنت. يشمل اليوم واسم الشهر ويوم الأسبوع.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    tabG:'ميلادي ← هجري', tabH:'هجري ← ميلادي',
    day:'اليوم', month:'الشهر', year:'السنة', go:'حوّل', today:'اليوم',
    resTitle:'النتيجة', weekday:'يوم', copy:'نسخ', copied:'نُسخ ✓',
    errY:'أدخل سنة بين 1900 و 2099', errH:'أدخل سنة هجرية بين 1318 و 1523',
    errD:'هذا التاريخ غير موجود في التقويم الهجري',
    note:'الحساب بالتقويم الهجري الجدولي (خوارزمية كويتية) — حسابي لا رصدي، وقد يفرق يوماً واحداً عن الرؤية الشرعية في بلدك.',
    cal:'التقويم الهجري السنوي', more:'اقرأ عن التقويم الهجري', moreHref:'../articles/hijri-calendar-civilization/',
    faq:[
      ['لماذا تختلف السنة الهجرية عن الميلادية بأحد عشر يوماً؟',
       'السنة الهجرية قمرية، تتكوّن من اثني عشر شهراً قمرياً طول كل منها 29 أو 30 يوماً، فيبلغ مجموعها 354 يوماً تقريباً. أما السنة الميلادية فشمسية وطولها 365 يوماً. الفرق بينهما نحو أحد عشر يوماً، ولهذا تتقدّم المناسبات الهجرية عبر فصول السنة الميلادية.'],
      ['هل هذا التحويل دقيق تماماً؟',
       'التحويل هنا يعتمد التقويم الهجري الجدولي المستخدم في الحسابات الرسمية والبرمجية. لكن بداية الشهر الهجري في بعض البلدان تُحدَّد برؤية الهلال، وقد تفرق يوماً واحداً عن الحساب الجدولي.'],
      ['كم عمري بالهجري؟',
       'العمر الهجري أكبر من الميلادي لأن السنة القمرية أقصر. كل 33 سنة ميلادية تعادل نحو 34 سنة هجرية. لحساب عمرك الهجري بدقة مع موعد ميلادك القادم، استخدم حاسبة مَوْلِدي في الصفحة الرئيسية.']
    ]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900",
    title:'Hijri ↔ Gregorian Date Converter',
    h1:'Date Converter',
    desc:'Convert any date between the Hijri and Gregorian calendars instantly, offline. Includes the weekday and month name.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    tabG:'Gregorian → Hijri', tabH:'Hijri → Gregorian',
    day:'Day', month:'Month', year:'Year', go:'Convert', today:'Today',
    resTitle:'Result', weekday:'Weekday', copy:'Copy', copied:'Copied ✓',
    errY:'Enter a year between 1900 and 2099', errH:'Enter a Hijri year between 1318 and 1523',
    errD:'This date does not exist in the Hijri calendar',
    note:'Based on the tabular Hijri calendar (Kuwaiti algorithm) — arithmetic, not observational. It may differ by one day from the local moon sighting.',
    cal:'Full-year Hijri calendar', more:'Read about the Hijri calendar', moreHref:'../articles/hijri-calendar-civilization/',
    faq:[
      ['Why is the Hijri year 11 days shorter than the Gregorian year?',
       'The Hijri year is lunar: twelve lunar months of 29 or 30 days each, totalling about 354 days. The Gregorian year is solar, at 365 days. The eleven-day gap is why Islamic occasions drift backwards through the Gregorian seasons.'],
      ['Is this conversion exact?',
       'It uses the tabular Hijri calendar adopted in official and computational use. In countries where the month begins with the physical sighting of the crescent, the date may differ by one day.'],
      ['How old am I in Hijri years?',
       'Your Hijri age is higher than your Gregorian age because the lunar year is shorter — roughly 34 Hijri years for every 33 Gregorian ones. For your exact Hijri age and your next lunar birthday, use the Mawlidi calculator on the home page.']
    ]
  }
};

const MONTHS = {
  arb: {
    g:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
    h:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
    w:['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
    suffG:'م', suffH:'هـ'
  },
  eng: {
    g:['January','February','March','April','May','June','July','August','September','October','November','December'],
    h:['Muharram','Safar','Rabiʿ al-Awwal','Rabiʿ al-Thani','Jumada al-Ula','Jumada al-Akhira','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿda','Dhu al-Hijja'],
    w:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    suffG:'CE', suffH:'AH'
  }
};

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

module.exports = function converterPage(lang) {
  const L = T[lang], M = MONTHS[lang];
  const url = `${SITE}/${lang}/converter/`;
  const other = lang === 'arb' ? 'eng' : 'arb';
  const ld = [
    { '@context':'https://schema.org','@type':'WebApplication', name:L.title,
      description:L.desc, url, applicationCategory:'UtilityApplication',
      inLanguage:L.code, offers:{'@type':'Offer', price:'0', priceCurrency:'USD'} },
    { '@context':'https://schema.org','@type':'FAQPage',
      mainEntity: L.faq.map(([q,a]) => ({'@type':'Question', name:q,
        acceptedAnswer:{'@type':'Answer', text:a}})) }
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
<link rel="alternate" hreflang="${other === 'eng' ? 'en' : 'ar'}" href="${SITE}/${other}/converter/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/converter/">
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

  <div class="tabs" role="tablist">
    <button class="tab on" id="tab-g" role="tab" aria-selected="true"  onclick="setMode('g')">${esc(L.tabG)}</button>
    <button class="tab"    id="tab-h" role="tab" aria-selected="false" onclick="setMode('h')">${esc(L.tabH)}</button>
  </div>

  <div class="fields">
    <label class="fld"><span>${L.day}</span><select id="fD"></select></label>
    <label class="fld"><span>${L.month}</span><select id="fM"></select></label>
    <label class="fld"><span>${L.year}</span><input id="fY" type="number" inputmode="numeric"></label>
  </div>
  <div class="acts">
    <button class="go" onclick="run()">${L.go}</button>
    <button class="ghost" onclick="setToday()">${L.today}</button>
  </div>
  <p class="err" id="err" hidden></p>

  <section class="out" id="out" hidden>
    <div class="out-lbl">${L.resTitle}</div>
    <div class="out-main" id="outMain"></div>
    <div class="out-week" id="outWeek"></div>
    <button class="ghost sm" id="copyBtn" onclick="copyOut()">${L.copy}</button>
  </section>

  <p class="note">${esc(L.note)}</p>
  <p class="tool-link"><a href="../calendar/">${esc(L.cal)} →</a> &nbsp;·&nbsp; <a href="${L.moreHref}">${esc(L.more)} →</a></p>

  <div data-ad-slot="leaderboard"></div>

  <section class="faq">
${L.faq.map(([q,a]) => `    <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
  </section>
</main>

<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${L.back}</a></footer>
<script src="../../assets/ads.js"></script>

<script src="../../assets/hijri.js"></script>
<script>
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)}, WD=${JSON.stringify(M.w)};
const SG=${JSON.stringify(M.suffG)}, SH=${JSON.stringify(M.suffH)};
const ERR={y:${JSON.stringify(L.errY)},h:${JSON.stringify(L.errH)},d:${JSON.stringify(L.errD)}};
const COPY=${JSON.stringify(L.copy)}, COPIED=${JSON.stringify(L.copied)};
let mode='g', lastText='';

function fillMonths(){
  const sel=document.getElementById('fM'), cur=sel.value;
  sel.innerHTML='';
  (mode==='g'?MG:MH).forEach((n,i)=>{
    const o=document.createElement('option'); o.value=i+1; o.textContent=n; sel.appendChild(o);
  });
  if(cur) sel.value=Math.min(+cur,12);
}
function fillDays(){
  const sel=document.getElementById('fD'), cur=sel.value;
  sel.innerHTML='';
  for(let i=1;i<=(mode==='g'?31:30);i++){
    const o=document.createElement('option'); o.value=i; o.textContent=i; sel.appendChild(o);
  }
  if(cur) sel.value=Math.min(+cur,mode==='g'?31:30);
}
function setMode(m){
  mode=m;
  document.getElementById('tab-g').classList.toggle('on',m==='g');
  document.getElementById('tab-h').classList.toggle('on',m==='h');
  document.getElementById('tab-g').setAttribute('aria-selected',m==='g');
  document.getElementById('tab-h').setAttribute('aria-selected',m==='h');
  fillMonths(); fillDays();
  document.getElementById('out').hidden=true;
  document.getElementById('err').hidden=true;
  setToday();
}
function setToday(){
  const n=new Date();
  if(mode==='g'){
    document.getElementById('fD').value=n.getDate();
    document.getElementById('fM').value=n.getMonth()+1;
    document.getElementById('fY').value=n.getFullYear();
  }else{
    const H=jToH(gToJ(n.getFullYear(),n.getMonth()+1,n.getDate()));
    document.getElementById('fD').value=H.d;
    document.getElementById('fM').value=H.m;
    document.getElementById('fY').value=H.y;
  }
  run();
}
function show(msg){const e=document.getElementById('err');e.textContent=msg;e.hidden=false;document.getElementById('out').hidden=true;}
function run(){
  const d=+document.getElementById('fD').value, m=+document.getElementById('fM').value,
        y=+document.getElementById('fY').value;
  if(mode==='g'){
    if(!y||y<1900||y>2099) return show(ERR.y);
    const t=new Date(y,m-1,d);
    if(t.getFullYear()!==y||t.getMonth()!==m-1||t.getDate()!==d) return show(ERR.d);
    const jd=gToJ(y,m,d), H=jToH(jd);
    render(H.d+' '+MH[H.m-1]+' '+H.y+SH, jd);
  }else{
    if(!y||y<1318||y>1523) return show(ERR.h);
    if(!hValid(y,m,d)) return show(ERR.d);
    const jd=hToJ(y,m,d), G=jToG(jd);
    render(G.d+' '+MG[G.m-1]+' '+G.y+SG, jd);
  }
}
function render(text, jd){
  document.getElementById('err').hidden=true;
  lastText=text;
  document.getElementById('outMain').textContent=text;
  document.getElementById('outWeek').textContent=WD[(jd+1)%7];
  document.getElementById('out').hidden=false;
  document.getElementById('copyBtn').textContent=COPY;
}
function copyOut(){
  navigator.clipboard.writeText(lastText).then(()=>{
    const b=document.getElementById('copyBtn'); b.textContent=COPIED;
    setTimeout(()=>b.textContent=COPY,1600);
  });
}
document.getElementById('fY').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
setMode('g');
</script>
</body>
</html>
`;
};
