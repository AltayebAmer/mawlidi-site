/* صفحة «أعلن معنا» — كانت طبقة عائمة (adv-ov) بلا رابط.
   مكتفية ذاتياً: النموذج يُرسل إلى نفس نقطة النهاية المستعملة في الشبكة،
   وبحالة ظاهرة داخل الصفحة بدل toast المعرَّف في الصفحة الرئيسية فقط. */
const SITE = 'https://mawlidi.com';
const ENDPOINT = 'https://contact.007.gallery/send';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const TIERS = {
  arb:[
    ['PLATINUM ✦','الباقة البلاتينية','2,000','بلاتيني',['أعلى ظهور — أول بطاقة بعد النتائج مباشرة','حجم كبير مع صورة ونص وزر دعوة للعمل','ظهور في صفحات المقالات','تقرير شهري بعدد النقرات والظهور']],
    ['GOLD ★','الباقة الذهبية','1,000','ذهبي',['ظهور بعد إحصائيات النتائج','حجم متوسط مع صورة ونص وزر','ظهور في صفحة المقالات']],
    ['SILVER','الباقة الفضية','500','فضي',['بطاقتان داخل جدول النتائج','حجم صغير مع أيقونة ونص']],
    ['BRONZE','الباقة البرونزية','200','برونزي',['بطاقة أسفل صفحة النتائج','نص وزر فقط']]
  ],
  eng:[
    ['PLATINUM ✦','Platinum','2,000','Platinum',['Top placement — the first card right after the results','Large format with image, text and a call to action','Appears on article pages','Monthly report of impressions and clicks']],
    ['GOLD ★','Gold','1,000','Gold',['Placed after the result statistics','Medium format with image, text and a button','Appears on the articles page']],
    ['SILVER','Silver','500','Silver',['Two cards inside the results table','Compact format with icon and text']],
    ['BRONZE','Bronze','200','Bronze',['A card at the foot of the results page','Text and button only']]
  ]
};

const L = {
  arb:{ code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    site:'مَوْلِدي', home:'الرئيسية', back:'العودة إلى مَوْلِدي',
    h1:'أعلن في مَوْلِدي',
    title:'أعلن في مَوْلِدي — باقات إعلانية من 200 درهم',
    desc:'وصول مباشر لجمهور عربي يبحث عن أعياد الميلاد الهجرية والمناسبات. أربع باقات شهرية تبدأ من 200 درهم إماراتي.',
    sub:'وصول مباشر لجمهور يبحث عن أعياد الميلاد الهجرية من السعودية والإمارات والخليج العربي',
    audience:'🎯 جمهور مَوْلِدي: محلات الكيك · متاجر الهدايا · التصوير · تنظيم الحفلات · الورود · الطباعة',
    cur:'د.إ', period:'درهم إماراتي / شهر', book:'تواصل للحجز',
    formT:'📋 نموذج الحجز',
    formS:'أكمل البيانات وسنتواصل معك خلال 24 ساعة لتأكيد التفاصيل وإتمام الدفع عبر PayPal.',
    fTier:'نوع الباقة', fEmail:'البريد الإلكتروني', fBiz:'اسم النشاط التجاري', fMsg:'رسالتك (اختياري)',
    phEmail:'example@email.com', phBiz:'اسم متجرك أو نشاطك', phMsg:'تفاصيل إضافية أو أسئلة...',
    paypal:'الدفع يتم عبر <strong>PayPal</strong> — بعد مراجعة طلبك وتأكيده، نرسل لك رابط الدفع الآمن مباشرة إلى بريدك الإلكتروني.',
    send:'إرسال الطلب ✦', sending:'جارٍ الإرسال…',
    ok:'✓ وصل طلبك. نتواصل معك خلال 24 ساعة.',
    errEmail:'أدخل بريداً إلكترونياً صحيحاً', errBiz:'أدخل اسم النشاط التجاري',
    errSend:'تعذّر الإرسال الآن. أعد المحاولة بعد قليل، أو راسلنا على info@mawlidi.com',
    foot:'📧 info@mawlidi.com · الفنان الطيب عامر' },
  eng:{ code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    site:'Mawlidi', home:'Home', back:'Back to Mawlidi',
    h1:'Advertise on Mawlidi',
    title:'Advertise on Mawlidi — packages from AED 200',
    desc:'Direct reach to an Arabic-speaking audience searching for Hijri birthdays and occasions. Four monthly packages starting at AED 200.',
    sub:'Direct reach to an audience searching for Hijri birthdays across Saudi Arabia, the UAE and the Gulf',
    audience:'🎯 Mawlidi’s audience: bakeries · gift shops · photography · event planning · florists · printing',
    cur:'AED', period:'AED / month', book:'Enquire',
    formT:'📋 Booking form',
    formS:'Fill in the details and we will contact you within 24 hours to confirm and arrange payment via PayPal.',
    fTier:'Package', fEmail:'Email address', fBiz:'Business name', fMsg:'Your message (optional)',
    phEmail:'example@email.com', phBiz:'Your shop or business name', phMsg:'Extra details or questions…',
    paypal:'Payment is handled via <strong>PayPal</strong> — once your request is reviewed and confirmed, we email you a secure payment link.',
    send:'Send request ✦', sending:'Sending…',
    ok:'✓ Your request arrived. We will be in touch within 24 hours.',
    errEmail:'Please enter a valid email address', errBiz:'Please enter your business name',
    errSend:'Sending failed right now. Please try again shortly, or email info@mawlidi.com',
    foot:'📧 info@mawlidi.com · Altayeb Amer' }
};

