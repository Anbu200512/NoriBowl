/* =========================================================
   NoriBowl — Gallery page
   Photo data, category chips, filtering, count.
   Lightbox itself lives in js/main.js (event-delegated).
   ========================================================= */
(function () {
  'use strict';

  var ITEMS = [
    /* Bowls */
    { src: 'assets/images/menu-tonkotsu-1.jpg', cat: 'bowls', alt: 'Hakata tonkotsu ramen with chashu and egg', h: 'h-56 sm:h-72' },
    { src: 'assets/images/menu-shoyu-2.jpg', cat: 'bowls', alt: 'Clear shoyu ramen finished with spring onion', h: 'h-48 sm:h-64' },
    { src: 'assets/images/menu-miso-3.jpg', cat: 'bowls', alt: 'Deep miso ramen with sweet corn and butter', h: 'h-56 sm:h-64' },
    { src: 'assets/images/menu-spicy-1.jpg', cat: 'bowls', alt: 'Spicy red miso bowl with chilli oil slick', h: 'h-48 sm:h-72' },
    { src: 'assets/images/menu-veg-2.jpg', cat: 'bowls', alt: 'Vegetarian ramen with mushrooms and greens', h: 'h-56 sm:h-72' },
    { src: 'assets/images/menu-dry-1.jpg', cat: 'bowls', alt: 'Mazesoba dry noodles tossed with tare', h: 'h-48 sm:h-64' },
    { src: 'assets/images/home-feature-1.jpg', cat: 'bowls', alt: 'Signature bowl photographed from above', h: 'h-56 sm:h-64' },
    { src: 'assets/images/home2-sig-1.jpg', cat: 'bowls', alt: 'House special ramen with thick-cut pork', h: 'h-48 sm:h-72' },
    /* Kitchen */
    { src: 'assets/images/home-broth-1.jpg', cat: 'kitchen', alt: 'Broth rolling in the stockpot at dawn', h: 'h-56 sm:h-72' },
    { src: 'assets/images/story-broth.jpg', cat: 'kitchen', alt: 'Stock simmering through the afternoon', h: 'h-48 sm:h-64' },
    { src: 'assets/images/story-noodles.jpg', cat: 'kitchen', alt: 'Fresh noodles cut and floured on the bench', h: 'h-56 sm:h-64' },
    { src: 'assets/images/story-ingredients.jpg', cat: 'kitchen', alt: 'Prepped ingredients lined up before service', h: 'h-48 sm:h-72' },
    { src: 'assets/images/home2-broth.jpg', cat: 'kitchen', alt: 'Ladle lifting broth from the pot', h: 'h-56 sm:h-72' },
    /* Room */
    { src: 'assets/images/home-atmosphere.jpg', cat: 'room', alt: 'The counter and open kitchen at NoriBowl', h: 'h-48 sm:h-64' },
    { src: 'assets/images/home2-atmosphere.jpg', cat: 'room', alt: 'Dining room glowing before the evening rush', h: 'h-56 sm:h-72' },
    { src: 'assets/images/story-gallery-1.jpg', cat: 'room', alt: 'Decorated dining corner of the ramen house', h: 'h-56 sm:h-64' },
    { src: 'assets/images/story-gallery-3.jpg', cat: 'room', alt: 'Guests seated in the main dining area', h: 'h-48 sm:h-72' },
    { src: 'assets/images/story-gallery-5.jpg', cat: 'room', alt: 'Table setting laid out before service', h: 'h-56 sm:h-72' },
    { src: 'assets/images/story-gallery-6.jpg', cat: 'room', alt: 'Lantern-lit street outside at night', h: 'h-48 sm:h-64' },
    { src: 'assets/images/contact-venue.jpg', cat: 'room', alt: 'Front of the restaurant on Harbour Road', h: 'h-56 sm:h-64' },
    /* People */
    { src: 'assets/images/story-chef-1.jpg', cat: 'people', alt: 'Kenji Nakamura, founder and head chef', h: 'h-56 sm:h-72' },
    { src: 'assets/images/story-chef-2.jpg', cat: 'people', alt: 'Daichi Ito, broth specialist, at the pot', h: 'h-48 sm:h-64' },
    { src: 'assets/images/story-chef-3.jpg', cat: 'people', alt: 'Haruto Aoki cutting the daily noodles', h: 'h-56 sm:h-64' },
    { src: 'assets/images/home2-chef.jpg', cat: 'people', alt: 'A cook plating up during service', h: 'h-48 sm:h-72' }
  ];

  var CATS = [
    { key: 'all', label: 'All Photos' },
    { key: 'bowls', label: 'Bowls' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'room', label: 'Room' },
    { key: 'people', label: 'People' }
  ];

  var state = { cat: 'all' };
  var grid = document.getElementById('galleryGrid');
  var chipsWrap = document.getElementById('galChips');
  var countEl = document.getElementById('galleryCount');
  var emptyEl = document.getElementById('galleryEmpty');
  if (!grid) return;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function chipClass(on) {
    return 'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ' +
      (on
        ? 'border-clay bg-clay text-white shadow-soft'
        : 'border-line bg-white text-stone-600 hover:border-clay/60 hover:text-clay dark:border-white/10 dark:bg-nightc dark:text-stone-300 dark:hover:text-gold');
  }

  function tile(it) {
    return '<button type="button" class="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl shadow-card" ' +
      'data-gal-cat="' + it.cat + '" data-lightbox="' + esc(it.src) + '" data-lightbox-alt="' + esc(it.alt) + '" ' +
      'aria-label="View photo: ' + esc(it.alt) + '">' +
      '<img src="' + it.src + '" alt="' + esc(it.alt) + '" loading="lazy" class="w-full ' + it.h + ' object-cover transition duration-500 group-hover:scale-105">' +
      '<span class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"></span>' +
      '<span class="pointer-events-none absolute inset-x-3 bottom-3 text-start text-xs font-semibold leading-snug text-white">' + esc(it.alt) + '</span>' +
      '<span class="pointer-events-none absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-soft transition group-hover:opacity-100 dark:bg-night/90 dark:text-cream">' +
      '<i data-lucide="expand" class="h-4 w-4"></i></span>' +
      '</button>';
  }

  function filtered() {
    return ITEMS.filter(function (it) { return state.cat === 'all' || it.cat === state.cat; });
  }

  function render() {
    var list = filtered();
    grid.innerHTML = list.map(tile).join('');
    if (countEl) countEl.textContent = list.length + (list.length === 1 ? ' photo' : ' photos');
    if (emptyEl) emptyEl.classList.toggle('hidden', list.length !== 0);
    grid.classList.toggle('hidden', list.length === 0);
    if (window.NB) NB.icons();
  }

  if (chipsWrap) {
    chipsWrap.innerHTML = CATS.map(function (c) {
      return '<button type="button" data-gal-cat-chip="' + c.key + '" class="' + chipClass(state.cat === c.key) + '">' + c.label + '</button>';
    }).join('');
    chipsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-gal-cat-chip]');
      if (!btn) return;
      state.cat = btn.getAttribute('data-gal-cat-chip');
      NB.$$('[data-gal-cat-chip]', chipsWrap).forEach(function (b) {
        b.className = chipClass(b === btn);
      });
      render();
    });
  }

  render();
})();
