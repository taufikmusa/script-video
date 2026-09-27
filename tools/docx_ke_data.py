"""
Tukar fail .docx skrip jadi blok JS yang boleh ditampal terus dalam src/data.js.

Sokong 3 format:
  A) Setiap skrip bermula dengan heading gaya "Title" (cth "Tab 1", "Tab 2")
  B) Format batch "SKRIP 01: TAJUK" + senarai "Skrip 01: Tajuk [Punchline: X]"
     + jadual (Anggaran Masa | Gaya Hook | Punchline)
  C) Format angle: heading "Skrip 01: Angle Tajuk (...)" + jadual 1x1 meta (⏱ ...)
     + jadual 1x1 berisi isi skrip (satu baris = satu babak, punchline "... Kata!")

Guna:
    pip install python-docx
    python tools/docx_ke_data.py Batch_6.docx --siri Script-07 --mula 163 >> blok.txt

--siri  = nama siri (dipapar dalam app + boleh tapis)
--mula  = id global pertama (ambil id terbesar dalam data.js + 1)
Topik & tags diteka automatik ikut kata kunci. Semak & betulkan kalau perlu.
"""
import argparse, json, re
import docx

# ---------- Teka topik (ikut tajuk dulu, kemudian isi) ----------
TOPIK = [
    ("Penipuan & Keselamatan", ["palsu", "curi", "penipuan", "sindiket", "scam", "ponzi", "skim", "tidak dikenali",
                                "sijil makmal", "lokap", "genneva", "silver luar negara", "cop 916", "tulen"]),
    ("Barang Kemas", ["barang kemas", "pg jewel", "rantai", "perhiasan"]),
    ("Zakat & Syariah", ["zakat", "faraid", "pusaka", "warisan", "syariah", "haji", "maskahwin", "muamalat",
                         "amal jariah", "masjid", "ar-rahnu", "pajak", "dinar"]),
    ("Bisnes & Dealer", ["dealer", "bisnes", "pgbo", "g100", "refer", "seminar", "prospek", "guru emas",
                         "pengasas", "founder", "mentor", "peniaga", "durian"]),
    ("Keluarga", ["anak", "isteri", "suami", "kahwin", "perkahwinan", "wanita", "ibu tunggal", "bujang",
                  "adik-beradik", "keluarga", "duit raya", "junior"]),
    ("Kewangan Peribadi", ["hutang", "gaji", "bonus", "menabung", "bocor", "kwsp", "kad kredit", "bnpl",
                           "kecemasan", "belanja", "ego", "alasan", "tabiat", "habits", "mindset", "kopi",
                           "buku kewangan", "keyakinan", "mengeluh", "kemewahan", "asb", "penjawat awam",
                           "profesional", "pinjam", "rm100,000", "kesempitan", "kaya"]),
    ("Public Gold & GAP", ["gap", "public gold", "kilang", "trx", "git", "beli balik", "epp", "auto-debit"]),
    ("Strategi Emas", ["strategi", "dca", "harga emas", "graf", "jual", "fomo", "saiz", "kesilapan", "day trading",
                       "matlamat", "100 gram", "1 gram", "monitor", "hartanah", "saham", "rumah", "formula", "asas"]),
    ("Kenapa Emas", ["inflasi", "1971", "krisis", "mata wang", "ringgit", "sejarah", "perang", "bank pusat",
                     "gawat", "darurat", "siber", "internet", "nilai", "insurans", "cukai", "tunai", "duit kertas"]),
]

# Kata kunci untuk tags (cari dalam tajuk + isi)
TAGS = ["gap", "pg jewel", "barang kemas", "susut nilai", "inflasi", "zakat", "ar-rahnu", "pajak", "hutang",
        "kad kredit", "bnpl", "gaji", "bonus", "kwsp", "asb", "tabung haji", "haji", "hartanah", "rumah",
        "saham", "dinar", "1971", "krisis", "perang", "ringgit", "penipuan", "palsu", "scam", "skim", "916",
        "999", "dealer", "bisnes", "g100", "anak", "wanita", "isteri", "kahwin", "pusaka", "faraid",
        "kecemasan", "auto-debit", "epp", "dca", "fomo", "psikologi", "disiplin", "sejarah", "kilang",
        "beli balik", "cukai", "syariah", "sedekah", "masjid", "ibu tunggal", "bujang", "pelajar", "ptptn",
        "durian", "robert kiyosaki", "azizi ali", "seminar", "inflasi makanan", "emas digital",
        "resit", "patah", "jenama lain", "hujung minggu", "cawangan", "spread", "tunai", "menara kl"]


def teka_topik(tajuk, teks):
    t, x = tajuk.lower(), teks.lower()
    for sumber in (t, x):
        skor = [(sum(sumber.count(k) for k in kk), nama) for nama, kk in TOPIK]
        terbaik = max(skor, key=lambda s: s[0])
        if terbaik[0] > 0:
            return terbaik[1]
    return "Kenapa Emas"


