/* =========================================================
   Magic Bakery - interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  var store = {
    get: function (key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
    }
  };

  /* ---------- Mobile navigation ---------- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var savedTheme = store.get("mb-theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      store.set("mb-theme", next);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = (index % 4) * 70 + "ms";
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  /* ---------- Best sellers slider ---------- */
  var slider = document.getElementById("slider");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  function stepSize() {
    var card = slider.querySelector(".product");
    if (!card) { return slider.clientWidth; }
    var gap = parseInt(window.getComputedStyle(slider).columnGap || "20", 10) || 20;
    return card.getBoundingClientRect().width + gap;
  }

  function updateArrows() {
    if (!prevBtn || !nextBtn) { return; }
    var maxScroll = slider.scrollWidth - slider.clientWidth - 2;
    prevBtn.disabled = slider.scrollLeft <= 2;
    nextBtn.disabled = slider.scrollLeft >= maxScroll;
    prevBtn.style.opacity = prevBtn.disabled ? "0.45" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.45" : "1";
  }

  if (slider && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function () {
      slider.scrollBy({ left: -stepSize(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      slider.scrollBy({ left: stepSize(), behavior: "smooth" });
    });
    slider.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  /* ---------- Add to cart feedback ---------- */
  document.querySelectorAll(".product__btn").forEach(function (button) {
    var original = button.textContent;
    button.addEventListener("click", function () {
      button.textContent = "Added";
      button.classList.add("is-added");
      window.setTimeout(function () {
        button.textContent = original;
        button.classList.remove("is-added");
      }, 1400);
    });
  });

  /* ---------- Newsletter form ---------- */
  var form = document.getElementById("subscribeForm");
  var note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = form.querySelector("#email");
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());

      if (!valid) {
        note.textContent = "That email looks off. Mind checking it again?";
        email.focus();
        return;
      }

      note.textContent = "You are on the list. Warm batch news lands every Friday.";
      form.reset();
    });
  }

  /* ---------- Misc ---------- */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  var play = document.querySelector(".play");
  if (play) {
    play.addEventListener("click", function () {
      play.setAttribute("aria-label", "Video coming soon");
      play.textContent = "Soon";
      play.style.fontSize = "13px";
    });
  }
})();
