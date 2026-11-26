// Routing and page wiring for Vietnam in Numbers.
// Hash routes (#/, #/economy, #/money, …) render into <main id="app">;
// the interactions (indicator search, year explorer, sortable tables,
// compare dot plot) are wired up after each render.
import { viewOverview } from './pages/overview.js';
import { viewEconomy } from './pages/economy.js';
import { viewMoney } from './pages/money.js';
import { viewPeople } from './pages/people.js';
import { viewEnvironment } from './pages/environment.js';
import { viewRegions } from './pages/regions.js';
import { viewCompare } from './pages/compare.js';
import { viewSources } from './pages/sources.js';
import { navLinks } from './pages/shared.js';
import { INDICATOR_INDEX, PEERS, COMPARE_METRICS, YEARS, SERIES } from './data.js';
import { dotChart } from './charts.js';
import { esc } from './format.js';

const PAGES = {
  '/': { view: viewOverview, title: 'Vietnam in Numbers — National Statistics' },
  '/economy': { view: viewEconomy, title: 'Economy — Vietnam in Numbers' },
  '/money': { view: viewMoney, title: 'Money & Prices — Vietnam in Numbers' },
  '/people': { view: viewPeople, title: 'People — Vietnam in Numbers' },
  '/environment': { view: viewEnvironment, title: 'Environment — Vietnam in Numbers' },
  '/regions': { view: viewRegions, title: 'Regions — Vietnam in Numbers' },
  '/compare': { view: viewCompare, title: 'Compare — Vietnam in Numbers' },
  '/sources': { view: viewSources, title: 'Sources & Method — Vietnam in Numbers' },
};

const app = document.getElementById('app');
const nav = document.getElementById('nav');

function currentPath() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  return raw.startsWith('/') ? raw : '/' + raw;
}

function render() {
  const path = currentPath();
  const page = PAGES[path];
  nav.innerHTML = navLinks(path);
  app.innerHTML = page
    ? page.view()
    : `<section><h2>Page not found</h2><p>That page does not exist on this site. <a href="#/">Back to the overview →</a></p></section>`;
  window.scrollTo(0, 0);
  wirePage(path);
  document.title = page ? page.title : 'Vietnam in Numbers';
}

// --- Indicator search (overview) -----------------------------------------
function wireSearch() {
  const input = document.getElementById('indicator-search');
  const list = document.getElementById('indicator-results');
  if (!input || !list) return;
  const show = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      list.innerHTML = `<li class="hint">Start typing — or browse the sections above.</li>`;
      return;
    }
    const hits = INDICATOR_INDEX.filter((it) =>
      it.term.toLowerCase().includes(q) || it.section.toLowerCase().includes(q));
    list.innerHTML = hits.length
      ? hits.map((it) => `<li><strong>${esc(it.term)}</strong> — ${esc(it.value)} <span>· ${it.year}, ${esc(it.source)} · ${esc(it.section)}</span></li>`).join('')
      : `<li class="hint">No indicator matches “${esc(query.trim())}”. Try “exports”, “poverty” or “minimum wage”.</li>`;
  };
  input.addEventListener('input', () => show(input.value));
  show('');
}

// --- Year explorer (overview) --------------------------------------------
// One slider, six figures: the published value of each series for the
// chosen year, with the year-on-year change underneath.
const EXPLORER_CARDS = [
  { key: 'gdp', label: 'GDP', fmt: (v) => 'US$' + v.toFixed(1) + 'bn' },
  { key: 'growth', label: 'Real growth', fmt: (v) => v.toFixed(2) + '%' },
  { key: 'gdpPc', label: 'GDP per capita', fmt: (v) => 'US$' + v.toLocaleString('en-US') },
  { key: 'exports', label: 'Exports', fmt: (v) => 'US$' + v.toFixed(1) + 'bn' },
  { key: 'population', label: 'Population', fmt: (v) => v.toFixed(1) + 'm' },
  { key: 'cpi', label: 'Inflation (CPI)', fmt: (v) => v.toFixed(1) + '%' },
];

