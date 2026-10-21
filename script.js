/* Nathan Nguyen — Portfolio
   Sticky-header shadow, active nav link, gentle scroll reveal. */
(function () {
  var header = document.querySelector('.site-header');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header shadow once the page scrolls
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  // Highlight the nav link for the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-pill a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.remove('is-active');
        a.removeAttribute('aria-current');
      });
      var link = byId[entry.target.id];
      if (link && !link.classList.contains('nav-cta')) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });

  // Reveal on scroll
  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  reveals.forEach(function (el) { revealObserver.observe(el); });
})();
