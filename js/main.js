/* =========================================================
   NoriBowl – shared site behaviour
   Theme, direction, navigation, toasts, enquiry store,
   accordion, lightbox, reveal-on-scroll.
   ========================================================= */
(function () {
  'use strict';

  var THEME_KEY = 'noribowl_theme';
  var DIR_KEY = 'noribowl_direction';
  var ENQ_KEY = 'noribowl_enquiry';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------- Theme ---------------- */
  function currentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
  function applyTheme(next) {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('title', next === 'dark' ? 'Light mode' : 'Dark mode');
    });
  }

  /* ---------------- Direction ---------------- */
  function currentDir() {
    return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  }
  function applyDir(next) {
    document.documentElement.setAttribute('dir', next);
    try { localStorage.setItem(DIR_KEY, next); } catch (e) {}
    $$('[data-dir-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', next === 'rtl' ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
      btn.setAttribute('title', next === 'rtl' ? 'LTR' : 'RTL');
    });
  }

  /* ---------------- Toasts ---------------- */
  var toastWrap = null;
  function ensureToastWrap() {
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.id = 'nbToastWrap';
      toastWrap.setAttribute('role', 'status');
      toastWrap.setAttribute('aria-live', 'polite');
      toastWrap.className = 'pointer-events-none fixed bottom-4 end-4 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2';
      document.body.appendChild(toastWrap);
    }
    return toastWrap;
  }
  var ICONS = {
    success: 'check-circle-2',
    error: 'alert-circle',
    info: 'info'
  };
  var TONE = {
    success: 'text-emerald-400',
    error: 'text-red-400',
    info: 'text-gold'
  };
  function toast(message, type) {
    type = type || 'success';
    var wrap = ensureToastWrap();
    var el = document.createElement('div');
    el.className = 'pointer-events-auto flex items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-cream shadow-soft ring-1 ring-white/10 dark:bg-cream dark:text-ink dark:ring-black/10';
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity .25s ease, transform .25s ease';
    el.innerHTML =
      '<i data-lucide="' + (ICONS[type] || ICONS.info) + '" class="mt-0.5 h-5 w-5 shrink-0 ' + (TONE[type] || TONE.info) + '"></i>' +
      '<span class="flex-1">' + message + '</span>' +
      '<button type="button" class="-me-1 -mt-1 rounded-lg p-1 opacity-70 hover:opacity-100" aria-label="Dismiss notification">' +
      '<i data-lucide="x" class="h-4 w-4"></i></button>';
    wrap.appendChild(el);
    refreshIcons(el);
    var timer = setTimeout(remove, 4200);
    function remove() {
      clearTimeout(timer);
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 260);
    }
    el.querySelector('button').addEventListener('click', remove);
    return el;
  }

  /* ---------------- Icons ---------------- */
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (e) {}
    }
  }

  /* ---------------- Navigation ---------------- */
  function initNav() {
    var burger = $('#navToggle');
    var mobileMenu = $('#mobileMenu');

    function closeMobile() {
      if (!mobileMenu) return;
      mobileMenu.classList.add('hidden');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      refreshIcons(burger);
    }
    function toggleMobile() {
      if (!mobileMenu) return;
      var open = mobileMenu.classList.toggle('hidden');
      if (burger) burger.setAttribute('aria-expanded', String(!open));
      refreshIcons(burger);
      if (!open) closeDesktopDropdown();
    }

    if (burger) burger.addEventListener('click', function (e) { e.stopPropagation(); toggleMobile(); });

    /* Home submenu (mobile collapsible) */
    var subBtn = $('#mobileHomeBtn');
    var subPanel = $('#mobileHomePanel');
    if (subBtn && subPanel) {
      subBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var hidden = subPanel.classList.toggle('hidden');
        subBtn.setAttribute('aria-expanded', String(!hidden));
        var chev = subBtn.querySelector('[data-chevron]');
        if (chev) chev.style.transform = hidden ? '' : 'rotate(180deg)';
      });
    }

    /* Desktop dropdown */
    var ddWrap = $('[data-dropdown]');
    var ddBtn = $('#homeMenuBtn');
    var ddPanel = $('#homeMenuPanel');

    function openDesktopDropdown() {
      if (!ddPanel) return;
      ddPanel.classList.remove('hidden');
      ddBtn.setAttribute('aria-expanded', 'true');
    }
    function closeDesktopDropdown() {
      if (!ddPanel) return;
      ddPanel.classList.add('hidden');
      ddBtn.setAttribute('aria-expanded', 'false');
    }
    var ddPinned = false;
    if (ddBtn && ddPanel) {
      ddBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (ddPanel.classList.contains('hidden')) {
          openDesktopDropdown();
          ddPinned = true;
        } else if (ddPinned) {
          closeDesktopDropdown();
          ddPinned = false;
        } else {
          /* opened by hover only — click pins it open */
          ddPinned = true;
        }
      });
      if (ddWrap && window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) {
        ddWrap.addEventListener('mouseenter', openDesktopDropdown);
        ddWrap.addEventListener('mouseleave', function () { if (!ddPinned) closeDesktopDropdown(); });
      }
    }

    /* Close helpers */
    document.addEventListener('click', function (e) {
      if (ddPanel && !ddPanel.classList.contains('hidden') && !ddWrap.contains(e.target)) {
        ddPinned = false;
        closeDesktopDropdown();
      }
      if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== burger && !burger.contains(e.target)) closeMobile();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { ddPinned = false; closeDesktopDropdown(); closeMobile(); }
    });
    $$('#mobileMenu a').forEach(function (a) { a.addEventListener('click', closeMobile); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) closeMobile(); });

    /* Toggles */
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'); });
    });
    $$('[data-dir-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyDir(currentDir() === 'rtl' ? 'ltr' : 'rtl'); });
    });
  }

  /* ---------------- Enquiry store ---------------- */
  function getEnquiry() {
    try {
      var v = JSON.parse(localStorage.getItem(ENQ_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function setEnquiry(list) {
    try { localStorage.setItem(ENQ_KEY, JSON.stringify(list)); } catch (e) {}
    updateEnquiryBadge();
    document.dispatchEvent(new CustomEvent('nb:enquiry'));
  }
  function addEnquiry(item) {
    var list = getEnquiry();
    var exists = list.some(function (x) { return x.id === item.id; });
    if (!exists) { list.push(item); setEnquiry(list); }
    return { added: !exists, count: list.length };
  }
  function removeEnquiry(id) {
    setEnquiry(getEnquiry().filter(function (x) { return x.id !== id; }));
  }
  function clearEnquiry() { setEnquiry([]); }
  function updateEnquiryBadge() {
    var n = getEnquiry().length;
    $$('[data-enq-badge]').forEach(function (el) {
      el.textContent = String(n);
      el.classList.toggle('hidden', n === 0);
    });
  }
  window.addEventListener('storage', function (e) {
    if (e.key === ENQ_KEY) updateEnquiryBadge();
    if (e.key === THEME_KEY && (e.newValue === 'dark' || e.newValue === 'light')) applyTheme(e.newValue);
    if (e.key === DIR_KEY && (e.newValue === 'rtl' || e.newValue === 'ltr')) applyDir(e.newValue);
  });

  /* ---------------- Accordion ---------------- */
  function initAccordions() {
    $$('[data-accordion]').forEach(function (item) {
      var btn = item.querySelector('[data-accordion-trigger]');
      var panel = item.querySelector('[data-accordion-panel]');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var hidden = panel.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(!hidden));
        var chev = btn.querySelector('[data-chevron]');
        if (chev) chev.style.transform = hidden ? '' : 'rotate(180deg)';
      });
    });
  }

  /* ---------------- Lightbox ---------------- */
  function initLightbox() {
    var overlay = $('#nbLightbox');
    if (!overlay) return;
    var img = $('#nbLightboxImg');
    var cap = $('#nbLightboxCap');
    var idx = 0;
    var list = [];

    /* Re-queried each time so dynamically rendered or filtered tiles work */
    function visibleTriggers() {
      return $$('[data-lightbox]').filter(function (t) { return t.getClientRects().length > 0; });
    }

    function show(i) {
      list = visibleTriggers();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      var src = list[idx].getAttribute('data-lightbox');
      var alt = list[idx].getAttribute('data-lightbox-alt') || '';
      img.src = src; img.alt = alt;
      cap.textContent = alt;
      overlay.classList.remove('hidden');
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      var closeBtn = $('#nbLightboxClose');
      if (closeBtn) closeBtn.focus();
    }
    function hide() {
      overlay.classList.add('hidden');
      overlay.style.display = '';
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-lightbox]');
      if (!t || !document.contains(t)) return;
      list = visibleTriggers();
      var i = list.indexOf(t);
      if (i !== -1) show(i);
    });
    $('#nbLightboxClose').addEventListener('click', hide);
    $('#nbLightboxPrev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    $('#nbLightboxNext').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.hasAttribute('data-lightbox-backdrop')) hide();
    });
    document.addEventListener('keydown', function (e) {
      if (overlay.classList.contains('hidden')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  /* ---------------- Misc ---------------- */
  function initYear() {
    $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  /* ---------------- Footer ---------------- */
  function initFooter() {
    $$('[data-back-to-top]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ---------------- Public API ---------------- */
  window.NB = {
    $: $, $$: $$,
    toast: toast,
    theme: { get: currentTheme, set: applyTheme },
    dir: { get: currentDir, set: applyDir },
    enquiry: {
      get: getEnquiry, add: addEnquiry, remove: removeEnquiry, clear: clearEnquiry,
      count: function () { return getEnquiry().length; }
    },
    icons: refreshIcons
  };

  function init() {
    applyTheme(currentTheme());
    applyDir(currentDir());
    initNav();
    initAccordions();
    initLightbox();
    initReveal();
    initYear();
    initFooter();
    updateEnquiryBadge();
    refreshIcons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
