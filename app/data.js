// Vietnam in Numbers — the dataset.
// Every figure carries its source and year. Values are from the General
// Statistics Office of Viet Nam (GSO), the World Bank (WDI), the IMF,
// UNESCO, UNDP, EVN and the Ministry of Labour, Invalids and Social
// Affairs (MOLISA). Approximate values are marked with ~ in the notes.

export const META = {
  country: 'Viet Nam',
  countryShort: 'Vietnam',
  title: 'Vietnam in Numbers',
  tagline: 'The country, counted. Population, economy, trade, health, education and environment — every figure sourced.',
  updated: '26 November 2026',
  latestYear: 2024,
  sources: [
    { name: 'General Statistics Office of Viet Nam (GSO)', url: 'gso.gov.vn', note: 'National accounts, trade, population, CPI, FDI and poverty statistics.' },
    { name: 'World Bank — World Development Indicators', url: 'data.worldbank.org', note: 'Population, GDP, life expectancy, urban share, health spending.' },
    { name: 'International Monetary Fund (IMF)', url: 'imf.org', note: 'GDP in purchasing-power terms and regional comparisons.' },
    { name: 'UNESCO Institute for Statistics', url: 'uis.unesco.org', note: 'Literacy and school enrolment.' },
    { name: 'UNDP Human Development Report', url: 'hdr.undp.org', note: 'Mean years of schooling and human development.' },
    { name: 'Electricity of Viet Nam (EVN)', url: 'evn.com.vn', note: 'Installed capacity and electricity generation.' },
    { name: 'World Trade Organization (WTO)', url: 'wto.org', note: 'Merchandise trade of regional peers.' },
    { name: 'Ministry of Labour, Invalids and Social Affairs (MOLISA)', url: 'molisa.gov.vn', note: 'Regional minimum wages (Decree 74/2024/ND-CP) and average wages.' },
  ],
};

// Headline indicators shown on the overview.
export const HEADLINES = [
  { id: 'population', label: 'Population', value: 101.0, unit: 'million', year: 2024, change: '+0.7% on 2023', source: 'GSO', blurb: 'The 15th most populous country on Earth.' },
  { id: 'gdp', label: 'GDP', value: 476.3, unit: 'US$ billion', year: 2024, change: '+7.09% real growth', source: 'GSO / World Bank', blurb: 'One of the fastest-growing economies in Asia.' },
  { id: 'gdp-pc', label: 'GDP per capita', value: 4700, unit: 'US$', year: 2024, change: '+US$377 on 2023', source: 'GSO', blurb: 'Roughly US$16,900 in purchasing-power terms (IMF).' },
  { id: 'exports', label: 'Exports of goods', value: 405.5, unit: 'US$ billion', year: 2024, change: '+14.3% on 2023', source: 'GSO', blurb: 'A record year — the 9th straight trade surplus.' },
  { id: 'inflation', label: 'Consumer inflation', value: 3.63, unit: '% (CPI)', year: 2024, change: 'within the 4–4.5% target', source: 'GSO', blurb: 'Prices rose 3.63% over the year.' },
  { id: 'life', label: 'Life expectancy', value: 74.6, unit: 'years', year: 2023, change: 'up from 73.6 in 2015', source: 'World Bank', blurb: 'Among the highest in South-East Asia.' },
  { id: 'urban', label: 'Urban population', value: 40.3, unit: '%', year: 2024, change: 'up from 34.1% in 2015', source: 'World Bank', blurb: 'About 40.7 million people live in cities.' },
  { id: 'forest', label: 'Forest cover', value: 42.0, unit: '% of land', year: 2024, change: 'up from 40.8% in 2015', source: 'GSO', blurb: 'Roughly 14.8 million hectares of forest.' },
];

