# Worksheet P9 - DOM, Event, dan Interaktivitas

Nama: Friska Rahmadani
NIM: 25523106

## Isi folder
- `profil.html` - halaman P8; ditambah tombol filter, pesan daftar kosong, pesan galat per kolom, dan `js/dom.js`.
- `js/app.js` - hanya data (`profil`, `daftarMasakan`) dan fungsi murni (`saringKesulitan`, `periksaKolom`, dll.). Tidak menyentuh halaman.
- `js/dom.js` - semua yang menyentuh halaman: memilih elemen, render, filter, validasi form.
- `interaksi.css` - gaya tombol aktif, keadaan kosong, dan pesan galat.
- Berkas CSS lain, `tema.js`, dan gambar tidak diubah dari P8.

## Ringkasan
- A: seluruh elemen dipilih lewat pembungkus `ambil()` di `js/dom.js`; bila ada yang tidak ditemukan, galatnya menyebut pemilih yang salah.
- B: tabel dan galeri dibentuk dari array `daftarMasakan` dengan `createElement`, `textContent`, dan `append` (tanpa `innerHTML`).
- C: satu `addEventListener("click")` di `#filter` melayani semua tombol (`event.target.closest("button")`, `dataset.tingkat`).
- D: satu fungsi `render(daftar)` (kosongkan, cek kosong, isi ulang); form memakai `preventDefault`, validasi per kolom, `aria-invalid`, tombol Simpan ditahan sampai semua kolom layak.
- E: [ISI - gejala, sebab, dan baris yang diubah, sama seperti tabel E.4 di worksheet]

## Pertemuan 9 - Deklarasi AI
Dibantu AI: kerangka `js/dom.js`, pemisahan `js/app.js` (data dan fungsi murni), perubahan `profil.html`
Saya kerjakan sendiri: [ISI - mis. menguji tiap pemilih di Console, mencoba filter dan form, memancing dan memperbaiki galat E, tangkapan layar, tiket keluar, penilaian mandiri].
