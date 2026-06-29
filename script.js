/* ========================================
   Omar Mahmoud — Portfolio
   All interactions & animations
   ======================================== */

(function () {
  'use strict';

  /* ---------- Navbar Scroll ---------- */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var scrollThreshold = 60;
    window.addEventListener('scroll', function () {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ---------- Mobile Nav Toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll Spy ---------- */
  var spyLinks = document.querySelectorAll('.navbar__links a[data-section]');
  if (spyLinks.length) {
    var sections = [];
    spyLinks.forEach(function (link) {
      var id = link.getAttribute('data-section');
      var el = document.getElementById(id);
      if (el) sections.push({ el: el, link: link });
    });

    function updateSpy() {
      var scrollPos = window.scrollY + 100;
      var active = null;
      sections.forEach(function (s) {
        if (s.el.offsetTop <= scrollPos) active = s;
      });
      spyLinks.forEach(function (l) { l.classList.remove('active'); });
      if (active) active.link.classList.add('active');
    }

    window.addEventListener('scroll', updateSpy, { passive: true });
    updateSpy();
  }

  /* ---------- Hero Staggered Reveal ---------- */
  var heroItems = document.querySelectorAll('.hero [data-reveal]');
  if (heroItems.length) {
    heroItems.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.12) + 's';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroItems.forEach(function (el) { el.classList.add('visible'); });
      });
    });
  }

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal:not(.hero .reveal)');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Back Button Arrow Animation ---------- */
  var backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('mouseenter', function () {
      var arrow = backBtn.querySelector('.back-btn__arrow');
      if (arrow) arrow.style.transform = 'translateX(-4px)';
    });
    backBtn.addEventListener('mouseleave', function () {
      var arrow = backBtn.querySelector('.back-btn__arrow');
      if (arrow) arrow.style.transform = '';
    });
  }

  /* ---------- Mouse Glow ---------- */
  var mouseGlow = document.getElementById('mouseGlow');
  var heroSection = document.getElementById('hero');
  if (mouseGlow && heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      mouseGlow.classList.add('active');
      mouseGlow.style.background =
        'radial-gradient(400px circle at ' + x + 'px ' + y + 'px, rgba(29, 78, 216, 0.18), transparent 70%),' +
        'radial-gradient(80px circle at ' + x + 'px ' + y + 'px, rgba(99, 179, 255, 0.12), transparent 60%)';
    }, { passive: true });
    heroSection.addEventListener('mouseleave', function () {
      mouseGlow.classList.remove('active');
    });
  }

  /* ---------- Lightbox ---------- */
  (function initLightbox() {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox__close" aria-label="Close">&times;</button><img class="lightbox__img" src="" alt="">';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector('.lightbox__img');
    var lbClose = lightbox.querySelector('.lightbox__close');

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      });
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lbClose) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  })();

})();
