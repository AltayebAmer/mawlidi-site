/* قالب صفحة منازل القمر — يُستدعى من tools/build.js */
const SITE = 'https://mawlidi.com';

/* المنازل الثمانية والعشرون: الاسم، النجم أو المجموعة التي سُمّيت بها،
   وملاحظة تراثية منسوبة صراحةً حيث وُجدت. الترتيب من الشرطان. */
const MANSIONS = [
 ['الشرطان','Sheratan','β و γ الحمل — قرنا الحمل','بها يبدأ ترتيب المنازل عند العرب'],
 ['البطين','Botein','ε و δ و ρ الحمل — بطن الحمل',''],
 ['الثريا','Pleiades','عنقود الثريا في الثور','أشهر المنازل عند العرب وأكثرها ذكراً في الشعر'],
 ['الدبران','Aldebaran','α الثور','سُمّي لأنه يَدبُر الثريا أي يتبعها'],
 ['الهقعة','Meissa','λ و φ الجبار — رأس الجبار',''],
 ['الهنعة','Alhena','γ و ξ الجوزاء',''],
 ['الذراع','Castor & Pollux','α و β التوأمين','عدّتها العرب ذراع الأسد المبسوطة'],
 ['النثرة','Praesepe','عنقود المِعلَف في السرطان','وصفتها العرب بأنها كلطخة سحاب'],
 ['الطرف','—','κ الأسد و λ السرطان — عينا الأسد',''],
 ['الجبهة','Regulus','α الأسد ونجوم المنجل','من أبين المنازل وأسهلها رصداً'],
 ['الزبرة','Zosma','δ و θ الأسد — كاهل الأسد',''],
 ['الصرفة','Denebola','β الأسد','قالت العرب سُمّيت لانصراف الحرّ بسقوطها'],
 ['العواء','—','نجوم في العذراء',''],
 ['السماك','Spica','α العذراء — السماك الأعزل','سُمّي أعزل لأنه بلا سلاح، خلافاً للسماك الرامح'],
 ['الغفر','—','ι و κ و λ العذراء',''],
 ['الزبانى','Zubenelgenubi','α و β الميزان','عدّتها العرب قرني العقرب'],
 ['الإكليل','—','β و δ و π العقرب',''],
 ['القلب','Antares','α العقرب — قلب العقرب','من أوضح نجوم السماء وأشدّها حمرة'],
 ['الشولة','Shaula','λ و υ العقرب — شوكة الذنب',''],
 ['النعائم','—','نجوم في القوس',''],
 ['البلدة','—','فجوة خالية من النجوم بين النعائم وسعد الذابح','منزلة بلا نجم بارز، سُمّيت بالبلدة أي الفضاء الخالي'],
 ['سعد الذابح','—','α و β الجدي','أول السعود الأربعة'],
 ['سعد بُلَع','—','ε و μ الدلو',''],
 ['سعد السعود','—','β و ξ الدلو','عدّته العرب أحمد السعود'],
 ['سعد الأخبية','—','γ و ζ و η و π الدلو',''],
 ['الفرغ المقدّم','—','α و β الفرس الأعظم',''],
 ['الفرغ المؤخّر','—','γ الفرس و α المرأة المسلسلة',''],
 ['الرشاء','—','β المرأة المسلسلة — ويسمى بطن الحوت','آخر المنازل، وبها تتم الدورة']
];

