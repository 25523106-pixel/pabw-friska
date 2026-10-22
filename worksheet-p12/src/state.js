import { reactive } from 'vue';
import { KATEGORI } from './data.js';

const KUNCI = 'pabw-p11';
const VERSI = 2;

export const state = reactive({
  daftarProyek: [],
  memuat: true,
  galat: '',
  kategoriAktif: 'semua',
  favorit: [],
  temaAktif: 'light'
});

export function simpan(s) {
  const isi = {
    versi: VERSI,
    kategoriAktif: s.kategoriAktif,
    favorit: s.favorit,
    temaAktif: s.temaAktif,
  };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi) return;
  if (KATEGORI.includes(isi.kategoriAktif)) {
    state.kategoriAktif = isi.kategoriAktif;
  }
  if (Array.isArray(isi.favorit)) {
    state.favorit = isi.favorit.map(Number).filter((id) => !Number.isNaN(id));
  }
  if (isi.temaAktif) {
    state.temaAktif = isi.temaAktif;
  }
}

export function pilihKategori(nilai) {
  if (KATEGORI.includes(nilai)) {
    state.kategoriAktif = nilai;
  }
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter((fId) => fId !== id);
  } else {
    state.favorit.push(id);
  }
}

export function tambahResep(resep) {
  const idBaru = state.daftarProyek.length > 0 
    ? Math.max(...state.daftarProyek.map((p) => p.id)) + 1 
    : 1;
    
  const data = {
    id: idBaru,
    nama: resep.nama,
    bahan: resep.bahan,
    kesulitan: resep.kesulitan,
    gambar: resep.gambar || 'nasi-kuning.jpg',
    alt: `Foto ${resep.nama}`,
    keterangan: `Resep ${resep.nama} buatan sendiri`
  };

  state.daftarProyek.push(data);
}

export function isiProyek(daftar) {
  state.daftarProyek = Array.isArray(daftar) ? daftar : [];
  state.memuat = false;
  state.galat = '';
}

export function aturUlang() {
  state.kategoriAktif = 'semua';
  state.favorit = [];
  localStorage.removeItem(KUNCI);
}
