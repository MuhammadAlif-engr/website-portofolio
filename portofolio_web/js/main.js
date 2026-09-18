/**
 * main.js — Project Grid, Filter, Modal (Updated UI)
 */
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects/projects.js';
import heroData from '../data/hero.js';
import aboutData from '../data/about.js';
import skillsData from '../data/skills.js';
import contactData from '../data/contact.js';

"use strict";

// ─── Smooth Scroll ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var id = this.getAttribute("href");
    if (id === "#") return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: top, behavior: window.matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function () {

  // Footer Year
  var yr = document.getElementById("footer-year");
  if (yr) yr.textContent = new Date().getFullYear();

  // ─── Render Data Utama (Non-Project) ─────────────────────
  if (typeof heroData !== "undefined") {
    setEl("hero-greeting", heroData.greeting);
    setEl("hero-name", heroData.name);
    setEl("hero-desc", heroData.description);
    var typedText = document.getElementById("hero-typed-text");
    if (typedText && heroData.titles) {
      var titles = heroData.titles;
      var ci = 0, li = 0, deleting = false, paused = false;
      typedText.textContent = "";
      function tick() {
        if (paused) { setTimeout(tick, 1500); paused = false; return; }
        var word = titles[ci];
        if (deleting) {
          typedText.textContent = word.substring(0, li--);
          if (li < 0) { deleting = false; ci = (ci + 1) % titles.length; li = 0; }
          setTimeout(tick, 65);
        } else {
          typedText.textContent = word.substring(0, li++);
          if (li > word.length) { deleting = true; paused = true; li = word.length; }
          setTimeout(tick, li === word.length ? 1500 : 90);
        }
      }
      setTimeout(tick, 1200);
    }

    var btnPrimary = document.getElementById("hero-btn-primary");
    if (btnPrimary && heroData.buttons) {
      btnPrimary.textContent = heroData.buttons.primary.text;
      btnPrimary.setAttribute("href", heroData.buttons.primary.url);
    }
    var btnSecondary = document.getElementById("hero-btn-secondary");
    if (btnSecondary && heroData.buttons) {
      btnSecondary.textContent = heroData.buttons.secondary.text;
      btnSecondary.setAttribute("href", heroData.buttons.secondary.url);
    }
    if (heroData.photo) {
      var photoCont = document.getElementById("hero-photo-container");
      if (photoCont) photoCont.innerHTML = '<img src="' + esc(heroData.photo) + '" alt="' + esc(heroData.name) + '" style="width:100%; height:100%; object-fit:cover; object-position:center top; border-radius:50%;" />';
    }
  }

  if (typeof contactData !== "undefined" && Array.isArray(contactData)) {
    var getContact = function (name) {
      var found = contactData.filter(function (c) { return c.name === name; });
      return found.length ? found[0] : null;
    };

    var emailObj = getContact("Email");
    var linkedinObj = getContact("LinkedIn");
    var githubObj = getContact("GitHub");

    // Contact Section Array rendering
    var contactLinksCont = document.getElementById("contact-links-container");
    if (contactLinksCont) {
      contactLinksCont.innerHTML = contactData.map(function (link) {
        var isClickable = !!link.url;
        var targetAttr = ' target="_blank" rel="noopener noreferrer"';

        var valueHtml = isClickable
          ? '<a href="' + esc(link.url) + '" ' + targetAttr + ' class="contact__link-value">' + esc(link.value) + '</a>'
          : '<span class="contact__link-value" style="pointer-events: none; text-decoration: none;">' + esc(link.value) + '</span>';

        return '<div class="glass-card contact__link' + (!isClickable ? ' contact__link--static' : '') + '" style="' + (!isClickable ? 'cursor: default;' : '') + '">' +
          '<div class="contact__link-icon" aria-hidden="true">' +
          '<img src="' + esc(link.icon) + '" alt="' + esc(link.name) + '" style="width:24px; height:24px; object-fit:contain;" />' +
          '</div>' +
          '<div class="contact__link-text" style="display:flex; flex-direction:column; align-items:flex-start;">' +
          '<span class="contact__link-label" style="font-size:1.1rem; color:var(--text-primary); font-weight:var(--fw-bold);">' + esc(link.name) + '</span>' +
          valueHtml +
          '</div>' +
          '</div>';
      }).join("");
    }

    if (document.getElementById("about-btn-cv")) document.getElementById("about-btn-cv").setAttribute("href", "cv.html");

    if (typeof heroData !== "undefined") {
      setEl("footer-b-name", heroData.name);
      setEl("footer-copy-name", heroData.name);
    }
  }

  if (typeof aboutData !== "undefined") {
    // Photo bind — hanya ganti konten .about__photo-placeholder dengan <img>
    var aboutPhotoWrap = document.querySelector(".about__photo-wrap");
    if (aboutPhotoWrap && aboutData.photo) {
      aboutPhotoWrap.innerHTML = '<img src="' + aboutData.photo + '" alt="Foto Profil" class="about__photo" style="aspect-ratio:3/4; border-radius:var(--radius-xl); object-fit:cover; object-position:center top; width:100%;" />';
    }

    var pCont = document.getElementById("about-paragraphs-container");
    if (pCont) {
      var pHTML = '<p class="about__text reveal reveal-delay-1"><span class="about__highlight">' +
        (aboutData.highlight || '') + '</span>' +
        (aboutData.paragraphs && aboutData.paragraphs.length > 0 ? ' — ' + aboutData.paragraphs[0] : '') +
        '</p>';
      if (aboutData.paragraphs && aboutData.paragraphs.length > 1) {
        for (var i = 1; i < aboutData.paragraphs.length; i++) {
          pHTML += '<p class="about__text reveal reveal-delay-2">' + aboutData.paragraphs[i] + '</p>';
        }
      }
      pCont.innerHTML = pHTML;

      // Trigger reveal observer untuk elemen baru yang ditambahkan secara dinamis
      pCont.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }

  }

  if (typeof skillsData !== "undefined") {
    var skCont = document.getElementById("skills-container");
    if (skCont) {
      skCont.innerHTML = skillsData.map(function (skill) {
        return '<div class="skill-card">' +
          '<div class="skill-card__top">' +
          '<img src="' + esc(skill.icon) + '" alt="' + esc(skill.name) + '" class="skill-card__icon" loading="lazy" />' +
          '</div>' +
          '<div class="skill-card__bottom">' +
          '<div class="skill-card__cat">' + esc(skill.category) + '</div>' +
          '<h3 class="skill-card__name">' + esc(skill.name) + '</h3>' +
          '</div>' +
          '</div>';
      }).join("");
    }
  }

  // ─── Render Projects ─────────────────────────────────────────
  if (typeof PROJECTS === "undefined" || typeof PROJECT_CATEGORIES === "undefined") return;

  // ─── Normalize Projects Data ─────────────────────────────────
  if (PROJECTS && PROJECTS.length) {
    PROJECTS.forEach(function (p) {
      if (p.gallery && Array.isArray(p.gallery)) {
        var flatGallery = [];
        p.gallery.forEach(function(item) {
          if (typeof item === 'string') flatGallery.push({ src: item });
          else if (item && item.src && Array.isArray(item.src)) {
            item.src.forEach(function(s) { flatGallery.push({ src: s }); });
          }
          else if (item && item.src) flatGallery.push(item);
        });
        p.gallery = flatGallery;
      }
      var raw = p.category ? String(p.category).trim() : "Lainnya";
      p.category = raw.toLowerCase().replace(/\b\w/g, function(c) { return c.toUpperCase(); });
    });
  }

  var grid = document.getElementById("projects-grid");
  var filterWrap = document.getElementById("portfolio-filter");
  if (!grid) return;

  // ─── Filter ───────────────────────────────────────────────
  if (filterWrap) {
    var catCounts = {};
    PROJECTS.forEach(function (p) {
      catCounts[p.category] = (catCounts[p.category] || 0) + 1;
    });
    var uniqueCats = Object.keys(catCounts).sort(function (a, b) {
      return catCounts[b] - catCounts[a];
    });
    var cats = ["All"].concat(uniqueCats);
    filterWrap.innerHTML = "";
    cats.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "filter-btn" + (cat === "All" ? " active" : "");
      btn.setAttribute("aria-pressed", cat === "All" ? "true" : "false");
      btn.textContent = cat === "All" ? "Semua" : cat;
      btn.addEventListener("click", function () {
        filterWrap.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
        renderGrid(cat);
      });
      filterWrap.appendChild(btn);
    });
  }
  renderGrid("All");

  function renderGrid(cat) {
    var items = cat === "All" ? PROJECTS : PROJECTS.filter(function (p) { return p.category === cat; });
    grid.innerHTML = "";
    if (!items.length) { grid.innerHTML = '<p style="color:var(--text-secondary);padding:2rem 0;">Belum ada project dalam kategori ini.</p>'; return; }
    items.forEach(function (p, i) {
      var card = buildCard(p);
      var reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      if (!reduced) {
        card.style.cssText = "opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .4s ease;transition-delay:" + (i * 70) + "ms";
        grid.appendChild(card);
        requestAnimationFrame(function () { requestAnimationFrame(function () { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }); });
      } else { grid.appendChild(card); }
    });
  }

  // ─── Modal ────────────────────────────────────────────────
  var overlay = document.getElementById("modal-overlay");
  var modalEl = document.getElementById("project-modal");
  var closeBtn = document.getElementById("modal-close");
  var lastFocused;

  function openModal(p) {
    lastFocused = document.activeElement;
    fillModal(p);
    overlay.classList.add("open");
    document.body.classList.add("modal-open");
    setTimeout(function () { if (closeBtn) closeBtn.focus(); }, 60);
  }
  function closeModal() {
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay && overlay.classList.contains("open")) closeModal(); });

  function fillModal(p) {
    setEl("modal-title", p.title);

    var org = p.organisasi || p.organization || "";
    var tagStr = p.tag || p.period || p.year || "";
    var metaText = [];
    if (org) metaText.push(esc(org));
    if (tagStr) metaText.push(esc(tagStr));

    var meta = document.getElementById("modal-meta");
    if (meta) meta.innerHTML = '<span style="color: var(--accent);font-weight:700;font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:0.05em;">' + metaText.join(' | ') + '</span>';

    // Gallery — Slider jika > 2 gambar, grid jika 1-2 gambar
    var galleryGrid = document.getElementById("modal-gallery-grid");
    if (galleryGrid) {
      if (p.gallery && p.gallery.length) {
        if (p.gallery.length > 2) {
          galleryGrid.className = "modal-gallery-scroll";
          galleryGrid.innerHTML = p.gallery.map(function (img) {
            var isVideo = img.src.match(/\.(mp4|webm|ogg)$/i);
            var media = isVideo 
              ? '<video src="' + esc(img.src) + '" autoplay loop muted playsinline controls></video>'
              : '<img src="' + esc(img.src) + '" loading="lazy" />';
            return '<figure class="modal-gallery-scroll__item">' + media + '</figure>';
          }).join("");
        } else {
          galleryGrid.className = "modal-image-grid";
          galleryGrid.innerHTML = p.gallery.map(function (img) {
            var isVideo = img.src.match(/\.(mp4|webm|ogg)$/i);
            return isVideo
              ? '<video src="' + esc(img.src) + '" autoplay loop muted playsinline controls></video>'
              : '<img src="' + esc(img.src) + '" loading="lazy" />';
          }).join("");
        }
        galleryGrid.style.display = "";
      } else if (p.thumbnail) {
        galleryGrid.className = "modal-image-grid";
        var isVideo = (p.thumbnail || "").match(/\.(mp4|webm|ogg)$/i);
        galleryGrid.innerHTML = isVideo
          ? '<video src="' + esc(p.thumbnail) + '" autoplay loop muted playsinline controls style="grid-column: 1 / -1; max-height: 400px; width: 100%; object-fit: contain;"></video>'
          : '<img src="' + esc(p.thumbnail) + '" loading="lazy" style="grid-column: 1 / -1; max-height: 400px; object-fit: contain;" />';
        galleryGrid.style.display = "";
      } else {
        galleryGrid.style.display = "none";
      }
    }

    var modalBody = document.getElementById("modal-body");
    if (modalBody) {
      modalBody.innerHTML = ""; // Bersihkan isi modal body

      if (p.description) {
        var descWrap = document.createElement("div");
        descWrap.className = "modal-section";
        var descTitle = document.createElement("p");
        descTitle.className = "modal__section-title";
        descTitle.textContent = "Deskripsi";
        var descText = document.createElement("p");
        descText.className = "modal__text";
        descText.textContent = p.description;
        descWrap.appendChild(descTitle);
        descWrap.appendChild(descText);
        modalBody.appendChild(descWrap);

        if (p.sections && p.sections.length > 0) {
          var divider = document.createElement("div");
          divider.className = "modal__divider";
          modalBody.appendChild(divider);
        }
      }

      if (p.sections && p.sections.length > 0) {
        p.sections.forEach(function (sec, idx) {
          var wrap = document.createElement("div");
          wrap.className = "modal-section";

          // Title
          var titleEl = document.createElement("p");
          titleEl.className = "modal__section-title";
          titleEl.textContent = sec.title;
          wrap.appendChild(titleEl);

          // Content based on type
          if (sec.type === "list") {
            var ul = document.createElement("ul");
            ul.className = "modal__list";
            (sec.content || []).forEach(function (liText) {
              var li = document.createElement("li");
              li.textContent = liText;
              ul.appendChild(li);
            });
            wrap.appendChild(ul);
          }
          else if (sec.type === "metrics") {
            var grid = document.createElement("div");
            grid.className = "modal__metrics";
            (sec.content || []).forEach(function (m) {
              var d = document.createElement("div"); d.className = "modal__metric";
              d.innerHTML = '<div class="modal__metric-value">' + esc(m.value) + '</div><div class="modal__metric-label">' + esc(m.label) + '</div><div class="modal__metric-detail">' + esc(m.detail) + '</div>';
              grid.appendChild(d);
            });
            wrap.appendChild(grid);
          }
          else if (sec.type === "technology") {
            var ulTech = document.createElement("ul");
            ulTech.className = "modal__list";
            (sec.content || []).forEach(function (t) {
              var li = document.createElement("li");
              li.innerHTML = '<strong>' + esc(t.name) + '</strong>' + (t.purpose ? ' — ' + esc(t.purpose) : '');
              ulTech.appendChild(li);
            });
            wrap.appendChild(ulTech);
          }
          else { // type text
            var pEl = document.createElement("p");
            pEl.className = "modal__text";
            pEl.textContent = sec.content;
            wrap.appendChild(pEl);
          }

          modalBody.appendChild(wrap);

          // Add divider jika bukan section terakhir
          if (idx < p.sections.length - 1) {
            var divider = document.createElement("div");
            divider.className = "modal__divider";
            modalBody.appendChild(divider);
          }
        });
      }
    }

    if (modalEl) modalEl.scrollTop = 0;
  }

  // ─── Card Builder ─────────────────────────────────────────
  function buildCard(p) {
    var thumbSrc = "thumbnail" in p ? p.thumbnail : ((p.gallery && p.gallery[0] && p.gallery[0].src) || "");
    var fallbackHtml = '<span class="project-card__thumb-placeholder" style="font-size:4rem;" aria-hidden="true">' + catIcon(p.category) + '</span>';
    var safeFallback = fallbackHtml.replace(/"/g, "&quot;").replace(/'/g, "\\'");
    var thumbHTML = thumbSrc
      ? '<div class="project-card__thumb" style="width:100%; aspect-ratio:16/9; background:rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center; border-radius:var(--radius-lg) var(--radius-lg) 0 0; overflow:hidden;"><img src="' + esc(thumbSrc) + '" loading="lazy" style="width:100%; height:100%; object-fit:cover;" onerror="this.outerHTML=\'' + safeFallback + '\'" /></div>'
      : '<div class="project-card__thumb" style="width:100%; aspect-ratio:16/9; background:rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center; border-radius:var(--radius-lg) var(--radius-lg) 0 0; overflow:hidden;">' + fallbackHtml + '</div>';
    var toolsHTML = (p.tools || []).map(function (t) { return '<span class="badge badge--tool">' + esc(t) + '</span>'; }).join("");
    var card = document.createElement("article");
    card.className = "glass-card project-card";
    card.setAttribute("aria-label", "Project: " + p.title);
    card.style.cursor = "default"; // Matikan cursor pointer di card

    var period = p.tag || p.period || (p.year ? " " + p.year : "");
    var org = p.organisasi || p.organization || "Proyek Pribadi";

    card.innerHTML = thumbHTML +
      '<div class="project-card__body">' +
      '<div class="project-card__period">' + esc(period) + '</div>' +
      '<h3 class="project-card__title">' + esc(p.title) + '</h3>' +
      '<div class="project-card__org">' + esc(org) + '</div>' +
      '<p class="project-card__desc">' + esc(p.description) + '</p>' +
      '<button class="project-card__view-btn">Lihat Detail <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>' +
      (toolsHTML ? '<div class="project-card__tools">' + toolsHTML + '</div>' : '') +
      '</div>';

    var btn = card.querySelector(".project-card__view-btn");
    function open() { openModal(p); }
    if (btn) btn.addEventListener("click", function (e) { e.stopPropagation(); open(); });

    return card;
  }

  // helpers
  function setEl(id, v) { var e = document.getElementById(id); if (e) e.textContent = v || ""; }
  function catIcon(c) {
    var icons = { software: "💻", web: "🌐", mobile: "📱", pos: "🛒", iot: "🔌", data: "📊", automation: "⚙️", "information system": "🗂️" };
    return icons[(c || "").toLowerCase()] || "📁";
  }
  function esc(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }

});