const MANSIONS_EN = [
 ['Al-Sharatan','β and γ Arietis — the ram’s horns'],
 ['Al-Butayn','ε, δ and ρ Arietis — the ram’s belly'],
 ['Al-Thurayya','The Pleiades cluster in Taurus'],
 ['Al-Dabaran','Aldebaran, α Tauri'],
 ['Al-Haq‘a','λ and φ Orionis — Orion’s head'],
 ['Al-Han‘a','γ and ξ Geminorum'],
 ['Al-Dhira‘','Castor and Pollux — the lion’s outstretched arm'],
 ['Al-Nathra','The Praesepe cluster in Cancer'],
 ['Al-Tarf','κ Leonis and λ Cancri — the lion’s eyes'],
 ['Al-Jabha','Regulus and the Sickle of Leo'],
 ['Al-Zubra','δ and θ Leonis — the lion’s shoulder'],
 ['Al-Sarfa','Denebola, β Leonis'],
 ['Al-‘Awwa','Stars in Virgo'],
 ['Al-Simak','Spica, α Virginis'],
 ['Al-Ghafr','ι, κ and λ Virginis'],
 ['Al-Zubana','α and β Librae — the scorpion’s claws'],
 ['Al-Iklil','β, δ and π Scorpii'],
 ['Al-Qalb','Antares, α Scorpii — the scorpion’s heart'],
 ['Al-Shawla','λ and υ Scorpii — the sting'],
 ['Al-Na‘a’im','Stars in Sagittarius'],
 ['Al-Balda','A starless gap between Al-Na‘a’im and Sa‘d al-Dhabih'],
 ['Sa‘d al-Dhabih','α and β Capricorni'],
 ['Sa‘d Bula‘','ε and μ Aquarii'],
 ['Sa‘d al-Su‘ud','β and ξ Aquarii'],
 ['Sa‘d al-Akhbiya','γ, ζ, η and π Aquarii'],
 ['Al-Fargh al-Muqaddam','α and β Pegasi'],
 ['Al-Fargh al-Mu’akhkhar','γ Pegasi and α Andromedae'],
 ['Al-Risha','β Andromedae — also called the belly of the fish']
];

