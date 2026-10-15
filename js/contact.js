/* =========================================================
   NoriBowl – contact page
   Enquiry form validation, success modal, localStorage,
   selected-dish chips, FAQ accordion extras.
   ========================================================= */
(function () {
  'use strict';
  var form = document.getElementById('enquiryForm');
  if (!form) return;

  var STORE_KEY = 'noribowl_enquiries';

  var RAMEN_LIST = [
    'No preference yet',
    'Hakata Classic Tonkotsu', 'Pork Belly Cream Tonkotsu', 'Hakata Special Tonkotsu', 'Ebi Tonkotsu',
    'Chashu Shoyu Ramen', 'Tokyo Classic Shoyu', 'Niboshi Shoyu Ramen', 'Chicken Shoyu Ramen',
    'Butter Corn Miso Ramen', 'Cheese Miso Ramen', 'Chicken Miso Butter Ramen', 'Classic Red Miso Ramen',
    'Spicy Miso Ramen', 'Tantanmen', 'Volcano Spicy Miso', 'Seito Tan Tan Men',
    'Ajitama Veggie Ramen', 'Kimchi Garden Ramen', 'Pumpkin Miso Ramen', 'Creamy Veggie Ramen',
    'Classic Mazesoba', 'Tokyo Mazesoba', 'Hanabi Spicy Mazesoba', 'Garlic Abura Soba'
  ];

  /* -------- populate ramen select -------- */
  var ramenSelect = form.querySelector('#fRamen');
  if (ramenSelect) {
    RAMEN_LIST.forEach(function (name, i) {
      var opt = document.createElement('option');
      opt.value = i === 0 ? '' : name;
      opt.textContent = name;
      ramenSelect.appendChild(opt);
    });
  }

  /* -------- date min = today -------- */
  var dateField = form.querySelector('#fDate');
  if (dateField) {
    var d = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    dateField.min = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  /* -------- validation helpers -------- */
  function setError(name, message) {
    var field = form.querySelector('[name="' + name + '"]');
    var box = form.querySelector('[data-error-for="' + name + '"]');
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-200');
      field.classList.remove('border-line', 'dark:border-white/10');
    }
    if (box) { box.textContent = message; box.classList.remove('hidden'); }
  }
  function clearError(name) {
    var field = form.querySelector('[name="' + name + '"]');
    var box = form.querySelector('[data-error-for="' + name + '"]');
    if (field) {
      field.removeAttribute('aria-invalid');
      field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-200');
      field.classList.add('border-line', 'dark:border-white/10');
    }
    if (box) { box.textContent = ''; box.classList.add('hidden'); }
  }

  function val(name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? String(el.value || '').trim() : '';
  }

  function validate(showAll) {
    var errors = [];
    var v;

    v = val('name');
    if (v.length < 2) { if (showAll) setError('name', 'Please enter your full name.'); errors.push('name'); }
    else clearError('name');

    v = val('phone');
    var digits = v.replace(/\D/g, '');
    if (!/^[+()\-.\s\d]{7,20}$/.test(v) || digits.length < 7) {
      if (showAll) setError('phone', 'Please enter a valid phone number.'); errors.push('phone');
    } else clearError('phone');

    v = val('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      if (showAll) setError('email', 'Please enter a valid email address.'); errors.push('email');
    } else clearError('email');

    v = val('date');
    var today = dateField && dateField.min ? dateField.min : '';
    if (!v) { if (showAll) setError('date', 'Please choose your preferred date.'); errors.push('date'); }
    else if (today && v < today) { if (showAll) setError('date', 'The date cannot be in the past.'); errors.push('date'); }
    else clearError('date');

    v = val('time');
    if (!v) { if (showAll) setError('time', 'Please choose your preferred time.'); errors.push('time'); }
    else clearError('time');

    v = val('people');
    if (!v) { if (showAll) setError('people', 'Please tell us how many are coming.'); errors.push('people'); }
    else clearError('people');

    return errors;
  }

  ['name', 'phone', 'email', 'date', 'time', 'people'].forEach(function (n) {
    var el = form.querySelector('[name="' + n + '"]');
    if (!el) return;
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) validate(true); });
    el.addEventListener('change', function () { if (el.getAttribute('aria-invalid')) validate(true); });
    el.addEventListener('blur', function () { if (el.value) validate(false); });
  });

  /* -------- selected dishes (from menu page) -------- */
  var itemsWrap = document.getElementById('enquiryItems');
  function renderItems() {
    if (!itemsWrap) return;
    var list = NB.enquiry.get();
    if (!list.length) {
      itemsWrap.innerHTML = '<p class="text-sm text-stone-500 dark:text-stone-400">No dishes selected yet. Add bowls from the <a href="menu.html" class="font-semibold text-clay underline underline-offset-2 dark:text-gold">menu page</a> and they will appear here.</p>';
      return;
    }
    itemsWrap.innerHTML =
      '<ul class="flex flex-wrap gap-2">' +
      list.map(function (it) {
        return '<li class="inline-flex items-center gap-2 rounded-full border border-line bg-sand py-1.5 pe-1.5 ps-3 text-sm font-medium text-ink dark:border-white/10 dark:bg-white/5 dark:text-stone-200">' +
          '<span>' + it.name + '</span>' +
          '<button type="button" class="grid h-6 w-6 place-items-center rounded-full bg-white text-stone-500 transition hover:bg-red-50 hover:text-red-600 dark:bg-white/10 dark:text-stone-300" data-remove-enq="' + it.id + '" aria-label="Remove ' + it.name + '"><i data-lucide="x" class="h-3.5 w-3.5"></i></button>' +
          '</li>';
      }).join('') +
      '</ul>';
    NB.icons();
  }
  if (itemsWrap) {
    renderItems();
    document.addEventListener('nb:enquiry', renderItems);
    itemsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-remove-enq]');
      if (btn) NB.enquiry.remove(btn.getAttribute('data-remove-enq'));
    });
  }

  /* -------- submit -------- */
  var successModal = document.getElementById('successModal');
  var successRef = document.getElementById('successRef');
  var successSummary = document.getElementById('successSummary');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var errors = validate(true);
    if (errors.length) {
      NB.toast('Please check the highlighted fields and try again.', 'error');
      var first = form.querySelector('[name="' + errors[0] + '"]');
      if (first) first.focus();
      return;
    }

    var dishes = NB.enquiry.get();
    var record = {
      ref: 'NB-' + Date.now().toString(36).toUpperCase(),
      name: val('name'),
      phone: val('phone'),
      email: val('email'),
      date: val('date'),
      time: val('time'),
      people: val('people'),
      ramen: val('ramen') || 'No preference yet',
      request: val('request'),
      dishes: dishes.map(function (d) { return d.name; }),
      createdAt: new Date().toISOString()
    };

    try {
      var all = JSON.parse(localStorage.getItem(STORE_KEY));
      if (!Array.isArray(all)) all = [];
      all.push(record);
      if (all.length > 25) all = all.slice(all.length - 25);
      localStorage.setItem(STORE_KEY, JSON.stringify(all));
    } catch (err) { /* storage unavailable – still show success */ }

    if (successRef) successRef.textContent = record.ref;
    if (successSummary) {
      successSummary.textContent =
        'Thanks ' + record.name.split(' ')[0] + ' — your table enquiry for ' +
        record.people + ' on ' + record.date + ' at ' + record.time + ' has been received.';
    }
    if (successModal) {
      successModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      var doneBtn = document.getElementById('successClose');
      if (doneBtn) doneBtn.focus();
    }
    NB.toast('Enquiry sent — we will confirm shortly.', 'success');

    form.reset();
    NB.enquiry.clear();
    ['name', 'phone', 'email', 'date', 'time', 'people'].forEach(clearError);
    if (dateField) dateField.min = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
  });

  /* -------- success modal controls -------- */
  if (successModal) {
    function closeSuccess() {
      successModal.classList.add('hidden');
      document.body.style.overflow = '';
      var firstField = form.querySelector('[name="name"]');
      if (firstField) firstField.focus();
    }
    document.getElementById('successClose').addEventListener('click', closeSuccess);
    successModal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-success-close') || e.target.closest('[data-success-close]')) closeSuccess();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !successModal.classList.contains('hidden')) closeSuccess();
    });
  }
})();
