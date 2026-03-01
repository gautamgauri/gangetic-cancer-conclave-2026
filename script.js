(function () {
  'use strict';

  function initNavbar() {
    var toggle = document.querySelector('.navbar-mobile-toggle');
    var menu = document.querySelector('.navbar-mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('open')) return;
      if (!e.target.closest('.navbar-inner')) {
        menu.classList.remove('open');
      }
    });
  }

  function initHeroScrollButtons() {
    var buttons = document.querySelectorAll('[data-scroll-target]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-scroll-target');
        if (!targetId) return;
        var el = document.getElementById(targetId);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initModals() {
    var openButtons = document.querySelectorAll('[data-open-modal]');
    var closeSelectors = '[data-close-modal]';

    function openModal(id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      modal.removeAttribute('hidden');
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.setAttribute('hidden', '');
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-open-modal');
        if (!id) return;
        openModal(id);
      });
    });

    document.addEventListener('click', function (e) {
      var closeTrigger = e.target.closest(closeSelectors);
      if (closeTrigger) {
        var modal = closeTrigger.closest('.modal');
        closeModal(modal);
        return;
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var modals = document.querySelectorAll('.modal:not([hidden])');
      modals.forEach(function (modal) {
        closeModal(modal);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try {
      initNavbar();
      initHeroScrollButtons();
      initModals();
    } catch (e) {
      console.error('Initialization error', e);
    }
  });
})();
