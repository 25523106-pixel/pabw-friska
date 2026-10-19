// ============================================================
// P11 - events.js
// Seluruh addEventListener ada di sini. Berkas ini tidak mengubah state
// langsung: ia hanya memanggil fungsi pengubah di state.js dan fungsi tampilan di dom.js.
// ============================================================
import { state, pilihKategori, tambahFavorit, tambahResep, aturUlang } from './state.js';
import {
  punyaKolom, tampilkanGalatKolom, semuaSah, periksaSemuaKolom, fokusKolomSalah,
  bacaForm, kosongkanForm, aturTombolSimpan, tampilkanStatus,
} from './dom.js';

export function pasangPendengar() {
  // Filter tingkat kesulitan: satu pendengar di induk tombol.
  document.querySelector('#filter').addEventListener('click', (event) => {
    const tombol = event.target.closest('button[data-tingkat]');
    if (!tombol) return;
    pilihKategori(tombol.dataset.tingkat);
  });

  // Tombol favorit: satu pendengar di wadah daftar (tabel dan galeri).
  document.querySelector('#daftar-masakan').addEventListener('click', (event) => {
    const tombol = event.target.closest('.favorit');
    if (!tombol) return;
    tambahFavorit(Number(tombol.dataset.id));
  });

  // Tombol atur ulang.
  document.querySelector('#atur-ulang').addEventListener('click', aturUlang);

  // Form: satu pendengar input untuk semua kolom.
  const form = document.querySelector('#formResep');
  form.addEventListener('input', (event) => {
    const nama = event.target.name;
    if (!punyaKolom(nama)) return;

    tampilkanStatus('');
    tampilkanGalatKolom(nama);
    aturTombolSimpan(!semuaSah());              // tombol menunggu sampai semua kolom layak
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();                     // halaman tidak dimuat ulang
    tampilkanStatus('');

    if (!periksaSemuaKolom()) {
      aturTombolSimpan(true);
      fokusKolomSalah();
      return;
    }

    if (!state.dimuat) {                        // data dari jaringan belum berhasil dimuat
      tampilkanStatus('Data belum berhasil dimuat, resep belum bisa disimpan. Muat ulang halaman.');
      return;
    }

    const resep = tambahResep(bacaForm());      // satu perubahan data, satu render
    const terlihat = state.kategoriAktif === 'semua'
      || state.kategoriAktif === resep.kesulitan.toLowerCase();
    tampilkanStatus(terlihat
      ? `Resep "${resep.nama}" berhasil disimpan.`
      : `Resep "${resep.nama}" berhasil disimpan. Pilih filter "Semua" atau "${resep.kesulitan}" untuk melihatnya.`);

    kosongkanForm();
    aturTombolSimpan(false);
  });
}
