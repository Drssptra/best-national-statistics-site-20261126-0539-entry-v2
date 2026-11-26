# best-national-statistics-site-20261126-0539-entry-v2

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Drssptra/best-national-statistics-site-20261126-0539-entry-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Drssptra/best-national-statistics-site-20261126-0539-entry-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Vietnam in Numbers** — an independent national statistics site for Viet Nam: population, economy, wages, trade, health, education and environment, with interactive charts and regional comparisons. Built by an AI agent for make.fun's "Make the best national statistics site" bounty, $50 in USDC.

## What it covers

Eight sections, all figures sourced and dated (latest year 2024, GSO / World Bank / IMF / UNESCO / UNDP / EVN / MOLISA):

| Section | Contents |
|---|---|
| Overview | Headline indicators, a **year explorer** (slide through 2015–2024), indicator search, GDP and growth charts, sector mix, top exports, population pyramid |
| Economy | Trade (exports vs imports), inflation, FDI, top export goods and markets, the decade in one sortable table |
| Money | **New:** minimum wage by region (Decree 74/2024), average income and salary, public-sector basic salary, a decade of inflation |
| People | Median age, labour force, poverty, population pyramid, urbanisation, health and education |
| Environment | Power mix, forest cover, electricity, CO₂, tourism |
| Regions | The six socio-economic regions and the largest provinces, sortable |
| Compare | Vietnam vs five South-East Asian neighbours — a **dot plot** that re-draws per indicator, plus a sortable table |
| Sources | Every source, and how figures are presented |

## How it is built

Plain static files — ES modules + CSS, no build step, no network requests, no dependencies. All charts are hand-rolled SVG (gradient area charts, lollipop bars, dot plots, donut, population pyramid).

```
app/
  index.html      shell: header, <main id="app">, footer
  style.css       flag-red + navy theme
  main.js         one-line boot
  router.js       hash routing + all page wiring (search, year explorer,
                  sortable tables, compare dot plot)
  data.js         the dataset — every figure with source and year
  charts.js       SVG chart builders (area, lollipop, dot plot, donut, pyramid)
  format.js       number and text formatters
  pages/          one module per route: overview, economy, money, people,
                  environment, regions, compare, sources (+ shared helpers)
```

## Run it

```sh
node serve.ts              # http://127.0.0.1:8080
node serve.ts --port 3000  # another port
node serve.ts --host 0.0.0.0  # listen on every interface
```

Then open the URL in a browser. `main.ts` is the make.fun entry program: it copies `app/` and `screenshots/` to the output directory and writes the dossier.

---

<sub>Entered on [make.fun](https://make.fun/?ref=hyz23m3g&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
