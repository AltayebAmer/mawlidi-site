#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
lint-responsive.py — يكشف الانحراف عن المعيار المتجاوب الموحّد.
المصدر: ~/Claude Workspace/shared/ ، يُنسخ إلى tools/ في كل موقع.
الاستخدام:  python3 lint-responsive.py [مسار الموقع]
يخرج بصفر إذا كان نظيفاً، وبواحد إذا وُجد خرق.
المرجع: RESPONSIVE_STANDARD.md
"""
import sys, os, re

ALLOWED = {600, 1024, 1440}
SKIP_DIRS = {'.git','node_modules','_deferred','__pycache__','dist','old','_أرشيف','.claude'}
EXTS = ('.html','.css')

# max-width داخل @media ممنوع (ينتج قواعد متعاركة على البكسل نفسه)
RE_MEDIA = re.compile(r'@media([^{]*)\{')
RE_PX    = re.compile(r'(min|max)-width\s*:\s*(\d+)(?:\.\d+)?px')
# left/right مطلقة تكسر RTL — لكن ليس كل استعمال خرقاً:
#   left:50% مع translate توسيطٌ محايد اتجاهياً،
#   وleft+right معاً في الكتلة نفسها تمديدٌ متناظر (يُفضَّل inset-inline لكنه لا يكسر شيئاً).
# لذلك نفحص الكتلة كاملة لا الإعلان وحده، وإلا امتلأ التقرير بإيجابيات كاذبة.
RE_BLOCK = re.compile(r'([^{}]*)\{([^{}]*)\}')
RE_DECL  = re.compile(r'(?<![-\w])(left|right)\s*:\s*([^;{}]+)')
RE_COMMENT = re.compile(r'/\*.*?\*/', re.S)

def scan(path):
    errs = []
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fn in files:
            if not fn.endswith(EXTS): continue
            fp = os.path.join(root, fn)
            rel = os.path.relpath(fp, path)
            try: src = open(fp, encoding='utf-8', errors='replace').read()
            except Exception as e: errs.append((rel, 0, 'تعذّرت القراءة: %s' % e)); continue
            src = RE_COMMENT.sub(lambda m: '\n'*m.group(0).count('\n'), src)

            for m in RE_MEDIA.finditer(src):
                line = src[:m.start()].count('\n') + 1
                cond = m.group(1)
                for kind, num in RE_PX.findall(cond):
                    n = int(num)
                    if kind == 'max':
                        errs.append((rel, line, 'max-width:%dpx داخل @media — المعيار min-width فقط' % n))
                    elif n not in ALLOWED:
                        errs.append((rel, line, 'نقطة توقف %dpx خارج السلّم %s' % (n, sorted(ALLOWED))))

            for b in RE_BLOCK.finditer(src):
                body = b.group(2)
                decls = {k.strip(): v.strip() for k, v in RE_DECL.findall(body)}
                if not decls: continue
                if 'left' in decls and 'right' in decls: continue   # تمديد متناظر
                for k, v in decls.items():
                    if v in ('auto', '50%'): continue              # محايد اتجاهياً
                    m2 = RE_DECL.search(body)
                    line = src[:b.start(2) + (m2.start() if m2 else 0)].count('\n') + 1
                    errs.append((rel, line, '%s:%s — استعمل inset-inline-* لأجل RTL' % (k, v)))
    return errs

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    path = os.path.abspath(path)
    errs = scan(path)
    if not errs:
        print('✓ نظيف — لا انحراف عن المعيار في %s' % path)
        return 0
    by_file = {}
    for rel, line, msg in errs: by_file.setdefault(rel, []).append((line, msg))
    for rel in sorted(by_file):
        print('\n%s' % rel)
        for line, msg in sorted(by_file[rel]):
            print('  %5d  %s' % (line, msg))
    print('\n✗ %d خرقاً في %d ملفاً' % (len(errs), len(by_file)))
    return 1

if __name__ == '__main__':
    sys.exit(main())
