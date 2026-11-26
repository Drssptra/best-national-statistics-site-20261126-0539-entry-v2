// People page: demographics, pyramid, urbanisation, health & education.
import { YEARS, SERIES, AGE_BANDS, MALE_SHARE, PEOPLE, HEALTH_EDUCATION } from '../data.js';
import { areaChart, pyramidChart, PALETTE } from '../charts.js';
import { sectionHead, sourceLine, kpiGrid } from './shared.js';
import { esc } from '../format.js';

export function viewPeople() {
  return `
  ${sectionHead('People', 'A young country, ageing fast', '101 million people, a median age of 33, and a workforce of 52.5 million — but the share over 65 has risen from 6.5% to 8.1% in nine years.')}
  <section>
    ${kpiGrid(PEOPLE.map((p) => ({
      label: p.label, value: p.value, unit: p.unit,
      change: `${p.year} · ${p.source}`, blurb: p.note, source: p.source,
    })))}
  </section>
  <section class="split">
    <div>
      <h2>Population pyramid, 2024</h2>
      <p class="chart-note">Millions per five-year age band. The bulge at 30–39 is the workforce of the next two decades; the 0–4 band is already smaller than the 10–14 band.</p>
      ${pyramidChart({ bands: AGE_BANDS, maleShare: MALE_SHARE })}
      ${sourceLine('GSO age structure, 2024 (approximate bands)')}
    </div>
    <div>
      <h2>Urbanisation</h2>
      <p class="chart-note">Share of people living in urban areas, %. About 40.7 million Vietnamese now live in cities — up from 31.3 million in 2015.</p>
      ${areaChart({ years: YEARS, values: SERIES.urban.values, label: SERIES.urban.label, color: PALETTE.teal, format: (v) => v.toFixed(1) + '%' })}
      ${sourceLine('World Bank, 2015–2024')}
      <h2 class="sub-h">Population growth</h2>
      <p class="chart-note">Total population, millions. Growth has slowed to about 0.7% a year.</p>
      ${areaChart({ years: YEARS, values: SERIES.population.values, label: SERIES.population.label, color: PALETTE.navy, format: (v) => v.toFixed(1) + 'm' })}
      ${sourceLine('GSO / World Bank, 2015–2024')}
    </div>
  </section>
  <section class="split">
    ${HEALTH_EDUCATION.map((g) => `<div>
      <h2>${g.group}</h2>
      <dl class="fact-list">${g.items.map((it) => `<div><dt>${esc(it.label)}</dt><dd><strong>${esc(it.value)}</strong> <span>· ${it.year}, ${esc(it.source)}</span></dd></div>`).join('')}</dl>
    </div>`).join('')}
  </section>`;
}
