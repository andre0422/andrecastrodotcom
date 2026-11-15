(function () {
  try {
    if (localStorage.getItem('darkModeEnabled') === 'true') {
      document.documentElement.classList.add('dark-mode');
    }
  } catch (e) { /* storage unavailable: stay light */ }
})();