// Annual series, 2015–2024.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const SERIES = {
  gdp: { label: 'GDP, current US$ billion', source: 'World Bank / GSO', values: [233.5, 252.6, 281.4, 310.1, 334.4, 346.6, 366.1, 408.8, 429.7, 476.3] },
  growth: { label: 'Real GDP growth, %', source: 'GSO', values: [6.68, 6.21, 6.81, 7.08, 7.02, 2.87, 2.55, 8.02, 5.05, 7.09] },
  gdpPc: { label: 'GDP per capita, current US$', source: 'World Bank / GSO', values: [2566, 2740, 3024, 3302, 3528, 3620, 3790, 4203, 4347, 4700] },
  exports: { label: 'Exports of goods, US$ billion', source: 'GSO', values: [162.1, 176.6, 214.0, 243.7, 264.3, 282.7, 336.3, 371.9, 353.1, 405.5] },
  imports: { label: 'Imports of goods, US$ billion', source: 'GSO', values: [165.6, 174.1, 213.2, 236.7, 253.4, 262.7, 332.2, 360.7, 325.4, 380.8] },
  cpi: { label: 'Consumer price inflation, %', source: 'GSO', values: [0.6, 2.7, 3.5, 3.5, 2.8, 3.2, 1.8, 3.2, 3.3, 3.6] },
  fdi: { label: 'Registered FDI, US$ billion', source: 'GSO', values: [22.8, 24.4, 35.9, 35.5, 38.0, 28.5, 31.2, 27.7, 36.6, 38.2] },
  population: { label: 'Population, millions', source: 'GSO / World Bank', values: [91.7, 92.7, 93.7, 94.7, 96.2, 97.3, 98.5, 99.5, 100.3, 101.0] },
  urban: { label: 'Urban population, %', source: 'World Bank', values: [34.1, 34.9, 35.7, 36.4, 37.0, 37.6, 38.2, 38.9, 39.6, 40.3] },
  forest: { label: 'Forest cover, % of land area', source: 'GSO', values: [40.8, 41.2, 41.4, 41.7, 41.9, 42.0, 42.0, 42.0, 42.0, 42.0] },
};

// Structure of the economy, 2024 (share of gross value added).
export const SECTORS = [
  { name: 'Services', share: 42.4, note: 'Trade, transport, finance, tourism', color: '#c8102e' },
  { name: 'Industry & construction', share: 37.6, note: 'Manufacturing, mining, building', color: '#1b2a4a' },
  { name: 'Agriculture, forestry & fishing', share: 11.9, note: 'Rice, coffee, seafood, timber', color: '#e8a317' },
  { name: 'Taxes less subsidies', share: 8.1, note: 'Product taxes net of subsidies', color: '#94a3b8' },
];

// What Vietnam sells abroad, 2024.
export const TOP_EXPORTS = [
  { product: 'Electronics, computers & parts', value: 72.6 },
  { product: 'Phones & components', value: 53.9 },
  { product: 'Machinery & equipment', value: 52.5 },
  { product: 'Textiles & garments', value: 37.1 },
  { product: 'Footwear', value: 22.9 },
  { product: 'Wood & wood products', value: 16.2 },
  { product: 'Seafood', value: 10.1 },
  { product: 'Coffee', value: 5.6 },
];

// Where the exports go, 2024.
export const EXPORT_MARKETS = [
  { market: 'United States', value: 119.6 },
  { market: 'China', value: 61.2 },
  { market: 'European Union', value: 51.7 },
  { market: 'ASEAN', value: 29.6 },
  { market: 'South Korea', value: 25.4 },
  { market: 'Japan', value: 21.6 },
];

// Age structure, 2024, millions per 5-year band (approximate, GSO age structure).
export const AGE_BANDS = [
  { band: '0–4', total: 7.4 }, { band: '5–9', total: 7.8 }, { band: '10–14', total: 8.0 },
  { band: '15–19', total: 7.8 }, { band: '20–24', total: 7.5 }, { band: '25–29', total: 8.0 },
  { band: '30–34', total: 8.3 }, { band: '35–39', total: 8.4 }, { band: '40–44', total: 7.6 },
  { band: '45–49', total: 6.7 }, { band: '50–54', total: 6.1 }, { band: '55–59', total: 5.5 },
  { band: '60–64', total: 4.6 }, { band: '65–69', total: 3.4 }, { band: '70–74', total: 2.3 },
  { band: '75–79', total: 1.3 }, { band: '80+', total: 1.0 },
];
// Male share of each band, falling with age (GSO sex ratios by age).
export const MALE_SHARE = [0.515, 0.513, 0.512, 0.511, 0.510, 0.508, 0.506, 0.504, 0.501, 0.497, 0.492, 0.486, 0.478, 0.465, 0.448, 0.425, 0.380];

