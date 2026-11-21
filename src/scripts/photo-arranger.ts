import worksBaseline from '../data/works-layout-baseline.json';

type Placement = { x: number; y: number; w: number };
type Layout = Record<string, Placement>;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function initialise(root: HTMLElement) {
  const get = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
  const board = get('.board');
  const toggle = get<HTMLButtonElement>('[data-toggle]');
  const status = get('[data-status]');
  const pieces = Array.from(board.querySelectorAll<HTMLElement>('.piece'));
  const zh = root.dataset.lang === 'zh';
  const text = (cn: string, en: string) => zh ? cn : en;
  let filter = 'all';
  const hasWorksBaseline = () => root.dataset.scope === 'works' && filter === 'all';
  // Keep the exported, pre-revision browser draft under its original key.
  const key = () => `photo-layout:${hasWorksBaseline() ? 'v2' : 'v1'}:${root.dataset.scope}:${filter}`;
  let custom = false;
  const ratios = new Map(pieces.map(piece => [piece.dataset.id!, Number(piece.dataset.ratio)]));
  function composeWorks(width: number): Layout {
    const placements = { ...worksBaseline.layout };
    const gap = parseFloat(getComputedStyle(board).getPropertyValue('--photo-gap')) / width;
    const rows = [
      ['under-the-milky-way', 'galactic-arch-snow-mountain'],
      ['plank-road-star-bridge', 'prairie-starry-night'],
      ['star-trails-river', 'stars-fall-on-village'],
    ] as const;
    let y = 0;
    for (const [left, right] of rows) {
      const leftRatio = ratios.get(left)!;
      const rightRatio = ratios.get(right)!;
      const height = left === 'plank-road-star-bridge'
        ? worksBaseline.layout[left].w / leftRatio
        : (1 - gap) / (leftRatio + rightRatio);
      placements[left] = { x: 0, y, w: height * leftRatio };
      placements[right] = { x: placements[left].w + gap, y, w: height * rightRatio };
      y += height + gap;
    }
    return placements;
  }
  let layout: Layout = {};
  let editing = false;
  let active = false;
  const visible = () => pieces.filter(piece => !piece.hidden);

  function load() {
    layout = {};
    try {
      const saved = JSON.parse(localStorage.getItem(key()) || '{}');
      for (const piece of visible()) {
        const id = piece.dataset.id!;
        const p = saved?.[id];
        if (p && [p.x, p.y, p.w].every(Number.isFinite) && p.x >= 0 && p.y >= 0 && p.w > 0 && p.x + p.w <= 1.00001) layout[id] = p;
      }
    } catch { /* Start with the automatic layout if local storage is unavailable. */ }
    custom = Object.keys(layout).length > 0;
    return custom;
  }

  function save() {
    try {
      localStorage.setItem(key(), JSON.stringify(layout));
      status.textContent = text('已保存到此浏览器', 'Saved in this browser');
    } catch { status.textContent = text('浏览器无法保存，请导出草稿', 'Browser storage unavailable. Export your draft.'); }
  }

  function fillMissing() {
    const width = board.clientWidth;
    if (!width) return;
    const cards = visible();
    const cols = width < 560 || cards.length === 1 ? 1 : 2;
    const gap = Math.min(24 / width, .045);
    const w = (1 - (cols - 1) * gap) / cols;
    const bottoms = Array<number>(cols).fill(0);
    for (const piece of cards) {
      const id = piece.dataset.id!;
      const lane = bottoms.indexOf(Math.min(...bottoms));
      const p = layout[id] ??= { x: lane * (w + gap), y: bottoms[lane], w };
      const end = p.y + p.w / Number(piece.dataset.ratio) + 52 / width;
      for (let i = 0; i < cols; i++) {
        const start = i * (w + gap);
        if (p.x < start + w && p.x + p.w > start) bottoms[i] = Math.max(bottoms[i], end);
      }
    }
  }

  function draw() {
    if (!active || !board.clientWidth) return;
    const width = board.getBoundingClientRect().width;
    if (hasWorksBaseline() && !custom) layout = composeWorks(width);
    fillMissing();
    for (const piece of visible()) {
      const p = layout[piece.dataset.id!];
      piece.style.left = `${100 * p.x}%`;
      piece.style.top = `${width * p.y}px`;
      piece.style.width = `${100 * p.w}%`;
    }
    const bottom = Math.max(0, ...visible().map(el => el.offsetTop + el.offsetHeight));
    board.style.height = `${bottom + (editing ? 96 : 16)}px`;
  }

  function show(useBoard: boolean, edit: boolean) {
    active = useBoard;
    editing = edit;
    root.toggleAttribute('data-active', active);
    root.toggleAttribute('data-works-baseline', hasWorksBaseline());
    root.toggleAttribute('data-editing', editing);
    board.hidden = !active;
    get('.hint').hidden = !editing;
    get('[data-export]').hidden = !active;
    get('[data-reset]').hidden = !active;
    toggle.setAttribute('aria-pressed', String(editing));
    toggle.textContent = editing ? text('完成排版', 'Done') : text('调整排版', 'Arrange photos');
    if (active) for (const piece of visible()) {
      const img = piece.querySelector('img')!;
      if (!img.hasAttribute('src')) img.src = img.dataset.src!;
    }
    draw();
  }

  toggle.onclick = () => {
    if (editing && (custom || !hasWorksBaseline())) save();
    show(true, !editing);
  };
  get('[data-reset]').onclick = () => {
    try { localStorage.removeItem(key()); } catch { /* Session-only layout. */ }
    layout = {};
    status.textContent = '';
    custom = false;
    show(hasWorksBaseline(), false);
    toggle.focus();
  };
  get('[data-export]').onclick = () => {
    const json = JSON.stringify({ version: 1, scope: root.dataset.scope, filter, layout }, null, 2);
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${root.dataset.scope}-${filter}-layout.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  function change(piece: HTMLElement, start: Placement, dx: number, dy: number, resize: boolean) {
    const ratio = Number(piece.dataset.ratio);
    // Project the dragged corner onto the photo's diagonal to preserve its proportions.
    const dw = (dx + dy / ratio) / (1 + 1 / (ratio * ratio));
    const w = resize ? clamp(start.w + dw, Math.min(80 / board.clientWidth, 1 - start.x), 1 - start.x) : start.w;
    custom = true;
    layout[piece.dataset.id!] = resize ? { ...start, w } : { w, x: clamp(start.x + dx, 0, 1 - w), y: Math.max(0, start.y + dy) };
    draw();
  }

  for (const piece of pieces) {
    let drag: { id: number; x: number; y: number; start: Placement; resize: boolean } | undefined;
    piece.addEventListener('pointerdown', e => {
      if (!editing || drag || e.button !== 0) return;
      e.preventDefault();
      piece.querySelector('a')!.focus({ preventScroll: true });
      piece.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, x: e.pageX, y: e.pageY, start: { ...layout[piece.dataset.id!] }, resize: (e.target as Element).closest('.grip') !== null };
    });
    piece.addEventListener('pointermove', e => {
      if (drag?.id !== e.pointerId || !drag) return;
      change(piece, drag.start, (e.pageX - drag.x) / board.clientWidth, (e.pageY - drag.y) / board.clientWidth, drag.resize);
    });
    piece.addEventListener('lostpointercapture', () => { if (drag && (custom || !hasWorksBaseline())) save(); drag = undefined; });
    piece.addEventListener('click', e => { if (editing) e.preventDefault(); });
    piece.addEventListener('keydown', e => {
      if (!editing) return;
      const step = (e.shiftKey ? 24 : 6) / board.clientWidth;
      const moves: Record<string, [number, number, boolean]> = {
        ArrowLeft: [-step, 0, false], ArrowRight: [step, 0, false], ArrowUp: [0, -step, false], ArrowDown: [0, step, false],
        '+': [step, step, true], '=': [step, step, true], '-': [-step, -step, true],
      };
      if (!moves[e.key]) return;
      e.preventDefault();
      change(piece, layout[piece.dataset.id!], ...moves[e.key]);
      save();
    });
  }

  if (root.dataset.scope === 'works') document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      filter = chip.dataset.filter || 'all';
      for (const p of pieces) p.hidden = filter !== 'all' && p.dataset.series !== filter;
      status.textContent = '';
      const saved = load();
      show(saved || editing || hasWorksBaseline(), editing);
    });
  });
  new ResizeObserver(draw).observe(root);
  document.fonts.ready.then(draw);
  get('.tools').hidden = false;
  show(load() || hasWorksBaseline(), false);
}

for (const root of document.querySelectorAll<HTMLElement>('photo-arranger')) initialise(root);
