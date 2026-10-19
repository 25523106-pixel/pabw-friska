// ============================================================
// P11 - data.js
// Tanggung jawab: data tetap + fungsi murni.
// Tidak menyentuh halaman dan tidak memegang state.
// Daftar masakan TIDAK di sini: ada di data/proyek.json (P10).
// ============================================================

// ---------- Data profil (dari app.js P8/P10) ----------
export const profil = {
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

// Nilai filter yang sah (dipakai juga saat memulihkan simpanan).
export const KATEGORI = ['semua', 'mudah', 'sedang', 'sulit'];

// ---------- Fungsi murni (dari dom.js P10) ----------
export const kapitalAwal = (teks) => teks.charAt(0).toUpperCase() + teks.slice(1);

// Mengembalikan array BARU; daftar asli tidak pernah diubah.
export function saring(daftar, kategori) {
  return kategori === 'semua'
    ? [...daftar]
    : daftar.filter((m) => m.kesulitan.toLowerCase() === kategori.toLowerCase());
}

// Validasi satu kolom form. Mengembalikan pesan galat, atau "" bila isinya sudah layak.
export function periksaKolom(nama, nilai) {
  const isi = nilai.trim();

  if (nama === 'nama-masakan') {
    if (isi === '') return 'Nama masakan wajib diisi. Contoh: Soto Ayam.';
    if (isi.length < 3) return 'Nama masakan terlalu pendek. Tulis minimal 3 huruf.';
    return '';
  }

  if (nama === 'bahan-utama') {
    if (isi === '') return 'Bahan utama wajib diisi. Contoh: Ayam, kunyit, serai.';
    if (isi.length < 3) return 'Bahan utama terlalu pendek. Tulis minimal 3 huruf.';
    return '';
  }

  if (nama === 'tingkat-kesulitan') {
    if (!['mudah', 'sedang', 'sulit'].includes(isi)) {
      return 'Pilih salah satu tingkat kesulitan: Mudah, Sedang, atau Sulit.';
    }
    return '';
  }

  return '';
}
