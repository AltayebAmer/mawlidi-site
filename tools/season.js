/* ═══════════════════════════════════════════════
   صفحات المناسبات الموسمية — «متى رمضان 2027» ونظائرها

   لماذا صفحات بالسنة في العنوان: الناس تكتب «متى رمضان 2027» لا
   «التقويم الهجري». العنوان الذي يطابق العبارة حرفياً هو ما يترتّب.

   التواريخ محسوبة من assets/hijri.js لا مكتوبة يدوياً، فلا تتقادم
   ولا تحتمل خطأ نسخ. لإضافة سنة: أضف رقمها إلى YEARS في build.js.
   ═══════════════════════════════════════════════ */
const SITE = 'https://mawlidi.com';
const { hToJ, jToG, gToJ, jToH, hMonthLen } = require('../assets/hijri.js');

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const M = {
  arb:{ g:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
        h:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
        w:['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'], sg:'م', sh:'هـ' },
  eng:{ g:['January','February','March','April','May','June','July','August','September','October','November','December'],
        h:['Muharram','Safar','Rabiʿ al-Awwal','Rabiʿ al-Thani','Jumada al-Ula','Jumada al-Akhira','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿda','Dhu al-Hijja'],
        w:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], sg:'CE', sh:'AH' }
};

const L = {
  arb:{ code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    site:'مَوْلِدي', home:'الرئيسية', back:'العودة إلى مَوْلِدي',
    dayU:'يوم', hourU:'ساعة', minU:'دقيقة', secU:'ثانية', today:'اليوم! 🌙',
    remaining:'المتبقّي', corresponds:'يوافق', weekday:'يوم',
    also:'أدوات تفيدك' },
  eng:{ code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    site:'Mawlidi', home:'Home', back:'Back to Mawlidi',
    dayU:'days', hourU:'hours', minU:'min', secU:'sec', today:'Today! 🌙',
    remaining:'Time remaining', corresponds:'corresponds to', weekday:'weekday',
    also:'Tools you may need' }
};

/* المناسبات: المفتاح، الشهر واليوم الهجريان، والنصوص بلغتين */
const EVENTS = {
  ramadan: { hm:9, hd:1, slug:'ramadan',
    arb:{ h1:y=>`متى رمضان ${y}؟`,
      title:y=>`متى رمضان ${y}؟ التاريخ الهجري والميلادي بالضبط`,
      desc:y=>`رمضان ${y} يبدأ حسب التقويم الهجري الجدولي، مع عدّ تنازلي حيّ وتقويم الشهر كاملاً وموعد عيد الفطر.`,
      lead:(g,w)=>`تبدأ غرة رمضان لعام ${g.y} يوم ${w} الموافق ${g.d} ${M.arb.g[g.m-1]} ${g.y}م، بحسب التقويم الهجري الجدولي.`,
      kicker:'غرة رمضان' },
    eng:{ h1:y=>`When Is Ramadan ${y}?`,
      title:y=>`When Is Ramadan ${y}? The Exact Hijri and Gregorian Dates`,
      desc:y=>`Ramadan ${y} begins according to the tabular Hijri calendar, with a live countdown, the full month calendar and the date of Eid al-Fitr.`,
      lead:(g,w)=>`The first of Ramadan ${g.y} falls on ${w}, ${g.d} ${M.eng.g[g.m-1]} ${g.y}, according to the tabular Hijri calendar.`,
      kicker:'First of Ramadan' } },

  'eid-alfitr': { hm:10, hd:1, slug:'eid-alfitr',
    arb:{ h1:y=>`موعد عيد الفطر ${y}`,
      title:y=>`موعد عيد الفطر ${y} — التاريخ الهجري والميلادي`,
      desc:y=>`عيد الفطر لعام ${y}: تاريخه الهجري والميلادي ويوم الأسبوع، مع عدّ تنازلي حيّ وعدد أيام رمضان قبله.`,
      lead:(g,w)=>`يوافق أول أيام عيد الفطر لعام ${g.y} يوم ${w} الموافق ${g.d} ${M.arb.g[g.m-1]} ${g.y}م.`,
      kicker:'عيد الفطر' },
    eng:{ h1:y=>`Eid al-Fitr ${y}`,
      title:y=>`When Is Eid al-Fitr ${y}? Hijri and Gregorian Dates`,
      desc:y=>`Eid al-Fitr ${y}: its Hijri and Gregorian dates and weekday, with a live countdown and the length of the Ramadan before it.`,
      lead:(g,w)=>`The first day of Eid al-Fitr ${g.y} falls on ${w}, ${g.d} ${M.eng.g[g.m-1]} ${g.y}.`,
      kicker:'Eid al-Fitr' } },

  'eid-aladha': { hm:12, hd:10, slug:'eid-aladha',
    arb:{ h1:y=>`موعد عيد الأضحى ${y}`,
      title:y=>`موعد عيد الأضحى ${y} — ويوم عرفة`,
      desc:y=>`عيد الأضحى لعام ${y} ويوم عرفة قبله: التاريخ الهجري والميلادي ويوم الأسبوع، مع عدّ تنازلي حيّ.`,
      lead:(g,w)=>`يوافق أول أيام عيد الأضحى لعام ${g.y} يوم ${w} الموافق ${g.d} ${M.arb.g[g.m-1]} ${g.y}م.`,
      kicker:'عيد الأضحى' },
    eng:{ h1:y=>`Eid al-Adha ${y}`,
      title:y=>`When Is Eid al-Adha ${y}? With the Day of Arafah`,
      desc:y=>`Eid al-Adha ${y} and the Day of Arafah before it: Hijri and Gregorian dates, weekday, and a live countdown.`,
      lead:(g,w)=>`The first day of Eid al-Adha ${g.y} falls on ${w}, ${g.d} ${M.eng.g[g.m-1]} ${g.y}.`,
      kicker:'Eid al-Adha' } }
};

