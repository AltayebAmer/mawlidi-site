#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   MAWLIDI BUILD — يولّد صفحات المقالات المستقلة + sitemap
   المصدر الوحيد للحقيقة: مصفوفة ARTS داخل arb/index.html و eng/index.html
   التشغيل:  node tools/build.js         (توليد)
             node tools/build.js --check (فحص فقط بلا كتابة)
   ═══════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://mawlidi.com';
const CHECK = process.argv.includes('--check');
const converterPage = require('./converter.js');
const calendarPage  = require('./calendar.js');
const agePage       = require('./age.js');
const countdownPage = require('./countdown.js');
const moonPage      = require('./moon.js');
const cardPage      = require('./card.js');
const mansionsPage  = require('./mansions.js');
const zodiacPage    = require('./zodiac.js');
const trustPage     = require('./pages.js');
const observatoryPage = require('./observatory.js');
const advertisePage = require('./advertise.js');
const seasonPage    = require('./season.js');

// السنوات الميلادية التي تُولَّد لها صفحات موسمية — أضف سنة هنا فقط
const SEASON_YEARS = [2027];

/* ── Cloudflare Web Analytics ──────────────────────────────
   الطريق الأسهل لا يحتاج هذا الملف إطلاقاً: من لوحة Cloudflare
   ← Workers & Pages ← mawlidi-site ← Metrics ← Enable،
   فيُحقن الكود تلقائياً بلا token.

   وهذا المسار البديل لمن أراد الحقن اليدوي: ضع الـtoken هنا
   وشغّل `node tools/build.js`، فيُضاف إلى كل صفحة مولَّدة.
   الـtoken معرّف عام يظهر في كود الصفحة، وليس سراً.
   اتركه فارغاً = لا يُحقن شيء. */
const CF_ANALYTICS_TOKEN = '';

const BEACON = 'static.cloudflareinsights.com/beacon.min.js';

/* مرور واحد بعد البناء على كل صفحات الموقع: أضمن من إضافة الوسم في
   خمسة عشر قالباً، ويشمل الصفحتين الرئيسيتين وهما ليستا مولَّدتين. */
function injectAnalytics() {
  const tag = `<script defer src="https://${BEACON}" `
    + `data-cf-beacon='{"token":"${CF_ANALYTICS_TOKEN}"}'></script>\n`;
  let done = 0;
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { walk(f); continue; }
      if (e.name !== 'index.html') continue;
      let h = fs.readFileSync(f, 'utf8');
      const had = h.includes(BEACON);
      // انزع القديم دائماً، ثم أضف الجديد إن وُجد token
      h = h.replace(new RegExp(`<script defer src="https://${BEACON}"[^>]*></script>\\n?`, 'g'), '');
      if (CF_ANALYTICS_TOKEN) h = h.replace('</body>', tag + '</body>');
      if (h !== fs.readFileSync(f, 'utf8')) { fs.writeFileSync(f, h); done++; }
      else if (had && !CF_ANALYTICS_TOKEN) done++;
    }
  };
  for (const d of ['arb','eng']) walk(path.join(ROOT, d));
  return done;
}

// معرّف المقالة → slug ثابت (لا يتغيّر أبداً بعد النشر: تغييره يكسر الروابط)
const SLUGS = {
  a1:'why-two-people-born-same-day-differ',
  a2:'why-we-search-ourselves-in-astrology',
  a3:'astronomy-vs-astrology',
  a4:'hijri-calendar-civilization',
  a5:'how-civilizations-celebrate-birthdays',
  a6:'birth-order-and-personality',
  a7:'islamic-view-of-birth',
  a8:'birth-in-arab-civilization',
  a9:'philosophers-on-existence',
  a10:'names-and-identity',
  a11:'how-to-calculate-hijri-age',
  a12:'why-hijri-year-is-11-days-shorter',
  a13:'hijri-month-names-and-meanings',
  a14:'why-ramadan-date-changes',

  // مقالات المرصد الحصرية — كانت بلا صفحات، تُفتح في قارئ داخلي فقط
  o1:'what-happens-at-the-moment-of-birth',
  o2:'the-moon-across-civilisations',
  o3:'world-birth-statistics',
  o4:'what-we-actually-inherit',
  o5:'welcoming-the-newborn-rituals'
};

