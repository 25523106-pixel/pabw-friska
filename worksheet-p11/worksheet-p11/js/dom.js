// ============================================================
// P11 - dom.js (lapisan tampilan)
// Semua yang menyentuh halaman ada di sini: pemilih, render, kelas.
// Hanya mengimpor data.js (bukan state.js, bukan events.js), jadi
// tidak ada dua berkas yang saling mengimpor. Keadaan masuk lewat argumen.
// ============================================================
import { saring, kapitalAwal, periksaKolom } from './data.js';

/* ---------- Memilih elemen ---------- */

// Bila elemennya tidak ada, galatnya menyebut pemilih mana yang salah.
function ambil(pemilih) {
  const elemen = document.querySelector(pemilih);
  if (elemen === null) {
    throw new Error(`Elemen "${pemilih}" tidak ditemukan. Bandingkan dengan id/kelas di profil.html.`);
  }
  return elemen;
}

const judulHalaman = ambil('#judul-halaman');
const teksTentang  = ambil('#teks-tentang');
const teksFooter   = ambil('#teks-footer');

const barisFilter  = ambil('#filter');
const tbody        = ambil('#daftar-masakan tbody');
const tabelWrap    = ambil('#daftar-masakan .table-wrap');
const galeri       = ambil('#daftar-masakan .galeri');
const kosong       = ambil('#kosong');
const muatEl       = ambil('#muat');

const tombolSimpan = ambil('#tombol-simpan');
const statusForm   = ambil('#status-form');
const form         = ambil('#formResep');

// Kuncinya sama dengan atribut name pada input.
const kolom = {
  'nama-masakan':      ambil('#nama-masakan'),
  'bahan-utama':       ambil('#bahan-utama'),
  'tingkat-kesulitan': ambil('#tingkat-kesulitan'),
};
const galat = {
  'nama-masakan':      ambil('#galat-nama-masakan'),
  'bahan-utama':       ambil('#galat-bahan-utama'),
  'tingkat-kesulitan': ambil('#galat-tingkat-kesulitan'),
};

const PESAN_KOSONG =
  'Belum ada masakan. Coba pilih tingkat lain, atau tambahkan resep baru di bawah.';

/* ---------- Identitas halaman ---------- */

export function tampilkanIdentitas(profil) {
  document.title = profil.judulHalaman;
  judulHalaman.textContent = profil.judulHalaman;
  teksTentang.textContent = profil.tentang;
  teksFooter.textContent = `Nama: ${profil.nama} | NIM: ${profil.nim} | Tahun: ${profil.tahun}`;
}

/* ---------- Satu data, satu wujud di halaman ---------- */

function buatTombolFavorit(masakan, favorit) {
  const tombol = document.createElement('button');
  tombol.type = 'button';
  tombol.className = 'favorit';
  tombol.dataset.id = masakan.id;
  const sudah = favorit.includes(masakan.id);
  tombol.textContent = sudah ? '★' : '☆';
  tombol.setAttribute('aria-label',
    sudah ? `${masakan.nama} sudah favorit` : `Tandai ${masakan.nama} sebagai favorit`);
  return tombol;
}

function buatBarisTabel(masakan, favorit) {
  const { nama, bahan, kesulitan } = masakan;
  const baris = document.createElement('tr');

  const sel1 = document.createElement('th');
  sel1.setAttribute('scope', 'row');
  sel1.textContent = nama;                      // textContent: isi dianggap teks, bukan HTML

  const sel2 = document.createElement('td');
  sel2.textContent = bahan;

  const sel3 = document.createElement('td');
  sel3.textContent = kapitalAwal(kesulitan);

  const sel4 = document.createElement('td');
  sel4.append(buatTombolFavorit(masakan, favorit));

  baris.append(sel1, sel2, sel3, sel4);
  return baris;
}

function buatKartuGaleri(masakan, favorit) {
  const { gambar, alt, keterangan, nama, kesulitan } = masakan;
  const kartu = document.createElement('figure');
  kartu.className = 'kartu';

  const foto = document.createElement('img');
  foto.src = gambar;
  foto.alt = alt;
  foto.loading = 'lazy';

  const teks = document.createElement('figcaption');
  teks.textContent = keterangan;

  const kaki = document.createElement('div');
  kaki.className = 'kartu__kaki';
  const spanNama = document.createElement('span');
  spanNama.textContent = nama;
  const spanTingkat = document.createElement('span');
  spanTingkat.textContent = kapitalAwal(kesulitan);
  kaki.append(spanNama, spanTingkat, buatTombolFavorit(masakan, favorit));

  kartu.append(foto, teks, kaki);
  return kartu;
}

