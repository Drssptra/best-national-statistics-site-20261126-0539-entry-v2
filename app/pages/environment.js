// Environment page: power mix, forest cover, tourism.
import { YEARS, SERIES, ENERGY_MIX, ENVIRONMENT } from '../data.js';
import { areaChart, donutChart, PALETTE } from '../charts.js';
import { sectionHead, sourceLine, kpiGrid } from './shared.js';

export function viewEnvironment() {
  return `
  ${sectionHead('Environment', 'Power, forests and the climate bill', 'Vietnam runs one of Asia’s fastest-growing power systems, still leans on coal, and has kept 42% of its land under forest — while its carbon emissions keep climbing.')}
  <section>
    ${kpiGrid(ENVIRONMENT.map((e) => ({
      label: e.label, value: e.value, unit: e.unit,
      change: `${e.year} · ${e.source}`, blurb: e.note, source: e.source,
    })))}
  </section>
  <section class="split">
    <div>
      <h2>How the power is made</h2>
      <p class="chart-note">Share of installed generating capacity, 2024 (about 85 GW in total). Hydro, solar and wind together pass half of capacity.</p>
      ${donutChart({ slices: ENERGY_MIX.map((e) => ({ label: e.source, value: e.share, color: e.color })), centerTop: '85 GW', centerBottom: 'installed capacity' })}
      ${sourceLine('EVN, 2024 (approximate shares)')}
    </div>
    <div>
      <h2>Forest cover, 2015–2024</h2>
      <p class="chart-note">Forest as a share of land area, %. Cover rose from 40.8% to 42.0% and has held there — about 14.8 million hectares.</p>
      ${areaChart({ years: YEARS, values: SERIES.forest.values, label: SERIES.forest.label, color: PALETTE.green, format: (v) => v.toFixed(1) + '%' })}
      ${sourceLine('GSO, 2015–2024')}
      <h2 class="sub-h">Visitors are back</h2>
      <p class="chart-note">International tourist arrivals hit 17.6 million in 2024 — up 39.5% on 2023 and 97.6% of the pre-pandemic level.</p>
      <p class="big-stat">17.6m <span>arrivals in 2024 · GSO</span></p>
    </div>
  </section>`;
}
