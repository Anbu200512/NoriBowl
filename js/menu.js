/* =========================================================
   NoriBowl – menu page
   Data, rendering, filters, search, sorting,
   detail modal, add-to-enquiry.
   ========================================================= */
(function () {
  'use strict';
  if (!document.getElementById('menuGrid')) return;

  var ITEMS = [
    /* ---------- Tonkotsu ---------- */
    {
      id: 'tk-1', cat: 'tonkotsu', price: 16.5, img: 'assets/images/menu-tonkotsu-1.jpg',
      name: 'Hakata Classic Tonkotsu',
      desc: 'Our signature milky pork broth simmered for eighteen hours, finished with char siu and a jammy egg.',
      ing: ['18-hour pork broth', 'thin straight noodles', 'char siu pork', 'ajitama egg', 'spring onion', 'nori'],
      tags: ['signature']
    },
    {
      id: 'tk-2', cat: 'tonkotsu', price: 17.5, img: 'assets/images/menu-tonkotsu-2.jpg',
      name: 'Pork Belly Cream Tonkotsu',
      desc: 'Extra-rich tonkotsu crowned with torch-seared pork belly, garlic oil and buttery stir-fried greens.',
      ing: ['pork bone broth', 'wavy noodles', 'pork belly', 'stir-fried greens', 'garlic oil', 'crispy onion'],
      tags: ['signature']
    },
    {
      id: 'tk-3', cat: 'tonkotsu', price: 18.5, img: 'assets/images/menu-tonkotsu-3.jpg',
      name: 'Hakata Special Tonkotsu',
      desc: 'The full works: double char siu, mayu black garlic oil, bamboo shoots and a soft-boiled egg.',
      ing: ['pork bone broth', 'thin noodles', 'double char siu', 'mayu garlic oil', 'menma', 'ajitama egg'],
      tags: ['signature']
    },
    {
      id: 'tk-4', cat: 'tonkotsu', price: 18.0, img: 'assets/images/menu-tonkotsu-4.jpg',
      name: 'Ebi Tonkotsu',
      desc: 'Shellfish sweetness folded into our pork broth with grilled prawns and a yuzu-bright finish.',
      ing: ['pork & prawn broth', 'thin noodles', 'grilled prawns', 'yuzu zest', 'nori', 'spring onion'],
      tags: []
    },
    /* ---------- Shoyu ---------- */
    {
      id: 'sy-1', cat: 'shoyu', price: 15.5, img: 'assets/images/menu-shoyu-1.jpg',
      name: 'Chashu Shoyu Ramen',
      desc: 'Clear chicken-and-dashi broth seasoned with our three-year aged shoyu and melt-in-mouth chashu.',
      ing: ['aged shoyu tare', 'chicken dashi', 'chashu slices', 'wavy noodles', 'nori', 'menma'],
      tags: ['signature']
    },
    {
      id: 'sy-2', cat: 'shoyu', price: 14.5, img: 'assets/images/menu-shoyu-2.jpg',
      name: 'Tokyo Classic Shoyu',
      desc: 'The everyday bowl of Tokyo: light, savoury and deeply aromatic with bamboo and bright scallion.',
      ing: ['shoyu tare', 'chicken & kombu broth', 'thin noodles', 'menma', 'scallion', 'nori'],
      tags: []
    },
    {
      id: 'sy-3', cat: 'shoyu', price: 16.0, img: 'assets/images/menu-shoyu-3.jpg',
      name: 'Niboshi Shoyu Ramen',
      desc: 'For the devoted: dried sardine stock brings a bold, smoky depth to the classic shoyu base.',
      ing: ['niboshi sardine stock', 'shoyu tare', 'thin noodles', 'fish cake', 'scallion', 'nori'],
      tags: []
    },
    {
      id: 'sy-4', cat: 'shoyu', price: 15.0, img: 'assets/images/menu-shoyu-4.jpg',
      name: 'Chicken Shoyu Ramen',
      desc: 'A lighter shoyu built on free-range chicken stock with roasted chicken chashu and tender greens.',
      ing: ['chicken broth', 'shoyu tare', 'roasted chicken', 'wavy noodles', 'bok choy', 'scallion'],
      tags: []
    },
    /* ---------- Miso ---------- */
    {
      id: 'ms-1', cat: 'miso', price: 16.0, img: 'assets/images/menu-miso-1.jpg',
      name: 'Butter Corn Miso Ramen',
      desc: 'Hokkaido comfort: hearty red miso broth with sweet corn, melting butter and crunchy bean sprouts.',
      ing: ['red miso tare', 'pork & chicken broth', 'sweet corn', 'butter', 'bean sprouts', 'wavy noodles'],
      tags: ['signature']
    },
    {
      id: 'ms-2', cat: 'miso', price: 16.5, img: 'assets/images/menu-miso-2.jpg',
      name: 'Cheese Miso Ramen',
      desc: 'Rich white miso broth with a melt-in spoon of cheese, chilli threads and fragrant garlic oil.',
      ing: ['white miso tare', 'pork broth', 'melted cheese', 'chilli threads', 'garlic oil', 'wavy noodles'],
      tags: []
    },
    {
      id: 'ms-3', cat: 'miso', price: 16.0, img: 'assets/images/menu-miso-3.jpg',
      name: 'Chicken Miso Butter Ramen',
      desc: 'Savoury miso depth rounded with roasted chicken, a knob of butter and fresh scallion.',
      ing: ['miso tare', 'chicken broth', 'roasted chicken', 'butter', 'scallion', 'wavy noodles'],
      tags: []
    },
    {
      id: 'ms-4', cat: 'miso', price: 15.5, img: 'assets/images/menu-miso-4.jpg',
      name: 'Classic Red Miso Ramen',
      desc: 'Fermented red miso, ground pork and sesame come together in a robust, deeply savoury bowl.',
      ing: ['red miso tare', 'pork broth', 'seasoned mince', 'sesame', 'bean sprouts', 'wavy noodles'],
      tags: []
    },
    /* ---------- Spicy ---------- */
    {
      id: 'sp-1', cat: 'spicy', price: 17.0, img: 'assets/images/menu-spicy-1.jpg',
      name: 'Spicy Miso Ramen',
      desc: 'Kabo-chan style: red miso spiked with house chilli paste, garlic and a drizzle of fragrant rayu.',
      ing: ['spicy miso tare', 'pork broth', 'chilli paste', 'rayu oil', 'garlic', 'wavy noodles'],
      tags: ['spicy', 'heat-2']
    },
    {
      id: 'sp-2', cat: 'spicy', price: 16.5, img: 'assets/images/menu-spicy-2.jpg',
      name: 'Tantanmen',
      desc: 'Creamy sesame broth with seasoned mince, pok choy and a slow-building Sichuan heat.',
      ing: ['sesame broth', 'sesame paste', 'seasoned mince', 'pok choy', 'chilli oil', 'wavy noodles'],
      tags: ['spicy', 'heat-3']
    },
    {
      id: 'sp-3', cat: 'spicy', price: 18.0, img: 'assets/images/menu-spicy-3.jpg',
      name: 'Volcano Spicy Miso',
      desc: 'Our hottest bowl: volcanic red miso broth, crispy karaage chicken and a fistful of spring onion.',
      ing: ['volcanic chilli miso', 'pork broth', 'karaage chicken', 'chilli flakes', 'spring onion', 'wavy noodles'],
      tags: ['spicy', 'heat-3']
    },
    {
      id: 'sp-4', cat: 'spicy', price: 16.5, img: 'assets/images/menu-spicy-4.jpg',
      name: 'Seito Tan Tan Men',
      desc: 'Nutty tan tan broth with toasted sesame, mustard greens and a bright chilli kick.',
      ing: ['tan tan broth', 'toasted sesame', 'mustard greens', 'chilli oil', 'mince', 'wavy noodles'],
      tags: ['spicy', 'heat-2']
    },
    /* ---------- Vegetarian ---------- */
    {
      id: 'vg-1', cat: 'vegetarian', price: 15.0, img: 'assets/images/menu-veg-1.jpg',
      name: 'Ajitama Veggie Ramen',
      desc: 'Kombu-shiitake broth with seasonal greens, sweet corn and a slow-marinated ajitama egg.',
      ing: ['kombu-shiitake broth', 'seasonal greens', 'sweet corn', 'ajitama egg', 'nori', 'wavy noodles'],
      tags: ['veg']
    },
    {
      id: 'vg-2', cat: 'vegetarian', price: 15.5, img: 'assets/images/menu-veg-2.jpg',
      name: 'Kimchi Garden Ramen',
      desc: 'House kimchi stirred through a velour vegetable broth with tofu and crisp garden vegetables.',
      ing: ['vegetable broth', 'house kimchi', 'firm tofu', 'cabbage', 'scallion', 'wavy noodles'],
      tags: ['veg', 'spicy', 'heat-1']
    },
    {
      id: 'vg-3', cat: 'vegetarian', price: 15.5, img: 'assets/images/menu-veg-3.jpg',
      name: 'Pumpkin Miso Ramen',
      desc: 'Silky roasted pumpkin folded into white miso broth with toasted seeds and sesame.',
      ing: ['white miso broth', 'roasted pumpkin', 'toasted seeds', 'sesame', 'kale', 'wavy noodles'],
      tags: ['veg']
    },
    {
      id: 'vg-4', cat: 'vegetarian', price: 15.0, img: 'assets/images/menu-veg-4.jpg',
      name: 'Creamy Veggie Ramen',
      desc: 'A gentle, creamy vegetable broth with seasonal mushrooms, corn and a silky ajitama egg.',
      ing: ['creamy veg broth', 'seasonal mushrooms', 'sweet corn', 'ajitama egg', 'scallion', 'wavy noodles'],
      tags: ['veg']
    },
    /* ---------- Dry Noodles / Mazesoba ---------- */
    {
      id: 'dr-1', cat: 'dry', price: 14.5, img: 'assets/images/menu-dry-1.jpg',
      name: 'Classic Mazesoba',
      desc: 'Brothless bowl of thick noodles dressed with savoury mince, garlic, nori and a raw egg yolk.',
      ing: ['thick noodles', 'seasoned mince', 'garlic', 'egg yolk', 'nori', 'sesame'],
      tags: ['signature']
    },
    {
      id: 'dr-2', cat: 'dry', price: 15.0, img: 'assets/images/menu-dry-2.jpg',
      name: 'Tokyo Mazesoba',
      desc: 'Springy noodles tossed in soy dressing with char siu, bamboo shoots and a shiso finish.',
      ing: ['springy noodles', 'soy dressing', 'char siu', 'menma', 'shiso', 'scallion'],
      tags: []
    },
    {
      id: 'dr-3', cat: 'dry', price: 15.5, img: 'assets/images/menu-dry-3.jpg',
      name: 'Hanabi Spicy Mazesoba',
      desc: 'Fiery mazesoba with chilli mince, garlic chips and toasted sesame — stir before every bite.',
      ing: ['thick noodles', 'chilli mince', 'garlic chips', 'toasted sesame', 'chilli oil', 'scallion'],
      tags: ['spicy', 'heat-2']
    },
    {
      id: 'dr-4', cat: 'dry', price: 14.5, img: 'assets/images/menu-dry-4.jpg',
      name: 'Garlic Abura Soba',
      desc: 'Glossy, garlicky oil noodles finished with shallots, roasted seaweed and a splash of black vinegar.',
      ing: ['oil-dressed noodles', 'garlic', 'shallot', 'roasted seaweed', 'black vinegar', 'sesame'],
      tags: []
    }
  ];

  var CATS = [
    { key: 'all', label: 'All Bowls' },
    { key: 'tonkotsu', label: 'Tonkotsu' },
    { key: 'shoyu', label: 'Shoyu' },
    { key: 'miso', label: 'Miso' },
    { key: 'spicy', label: 'Spicy' },
    { key: 'vegetarian', label: 'Vegetarian' },
    { key: 'dry', label: 'Dry Noodles' }
  ];

  var state = { cat: 'all', q: '', sort: 'featured' };
  var grid = document.getElementById('menuGrid');
  var countEl = document.getElementById('menuCount');
  var emptyEl = document.getElementById('menuEmpty');

  function priceStr(p) { return '$' + p.toFixed(2); }

  function tagBadge(tag) {
    if (tag === 'veg') return '<span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300"><i data-lucide="leaf" class="h-3.5 w-3.5"></i>Vegetarian</span>';
    if (tag === 'spicy') return '<span class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700 dark:bg-red-500/15 dark:text-red-300"><i data-lucide="flame" class="h-3.5 w-3.5"></i>Spicy</span>';
    if (tag === 'signature') return '<span class="inline-flex items-center gap-1 rounded-full bg-gold/25 px-2.5 py-1 text-[11px] font-semibold text-clayd dark:bg-gold/20 dark:text-gold"><i data-lucide="sparkles" class="h-3.5 w-3.5"></i>Signature</span>';
    return '';
  }

  function heatLabel(tag) {
    if (tag.indexOf('heat-') !== 0) return '';
    var n = parseInt(tag.slice(5), 10) || 0;
    var dots = '';
    for (var i = 1; i <= 3; i++) {
      dots += '<span class="h-1.5 w-1.5 rounded-full ' + (i <= n ? 'bg-red-500' : 'bg-stone-300 dark:bg-stone-600') + '"></span>';
    }
    var words = ['', 'Mild heat', 'Medium heat', 'Extra hot'];
    return '<span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-500 dark:text-stone-400">' + dots + words[n] + '</span>';
  }

  function card(item) {
    var badges = item.tags.filter(function (t) { return t === 'veg' || t === 'spicy' || t === 'signature'; })
      .map(tagBadge).join('');
    var heat = item.tags.map(heatLabel).filter(Boolean).join('');
    return '' +
      '<article class="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-nightc">' +
        '<button type="button" class="relative block aspect-[4/3] w-full overflow-hidden" data-detail="' + item.id + '" aria-label="View details for ' + item.name + '">' +
          '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">' +
          '<span class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent"></span>' +
          '<span class="absolute start-3 top-3 flex flex-wrap gap-1.5">' + badges + '</span>' +
          '<span class="absolute bottom-3 end-3 rounded-full bg-white/95 px-3 py-1.5 font-display text-sm font-bold text-ember shadow-soft dark:bg-night/95 dark:text-gold">' + priceStr(item.price) + '</span>' +
        '</button>' +
        '<div class="flex flex-1 flex-col gap-3 p-5">' +
          '<div>' +
            '<h3 class="font-display text-lg font-bold leading-snug text-ink dark:text-cream">' + item.name + '</h3>' +
            (heat ? '<div class="mt-1.5">' + heat + '</div>' : '') +
          '</div>' +
          '<p class="text-sm leading-relaxed text-stone-600 dark:text-stone-400">' + item.desc + '</p>' +
          '<p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-clay dark:text-gold">Ingredients</p>' +
          '<ul class="flex flex-wrap gap-1.5">' +
            item.ing.map(function (g) { return '<li class="rounded-full bg-sand px-2.5 py-1 text-[11px] text-stone-600 dark:bg-white/5 dark:text-stone-400">' + g + '</li>'; }).join('') +
          '</ul>' +
          '<div class="mt-auto flex items-center justify-between gap-2 border-t border-line pt-4 dark:border-white/10">' +
            '<span class="font-display text-xl font-bold text-ember dark:text-gold">' + priceStr(item.price) + '</span>' +
            '<div class="flex items-center gap-2">' +
              '<button type="button" class="rounded-full border border-ink/15 px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-sand dark:border-white/20 dark:text-cream dark:hover:bg-white/10" data-detail="' + item.id + '">Details</button>' +
              '<button type="button" class="inline-flex items-center gap-1.5 rounded-full bg-clay px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-clayd" data-add="' + item.id + '"><i data-lucide="plus" class="h-3.5 w-3.5"></i>Add Enquiry</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function filtered() {
    var list = ITEMS.filter(function (it) {
      var catOk = state.cat === 'all' || it.cat === state.cat;
      if (!catOk) return false;
      if (!state.q) return true;
      var hay = (it.name + ' ' + it.desc + ' ' + it.ing.join(' ')).toLowerCase();
      return hay.indexOf(state.q) !== -1;
    });
    if (state.sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }

  function render() {
    var list = filtered();
    grid.innerHTML = list.map(card).join('');
    if (countEl) countEl.textContent = list.length + (list.length === 1 ? ' dish' : ' dishes');
    if (emptyEl) emptyEl.classList.toggle('hidden', list.length !== 0);
    grid.classList.toggle('hidden', list.length === 0);
    if (window.NB) NB.icons();
  }

  /* -------- filters -------- */
  var chipsWrap = document.getElementById('catChips');
  if (chipsWrap) {
    chipsWrap.innerHTML = CATS.map(function (c) {
      return '<button type="button" data-cat="' + c.key + '" class="chip whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ' +
        (state.cat === c.key
          ? 'border-clay bg-clay text-white shadow-soft'
          : 'border-line bg-white text-stone-600 hover:border-clay/60 hover:text-clay dark:border-white/10 dark:bg-nightc dark:text-stone-300 dark:hover:text-gold') +
        '">' + c.label + '</button>';
    }).join('');
    chipsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cat]');
      if (!btn) return;
      state.cat = btn.getAttribute('data-cat');
      NB.$$('[data-cat]', chipsWrap).forEach(function (b) {
        var on = b === btn;
        b.className = 'chip whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ' +
          (on
            ? 'border-clay bg-clay text-white shadow-soft'
            : 'border-line bg-white text-stone-600 hover:border-clay/60 hover:text-clay dark:border-white/10 dark:bg-nightc dark:text-stone-300 dark:hover:text-gold');
      });
      render();
    });
  }

  var searchInput = document.getElementById('menuSearch');
  if (searchInput) {
    var t = null;
    searchInput.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { state.q = searchInput.value.trim().toLowerCase(); render(); }, 160);
    });
  }

  var sortSelect = document.getElementById('menuSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () { state.sort = sortSelect.value; render(); });
  }

  /* -------- modal -------- */
  var modal = document.getElementById('foodModal');
  function findItem(id) {
    for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i];
    return null;
  }
  function openModal(item) {
    if (!modal || !item) return;
    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalImg').alt = item.name;
    document.getElementById('modalName').textContent = item.name;
    document.getElementById('modalDesc').textContent = item.desc;
    document.getElementById('modalPrice').textContent = priceStr(item.price);
    var badges = item.tags.filter(function (tg) { return tg === 'veg' || tg === 'spicy' || tg === 'signature'; }).map(tagBadge).join('');
    document.getElementById('modalBadges').innerHTML = badges || '<span class="rounded-full bg-sand px-2.5 py-1 text-[11px] font-semibold text-stone-600 dark:bg-white/5 dark:text-stone-400">House favourite</span>';
    var heat = item.tags.map(heatLabel).filter(Boolean).join('');
    document.getElementById('modalHeat').innerHTML = heat;
    document.getElementById('modalIng').innerHTML = item.ing.map(function (g) {
      return '<li class="flex items-start gap-2 rounded-xl bg-sand px-3 py-2 text-sm text-stone-600 dark:bg-white/5 dark:text-stone-300"><i data-lucide="check" class="mt-0.5 h-4 w-4 shrink-0 text-clay dark:text-gold"></i>' + g + '</li>';
    }).join('');
    document.getElementById('modalAdd').setAttribute('data-add', item.id);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    NB.icons();
    var closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-modal-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });
  }

  /* -------- add to enquiry + delegation -------- */
  document.addEventListener('click', function (e) {
    var detailBtn = e.target.closest('[data-detail]');
    if (detailBtn) { openModal(findItem(detailBtn.getAttribute('data-detail'))); return; }
    var addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      var item = findItem(addBtn.getAttribute('data-add'));
      if (!item) return;
      var res = NB.enquiry.add({ id: item.id, name: item.name, price: item.price, img: item.img });
      NB.toast(res.added
        ? '<strong>' + item.name + '</strong> added to your order enquiry.'
        : '<strong>' + item.name + '</strong> is already on your enquiry list.',
        res.added ? 'success' : 'info');
    }
  });

  render();
})();
