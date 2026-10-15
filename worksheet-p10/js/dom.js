// ============================================================
// P10 - dom.js (lapisan tampilan)
// Semua yang menyentuh halaman ada di sini.
// Berkas ini TIDAK mengimpor apa pun (terutama bukan dari app.js):
// data masuk lewat argumen fungsi, misalnya render(daftar).
//
// Yang diekspor (kontrak untuk Pertemuan 11):
//   tampilkanIdentitas, render, pasangFilter, aturMemuat, tampilkanGalat
// ============================================================

/* ---------- Fungsi murni (dipindah dari app.js P9) ---------- */

const kapitalAwal = (teks) => teks.charAt(0).toUpperCase() + teks.slice(1);

// Mengembalikan array BARU; daftar asli tidak pernah diubah.
const saringKesulitan = (daftar, tingkat) =>
  tingkat === 'semua'
    ? [...daftar]
    : daftar.filter((m) => m.kesulitan.toLowerCase() === tingkat.toLowerCase());

// Validasi satu kolom form. Mengembalikan pesan galat, atau "" bila isinya sudah layak.
function periksaKolom(nama, nilai) {
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

/* ---------- Memilih elemen ---------- */

// Pembungkus querySelector: bila elemennya tidak ada, galatnya jelas
// (menyebut pemilih mana yang salah), bukan "Cannot read properties of null".
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
const muatEl       = ambil('#muat');           // baru di P10: pesan "Memuat data..."

const form         = ambil('#formResep');
const tombolSimpan = ambil('#tombol-simpan');
const statusForm   = ambil('#status-form');

// Kuncinya sama dengan atribut name pada input, supaya event.target.name bisa dipakai langsung.
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

// Keadaan tampilan.
let tingkatAktif = 'semua';   // filter mana yang sedang berlaku
let sumber = null;            // larik dari api.js; null = data belum berhasil dimuat

/* ---------- Identitas halaman ---------- */

export function tampilkanIdentitas(profil) {
  document.title = profil.judulHalaman;
  judulHalaman.textContent = profil.judulHalaman;
  teksTentang.textContent = profil.tentang;
  teksFooter.textContent = `Nama: ${profil.nama} | NIM: ${profil.nim} | Tahun: ${profil.tahun}`;
}

/* ---------- Satu data, satu wujud di halaman ---------- */

function buatBarisTabel({ nama, bahan, kesulitan }) {
  const baris = document.createElement('tr');

  const sel1 = document.createElement('th');
  sel1.setAttribute('scope', 'row');
  sel1.textContent = nama;                      // textContent: isi dianggap teks, bukan HTML

  const sel2 = document.createElement('td');
  sel2.textContent = bahan;

  const sel3 = document.createElement('td');
  sel3.textContent = kapitalAwal(kesulitan);

  baris.append(sel1, sel2, sel3);
  return baris;
}

function buatKartuGaleri({ gambar, alt, keterangan, nama, kesulitan }) {
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
  kaki.append(spanNama, spanTingkat);

  kartu.append(foto, teks, kaki);
  return kartu;
}

/* ---------- Keadaan antarmuka: memuat, berhasil, gagal, kosong ---------- */

// Memuat: pesan tampil, tabel/galeri/pesan lain disembunyikan.
// Saat selesai (aktif = false) hanya pesan memuat yang disembunyikan;
// render() atau tampilkanGalat() sudah mengatur sisanya.
export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
  if (aktif) {
    kosong.hidden = true;
    tabelWrap.hidden = true;
    galeri.hidden = true;
  }
}

// Gagal: pesan di elemen #kosong yang sama (diberi bingkai merah lewat kelas "galat").
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

