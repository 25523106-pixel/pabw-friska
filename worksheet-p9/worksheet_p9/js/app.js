// ============================================================
// P9 - app.js (halaman "Menu Masakan Saya")
// Berkas ini hanya menyimpan DATA dan FUNGSI MURNI.
// Tidak ada document / querySelector di sini: semua yang menyentuh
// halaman ada di js/dom.js.
// ============================================================

// ---------- Data (dari P8) ----------
export const profil = {
  nama: "Friska Rahmadani",
  nim: "25523106",
  tahun: 2026,
  judulHalaman: "Menu Masakan Saya",
  peran: "Pemilik halaman menu masakan rumahan",
  keahlian: ["Nasi Kuning", "Mie Goreng", "Ayam Goreng"],
  alamat: {},
  tentang:
    "Halaman web ini dibuat sebagai wadah untuk mendokumentasikan berbagai menu " +
    "masakan rumahan yang saya pelajari dan kuasai sehari-hari. Melalui halaman ini, " +
    "resep dan tingkat kesulitan masakan dapat diakses dengan mudah dan terstruktur.",
};

export const daftarMasakan = [
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
// Catatan: belum ada masakan "Sulit". Itu disengaja, supaya keadaan kosong bisa diuji.

// ---------- Fungsi murni ----------
export const kapitalAwal = (teks) => teks.charAt(0).toUpperCase() + teks.slice(1);

export function buatPerkenalan({ nama, nim, peran }) {
  return `${nama} (${nim}) - ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

// Mengembalikan array BARU; daftar asli tidak pernah diubah.
export const saringKesulitan = (daftar, tingkat) =>
  tingkat === "semua"
    ? [...daftar]
    : daftar.filter((m) => m.kesulitan.toLowerCase() === tingkat.toLowerCase());

// Validasi satu kolom form. Mengembalikan pesan galat, atau "" bila isinya sudah layak.
// Pesannya menyebut cara memperbaiki, bukan menyalahkan.
export function periksaKolom(nama, nilai) {
  const isi = nilai.trim();

  if (nama === "nama-masakan") {
    if (isi === "") return "Nama masakan wajib diisi. Contoh: Soto Ayam.";
    if (isi.length < 3) return "Nama masakan terlalu pendek. Tulis minimal 3 huruf.";
    return "";
  }

 if (nama === "bahan-utama") {
    if (isi === "") return "Bahan utama wajib diisi. Contoh: Ayam, kunyit, serai.";
    if (isi.length < 3) return "Bahan utama terlalu pendek. Tulis minimal 3 huruf.";
    return "";
  }

  if (nama === "tingkat-kesulitan") {
    if (!["mudah", "sedang", "sulit"].includes(isi)) {
      return "Pilih salah satu tingkat kesulitan: Mudah, Sedang, atau Sulit.";
    }
    return "";
  }

  return "";
}
