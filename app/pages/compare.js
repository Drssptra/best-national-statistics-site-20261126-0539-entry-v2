// Compare page: Vietnam against five South-East Asian neighbours.
// The chart is a dot plot on a shared scale; the table is sortable.
import { PEERS, COMPARE_METRICS } from '../data.js';
import { sectionHead } from './shared.js';
import { esc } from '../format.js';

export function viewCompare() {
  return `
  ${sectionHead('Compare', 'Vietnam against its neighbours', 'How does Vietnam stack up in South-East Asia? Pick an indicator and the dot plot re-draws; Vietnam is the red dot. All figures 2024 unless noted.')}
  <section>
    <div class="metric-picker" id="metric-picker" role="group" aria-label="Choose an indicator">
      ${COMPARE_METRICS.map((m, i) => `<button type="button" data-metric="${m.id}" class="${i === 0 ? 'active' : ''}">${esc(m.label)}</button>`).join('')}
    </div>
    <div id="compare-chart"></div>
    <p class="source">Sources: World Bank, IMF and WTO, 2024. Singapore life expectancy 2023. Exports are merchandise (goods) trade.</p>
  </section>
  <section>
    <h2>The full comparison table</h2>
    <p class="chart-note">Tap a column heading to sort. Vietnam’s row is highlighted.</p>
    <div class="table-wrap"><table class="data-table" id="compare-table">
      <thead><tr><th data-sort="0">Country</th><th data-sort="1">Population (m)</th><th data-sort="2">GDP (US$ bn)</th><th data-sort="3">GDP / capita (US$)</th><th data-sort="4">Growth (%)</th><th data-sort="5">Exports (US$ bn)</th><th data-sort="6">Life expectancy</th><th data-sort="7">Urban (%)</th></tr></thead>
      <tbody>${PEERS.map((p) => `<tr class="${p.self ? 'self-row' : ''}"><td><strong>${esc(p.name)}</strong>${p.self ? ' ★' : ''}</td><td>${p.pop.toFixed(1)}</td><td>${p.gdp.toLocaleString('en-US')}</td><td>${p.gdpPc.toLocaleString('en-US')}</td><td>${p.growth.toFixed(2)}%</td><td>${p.exports.toLocaleString('en-US')}</td><td>${p.life.toFixed(1)}</td><td>${p.urban.toFixed(1)}%</td></tr>`).join('')}</tbody>
    </table></div>
  </section>
  <section class="takeaways">
    <h2>What the comparison says</h2>
    <ul>
      <li><strong>Fastest growth:</strong> Vietnam’s 7.09% in 2024 beat every neighbour — the Philippines was next at 5.6%.</li>
      <li><strong>Trade giant:</strong> Vietnam exports more goods (US$405.5bn) than Thailand, Indonesia and the Philippines combined.</li>
      <li><strong>Still catching up:</strong> GDP per capita (US$4,700) is below Thailand (US$7,340) and far below Malaysia (US$12,380) — the gap is the story of the next decade.</li>
      <li><strong>Healthy and urbanising:</strong> life expectancy (74.6) beats Indonesia and the Philippines; only 40.3% live in cities, so urbanisation has far to run.</li>
    </ul>
  </section>`;
}
