// ─── Data: Offline Flutter POS Application ────────────────────────
const img = "assets/img/projects/apk_kasir/";

export default {
  // ─── Identifier ────────────────────────────────────────────────
  title: "Offline Flutter POS Application",
  category: "Mobile Developer",
  organisasi: "Proyek Kerja Praktik",
  tag: "2025",
  featured: true,
  tools: ["Flutter", "Dart", "SQLite"],

  // ─── Card ──────────────────────────────────────────────────────
  description:
    "Proyek pengembangan aplikasi kasir offline berbasis Flutter untuk membantu mitra bisnis menggantikan pencatatan transaksi manual. Aplikasi menyediakan fitur manajemen produk, pencatatan transaksi, dan laporan penjualan dengan penyimpanan data menggunakan SQLite tanpa memerlukan koneksi internet.",

  // ─── Detail Project ────────────────────────────────────────────
  sections: [
    {
      title: "Aktivitas",
      type: "list",
      content: [
        "Mengembangkan aplikasi kasir offline menggunakan Flutter dan Dart",
        "Membangun fitur manajemen produk dan pencatatan transaksi penjualan",
        "Merancang dan mengimplementasikan database SQLite untuk penyimpanan data lokal",
        "Mengembangkan fitur laporan penjualan untuk membantu pemantauan transaksi",
        "Mengimplementasikan aplikasi untuk mendukung aktivitas transaksi mitra bisnis"
      ]
    },
    {
      title: "Result",
      type: "text",
      content:
        "Menghasilkan aplikasi kasir offline yang digunakan oleh mitra bisnis untuk memproses transaksi penjualan dan mengelola data produk tanpa bergantung pada koneksi internet."
    }
  ],

  // ─── Media ─────────────────────────────────────────────────────
  thumbnail: img + "login.png",
  gallery: [
    {
      src: [
        img + "login.png",
        img + "dasbor.png",
        img + "produk.png",
        img + "transaksi.png",
        img + "dft_pesanan.png",
        img + "laporan.png",
      ]
    }
  ],
};