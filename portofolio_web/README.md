# Technology Portfolio

Personal Technology Portfolio — menampilkan pengalaman teknologi informasi secara luas,
mencakup software applications, web applications, mobile applications, POS/kasir systems,
IoT systems, embedded systems, data analytics, database systems, automation, information systems,
dan berbagai project teknologi lainnya.

## Struktur Project

```
porto-V2/
├── index.html                  # Homepage utama
├── projects/
│   └── coffee-shop-sales.html  # Halaman detail project pertama
├── css/
│   ├── style.css               # Design system & core styles
│   ├── responsive.css          # Responsive layout
│   ├── animations.css          # Animation system
│   └── project-detail.css      # Styles untuk halaman detail project
├── js/
│   ├── main.js                 # Core application logic, project renderer
│   ├── navbar.js               # Floating navbar behavior
│   └── animations.js           # Scroll reveal & hero animations
├── data/
│   └── projects.js             # Data model project (schema fleksibel)
├── assets/
│   ├── images/
│   │   ├── profile/            # Foto profil pemilik
│   │   ├── projects/           # Thumbnail & screenshot project
│   │   └── certificates/       # Preview sertifikasi
│   ├── icons/                  # Favicon dan icons
│   └── cv/                     # File CV (PDF)
├── design.md                   # Spesifikasi desain
├── prd.md                      # Product requirements document
└── agent.md                    # Instruksi AI coding agent
```

## Cara Menjalankan Secara Lokal

Website ini adalah **static site** — tidak membutuhkan server, build tool, atau runtime khusus.

### Opsi 1: Live Server (VS Code)
1. Install ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) di VS Code
2. Klik kanan `index.html` → **Open with Live Server**

### Opsi 2: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

### Opsi 3: Node.js
```bash
npx serve .
```

### Opsi 4: Buka langsung di browser
Buka file `index.html` langsung di browser.
Catatan: Beberapa fungsi mungkin tidak bekerja karena CORS restriction pada `file://`.
Disarankan menggunakan Live Server.

## Placeholder yang Perlu Diisi

Ganti placeholder berikut dengan informasi pemilik yang sebenarnya:

| Placeholder | Keterangan |
|---|---|
| `[NAME]` | Nama pemilik portfolio |
| `[TITLE]` | Title profesional yang luas (contoh: "Technology Professional") |
| `[SHORT_INTRO]` | Kalimat perkenalan singkat |
| `[EMAIL]` | Alamat email profesional |
| `[LINKEDIN_URL]` | URL profil LinkedIn |
| `[GITHUB_URL]` | URL profil GitHub |
| `[CV_PATH]` | Path ke file CV (contoh: `assets/cv/nama-cv.pdf`) |
| `[WEBSITE_URL]` | URL website yang sudah deployed |

**Skills** — Section Skills berisi placeholder struktural. Isi dengan skill nyata pemilik.

**Experience** — Section Experience menggunakan placeholder. Isi dengan pengalaman profesional nyata.

**Certifications** — Section Certifications menggunakan placeholder. Tambahkan sertifikasi nyata yang dimiliki.

**About stats** — Stat values (—) perlu diisi dengan angka nyata (jumlah project, teknologi, tahun pengalaman).

## Menambahkan Project Baru

Edit file `data/projects.js` dan tambahkan object baru ke array `PROJECTS`.
Gunakan template komentar yang tersedia di bagian bawah file untuk panduan.

Kategori yang didukung:
- `Software`
- `Web`
- `Mobile`
- `POS`
- `IoT`
- `Data`
- `Automation`
- `Information System`
- `Other`

Buat halaman detail project baru di folder `projects/` dengan nama `[slug].html`.

## Teknologi

- HTML5
- CSS3 (Vanilla, tidak ada framework)
- Vanilla JavaScript (tidak ada library)
- Google Fonts (Manrope)
- SVG icons (inline)

## Deployment

Website dapat di-deploy ke platform static hosting:
- **Vercel** — `vercel --prod` atau connect GitHub repo
- **Netlify** — drag & drop folder atau connect GitHub repo
- **GitHub Pages** — enable di settings repo

Tidak ada build step yang diperlukan.