// المقالة → الأداة التي يحتاجها قارئها فعلاً بعد القراءة
const TOOLS = {
  a2:  { slug:'zodiac',    ar:'أين كانت الشمس فعلاً يوم ميلادك؟',      en:'Where was the Sun really on your birthday?' },
  a3:  { slug:'mansions',  ar:'منازل القمر: رصد عربي لا تنجيم',        en:'The lunar mansions: Arab observation, not astrology' },
  a4:  { slug:'converter', ar:'جرّب محوّل التاريخ الهجري ↔ الميلادي', en:'Try the Hijri ↔ Gregorian converter' },
  a11: { slug:'age',       ar:'احسب عمرك بالهجري والميلادي الآن',     en:'Calculate your Hijri and Gregorian age' },
  a12: { slug:'calendar',  ar:'استعرض التقويم الهجري لسنة كاملة',      en:'Browse a full-year Hijri calendar' },
  a13: { slug:'calendar',  ar:'استعرض الأشهر الهجرية في تقويم السنة',  en:'See the months in the full-year calendar' },
  a14: { slug:'countdown', ar:'كم باقي على رمضان؟ عد تنازلي مباشر',    en:'How long until Ramadan? Live countdown' }
};

const LANGS = {
  arb: { dir:'rtl', code:'ar', file:'arb/index.html',
         fonts:"family=Tajawal:wght@300;400;700;900&family=Cairo:wght@300;400;600;700;900",
         font:"'Cairo',sans-serif", site:'مَوْلِدي', author:'الفنان الطيب عامر',
         back:'العودة إلى مَوْلِدي', all:'كل المقالات', home:'الرئيسية',
         readmore:'اقرأ أيضاً', readmore2:'اقرأ ←', minutes:'دقائق قراءة', catKey:'cat_ar' },
  eng: { dir:'ltr', code:'en', file:'eng/index.html',
         fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700;900",
         font:"'Lato',sans-serif", site:'Mawlidi', author:'Altayeb Amer',
         back:'Back to Mawlidi', all:'All Articles', home:'Home',
         readmore:'Read also', readmore2:'Read →', minutes:'min read', catKey:'cat_en' }
};

