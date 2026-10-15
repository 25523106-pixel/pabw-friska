# Worksheet P10 - JavaScript Asinkron: fetch, Promise, dan JSON

Nama: Friska Rahmadani
NIM: 25523106

## Isi folder
- `profil.html` - halaman P9; ditambah `<p id="muat" hidden>`, teks `#kosong` diperbarui, dan hanya memuat `js/app.js` (baris `<script>` untuk `dom.js` dihapus).
- `data/proyek.json` - data masakan (sebelumnya larik `daftarMasakan` di `app.js`), JSON murni dengan `id` unik.
- `js/api.js` - **baru**. `ALAMAT` di satu tempat dan `export async function ambilProyek()` (fetch, cek `respons.ok`, `json()`, try/catch lalu lempar lagi). Satu-satunya berkas yang memanggil `fetch`.
- `js/app.js` - perakit: `muat()` memanggil `ambilProyek()`, `pasangFilter()`, `render()`; `try/catch/finally` menampilkan pesan galat di halaman. Tidak memanggil `fetch`.
- `js/dom.js` - semua yang menyentuh halaman. Tidak punya `import` apa pun; data masuk lewat argumen. Ekspor: `tampilkanIdentitas`, `render`, `pasangFilter`, `aturMemuat`, `tampilkanGalat`.
- `interaksi.css` - ditambah gaya `#muat` dan bingkai merah `#kosong.galat`.
- Berkas CSS lain, `tema.js`, dan gambar tidak diubah dari P9.

## Ringkasan
- A: data dipindah ke `data/proyek.json`; `ambilProyek()` memeriksa `respons.ok` sebelum membaca badan.
- B: `async/await` dengan satu `try/catch` di `api.js` (catat + lempar lagi) dan satu di `app.js` (pesan di halaman).
- C: `respons.json()` untuk teks menjadi nilai; peta kunci data tercatat di worksheet.
- D: `render(daftar)` dipakai ulang untuk data dari jaringan; empat keadaan: memuat, berhasil, gagal, kosong.
- E: tiga kasus sulit (404, `await` di fungsi biasa, larik kosong) dicatat di worksheet E.4.

## Catatan teknis
- Nama fungsi validasi form di `dom.js` diubah menjadi `tampilkanGalatKolom()` supaya `tampilkanGalat(pesan)` bebas dipakai untuk galat pemuatan data.
- Fungsi murni P9 (`kapitalAwal`, `saringKesulitan`, `periksaKolom`) dipindah ke `dom.js` agar `dom.js` tidak mengimpor dari `app.js`.
- Resep baru dari form diberi `id` berikutnya dan tidak punya `gambar`, jadi hanya tampil di tabel.
- Cara menjalankan: buka dengan Live Server atau `python3 -m http.server 8000` (tidak bisa lewat `file://`).

## Pertemuan 10 - Deklarasi AI
Dibantu AI: penulisan kode `js/api.js`, `js/app.js`, `js/dom.js`, `data/proyek.json`, perubahan `profil.html` dan `interaksi.css`.
Saya kerjakan sendiri: [ISI - mis. menjalankan dan menguji tiap keadaan di browser, memancing 404 dan jaringan mati, tangkapan layar bukti, mengisi worksheet, penilaian mandiri, tiket keluar]