/* النص التفسيري لكل مناسبة — مادة قابلة للفهرسة، لا حشو */
const BODY = require('./season-text.js');

// أوجد السنة الهجرية التي تقع مناسبتها في السنة الميلادية المطلوبة
function hijriYearFor(gYear, hm, hd){
  const guess = Math.round((gYear - 622) * 1.030684) + 1;
  for (let hy = guess - 2; hy <= guess + 2; hy++) {
    const g = jToG(hToJ(hy, hm, hd));
    if (g.y === gYear) return hy;
  }
  return null;
}

module.exports = function seasonPage(lang, key, gYear){
  const E = EVENTS[key], T = L[lang], MM = M[lang], t = E[lang];
  const hy = hijriYearFor(gYear, E.hm, E.hd);
  if (!hy) return null;

  const jd = hToJ(hy, E.hm, E.hd), g = jToG(jd), wd = MM.w[(jd+1)%7];
  const slug = `${E.slug}-${gYear}`;
  const url = `${SITE}/${lang}/${slug}/`;
  const other = lang === 'arb' ? 'eng' : 'arb';
  const iso = `${g.y}-${String(g.m).padStart(2,'0')}-${String(g.d).padStart(2,'0')}`;

  // بيانات إضافية حسب المناسبة
  const extra = {};
  if (key === 'ramadan') {
    extra.len = hMonthLen(hy, 9);
    const endJd = hToJ(hy, 9, extra.len), eg = jToG(endJd);
    extra.end = `${eg.d} ${MM.g[eg.m-1]} ${eg.y}`;
    const fitr = jToG(hToJ(hy, 10, 1));
    extra.fitr = `${fitr.d} ${MM.g[fitr.m-1]} ${fitr.y}`;
    const qadr = hToJ(hy, 9, 27), qg = jToG(qadr);
    extra.qadr = `${qg.d} ${MM.g[qg.m-1]} ${qg.y} · ${MM.w[(qadr+1)%7]}`;
  }
  if (key === 'eid-alfitr') {
    const start = jToG(hToJ(hy, 9, 1));
    extra.ramadanStart = `${start.d} ${MM.g[start.m-1]} ${start.y}`;
    extra.len = hMonthLen(hy, 9);
  }
  if (key === 'eid-aladha') {
    const ar = hToJ(hy, 12, 9), ag = jToG(ar);
    extra.arafah = `${ag.d} ${MM.g[ag.m-1]} ${ag.y} · ${MM.w[(ar+1)%7]}`;
  }

  const paras = BODY[key][lang](gYear, hy, extra, MM);
  const bodyHtml = paras.map(([h, p]) =>
    (h ? `    <h2>${esc(h)}</h2>\n` : '') + `    <p>${esc(p)}</p>`).join('\n');

  const ld = [
    { '@context':'https://schema.org','@type':'Event', name:t.h1(gYear),
      startDate:iso, eventAttendanceMode:'https://schema.org/OnlineEventAttendanceMode',
      eventStatus:'https://schema.org/EventScheduled',
      description:t.desc(gYear), url,
      location:{'@type':'VirtualLocation', url:SITE} },
    { '@context':'https://schema.org','@type':'FAQPage',
      mainEntity: paras.filter(([h])=>h).slice(0,4).map(([h,p])=>({
        '@type':'Question', name:h,
        acceptedAnswer:{'@type':'Answer', text:p} })) }
  ];

  return { slug, html: `<!DOCTYPE html>
<html lang="${T.code}" dir="${T.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07071A">
<title>${esc(t.title(gYear))} — ${T.site}</title>
<meta name="description" content="${esc(t.desc(gYear))}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/${slug}/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/${slug}/">
<meta property="og:title" content="${esc(t.title(gYear))}">
<meta property="og:description" content="${esc(t.desc(gYear))}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:image" content="${SITE}/assets/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link href="https://fonts.googleapis.com/css2?${T.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/article.css">
<link rel="stylesheet" href="../../assets/tool.css">
<style>body{font-family:${T.font};}</style>
</head>
<body>
<nav class="crumb"><a href="../">${T.home}</a> <span>/</span> <span>${esc(t.h1(gYear))}</span></nav>

<main class="tool">
  <h1>${esc(t.h1(gYear))}</h1>
  <p class="tool-sub">${esc(t.lead(g, wd))}</p>

  <section class="out season-hero">
    <div class="out-lbl">${esc(t.kicker)} ${hy}${MM.sh}</div>
    <div class="out-main">${g.d} ${MM.g[g.m-1]} ${g.y}${MM.sg}</div>
    <div class="out-week">${wd}</div>
    <div class="cd-clock" id="cd"></div>
  </section>

  <section class="anwa intro-block">
${bodyHtml}
  </section>

  <p class="note">${lang==='arb'
    ? 'هذا حساب فلكي بالتقويم الهجري الجدولي، وليس إعلاناً شرعياً. تُعلَن بداية الشهر في كثير من البلدان برؤية الهلال، وقد تتقدّم أو تتأخّر يوماً واحداً. الإعلان الرسمي في بلدك هو المرجع.'
    : 'This is an astronomical calculation using the tabular Hijri calendar, not a religious announcement. In many countries the month begins with a crescent sighting and may fall a day earlier or later. The official announcement in your country is the reference.'}</p>

  <h2 class="mini-h">${T.also}</h2>
  <p class="tool-link">
    <a href="../countdown/">${lang==='arb'?'العد التنازلي لكل المناسبات':'Countdown to every occasion'} →</a><br>
    <a href="../calendar/?y=${hy}">${lang==='arb'?`التقويم الهجري لسنة ${hy}هـ`:`The Hijri calendar for ${hy} AH`} →</a><br>
    <a href="../converter/">${lang==='arb'?'محوّل التاريخ الهجري والميلادي':'Hijri–Gregorian date converter'} →</a><br>
    <a href="../articles/why-ramadan-date-changes/">${lang==='arb'?'لماذا يتغيّر موعد رمضان كل سنة؟':'Why does the date of Ramadan change every year?'} →</a>
  </p>

  <div data-ad-slot="leaderboard"></div>
</main>

<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${T.back}</a></footer>

<script src="../../assets/ads.js"></script>
<script>
const TARGET = new Date(${g.y}, ${g.m-1}, ${g.d}).getTime();
const U = ${JSON.stringify({d:T.dayU,h:T.hourU,m:T.minU,s:T.secU,today:T.today})};
function tick(){
  const el=document.getElementById('cd'), ms=TARGET-Date.now();
  if(ms<=0){ el.className='cd-today'; el.textContent=U.today; return; }
  const d=Math.floor(ms/864e5), h=Math.floor(ms/36e5)%24,
        m=Math.floor(ms/6e4)%60, s=Math.floor(ms/1e3)%60;
  el.innerHTML=[[d,U.d],[h,U.h],[m,U.m],[s,U.s]]
    .map(([v,l])=>'<div class="cd-u"><b>'+v+'</b><span>'+l+'</span></div>').join('');
}
tick(); setInterval(tick,1000);
</script>
</body>
</html>
` };
};
module.exports.EVENTS = Object.keys(EVENTS);
