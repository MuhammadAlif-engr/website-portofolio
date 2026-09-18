// ─── Data: Hypertension Status Classification ─────────────────────
export default {
  // ─── Identifier ────────────────────────────────────────────────
  title: "Hypertension Status Classification",
  category: "Machine Learning",
  organisasi: "Tugas Akhir / Skripsi",
  tag: "2025",
  featured: false,
  tools: ["Python", "SHAP", "Random Forest"],

  // ─── Card ──────────────────────────────────────────────────────
  description:
    "Proyek pengembangan model machine learning untuk mengklasifikasikan status hipertensi berdasarkan dataset penelitian. Algoritma Random Forest digunakan untuk proses klasifikasi, sedangkan SHAP diterapkan untuk menginterpretasikan kontribusi setiap fitur terhadap hasil prediksi model.",

  // ─── Detail Project ────────────────────────────────────────────
  sections: [
    {
      title: "Aktivitas",
      type: "list",
      content: [
        "Mengolah dataset penelitian untuk kebutuhan klasifikasi status hipertensi",
        "Menerapkan algoritma Random Forest untuk membangun model klasifikasi",
        "Melakukan analisis terhadap fitur yang berkontribusi pada hasil prediksi",
        "Menggunakan SHAP untuk menginterpretasikan dan menjelaskan hasil model machine learning"
      ]
    },
    {
      title: "Result",
      type: "text",
      content:
        "Menghasilkan model klasifikasi status hipertensi menggunakan Random Forest serta interpretasi kontribusi fitur melalui SHAP untuk membantu memahami faktor yang memengaruhi hasil prediksi model."
    }
  ],

  // ─── Media ─────────────────────────────────────────────────────
  thumbnail: "assets/img/projects/ml/image.png",
  
  gallery: [
    {
      src: [
        "assets/img/projects/ml/image.png",
        "assets/img/projects/ml/AUCROC.png",
        "assets/img/projects/ml/shap1.png",
        "assets/img/projects/ml/shap2.png",
        "assets/img/projects/ml/shap3.png",

      ]
    }
  ],
};