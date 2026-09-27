---
name: vault-skrip-video
description: Bina, isi dan selenggara "Vault Skrip Video" Taufik — website React (Vite) di GitHub Pages yang simpan skrip video pendek (reels/TikTok 60 saat) dengan cari, tapis siri & topik, salin satu klik, tanda dah rakam, dan TELEPROMPTER auto-scroll untuk baca masa rakam. Repo taufikmusa/script-video, live di https://taufikmusa.github.io/script-video/. Guna skill ini SETIAP KALI Taufik upload .docx skrip video baru (cth "30 Skrip Video Pendek ... Batch 6", "Script_Video-02.docx") dan minta masukkan ke vault, atau sebut "vault skrip", "script vault", "teleprompter", "tambah skrip video", "Script-07", "siri baru", "skrip batch baru", "tanda dah rakam", "tukar topik skrip", atau minta ubah apa-apa ciri pada website skrip video. Guna juga bila Taufik nak bina vault skrip/teleprompter yang sama untuk projek lain. BERBEZA daripada vault-copywriting-builder (copywriting social media, Netlify, butang prompt gambar) — jangan campur.
---

# Vault Skrip Video

Perpustakaan peribadi skrip video pendek Taufik + teleprompter untuk rakam.

- **Repo:** `taufikmusa/script-video` (branch kerja & default: yang sedia ada dalam repo — semak `git branch -a`)
- **Live:** https://taufikmusa.github.io/script-video/
- **Stack:** Vite + React (JS) → GitHub → GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`, Pages Source = "GitHub Actions")
- **Kandungan (Sept 2026):** 162 skrip — Script-01 (12) + Script-02 hingga Script-06 (5 × 30). id global 1–162.

Folder `reference/` ada kod penuh yang berfungsi (salinan dari repo). Kalau repo dah ada, KERJA TERUS DALAM REPO — reference hanya untuk bina semula / projek baru.

## 1. Struktur repo

```
index.html               meta viewport, theme-color, favicon emoji 🎬
vite.config.js           base: './'  (WAJIB untuk GitHub Pages subpath)
.github/workflows/deploy.yml   build → upload-pages-artifact → deploy-pages
src/
  main.jsx
  App.jsx                senarai kad, cari, chip siri + topik, checkbox status, cadangan hari ni
  Teleprompter.jsx       overlay skrin penuh, enjin scroll rAF
  util.js                localStorage try/catch, clipboard + fallback, kiraPatah, anggarMasa(165 ppm), tarikhMelayu
  index.css              token warna gelap-emas (--emas #C9A227, --bg #13110e)
  data.js                SEMUA skrip (array `skrip`)
tools/docx_ke_data.py    .docx → blok JS untuk data.js (auto-teka topik & tags)
```

## 2. Format satu skrip dalam `src/data.js`

```js
{
  id: 163,                 // UNIK global — ambil id terbesar + 1
  siri: "Script-07",       // nama set; satu fail docx = satu siri
  no: 1,                   // nombor dalam siri, mula 1 (dipapar "Script-07 · 01")
  topik: "Strategi Emas",  // salah satu 9 topik di bawah
  tajuk: "Tajuk ringkas",
  tags: ["gap", "inflasi"],// huruf kecil, untuk search
  hook: "Kenyataan Songsang / Kontrarian",   // PILIHAN — gaya hook dari jadual docx
  teks: `Babak 1...

Babak 2...

Punchline!`              // babak dipisah SATU baris kosong; perenggan terakhir = punchline
}
```

**Konvensyen yang Taufik dah tetapkan:**
- Setiap fail docx = satu siri `Script-NN` (dua digit). Script-01 = 12 skrip asal (Script_Video-01.docx, Tab 1–12). Batch 1 (fail tanpa nombor batch, topik 1–30) = Script-02, Batch 2 = Script-03 … Batch 5 = Script-06. Batch seterusnya = Script-07 dan ke atas.
- `no` bermula 01 dalam SETIAP siri (bukan ikut nombor topik 31, 61 dalam docx).
- Punchline `★ Scam! ★` → buang bintang. Teleprompter besarkan & warnakan emas perenggan terakhir secara automatik.
- Em dash (—) dalam skrip DIBIARKAN (jadi isyarat jeda masa baca). Tukar ke koma hanya jika Taufik minta.
- Skrip bertindih antara Script-01 dan Script-02 dikekalkan (ayat sedikit berbeza) melainkan Taufik minta buang.

**9 topik (kekalkan nama tepat):** Kewangan Peribadi, Strategi Emas, Kenapa Emas, Bisnes & Dealer, Zakat & Syariah, Public Gold & GAP, Keluarga, Penipuan & Keselamatan, Barang Kemas. Senarai chip dijana automatik dari data — topik baru muncul sendiri, tapi elak cipta topik baru tanpa sebab.

## 3. Tambah batch docx baru (aliran kerja utama)

1. Kenal pasti format docx:
   - **Format batch** (paling biasa): heading `SKRIP NN: TAJUK HURUF BESAR`, jadual 1×3 selepasnya (Anggaran Masa | Gaya Hook | Kata Terakhir), senarai `Skrip NN: Tajuk [Punchline: X]` di awal (tajuk huruf biasa diambil dari sini), punchline `★ X! ★`.
   - **Format tab**: gaya "Title" (`Tab 1`, `Tab 2`) diikuti perenggan.
   Converter auto-kesan (ada jadual → batch, tiada → tab).
2. Jana blok:
   ```bash
   pip install python-docx
   python tools/docx_ke_data.py "fail.docx" --siri Script-07 --mula 163 > /tmp/blok.txt
   ```
   Output berakhir dengan koma — tampal sebelum `];` penutup dalam `src/data.js` (buang koma terakhir sebelum `]` atau biar; JS terima trailing comma).
3. **Semak topik yang diteka** — converter guna kata kunci (tajuk dulu, kemudian isi) dan kadang tersasar (cth skrip "Bank Pusat Borong Emas" jatuh ke Public Gold & GAP sedangkan patut Kenapa Emas). Senaraikan `siri no topik tajuk` dan betulkan yang salah dengan tangan. Kali lepas ~14/150 perlu dibetulkan.
4. Sahkan:
   ```bash
   node -e "import('./src/data.js').then(({skrip})=>{const ids=skrip.map(s=>s.id);console.log(skrip.length, new Set(ids).size===ids.length?'id unik':'ID BERGANDA')})"
   npm run build
   ```
   Jumlah skrip setiap siri = jumlah dalam docx (biasanya 30).
5. Commit + push ke branch repo → Actions auto-deploy (~40s). Semak run berjaya (GitHub MCP `actions_list list_workflow_runs`). github.io disekat oleh proxy sandbox — jangan cuba curl; percaya status Actions.

## 4. Ciri UI (jangan pecahkan bila ubah)

- **Cari:** semua kata mesti ada (AND) merentas `siri · no`, tajuk, teks, tags, topik, hook. `script-03 07` cari terus nombor. Klik `#tag` = cari tag tu.
- **Chip siri** (border putus-putus) + **chip topik**; kiraan topik ikut siri dipilih. Di phone (≤480px) chip jadi satu baris swipe.
- **Checkbox "Belum rakam sahaja" / "Dah rakam sahaja"** — saling eksklusif (state `status`: semua|belum|dah). Kiraan kanan `x / N dah rakam (Script-NN)` ikut siri+topik semasa.
- **Kad:** label `Script-NN · 01`, durasi `~59s · 163 patah` (165 patah/minit), badge topik, 🎣 gaya hook, hook italic (perenggan pertama), tags, "Baca skrip penuh", butang 🎬 Teleprompter, 📋 Salin, ✓ Dah rakam.
- **Cadangan hari ni:** 1 skrip deterministik ikut tarikh, utamakan belum rakam.
- **Dah rakam** disimpan `localStorage` key `dahRakam` (per pelayar/peranti).
- **Pagination:** 30 kad + "Tunjuk lagi".
- **Link terus:** `#skrip-<id>` buka teleprompter.

