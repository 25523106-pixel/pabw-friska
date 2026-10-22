<script setup>
import { reactive, ref, computed } from 'vue'
import { state, tambahResep } from '../state.js'
import { periksaKolom } from '../data.js'

const form = reactive({
  nama: '',
  bahan: '',
  kesulitan: ''
})

const galat = reactive({
  nama: '',
  bahan: '',
  kesulitan: ''
})

const disentuh = reactive({
  nama: false,
  bahan: false,
  kesulitan: false
})

const statusPesan = ref('')
const statusTipe = ref('')

function validasiForm() {
  galat.nama = periksaKolom('nama-masakan', form.nama)
  galat.bahan = periksaKolom('bahan-utama', form.bahan)
  galat.kesulitan = periksaKolom('tingkat-kesulitan', form.kesulitan)
}

const formSah = computed(() => {
  validasiForm()
  return !galat.nama && !galat.bahan && !galat.kesulitan && form.nama && form.bahan && form.kesulitan
})

function handleInput(kolom) {
  disentuh[kolom] = true
  validasiForm()
}

function submitForm() {
  disentuh.nama = true
  disentuh.bahan = true
  disentuh.kesulitan = true
  
  validasiForm()

  if (!formSah.value) {
    statusPesan.value = 'Periksa kembali isian formulir Anda.'
    statusTipe.value = 'pesan-galat'
    return
  }

  tambahResep({
    nama: form.nama,
    bahan: form.bahan,
    kesulitan: form.kesulitan
  })

  statusPesan.value = `Resep "${form.nama}" berhasil ditambahkan!`
  statusTipe.value = 'pesan-sukses'

  form.nama = ''
  form.bahan = ''
  form.kesulitan = ''
  disentuh.nama = false
  disentuh.bahan = false
  disentuh.kesulitan = false
}
</script>

<template>
  <section class="kartu" id="tambah-resep">
    <h2>Tambah Resep Masakan Baru</h2>
    <p class="petunjuk-form">
      Isi formulir berikut untuk menambahkan resep masakan Anda ke dalam daftar.
    </p>

    <form id="formResep" @submit.prevent="submitForm" novalidate>
      <div class="grup-form">
        <label for="nama-masakan">Nama Masakan <span class="wajib">*</span></label>
        <input
          type="text"
          id="nama-masakan"
          name="nama-masakan"
          v-model="form.nama"
          @input="handleInput('nama')"
          placeholder="Contoh: Nasi Goreng Spesial"
          required
        />
        <span v-if="disentuh.nama && galat.nama" class="pesan-galat-kolom">{{ galat.nama }}</span>
      </div>

      <div class="grup-form">
        <label for="bahan-utama">Bahan Utama <span class="wajib">*</span></label>
        <input
          type="text"
          id="bahan-utama"
          name="bahan-utama"
          v-model="form.bahan"
          @input="handleInput('bahan')"
          placeholder="Contoh: Nasi, telur, kecap, bawang"
          required
        />
        <span v-if="disentuh.bahan && galat.bahan" class="pesan-galat-kolom">{{ galat.bahan }}</span>
      </div>

      <div class="grup-form">
        <label for="tingkat-kesulitan">Tingkat Kesulitan <span class="wajib">*</span></label>
        <select
          id="tingkat-kesulitan"
          name="tingkat-kesulitan"
          v-model="form.kesulitan"
          @change="handleInput('kesulitan')"
          required
        >
          <option value="" disabled>-- Pilih tingkat kesulitan --</option>
          <option value="Mudah">Mudah</option>
          <option value="Sedang">Sedang</option>
          <option value="Sulit">Sulit</option>
        </select>
        <span v-if="disentuh.kesulitan && galat.kesulitan" class="pesan-galat-kolom">{{ galat.kesulitan }}</span>
      </div>

      <div class="tindakan-form">
        <button
          type="submit"
          id="tombol-simpan"
          class="tombol tombol-utama"
          :disabled="!formSah"
        >
          Simpan Resep
        </button>
      </div>

      <div v-if="statusPesan" id="status-form" :class="statusTipe" role="status">
        {{ statusPesan }}
      </div>
    </form>
  </section>
</template>
