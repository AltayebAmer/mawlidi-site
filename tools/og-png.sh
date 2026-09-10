#!/bin/bash
# تحويل og-*.svg إلى PNG بأدوات macOS المدمجة (بلا تثبيت شيء)
# qlmanage يرسم المربّع 1:1، و sips يقصّ الشريط الأوسط 1200×630
set -e
cd "$(dirname "$0")/.."
for L in arb eng; do
  T=$(mktemp -d)
  qlmanage -t -s 1200 -o "$T" "assets/og-$L.svg" >/dev/null 2>&1
  sips -c 630 1200 "$T/og-$L.svg.png" --out "assets/og-$L.png" >/dev/null
  rm -rf "$T"
  echo "✅ assets/og-$L.png  $(sips -g pixelWidth -g pixelHeight "assets/og-$L.png" | grep pixel | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')"
done
