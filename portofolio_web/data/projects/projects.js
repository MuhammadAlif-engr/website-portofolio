/**
 * projects.js — Configuration & Entry Point for Projects Data
 * Technology Portfolio
 */

// 1. Import file-file project di sini
import coffeeShop from './coffee-shop-sales.js';
import IoT from './IoT.js';
import sistemKasir from './sistem-kasir.js';
import skripsiML from './skripsi-ML.js';

// 2. Masukkan ke dalam array PROJECTS
export const PROJECTS = [
  coffeeShop,
  IoT,
  sistemKasir,
  skripsiML,
];

/**
 * Metadata kategori — untuk filter, badge, dan styling UI.
 * Tambahkan entri baru di sini ketika kategori baru dibutuhkan.
 */
export const PROJECT_CATEGORIES = {
  All: { label: "All Projects", color: null },
  Software: { label: "Software", color: "var(--cat-software)" },
  Web: { label: "Web", color: "var(--cat-web)" },
  Mobile: { label: "Mobile", color: "var(--cat-mobile)" },
  POS: { label: "POS / Cashier", color: "var(--cat-pos)" },
  IoT: { label: "IoT", color: "var(--cat-iot)" },
  Data: { label: "Data", color: "var(--cat-data)" },
  Automation: { label: "Automation", color: "var(--cat-automation)" },
  "Information System": { label: "Information System", color: "var(--cat-infosys)" },
  Other: { label: "Other", color: "var(--cat-other)" },
};
