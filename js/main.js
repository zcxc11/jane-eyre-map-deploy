/* =========================================================================
 * 页面交互与内容渲染
 * 除图表外的所有板块也从 js/data.js 渲染，保证「一处修改，全站同步」
 * ====================================================================== */
(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var byId = {};
  JE.characters.forEach(function (c) { byId[c.id] = c; });

  /* -------------------------------------------------- 1. 六组关键关系 */
  (function renderKeyRels() {
    var box = $('#rels-grid');
    if (!box) return;
    box.innerHTML = JE.keyRels.map(function (r, i) {
      var num = String(i + 1).padStart(2, '0');
      var quote = r.quote
        ? '<blockquote class="rel-quote">' +
            '<span class="q-en">\u201C' + r.quote + '\u201D</span>' +
            '<span class="q-zh">' + r.zh + '</span>' +
            '<span class="q-src">' + r.src + '</span>' +
          '</blockquote>'
        : '<div class="rel-scene"><span class="dp-label" style="margin:0 0 4px">关键章节</span>' + r.src + '</div>';
      return '<article class="rel-card reveal">' +
        '<div class="rel-top">' +
          '<span class="rel-type" style="color:' + r.color + '"><span>' + r.type + '</span></span>' +
          '<span class="rel-no">' + num + '</span>' +
        '</div>' +
        '<h3 class="rel-pair">' + r.a + '<span class="amp">×</span>' + r.b + '</h3>' +
        '<p class="rel-body">' + r.body + '</p>' +
        quote +
      '</article>';
    }).join('');
  })();

  /* -------------------------------------------------- 2. 五段人生地理 */
  (function renderStages() {
    var box = $('#journey');
    if (!box) return;
    box.innerHTML = JE.stages.map(function (s) {
      return '<article class="stage-item" style="color:' + s.color + '">' +
        '<div class="stage-dot">' + s.no + '</div>' +
        '<div class="stage-body">' +
          '<div class="stage-head">' +
            '<h3>' + s.place + '</h3>' +
            '<span class="stage-en">' + s.en + '</span>' +
            '<span class="stage-span">' + s.span + '</span>' +
          '</div>' +
          '<p class="stage-word">' + s.word + '</p>' +
          '<ul class="stage-events">' +
            s.events.map(function (e) { return '<li>' + e + '</li>'; }).join('') +
          '</ul>' +
        '</div>' +
      '</article>';
    }).join('');
  })();

  /* -------------------------------------------------- 3. 人物速查表 */
  (function renderTable() {
    var tbody = $('#char-table tbody');
    if (!tbody) return;
    var order = ['reed', 'lowood', 'thorn', 'moor', 'eyre'];
    var rows = JE.characters.slice().sort(function (a, b) {
      var ga = a.group ? order.indexOf(a.group) : -1;
      var gb = b.group ? order.indexOf(b.group) : -1;
      if (ga !== gb) return ga - gb;
      return 0;
    });
    tbody.innerHTML = rows.map(function (c) {
      var g = c.group ? JE.groups[c.group] : null;
      var rels = JE.relations.filter(function (r) { return r.a === c.id || r.b === c.id; })
        .map(function (r) { return byId[r.a === c.id ? r.b : r.a].zh; });
      var key = rels.slice(0, 3).join('、') + (rels.length > 3 ? ' 等' : '');
      return '<tr>' +
        '<td><span class="cname">' + c.zh + '</span><span class="cen">' + c.en + '</span></td>' +
        '<td class="td-soft">' + c.role + '</td>' +
        '<td>' + (g
          ? '<span class="cgroup"><i style="background:' + g.color + '"></i>' + g.zh + '</span>'
          : '<span class="cgroup"><i style="background:#1e1a17"></i>主角</span>') + '</td>' +
        '<td class="td-soft">' + key + '</td>' +
      '</tr>';
    }).join('');
  })();

  /* -------------------------------------------------- 4. 结局名单 */
  (function renderEndings() {
    var gone = $('#end-gone'), stay = $('#end-stay');
    if (gone) {
      gone.innerHTML = JE.endingGone.map(function (e) {
        return '<li><span class="en-name">' + e.name + '</span>' +
          '<span class="en-note">' + e.note + '</span>' +
          '<span class="en-how">' + e.how + '</span></li>';
      }).join('');
    }
    if (stay) {
      stay.innerHTML = JE.endingStay.map(function (e) {
        return '<li><span class="en-name">' + e.name + '</span>' +
          '<span class="en-note">留</span>' +
          '<span class="en-how">' + e.how + '</span></li>';
      }).join('');
    }
  })();

  /* -------------------------------------------------- 5. 经典台词 */
  (function renderQuotes() {
    var box = $('#quote-grid');
    var bar = $('#quote-filters');
    if (!box) return;

    box.innerHTML = JE.quotes.map(function (q) {
      var c = byId[q.who];
      return '<article class="quote-card reveal" data-who="' + q.who + '">' +
        '<div class="q-head"><span class="q-who">' + (c ? c.zh : '叙述者') + '</span>' +
          '<span class="q-ch">' + q.chapter + '</span></div>' +
        '<p class="q-en">\u201C' + q.en + '\u201D</p>' +
        '<p class="q-zh">' + q.zh + '</p>' +
        '<p class="q-note">' + q.note + '</p>' +
      '</article>';
    }).join('');

    if (!bar) return;
    bar.innerHTML = JE.quoteFilters.map(function (f) {
      return '<button class="chip" data-qfilter="' + f.id + '" aria-pressed="' +
        (f.id === 'all' ? 'true' : 'false') + '">' + f.zh + '</button>';
    }).join('');

    $$('[data-qfilter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-qfilter');
        $$('[data-qfilter]').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        $$('#quote-grid .quote-card').forEach(function (card) {
          var ok = (id === 'all') || card.getAttribute('data-who') === id;
          card.classList.toggle('is-hidden', !ok);
        });
      });
    });
  })();

  /* -------------------------------------------------- 6. 顶部导航 */
  var header = $('.site-header');
  var nav = $('.nav');
  var toggle = $('.nav-toggle');

  function onScroll() {
    if (window.scrollY > 40) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  $$('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* 滚动高亮当前板块 */
  var links = $$('.nav a[href^="#"]');
  var sections = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active',
            a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* -------------------------------------------------- 7. 入场动画 */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          ro.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { ro.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-in'); });
  }

  /* 时间线上的圆点随滚动点亮 */
  var dots = $$('.stage-item');
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) en.target.classList.add('is-open');
      });
    }, { rootMargin: '-30% 0px -30% 0px' });
    dots.forEach(function (d) { so.observe(d); });
  } else {
    dots.forEach(function (d) { d.classList.add('is-open'); });
  }
})();
