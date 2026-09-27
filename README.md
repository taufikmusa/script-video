# 🎬 Vault Skrip Video

Simpanan skrip video Taufik — cari topik, salin skrip, dan **teleprompter** untuk baca masa rakam.

Stack: Vite + React → GitHub → **GitHub Pages** (auto-deploy guna GitHub Actions).

## Ciri
- **Cari** merentas tajuk, isi skrip, tags & topik (boleh taip beberapa kata, cth `pg jewel zakat`). Klik `#tag` untuk cari terus.
- **Tapis siri** (Script-01 … Script-06, setiap siri bernombor 01, 02, …) dan **topik** (dijana automatik dari `data.js`). Cari nombor terus: `script-03 07`.
- **📋 Salin** skrip penuh satu klik.
- **✓ Dah rakam** — tanda skrip yang dah rakam (simpan dalam pelayar, `localStorage`).
- **Skrip cadangan hari ni** — satu skrip dipilih ikut tarikh (utamakan yang belum rakam).
- **🎬 Teleprompter**
  - Kiraan 3-2-1, teks bergerak sendiri, garis panduan mata
  - Laju (1–20) & saiz huruf boleh ubah — tetapan diingat
  - Tap teks = main/pause. Boleh tarik/scroll manual bila-bila
  - Mod cermin (⇋) untuk rig teleprompter kaca, teks tengah (≡)
  - Punchline akhir dibesarkan & warna emas
  - Skrin tak padam masa rakam (Wake Lock)
  - Papan kekunci / remote Bluetooth: `Space` main/pause, `↑/↓` laju, `PageUp/PageDown` / `←/→` lompat, `+/-` saiz, `M` cermin, `R` ulang, `Esc` tutup
  - Link terus: `.../#skrip-5` buka teleprompter skrip id 5

## Tambah skrip baru
Semua skrip dalam `src/data.js`. Salin satu blok `{ ... }`, tampal sebelum `]`, tukar `id` (unik), `topik`, `tajuk`, `tags`, `teks`.
Pisahkan setiap babak dengan satu baris kosong. Baris terakhir = punchline.

Ada banyak skrip dalam .docx (format "Tab 1", "Tab 2"...)? Jana blok terus:
```bash
pip install python-docx
python tools/docx_ke_data.py Batch_6.docx --siri Script-07 --mula 163
```

## Skill Claude
Panduan penuh untuk Claude (tambah batch, konvensyen siri, teleprompter): `.claude/skills/vault-skrip-video/SKILL.md`.

## Jalan di komputer
```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)
1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push ke `main` → workflow `.github/workflows/deploy.yml` build & deploy sendiri.
3. URL: `https://<username>.github.io/script-video/`
