<script setup>
import { computed } from 'vue'
import { state, tambahFavorit } from '../state.js'
import { saring } from '../data.js'

const daftarTampil = computed(() => {
  return saring(state.daftarProyek, state.kategoriAktif)
})
</script>

<template>
  <section class="kartu" id="daftar-masakan">
    <h2>Daftar Masakan Rumahan</h2>

    <!-- Pesan Memuat / Galat / Kosong -->
    <p v-if="state.memuat" id="muat" class="pesan-info">Memuat data masakan...</p>

    <p v-else-if="state.galat" id="galat" class="pesan-galat">{{ state.galat }}</p>

    <div v-else-if="daftarTampil.length === 0" id="kosong" class="pesan-kosong">
      Tidak ada masakan yang sesuai dengan kriteria saringan.
    </div>

    <template v-else>
      <!-- Mode Tabel -->
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Suka</th>
              <th>Nama Masakan</th>
              <th>Bahan Utama</th>
              <th>Tingkat Kesulitan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in daftarTampil" :key="m.id">
              <td>
                <button
                  type="button"
                  class="favorit"
                  :data-id="m.id"
                  :aria-label="'Tandai ' + m.nama + ' sebagai favorit'"
                  @click="tambahFavorit(m.id)"
                >
                  {{ state.favorit.includes(m.id) ? '⭐' : '☆' }}
                </button>
              </td>
              <td><strong>{{ m.nama }}</strong></td>
              <td>{{ m.bahan }}</td>
              <td>
                <span :class="['lencana', 'lencana-' + m.kesulitan.toLowerCase()]">
                  {{ m.kesulitan }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mode Galeri Foto -->
      <h3 class="judul-sub">Galeri Masakan</h3>
      <div class="galeri">
        <figure v-for="m in daftarTampil" :key="'fig-' + m.id" class="kartu-foto">
          <img :src="m.gambar" :alt="m.alt" loading="lazy" />
          <figcaption>
            <button
              type="button"
              class="favorit"
              :data-id="m.id"
              :aria-label="'Tandai ' + m.nama + ' sebagai favorit'"
              @click="tambahFavorit(m.id)"
            >
              {{ state.favorit.includes(m.id) ? '⭐' : '☆' }}
            </button>
            <strong>{{ m.nama }}</strong> — {{ m.keterangan }}
          </figcaption>
        </figure>
      </div>
    </template>
  </section>
</template>
