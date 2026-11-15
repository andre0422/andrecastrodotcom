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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
