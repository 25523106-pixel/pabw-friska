// ============================================================
// P10 - app.js (perakit halaman "Menu Masakan Saya")
// Tidak mengambil data sendiri dan tidak menyentuh halaman secara langsung:
//   api.js  -> mengambil data
//   dom.js  -> menggambar ke halaman
//   app.js  -> merakit keduanya dan menangani galat
// ============================================================
import { ambilProyek } from './api.js';
import {
  tampilkanIdentitas,
  render,
  pasangFilter,
  aturMemuat,
  tampilkanGalat,
} from './dom.js';

// ---------- Data profil (dari P8) ----------
const profil = {
  nama: 'Friska Rahmadani',
  nim: '25523106',
  tahun: 2026,
  judulHalaman: 'Menu Masakan Saya',
  peran: 'Pemilik halaman menu masakan rumahan',
  keahlian: ['Nasi Kuning', 'Mie Goreng', 'Ayam Goreng'],
  alamat: {},
  tentang:
    'Halaman web ini dibuat sebagai wadah untuk mendokumentasikan berbagai menu ' +
    'masakan rumahan yang saya pelajari dan kuasai sehari-hari. Melalui halaman ini, ' +
    'resep dan tingkat kesulitan masakan dapat diakses dengan mudah dan terstruktur.',
};

// ---------- Perakit ----------
async function muat() {
  aturMemuat(true);                        // keadaan memuat
  try {
    const daftar = await ambilProyek();    // 1. ambil (api.js)
    pasangFilter(daftar);                  // 2. filter P9 memakai data ini
    render(daftar);                        // 3. gambar (dom.js)
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.');
    console.error(galat.message);          // untuk pengembang, bukan untuk pengguna
  } finally {
    aturMemuat(false);                     // sembunyikan "Memuat data..."
  }
}

tampilkanIdentitas(profil);
muat();                                    // dipanggil sekali saat halaman dibuka
