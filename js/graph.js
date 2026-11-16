/* =========================================================================
 * 人物关系图 · 渲染与交互
 * 纯 SVG，无第三方依赖；点击节点高亮其全部关系，同时打开人物档案面板。
 * ====================================================================== */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var VIEW_W = 1720, VIEW_H = 1300;

  var byId = {};
  JE.characters.forEach(function (c) { byId[c.id] = c; });

  /* ---------- 小工具 ---------- */
  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(n);
    return n;
  }

  function tw(s, fs) {
    var w = 0, cjk = '，。、；：？！（）《》“”‘’—…·';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i], code = s.charCodeAt(i);
      if (code > 0x2e80) w += fs;
      else if (cjk.indexOf(ch) >= 0) w += fs;
      else if (/[A-Z]/.test(ch)) w += fs * 0.66;
      else w += fs * 0.53;
    }
    return w;
  }

  /* 从盒子 a 指向 b 的边界交点 */
  function anchor(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y;
    if (!dx && !dy) return { x: a.x, y: a.y };
    var hw = a.w / 2 + 4, hh = a.h / 2 + 4;
    var tx = dx ? hw / Math.abs(dx) : 1e9;
    var ty = dy ? hh / Math.abs(dy) : 1e9;
    var t = Math.min(tx, ty);
    return { x: a.x + dx * t, y: a.y + dy * t };
  }

  /* ---------- 搭建 SVG ---------- */
  var mount = document.getElementById('graph-mount');
  if (!mount) return;

  var svg = el('svg', {
    viewBox: '0 0 ' + VIEW_W + ' ' + VIEW_H,
    role: 'img',
    'aria-label': '《简·爱》人物关系图：21 位人物、22 条关系。点击任一人物可高亮其全部关系。'
  });
  var gHalo = el('g', {}, svg);
  var gEdges = el('g', {}, svg);
  var gNodes = el('g', {}, svg);
  mount.appendChild(svg);

  /* 每个分组的柔和光晕，帮助视觉分区 */
  Object.keys(JE.groups).forEach(function (gk) {
    var pts = JE.characters.filter(function (c) { return c.group === gk; });
    if (!pts.length) return;
    var xs = pts.map(function (p) { return p.x; }),
        ys = pts.map(function (p) { return p.y; });
    var gx = xs.reduce(function (a, b) { return a + b; }, 0) / xs.length;
    var gy = ys.reduce(function (a, b) { return a + b; }, 0) / ys.length;
    var rx = (Math.max.apply(null, xs) - Math.min.apply(null, xs)) / 2 + 92;
    var ry = (Math.max.apply(null, ys) - Math.min.apply(null, ys)) / 2 + 68;
    el('ellipse', {
      cx: gx.toFixed(0), cy: gy.toFixed(0), rx: rx.toFixed(0), ry: ry.toFixed(0),
      fill: JE.groups[gk].color, opacity: 0.045
    }, gHalo);
  });

  /* ---------- 边 ---------- */
  var edgeEls = [];

  JE.relations.forEach(function (r) {
    var A = byId[r.a], B = byId[r.b];
    if (!A || !B) return;

    var p1 = anchor(A, B), p2 = anchor(B, A);
    var dx = p2.x - p1.x, dy = p2.y - p1.y;
    var L = Math.hypot(dx, dy) || 1;
    var dir = r.bow === undefined ? 1 : r.bow;
    var st = JE.relationTypes[r.type];
    var bow = (r.type === 'fake' || r.type === 'conflict') ? 0.14 : (r.type === 'wed' ? 0.16 : 0.07);
    bow *= dir;

    var nx = -dy / L, ny = dx / L;
    var c1x = p1.x + dx * 0.3 + nx * L * bow, c1y = p1.y + dy * 0.3 + ny * L * bow;
    var c2x = p1.x + dx * 0.7 + nx * L * bow, c2y = p1.y + dy * 0.7 + ny * L * bow;

    var g = el('g', {
      'class': 'edge', 'data-a': r.a, 'data-b': r.b
    }, gEdges);

    el('path', {
      d: 'M' + p1.x.toFixed(1) + ',' + p1.y.toFixed(1) +
         ' C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) +
         ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) +
         ' ' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1),
      fill: 'none',
      stroke: st.color,
      'stroke-width': st.width,
      'stroke-linecap': 'round',
      opacity: st.opacity,
      'stroke-dasharray': st.dash || null
    }, g);

    /* 标签 */
    var involvesCore = (A.kind === 'core' || B.kind === 'core');
    var t = r.t !== undefined ? r.t : (involvesCore ? 0.6 : 0.5);
    var mt = 1 - t;
    var bx = mt * mt * mt * p1.x + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * p2.x;
    var by = mt * mt * mt * p1.y + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * p2.y;
    by += -L * bow * 0.8;

    var lw = tw(r.label, 12) + 14;
    el('rect', {
      'class': 'edge-bg', x: (bx - lw / 2).toFixed(1), y: (by - 11).toFixed(1),
      width: lw.toFixed(1), height: 22, rx: 11, opacity: 0.94
    }, g);
    el('text', {
      x: bx.toFixed(1), y: (by + 4).toFixed(1), 'text-anchor': 'middle'
    }, g).textContent = r.label;

    edgeEls.push({ g: g, a: r.a, b: r.b, type: r.type });
  });

  /* ---------- 节点 ---------- */
  var nodeEls = {};

  JE.characters.forEach(function (c) {
    var col = c.group ? JE.groups[c.group].color : '#1e1a17';
    var g = el('g', {
      'class': 'node', 'data-id': c.id, tabindex: 0,
      role: 'button', 'aria-label': c.zh + '，' + c.role
    }, gNodes);

    var x = c.x - c.w / 2, y = c.y - c.h / 2;

    if (c.kind === 'core') {
      el('rect', {
        x: x - 5, y: y - 5, width: c.w + 10, height: c.h + 10, rx: 16,
        fill: 'none', stroke: '#a8863f', 'stroke-width': 1.2, opacity: 0.8
      }, g);
      el('rect', { x: x, y: y, width: c.w, height: c.h, rx: 12, fill: '#1e1a17' }, g);
      el('text', {
        x: c.x, y: c.y + 2, 'text-anchor': 'middle', 'font-size': 19, 'font-weight': 700,
        fill: '#fdfaf3', 'letter-spacing': 2,
        'font-family': '"Noto Serif CJK SC","Songti SC",serif'
      }, g).textContent = c.zh;
      el('text', {
        x: c.x, y: c.y + 24, 'text-anchor': 'middle', 'font-size': 11, fill: '#a8863f'
      }, g).textContent = c.en;
    } else {
      var isHub = c.kind === 'hub';
      el('rect', {
        x: x, y: y, width: c.w, height: c.h, rx: 10,
        fill: isHub ? '#fffdf8' : '#fbf7ee',
        stroke: col, 'stroke-width': isHub ? 2 : 1.4
      }, g);
      el('text', {
        x: c.x, y: c.y + (c.role ? -3 : 5), 'text-anchor': 'middle',
        'font-size': isHub ? 17 : 15.5, 'font-weight': isHub ? 700 : 600, fill: '#1e1a17'
      }, g).textContent = c.zh;
      if (c.role) {
        el('text', {
          x: c.x, y: c.y + 16, 'text-anchor': 'middle', 'font-size': 11, fill: col, opacity: 0.85
        }, g).textContent = c.role;
      }
    }

    nodeEls[c.id] = g;

    g.addEventListener('click', function (e) { e.stopPropagation(); select(c.id); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(c.id); }
    });
  });

  /* ---------- 交互状态 ---------- */
  var current = null;
  var currentGroup = 'all';
  var panel = document.getElementById('detail-panel');
  var panelBody = document.getElementById('dp-body');
  var panelHead = document.getElementById('dp-head');
  var closeBtn = document.getElementById('dp-close');

  function neighbours(id) {
    var set = { };
    set[id] = true;
    JE.relations.forEach(function (r) {
      if (r.a === id) set[r.b] = true;
      if (r.b === id) set[r.a] = true;
    });
    return set;
  }

  function render() {
    var near = current ? neighbours(current) : null;

    Object.keys(nodeEls).forEach(function (id) {
      var g = nodeEls[id];
      var visible = true;
      if (currentGroup !== 'all') {
        var c = byId[id];
        visible = (c.group === currentGroup) || c.kind === 'core';
      }
      var focusOk = !near || near[id];
      g.classList.toggle('dimmed', !(visible && focusOk));
    });

    edgeEls.forEach(function (e) {
      var hit = current && (e.a === current || e.b === current);
      var inGroup = currentGroup === 'all' ||
        (byId[e.a].group === currentGroup || byId[e.b].group === currentGroup);
      e.g.classList.toggle('is-focus', !!hit);
      e.g.classList.toggle('dimmed', !(current ? hit : inGroup));
    });
  }

  function select(id) {
    current = (current === id) ? null : id;
    render();
    if (current) {
      openPanel(current);
    } else {
      closePanel();
    }
  }

  function openPanel(id) {
    var c = byId[id];
    var col = c.group ? JE.groups[c.group].color : '#8c2f39';

    panelHead.innerHTML =
      '<div>' +
        '<h3>' + c.zh + '</h3>' +
        '<div class="dp-en">' + c.en + '</div>' +
        '<span class="dp-role" style="color:' + col + '">' + c.role + '</span>' +
      '</div>';

    var rels = JE.relations.filter(function (r) { return r.a === id || r.b === id; });
    var relHtml = rels.map(function (r) {
      var other = byId[r.a === id ? r.b : r.a];
      return '<li class="dp-link" data-goto="' + other.id + '">' +
        '<span class="who">' + other.zh + '</span>' +
        '<span class="what">' + r.label + '</span>' +
      '</li>';
    }).join('');

    panelBody.innerHTML =
      '<div class="dp-label">人物速写</div>' +
      '<p>' + c.desc + '</p>' +
      '<div class="dp-label">关系（' + rels.length + '）</div>' +
      '<ul class="dp-rel-list">' + relHtml + '</ul>' +
      '<div class="dp-label">结局</div>' +
      '<p>' + c.fate + '</p>';

    panelBody.querySelectorAll('[data-goto]').forEach(function (li) {
      li.addEventListener('click', function () {
        current = li.getAttribute('data-goto');
        render();
        openPanel(current);
      });
    });

    panel.classList.add('is-open');
    var card = svg.closest('.graph-card');
    if (card) card.classList.add('has-panel');
  }

  function closePanel() {
    panel.classList.remove('is-open');
    var card = svg.closest('.graph-card');
    if (card) card.classList.remove('has-panel');
  }

  closeBtn.addEventListener('click', function () {
    current = null;
    render();
    closePanel();
  });

  svg.addEventListener('click', function () {
    current = null;
    render();
    closePanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && current) {
      current = null;
      render();
      closePanel();
    }
  });

  /* ---------- 分组筛选 ---------- */
  var chipBox = document.getElementById('group-chips');
  if (chipBox) {
    var chips = [{ id: 'all', zh: '全部', color: '#1e1a17' }];
    Object.keys(JE.groups).forEach(function (k) {
      chips.push({ id: k, zh: JE.groups[k].zh, color: JE.groups[k].color });
    });
    chipBox.innerHTML = chips.map(function (c) {
      return '<button class="chip" data-group="' + c.id + '" aria-pressed="' +
        (c.id === 'all' ? 'true' : 'false') + '">' +
        '<i style="background:' + c.color + '"></i>' + c.zh + '</button>';
    }).join('');
  }

  document.querySelectorAll('[data-group]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var g = btn.getAttribute('data-group');
      currentGroup = (currentGroup === g) ? 'all' : g;
      document.querySelectorAll('[data-group]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-group') === currentGroup));
      });
      current = null;
      closePanel();
      render();
    });
  });

  /* ---------- 图例 ---------- */
  var legendBox = document.getElementById('graph-legend');
  if (legendBox) {
    var items = Object.keys(JE.relationTypes).map(function (k) {
      var s = JE.relationTypes[k];
      var dash = s.dash ? ' stroke-dasharray="' + s.dash + '"' : '';
      return '<span class="lg">' +
        '<svg viewBox="0 0 34 10" aria-hidden="true"><path d="M1,5 L33,5" stroke="' + s.color +
        '" stroke-width="' + Math.max(1.6, s.width) + '" opacity="' + s.opacity + '"' + dash + '/></svg>' +
        s.zh + '</span>';
    }).join('');
    var groups = Object.keys(JE.groups).map(function (k) {
      return '<span class="lg"><span class="sw" style="background:' + JE.groups[k].color +
        '"></span>' + JE.groups[k].zh + '</span>';
    }).join('');
    legendBox.innerHTML = items + groups;
  }

  /* ---------- 深链接：?c=Roch 直达某个人物 ---------- */
  function readDeepLink() {
    var m = (location.search + location.hash).match(/[?&#]c=([A-Za-z]+)/);
    if (m && byId[m[1]]) {
      current = m[1];
      render();
      openPanel(current);
    }
  }
  function syncUrl() {
    if (!window.history || !history.replaceState) return;
    try {
      var base = location.pathname + location.search.replace(/([?&])c=[^&]*/g, '');
      history.replaceState(null, '',
        current ? base + (base.indexOf('?') >= 0 ? '&' : '?') + 'c=' + current : base);
    } catch (e) { /* file:// 等环境下可能受限，忽略 */ }
  }
  var origOpenPanel = openPanel;
  openPanel = function (id) { origOpenPanel(id); syncUrl(); };

  readDeepLink();
  render();
})();
