// Regions page: the six socio-economic regions and the largest provinces.
import { REGIONS, TOP_PROVINCES } from '../data.js';
import { lollipopChart, PALETTE } from '../charts.js';
import { sectionHead, sourceLine } from './shared.js';
import { esc } from '../format.js';

export function viewRegions() {
  const maxPop = Math.max(...REGIONS.map((r) => r.pop));
  return `
  ${sectionHead('Regions', 'Six regions, one country', 'Vietnam’s 63 provinces group into six socio-economic regions. The Southeast holds the economic engine; the Mekong Delta grows the rice.')}
  <section>
    <div class="table-wrap"><table class="data-table" id="regions-table">
      <thead><tr><th data-sort="0">Region</th><th data-sort="1">Main city</th><th data-sort="2">Area (km²)</th><th data-sort="3">Population (m)</th><th data-sort="4">Density (/km²)</th></tr></thead>
      <tbody>${REGIONS.map((r) => `<tr><td><strong>${esc(r.name)}</strong><br><span class="row-note">${esc(r.note)}</span></td><td>${esc(r.capital)}</td><td>${r.area.toLocaleString('en-US')}</td><td>${r.pop.toFixed(1)}</td><td>${r.density.toLocaleString('en-US')}</td></tr>`).join('')}</tbody>
    </table></div>
    <p class="table-hint">Tap a column heading to sort the table. Sources: GSO, 2024 (approximate).</p>
  </section>
  <section class="split">
    <div>
      <h2>Population by region</h2>
      <p class="chart-note">Millions of people, 2024. The Red River Delta is the most populous region; the Central Highlands the least.</p>
      ${lollipopChart({ rows: [...REGIONS].sort((a, b) => b.pop - a.pop).map((r) => ({ label: r.name, value: r.pop })), valueFmt: (v) => v.toFixed(1) + 'm', maxValue: maxPop * 1.05 })}
      ${sourceLine('GSO, 2024 (approximate)')}
    </div>
    <div>
      <h2>Largest provinces &amp; cities</h2>
      <p class="chart-note">Population, millions, 2024. Ho Chi Minh City and Ha Noi together hold more than 18 million people — nearly a fifth of the country.</p>
      ${lollipopChart({ rows: TOP_PROVINCES.map((p) => ({ label: p.name, value: p.pop })), valueFmt: (v) => v.toFixed(1) + 'm', color: PALETTE.teal })}
      ${sourceLine('GSO, 2024')}
    </div>
  </section>`;
}
