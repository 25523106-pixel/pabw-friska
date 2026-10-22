# Worksheet P12 — Build Tooling, npm, dan Framework SPA

**Nama:** Friska Rahmadani  
**NIM:** 25523106  
**Kelas:** A  
**Mata Kuliah:** Pengembangan Aplikasi Berbasis Web (SIF302)  

---

## Lembar A — Perkakas Sebelum Bekerja
- **Node.js Version:** `v20.18.0` (LTS)
- **npm Version:** `10.8.2`

---

## Jawaban Tiket Keluar (Lembar G)

### 1. Bedanya `dependencies` dan `devDependencies` & Contoh
- **`dependencies`**: Paket JavaScript yang dibutuhkan aplikasi untuk berjalan di lingkungan *runtime*/peramban pengguna.  
  *Contoh di proyek ini:* `vue`.
- **`devDependencies`**: Paket yang hanya dibutuhkan selama tahap pengembangan, pengujian, atau proses *build* proyek. Paket ini tidak ikut dikirimkan ke peramban pengguna saat aplikasi diproduksi.  
  *Contoh di proyek ini:* `vite` dan `@vitejs/plugin-vue`.

### 2. Mengapa `package-lock.json` Wajib Disimpan, Sedangkan `node_modules/` Tidak?
- `package-lock.json` mengunci versi persis (*exact tree version*) dari semua dependensi beserta sub-dependensinya. Hal ini menjamin bahwa setiap kali `npm install` dijalankan di komputer manapun (termasuk server CI/CD atau komputer dosen), pohon dependensi yang terpasang identik.
- `node_modules/` berisi ribuan berkas fisik hasil ekstraksi pustaka yang ukurannya sangat besar dan dapat dengan mudah dibangun ulang kapan saja cukup dengan menjalankan perintah `npm install`.

### 3. Arti Perintah `npm create vite@latest . -- --template vue` & Arti Titik (`.`)
- Perintah ini menjalankan alat *scaffolding* Vite untuk membuat kerangka kerja (*boilerplate*) proyek baru dengan opsi *template* Vue.
- Tanda titik (`.`) berarti **"buat proyek di dalam folder kerja saat ini"** (*current working directory*), sehingga Vite tidak membuat subfolder baru lagi di dalamnya.
- Tanda `--` digunakan untuk memisahkan argumen `npm` dari argumen yang akan diteruskan secara langsung ke skrip pembentuk Vite.

### 4. Pengganti `render(state)` Manual di Vue
Di Pertemuan 11, fungsi `render(state)` harus dipanggil secara eksplisit setiap kali terjadi perubahan data pada `state`. Di Vue (Pertemuan 12), `render(state)` digantikan oleh **sistem Reaktivitas Vue** (`reactive()`) yang dipadukan dengan Sintaks Templat (*Template Directives* seperti `v-for`, `v-if`, `v-model`, `{ }`).  
Pengembang cukup mengubah nilai properti di dalam `state`, dan Vue secara otomatis mendeteksi perubahan tersebut lalu memperbarui DOM (*re-render*) secara efisien.

### 5. Mengapa `props` Tidak Boleh Diubah dari Dalam Komponent Anak?
Aliran data di Vue menganut prinsip **satu arah (*one-way data flow*)**. Jika komponen anak mengubah *props* yang dikirim dari komponen induk, status komponen induk dapat berubah secara implisit tanpa disadari oleh induk itu sendiri. Hal ini membuat aliran data sulit dilacak, memicu kaskade bug, dan Vue akan memberikan peringatan (*warning*) di konsol. Jika anak perlu mengubah data tersebut, ia harus menggunakan *state* bersama atau memancarkan acara (*emit event*) ke induk.

### 6. Beda `npm run dev` dan `npm run preview` & Kapan Memakainya
- **`npm run dev`**: Menjalankan server pengembangan lokal (*Vite Dev Server*) yang mendukung *Hot Module Replacement* (HMR). Digunakan **selama proses pengembangan kode** agar perubahan langsung terlihat tanpa memuat ulang seluruh halaman.
- **`npm run preview`**: Menjalankan server lokal untuk menguji dan mempratinjau hasil *build* produksi yang terdapat di dalam folder `dist/`. Digunakan **setelah melakukan `npm run build`** untuk memastikan bundel akhir aplikasi berjalan dengan benar sebelum disebarkan (*deploy*).

### 7. Mengapa `dist/` Diabaikan padahal Hasilnya yang Dijalankan di Produksi?
Folder `dist/` merupakan artefak hasil kompilasi/pembundelan yang dapat diproduksi ulang secara konsisten (*reproducible*) kapan saja hanya dengan menjalankan `npm run build`. Menyimpan folder `dist/` di repositori Git akan mengotori riwayat komit dengan berkas-berkas *hash* biner/minified yang sering berubah setiap kali *build* dilakukan.

---

## Deklarasi AI
Proyek ini dikerjakan secara mandiri dengan bantuan kecerdasan buatan untuk membantu *porting* komponen dan penyusunan struktur Vite Vue sesuai rubrik Worksheet P12.
