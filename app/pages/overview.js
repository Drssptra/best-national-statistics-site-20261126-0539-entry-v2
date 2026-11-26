// Overview page: red hero, year explorer, headline cards, indicator
// search, and the two headline charts (GDP area chart + growth bars).
import {
  META, HEADLINES, YEARS, SERIES, SECTORS, TOP_EXPORTS,
  AGE_BANDS, MALE_SHARE, INDICATOR_INDEX,
} from '../data.js';
import { areaChart, vbarChart, donutChart, lollipopChart, pyramidChart, PALETTE } from '../charts.js';
import { sectionHead, sourceLine, headlineCards } from './shared.js';

export function viewOverview() {
  const gdp = SERIES.gdp;
  const growth = SERIES.growth;
  return `
  <section class="hero">
    <p class="kicker">National statistics · Socialist Republic of Viet Nam</p>
    <h1>Vietnam<br>in Numbers</h1>
    <p class="lede">One country, counted properly. Population, economy, trade, health,
    education and environment — every figure with its source and its year,
    updated to ${META.latestYear}.</p>
    <div class="hero-facts">
      <div><strong>101.0m</strong><span>people (2024)</span></div>
      <div><strong>US$476bn</strong><span>GDP (2024)</span></div>
      <div><strong>+7.09%</strong><span>real growth (2024)</span></div>
      <div><strong>63</strong><span>provinces &amp; cities</span></div>
    </div>
  </section>

  <section class="explorer" aria-label="Explore a year">
    <div class="explorer-head">
      <h2>Pick a year, see the country</h2>
      <p>Drag the slider through 2015–2024. Every figure below is the published value for that year.</p>
    </div>
    <div class="explorer-controls">
      <input id="year-slider" type="range" min="2015" max="2024" step="1" value="2024" aria-label="Year">
      <output id="year-readout" for="year-slider">2024</output>
    </div>
    <div class="explorer-grid" id="year-cards"></div>
    <p class="source">Sources: GSO and World Bank, 2015–2024.</p>
  </section>

  <section>
    ${sectionHead('At a glance', 'The country in eight numbers', 'The headline indicators most visitors come for. Each card shows the latest value, how it moved, and where it came from.')}
    ${headlineCards(HEADLINES, SERIES)}
  </section>

  <section class="search-block">
    <h2>Find an indicator</h2>
    <p>Type to search ${INDICATOR_INDEX.length} published indicators — population, trade, poverty, literacy, wages, energy and more.</p>
    <input id="indicator-search" type="search" placeholder="Try “exports”, “poverty” or “minimum wage”…" aria-label="Search indicators">
    <ul id="indicator-results" class="indicator-results"></ul>
  </section>

  <section class="split">
    <div>
      <h2>GDP, 2015–2024</h2>
      <p class="chart-note">Current US$ billion. The economy more than doubled in a decade — with a pandemic dip in 2020–21 and a sharp rebound in 2022.</p>
      ${areaChart({ years: YEARS, values: gdp.values, label: gdp.label, format: (v) => 'US$' + Math.round(v) + 'bn' })}
      ${sourceLine(gdp.source + ' · 2015–2024')}
    </div>
    <div>
      <h2>Growth, year by year</h2>
      <p class="chart-note">Real GDP growth, %. 2022 was the fastest year in a decade at 8.02%; 2024 came in at 7.09%.</p>
      ${vbarChart({ years: YEARS, values: growth.values, label: growth.label, color: PALETTE.navy, format: (v) => v.toFixed(2) + '%' })}
      ${sourceLine(growth.source + ' · 2015–2024')}
    </div>
  </section>

  <section class="split">
    <div>
      <h2>What the economy is made of</h2>
      <p class="chart-note">Share of gross value added, 2024. Services are now the largest part of the economy; agriculture is down to about a tenth.</p>
      ${donutChart({ slices: SECTORS.map((s) => ({ label: s.name, value: s.share, color: s.color })), centerTop: '100%', centerBottom: 'of value added' })}
      ${sourceLine('GSO, 2024')}
    </div>
    <div>
      <h2>What Vietnam sells</h2>
      <p class="chart-note">Top export goods, 2024, US$ billion. Electronics and phones alone are worth more than US$126 billion.</p>
      ${lollipopChart({ rows: TOP_EXPORTS.slice(0, 6).map((t) => ({ label: t.product, value: t.value })), valueFmt: (v) => 'US$' + v.toFixed(1) + 'bn' })}
      ${sourceLine('GSO, 2024')}
      <p class="more-link"><a href="#/economy">See the full trade picture →</a></p>
    </div>
  </section>

  <section>
    <h2>Who lives here</h2>
    <p class="chart-note">Population pyramid, 2024, millions per age band. A broad base of working-age adults, a narrowing base of children, and a growing older population.</p>
    ${pyramidChart({ bands: AGE_BANDS, maleShare: MALE_SHARE })}
    ${sourceLine('GSO age structure, 2024 (approximate bands, totals ≈ 101 million)')}
    <p class="more-link"><a href="#/people">People, health and education →</a></p>
  </section>`;
}