/* ── استخراج مصفوفة ARTS من ملف HTML ── */
function extractArts(html, name = 'ARTS') {
  const start = html.indexOf('const ' + name + '=[');
  if (start === -1) throw new Error('لم يُعثر على مصفوفة ' + name);
  const open = html.indexOf('[', start);
  let depth = 0, i = open, inTpl = false, inStr = null;
  for (; i < html.length; i++) {
    const c = html[i], p = html[i-1];
    if (inStr) { if (c === inStr && p !== '\\') inStr = null; continue; }
    if (inTpl) { if (c === '`' && p !== '\\') inTpl = false; continue; }
    if (c === '`') { inTpl = true; continue; }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) break; }
  }
  return new Function('return ' + html.slice(open, i + 1))();
}

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
// نص عادي من HTML، لأجل وسم description
const plain = h => String(h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();

/* ── قالب صفحة المقالة ── */
function articlePage(art, lang, L, siblings, hasAlt) {
  const slug = SLUGS[art.id];
  const url  = `${SITE}/${lang}/articles/${slug}/`;
  const desc = art.sub || plain(art.body).slice(0, 155);
  const cat  = art[L.catKey] || art.cat_ar || art.cat_en || '';
  const alt  = hasAlt
    ? `<link rel="alternate" hreflang="${lang==='arb'?'en':'ar'}" href="${SITE}/${lang==='arb'?'eng':'arb'}/articles/${slug}/">\n`
    : '';
  const ld = {
    '@context':'https://schema.org','@type':'Article',
    headline: art.title, description: desc,
    inLanguage: L.code, mainEntityOfPage: url,
    author:{'@type':'Person', name:L.author},
    publisher:{'@type':'Organization', name:L.site},
    articleSection: plain(cat)
  };
  const more = siblings.map(s =>
    `<a class="more-card" href="../${SLUGS[s.id]}/"><span class="more-cat">${esc(plain(s[L.catKey]||''))}</span>${esc(s.title)}</a>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="${L.code}" dir="${L.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07071A">
<title>${esc(art.title)} — ${L.site}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<meta name="author" content="${esc(L.author)}">
<link rel="canonical" href="${url}">
${alt}<link rel="alternate" hreflang="x-default" href="${SITE}/arb/articles/${slug}/">
<meta property="og:type" content="article">
<meta property="og:image" content="${SITE}/assets/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:title" content="${esc(art.title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${L.code === 'ar' ? 'ar_AR' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link href="https://fonts.googleapis.com/css2?${L.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../../assets/article.css">
<style>body{font-family:${L.font};}</style>
</head>
<body>
<nav class="crumb">
  <a href="../../">${L.home}</a> <span>/</span>
  <a href="../">${L.all}</a>
</nav>
<article class="art">
  <span class="cat">${esc(plain(cat))}</span>
  <h1>${esc(art.title)}</h1>
  ${art.sub ? `<p class="sub">${esc(art.sub)}</p>` : ''}
  <div class="meta">${art.min ? `${art.min} ${L.minutes}` : ''}</div>
  <div class="body">
${art.body}
  </div>
${TOOLS[art.id] ? `  <a class="art-cta" href="../../${TOOLS[art.id].slug}/">${esc(TOOLS[art.id][L.code])} →</a>` : ''}
</article>
<div data-ad-slot="leaderboard"></div>
${more ? `<section class="more"><h2>${L.readmore}</h2><div class="more-grid">${more}</div></section>` : ''}
<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../../">${L.back}</a></footer>
<script src="../../../assets/ads.js"></script>
</body>
</html>
`;
}

/* ── قالب صفحة الأرشيف ── */
function indexPage(arts, lang, L) {
  const url = `${SITE}/${lang}/articles/`;
  const cards = arts.map(a =>
    `<a class="card" href="./${SLUGS[a.id]}/">
      <span class="card-cat">${esc(plain(a[L.catKey]||''))}</span>
      <h2>${esc(a.title)}</h2>
      <p>${esc(a.sub||'')}</p>
      <span class="card-min">${a.min?`${a.min} ${L.minutes}`:''}</span>
    </a>`).join('\n');
  const ld = {
    '@context':'https://schema.org','@type':'CollectionPage',
    name:`${L.all} — ${L.site}`, url, inLanguage:L.code,
    hasPart: arts.map(a => ({'@type':'Article', headline:a.title,
      url:`${SITE}/${lang}/articles/${SLUGS[a.id]}/`}))
  };
  return `<!DOCTYPE html>
<html lang="${L.code}" dir="${L.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07071A">
<title>${L.all} — ${L.site}</title>
<meta name="description" content="${esc(arts.map(a=>a.title).slice(0,3).join(' · '))}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${lang==='arb'?'en':'ar'}" href="${SITE}/${lang==='arb'?'eng':'arb'}/articles/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/articles/">
<meta property="og:title" content="${L.all} — ${L.site}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE}/assets/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link href="https://fonts.googleapis.com/css2?${L.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/article.css">
<style>body{font-family:${L.font};}</style>
</head>
<body>
<nav class="crumb"><a href="../">${L.home}</a> <span>/</span> <span>${L.all}</span></nav>
<header class="arch-head"><h1>${L.all}</h1></header>
<div class="grid">
${cards}
</div>
<div data-ad-slot="leaderboard"></div>
<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${L.back}</a></footer>
<script src="../../assets/ads.js"></script>
</body>
</html>
`;
}

/* ── التنفيذ ── */
// أي المعرّفات موجودة فعلاً في كل لغة — لضبط hreflang بالواقع لا بافتراض
const PRESENT = {};
for (const [lang, L] of Object.entries(LANGS)) {
  const src = fs.readFileSync(path.join(ROOT, L.file), 'utf8');
  PRESENT[lang] = new Set([
    ...extractArts(src).map(a => a.id),
    ...extractArts(src, 'OBS_ARTS').map(a => a.id)
  ]);
}

/* ── حقن «أبرز المقالات» كـHTML ثابت في الصفحة الرئيسية ──
   كان القسم يُملأ بالجافاسكربت وقت التشغيل، فيصل جوجل إلى صفحة
   رئيسية فارغة منه. والبطاقات الآن روابط <a> حقيقية إلى الصفحات
   المستقلة بدل أزرار تفتح طبقة داخلية — يتبعها الزاحف ويستطيع
   الزائر مشاركتها. */
function injectPreview(lang, L, arts) {
  const file = path.join(ROOT, L.file);
  let html = fs.readFileSync(file, 'utf8');
  const cards = arts.slice(0, 3).map(a =>
    `      <a class="art-card" href="articles/${SLUGS[a.id]}/">
        <div class="ac-cat">${esc(plain(a[L.catKey] || ''))}</div>
        <div class="ac-title">${esc(a.title)}</div>
        <div class="ac-sub">${esc(a.sub || '')}</div>
        <div class="ac-foot"><span class="ac-time">⏱ ${a.min} ${L.minutes}</span>
        <span class="rbtn">${L.readmore2}</span></div>
      </a>`).join('\n');
  const out = html.replace(
    /<!-- BUILD:ART-PREV -->[\s\S]*?<!-- \/BUILD:ART-PREV -->/,
    `<!-- BUILD:ART-PREV -->\n${cards}\n<!-- /BUILD:ART-PREV -->`);
  if (out !== html) { fs.writeFileSync(file, out); return true; }
  return false;
}


/* ── الشريط السفلي في كل صفحة ────────────────────────────
   قرار المالك: يصير روابط حقيقية في كل الصفحات لا أزراراً في صفحتين.
   يُحقن بمرور واحد بعد البناء لأن العمق يختلف: صفحة تحت /arb/X/
   تحتاج ../ وصفحة مقالة تحت /arb/articles/slug/ تحتاج ../../ */
const BNAV = {
  arb:[['','🌙','مَوْلِدي'],['observatory/','🔭','المرصد'],['articles/','📖','مقالات'],
       ['advertise/','💎','أعلن'],['about/','ℹ️','من نحن']],
  eng:[['','🌙','Mawlidi'],['observatory/','🔭','Observatory'],['articles/','📖','Articles'],
       ['advertise/','💎','Advertise'],['about/','ℹ️','About']]
};

function injectBnav() {
  let done = 0;
  const walk = (dir, lang) => {
    for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { walk(f, lang); continue; }
      if (e.name !== 'index.html') continue;

      const rel = path.relative(path.join(ROOT, lang), f);
      const depth = rel.split(path.sep).length - 1;
      if (depth === 0) continue;                    // الصفحة الرئيسية لها شريطها
      const pre = '../'.repeat(depth);
      const section = rel.split(path.sep)[0] + '/';

      const links = BNAV[lang].map(([href, icon, label]) => {
        const on = href && section === href ? ' class="on"' : '';
        return `<a href="${pre}${href}"${on}><span class="ni">${icon}</span>`
             + `<span class="nl">${label}</span></a>`;
      }).join('');
      const tag = `<nav class="bnav" data-bnav>${links}</nav>\n`;

      let h = fs.readFileSync(f, 'utf8');
      const before = h;
      h = h.replace(/<nav class="bnav" data-bnav>[\s\S]*?<\/nav>\n?/g, '');
      h = h.replace('</body>', tag + '</body>');
      if (h !== before) { fs.writeFileSync(f, h); done++; }
    }
  };
  for (const lang of ['arb','eng']) walk(path.join(ROOT, lang), lang);
  return done;
}

// ═══ كتلتان مشتركتان في كل صفحة: شريط المشاريع الأخرى، وركن «رد المعروف» ═══
// كانتا تُحقنان بسكربت خارجي لمرة واحدة، فمحاهما أول إعادة بناء من 74 صفحة.
// مصدرهما هنا الآن، ويُعاد تطبيقهما في كل بناء على نمط injectBnav().
const BLOCKS = {
  arb: {
    works: `<!-- works:begin -->
<section class="works-band">
  <div class="wb-head">
    <div class="wb-eyebrow">مشاريع أخرى</div>
    <div class="wb-title">من تصميم الطيب عامر</div>
  </div>
  <div class="wb-panel wb-free">
    <h4 class="wb-h">مشاريع مجانية</h4>
    <p class="wb-note">كل مشروع صُمِّم ليكون مجانياً ونافعاً. شاركه مع من ينتفع به.</p>
    <div class="wb-grid">
      
      <a href="https://qurankarem.org" target="_blank" rel="noopener"><b>القرآن الكريم</b><span>مصحف رقمي</span></a>
      <a href="https://007.gallery" target="_blank" rel="noopener"><b>007.gallery</b><span>أدوات الصور</span></a>
      <a href="https://awraqna.com" target="_blank" rel="noopener"><b>أوراقنا</b><span>أوراق عمل للطباعة</span></a>
    </div>
  </div>
</section>
<!-- works:end -->`,
    support: `<!-- support:begin -->
<section class="foot-support">
  <h3>❤ ادعمنا — «رد المعروف»</h3>
  <p>مَوْلِدي مجاني بالكامل وحساباته تجري داخل متصفحك. مشاهدة إعلان بسيط، أو مشاركة الموقع مع صديق، تساعدنا على إبقاء كل شيء مجانياً.</p>
</section>
<!-- support:end -->`
  },
  eng: {
    works: `<!-- works:begin -->
<section class="works-band">
  <div class="wb-head">
    <div class="wb-eyebrow">Other projects</div>
    <div class="wb-title">Designed by Altayeb Amer</div>
  </div>
  <div class="wb-panel wb-free">
    <h4 class="wb-h">Free projects</h4>
    <p class="wb-note">Each project is built to be free and useful. Share it with someone who would benefit.</p>
    <div class="wb-grid">
      
      <a href="https://qurankarem.org" target="_blank" rel="noopener"><b>Quran Kareem</b><span>Digital Quran</span></a>
      <a href="https://007.gallery" target="_blank" rel="noopener"><b>007.gallery</b><span>Image tools</span></a>
      <a href="https://awraqna.com" target="_blank" rel="noopener"><b>Awraqna</b><span>Printable worksheets</span></a>
    </div>
  </div>
</section>
<!-- works:end -->`,
    support: `<!-- support:begin -->
<section class="foot-support">
  <h3>❤ Support us — pay it forward</h3>
  <p>Mawlidi is completely free and its calculations run inside your browser. Viewing a simple ad, or sharing the site with a friend, helps us keep everything free.</p>
</section>
<!-- support:end -->`
  }
};

function injectBlocks() {
  let done = 0;
  const walk = (dir, lang) => {
    for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { walk(f, lang); continue; }
      if (e.name !== 'index.html') continue;

      let h = fs.readFileSync(f, 'utf8');
      const before = h;

      // إزالة أي نسخة سابقة أولاً — وإلا تراكمت مع كل بناء
      h = h.replace(/<!-- works:begin -->[\s\S]*?<!-- works:end -->\n?/g, '');
      h = h.replace(/<!-- support:begin -->[\s\S]*?<!-- support:end -->\n?/g, '');

      // المرساة الوحيدة الموجودة في الصفحات الـ76 كلها. الفوتر لا يصلح:
      // صفحتا التقويم بلا <footer class="foot"> بهذه الصيغة.
      // وصفحتا التقويم تكتبانها <div class="no-print" data-artist-corner>
      // فالمطابقة بتعبير لا بنصّ حرفي، ومع نقل no-print إلى الكتلتين حتى
      // لا يظهرا في المطبوع.
      const m = h.match(/<div[^>]*data-artist-corner[^>]*><\/div>/);
      if (m) {
        const noPrint = m[0].includes('no-print');
        const dress = b => noPrint ? b.replace(/class="(works-band|foot-support)"/, 'class="$1 no-print"') : b;
        h = h.replace(m[0], m[0] + '\n' + dress(BLOCKS[lang].works) + '\n' + dress(BLOCKS[lang].support));
        if (h !== before) { fs.writeFileSync(f, h); done++; }
      }
    }
  };
  for (const lang of ['arb','eng']) walk(path.join(ROOT, lang), lang);
  return done;
}

