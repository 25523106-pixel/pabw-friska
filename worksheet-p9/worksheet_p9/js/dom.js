// ============================================================
// P9 - dom.js
// Semua yang menyentuh halaman ada di sini.
// Data dan fungsi murni datang dari app.js.
// ============================================================
import {
  profil,
  daftarMasakan,
  kapitalAwal,
  saringKesulitan,
  periksaKolom,
} from "./app.js";

/* ---------- Lembar A: memilih elemen ---------- */

// Pembungkus querySelector: bila elemennya tidak ada, galatnya jelas
// (menyebut pemilih mana yang salah), bukan "Cannot read properties of null".
function ambil(pemilih) {
  const elemen = document.querySelector(pemilih);
  if (elemen === null) {
    throw new Error(`Elemen "${pemilih}" tidak ditemukan. Bandingkan dengan id/kelas di profil.html.`);
  }
  return elemen;
}

const judulHalaman = ambil("#judul-halaman");
const teksTentang  = ambil("#teks-tentang");
const teksFooter   = ambil("#teks-footer");

const barisFilter  = ambil("#filter");
const tbody        = ambil("#daftar-masakan tbody");
const tabelWrap    = ambil("#daftar-masakan .table-wrap");
const galeri       = ambil("#daftar-masakan .galeri");
const kosong       = ambil("#kosong");

const form         = ambil("#formResep");
const tombolSimpan = ambil("#tombol-simpan");
const statusForm   = ambil("#status-form");

// Kuncinya sama dengan atribut name pada input, supaya event.target.name bisa dipakai langsung.
const kolom = {
  "nama-masakan":      ambil("#nama-masakan"),
  "bahan-utama":       ambil("#bahan-utama"),
  "tingkat-kesulitan": ambil("#tingkat-kesulitan"),
};
const galat = {
  "nama-masakan":      ambil("#galat-nama-masakan"),
  "bahan-utama":       ambil("#galat-bahan-utama"),
  "tingkat-kesulitan": ambil("#galat-tingkat-kesulitan"),
};

// Keadaan tampilan: filter mana yang sedang berlaku.
let tingkatAktif = "semua";

/* ---------- Identitas halaman ---------- */

function tampilkanIdentitas() {
  document.title = profil.judulHalaman;
  judulHalaman.textContent = profil.judulHalaman;
  teksTentang.textContent = profil.tentang;
  teksFooter.textContent = `Nama: ${profil.nama} | NIM: ${profil.nim} | Tahun: ${profil.tahun}`;
}

/* ---------- Lembar B: satu data, satu wujud di halaman ---------- */

function buatBarisTabel({ nama, bahan, kesulitan }) {
  const baris = document.createElement("tr");

  const sel1 = document.createElement("th");
  sel1.setAttribute("scope", "row");
  sel1.textContent = nama;                      // textContent: isi dianggap teks, bukan HTML

  const sel2 = document.createElement("td");
  sel2.textContent = bahan;

  const sel3 = document.createElement("td");
  sel3.textContent = kapitalAwal(kesulitan);

  baris.append(sel1, sel2, sel3);
  return baris;
}

function buatKartuGaleri({ gambar, alt, keterangan, nama, kesulitan }) {
  const kartu = document.createElement("figure");
  kartu.className = "kartu";

  const foto = document.createElement("img");
  foto.src = gambar;
  foto.alt = alt;
  foto.loading = "lazy";

  const teks = document.createElement("figcaption");
  teks.textContent = keterangan;

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";
  const spanNama = document.createElement("span");
  spanNama.textContent = nama;
  const spanTingkat = document.createElement("span");
  spanTingkat.textContent = kapitalAwal(kesulitan);
  kaki.append(spanNama, spanTingkat);

  kartu.append(foto, teks, kaki);
  return kartu;
}

/* ---------- Lembar D.1: satu fungsi render ---------- */

function render(daftar) {
  tbody.textContent = "";                       // 1. kosongkan lebih dulu
  galeri.textContent = "";

  if (daftar.length === 0) {                    // 2. periksa keadaan kosong
    kosong.hidden = false;
    tabelWrap.hidden = true;
    galeri.hidden = true;
    return;
  }
  kosong.hidden = true;
  tabelWrap.hidden = false;
  galeri.hidden = false;

  const fragmenTabel = document.createDocumentFragment();   // 3. isi ulang; halaman digambar sekali
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
  render(saringKesulitan(daftarMasakan, tingkatAktif));
}

/* ---------- Lembar C: satu pendengar di induk ---------- */

function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);    // gayanya ada di interaksi.css
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

// Dipasang SEKALI, di luar render. Melayani semua tombol filter.
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol || !barisFilter.contains(tombol)) return;   // klik di luar tombol, abaikan

  tingkatAktif = tombol.dataset.tingkat;
  perbarui();
  tandaiTombolAktif(tombol);
});

/* ---------- Lembar D.2: validasi form ---------- */

// Memeriksa satu kolom dan menampilkan/menghapus pesannya. Mengembalikan true bila sah.
function tampilkanGalat(nama) {
  const pesan = periksaKolom(nama, kolom[nama].value);
  galat[nama].textContent = pesan;

  if (pesan) {
    kolom[nama].setAttribute("aria-invalid", "true");
  } else {
    kolom[nama].removeAttribute("aria-invalid");
  }
  return pesan === "";
}

// Hanya memeriksa, tanpa mengubah tampilan.
function semuaSah() {
  return Object.keys(kolom).every((nama) => periksaKolom(nama, kolom[nama].value) === "");
}

// Satu pendengar di form untuk semua kolom: pesan hilang begitu isinya layak.
form.addEventListener("input", (event) => {
  const nama = event.target.name;
  if (!(nama in kolom)) return;

  statusForm.textContent = "";
  tampilkanGalat(nama);
  tombolSimpan.disabled = !semuaSah();          // tombol menunggu sampai semua kolom layak
});

form.addEventListener("submit", (event) => {
  event.preventDefault();                       // baris pertama: halaman tidak dimuat ulang
  statusForm.textContent = "";

  // map (bukan every) supaya SEMUA kolom diperiksa dan semua pesannya muncul sekaligus
  const hasil = Object.keys(kolom).map(tampilkanGalat);

  if (!hasil.every(Boolean)) {
    tombolSimpan.disabled = true;
    const pertama = Object.values(kolom).find((k) => k.hasAttribute("aria-invalid"));
    pertama.focus();                            // pindahkan pandangan ke kolom yang perlu diperbaiki
    return;
  }

  const resep = {
    nama: kolom["nama-masakan"].value.trim(),
    bahan: kolom["bahan-utama"].value.trim(),
    kesulitan: kapitalAwal(kolom["tingkat-kesulitan"].value),
  };
  daftarMasakan.push(resep);
  perbarui();                                   // satu perubahan data, satu pemanggilan render

  const terlihat = tingkatAktif === "semua" || tingkatAktif === resep.kesulitan.toLowerCase();
  statusForm.textContent = terlihat
    ? `Resep "${resep.nama}" berhasil disimpan.`
    : `Resep "${resep.nama}" berhasil disimpan. Pilih filter "Semua" atau "${resep.kesulitan}" untuk melihatnya.`;

  form.reset();
  tombolSimpan.disabled = false;
});

/* ---------- Keadaan awal ---------- */

tampilkanIdentitas();
perbarui();
tandaiTombolAktif(ambil('#filter button[data-tingkat="semua"]'));
