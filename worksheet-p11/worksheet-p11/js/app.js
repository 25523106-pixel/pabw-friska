// ============================================================
// P11 - app.js (perakit)
// Hanya import dan pemanggilan, tidak ada logika.
//   api.js    -> mengambil data (dari P10, tidak diubah)
//   data.js   -> profil dan fungsi murni
//   state.js  -> state, pengubah, simpanan
//   dom.js    -> menggambar ke halaman
//   events.js -> pendengar peristiwa
// ============================================================
import { ambilProyek } from './api.js';
import { profil } from './data.js';
import { isiProyek, pulihkan, muat } from './state.js';
import { tampilkanIdentitas, tampilkanGalat, aturMemuat } from './dom.js';
import { pasangPendengar } from './events.js';

async function mulai() {
  pulihkan(muat());                       // pilihan terakhir, atau nilai bawaan
  tampilkanIdentitas(profil);
  pasangPendengar();
  aturMemuat(true);
  try {
    isiProyek(await ambilProyek());       // isiProyek memanggil render(state)
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.');
    console.error(galat.message);         // untuk pengembang, bukan untuk pengguna
  } finally {
    aturMemuat(false);
  }
}

mulai();
