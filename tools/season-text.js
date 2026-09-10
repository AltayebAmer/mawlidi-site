/* نصوص صفحات المناسبات. دوال لا نصوص جامدة، لأنها تحتاج التواريخ
   المحسوبة: طول الشهر، وموعد العيد، وليلة القدر. */
module.exports = {

ramadan: {
  arb: (gy, hy, x, M) => [
    ['', `رمضان هو الشهر التاسع في التقويم الهجري، وشهر الصيام. وفي عام ${gy} يوافق الشهر التاسع من سنة ${hy} هجرية، ويستمر ${x.len} يوماً حتى ${x.end}، ثم يليه عيد الفطر في ${x.fitr}.`],
    [`كيف حُسب تاريخ رمضان ${gy}؟`,
     `الحساب هنا بالتقويم الهجري الجدولي، وهو نظام رياضي تتناوب فيه الأشهر بين تسعة وعشرين وثلاثين يوماً وفق دورة القمر. هذا النظام تعتمده الأنظمة الرسمية والبرمجية لأنه قابل للحساب مسبقاً إلى آلاف السنين. أما في كثير من البلدان الإسلامية فتُعلَن بداية الشهر برؤية الهلال بالعين أو بالمرصد، وقد تتقدّم الرؤية أو تتأخّر يوماً واحداً عن الحساب.`],
    ['لماذا يتقدّم رمضان كل سنة؟',
     `السنة الهجرية قمرية، اثنا عشر شهراً مجموعها نحو 354 يوماً، أي أقصر من السنة الميلادية بأحد عشر يوماً تقريباً. ولهذا يتقدّم رمضان في التقويم الميلادي أحد عشر يوماً كل عام: فمن صامه في مارس هذا العام يصومه في فبراير العام القادم. وبعد نحو ثلاث وثلاثين سنة يكون قد دار في الفصول الأربعة كلها وعاد إلى موضعه الأول.`],
    ['ليلة القدر',
     `ليلة القدر في العشر الأواخر من رمضان، وأرجى ما تكون في الليالي الوتر. وليلة السابع والعشرين — وهي أشهر ما يُتحرّى — توافق ${x.qadr} بحساب هذه الصفحة. والتحرّي في العشر كلها أولى من تحديد ليلة بعينها.`],
    ['كم بقي على رمضان؟',
     `العدّاد في أعلى الصفحة يحسب المدة المتبقية ويتحدّث كل ثانية. وإن أردت متابعة بقية المناسبات — العيدين ويوم عرفة ورأس السنة الهجرية — ففي صفحة العد التنازلي عدّادات لها جميعاً.`],
    ['الاستعداد للشهر',
     `يستعدّ كثيرون بضبط مواعيد النوم تدريجياً قبل الشهر، وترتيب جدول العمل والدراسة، وقضاء ما فات من صيام. ومعرفة الموعد مبكراً تعين على ذلك، وهي الغاية من هذه الصفحة.`]
  ],
  eng: (gy, hy, x, M) => [
    ['', `Ramadan is the ninth month of the Hijri calendar and the month of fasting. In ${gy} it falls in the ninth month of the year ${hy} AH, running for ${x.len} days until ${x.end}, followed by Eid al-Fitr on ${x.fitr}.`],
    [`How was the date of Ramadan ${gy} calculated?`,
     `This page uses the tabular Hijri calendar, an arithmetic system in which months alternate between twenty-nine and thirty days following the lunar cycle. Official and computational systems adopt it because it can be computed thousands of years in advance. In many Muslim countries, however, the month begins when the crescent is sighted by eye or telescope, and that sighting may fall a day earlier or later than the calculation.`],
    ['Why does Ramadan move earlier each year?',
     `The Hijri year is lunar: twelve months totalling about 354 days, roughly eleven days shorter than the Gregorian year. Ramadan therefore shifts eleven days earlier in the Gregorian calendar annually — fasted in March one year, in February the next. After about thirty-three years it has travelled through all four seasons and returned to where it began.`],
    ['Laylat al-Qadr',
     `Laylat al-Qadr falls in the last ten nights of Ramadan, most likely on an odd-numbered night. The twenty-seventh night — the one most commonly sought — corresponds to ${x.qadr} by this page's calculation. Seeking it across all ten nights is better than fixing on one.`],
    ['How long until Ramadan?',
     `The counter at the top of this page measures the time remaining and updates every second. To follow the other occasions — both Eids, the Day of Arafah and the Islamic New Year — the countdown page carries a counter for each.`],
    ['Preparing for the month',
     `Many prepare by shifting sleep times gradually beforehand, arranging work and study schedules, and making up missed fasts. Knowing the date early makes that possible, which is the purpose of this page.`]
  ]
},

'eid-alfitr': {
  arb: (gy, hy, x, M) => [
    ['', `عيد الفطر أول أيام شهر شوال، الشهر العاشر في التقويم الهجري، ويأتي بعد إتمام صيام رمضان. وفي عام ${gy} يوافق أول شوال من سنة ${hy} هجرية.`],
    ['متى بدأ رمضان قبله؟',
     `بدأ رمضان لهذا العام في ${x.ramadanStart} واستمرّ ${x.len} يوماً. فمن صام الشهر كاملاً بحسب هذا التقويم أفطر في اليوم التالي لآخر أيامه.`],
    ['كم يوماً يستمر العيد؟',
     `عيد الفطر ثلاثة أيام في عرف أكثر البلدان الإسلامية، أولها يوم العيد نفسه. وتختلف العطلات الرسمية من بلد إلى آخر، فبعضها يمدّها إلى أربعة أيام أو أكثر.`],
    ['زكاة الفطر',
     `تُخرَج زكاة الفطر قبل صلاة العيد، ويجوز تقديمها بيوم أو يومين. ومقدارها صاع من غالب قوت البلد، وقدّرها كثير من أهل العلم بنحو ثلاثة كيلوغرامات. والأنسب سؤال الجهة المختصة في بلدك عن القيمة النقدية المعتمدة لهذا العام.`],
    ['هل الموعد مؤكد؟',
     `الحساب دقيق فلكياً، لكن إعلان العيد يرتبط برؤية هلال شوال. وقد يُعلَن العيد في بلد ويتأخّر يوماً في آخر، وهذا معروف ومتكرر. اعتمد إعلان الجهة المختصة في بلدك، واتخذ ما هنا تقديراً للاستعداد والحجز والسفر.`]
  ],
  eng: (gy, hy, x, M) => [
    ['', `Eid al-Fitr is the first day of Shawwal, the tenth month of the Hijri calendar, marking the completion of the Ramadan fast. In ${gy} it falls on the first of Shawwal in the year ${hy} AH.`],
    ['When did the Ramadan before it begin?',
     `Ramadan began this year on ${x.ramadanStart} and ran for ${x.len} days. Anyone fasting the full month by this calendar breaks the fast on the day after its last.`],
    ['How many days does Eid last?',
     `Eid al-Fitr is observed over three days in most Muslim countries, beginning with the day of Eid itself. Official holidays vary by country, with some extending to four days or more.`],
    ['Zakat al-Fitr',
     `Zakat al-Fitr is given before the Eid prayer, and may be paid a day or two earlier. Its measure is a saʿ of the staple food of the region, estimated by many scholars at around three kilograms. For the cash value adopted this year, ask the relevant authority in your country.`],
    ['Is the date certain?',
     `The calculation is astronomically precise, but the announcement of Eid depends on sighting the crescent of Shawwal. Eid may be declared in one country and a day later in another; this is well known and recurrent. Follow the announcement of the authority in your country, and treat this page as an estimate for planning, booking and travel.`]
  ]
},

'eid-aladha': {
  arb: (gy, hy, x, M) => [
    ['', `عيد الأضحى في العاشر من ذي الحجة، الشهر الثاني عشر والأخير في التقويم الهجري. وفي عام ${gy} يوافق سنة ${hy} هجرية.`],
    ['يوم عرفة',
     `يوم عرفة هو التاسع من ذي الحجة، أي اليوم السابق للعيد، ويوافق ${x.arafah}. وفيه يقف الحجّاج بعرفة، ويُستحبّ صيامه لغير الحاج.`],
    ['أيام التشريق',
     `أيام التشريق هي الحادي عشر والثاني عشر والثالث عشر من ذي الحجة، وتلي يوم العيد. وهي أيام أكل وشرب وذكر لله، ولا يصحّ صيامها إلا لمن لم يجد الهدي في الحج.`],
    ['متى تُذبح الأضحية؟',
     `يبدأ وقت الذبح بعد صلاة العيد ويمتد إلى غروب آخر أيام التشريق، أي أربعة أيام. والذبح قبل الصلاة لا يُجزئ عن الأضحية.`],
    ['هل الموعد مؤكد؟',
     `يرتبط تحديد ذي الحجة برؤية هلاله، ويُعلَن موعد الوقوف بعرفة من السعودية لارتباطه بالحج. الحساب هنا تقدير فلكي دقيق للاستعداد، والإعلان الرسمي هو المرجع.`]
  ],
  eng: (gy, hy, x, M) => [
    ['', `Eid al-Adha falls on the tenth of Dhu al-Hijja, the twelfth and final month of the Hijri calendar. In ${gy} it falls in the year ${hy} AH.`],
    ['The Day of Arafah',
     `The Day of Arafah is the ninth of Dhu al-Hijja, the day before Eid, corresponding to ${x.arafah}. On it the pilgrims stand at Arafah, and fasting is recommended for those not performing Hajj.`],
    ['The days of Tashriq',
     `The days of Tashriq are the eleventh, twelfth and thirteenth of Dhu al-Hijja, following the day of Eid. They are days of eating, drinking and remembrance of God, and fasting them is not permitted except for a pilgrim who cannot find an offering.`],
    ['When is the sacrifice offered?',
     `The time for sacrifice begins after the Eid prayer and extends to sunset on the last day of Tashriq — four days in all. A sacrifice offered before the prayer does not count as the udhiya.`],
    ['Is the date certain?',
     `Determining Dhu al-Hijja depends on sighting its crescent, and the date of standing at Arafah is announced from Saudi Arabia because it governs the Hajj. The calculation here is a precise astronomical estimate for planning; the official announcement is the reference.`]
  ]
}
};
