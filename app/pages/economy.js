// Economy page: trade, inflation, FDI and the decade table.
import { YEARS, SERIES, TOP_EXPORTS, EXPORT_MARKETS } from '../data.js';
import { areaChart, vbarChart, lollipopChart, PALETTE } from '../charts.js';
import { sectionHead, sourceLine } from './shared.js';

function economyTable() {
  const rows = YEARS.map((y, i) => `<tr>
    <td>${y}</td><td>${SERIES.gdp.values[i].toFixed(1)}</td><td>${SERIES.growth.values[i].toFixed(2)}%</td>
    <td>${SERIES.gdpPc.values[i].toLocaleString('en-US')}</td><td>${SERIES.exports.values[i].toFixed(1)}</td>
    <td>${SERIES.imports.values[i].toFixed(1)}</td><td>${SERIES.cpi.values[i].toFixed(1)}%</td><td>${SERIES.fdi.values[i].toFixed(1)}</td>
  </tr>`).join('');
  return `<div class="table-wrap"><table class="data-table" id="economy-table">
    <thead><tr><th data-sort="0">Year</th><th data-sort="1">GDP (US$ bn)</th><th data-sort="2">Growth</th><th data-sort="3">GDP / capita (US$)</th><th data-sort="4">Exports (US$ bn)</th><th data-sort="5">Imports (US$ bn)</th><th data-sort="6">CPI</th><th data-sort="7">FDI (US$ bn)</th></tr></thead>
    <tbody>${rows}</tbody></table></div>
    <p class="table-hint">Tap a column heading to sort the table. Sources: GSO and World Bank, 2015–2024.</p>`;
}

export function viewEconomy() {
  return `
  ${sectionHead('Economy', 'Growth, trade and prices', 'A decade of figures for the economy that grew fastest in South-East Asia in 2024 — output, trade, inflation and the foreign investment behind the factories.')}
  <section class="split">
    <div>
      <h2>Trade: exports vs imports</h2>
      <p class="chart-note">Goods trade, US$ billion, 2015–2024. Exports overtook imports in 2016 and have stayed ahead — a surplus of US$24.77bn in 2024.</p>
      ${areaChart({ years: YEARS, values: SERIES.exports.values, label: SERIES.exports.label, color: PALETTE.red, format: (v) => 'US$' + Math.round(v) + 'bn' })}
      ${areaChart({ years: YEARS, values: SERIES.imports.values, label: SERIES.imports.label, color: PALETTE.navy, format: (v) => 'US$' + Math.round(v) + 'bn' })}
      <p class="legend-line"><span class="dot red"></span>Exports <span class="dot navy"></span>Imports</p>
      ${sourceLine('GSO, 2015–2024')}
    </div>
    <div>
      <h2>Inflation under control</h2>
      <p class="chart-note">Consumer price inflation, %. It has stayed between 0.6% and 3.6% for the whole decade — 3.63% in 2024, inside the National Assembly target.</p>
      ${vbarChart({ years: YEARS, values: SERIES.cpi.values, label: SERIES.cpi.label, color: PALETTE.amber, format: (v) => v.toFixed(1) + '%' })}
      ${sourceLine('GSO, 2015–2024')}
    </div>
  </section>

  <section>
    <h2>Top export goods, 2024</h2>
    <p class="chart-note">US$ billion. 37 product lines each earned over US$1 billion; together they were 94.3% of all exports.</p>
    ${lollipopChart({ rows: TOP_EXPORTS.map((t) => ({ label: t.product, value: t.value })), valueFmt: (v) => 'US$' + v.toFixed(1) + 'bn' })}
    ${sourceLine('GSO, 2024')}
  </section>

  <section class="split">
    <div>
      <h2>Where exports go, 2024</h2>
      <p class="chart-note">US$ billion. The United States takes almost a third of exports; China is the largest source of imports (US$144.3bn).</p>
      ${lollipopChart({ rows: EXPORT_MARKETS.map((m) => ({ label: m.market, value: m.value })), valueFmt: (v) => 'US$' + v.toFixed(1) + 'bn', color: PALETTE.teal })}
      ${sourceLine('GSO, 2024')}
    </div>
    <div>
      <h2>Foreign investment</h2>
      <p class="chart-note">Registered FDI, US$ billion. 2024 brought US$38.23bn of registered capital and US$25.35bn actually disbursed — the highest disbursement ever.</p>
      ${vbarChart({ years: YEARS, values: SERIES.fdi.values, label: SERIES.fdi.label, color: PALETTE.amber, format: (v) => 'US$' + v.toFixed(1) + 'bn' })}
      ${sourceLine('GSO, 2015–2024')}
    </div>
  </section>

  <section>
    <h2>The decade in one table</h2>
    <p class="chart-note">Every headline economic figure, 2015–2024.</p>
    ${economyTable()}
  </section>`;
}
