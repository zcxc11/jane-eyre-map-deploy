/* =========================================================================
 * 思维导图 · 渲染与交互
 * 布局在运行时计算：两侧各分配若干分支，叶子按固定行高堆叠。
 * 点击分支标签可聚焦该分支，其余淡化。
 * ====================================================================== */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var W = 1600, H = 1140, CX = 800, CY = 570;
  var LH = 44, GAP = 34;

  var mount = document.getElementById('mindmap-mount');
  if (!mount) return;

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

  var svg = el('svg', {
    viewBox: '0 0 ' + W + ' ' + H,
    role: 'img',
    'aria-label': '《简·爱》思维导图：情节主线、主题思想、意象象征、人物谱系、经典语句、作者与背景六个分支。'
  });
  mount.appendChild(svg);

  /* 背景装饰 */
  el('circle', {
    cx: CX, cy: CY, r: 430, fill: 'none', stroke: '#1e1a17',
    'stroke-width': 1, opacity: 0.05
  }, svg);

  /* 布局：先算每侧总高，再垂直居中 */
  var branches = JE.mindmap.branches;

  function layout(side) {
    var list = branches.filter(function (b) { return b.side === side; });
    var total = list.reduce(function (a, b) { return a + b.leaves.length * LH; }, 0)
      + GAP * (list.length - 1);
    var y = CY - total / 2;
    list.forEach(function (b) {
      b._y0 = y;
      b._by = y + b.leaves.length * LH / 2;
      b._ly = b.leaves.map(function (_, i) { return y + LH * (i + 0.5); });
      y += b.leaves.length * LH + GAP;
    });
  }
  layout('R');
  layout('L');

  var gGroups = el('g', {}, svg);
  var branchHit = [];

  branches.forEach(function (b) {
    var d = b.side === 'R' ? 1 : -1;
    var bw = tw(b.name, 18) + 46;
    var g = el('g', { 'class': 'mm-group', 'data-branch': b.name }, gGroups);

    /* 主干 */
    var x1 = CX + d * 126, x2 = CX + d * 210;
    el('path', {
      d: 'M' + x1 + ',' + CY +
         ' C' + (x1 + d * 70) + ',' + CY +
         ' ' + (x2 - d * 70) + ',' + b._by +
         ' ' + (x2 - d * bw / 2 + d * 4) + ',' + b._by,
      fill: 'none', stroke: b.color, 'stroke-width': 3.4,
      'stroke-linecap': 'round', opacity: 0.85
    }, g);

    /* 叶枝 */
    var baseX = x2 + d * bw / 2;
    b.leaves.forEach(function (txt, i) {
      var ly = b._ly[i];
      var dotX = CX + d * 344;
      el('path', {
        d: 'M' + baseX + ',' + b._by +
           ' C' + (baseX + d * 44) + ',' + b._by +
           ' ' + (dotX - d * 36) + ',' + ly +
           ' ' + (dotX - d * 7) + ',' + ly,
        fill: 'none', stroke: b.color, 'stroke-width': 1.6, opacity: 0.55
      }, g);
      el('circle', { cx: dotX, cy: ly, r: 4, fill: b.color, opacity: 0.9 }, g);
      el('text', {
        x: dotX + d * 14, y: ly + 6,
        'text-anchor': d === 1 ? 'start' : 'end',
        'font-size': 16.5, fill: '#241f1c', opacity: 0.88
      }, g).textContent = txt;
    });

    /* 分支标签 */
    var pill = el('g', {
      'class': 'mm-branch', tabindex: 0, role: 'button',
      'aria-label': '聚焦分支：' + b.name
    }, g);
    el('rect', {
      x: x2 - bw / 2, y: b._by - 22, width: bw, height: 44, rx: 22, fill: b.color
    }, pill);
    el('text', {
      x: x2, y: b._by + 6.5, 'text-anchor': 'middle', 'font-size': 18,
      'font-weight': 700, fill: '#fdfaf3', 'letter-spacing': 1
    }, pill).textContent = b.name;

    pill.addEventListener('click', function (e) {
      e.stopPropagation();
      focus(b.name);
    });
    pill.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focus(b.name); }
    });

    branchHit.push({ name: b.name, g: g, pill: pill });
  });

  /* 中心节点 */
  el('rect', {
    x: CX - 134, y: CY - 70, width: 268, height: 140, rx: 14,
    fill: 'none', stroke: '#a9884d', 'stroke-width': 1.2, opacity: 0.75
  }, svg);
  el('rect', {
    x: CX - 122, y: CY - 60, width: 244, height: 120, rx: 10, fill: '#1e1a17'
  }, svg);
  el('text', {
    x: CX, y: CY + 2, 'text-anchor': 'middle', 'font-size': 42, 'font-weight': 700,
    fill: '#fdfaf3', 'letter-spacing': 6,
    'font-family': '"Noto Serif CJK SC","Songti SC",serif'
  }, svg).textContent = JE.mindmap.center.zh;
  el('text', {
    x: CX, y: CY + 34, 'text-anchor': 'middle', 'font-size': 12.5,
    fill: '#a9884d', 'letter-spacing': 5
  }, svg).textContent = JE.mindmap.center.en;

  /* 四角装饰 */
  [[70, 70, 1, 1], [W - 70, 70, -1, 1], [70, H - 70, 1, -1], [W - 70, H - 70, -1, -1]]
    .forEach(function (p) {
      el('path', {
        d: 'M' + p[0] + ',' + p[1] + ' l' + p[2] * 46 + ',0 M' + p[0] + ',' + p[1] + ' l0,' + p[3] * 46,
        stroke: '#a9884d', 'stroke-width': 1.2, opacity: 0.5, fill: 'none'
      }, svg);
    });

  /* 聚焦交互 */
  var active = null;
  function focus(name) {
    active = (active === name) ? null : name;
    branchHit.forEach(function (b) {
      b.g.classList.toggle('dimmed', active !== null && b.name !== active);
      b.pill.setAttribute('aria-pressed', String(b.name === active));
    });
  }

  svg.addEventListener('click', function () { if (active) focus(active); });
})();
