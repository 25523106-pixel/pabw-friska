// ============================================================
// P11 - state.js
// Satu objek state, fungsi pengubah, dan simpanan klien (localStorage).
// Setiap perubahan lewat fungsi di sini; fungsi itu yang memanggil render.
// ============================================================
import { render } from './dom.js';
import { KATEGORI, kapitalAwal } from './data.js';

const KUNCI = 'pabw-p11';
const VERSI = 2;

export const state = {
  daftarProyek: [],        // dari server (TIDAK disimpan)
  dimuat: false,           // true setelah data dari api.js masuk (TIDAK disimpan)
  kategoriAktif: 'semua',  // filter tingkat kesulitan (disimpan)
  favorit: [],             // id masakan yang ditandai (disimpan)
};

/* ---------- Simpanan klien (lembar D dan E) ---------- */

export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
    favorit: state.favorit,
  };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {          // null (kunjungan pertama), "{}", atau skema lama
      localStorage.removeItem(KUNCI);
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);      // isi bukan JSON yang sah: buang
    return null;
  }
}

export function pulihkan(isi) {          // dipanggil sekali dari mulai() di app.js
  if (!isi) return;                      // kunjungan pertama: nilai bawaan tetap
  if (KATEGORI.includes(isi.kategoriAktif)) state.kategoriAktif = isi.kategoriAktif;
  if (Array.isArray(isi.favorit)) state.favorit = isi.favorit.filter(Number.isInteger);
}

/* ---------- Fungsi pengubah ---------- */

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  state.dimuat = true;
  // buang favorit yang id-nya tidak ada lagi (mis. resep tambahan sebelum muat ulang)
  state.favorit = state.favorit.filter((id) => daftar.some((m) => m.id === id));
  render(state);                       // tanpa simpan(): memuat data tidak mengubah pilihan pengguna
}

export function pilihKategori(nilai) {
  if (!KATEGORI.includes(nilai)) return;
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return;
  state.favorit = [...state.favorit, id];   // salinan baru, bukan push
  simpan(state);
  render(state);
}

// Resep dari form (P9). Daftar resepnya sendiri tidak ikut disimpan (lihat simpan()).
export function tambahResep({ nama, bahan, kesulitan }) {
  const idBaru = state.daftarProyek.reduce((maks, m) => Math.max(maks, m.id || 0), 0) + 1;
  const resep = { id: idBaru, nama, bahan, kesulitan: kapitalAwal(kesulitan) };
  state.daftarProyek = [...state.daftarProyek, resep];
  simpan(state);
  render(state);
  return resep;
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = 'semua';
  state.favorit = [];
  render(state);
}
