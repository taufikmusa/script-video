"""
Tukar .docx format CatchyScript (heading "SKRIP NN: TAJUK (TAB N)", baris dipisah line break,
CTA tetap "... Jangan simpan sorang sorang.") jadi blok JS untuk src/data.js.
Setiap baris = satu perenggan; punchline = "Jangan simpan sorang sorang."

Guna (tak perlu python-docx):
    unzip -o fail.docx -d /tmp/x
    python tools/catchy_ke_data.py <id_mula> /tmp/x/word/document.xml Catchy-03 > blok.txt
Semak topik yang diteka & betulkan dengan tangan.
"""
import re, sys, json, types, xml.etree.ElementTree as ET
sys.modules['docx'] = types.ModuleType('docx')
sys.path.insert(0, 'tools')
from docx_ke_data import teka_topik, teka_tags
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
b = ET.parse(sys.argv[2]).getroot().find(W+'body')
def baris(p):
    s = ''
    for x in p.iter():
        if x.tag == W+'t': s += x.text or ''
        elif x.tag in (W+'br', W+'cr'): s += '\n'
    return [l.strip() for l in s.split('\n') if l.strip()]
AKRONIM = {'Gap':'GAP','Epp':'EPP','Trx':'TRX','Ptptn':'PTPTN','En':'En','Lbma':'LBMA'}
KECIL = {'dan','di','ke','dari','yang','dalam','untuk','bila','tapi','sebagai','ketika','guna','macam','daripada','adalah','are','sebenar'}
def tajukkan(t):
    out = []
    for i, w in enumerate(t.lower().split()):
        m = re.match(r"^([('\"@]*)(.*)$", w); pre, core = m.groups()
        c = core[:1].upper() + core[1:] if (i == 0 or core not in KECIL) else core
        c = AKRONIM.get(re.sub(r'[^\w]', '', c), None) and re.sub(r'^\w+', AKRONIM[re.sub(r'[^\w]','',c)], c) or c
        out.append(pre + c)
    t = ' '.join(out)
    return t.replace("'Savers Are Losers'", "'Savers are Losers'").replace('Di Sebalik','di Sebalik')
skrip = []; cur = None
for el in b:
    if el.tag != W+'p': continue
    st = el.find('.//'+W+'pStyle'); gaya = st.get(W+'val') if st is not None else ''
    ls = baris(el)
    if gaya.startswith('Heading'):
        m = re.match(r'SKRIP (\d+): (.*?)(?: \(TAB \d+\))?$', ' '.join(ls))
        cur = {'no': int(m.group(1)), 'tajuk': tajukkan(m.group(2)), 'baris': []}; skrip.append(cur); continue
    if cur is None or not ls or ls[0].startswith('Anggaran Masa') or ls[0].startswith('―'): continue
    cur['baris'] += ls
mula = int(sys.argv[1]); SIRI = sys.argv[3]
for i, s in enumerate(skrip):
    L = s['baris']
    # pisah "Dapat? Kalau dapat, share! Jangan simpan sorang sorang." supaya punchline pendek
    akhir = L[-1]; m = re.match(r'(.*?[!?.])\s*(Jangan simpan sorang sorang\.?)$', akhir)
    if m: L = L[:-1] + [m.group(1), m.group(2)]
    teks = '\n\n'.join(L).replace('\\','\\\\').replace('`','\\`').replace('${','\\${')
    topik = teka_topik(s['tajuk'], teks)
    print('  {')
    print(f'    id: {mula+i},\n    siri: "{SIRI}",\n    no: {s["no"]},\n    topik: {json.dumps(topik, ensure_ascii=False)},')
    print(f'    tajuk: {json.dumps(s["tajuk"], ensure_ascii=False)},')
    print(f'    tags: {json.dumps(teka_tags(s["tajuk"], teks, topik), ensure_ascii=False)},')
    print(f'    hook: "CatchyScript (Soalan - Jawapan - Sebab)",')
    print(f'    teks: `{teks}`\n  }},')
