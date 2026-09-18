/**
 * animations.js — Scroll Reveal, Hero Entrance, Back-to-Top
 */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    // ─── Hero Entrance ──────────────────────────────────────
    var hero = document.querySelector(".hero");
    if (hero) {
      if (!reduced) {
        requestAnimationFrame(function(){ hero.classList.add("hero-animated"); });
      } else {
        hero.querySelectorAll(".hero__eyebrow,.hero__greeting,.hero__name,.hero__title,.hero__desc,.hero__actions,.hero__social,.hero__photo-wrap")
          .forEach(function(el){ el.style.opacity="1"; el.style.transform="none"; });
      }
    }

    // ─── Scroll Reveal ──────────────────────────────────────
    var revealEls = document.querySelectorAll(".reveal");
    var staggerContainers = document.querySelectorAll(".reveal-stagger");

    if (!reduced) {
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){ e.target.classList.add("visible"); obs.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -80px 0px", threshold: 0.1 });
      revealEls.forEach(function(el){ obs.observe(el); });

      var staggerObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){
            e.target.querySelectorAll(":scope > *").forEach(function(c){ c.classList.add("visible"); });
            staggerObs.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -60px 0px", threshold: 0.05 });
      staggerContainers.forEach(function(c){ staggerObs.observe(c); });
    } else {
      revealEls.forEach(function(el){ el.classList.add("visible"); });
      staggerContainers.forEach(function(c){
        c.querySelectorAll(":scope > *").forEach(function(ch){ ch.classList.add("visible"); });
      });
    }

    // ─── Back to Top ────────────────────────────────────────
    var btn = document.getElementById("back-to-top");
    if (btn) {
      window.addEventListener("scroll", function(){
        btn.classList.toggle("visible", window.scrollY > 400);
      }, { passive: true });
      btn.addEventListener("click", function(){
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      });
    }

  });
})();
