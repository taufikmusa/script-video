// data.js — Semua skrip video disimpan di sini (array `skrip`).
// Tambah skrip baru: salin satu blok { ... }, tampal sebelum tanda ], ubah isinya.
// - id mesti unik (guna nombor lebih besar dari yang ada)
// - siri: nama set (Script-01, Script-02 ...), no: nombor dalam siri (1, 2, 3 ...)
// - teks: pisahkan setiap babak/perenggan dengan SATU baris kosong
// - baris terakhir = punchline (teleprompter akan besarkan)
// Pastikan setiap blok ada koma (,) selepas kurungan tutup }.

export const skrip = [
  {
    id: 1,
    siri: "Script-01",
    no: 1,
    topik: "Public Gold & GAP",
    tajuk: "Kilang penulenan RM30 juta di Batu Kawan",
    tags: ["kilang", "batu kawan", "999", "penulenan", "emas skrap"],
    teks: `Kenapa syarikat emas sanggup bakar RM30 juta bina kilang baru... padahal kilang cetak dah ada?

Kalau anda ingat semua kilang emas sama, tengok rantai rosak ni.

Kilang biasa cuma boleh tempa emas. Tapi bila anda jual balik emas lama, selama ni beratus kilo emas kita terpaksa dihantar ke Singapura dan Hong Kong semata-mata nak cuci balik. Jutaan ringgit duit negara mengalir keluar setiap bulan!

Jadi apa jadi bila kilang penulenan terbesar ni siap di Batu Kawan?

Bukan sekadar selamatkan jutaan ringgit tu. Kilang gergasi ni mampu proses sampai 20 tan setahun... menjamin setiap gram simpanan anda wujud secara fizikal di tanah air sendiri.

Komen di bawah, anda pernah nampak tak kilang ni masa lalu Batu Kawan?

Sebab bila emas skrap masuk ke kilang ni, ia tak keluar sebagai emas biasa, tapi keluar sebagai emas paling bernilai:

Sembilan-Sembilan-Sembilan!`
  },
  {
    id: 13,
    siri: "Script-02",
    no: 1,
    topik: "Kewangan Peribadi",
    tajuk: "3 Golongan Yang Mendapat Manfaat Besar Dari Simpanan Emas",
    tags: ["inflasi", "gaji", "asb", "tabung haji", "haji", "krisis"],
    hook: "Kenyataan Songsang / Kontrarian",
    teks: `Sebenarnya, tak semua orang perlu simpan emas!

Malah ada situasi di mana simpan duit dalam ASB atau Tabung Haji jauh lebih baik. Tapi kalau anda tergolong dalam tiga kumpulan ni... emas adalah penyelamat mutlak anda!

Pertama: Golongan yang tangan 'gatal' berbelanja. Ada duit dalam bank mesti bocor. Emas matikan nafsu boros sebab fitrah kita sayang nak jual!

Kedua: Golongan yang rasa selamat simpan tunai, tapi tak sedar nilai kuasa beli dihakis inflasi setiap tahun. Nombor dividen bertambah, tapi nilai duit makin mengecut!

Dan ketiga, yang paling bahaya: Orang kaya yang tiada emas fizikal. Ibarat kapal mewah Titanic belayar megah tanpa bot penyelamat. Bila akaun bank tiba-tiba dibekukan atau krisis berlaku, seluruh harta anda lumpuh!

Sebab itu formulanya mudah: simpan tunai untuk tiga bulan gaji saja, selebihnya tukarkan kepada emas fizikal serendah RM100 sebulan.

Sebelum gaji lesap bulan ni, drop di komen: antara tiga tadi, anda tergolong dalam kumpulan mana?

Sebab bagi mereka yang bersedia, emas bukan sekadar logam, tapi ia adalah bot...

Penyelamat!`
  }
];

// Nama tambahan untuk siri (pilihan)
export const namaSiri = {};

// Harga lalai untuk slot {harga999} & {harga916}
export const hargaLalai = { harga999: "542", harga916: "497", tarikh: "" };
