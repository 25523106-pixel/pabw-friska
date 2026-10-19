# Worksheet P11 - Modul, State, dan Penyimpanan Klien

Nama: Friska Rahmadani
NIM: 25523106

## Isi folder
- `profil.html` - dari P10; ditambah kolom "Favorit" di tabel dan tombol `#atur-ulang`. Hanya memuat `js/app.js` (`type="module"`).
- `js/data.js` - objek `profil`, `KATEGORI`, dan fungsi murni (`kapitalAwal`, `saring`, `periksaKolom`).
- `js/state.js` - satu objek `state`, fungsi pengubah, dan simpanan `localStorage` (`simpan`, `muat`, `pulihkan`, `aturUlang`).
- `js/dom.js` - semua yang menyentuh halaman; `render(state)`.
- `js/events.js` - seluruh `addEventListener` (filter, favorit, atur ulang, form).
- `js/app.js` - perakit: hanya import dan pemanggilan.
- `js/api.js`, `data/proyek.json` - dari P10, tidak diubah.
- `interaksi.css` - ditambah gaya `.favorit` dan `#atur-ulang`.

## Catatan teknis
- Yang disimpan di `localStorage` (kunci `pabw-p11`, versi 2): `kategoriAktif` dan `favorit`.
- Yang sengaja tidak disimpan: data proyek dari server, resep tambahan dari form, token, dan data pribadi.
- Simpanan rusak atau berversi lama dibuang, lalu nilai bawaan dipakai.
- `buatPerkenalan` dan `formatKeahlian` dari contoh worksheet tidak dibuat karena tidak ada di kode P10 saya.
- Cara menjalankan: Live Server dengan port tetap (tidak bisa lewat `file://`).

## Pertemuan 11 - Deklarasi AI
Dibantu AI: [ISI - mis. penulisan awal kode kelima modul, pengisian awal tabel perencanaan dan jawaban tiket keluar di worksheet].
Saya kerjakan sendiri: [ISI - mis. menjalankan dan menguji di browser, merusak simpanan dari Console, tangkapan layar bukti, memeriksa dan menulis ulang jawaban tiket keluar, penilaian mandiri].

Versi Node.js (pekerjaan rumah): `node -v` = [ISI], `npm -v` = [ISI]
