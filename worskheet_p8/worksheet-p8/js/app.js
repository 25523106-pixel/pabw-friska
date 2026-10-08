// ============================================================
// P8 - app.js (halaman "Menu Masakan Saya")
// Isi halaman P6 digambar dari data di berkas ini.
// ============================================================

// ---------- LEMBAR B: data sebagai variabel ----------
const profil = {
  nama: "Friska Rahmadani",
  nim: "25523106",
  tahun: 2026,
  judulHalaman: "Menu Masakan Saya",
  peran: "Pemilik halaman menu masakan rumahan",
  keahlian: ["Nasi Kuning", "Mie Goreng", "Ayam Goreng"],
  alamat: {}, // kota belum diisi -> dipakai untuk demo ?. dan ??
  tentang:
    "Halaman web ini dibuat sebagai wadah untuk mendokumentasikan berbagai menu " +
    "masakan rumahan yang saya pelajari dan kuasai sehari-hari. Melalui halaman ini, " +
    "resep dan tingkat kesulitan masakan dapat diakses dengan mudah dan terstruktur.",
};

const daftarMasakan = [
  {
    nama: "Nasi Kuning",
    bahan: "Nasi, santan, kunyit",
    kesulitan: "Sedang",
    gambar: "nasi-kuning.jpg",
    alt: "Piring saji berisi Nasi Kuning lengkap dengan lauk",
    keterangan: "Contoh sajian Nasi Kuning rumahan",
  },
  {
    nama: "Mie Goreng",
    bahan: "Mie, telur, sayuran",
    kesulitan: "Mudah",
    gambar: "mie-goreng.jpg",
    alt: "Piring saji berisi Mie Goreng dengan topping telur dan sayuran",
    keterangan: "Contoh sajian Mie Goreng spesial",
  },
  {
    nama: "Ayam Goreng",
    bahan: "Ayam, bumbu rempah",
    kesulitan: "Mudah",
    gambar: "ayam-goreng.jpg",
    alt: "Piring saji berisi ayam goreng dengan nasi dan sayuran",
    keterangan: "Contoh sajian Ayam Goreng spesial",
  },
];

let pilihanAktif = "semua"; // let: nilainya berubah bila daftar disaring

// Demo ?? dan ?. (aman dari null/undefined)
const kota = profil.alamat?.kota ?? "Belum diisi";
const julukan = profil.julukan ?? "-";
const kotaAman = profil.domisili?.kota ?? "-";

document.title = profil.judulHalaman;

// ---------- LEMBAR C: fungsi murni ----------
const kapitalAwal = (teks) => teks.charAt(0).toUpperCase() + teks.slice(1);

function buatPerkenalan({ nama, nim, peran }) {
  return `${nama} (${nim}) - ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

// Escape input pengguna sebelum masuk ke innerHTML
const amankanTeks = (teks) =>
  String(teks)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const saringKesulitan = (daftar, tingkat) =>
  tingkat === "semua"
    ? daftar
    : daftar.filter((m) => m.kesulitan.toLowerCase() === tingkat.toLowerCase());

const buatBarisTabel = ({ nama, bahan, kesulitan }) => `
  <th scope="row">${amankanTeks(nama)}</th>
  <td>${amankanTeks(bahan)}</td>
  <td>${amankanTeks(kapitalAwal(kesulitan))}</td>
`;

const buatKartuGaleri = ({ gambar, alt, keterangan, nama, kesulitan }) => `
  <figure class="kartu">
    <img src="${amankanTeks(gambar)}" alt="${amankanTeks(alt)}" loading="lazy">
    <figcaption>${amankanTeks(keterangan)}</figcaption>
    <div class="kartu__kaki"><span>${amankanTeks(nama)}</span><span>${amankanTeks(kesulitan)}</span></div>
  </figure>
`;

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(buatPerkenalan({ nama: "Friska", nim: "25523106", peran: "mahasiswa" }));
console.log(formatKeahlian(["Git"]));
console.log(formatKeahlian([]));
console.log({ kota, julukan, kotaAman, pilihanAktif });

// ---------- LEMBAR D: array methods ----------
// filter: hanya masakan dengan tingkat "Mudah"
const masakanMudah = saringKesulitan(daftarMasakan, "Mudah");
console.table(masakanMudah);

// find: satu masakan berdasarkan nama (undefined bila tidak ada)
const mieGoreng = daftarMasakan.find((m) => m.nama === "Mie Goreng");
console.log(mieGoreng);
console.log(daftarMasakan.find((m) => m.nama === "Tidak Ada")); // undefined

// map: mengubah tiap isi, panjang hasil sama dengan array asal
const daftarNama = daftarMasakan.map((m) => m.nama);
console.log(daftarNama, daftarNama.length === daftarMasakan.length);

// sort pada SALINAN supaya data asli tidak berubah
const urutNama = [...daftarMasakan].sort((a, b) => a.nama.localeCompare(b.nama));
console.table(urutNama);
console.log(daftarMasakan[0].nama); // tetap "Nasi Kuning"

// ---------- LEMBAR E: kasus sulit ----------
console.log(profil.namaa); // sengaja salah -> undefined (catat di E.5)

const elemen = document.querySelector("#tidak-ada");
console.log(elemen); // null
console.log(elemen?.textContent ?? "elemen tidak ditemukan");

const nilaiInput = document.querySelector("#nama-masakan").value; // selalu string
console.log(typeof nilaiInput);
console.log("2026" + 1); // "20261" (menyambung)
console.log(Number("2026") + 1); // 2027

// ---------- Penampil ke halaman ----------
const tbody = document.querySelector("#daftar-masakan tbody");
const galeri = document.querySelector("#daftar-masakan .galeri");

function tampilkanTabel() {
  tbody.innerHTML = "";
  daftarMasakan.map(buatBarisTabel).forEach((isi) => {
    const baris = document.createElement("tr");
    baris.innerHTML = isi;
    tbody.appendChild(baris);
  });
}

function tampilkanGaleri() {
  // galeri hanya memuat masakan yang punya gambar
  galeri.innerHTML = daftarMasakan
    .filter((m) => m.gambar)
    .map(buatKartuGaleri)
    .join("");
}

function tampilkanIdentitas() {
  document.getElementById("judul-halaman").textContent = profil.judulHalaman;
  document.getElementById("teks-tentang").textContent = profil.tentang;
  document.getElementById("teks-footer").textContent =
    `Nama: ${profil.nama} | NIM: ${profil.nim} | Tahun: ${profil.tahun}`;
}

tampilkanIdentitas();
tampilkanTabel();
tampilkanGaleri();

// ---------- Form tambah resep (dipindah dari skrip inline P6) ----------
const formResep = document.getElementById("formResep");

formResep.addEventListener("submit", (event) => {
  event.preventDefault();

  daftarMasakan.push({
    nama: document.getElementById("nama-masakan").value.trim(),
    bahan: document.getElementById("bahan-utama").value.trim(),
    kesulitan: kapitalAwal(document.getElementById("tingkat-kesulitan").value),
  });

  tampilkanTabel();
  alert("Resep berhasil disimpan!");
  formResep.reset();
});
