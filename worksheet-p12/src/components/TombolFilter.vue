<script setup>
import { state, pilihKategori, aturUlang } from '../state.js'
import { KATEGORI, kapitalAwal } from '../data.js'
</script>

<template>
  <section class="kartu" id="filter">
    <div class="filter-kontainer">
      <span class="label-filter">Saring Kesulitan:</span>
      <div class="grup-tombol">
        <button
          v-for="kat in KATEGORI"
          :key="kat"
          type="button"
          :class="['tombol', 'tombol-filter', { aktif: state.kategoriAktif === kat }]"
          :data-tingkat="kat"
          @click="pilihKategori(kat)"
        >
          {{ kapitalAwal(kat) }}
        </button>
      </div>
      <button 
        type="button" 
        id="atur-ulang" 
        class="tombol tombol-sekunder" 
        @click="aturUlang"
      >
        🔄 Atur Ulang Pilihan
      </button>
    </div>
  </section>
</template>