// ═══ ربط الأنماط المشتركة وبصمة تمنع تقديم نسخة قديمة ═══
// روابط الأنماط مكتوبة في عشرة ملفات مولِّدة، وassets/* تُخزَّن يوماً كاملاً
// بـmax-age=86400. فملف CSS جديد لا يصل من حمّل الصفحة قبل ساعة، وسلسلة
// @import تجعل الملفات المستوردة رهينة نسخة article.css المخزَّنة.
// البصمة مشتقّة من محتوى ملفات CSS: تتغيّر حين يتغيّر أيٌّ منها، وتثبت
// حين لا يتغيّر شيء — فيبقى البناء ثابتاً.
function cssStamp() {
  const dir = path.join(ROOT, 'assets');
  const names = fs.readdirSync(dir).filter(n => n.endsWith('.css')).sort();
  const h = crypto.createHash('md5');
  for (const n of names) h.update(n).update(fs.readFileSync(path.join(dir, n)));
  return h.digest('hex').slice(0, 8);
}

function stampAssets(v) {
  let done = 0;
  const visit = f => {
    let h = fs.readFileSync(f, 'utf8');
    const before = h;

    // الملفان المشتركان يُربطان بجوار article.css بالبادئة النسبية نفسها
    const m = h.match(/<link rel="stylesheet" href="((?:\.\.\/)*|\/)assets\/article\.css[^"]*">/);
    if (m) {
      const pre = m[1];
      for (const name of ['responsive.css', 'blocks.css']) {
        if (!h.includes('assets/' + name)) {
          h = h.replace(m[0], `<link rel="stylesheet" href="${pre}assets/${name}">\n` + m[0]);
        }
      }
    }
    h = h.replace(/(href="(?:(?:\.\.\/)*|\/)assets\/[\w.-]+\.css)(\?v=[^"]*)?"/g, `$1?v=${v}"`);

    if (h !== before) { fs.writeFileSync(f, h); done++; }
  };
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f);
      else if (e.name === 'index.html') visit(f);
    }
  };
  for (const lang of ['arb','eng']) walk(path.join(ROOT, lang));
  const e404 = path.join(ROOT, '404.html');
  if (fs.existsSync(e404)) visit(e404);
  return done;
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc:`${SITE}/arb/`, pri:'1.0' },
  { loc:`${SITE}/eng/`, pri:'1.0' }
];
let written = 0;
const report = {};
const obsCount = {};

for (const [lang, L] of Object.entries(LANGS)) {
  const html = fs.readFileSync(path.join(ROOT, L.file), 'utf8');
  const all = extractArts(html);
  const arts = all.filter(a => SLUGS[a.id]);
  const missing = all.filter(a => !SLUGS[a.id]).map(a => a.id);
  if (missing.length) throw new Error(`معرّفات بلا slug في ${lang}: ${missing.join(', ')}`);
  report[lang] = arts.length;

  const outDir = path.join(ROOT, lang, 'articles');
  urls.push({ loc:`${SITE}/${lang}/articles/`, pri:'0.9' });

  arts.forEach((art, i) => {
    const sibs = [arts[(i+1)%arts.length], arts[(i+2)%arts.length]].filter(s => s && s.id !== art.id);
    const hasAlt = PRESENT[lang === 'arb' ? 'eng' : 'arb'].has(art.id);
    urls.push({ loc:`${SITE}/${lang}/articles/${SLUGS[art.id]}/`, pri:'0.8' });
    if (!CHECK) {
      const d = path.join(outDir, SLUGS[art.id]);
      fs.mkdirSync(d, { recursive:true });
      fs.writeFileSync(path.join(d, 'index.html'), articlePage(art, lang, L, sibs, hasAlt));
      written++;
    }
  });
  // مقالات المرصد الحصرية: كانت بلا صفحات وتُفتح في قارئ داخلي فقط.
  // تُولَّد في مجلد articles نفسه لتكون روابط حقيقية قابلة للمشاركة،
  // لكنها لا تدخل أرشيف المقالات لأن الموقع يعرضها بوصفها «حصرية للمرصد».
  const obs = extractArts(html, 'OBS_ARTS').filter(a => SLUGS[a.id]);
  obsCount[lang] = obs.length;
  obs.forEach((art, i) => {
    const sibs = [obs[(i+1)%obs.length], obs[(i+2)%obs.length]].filter(x => x && x.id !== art.id);
    const hasAlt = PRESENT[lang === 'arb' ? 'eng' : 'arb'].has(art.id);
    urls.push({ loc:`${SITE}/${lang}/articles/${SLUGS[art.id]}/`, pri:'0.7' });
    if (!CHECK) {
      const d = path.join(outDir, SLUGS[art.id]);
      fs.mkdirSync(d, { recursive:true });
      fs.writeFileSync(path.join(d, 'index.html'), articlePage(art, lang, L, sibs, hasAlt));
      written++;
    }
  });

  if (!CHECK) {
    fs.mkdirSync(outDir, { recursive:true });
    fs.writeFileSync(path.join(outDir, 'index.html'), indexPage(arts, lang, L));
    written++;
  }

  // أداة: محوّل التاريخ
  urls.push({ loc:`${SITE}/${lang}/converter/`, pri:'0.9' });
  if (!CHECK) {
    const cd = path.join(ROOT, lang, 'converter');
    fs.mkdirSync(cd, { recursive:true });
    fs.writeFileSync(path.join(cd, 'index.html'), converterPage(lang));
    written++;
  }

  // أداة: التقويم الهجري السنوي
  urls.push({ loc:`${SITE}/${lang}/calendar/`, pri:'0.9' });
  if (!CHECK) {
    const kd = path.join(ROOT, lang, 'calendar');
    fs.mkdirSync(kd, { recursive:true });
    fs.writeFileSync(path.join(kd, 'index.html'), calendarPage(lang));
    written++;
  }

  if (!CHECK && injectPreview(lang, L, arts)) written++;

  // صفحات المناسبات الموسمية: «متى رمضان 2027» ونظائرها.
  // العنوان يطابق عبارة البحث حرفياً، والتواريخ محسوبة لا مكتوبة.
  for (const gy of SEASON_YEARS) {
    for (const key of seasonPage.EVENTS) {
      const page = seasonPage(lang, key, gy);
      if (!page) continue;
      urls.push({ loc:`${SITE}/${lang}/${page.slug}/`, pri:'0.9' });
      if (!CHECK) {
        const sd = path.join(ROOT, lang, page.slug);
        fs.mkdirSync(sd, { recursive:true });
        fs.writeFileSync(path.join(sd, 'index.html'), page.html);
        written++;
      }
    }
  }

  // صفحة «أعلن معنا»: كانت طبقة عائمة بلا رابط
  urls.push({ loc:`${SITE}/${lang}/advertise/`, pri:'0.6' });
  if (!CHECK) {
    const ad = path.join(ROOT, lang, 'advertise');
    fs.mkdirSync(ad, { recursive:true });
    fs.writeFileSync(path.join(ad, 'index.html'), advertisePage(lang));
    written++;
  }

  // صفحة المرصد: كانت طبقة عائمة بلا رابط
  urls.push({ loc:`${SITE}/${lang}/observatory/`, pri:'0.8' });
  if (!CHECK) {
    const cats = extractArts(html, 'OBS_CATS');
    const od = path.join(ROOT, lang, 'observatory');
    fs.mkdirSync(od, { recursive:true });
    fs.writeFileSync(path.join(od, 'index.html'), observatoryPage(lang, cats, obs, SLUGS));
    written++;
  }

  // صفحات الثقة: مستقلة وقابلة للفهرسة، وشرط أساسي لقبول AdSense
  for (const slug of trustPage.SLUGS) {
    urls.push({ loc:`${SITE}/${lang}/${slug}/`, pri:'0.5' });
    if (!CHECK) {
      const pd = path.join(ROOT, lang, slug);
      fs.mkdirSync(pd, { recursive:true });
      fs.writeFileSync(path.join(pd, 'index.html'), trustPage(lang, slug, today));
      written++;
    }
  }

  // أدوات إضافية بنفس النمط
  for (const [slug, tpl] of [['age', agePage], ['countdown', countdownPage], ['moon', moonPage], ['card', cardPage], ['mansions', mansionsPage], ['zodiac', zodiacPage]]) {
    urls.push({ loc:`${SITE}/${lang}/${slug}/`, pri:'0.9' });
    if (!CHECK) {
      const td = path.join(ROOT, lang, slug);
      fs.mkdirSync(td, { recursive:true });
      fs.writeFileSync(path.join(td, 'index.html'), tpl(lang));
      written++;
    }
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.pri}</priority>
  </url>`).join('\n')}
</urlset>
`;
if (!CHECK) fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);

if (!CHECK) {
  console.log(`الشريط السفلي: حُقن في ${injectBnav()} صفحة`);
  console.log(`الكتلتان المشتركتان: حُقنتا في ${injectBlocks()} صفحة`);
  const v = cssStamp();
  console.log(`بصمة الأنماط ${v}: خُتمت في ${stampAssets(v)} صفحة`);
  const n = injectAnalytics();
  if (CF_ANALYTICS_TOKEN) console.log(`Cloudflare Analytics: حُقن في ${n} صفحة`);
  else if (n) console.log(`Cloudflare Analytics: أُزيل من ${n} صفحة (لا token)`);
}

console.log(`مقالات عربية: ${report.arb} | مقالات إنجليزية: ${report.eng}`);
console.log(`مقالات المرصد: ${obsCount.arb} عربية · ${obsCount.eng} إنجليزية`);
console.log(`روابط في sitemap: ${urls.length}`);
console.log(CHECK ? 'فحص فقط — لم يُكتب شيء' : `ملفات مكتوبة: ${written} + sitemap.xml`);