export const PEOPLE = [
  { label: 'Median age', value: '33.1', unit: 'years', year: 2024, source: 'GSO', note: 'A young workforce: 52.5 million people are in the labour force.' },
  { label: 'Working-age share (15–64)', value: '68.4', unit: '%', year: 2024, source: 'GSO', note: 'The demographic dividend is still open — but the 65+ share is rising fast.' },
  { label: 'Aged 65 and over', value: '8.1', unit: '%', year: 2024, source: 'GSO', note: 'Up from 6.5% in 2015. Viet Nam is ageing before it is rich.' },
  { label: 'Unemployment rate', value: '2.24', unit: '%', year: 2024, source: 'GSO', note: 'Urban unemployment 2.54%; the informal sector still employs about two-thirds of workers.' },
  { label: 'Labour force', value: '52.5', unit: 'million', year: 2024, source: 'GSO', note: 'Labour-force participation is about 68.9% of people aged 15+.' },
  { label: 'Multidimensional poverty', value: '1.93', unit: '%', year: 2024, source: 'GSO', note: 'Down from 4.4% in 2021 on the national multidimensional measure.' },
];

export const HEALTH_EDUCATION = [
  { group: 'Health', items: [
    { label: 'Life expectancy at birth', value: '74.6 years', year: 2023, source: 'World Bank' },
    { label: 'Infant mortality', value: '12.1 per 1,000 live births', year: 2024, source: 'GSO' },
    { label: 'Under-5 mortality', value: '18.1 per 1,000 live births', year: 2024, source: 'GSO' },
    { label: 'Physicians', value: '9.8 per 10,000 people', year: 2023, source: 'GSO' },
    { label: 'Hospital beds', value: '31.6 per 10,000 people', year: 2023, source: 'GSO' },
    { label: 'Health spending', value: '≈5.5% of GDP', year: 2022, source: 'World Bank' },
  ] },
  { group: 'Education', items: [
    { label: 'Adult literacy (15+)', value: '95.8%', year: 2023, source: 'UNESCO' },
    { label: 'Primary net enrolment', value: '98.9%', year: 2023, source: 'UNESCO' },
    { label: 'Lower-secondary enrolment', value: '95.3%', year: 2023, source: 'UNESCO' },
    { label: 'Mean years of schooling', value: '8.7 years', year: 2023, source: 'UNDP' },
    { label: 'Universities & colleges', value: '244 institutions', year: 2024, source: 'GSO' },
    { label: 'Higher-education students', value: '≈2.1 million', year: 2024, source: 'GSO' },
  ] },
];

// Six socio-economic regions, 2024 (GSO).
export const REGIONS = [
  { name: 'Red River Delta', capital: 'Ha Noi', area: 21260, pop: 23.6, density: 1110, note: 'Political and industrial heartland; Ha Noi and Hai Phong.' },
  { name: 'Northern Midlands & Mountains', capital: 'Thai Nguyen', area: 95282, pop: 13.3, density: 140, note: 'Highlands and border provinces; mining, tea and hydropower.' },
  { name: 'North Central & Central Coast', capital: 'Da Nang', area: 95876, pop: 20.5, density: 214, note: 'Long coastline; ports, tourism and heavy industry.' },
  { name: 'Central Highlands', capital: 'Buon Ma Thuot', area: 54508, pop: 6.2, density: 114, note: 'Coffee and pepper country; the least densely settled region.' },
  { name: 'Southeast', capital: 'Ho Chi Minh City', area: 23551, pop: 18.9, density: 803, note: 'The economic engine: HCMC, Binh Duong, Dong Nai.' },
  { name: 'Mekong River Delta', capital: 'Can Tho', area: 40922, pop: 17.2, density: 420, note: 'The rice bowl: half the national rice crop, most of the fruit and shrimp.' },
];

// Largest provinces / cities by population, 2024 (GSO).
export const TOP_PROVINCES = [
  { name: 'Ho Chi Minh City', pop: 9.5 }, { name: 'Ha Noi', pop: 8.7 },
  { name: 'Thanh Hoa', pop: 3.7 }, { name: 'Nghe An', pop: 3.4 },
  { name: 'Dong Nai', pop: 3.3 }, { name: 'Binh Duong', pop: 2.9 },
  { name: 'Hai Phong', pop: 2.1 }, { name: 'An Giang', pop: 1.9 },
];

