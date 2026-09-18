/**
 * navbar.js — Floating Navbar + Theme Toggle + Sliding Active Pill
 */
(function () {
  "use strict";

  // ─── Theme Toggle ─────────────────────────────────────────
  var THEME_KEY = "porto-theme";
  var html = document.documentElement;

  function getTheme() {
    return localStorage.getItem(THEME_KEY) ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }
  function applyTheme(t) {
    html.setAttribute("data-theme", t);
    localStorage.setItem(THEME_KEY, t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    var icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = t === "dark" ? "☀️" : "🌙";
  }

  applyTheme(getTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var cur = html.getAttribute("data-theme");
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    }

    // ─── Scroll State ──────────────────────────────────────
    var navbar = document.getElementById("navbar");
    if (!navbar) return;

    function onScroll() {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ─── Mobile Menu ───────────────────────────────────────
    var hamburger = document.getElementById("navbar-hamburger");
    var mobileMenu = document.getElementById("navbar-mobile-menu");
    var mobileLinks = document.querySelectorAll(".navbar__mobile-link");
    var menuOpen = false;

    function openMenu() {
      menuOpen = true;
      mobileMenu.classList.add("open");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = mobileMenu.querySelector(".navbar__mobile-link");
      if (first) setTimeout(function(){ first.focus(); }, 50);
    }
    function closeMenu() {
      menuOpen = false;
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      hamburger.focus();
    }

    if (hamburger) hamburger.addEventListener("click", function(){ menuOpen ? closeMenu() : openMenu(); });
    mobileLinks.forEach(function(l){ l.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape" && menuOpen) closeMenu(); });
    if (mobileMenu) mobileMenu.addEventListener("click", function(e){ if (e.target === mobileMenu) closeMenu(); });

    // ─── Sliding Active Pill ────────────────────────────────
    var pill = document.getElementById("nav-active-pill");
    var navEl = document.getElementById("navbar-nav");
    var navLinks = document.querySelectorAll(".navbar__link");

    function movePillTo(linkEl) {
      if (!pill || !navEl || !linkEl) return;
      var navRect = navEl.getBoundingClientRect();
      var linkRect = linkEl.getBoundingClientRect();
      pill.style.left = (linkRect.left - navRect.left) + "px";
      pill.style.width = linkRect.width + "px";
    }

    // Posisi awal pill ke link aktif pertama
    var initialActive = document.querySelector(".navbar__link.active");
    if (initialActive) {
      // Delay singkat agar layout settled
      setTimeout(function() { movePillTo(initialActive); }, 50);
    }

    // ─── Active Section ────────────────────────────────────
    var sections = document.querySelectorAll("section[id]");
    var currentActive = null;

    function setActiveLink(sectionId) {
      if (sectionId === currentActive) return;
      currentActive = sectionId;
      var activeLink = null;
      navLinks.forEach(function(l){
        var isActive = l.getAttribute("href") === "#" + sectionId;
        l.classList.toggle("active", isActive);
        if (isActive) activeLink = l;
      });
      mobileLinks.forEach(function(l){ l.classList.toggle("active", l.getAttribute("href") === "#" + sectionId); });
      if (activeLink) movePillTo(activeLink);
    }

    if (sections.length) {
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      sections.forEach(function(s){ obs.observe(s); });
    }

    // Reposisi pill saat resize
    window.addEventListener("resize", function(){
      var current = document.querySelector(".navbar__link.active");
      if (current) movePillTo(current);
    }, { passive: true });
  });
})();