const T = {
  arb: {
    code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    title:'منازل القمر الثمانية والعشرون',
    h1:'منازل القمر',
    desc:'في أي منزلة القمر الليلة؟ المنازل الثمانية والعشرون بأسمائها ونجومها، بحساب فلكي وشرح لتراث الأنواء عند العرب.',
    home:'الرئيسية', site:'مَوْلِدي', back:'العودة إلى مَوْلِدي',
    tonight:'الليلة', pick:'تاريخ آخر', day:'اليوم', month:'الشهر', year:'السنة', go:'احسب',
    errY:'أدخل سنة بين 1900 و 2099', errD:'التاريخ غير صحيح، تحقق من اليوم والشهر',
    moonIn:'القمر في منزلة', sunIn:'والشمس اليوم في منزلة', star:'النجم',
    tableH:'المنازل الثمانية والعشرون', nStar:'النجم أو المجموعة', nNote:'ما قالته العرب',
    anwaH:'الأنواء: وجه آخر للمنازل',
    anwa:[
      'المنازل مواضع القمر الليلية، أما الأنواء فمواسم شمسية. النوء عند العرب سقوط المنزلة في المغرب مع الفجر وطلوع رقيبها في المشرق، فقسّموا السنة الشمسية على ثمانية وعشرين نوءاً طول كل منها ثلاثة عشر يوماً، ورتّبوا عليها الزرع والسفر ورعي الإبل.',
      'ولم تتفق كلمة العرب ولا كلمة من دوّن عنهم: منهم من جعل النوء السقوط، ومنهم من جعله الطلوع، ونبّه ابن قتيبة في كتاب الأنواء على هذا الاختلاف. ولهذا لا تعرض هذه الصفحة تواريخ محدّدة للأنواء، لأن تحديدها يقتضي ترجيحاً في مسألة مختلَف فيها أصلاً، وتعرض بدلاً منها موضع الشمس بين المنازل وهو أمر محسوب لا خلاف فيه.',
      'وقد جاء في الحديث المتفق عليه أن رسول الله صلى الله عليه وسلم قال بعد مطر: «أصبح من عبادي مؤمن بي وكافر»، فمن قال مُطرنا بفضل الله ورحمته فهو المؤمن، ومن قال مُطرنا بنوء كذا فهو الكافر بالله المؤمن بالكوكب. وفصّل العلماء أن من اعتقد النجم مُنزِلاً للمطر فقد أشرك، ومن اتخذه علامة زمنية يُعرف بها دخول موسم المطر عادةً فلا حرج عليه. والنجم علامة لا سبب، والغيب لا يعلمه إلا الله.'
    ],
    l1:'قمر ميلادك', h1r:'../moon/', l2:'التقويم الهجري السنوي', h2r:'../calendar/',
    faq:[
      ['ما منازل القمر؟',
       'ثمانية وعشرون موضعاً بين النجوم يمرّ بها القمر في دورته حول الأرض، سمّتها العرب بأسماء النجوم أو المجموعات التي تقع فيها. استُعملت لتحديد ليلة الشهر ولضبط مواسم السنة، وذُكرت في القرآن الكريم: "والقمر قدّرناه منازل حتى عاد كالعرجون القديم" (يس: 39).'],
      ['هل ينزل القمر كل ليلة منزلة؟',
       'تقريباً لا تماماً. الشهر النجمي 27.32 يوماً بينما المنازل ثمانٍ وعشرون، فيقطع القمر نحو 1.025 منزلة كل ليلة. وتتغيّر سرعته بين الحضيض والأوج من 11.8 إلى 15.4 درجة يومياً بينما قوس المنزلة 12.86 درجة، فقد يبقى ليلتين في منزلة واحدة أو يتخطّى منزلة. العبارة المشهورة تقريب حسن لا قاعدة دقيقة.'],
      ['ما الفرق بين المنازل والأنواء؟',
       'المنازل مواضع القمر الليلية، دورتها قمرية طولها 27.32 يوماً. أما الأنواء فمواسم شمسية مرتبطة بسقوط المنزلة في المغرب مع الفجر وطلوع رقيبها في المشرق، ودورتها سنة شمسية قُسّمت على ثمانية وعشرين نوءاً طول كل منها ثلاثة عشر يوماً. الاسم واحد والمعنى مختلف، وكثير من المصادر تخلط بينهما.'],
      ['هل للمنزلة أثر على حظ الإنسان أو شخصيته؟',
       'لا. هذه الصفحة تعرض موضع القمر بين النجوم وهو حقيقة فلكية، وتنقل ما قالته العرب في مواسمها بوصفه تراثاً منسوباً إلى قائله. وقد جاء في الحديث المتفق عليه أن من قال "مُطرنا بنوء كذا" فهو مؤمن بالكوكب كافر بالله، ومن قال "مُطرنا بفضل الله ورحمته" فهو المؤمن. فالنجم علامة زمنية لا سبب فاعل، والغيب لا يعلمه إلا الله.'],
      ['هل الحساب هنا دقيق؟',
       'المنازل محسوبة بالقسمة السيدرية المتساوية: 12° 51′ 26″ لكل منزلة، وهو ما اعتمده علماء الفلك المسلمون. وقد تحققنا أن كل منزلة تقع على نجمها الحقيقي. أما النظام النجمي القديم فأقواسه غير متساوية تبعاً لمواضع النجوم، وقد يفرق عن الحساب ليلة واحدة.']
    ]
  },
  eng: {
    code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    title:'The Twenty-Eight Lunar Mansions',
    h1:'Lunar Mansions',
    desc:'Which mansion is the Moon in tonight? The twenty-eight manazil with their stars, computed astronomically, and the Arab anwa’ tradition explained.',
    home:'Home', site:'Mawlidi', back:'Back to Mawlidi',
    tonight:'Tonight', pick:'Another date', day:'Day', month:'Month', year:'Year', go:'Calculate',
    errY:'Enter a year between 1900 and 2099', errD:'Invalid date — check the day and month',
    moonIn:'The Moon is in', sunIn:'and the Sun today is in', star:'Star',
    tableH:'The twenty-eight mansions', nStar:'Star or group', nNote:'',
    anwaH:'The anwa’: the other face of the mansions',
    anwa:[
      'The mansions are the Moon’s nightly positions; the anwa’ are solar seasons. For the Arabs a nawʾ was a mansion setting in the west at dawn as its counterpart rose in the east, dividing the solar year into twenty-eight periods of thirteen days each, by which planting, travel and the grazing of camels were ordered.',
      'The sources do not agree: some took the nawʾ to be the setting, others the rising, and Ibn Qutayba noted the disagreement in his Book of the Anwa’. For that reason this page gives no fixed dates for the anwa’ — assigning them would mean settling a dispute that was never settled — and shows instead the Sun’s position among the mansions, which is simply computed.',
      'A hadith agreed upon by al-Bukhari and Muslim records the Prophet saying after rainfall: "This morning one of My servants became a believer in Me and one a disbeliever." Whoever said the rain came by the grace and mercy of God was the believer; whoever said it came by such-and-such a star believed in the star. Scholars drew the line clearly: holding that a star sends rain is idolatry, while using it as a marker of when the rainy season usually begins is not. The star marks time; it does not cause.'
    ],
    l1:'Your birth moon', h1r:'../moon/', l2:'Full-year Hijri calendar', h2r:'../calendar/',
    faq:[
      ['What are the lunar mansions?',
       'Twenty-eight positions among the stars through which the Moon passes on its orbit, named by the Arabs after the stars or groups lying in them. They were used to mark the night of the month and to fix the seasons of the year, and are mentioned in the Qur’an: "And the Moon — We have determined for it mansions" (Ya-Sin 39).'],
      ['Does the Moon occupy one mansion each night?',
       'Almost, but not exactly. The sidereal month is 27.32 days while there are twenty-eight mansions, so the Moon covers about 1.025 mansions per night. Its speed also varies between perigee and apogee, from 11.8 to 15.4 degrees a day against a mansion arc of 12.86 degrees, so it may linger two nights in one mansion or skip one entirely. The familiar saying is a good approximation, not a rule.'],
      ['How do the mansions differ from the anwa’?',
       'The mansions are the Moon’s nightly positions, on a sidereal cycle of 27.32 days. The anwa’ are solar seasons, tied to a mansion setting in the west at dawn as its counterpart rises in the east, dividing the solar year into twenty-eight periods of thirteen days each. The names are shared; the meanings are not, and many sources conflate them.'],
      ['Does a mansion influence a person’s character or fortune?',
       'No. This page reports the Moon’s position among the stars, an astronomical fact, and relays what the Arabs said about the seasons as heritage attributed to its sources. A hadith agreed upon by al-Bukhari and Muslim states that whoever says "we were given rain by such-and-such a star" believes in the star and disbelieves in God, while whoever says "we were given rain by the grace and mercy of God" is the believer. The star is a marker of time, not a cause.'],
      ['Is the calculation here accurate?',
       'The mansions are computed by equal sidereal division: 12° 51′ 26″ each, the method adopted by Muslim astronomers. We verified that each mansion falls on its actual star. The older star-based system has unequal arcs following the stars themselves, and can differ from the calculation by a single night.']
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

module.exports = function mansionsPage(lang){
  const L=T[lang], M=MONTHS[lang], AR = lang==='arb';
  const url=`${SITE}/${lang}/mansions/`;
  const other = AR ? 'eng' : 'arb';
  const names = AR ? MANSIONS.map(m=>m[0]) : MANSIONS_EN.map(m=>m[0]);
  const stars = AR ? MANSIONS.map(m=>m[2]) : MANSIONS_EN.map(m=>m[1]);
  const notes = AR ? MANSIONS.map(m=>m[3]) : MANSIONS.map(()=>'');

  const rows = names.map((n,i)=>
    `      <tr><td class="n">${i+1}</td><td class="m">${esc(n)}</td><td>${esc(stars[i])}</td>${
      AR ? `<td class="hint-cell">${esc(notes[i])}</td>` : ''}</tr>`).join('\n');

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
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/mansions/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/mansions/">
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

<main class="tool wide">
  <h1>${esc(L.h1)}</h1>
  <p class="tool-sub">${esc(L.desc)}</p>

  <section class="out mansion-now" id="now"></section>

  <details class="pick">
    <summary>${esc(L.pick)}</summary>
    <div class="fields">
      <label class="fld"><span>${L.day}</span><select id="fD"></select></label>
      <label class="fld"><span>${L.month}</span><select id="fM"></select></label>
      <label class="fld"><span>${L.year}</span><input id="fY" type="number" inputmode="numeric"></label>
    </div>
    <div class="acts">
      <button class="go" onclick="run()">${L.go}</button>
      <button class="ghost" onclick="setToday()">${L.tonight}</button>
    </div>
    <p class="err" id="err" hidden></p>
  </details>

  <section class="anwa">
    <h2 class="mini-h">${esc(L.anwaH)}</h2>
${L.anwa.map(p=>`    <p>${esc(p)}</p>`).join('\n')}
  </section>

  <h2 class="mini-h">${esc(L.tableH)}</h2>
  <div class="tbl-wrap">
    <table class="mtable">
      <thead><tr><th>#</th><th>${esc(AR?'المنزلة':'Mansion')}</th><th>${esc(L.nStar)}</th>${AR?`<th>${esc(L.nNote)}</th>`:''}</tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </div>

  <p class="tool-link">
    <a href="${L.h1r}">${esc(L.l1)} →</a> &nbsp;·&nbsp;
    <a href="${L.h2r}">${esc(L.l2)} →</a>
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
const NAMES=${JSON.stringify(names)}, STARS=${JSON.stringify(stars)};
const MG=${JSON.stringify(M.g)}, MH=${JSON.stringify(M.h)};
const SG=${JSON.stringify(M.sg)}, SH=${JSON.stringify(M.sh)};
const TX=${JSON.stringify({errY:L.errY,errD:L.errD,moonIn:L.moonIn,sunIn:L.sunIn,star:L.star})};

(function(){
  const d=document.getElementById('fD'), m=document.getElementById('fM');
  for(let i=1;i<=31;i++) d.innerHTML+='<option value="'+i+'">'+i+'</option>';
  MG.forEach((n,i)=>m.innerHTML+='<option value="'+(i+1)+'">'+n+'</option>');
})();

function show(msg){const e=document.getElementById('err');e.textContent=msg;e.hidden=false;}
function setToday(){
  const n=new Date();
  document.getElementById('fD').value=n.getDate();
  document.getElementById('fM').value=n.getMonth()+1;
  document.getElementById('fY').value=n.getFullYear();
  run();
}
function render(y,m,d){
  const jd=jdOfNoon(y,m,d), mm=moonMansion(jd), sm=sunMansion(jd), H=jToH(gToJ(y,m,d));
  document.getElementById('now').innerHTML=
    '<div class="out-lbl">'+d+' '+MG[m-1]+' '+y+SG+' · '+H.d+' '+MH[H.m-1]+' '+H.y+SH+'</div>'+
    '<div class="out-main">'+TX.moonIn+' <b>'+NAMES[mm.idx]+'</b></div>'+
    '<div class="out-week">'+TX.star+': '+STARS[mm.idx]+'</div>'+
    '<div class="mansion-sun">'+TX.sunIn+' <b>'+NAMES[sm.idx]+'</b></div>';
  // أبرز صف المنزلة في الجدول
  document.querySelectorAll('.mtable tbody tr').forEach((tr,i)=>
    tr.classList.toggle('on', i===mm.idx));
}
function run(){
  const d=+document.getElementById('fD').value, m=+document.getElementById('fM').value,
        y=+document.getElementById('fY').value;
  if(!y||y<1900||y>2099) return show(TX.errY);
  const t=new Date(y,m-1,d);
  if(t.getFullYear()!==y||t.getMonth()!==m-1||t.getDate()!==d) return show(TX.errD);
  document.getElementById('err').hidden=true;
  render(y,m,d);
}
document.getElementById('fY').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
setToday();
</script>
</body>
</html>
`;
};