// Energy and environment, 2024.
export const ENERGY_MIX = [
  { source: 'Coal', share: 32, color: '#475569' },
  { source: 'Hydropower', share: 29, color: '#0e7490' },
  { source: 'Solar', share: 19, color: '#e8a317' },
  { source: 'Gas & oil', share: 13, color: '#7c3aed' },
  { source: 'Wind', share: 5, color: '#059669' },
  { source: 'Other', share: 2, color: '#94a3b8' },
];
export const ENVIRONMENT = [
  { label: 'Electricity generated', value: '≈313', unit: 'TWh', year: 2024, source: 'EVN', note: 'Up about 10% on 2023 as factories and air conditioners ran harder.' },
  { label: 'Installed capacity', value: '≈85', unit: 'GW', year: 2024, source: 'EVN', note: 'Solar alone is now about a fifth of installed capacity.' },
  { label: 'Renewables share of capacity', value: '≈53', unit: '%', year: 2024, source: 'EVN', note: 'Hydro, solar and wind together — one of the highest shares in Asia.' },
  { label: 'CO₂ emissions per person', value: '≈2.9', unit: 'tonnes', year: 2023, source: 'EDGAR / World Bank', note: 'Still low by world standards, but rising with coal power and industry.' },
  { label: 'Forest cover', value: '42.0', unit: '% of land', year: 2024, source: 'GSO', note: 'About 14.8 million hectares; the state aims for 42–43% by 2030.' },
  { label: 'International tourists', value: '17.6', unit: 'million', year: 2024, source: 'GSO', note: 'Up 39.5% on 2023 and back to 97.6% of the pre-pandemic level.' },
];

// Money, wages and prices — new for this revision.
// Minimum wages: Decree 74/2024/ND-CP, in force 1 July 2024 (+6% on 2022 levels).
export const MIN_WAGE = [
  { region: 'Region I', areas: 'Urban Ha Noi & Ho Chi Minh City', monthly: 4960000, hourly: 23800, prevMonthly: 4680000 },
  { region: 'Region II', areas: 'Rural Ha Noi & HCMC; Can Tho, Da Nang, Hai Phong', monthly: 4410000, hourly: 21200, prevMonthly: 4160000 },
  { region: 'Region III', areas: 'Provincial cities incl. Bac Ninh, Hai Duong, Vinh Phuc', monthly: 3860000, hourly: 18600, prevMonthly: 3640000 },
  { region: 'Region IV', areas: 'All remaining localities', monthly: 3450000, hourly: 16600, prevMonthly: 3250000 },
];
export const MONEY = [
  { label: 'Average income per person', value: '≈5.4', unit: 'million VND / month', year: 2024, source: 'GSO living-standards survey', note: 'Household income per capita; urban households earn roughly twice rural ones.' },
  { label: 'Average salary, paid employees', value: '7.6', unit: 'million VND / month', year: 'Q1 2024', source: 'GSO', note: 'Up VND 549,000 on the same quarter a year earlier.' },
  { label: 'Basic salary (public sector)', value: '2.34', unit: 'million VND / month', year: 'from 1 Jul 2024', source: 'Decree 73/2024', note: 'Raised 30% from VND 1.8 million — the base for public pay and pensions.' },
  { label: 'Minimum wage, Region I', value: '4.96', unit: 'million VND / month', year: 2024, source: 'Decree 74/2024', note: 'Up 6% from VND 4.68 million; Region IV is VND 3.45 million.' },
  { label: 'Consumer inflation (CPI)', value: '3.63', unit: '%', year: 2024, source: 'GSO', note: 'Inside the National Assembly target band of 4–4.5%.' },
  { label: 'GDP per capita', value: '114', unit: 'million VND', year: 2024, source: 'GSO', note: 'About US$4,700 at the year’s average exchange rate.' },
];
// Regional peers, 2024 (World Bank, IMF, WTO).
export const PEERS = [
  { name: 'Viet Nam', pop: 101.0, gdp: 476.3, gdpPc: 4700, growth: 7.09, exports: 405.5, life: 74.6, urban: 40.3, self: true },
  { name: 'Thailand', pop: 71.7, gdp: 526.0, gdpPc: 7340, growth: 2.5, exports: 300.5, life: 76.4, urban: 53.6 },
  { name: 'Indonesia', pop: 283.5, gdp: 1396.0, gdpPc: 4925, growth: 5.03, exports: 264.7, life: 68.3, urban: 59.0 },
  { name: 'Philippines', pop: 114.9, gdp: 461.6, gdpPc: 4020, growth: 5.6, exports: 73.3, life: 72.2, urban: 48.3 },
  { name: 'Malaysia', pop: 34.1, gdp: 421.8, gdpPc: 12380, growth: 5.1, exports: 329.6, life: 75.8, urban: 78.7 },
  { name: 'Singapore', pop: 6.0, gdp: 547.4, gdpPc: 90700, growth: 4.4, exports: 621.9, life: 84.1, urban: 100.0 },
];
export const COMPARE_METRICS = [
  { id: 'gdp', label: 'GDP (US$ bn)', fmt: (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 }) },
  { id: 'gdpPc', label: 'GDP per capita (US$)', fmt: (v) => v.toLocaleString('en-US') },
  { id: 'growth', label: 'Real GDP growth (%)', fmt: (v) => v.toFixed(2) + '%' },
  { id: 'pop', label: 'Population (millions)', fmt: (v) => v.toFixed(1) },
  { id: 'exports', label: 'Exports of goods (US$ bn)', fmt: (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 }) },
  { id: 'life', label: 'Life expectancy (years)', fmt: (v) => v.toFixed(1) },
  { id: 'urban', label: 'Urban population (%)', fmt: (v) => v.toFixed(1) + '%' },
];

