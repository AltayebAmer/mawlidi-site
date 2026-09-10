/* قالب صفحة موضع الشمس في دائرة البروج — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';

const SIGNS = {
  arb:['الحمل','الثور','الجوزاء','السرطان','الأسد','العذراء','الميزان','العقرب','القوس','الجدي','الدلو','الحوت'],
  eng:['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
};
// أسماء الكوكبات بترتيب CONSTELLATIONS في assets/moon.js
const CONST = {
  arb:['الجدي','الدلو','الحوت','الحمل','الثور','الجوزاء','السرطان','الأسد','العذراء','الميزان','العقرب','الحوّاء','القوس'],
  eng:['Capricornus','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpius','Ophiuchus','Sagittarius']
};

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    title:'أين كانت الشمس يوم ميلادك؟ البرج والكوكبة',
    h1:'الشمس ودائرة البروج',
    desc:'برجك التقويمي والكوكبة التي كانت الشمس فيها فعلاً يوم ميلادك — وهما مختلفان، وهذه الصفحة تشرح لماذا.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    day:'اليوم', month:'الشهر', year:'السنة', go:'احسب', today:'اليوم',
    errY:'أدخل سنة بين 1900 و 2099', errD:'التاريخ غير صحيح، تحقق من اليوم والشهر',
    signLbl:'البرج في التقويم الشائع', constLbl:'الكوكبة التي كانت الشمس فيها فعلاً',
    same:'وهنا اتفق الاثنان', diff:'واختلف الاثنان',
    lonS:'خط الطول المداري', lonC:'خط الطول السيدري',
    expl:'ما الفرق بين الاثنين؟',
    ps:[
      'البرج الشائع ليس موضع الشمس في السماء، بل تقسيم تقويمي: دائرة البروج قُسّمت على اثني عشر قسماً متساوياً طول كل منها ثلاثون درجة، ابتداءً من نقطة الاعتدال الربيعي. وُضع هذا التقسيم قبل نحو ألفين ومئتي عام، وكانت الأقسام يومها تنطبق تقريباً على الكوكبات التي حملت أسماءها.',
      'ثم تحرّك محور الأرض. الأرض تترنّح كالخذروف ببطء شديد، فتُكمل دورة ترنّح كاملة كل ستة وعشرين ألف سنة تقريباً. هذه الظاهرة اسمها المبادرة، واكتشفها هيبارخوس في القرن الثاني قبل الميلاد. أثرها أن نقطة الاعتدال الربيعي تزحف بين النجوم نحو درجة واحدة كل اثنتين وسبعين سنة.',
      'فبعد اثنين وعشرين قرناً بلغ الانزياح نحو أربع وعشرين درجة — أي قرابة برج كامل. ولهذا فمن يُقال له اليوم إنه من برج الحمل، كانت الشمس يوم ميلاده في كوكبة الحوت غالباً.',
      'وهناك فرق ثانٍ: الكوكبات مساحات فلكية حقيقية غير متساوية، حدودها معتمدة من الاتحاد الفلكي الدولي. الشمس تمكث في العذراء نحو خمسة وأربعين يوماً وفي العقرب ستة أيام فقط. ومسار الشمس يعبر ثلاث عشرة كوكبة لا اثنتي عشرة، لأن منها الحوّاء التي لم تُدرَج في التقسيم التقويمي أصلاً.',
      'فأيهما الصحيح؟ كلاهما صحيح في بابه. التقسيم التقويمي اصطلاح لتقسيم السنة، والكوكبات وصف لما في السماء فعلاً. الخطأ الوحيد هو الخلط بينهما: أن يُقال إن الشمس كانت في الحمل وهي في الحوت.'
    ],
    note:'هذه الصفحة تعرض حساباً فلكياً لموضع الشمس يوم بعينه، ولا تصف شخصية أحد ولا تتنبأ بشيء. ودلالات الأبراج على الطباع والحظ لم تصمد أمام الاختبار العلمي، والغيب لا يعلمه إلا الله.',
    l1:'قمر ميلادك', h1r:'../moon/', l2:'منازل القمر', h2r:'../mansions/',
    more:'اقرأ: الفرق بين علم الفلك والتنجيم', mr:'../articles/astronomy-vs-astrology/',
    faq:[
      ['لماذا يختلف برجي عن الكوكبة التي كانت الشمس فيها؟',
       'لأن البرج تقسيم تقويمي ثابت على نقطة الاعتدال الربيعي، بينما الكوكبات ثابتة على النجوم. ومحور الأرض يترنّح فيزيح نقطة الاعتدال درجة كل اثنتين وسبعين سنة، وقد بلغ الانزياح نحو أربع وعشرين درجة منذ وُضع التقسيم قبل نحو ألفين ومئتي عام. فصار البرج متأخراً عن الكوكبة بقرابة برج كامل.'],
      ['ما كوكبة الحوّاء ولماذا ليست برجاً؟',
       'الحوّاء كوكبة يعبرها مسار الشمس بين العقرب والقوس، وتمكث فيها الشمس نحو ثمانية عشر يوماً، أي أكثر من مكثها في العقرب نفسه. ولم تُدرَج في التقسيم التقويمي لأن التقسيم اختار اثني عشر قسماً متساوياً ليوافق أشهر السنة، لا ليوافق ما في السماء.'],
      ['هل يدل موضع الشمس على شخصية المولود؟',
       'لا. الدراسات المحكّمة التي اختبرت هذا لم تجد ارتباطاً يصمد إحصائياً، وأشهرها دراسة Geoffrey Dean التي تتبّعت ألفي شخص وُلدوا في لندن في الفترة نفسها ثلاثين سنة فلم تجد تشابهاً بينهم يفوق التشابه بين أي مجموعة عشوائية. وهذه الصفحة تعرض موضع الشمس بوصفه حقيقة فلكية لا أكثر.'],
      ['هل الحساب هنا دقيق؟',
       'خط طول الشمس محسوب بخوارزمية Meeus بدقة تقلّ عن درجة، والبرج مأخوذ منه مباشرة. أما حدود الكوكبات فمن الحدود الرسمية للاتحاد الفلكي الدولي، محوّلة إلى خط الطول السيدري لتبقى ثابتة مع النجوم عبر القرون. وقد يفرق يوم واحد عند الحدود لأن الشمس تعبرها في لحظة بعينها لا في منتصف النهار.']
    ]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    title:'Where Was the Sun on Your Birthday? Sign vs Constellation',
    h1:'The Sun and the Zodiac',
    desc:'Your calendar sign and the constellation the Sun was actually in on the day you were born — they differ, and this page explains why.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    day:'Day', month:'Month', year:'Year', go:'Calculate', today:'Today',
    errY:'Enter a year between 1900 and 2099', errD:'Invalid date — check the day and month',
    signLbl:'Sign in the common calendar', constLbl:'Constellation the Sun was actually in',
    same:'here the two agree', diff:'the two disagree',
    lonS:'Tropical longitude', lonC:'Sidereal longitude',
    expl:'What is the difference?',
    ps:[
      'A zodiac sign is not the Sun’s position in the sky; it is a calendar division. The zodiac circle was cut into twelve equal parts of thirty degrees each, beginning at the vernal equinox. That scheme was fixed some twenty-two centuries ago, when the divisions did roughly coincide with the constellations whose names they took.',
      'Then Earth’s axis moved. Our planet wobbles like a spinning top, completing one wobble roughly every twenty-six thousand years. The effect is called precession, and Hipparchus discovered it in the second century BCE. It drags the vernal equinox point through the stars at about one degree every seventy-two years.',
      'After twenty-two centuries the drift has reached some twenty-four degrees — very nearly a whole sign. So a person told today that they are an Aries most likely had the Sun sitting in the constellation Pisces on the day they were born.',
      'There is a second difference. Constellations are real, unequal areas of sky with boundaries fixed by the International Astronomical Union. The Sun spends about forty-five days in Virgo and only six in Scorpius. And its path crosses thirteen constellations, not twelve, because it passes through Ophiuchus — which the calendar scheme never included.',
      'So which is correct? Both, in their own domain. The twelvefold scheme is a convention for dividing the year; the constellations describe what is actually overhead. The only error is confusing the two — saying the Sun was in Aries when it was in Pisces.'
    ],
    note:'This page reports an astronomical calculation of where the Sun stood on a given day. It describes no one’s character and predicts nothing. Claims that signs govern temperament or fortune have not survived scientific testing.',
    l1:'Your birth moon', h1r:'../moon/', l2:'Lunar mansions', h2r:'../mansions/',
    more:'Read: The difference between astronomy and astrology', mr:'../articles/astronomy-vs-astrology/',
    faq:[
      ['Why does my sign differ from the constellation the Sun was in?',
       'Because a sign is a calendar division anchored to the vernal equinox, while constellations are anchored to the stars. Earth’s axis wobbles, dragging the equinox point one degree every seventy-two years, and the drift has reached about twenty-four degrees since the scheme was fixed twenty-two centuries ago. The sign now lags the constellation by nearly a full step.'],
      ['What is Ophiuchus and why is it not a sign?',
       'Ophiuchus is a constellation the Sun crosses between Scorpius and Sagittarius, spending about eighteen days there — longer than it spends in Scorpius itself. It was never included because the scheme chose twelve equal parts to match the months of the year, not to match the sky.'],
      ['Does the Sun’s position describe a newborn’s character?',
       'No. Peer-reviewed studies have found no correlation that survives statistical scrutiny. The best known is Geoffrey Dean’s study of two thousand people born in London within minutes of each other, followed for thirty years, which found them no more alike than any random group. This page presents the Sun’s position as an astronomical fact and nothing more.'],
      ['Is the calculation accurate?',
       'The Sun’s longitude is computed with a Meeus algorithm accurate to well under a degree, and the sign follows directly from it. Constellation boundaries come from the official IAU limits, converted to sidereal longitude so they stay fixed against the stars across centuries. A single day of difference can appear at a boundary, since the Sun crosses it at a precise moment rather than at noon.']
    ]
  }
};

const MONTHS = {
  arb:{ g:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
        h:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'], sg:'م', sh:'هـ' },
  eng:{ g:['January','February','March','April','May','June','July','August','September','October','November','December'],
        h:['Muharram','Safar','Rabiʿ al-Awwal','Rabiʿ al-Thani','Jumada al-Ula','Jumada al-Akhira','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿda','Dhu al-Hijja'], sg:'CE', sh:'AH' }
};

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

module.exports = function zodiacPage(lang){
  const L=T[lang], M=MONTHS[lang];
  const url=`${SITE}/${lang}/zodiac/`;
  const other = lang==='arb' ? 'eng' : 'arb';
  const ld=[
    {'@context':'https://schema.org','@type':'WebApplication',name:L.title,description:L.desc,
     url,applicationCategory:'ReferenceApplication',inLanguage:L.code,
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
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/zodiac/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/zodiac/">
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
  <div class="acts">
    <button class="go" onclick="run()">${L.go}</button>
    <button class="ghost" onclick="setToday()">${L.today}</button>
  </div>
  <p class="err" id="err" hidden></p>

  <section id="out" hidden>
    <div class="out-lbl date-lbl" id="dateLbl"></div>
    <div class="zpair">
      <div class="zbox"><div class="zlbl">${esc(L.signLbl)}</div>
        <div class="zval" id="zSign"></div><div class="zlon" id="zSignLon"></div></div>
      <div class="zbox real"><div class="zlbl">${esc(L.constLbl)}</div>
        <div class="zval" id="zConst"></div><div class="zlon" id="zConstLon"></div></div>
    </div>
    <p class="zverdict" id="zVerdict"></p>
  </section>

  <section class="anwa">
    <h2 class="mini-h">${esc(L.expl)}</h2>
${L.ps.map(p=>`    <p>${esc(p)}</p>`).join('\n')}
  </section>

  <p class="note">${esc(L.note)}</p>
  <p class="tool-link">
    <a href="${L.h1r}">${esc(L.l1)} →</a> &nbsp;·&nbsp;
    <a href="${L.h2r}">${esc(L.l2)} →</a><br>
    <a href="${L.mr}">${esc(L.more)} →</a>
  </p>

  <div data-ad-slot="leaderboard"></div>

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
const SIGNS=${JSON.stringify(SIGNS[lang])}, CONSTS=${JSON.stringify(CONST[lang])};
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)};
const SG=${JSON.stringify(M.sg)}, SH=${JSON.stringify(M.sh)};
const TX=${JSON.stringify({errY:L.errY,errD:L.errD,same:L.same,diff:L.diff,
  lonS:L.lonS,lonC:L.lonC})};

(function(){
  const d=document.getElementById('fD'), m=document.getElementById('fM');
  for(let i=1;i<=31;i++) d.innerHTML+='<option value="'+i+'">'+i+'</option>';
  MG.forEach((n,i)=>m.innerHTML+='<option value="'+(i+1)+'">'+n+'</option>');
})();

function show(msg){const e=document.getElementById('err');e.textContent=msg;e.hidden=false;document.getElementById('out').hidden=true;}
function setToday(){
  const n=new Date();
  document.getElementById('fD').value=n.getDate();
  document.getElementById('fM').value=n.getMonth()+1;
  document.getElementById('fY').value=n.getFullYear();
  run();
}
function run(){
  const d=+document.getElementById('fD').value, m=+document.getElementById('fM').value,
        y=+document.getElementById('fY').value;
  if(!y||y<1900||y>2099) return show(TX.errY);
  const t=new Date(y,m-1,d);
  if(t.getFullYear()!==y||t.getMonth()!==m-1||t.getDate()!==d) return show(TX.errD);
  document.getElementById('err').hidden=true;

  const jd=jdOfNoon(y,m,d), z=zodiacSign(jd), c=sunConstellation(jd), H=jToH(gToJ(y,m,d));
  document.getElementById('dateLbl').textContent=
    d+' '+MG[m-1]+' '+y+SG+' · '+H.d+' '+MH[H.m-1]+' '+H.y+SH;
  document.getElementById('zSign').textContent=SIGNS[z.idx];
  document.getElementById('zSignLon').textContent=TX.lonS+': '+z.lon.toFixed(1)+'°';
  document.getElementById('zConst').textContent=CONSTS[c.idx];
  document.getElementById('zConstLon').textContent=TX.lonC+': '+c.lon.toFixed(1)+'°';
  const agree = SIGNS[z.idx]===CONSTS[c.idx];
  const v=document.getElementById('zVerdict');
  v.textContent = agree ? TX.same : TX.diff;
  v.classList.toggle('agree', agree);
  document.getElementById('out').hidden=false;
}
document.getElementById('fY').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
setToday();
</script>
</body>
</html>
`;
};
