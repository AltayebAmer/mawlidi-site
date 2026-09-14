/* صفحة المرصد — كانت طبقة عائمة (obs-ov) بلا رابط.
   التصنيفات والمقالات تُستخرج وقت البناء من index.html فلا تُنسخ ولا تتقادم.
   قرار المالك: بطاقات التصنيفات والمقالات تذهب إلى روابط المقالات الحقيقية
   بدل فتح القارئ الداخلي. */
const SITE = 'https://mawlidi.com';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const plain = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();

const T = {
  arb:{ code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    site:'مَوْلِدي', home:'الرئيسية', back:'العودة إلى مَوْلِدي',
    h1:'مرصد المواليد',
    title:'مرصد المواليد — اثنا عشر مجالاً معرفياً',
    desc:'مساحة معرفية عن لحظة الميلاد: الكون والجينات والقمر والحضارات والهوية — اثنا عشر تصنيفاً وخمس مقالات حصرية.',
    charterT:'✦ ميثاق المرصد',
    charter:'مساحة ثقافية ومعرفية — لا توقعات ولا ادعاء بمعرفة الغيب الذي لا يعلمه إلا الله سبحانه وتعالى.',
    catsH:'المجالات المعرفية', artsH:'مقالات المرصد الحصرية',
    min:'دقائق قراءة', all:'كل مقالات مَوْلِدي' },
  eng:{ code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    site:'Mawlidi', home:'Home', back:'Back to Mawlidi',
    h1:'The Birth Observatory',
    title:'The Birth Observatory — Twelve Fields of Knowledge',
    desc:'A knowledge space around the moment of birth: cosmos, genes, the Moon, civilisations and identity — twelve categories and five exclusive articles.',
    charterT:'✦ The Observatory Charter',
    charter:'A cultural and educational space — no predictions and no claim to knowledge of the unseen.',
    catsH:'Fields of knowledge', artsH:'Exclusive Observatory articles',
    min:'min read', all:'All Mawlidi articles' }
};

module.exports = function observatoryPage(lang, cats, arts, slugs){
  const L = T[lang];
  const url = `${SITE}/${lang}/observatory/`;
  const other = lang === 'arb' ? 'eng' : 'arb';
  const catKey = lang === 'arb' ? 'cat_ar' : 'cat_en';

  const catCards = cats.map(c =>
    `      <div class="obs-cat">
        <span class="obs-ic">${esc(c.icon || '✦')}</span>
        <div><b>${esc(c.name || '')}</b><span>${esc(c.desc || '')}</span></div>
      </div>`).join('\n');

  const artCards = arts.map(a =>
    `      <a class="card" href="../articles/${slugs[a.id]}/">
        <span class="card-cat">${esc(plain(a[catKey] || a.cat_ar || ''))}</span>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.sub || '')}</p>
        <span class="card-min">${a.min ? a.min + ' ' + L.min : ''}</span>
      </a>`).join('\n');

  const ld = {
    '@context':'https://schema.org','@type':'CollectionPage',
    name:L.title, description:L.desc, url, inLanguage:L.code,
    hasPart: arts.map(a => ({'@type':'Article', headline:a.title,
      url:`${SITE}/${lang}/articles/${slugs[a.id]}/`}))
  };

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
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/observatory/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/observatory/">
<meta property="og:title" content="${esc(L.title)}">
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
  <p class="note obs-charter"><strong>${esc(L.charterT)}</strong><br>${esc(L.charter)}</p>

  <h2 class="mini-h">${esc(L.catsH)}</h2>
  <div class="obs-grid">
${catCards}
  </div>

  <h2 class="mini-h">${esc(L.artsH)}</h2>
  <div class="grid">
${artCards}
  </div>

  <p class="tool-link"><a href="../articles/">${esc(L.all)} →</a></p>
  <div data-ad-slot="leaderboard"></div>
</main>

<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${L.back}</a></footer>
<script src="../../assets/ads.js"></script>
</body>
</html>
`;
};
