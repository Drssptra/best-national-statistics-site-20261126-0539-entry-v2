// Money page (new in this revision): wages, incomes and prices —
// what the headline GDP figures mean for a household.
import { YEARS, SERIES, MIN_WAGE, MONEY } from '../data.js';
import { areaChart, PALETTE } from '../charts.js';
import { sectionHead, sourceLine, kpiGrid } from './shared.js';
import { esc } from '../format.js';

function minWageTable() {
  return `<div class="table-wrap"><table class="data-table" id="wage-table">
    <thead><tr><th data-sort="0">Region</th><th data-sort="1">Where it applies</th><th data-sort="2">Monthly (VND)</th><th data-sort="3">Hourly (VND)</th><th data-sort="4">Before Jul 2024 (VND)</th></tr></thead>
    <tbody>${MIN_WAGE.map((w) => `<tr>
      <td><strong>${esc(w.region)}</strong></td>
      <td>${esc(w.areas)}</td>
      <td>${w.monthly.toLocaleString('en-US')}</td>
      <td>${w.hourly.toLocaleString('en-US')}</td>
      <td>${w.prevMonthly.toLocaleString('en-US')}</td>
    </tr>`).join('')}</tbody></table></div>
    <p class="table-hint">Tap a column heading to sort. Decree 74/2024/ND-CP, in force 1 July 2024 — a 6% rise on the 2022 levels.</p>`;
}

export function viewMoney() {
  return `
  ${sectionHead('Money', 'Wages, incomes and prices', 'GDP per capita is US$4,700 — but what do people actually earn? The minimum wage, the average pay packet, and a decade of prices.')}
  <section>
    ${kpiGrid(MONEY.map((m) => ({
      label: m.label, value: m.value, unit: m.unit,
      change: `${m.year} · ${m.source}`, blurb: m.note, source: m.source,
    })))}
  </section>

  <section>
    <h2>The minimum wage, by region</h2>
    <p class="chart-note">Monthly minimum wage for employees under labour contracts, VND. Region I covers urban Ha Noi and Ho Chi Minh City; Region IV covers the remaining localities.</p>
    ${minWageTable()}
    ${sourceLine('Decree 74/2024/ND-CP (MOLISA), from 1 July 2024')}
  </section>

  <section class="split">
    <div>
      <h2>Prices: a decade of inflation</h2>
      <p class="chart-note">Consumer price inflation, %. The 2020–21 pandemic years were the cheapest in the decade; 2024 came in at 3.63%, inside the 4–4.5% target.</p>
      ${areaChart({ years: YEARS, values: SERIES.cpi.values, label: SERIES.cpi.label, color: PALETTE.amber, format: (v) => v.toFixed(1) + '%' })}
      ${sourceLine('GSO, 2015–2024')}
    </div>
    <div>
      <h2>Pay vs prices</h2>
      <p class="chart-note">The average paid employee earned VND 7.6 million a month in early 2024 (GSO) — about 1.5 times the Region I minimum wage. Average income per person, across workers and non-workers alike, was about VND 5.4 million a month in 2024.</p>
      <p class="big-stat">VND 7.6m <span>average monthly salary, paid employees · Q1 2024, GSO</span></p>
      <p class="big-stat">VND 2.34m <span>public-sector basic salary · from 1 July 2024, Decree 73/2024</span></p>
      <p>That basic salary — raised 30% from VND 1.8 million — is the base for public-sector pay, pensions and social-insurance calculations, so the July 2024 rise lifted incomes well beyond the civil service.</p>
      <p><a href="#/economy">The macro picture →</a></p>
    </div>
  </section>`;
}