// Searchable indicator index (used by the overview search box).
export const INDICATOR_INDEX = [
  ...HEADLINES.map((h) => ({ term: h.label, value: `${h.value} ${h.unit}`, year: h.year, source: h.source, section: 'Overview' })),
  { term: 'GDP growth', value: '7.09%', year: 2024, source: 'GSO', section: 'Economy' },
  { term: 'Trade surplus', value: 'US$24.77 billion', year: 2024, source: 'GSO', section: 'Economy' },
  { term: 'Total trade turnover', value: 'US$786.29 billion', year: 2024, source: 'GSO', section: 'Economy' },
  { term: 'Registered FDI', value: 'US$38.23 billion', year: 2024, source: 'GSO', section: 'Economy' },
  { term: 'Disbursed FDI', value: 'US$25.35 billion', year: 2024, source: 'GSO', section: 'Economy' },
  { term: 'Unemployment', value: '2.24%', year: 2024, source: 'GSO', section: 'People' },
  { term: 'Infant mortality', value: '12.1 per 1,000 live births', year: 2024, source: 'GSO', section: 'People' },
  { term: 'Adult literacy', value: '95.8%', year: 2023, source: 'UNESCO', section: 'People' },
  { term: 'Electricity generated', value: '≈313 TWh', year: 2024, source: 'EVN', section: 'Environment' },
  { term: 'Forest cover', value: '42.0% of land', year: 2024, source: 'GSO', section: 'Environment' },
  { term: 'International tourist arrivals', value: '17.6 million', year: 2024, source: 'GSO', section: 'Environment' },
  { term: 'Largest export market', value: 'United States — US$119.6 billion', year: 2024, source: 'GSO', section: 'Economy' },
  { term: 'GDP per capita (PPP)', value: '≈US$16,900', year: 2024, source: 'IMF', section: 'Economy' },
  { term: 'Multidimensional poverty', value: '1.93%', year: 2024, source: 'GSO', section: 'People' },
  { term: 'Median age', value: '33.1 years', year: 2024, source: 'GSO', section: 'People' },
  { term: 'Labour force', value: '52.5 million', year: 2024, source: 'GSO', section: 'People' },
  { term: 'Minimum wage Region I', value: 'VND 4,960,000 / month', year: 2024, source: 'Decree 74/2024', section: 'Money' },
  { term: 'Average income per person', value: '≈VND 5.4 million / month', year: 2024, source: 'GSO', section: 'Money' },
  { term: 'Average salary, paid employees', value: 'VND 7.6 million / month', year: 'Q1 2024', source: 'GSO', section: 'Money' },
];
