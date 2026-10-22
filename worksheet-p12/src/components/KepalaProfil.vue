<script setup>
import { state } from '../state.js'

const props = defineProps({
  profil: { type: Object, required: true }
})
</script>

<template>
  <header>
    <div class="header-baris">
      <h1 id="judul-halaman">{{ props.profil.judulHalaman }}</h1>

      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#daftar-masakan">Daftar Masakan</a></li>
          <li><a href="#tambah-resep">Tambah Resep</a></li>
          <li><a href="#tentang-saya">Tentang Saya</a></li>
          <li class="pengalih-tema">
            <label for="pilihan-tema">Tema:</label>
            <select id="pilihan-tema" v-model="state.temaAktif" aria-label="Pilih tema halaman">
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="ocean">🌊 Ocean</option>
              <option value="forest">🌿 Forest</option>
              <option value="purple">💜 Purple</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
