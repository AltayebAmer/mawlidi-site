/* قوالب صفحات الثقة: من نحن · الخصوصية · الشروط · تواصل
   صفحات مستقلة قابلة للفهرسة، وشرط أساسي لقبول AdSense. */
const SITE = 'https://mawlidi.com';
const EMAIL = 'artist.altayeb@gmail.com';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const L = {
  arb:{ code:'ar', dir:'rtl', font:"'Cairo',sans-serif",
    fonts:"family=Tajawal:wght@400;700;900&family=Cairo:wght@400;700;900",
    site:'مَوْلِدي', home:'الرئيسية', back:'العودة إلى مَوْلِدي', updated:'آخر تحديث' },
  eng:{ code:'en', dir:'ltr', font:"'Lato',sans-serif",
    fonts:"family=Playfair+Display:wght@400;700;900&family=Lato:wght@400;700;900",
    site:'Mawlidi', home:'Home', back:'Back to Mawlidi', updated:'Last updated' }
};

/* المحتوى: [slug, {ar:{title,desc,h1,body[]}, en:{...}}] */
const PAGES = {
  about: {
    arb:{ title:'من نحن — مَوْلِدي', h1:'من نحن',
      desc:'مَوْلِدي مشروع عربي مستقل لحساب التاريخ الهجري وأدوات التقويم القمري، بلا تنجيم ولا ادعاء بمعرفة الغيب.',
      body:[
        ['','مَوْلِدي مشروع عربي مستقل، يقدّم أدوات دقيقة لحساب التاريخ الهجري والعمر القمري، ومحتوى معرفياً عن التقويم والفلك والحضارة. كل ما فيه مجاني بلا اشتراك ولا تسجيل.'],
        ['ما نقدّمه','تسع أدوات تعمل كلها داخل متصفحك: محوّل التاريخ الهجري والميلادي، التقويم الهجري السنوي القابل للطباعة، حاسبة العمر بالتقويمين، العد التنازلي للمناسبات، طور القمر يوم الميلاد، بطاقة ميلاد قابلة للمشاركة، منازل القمر الثمانية والعشرون، وموضع الشمس في دائرة البروج. ومعها مكتبة مقالات عن التقويم والإنسان والحضارة.'],
        ['ميثاقنا','هذا موقع حساب لا موقع تنجيم. نعرض حقائق فلكية قابلة للتحقق: موضع القمر، طوره، التاريخ المقابل. ولا نصف شخصية أحد ولا نتنبّأ بمستقبله. والغيب لا يعلمه إلا الله سبحانه وتعالى.'],
        ['طريقة الحساب','نعتمد التقويم الهجري الجدولي (الخوارزمية الكويتية) وهو حسابي لا رصدي. بداية الشهر في كثير من البلدان تُعلَن برؤية الهلال وقد تفرق يوماً واحداً. لهذا نضع تنويهاً صريحاً في كل أداة: حسابنا تقدير دقيق لا إعلان شرعي، والجهة المختصة في بلدك هي المرجع.'],
        ['أدوات الفلك','حسابات أطوار القمر ومنازله وموضع الشمس مبنية على خوارزمية Meeus المختصرة، ومُختبَرة آلياً بخمسين اختباراً تشمل مطابقة لحظات محاق وبدر موثّقة، ووقوع كل منزلة على نجمها الحقيقي.'],
        ['من وراء الموقع','الفنان الطيب عامر. مَوْلِدي جزء من شبكة مواقع تقدّم خدمات مجانية: أدوات الصور، أوراق العمل التعليمية، المصحف الرقمي، والمعرض الفني.'],
        ['تواصل','للاستفسار أو الملاحظة أو الإعلان: '+EMAIL]
      ]},
    eng:{ title:'About — Mawlidi', h1:'About Mawlidi',
      desc:'Mawlidi is an independent Arabic project for Hijri date calculation and lunar calendar tools — arithmetic, not astrology.',
      body:[
        ['','Mawlidi is an independent Arabic project offering precise tools for Hijri date and lunar age calculation, alongside knowledge content about the calendar, astronomy and civilisation. Everything here is free, with no subscription and no sign-up.'],
        ['What we offer','Nine tools that run entirely inside your browser: a Hijri–Gregorian date converter, a printable full-year Hijri calendar, an age calculator across both calendars, a countdown to Islamic occasions, the Moon phase on your birth date, a shareable birthday card, the twenty-eight lunar mansions, and the Sun’s position in the zodiac. Alongside them, a library of articles on the calendar, humanity and civilisation.'],
        ['Our charter','This is a site of calculation, not divination. We present verifiable astronomical facts: the Moon’s position, its phase, the corresponding date. We describe no one’s character and predict no one’s future.'],
        ['How we calculate','We use the tabular Hijri calendar (the Kuwaiti algorithm), which is arithmetic rather than observational. In many countries the month begins with a crescent sighting and may differ by one day. Every tool therefore carries an explicit note: our calculation is a precise estimate, not a religious announcement, and the relevant authority in your country is the reference.'],
        ['Astronomy tools','Moon phases, lunar mansions and solar position are computed with an abridged Meeus algorithm, verified by fifty automated tests including documented new and full moon instants and each mansion falling on its actual star.'],
        ['Who is behind it','Artist Altayeb Amer. Mawlidi is part of a network of sites offering free services: image tools, printable worksheets, a digital Quran, and an art gallery.'],
        ['Contact','For questions, feedback or advertising: '+EMAIL]
      ]}
  },
  privacy: {
    arb:{ title:'سياسة الخصوصية — مَوْلِدي', h1:'سياسة الخصوصية',
      desc:'ما الذي يجمعه مَوْلِدي وما لا يجمعه. حساباتك تجري داخل متصفحك ولا تغادر جهازك.',
      body:[
        ['','نحترم خصوصيتك، وهذه الصفحة تشرح بدقة ما يحدث لبياناتك حين تستخدم مَوْلِدي.'],
        ['ما لا نجمعه','لا نطلب تسجيلاً ولا حساباً ولا بريداً. ولا نحتفظ بتاريخ ميلادك ولا بأي تاريخ تُدخله. كل الحسابات — التحويل، العمر، طور القمر، بطاقة الميلاد — تجري داخل متصفحك على جهازك، ولا تُرسَل إلى أي خادم. تستطيع التحقق بنفسك: افصل الإنترنت بعد تحميل الصفحة، وستعمل الأدوات كما هي.'],
        ['قياس الزيارات','نستخدم Cloudflare Web Analytics لمعرفة عدد الزيارات والصفحات الأكثر قراءة. هذه الأداة لا تستعمل كوكيز، ولا تتعقّبك عبر المواقع، ولا تبني ملفاً شخصياً عنك. تجمع بيانات مجمّعة: الصفحة، الدولة، ومصدر الإحالة.'],
        ['الخطوط','نحمّل الخطوط من Google Fonts، وهو ما يعني أن متصفحك يتصل بخوادم Google لجلبها. يخضع ذلك لسياسة خصوصية Google.'],
        ['الإعلانات','نعرض حالياً إعلانات لمواقعنا الأخرى فقط، وهي روابط عادية بلا تتبّع. إن أضفنا مستقبلاً شبكة إعلانات خارجية مثل Google AdSense، فقد تستعمل تلك الشبكة كوكيز لعرض إعلانات مناسبة، وسنحدّث هذه الصفحة قبل ذلك ونذكره صراحةً.'],
        ['التخزين المحلي','قد نحفظ تفضيلات بسيطة في متصفحك (مثل لغة العرض) عبر localStorage. هذه البيانات تبقى على جهازك ولا تصل إلينا، ويمكنك محوها من إعدادات المتصفح.'],
        ['الأطفال','الموقع لا يوجّه محتواه للأطفال دون الثالثة عشرة ولا يجمع بياناتهم عن قصد.'],
        ['حقوقك','بما أننا لا نحتفظ ببيانات شخصية، فلا يوجد ما نحذفه أو نصدّره لك. إن كان لديك سؤال عن الخصوصية، راسلنا على '+EMAIL],
        ['تعديل هذه السياسة','قد نحدّث هذه الصفحة عند تغيّر الخدمات. تاريخ آخر تحديث مذكور أسفلها.']
      ]},
    eng:{ title:'Privacy Policy — Mawlidi', h1:'Privacy Policy',
      desc:'What Mawlidi collects and what it does not. Your calculations run inside your browser and never leave your device.',
      body:[
        ['','We respect your privacy. This page explains precisely what happens to your data when you use Mawlidi.'],
        ['What we do not collect','We ask for no registration, no account and no email. We do not store your birth date or any date you enter. Every calculation — conversion, age, moon phase, birthday card — runs inside your browser on your own device and is never sent to a server. You can verify this yourself: disconnect from the internet after the page loads, and the tools keep working.'],
        ['Visitor measurement','We use Cloudflare Web Analytics to see how many people visit and which pages they read. It uses no cookies, does not track you across sites, and builds no profile of you. It collects aggregate data: page, country, referrer.'],
        ['Fonts','We load fonts from Google Fonts, which means your browser connects to Google servers to fetch them. That connection is subject to Google’s privacy policy.'],
        ['Advertising','We currently show adverts only for our own sites — ordinary links with no tracking. If we later add an external advertising network such as Google AdSense, that network may use cookies to serve relevant adverts. We will update this page and state it explicitly before doing so.'],
        ['Local storage','We may save simple preferences in your browser (such as display language) using localStorage. That data stays on your device and never reaches us; you can clear it from your browser settings.'],
        ['Children','This site is not directed at children under thirteen and does not knowingly collect their data.'],
        ['Your rights','Because we hold no personal data, there is nothing for us to delete or export. For any privacy question, write to '+EMAIL],
        ['Changes','We may update this page as the services change. The date of the last update appears below.']
      ]}
  },
  terms: {
    arb:{ title:'شروط الاستخدام — مَوْلِدي', h1:'شروط الاستخدام',
      desc:'شروط استخدام أدوات مَوْلِدي ومحتواه، وحدود الاعتماد على الحسابات المعروضة.',
      body:[
        ['','باستخدامك مَوْلِدي فأنت توافق على ما يلي.'],
        ['طبيعة الخدمة','مَوْلِدي يقدّم حسابات فلكية وتقويمية مجاناً. الأدوات تعمل داخل متصفحك، والمحتوى معرفي وثقافي.'],
        ['حدود الاعتماد — بند مهم','الحسابات هنا تعتمد التقويم الهجري الجدولي والخوارزميات الفلكية، وهي دقيقة حسابياً لكنها ليست إعلاناً شرعياً. **مواعيد رمضان والعيدين وسائر المناسبات تُعلَن من الجهة المختصة في بلدك بعد ثبوت الرؤية**، وإعلانها يقدَّم على أي حساب معروض هنا. لا نتحمّل مسؤولية قرار اتُّخذ اعتماداً على هذه الحسابات وحدها.'],
        ['التواريخ الرسمية','قد يفرق التاريخ الهجري المحسوب هنا يوماً واحداً عمّا هو مثبت في وثائقك الرسمية. الوثيقة الرسمية هي المعتمدة في المعاملات.'],
        ['الملكية الفكرية','محتوى الموقع ونصوصه وتصميمه ملك للفنان الطيب عامر. يجوز الاقتباس مع الإشارة إلى المصدر ورابط الصفحة. ولا يجوز إعادة نشر المحتوى كاملاً أو استعماله تجارياً بلا إذن كتابي.'],
        ['بطاقات الميلاد','البطاقات التي تولّدها بنفسك لك، تشاركها كما تشاء. وهي تحمل اسم الموقع، ونرجو إبقاءه.'],
        ['الروابط الخارجية','قد نضع روابط لمواقع أخرى، منها مواقعنا. لا نتحمّل مسؤولية محتوى أي موقع خارجي.'],
        ['استمرارية الخدمة','نبذل جهدنا لإبقاء الموقع متاحاً ودقيقاً، لكننا لا نضمن عمله بلا انقطاع ولا خلوّه من الخطأ. إن وجدت خطأً في حساب، أخبرنا على '+EMAIL],
        ['تعديل الشروط','قد نحدّث هذه الشروط. استمرارك في استخدام الموقع بعد التحديث يعني قبولك بها.']
      ]},
    eng:{ title:'Terms of Use — Mawlidi', h1:'Terms of Use',
      desc:'Terms for using Mawlidi’s tools and content, and the limits of relying on the calculations shown.',
      body:[
        ['','By using Mawlidi you agree to the following.'],
        ['Nature of the service','Mawlidi provides astronomical and calendar calculations free of charge. The tools run inside your browser; the content is educational and cultural.'],
        ['Limits of reliance — important','Calculations here use the tabular Hijri calendar and astronomical algorithms. They are arithmetically precise but they are not a religious announcement. **The dates of Ramadan, both Eids and other occasions are declared by the competent authority in your country after the crescent is sighted**, and that declaration takes precedence over anything shown here. We accept no responsibility for a decision taken on the basis of these calculations alone.'],
        ['Official dates','The Hijri date computed here may differ by one day from the date recorded in your official documents. The official document governs.'],
        ['Intellectual property','The content, text and design of this site belong to Artist Altayeb Amer. Quotation is permitted with attribution and a link to the page. Republishing the content in full, or using it commercially, requires written permission.'],
        ['Birthday cards','Cards you generate are yours to share as you wish. They carry the site’s name, and we ask that you keep it.'],
        ['External links','We may link to other sites, including our own. We are not responsible for the content of any external site.'],
        ['Availability','We work to keep the site available and accurate, but we do not guarantee uninterrupted or error-free operation. If you find an error in a calculation, tell us at '+EMAIL],
        ['Changes','We may update these terms. Continuing to use the site after an update means you accept them.']
      ]}
  },
  contact: {
    arb:{ title:'تواصل معنا — مَوْلِدي', h1:'تواصل معنا',
      desc:'راسلنا للاستفسار أو الإبلاغ عن خطأ في الحساب أو للإعلان في مَوْلِدي.',
      body:[
        ['','نرحّب بملاحظتك وسؤالك.'],
        ['البريد','للاستفسار العام أو الاقتراح: '+EMAIL],
        ['الإبلاغ عن خطأ في الحساب','إن وجدت تاريخاً أو حساباً تظنّه خاطئاً، أرسل لنا: التاريخ الذي أدخلته، والنتيجة التي ظهرت، والنتيجة التي تتوقّعها، واسم الأداة. هذه التفاصيل تختصر علينا الطريق وتصل إلى الإصلاح أسرع.'],
        ['الإعلان','مَوْلِدي يصل إلى جمهور عربي يبحث عن المناسبات الهجرية وأعياد الميلاد. للاستفسار عن الإعلان راسلنا على البريد أعلاه.'],
        ['المواقع الأخرى','007.gallery لأدوات الصور · awraqna.com لأوراق العمل التعليمية · qurankarem.org للمصحف الرقمي · altayebamer.com للمعرض الفني.']
      ]},
    eng:{ title:'Contact — Mawlidi', h1:'Contact Us',
      desc:'Write to us with a question, a calculation error report, or an advertising enquiry.',
      body:[
        ['','We welcome your question and your feedback.'],
        ['Email','For general enquiries or suggestions: '+EMAIL],
        ['Reporting a calculation error','If you find a date or calculation you believe is wrong, send us: the date you entered, the result shown, the result you expected, and the name of the tool. These details shorten the path to a fix considerably.'],
        ['Advertising','Mawlidi reaches an Arabic-speaking audience searching for Hijri occasions and birthdays. For advertising enquiries, write to the address above.'],
        ['Our other sites','007.gallery for image tools · awraqna.com for printable worksheets · qurankarem.org for a digital Quran · altayebamer.com for the art gallery.']
      ]}
  }
};

