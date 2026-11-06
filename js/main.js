/* =========================================================
   STUDIO — main.js
   Vanilla JavaScript only, zero external libraries. Each init
   guard-clauses missing elements so it is safe to load anywhere.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primaryNav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close after tapping a link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Smooth-scroll for in-page anchors ---------- */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    if (!links.length) return;
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });
        // move focus for a11y without a second jump
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- Work filter ---------- */
  function initWorkFilter() {
    var grid = document.getElementById("workGrid");
    if (!grid) return;
    var buttons = document.querySelectorAll(".filter");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".work-card"));
    var empty = document.getElementById("workEmpty");
    if (!buttons.length || !cards.length) return;

    function apply(filter) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        if (match) {
          card.hidden = false;
          shown++;
        } else {
          card.hidden = true;
        }
      });
      if (empty) empty.hidden = shown !== 0;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        apply(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Count-up stats ---------- */
  function initStatCounters() {
    var nums = document.querySelectorAll(".stat__num[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
      var start = null;
      var dur = 1400;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form (front-end validation) ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");

    function validateField(field) {
      var control = field.querySelector("input, select, textarea");
      if (!control) return true;
      var ok = control.checkValidity();
      field.classList.toggle("is-invalid", !ok);
      return ok;
    }

    form.querySelectorAll(".field").forEach(function (field) {
      var control = field.querySelector("input, select, textarea");
      if (!control) return;
      control.addEventListener("blur", function () { validateField(field); });
      control.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true;
      var firstBad = null;
      form.querySelectorAll(".field").forEach(function (field) {
        var ok = validateField(field);
        if (!ok && !firstBad) firstBad = field.querySelector("input, select, textarea");
        if (!ok) allOk = false;
      });

      if (!allOk) {
        if (firstBad) firstBad.focus();
        if (success) success.hidden = true;
        return;
      }

      form.reset();
      form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("is-invalid"); });
      if (success) {
        success.hidden = false;
        success.focus && success.setAttribute("tabindex", "-1");
      }
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();
    initWorkFilter();
    initScrollReveal();
    initStatCounters();
    initContactForm();
  });
})();
