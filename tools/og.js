#!/usr/bin/env node
/* توليد صور og:image (1200×630) للمشاركة على واتساب وتويتر وفيسبوك.
   بلا مكتبات: SVG ثم PNG عبر qlmanage + sips المدمجين في macOS.

   لماذا القماش مربّع 1200×1200 والتصميم في وسطه:
   qlmanage يضبط الضلع الأطول على القيمة المطلوبة. لو كان الملف
   1200×630 لقاسه بمعامل 1.9 فيفيض ويُقصّ. المربّع يُرسم 1:1 بالضبط،
   ثم نقصّ الشريط الأوسط 630 بـ sips فنحصل على التصميم كما رُسم.

   التشغيل: node tools/og.js
*/
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');

const W = 1200, H = 630, CANVAS = 1200, OFF = (CANVAS - H) / 2;  // 285
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// نجوم ببذرة ثابتة: الصورة نفسها تخرج في كل توليد
function stars(seed){
  let s = seed, out = '';
  const rnd = () => { s = (s*1664525 + 1013904223) >>> 0; return s/4294967296; };
  for (let i=0;i<110;i++)
    out += `<circle cx="${(rnd()*W).toFixed(1)}" cy="${(OFF + rnd()*H).toFixed(1)}"`
         + ` r="${(rnd()*1.8+0.5).toFixed(2)}" fill="#fff" opacity="${(rnd()*0.5+0.15).toFixed(2)}"/>`;
  return out;
}

const CARDS = {
  arb:{ title:'مَوْلِدي', sub:'ميلادك في التقويم الهجري',
        line:'تحويل التاريخ · حاسبة العمر · التقويم السنوي · قمر ميلادك',
        family:"Cairo, Tajawal, 'Geeza Pro', sans-serif" },
  eng:{ title:'Mawlidi', sub:'Your Birthday in the Hijri Calendar',
        line:'Date converter · Age calculator · Full-year calendar · Birth moon',
        family:"Lato, Helvetica, Arial, sans-serif" }
};

// كل الإحداثيات مُزاحة بـ OFF مسبقاً، فلا حاجة إلى transform ولا إلى مجموعات متداخلة
function svg(lang){
  const c = CARDS[lang];
  const y = n => n + OFF;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}" viewBox="0 0 ${CANVAS} ${CANVAS}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#07071A"/>
      <stop offset="55%" stop-color="#0C0C22"/>
      <stop offset="100%" stop-color="#07071A"/>
    </linearGradient>
    <radialGradient id="m" cx="38%" cy="34%">
      <stop offset="0%" stop-color="#FFF8E4"/>
      <stop offset="62%" stop-color="#EBD9A4"/>
      <stop offset="100%" stop-color="#B99B57"/>
    </radialGradient>
    <mask id="cut">
      <rect width="${CANVAS}" height="${CANVAS}" fill="#000"/>
      <circle cx="600" cy="${y(180)}" r="72" fill="#fff"/>
      <circle cx="634" cy="${y(163)}" r="62" fill="#000"/>
    </mask>
  </defs>

  <rect x="0" y="${OFF}" width="${W}" height="${H}" fill="url(#bg)"/>
  ${stars(20260910)}
  <rect x="26" y="${y(26)}" width="${W-52}" height="${H-52}" fill="none"
        stroke="#C9A84C" stroke-opacity="0.28" stroke-width="3" rx="18"/>
  <rect x="0" y="${OFF}" width="${W}" height="${H}" fill="url(#m)" mask="url(#cut)"/>

  <g text-anchor="middle" font-family="${c.family}">
    <text x="600" y="${y(345)}" font-size="80" font-weight="900" fill="#C9A84C">${esc(c.title)}</text>
    <text x="600" y="${y(415)}" font-size="33" fill="#F0EDE8" opacity="0.92">${esc(c.sub)}</text>
    <text x="600" y="${y(482)}" font-size="23" fill="#F0EDE8" opacity="0.55">${esc(c.line)}</text>
    <text x="600" y="${y(560)}" font-size="22" fill="#C9A84C" opacity="0.75">mawlidi.com</text>
  </g>
</svg>`;
}

for (const lang of Object.keys(CARDS)) {
  const p = path.join(ROOT, 'assets', `og-${lang}.svg`);
  fs.writeFileSync(p, svg(lang));
  console.log('✅', path.relative(ROOT, p));
}
console.log('\nثم: node tools/og-png.sh  أو الأمرين في README');
