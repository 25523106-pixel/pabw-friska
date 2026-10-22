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

export const KATEGORI = ['semua', 'mudah', 'sedang', 'sulit'];

export const kapitalAwal = (teks) => teks.charAt(0).toUpperCase() + teks.slice(1);

export function saring(daftar, kategori) {
  return kategori === 'semua'
    ? [...daftar]
    : daftar.filter((m) => m.kesulitan.toLowerCase() === kategori.toLowerCase());
}

export function periksaKolom(nama, nilai) {
  const v = nilai.trim();

  if (nama === 'nama-masakan') {
    if (!v) return 'Nama masakan wajib diisi.';
    if (v.length < 3) return 'Nama masakan minimal 3 karakter.';
    return '';
  }

  if (nama === 'bahan-utama') {
    if (!v) return 'Bahan utama wajib diisi.';
    if (v.length < 3) return 'Bahan utama minimal 3 karakter.';
    return '';
  }

  if (nama === 'tingkat-kesulitan') {
    const sah = KATEGORI.filter((k) => k !== 'semua');
    if (!v) return 'Pilih salah satu tingkat kesulitan.';
    if (!sah.includes(v.toLowerCase())) return 'Tingkat kesulitan tidak valid.';
    return '';
  }

  return '';
}