### Teleprompter
- Kiraan 3-2-1 → scroll rAF. Laju px/s = `laju × 0.15 × saiz` (laju 1–20, lalai 5; saiz lalai 34 phone / 52 desktop) supaya pace baca kekal bila saiz berubah.
- Guna posisi pecahan (`posRef`) dan ikut semula `scrollTop` jika user tarik manual (>3px beza).
- Garis panduan mata pada 35% tinggi; padding atas 35vh, bawah 75vh.
- Tap teks = main/pause. Kawalan malap masa main. Mod cermin (scaleX -1), teks tengah. Tetapan disimpan key `prompter`.
- Wake Lock (skrin tak padam), diminta semula bila tab kembali visible.
- Kekunci / remote Bluetooth: Space/Enter main, ↑↓ laju, PageUp/PageDown & ←→ lompat 30% skrin, +/- saiz, M cermin, R ulang, Esc tutup.

## 5. Prinsip teknikal wajib

- JANGAN guna `toLocaleDateString('ms-MY')` — skrin putih di Safari. Guna `tarikhMelayu()` manual.
- SEMUA akses `localStorage` dalam try/catch (`muat`/`simpan` di util.js).
- Clipboard: `navigator.clipboard` bila secure context, fallback textarea + execCommand.
- `vite.config.js` mesti `base: './'`.
- Dalam `teks` template literal, escape `` ` `` dan `${` (converter dah buat).
- Uji di viewport 390×844 dengan Playwright (`executablePath` Chromium di `/opt/pw-browsers/chromium-*/chrome-linux*/chrome`, jangan `playwright install`); pastikan `scrollWidth` = 390 (tiada scroll mendatar) dan tiada `pageerror`.
- Jangan `pkill -f "vite preview"` — ia boleh bunuh shell sendiri. Guna port baru.

## 6. Bina vault baru dari awal (projek lain)

1. Salin `reference/` ke repo baru: `gitignore.txt` → `.gitignore`, `src/data.sample.js` → `src/data.js`.
2. Dalam `reference/.github/workflows/deploy.yml`, tukar senarai `branches` kepada branch repo baru (biasanya `main`).
3. `npm install && npm run build`.
4. Push → repo Settings → Pages → Source: **GitHub Actions** → re-run workflow jika run pertama gagal (ia gagal kalau Pages belum dihidupkan).
5. URL: `https://<user>.github.io/<repo>/`.

## 7. Masalah biasa

| Masalah | Punca / penyelesaian |
|---|---|
| Deploy pertama gagal | Pages belum set ke "GitHub Actions". Set, kemudian re-run workflow. |
| Run lama "cancelled" | `concurrency: pages` batalkan run lama bila push baru — normal, semak run terkini. |
| Deploy ditolak environment | Environment `github-pages` hanya benarkan branch default. Push ke branch default atau tambah branch dalam Settings → Environments. |
| Skrin putih | Error JS: koma hilang dalam data.js, backtick tak di-escape, atau locale API. Jalankan `npm run build` + node import data.js. |
| Tanda dah rakam hilang | localStorage per peranti — tukar phone/clear cache = hilang. Beritahu Taufik; sync antara peranti perlukan backend. |
