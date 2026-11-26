// Shared page helpers: section headers, source lines and KPI cards.
// Every page module imports these instead of duplicating markup.
import { esc, kpiValue } from '../format.js';
import { sparkline } from '../charts.js';

export const ROUTES = [
  { path: '/', label: 'Overview' },
  { path: '/economy', label: 'Economy' },
  { path: '/money', label: 'Money' },
  { path: '/people', label: 'People' },
  { path: '/environment', label: 'Environment' },
  { path: '/regions', label: 'Regions' },
  { path: '/compare', label: 'Compare' },
  { path: '/sources', label: 'Sources' },
];

export function navLinks(current) {
  return ROUTES.map((r) => `<a href="#${r.path}" class="${r.path === current ? 'active' : ''}">${r.label}</a>`).join('');
}

export function sectionHead(kicker, title, intro) {
  return `<div class="section-head"><p class="kicker">${esc(kicker)}</p><h2>${esc(title)}</h2><p class="intro">${esc(intro)}</p></div>`;
}

export function sourceLine(source) {
  return `<p class="source">Source: ${esc(source)}</p>`;
}

// Generic KPI card grid. `cards` is an array of { label, value, unit,
// change, blurb, source, spark? }.
export function kpiGrid(cards) {
  return `<div class="kpi-grid">${cards.map((c) => `<article class="kpi">
    <p class="kpi-label">${esc(c.label)}</p>
    <p class="kpi-value">${esc(c.value)} <span class="kpi-unit">${esc(c.unit ?? '')}</span></p>
    <p class="kpi-change">${esc(c.change)}</p>
    ${c.blurb ? `<p class="kpi-blurb">${esc(c.blurb)}</p>` : ''}
    ${c.spark ? sparkline(c.spark) : ''}
    <p class="kpi-source">Source: ${esc(c.source)}</p>
  </article>`).join('')}</div>`;
}

// Headline cards from HEADLINES in data.js, with a sparkline where a
// 2015–2024 series exists for that indicator.
export function headlineCards(HEADLINES, SERIES) {
  const seriesKey = {
    population: 'population', gdp: 'gdp', 'gdp-pc': 'gdpPc', exports: 'exports',
    inflation: 'cpi', life: null, urban: 'urban', forest: 'forest',
  };
  return kpiGrid(HEADLINES.map((h) => ({
    label: h.label,
    value: kpiValue(h),
    unit: h.unit,
    change: `${h.change} · ${h.year}`,
    blurb: h.blurb,
    source: h.source,
    spark: seriesKey[h.id] ? SERIES[seriesKey[h.id]].values : null,
  })));
}