// Berhasil atau kosong. Satu fungsi render, dipakai ulang oleh filter dan form.
export function render(daftar) {
  tbody.textContent = '';                       // 1. kosongkan lebih dulu (kartu tidak berlipat)
  galeri.textContent = '';
  kosong.classList.remove('galat');
  kosong.removeAttribute('role');

  if (daftar.length === 0) {                    // 2. periksa keadaan kosong
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
  daftar.forEach((masakan) => {
    fragmenTabel.append(buatBarisTabel(masakan));
    if (masakan.gambar) {                       // galeri hanya memuat masakan yang punya gambar
      fragmenGaleri.append(buatKartuGaleri(masakan));
    }
  });
  tbody.append(fragmenTabel);
  galeri.append(fragmenGaleri);
}

// Menggambar ulang sesuai filter yang sedang aktif.
function perbarui() {
  render(saringKesulitan(sumber, tingkatAktif));
}

/* ---------- Filter (P9), sekarang memakai data dari jaringan ---------- */

function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll('button').forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle('aktif', aktif);    // gayanya ada di interaksi.css
    tombol.setAttribute('aria-pressed', String(aktif));
  });
}

// Dipanggil SEKALI oleh app.js setelah data tiba.
export function pasangFilter(daftar) {
  sumber = daftar;
  tingkatAktif = 'semua';
  tandaiTombolAktif(ambil('#filter button[data-tingkat="semua"]'));

  barisFilter.addEventListener('click', (event) => {
    const tombol = event.target.closest('button');
    if (!tombol || !barisFilter.contains(tombol)) return;   // klik di luar tombol, abaikan

    tingkatAktif = tombol.dataset.tingkat;
    perbarui();
    tandaiTombolAktif(tombol);
  });
}

/* ---------- Validasi form (P9) ---------- */

// Memeriksa satu kolom dan menampilkan/menghapus pesannya. Mengembalikan true bila sah.
// (Namanya dibedakan dari tampilkanGalat(pesan) yang untuk galat pemuatan data.)
function tampilkanGalatKolom(nama) {
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
function semuaSah() {
  return Object.keys(kolom).every((nama) => periksaKolom(nama, kolom[nama].value) === '');
}

// Satu pendengar di form untuk semua kolom: pesan hilang begitu isinya layak.
form.addEventListener('input', (event) => {
  const nama = event.target.name;
  if (!(nama in kolom)) return;

  statusForm.textContent = '';
  tampilkanGalatKolom(nama);
  tombolSimpan.disabled = !semuaSah();          // tombol menunggu sampai semua kolom layak
});

form.addEventListener('submit', (event) => {
  event.preventDefault();                       // baris pertama: halaman tidak dimuat ulang
  statusForm.textContent = '';

  // map (bukan every) supaya SEMUA kolom diperiksa dan semua pesannya muncul sekaligus
  const hasil = Object.keys(kolom).map(tampilkanGalatKolom);

  if (!hasil.every(Boolean)) {
    tombolSimpan.disabled = true;
    const pertama = Object.values(kolom).find((k) => k.hasAttribute('aria-invalid'));
    pertama.focus();                            // pindahkan pandangan ke kolom yang perlu diperbaiki
    return;
  }

  if (sumber === null) {                        // data dari jaringan belum berhasil dimuat
    statusForm.textContent = 'Data belum berhasil dimuat, resep belum bisa disimpan. Muat ulang halaman.';
    return;
  }

  const idBaru = sumber.reduce((maks, m) => Math.max(maks, m.id || 0), 0) + 1;
  const resep = {
    id: idBaru,
    nama: kolom['nama-masakan'].value.trim(),
    bahan: kolom['bahan-utama'].value.trim(),
    kesulitan: kapitalAwal(kolom['tingkat-kesulitan'].value),
  };
  sumber.push(resep);
  perbarui();                                   // satu perubahan data, satu pemanggilan render

  const terlihat = tingkatAktif === 'semua' || tingkatAktif === resep.kesulitan.toLowerCase();
  statusForm.textContent = terlihat
    ? `Resep "${resep.nama}" berhasil disimpan.`
    : `Resep "${resep.nama}" berhasil disimpan. Pilih filter "Semua" atau "${resep.kesulitan}" untuk melihatnya.`;

  form.reset();
  tombolSimpan.disabled = false;
});
