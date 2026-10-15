// ============================================================
// P10 - api.js (lapisan data)
// Hanya berkas ini yang memanggil fetch.
// Tugasnya mengambil, memeriksa status, dan membaca JSON.
// Tidak ada document / querySelector di sini.
// ============================================================

// Alamat ditulis satu kali, di sini saja (relatif terhadap profil.html).
const ALAMAT = 'data/proyek.json';

// Lembar D.5: untuk mengambil file yang sama dari GitHub, ganti SATU baris di atas
// dengan alamat dari tombol "Raw" di github.com (repositori harus publik), contoh:
// const ALAMAT ='https://raw.githubusercontent.com/25523106-pixel/pabw-friska/main/worksheet-p10/data/proyek.json';

export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    // fetch tidak menolak Promise pada 404/500, jadi status diperiksa sendiri
    if (!respons.ok) throw new Error('status ' + respons.status);
    const data = await respons.json();   // teks JSON -> larik objek
    return data;
  } catch (galat) {
    console.error('gagal memuat', galat.message);   // catatan untuk pengembang
    throw galat;                                    // dilempar lagi ke app.js
  }
}