/* ---------- Keadaan antarmuka: memuat, berhasil, gagal, kosong ---------- */

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
  if (aktif) {
    kosong.hidden = true;
    tabelWrap.hidden = true;
    galeri.hidden = true;
  }
}

export function tampilkanGalat(pesan) {
  tbody.textContent = '';
  galeri.textContent = '';
  tabelWrap.hidden = true;
  galeri.hidden = true;
  kosong.textContent = pesan;
  kosong.classList.add('galat');
  kosong.setAttribute('role', 'alert');
  kosong.hidden = false;
}

// Penanda tombol filter aktif: dibaca dari state, bukan dari kelas di DOM.
function tandaiTombolAktif(kategoriAktif) {
  barisFilter.querySelectorAll('button').forEach((tombol) => {
    const aktif = tombol.dataset.tingkat === kategoriAktif;
    tombol.classList.toggle('aktif', aktif);
    tombol.setAttribute('aria-pressed', String(aktif));
  });
}

// Satu fungsi render: menggambar halaman dari state.
export function render(state) {
  tandaiTombolAktif(state.kategoriAktif);
  if (!state.dimuat) return;                    // data belum tiba: biarkan keadaan memuat/galat

  tbody.textContent = '';                       // 1. kosongkan lebih dulu (kartu tidak berlipat)
  galeri.textContent = '';
  kosong.classList.remove('galat');
  kosong.removeAttribute('role');

  const tampil = saring(state.daftarProyek, state.kategoriAktif);   // dari data.js
  if (tampil.length === 0) {                    // 2. periksa keadaan kosong
    kosong.textContent = PESAN_KOSONG;
    kosong.hidden = false;
    tabelWrap.hidden = true;
    galeri.hidden = true;
    return;
  }
  kosong.hidden = true;
  tabelWrap.hidden = false;
  galeri.hidden = false;

  const fragmenTabel = document.createDocumentFragment();   // 3. isi ulang; digambar sekali
  const fragmenGaleri = document.createDocumentFragment();
  tampil.forEach((masakan) => {
    fragmenTabel.append(buatBarisTabel(masakan, state.favorit));
    if (masakan.gambar) {                       // galeri hanya memuat masakan yang punya gambar
      fragmenGaleri.append(buatKartuGaleri(masakan, state.favorit));
    }
  });
  tbody.append(fragmenTabel);
  galeri.append(fragmenGaleri);
}

/* ---------- Form tambah resep (validasi tampilan P9) ---------- */

export const punyaKolom = (nama) => nama in kolom;

// Memeriksa satu kolom dan menampilkan/menghapus pesannya. Mengembalikan true bila sah.
export function tampilkanGalatKolom(nama) {
  const pesan = periksaKolom(nama, kolom[nama].value);
  galat[nama].textContent = pesan;

  if (pesan) {
    kolom[nama].setAttribute('aria-invalid', 'true');
  } else {
    kolom[nama].removeAttribute('aria-invalid');
  }
  return pesan === '';
}

// Hanya memeriksa, tanpa mengubah tampilan.
export function semuaSah() {
  return Object.keys(kolom).every((nama) => periksaKolom(nama, kolom[nama].value) === '');
}

// map (bukan every) supaya SEMUA kolom diperiksa dan semua pesannya muncul sekaligus.
export function periksaSemuaKolom() {
  return Object.keys(kolom).map(tampilkanGalatKolom).every(Boolean);
}

export function fokusKolomSalah() {
  const pertama = Object.values(kolom).find((k) => k.hasAttribute('aria-invalid'));
  if (pertama) pertama.focus();
}

export function bacaForm() {
  return {
    nama: kolom['nama-masakan'].value.trim(),
    bahan: kolom['bahan-utama'].value.trim(),
    kesulitan: kolom['tingkat-kesulitan'].value,
  };
}

export function kosongkanForm() { form.reset(); }
export function aturTombolSimpan(nonaktif) { tombolSimpan.disabled = nonaktif; }
export function tampilkanStatus(teks) { statusForm.textContent = teks; }
