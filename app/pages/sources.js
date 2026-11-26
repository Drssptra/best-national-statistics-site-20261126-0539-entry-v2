// Sources & method page.
import { META } from '../data.js';
import { sectionHead } from './shared.js';
import { esc } from '../format.js';

export function viewSources() {
  return `
  ${sectionHead('Sources & method', 'Where every number comes from', 'Every figure on this site is a published official statistic. Nothing here is modelled, estimated by us, or scraped from another site.')}
  <section>
    <h2>Sources</h2>
    <dl class="fact-list">${META.sources.map((s) => `<div><dt>${esc(s.name)}</dt><dd><strong>${esc(s.url)}</strong> <span>— ${esc(s.note)}</span></dd></div>`).join('')}</dl>
  </section>
  <section class="split">
    <div>
      <h2>How we present figures</h2>
      <ul class="method-list">
        <li><strong>Latest year first.</strong> Headline cards show the most recent published year (usually 2024); every card names its year and source.</li>
        <li><strong>“≈” means approximate.</strong> A few figures (electricity, CO₂, some regional splits, average income) are rounded from published estimates and marked with ≈.</li>
        <li><strong>Current prices unless stated.</strong> GDP and trade are in current US dollars; growth rates are real (inflation-adjusted). Wages are in Vietnamese dong (VND).</li>
        <li><strong>Age bands are approximate.</strong> The pyramid uses GSO’s published age structure, grouped into five-year bands.</li>
      </ul>
    </div>
    <div>
      <h2>About this site</h2>
      <p>Vietnam in Numbers is an independent statistics site built for make.fun’s “Make the best national statistics site” bounty. It is not affiliated with the General Statistics Office of Viet Nam or any government body. All figures were checked against the sources above on 26 November 2026.</p>
      <p class="big-stat">101.0m <span>people · US$476bn GDP · 7.09% growth</span></p>
      <p><a href="#/">Back to the overview →</a></p>
    </div>
  </section>`;
}