module.exports = function trustPage(lang, slug, updated){
  const T=L[lang], P=PAGES[slug][lang];
  const url=`${SITE}/${lang}/${slug}/`;
  const other = lang==='arb' ? 'eng' : 'arb';
  const ld={'@context':'https://schema.org','@type':'WebPage',
    name:P.title, description:P.desc, url, inLanguage:T.code,
    publisher:{'@type':'Organization',name:T.site,url:SITE}};
  const body=P.body.map(([h,t])=>
    (h?`  <h2>${esc(h)}</h2>\n`:'')+`  <p>${esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</p>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="${T.code}" dir="${T.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#07071A">
<title>${esc(P.title)}</title>
<meta name="description" content="${esc(P.desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${other==='eng'?'en':'ar'}" href="${SITE}/${other}/${slug}/">
<link rel="alternate" hreflang="x-default" href="${SITE}/arb/${slug}/">
<meta property="og:title" content="${esc(P.title)}">
<meta property="og:description" content="${esc(P.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE}/assets/og-${lang}.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link href="https://fonts.googleapis.com/css2?${T.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/article.css">
<style>body{font-family:${T.font};}</style>
</head>
<body>
<nav class="crumb"><a href="../">${T.home}</a> <span>/</span> <span>${esc(P.h1)}</span></nav>
<article class="art">
  <h1>${esc(P.h1)}</h1>
  <div class="body">
${body}
    <span class="src">${T.updated}: ${updated}</span>
  </div>
</article>
<div data-artist-corner></div>
<footer class="foot"><a class="btn" href="../">${T.back}</a></footer>
<script src="../../assets/ads.js"></script>
</body>
</html>
`;
};
module.exports.SLUGS = Object.keys(PAGES);