module.exports = function advertisePage(lang){
  const T = L[lang], tiers = TIERS[lang];
  const url = `${SITE}/${lang}/advertise/`;
  const other = lang === 'arb' ? 'eng' : 'arb';
  const cls = ['tier-plat','tier-gold','tier-silver','tier-bronze'];

  const cards = tiers.map(([badge,name,price,val,feats],i) =>
    `    <div class="tier-card ${cls[i]}">
      <div class="tier-badge">${esc(badge)}</div>
      <div class="tier-name">${esc(name)}</div>
      <div class="tier-price"><span class="aed">${esc(T.cur)}</span>${esc(price)}</div>
      <div class="tier-period">${esc(T.period)}</div>
      <ul class="tier-feats">
${feats.map(f=>`        <li>${esc(f)}</li>`).join('\n')}
      </ul>
      <button class="tier-btn" onclick="pickTier('${esc(val)}')">${esc(T.book)}</button>
    </div>`).join('\n');

  const opts = tiers.map(([,name,price,val]) =>
    `          <option value="${esc(val)}">${esc(name)} — ${esc(T.cur)} ${esc(price)}</option>`).join('\n');

  const ld = {'@context':'https://schema.org','@type':'WebPage',
    name:T.title, description:T.desc, url, inLanguage:T.code,
    publisher:{'@type':'Organization', name:T.site, url:SITE}};

  return `<!DOCTYPE html>
<html lang="${T.code}" dir="${T.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07071A">
<title>${esc(T.title)} — ${T.site}</title>
<meta name="description" content="${esc(T.desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/advertise/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/advertise/">
<meta property="og:title" content="${esc(T.title)}">
<meta property="og:description" content="${esc(T.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
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
<nav class="crumb"><a href="../">${T.home}</a> <span>/</span> <span>${esc(T.h1)}</span></nav>

<main class="tool">
  <h1>${esc(T.h1)}</h1>
  <p class="tool-sub">${esc(T.sub)}</p>
  <p class="note">${esc(T.audience)}</p>

  <div class="tiers">
${cards}
  </div>

  <section class="adv-form-wrap" id="adv-form">
    <h2 class="mini-h">${esc(T.formT)}</h2>
    <p class="tool-sub">${esc(T.formS)}</p>
    <div class="fld"><span>${esc(T.fTier)}</span>
      <select id="adv-tier">
${opts}
      </select></div>
    <div class="fld"><span>${esc(T.fEmail)}</span>
      <input type="email" id="adv-email" placeholder="${esc(T.phEmail)}" dir="ltr"></div>
    <div class="fld"><span>${esc(T.fBiz)}</span>
      <input type="text" id="adv-biz" placeholder="${esc(T.phBiz)}"></div>
    <div class="fld"><span>${esc(T.fMsg)}</span>
      <textarea id="adv-msg" rows="4" placeholder="${esc(T.phMsg)}"></textarea></div>
    <p class="note paypal-box">💳 ${T.paypal}</p>
    <div class="acts"><button class="go" id="advSend" onclick="sendAdv()">${esc(T.send)}</button></div>
    <p class="err" id="advMsg" hidden></p>
  </section>

  <p class="hint">${esc(T.foot)}</p>
  <div data-ad-slot="leaderboard"></div>
</main>

<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${T.back}</a></footer>
<script src="../../assets/ads.js"></script>
<script>
const TX=${JSON.stringify({sending:T.sending,ok:T.ok,errEmail:T.errEmail,errBiz:T.errBiz,errSend:T.errSend,send:T.send})};
function pickTier(v){
  const s=document.getElementById('adv-tier'); s.value=v;
  document.getElementById('adv-form').scrollIntoView({behavior:'smooth',block:'start'});
  document.getElementById('adv-email').focus({preventScroll:true});
}
function show(t,ok){
  const e=document.getElementById('advMsg');
  e.textContent=t; e.hidden=false;
  e.style.color = ok ? '#4CAF7D' : '';
  e.style.borderColor = ok ? 'rgba(76,175,125,0.35)' : '';
  e.style.background = ok ? 'rgba(76,175,125,0.10)' : '';
}
async function sendAdv(){
  const tier=document.getElementById('adv-tier').value;
  const email=document.getElementById('adv-email').value.trim();
  const biz=document.getElementById('adv-biz').value.trim();
  const msg=document.getElementById('adv-msg').value.trim();
  if(!email||!/^[^\\s@]+@[^\\s@.]+\\.[A-Za-z]{2,}$/.test(email)) return show(TX.errEmail,false);
  if(!biz) return show(TX.errBiz,false);
  const btn=document.getElementById('advSend');
  btn.disabled=true; btn.textContent=TX.sending;
  try{
    const r=await fetch(${JSON.stringify(ENDPOINT)},{method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({site:'mawlidi.com',subject:'Advertising request — '+tier,
        email:email, name:biz, message:'Package: '+tier+'\\nBusiness: '+biz+'\\n\\n'+(msg||'—')})});
    if(!r.ok) throw new Error(r.status);
    show(TX.ok,true);
    btn.textContent=TX.send; btn.disabled=false;
  }catch(e){
    show(TX.errSend,false);
    btn.textContent=TX.send; btn.disabled=false;
  }
}
</script>
</body>
</html>
`;
};