function wireYearExplorer() {
  const slider = document.getElementById('year-slider');
  const readout = document.getElementById('year-readout');
  const grid = document.getElementById('year-cards');
  if (!slider || !grid) return;
  const draw = (year) => {
    const i = YEARS.indexOf(year);
    readout.textContent = String(year);
    grid.innerHTML = EXPLORER_CARDS.map((c) => {
      const v = SERIES[c.key].values[i];
      const prev = i > 0 ? SERIES[c.key].values[i - 1] : null;
      const delta = prev === null ? '' : (() => {
        const d = v - prev;
        const sign = d >= 0 ? '+' : '−';
        return c.key === 'growth' || c.key === 'cpi'
          ? `${sign}${Math.abs(d).toFixed(2)} pts on ${YEARS[i - 1]}`
          : `${sign}${Math.abs(d).toFixed(1)} on ${YEARS[i - 1]}`;
      })();
      return `<article class="year-card">
        <p class="kpi-label">${esc(c.label)}</p>
        <p class="kpi-value">${esc(c.fmt(v))}</p>
        <p class="kpi-change">${esc(delta)}</p>
      </article>`;
    }).join('');
  };
  slider.addEventListener('input', () => draw(Number(slider.value)));
  draw(Number(slider.value));
}

// --- Sortable tables -------------------------------------------------------
function wireTables() {
  document.querySelectorAll('table.data-table').forEach((table) => {
    const head = table.querySelector('thead tr');
    const body = table.querySelector('tbody');
    let dir = 1;
    let lastCol = -1;
    head.querySelectorAll('th').forEach((th) => {
      th.addEventListener('click', () => {
        const col = Number(th.dataset.sort);
        dir = col === lastCol ? -dir : 1;
        lastCol = col;
        const rows = [...body.querySelectorAll('tr')];
        rows.sort((a, b) => {
          const ta = a.children[col].textContent.trim();
          const tb = b.children[col].textContent.trim();
          const na = parseFloat(ta.replace(/[^0-9.\-]/g, ''));
          const nb = parseFloat(tb.replace(/[^0-9.\-]/g, ''));
          const cmp = Number.isFinite(na) && Number.isFinite(nb) ? na - nb : ta.localeCompare(tb);
          return cmp * dir;
        });
        rows.forEach((r) => body.appendChild(r));
        head.querySelectorAll('th').forEach((h) => h.classList.remove('sorted-asc', 'sorted-desc'));
        th.classList.add(dir === 1 ? 'sorted-asc' : 'sorted-desc');
      });
    });
  });
}

// --- Compare dot plot (compare page) ---------------------------------------
function drawCompare(metricId) {
  const metric = COMPARE_METRICS.find((m) => m.id === metricId) || COMPARE_METRICS[0];
  const box = document.getElementById('compare-chart');
  if (!box) return;
  const rows = [...PEERS]
    .sort((a, b) => b[metric.id] - a[metric.id])
    .map((p) => ({ label: p.name + (p.self ? ' ★' : ''), value: p[metric.id], self: !!p.self }));
  box.innerHTML = `<h2>${esc(metric.label)} — 2024</h2>` +
    dotChart({ rows, valueFmt: metric.fmt, maxValue: Math.max(...rows.map((r) => r.value)) * 1.08 });
}

function wireCompare() {
  const picker = document.getElementById('metric-picker');
  if (!picker) return;
  drawCompare('gdp');
  picker.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      picker.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      drawCompare(btn.dataset.metric);
    });
  });
}

function wirePage(path) {
  wireTables();
  if (path === '/') { wireSearch(); wireYearExplorer(); }
  if (path === '/compare') wireCompare();
}

export function start() {
  window.addEventListener('hashchange', render);
  render();
}
