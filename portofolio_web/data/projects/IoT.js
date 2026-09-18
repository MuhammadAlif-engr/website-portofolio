// ─── Data: Soil Quality Monitoring System ─────────────────────────
export default {
  // ─── Identifier ────────────────────────────────────────────────
  title: "Soil Quality Monitoring System",
  category: "Embedded Systems Developer",
  organisasi: "Proyek Akademik Individu",
  tag: "2024",
  featured: false,

  // ─── Card ──────────────────────────────────────────────────────
  description:
    "Proyek pengembangan sistem monitoring kualitas tanah berbasis ESP32 untuk mengukur parameter pH dan kelembapan tanah secara langsung. Sistem ini mengintegrasikan sensor pH tanah dan sensor kelembapan untuk memperoleh data kondisi tanah tanpa memerlukan pengecekan manual di lapangan.",
  tools: [
    "ESP32",
    "Sensor pH Tanah",
    "Sensor Kelembapan Tanah",
  ],

  // ─── Detail Project ────────────────────────────────────────────
  sections: [
    {
      title: "Aktivitas",
      type: "list",
      content: [
        "Mengembangkan sistem monitoring kualitas tanah menggunakan ESP32",
        "Mengintegrasikan sensor pH tanah dan sensor kelembapan tanah",
        "Mengakuisisi data kondisi tanah secara langsung melalui sensor",
        "Mengembangkan prototipe untuk mendukung pemantauan kondisi tanah"
      ]
    },
    {
      title: "Result",
      type: "text",
      content:
        "Menghasilkan prototipe fungsional yang dapat memantau parameter pH dan kelembapan tanah secara langsung, sehingga membantu mengurangi kebutuhan pengecekan kondisi tanah secara manual."
    }
  ],

  // ─── Media ─────────────────────────────────────────────────────
  thumbnail: "assets/img/projects/IoT/image.png",
  gallery: [
    {
      src: [
        "assets/img/projects/IoT/iot.mp4",
        "assets/img/projects/IoT/iot_2.mp4"
      ]
    }
  ],
};