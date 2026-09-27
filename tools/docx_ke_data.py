"""
Tukar fail .docx skrip (setiap skrip bermula dengan heading "Title", cth "Tab 1")
jadi blok JS yang boleh ditampal terus dalam src/data.js.

Guna:
    pip install python-docx
    python tools/docx_ke_data.py Script_Video-02.docx --mula 13

--mula  = id pertama (ambil id terbesar dalam data.js + 1)
Selepas tampal, isi sendiri `topik`, `tajuk` dan `tags` untuk setiap blok.
"""
import argparse, json, os
import docx

ap = argparse.ArgumentParser()
ap.add_argument("fail")
ap.add_argument("--mula", type=int, default=1)
a = ap.parse_args()

d = docx.Document(a.fail)
skrip, semasa = [], None
for p in d.paragraphs:
    t = p.text.strip()
    if p.style.name == "Title":
        semasa = {"tab": t, "p": []}
        skrip.append(semasa)
    elif t and semasa is not None:
        semasa["p"].append(t)

nama = os.path.splitext(os.path.basename(a.fail))[0]
blok = []
for i, s in enumerate(skrip, a.mula):
    teks = "\n\n".join(s["p"]).replace("`", "\\`")
    blok.append(f"""  {{
    id: {i},
    topik: "ISI_TOPIK",
    tajuk: {json.dumps(s["p"][0][:60] if s["p"] else s["tab"], ensure_ascii=False)},
    tags: [],
    sumber: "{nama} / {s["tab"]}",
    teks: `{teks}`
  }}""")
print(",\n".join(blok) + ",")