def teka_tags(tajuk, teks, topik):
    hay = (tajuk + " " + teks).lower()
    tags = [k for k in TAGS if re.search(r"(?<![\w-])" + re.escape(k) + r"(?![\w-])", hay)]
    return tags[:8]


def teks_para(el):
    return "".join(x.text or "" for x in el.iter() if x.tag.endswith("}t")).strip()


def baca_batch(d):
    """Format B: SKRIP NN heading + jadual meta."""
    tajuk_senarai = {}
    for p in d.paragraphs:
        m = re.match(r"Skrip (\d+): (.*?)\s*\[Punchline: (.*?)\]\s*$", p.text.strip())
        if m:
            tajuk_senarai[int(m.group(1))] = m.group(2)
    jadual = iter(d.tables)
    skrip, semasa = [], None
    for el in d.element.body.iterchildren():
        tag = el.tag.split("}")[1]
        if tag == "p":
            txt = teks_para(el)
            m = re.match(r"SKRIP (\d+):\s*(.*)", txt)
            if m:
                n = int(m.group(1))
                semasa = {"tajuk": tajuk_senarai.get(n, m.group(2).title()), "p": [], "hook": ""}
                skrip.append(semasa)
            elif semasa is not None and txt:
                semasa["p"].append(txt.replace("★", "").strip())
        elif tag == "tbl" and semasa is not None:
            sel = [c.text for c in next(jadual).rows[0].cells]
            if len(sel) > 1 and "\n" in sel[1]:
                semasa["hook"] = sel[1].split("\n", 1)[1].strip()
    return skrip


def pisah_punchline(p):
    """'Nilai emas pada sehelai... Kertas!' -> ['Nilai emas pada sehelai...', 'Kertas!']"""
    if not p:
        return p
    m = re.match(r"^(.*\.\.\.)\s*([^.]{1,40}!)$", p[-1])
    return p[:-1] + [m.group(1), m.group(2)] if m else p


def baca_angle(d):
    """Format C: heading 'Skrip NN: Angle ...' + jadual meta + jadual isi."""
    jadual = iter(d.tables)
    skrip, semasa = [], None
    for el in d.element.body.iterchildren():
        tag = el.tag.split("}")[1]
        if tag == "p":
            m = re.match(r"Skrip (\d+):\s*(?:Angle\s+)?(.*)", teks_para(el))
            if m:
                semasa = {"tajuk": m.group(2).strip(), "p": [], "hook": ""}
                skrip.append(semasa)
        elif tag == "tbl":
            t = next(jadual)
            if semasa is None or len(t.rows) != 1 or len(t.columns) != 1:
                continue
            isi = t.rows[0].cells[0].text.strip()
            if isi.startswith("⏱") or semasa["p"]:
                continue
            semasa["p"] = pisah_punchline([x.strip() for x in isi.split("\n") if x.strip()])
    return skrip


def kesan_format(d):
    if any(re.match(r"Skrip \d+:\s*Angle", p.text.strip()) for p in d.paragraphs):
        return baca_angle(d)
    return baca_batch(d) if d.tables else baca_tab(d)


def baca_tab(d):
    """Format A: heading 'Title' setiap skrip."""
    skrip, semasa = [], None
    for p in d.paragraphs:
        t = p.text.strip()
        if p.style.name == "Title":
            semasa = {"tajuk": "", "p": [], "hook": ""}
            skrip.append(semasa)
        elif t and semasa is not None:
            semasa["p"].append(t)
    for s in skrip:
        s["tajuk"] = s["p"][0][:70] if s["p"] else "Tanpa tajuk"
    return skrip


def blok_js(skrip, siri, mula, topik_tetap=None, no_mula=1):
    out = []
    for i, s in enumerate(skrip):
        teks = "\n\n".join(s["p"])
        topik = topik_tetap or teka_topik(s["tajuk"], teks)
        medan = [
            f"    id: {mula + i},",
            f"    siri: {json.dumps(siri)},",
            f"    no: {no_mula + i},",
            f"    topik: {json.dumps(topik, ensure_ascii=False)},",
            f"    tajuk: {json.dumps(s['tajuk'], ensure_ascii=False)},",
            f"    tags: {json.dumps(teka_tags(s['tajuk'], teks, topik), ensure_ascii=False)},",
        ]
        if s.get("hook"):
            medan.append(f"    hook: {json.dumps(s['hook'], ensure_ascii=False)},")
        medan.append("    teks: `" + teks.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${") + "`")
        out.append("  {\n" + "\n".join(medan) + "\n  }")
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("fail")
    ap.add_argument("--siri", required=True)
    ap.add_argument("--mula", type=int, default=1)
    ap.add_argument("--no-mula", type=int, default=1, help="nombor pertama dalam siri (bila satu siri gabung beberapa fail)")
    ap.add_argument("--topik", help="paksa semua skrip guna topik ini")
    a = ap.parse_args()
    d = docx.Document(a.fail)
    skrip = kesan_format(d)
    print(",\n".join(blok_js(skrip, a.siri, a.mula, a.topik, a.no_mula)) + ",")
