
<script setup>
import { onMounted, watch } from 'vue'
import { profil } from './data.js'
import { state, simpan, muat, pulihkan, isiProyek } from './state.js'
import { ambilProyek } from './api.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

onMounted(async () => {
  // Pulihkan pengaturan yang pernah disimpan
  pulihkan(muat())

  // Terapkan tema pada elemen HTML agar cocok dengan tema.css
  document.documentElement.setAttribute(
    'data-theme',
    state.temaAktif
  )

  try {
    // Ambil data untuk ditampilkan
    isiProyek(await ambilProyek())
  } catch (galat) {
    state.galat =
      'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
  } finally {
    state.memuat = false
  }
})

// Simpan perubahan pengaturan dan terapkan tema otomatis
watch(
  state,
  (nilai) => {
    simpan(nilai)

    document.documentElement.setAttribute(
      'data-theme',
      nilai.temaAktif
    )
  },
  { deep: true }
)
</script>

<template>
  <div class="page">
    <!-- Bagian kepala halaman -->
    <KepalaProfil :profil="profil" />

    <main id="konten-utama">
      <!-- Filter dan pengaturan tampilan -->
      <TombolFilter />

      <!-- Daftar masakan -->
      <DaftarProyek />

      <!-- Formulir tambah resep -->
      <FormKontak />

      <!-- Bagian tentang saya -->
      <section class="kartu" id="tentang-saya">
        <h2>Tentang Saya</h2>

        <p id="teks-tentang">
          {{ profil.tentang }}
        </p>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <p id="teks-footer">
        © {{ profil.tahun }} {{ profil.nama }}
        (NIM: {{ profil.nim }}). Dibuat untuk Praktikum PABW.
      </p>
    </footer>
  </div>
</template>
