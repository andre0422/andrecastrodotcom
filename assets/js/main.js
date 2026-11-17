(function () {
  'use strict';
  var STORAGE_KEY = 'darkModeEnabled';
  var DARK_CLASS = 'dark-mode';
  var TRANSITION_CLASS = 'theme-transition';
  var root = document.documentElement;

  function isDark() { return root.classList.contains(DARK_CLASS); }
  function toggles() { return document.querySelectorAll('[data-theme-toggle]'); }
  function syncToggles() { toggles().forEach(function (t) { t.checked = isDark(); }); }

  function setTheme(dark) {
    document.body.classList.add(TRANSITION_CLASS);
    root.classList.toggle(DARK_CLASS, dark);
    try { localStorage.setItem(STORAGE_KEY, String(dark)); } catch (e) { /* storage unavailable */ }
    syncToggles();
    window.setTimeout(function () { document.body.classList.remove(TRANSITION_CLASS); }, 300);
  }

  // Silent loops from the loop shortcode: play while half on screen, pause when not.
  // Never auto-play under reduced motion or Save-Data; a loop the user paused stays paused.
  function initLoops() {
    var loops = document.querySelectorAll('video[data-loop]');
    if (!loops.length || !('IntersectionObserver' in window)) { return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
    if (navigator.connection && navigator.connection.saveData) { return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          if (video.dataset.userPaused !== 'true') {
            var playing = video.play();
            if (playing && playing.catch) { playing.catch(function () { /* autoplay refused: poster and controls remain */ }); }
          }
        } else if (!video.paused) {
          video.dataset.autoPausing = 'true';
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    loops.forEach(function (video) {
      video.muted = true;
      video.addEventListener('pause', function () {
        if (video.dataset.autoPausing === 'true') { video.dataset.autoPausing = ''; return; }
        video.dataset.userPaused = 'true';
      });
      video.addEventListener('play', function () { video.dataset.userPaused = ''; });
      observer.observe(video);
    });
  }

  function init() {
    syncToggles();
    toggles().forEach(function (t) {
      t.addEventListener('change', function () { setTheme(t.checked); });
    });

    var menuToggle = document.getElementById('hamburger-toggle');
    var sideNav = document.getElementById('side-nav');
    if (menuToggle && sideNav) {
      sideNav.addEventListener('click', function (e) {
        if (e.target.closest('a')) { menuToggle.checked = false; }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuToggle.checked) {
          menuToggle.checked = false;
          menuToggle.focus();
        }
      });
    }

    initLoops();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
