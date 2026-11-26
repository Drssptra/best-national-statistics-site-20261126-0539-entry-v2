// SVG chart builders. Every chart is drawn from data.js, no library, no network.
// Each function returns an SVG string; callers drop it into the page.
//
// Visual language (this revision): flag-red #c8102e as the primary series
// colour, navy #1b2a4a as the secondary, amber #e8a317 as the highlight.
// Bars are lollipops (stem + dot) instead of solid blocks; lines carry a
// soft gradient area underneath; comparisons use dot plots on a shared scale.

export const PALETTE = {
  red: '#c8102e',
  redDark: '#9b0c22',
  navy: '#1b2a4a',
  amber: '#e8a317',
  teal: '#0e7490',
  green: '#059669',
  slate: '#94a3b8',
  ink: '#14213d',
  muted: '#64748b',
  grid: '#e5e7eb',
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return m * p;
}

function ticks(max, count) {
  const step = max / count;
  const out = [];
  for (let i = 0; i <= count; i++) out.push(step * i);
  return out;
}

let uid = 0;
function nextId() { return `g${++uid}`; }

// Area chart: line + gradient fill, end-point label, gridlines.
export function areaChart({ years, values, label, color = PALETTE.red, height = 260, format = (v) => String(v) }) {
  const W = 720, H = height, PL = 56, PR = 54, PT = 14, PB = 30;
  const max = niceMax(Math.max(...values) * 1.08);
  const gid = nextId();
  const x = (i) => PL + (i * (W - PL - PR)) / (years.length - 1);
  const y = (v) => PT + (1 - v / max) * (H - PT - PB);
  const grid = ticks(max, 4).map((t) => {
    const yy = y(t);
    return `<line x1="${PL}" y1="${yy}" x2="${W - PR}" y2="${yy}" stroke="${PALETTE.grid}" stroke-width="1"/>` +
      `<text x="${PL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${PALETTE.muted}">${format(t)}</text>`;
  }).join('');
  const labels = years.map((yr, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${PALETTE.muted}">${yr}</text>`).join('');
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${PL},${y(0)} ${points} ${x(values.length - 1).toFixed(1)},${y(0)}`;
  const last = values.length - 1;
  const dots = values.map((v, i) => {
    const tip = `${years[i]}: ${format(v)}`;
    const r = i === last ? 5.5 : 3.5;
    const fill = i === last ? color : '#fff';
    return `<circle cx="${x(i)}" cy="${y(v)}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="2"><title>${esc(tip)}</title></circle>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)} area chart" class="chart">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity="0.22"/><stop offset="1" stop-color="${color}" stop-opacity="0.02"/>
    </linearGradient></defs>
    <polygon points="${area}" fill="url(#${gid})"/>
    ${grid}
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${labels}
    <text x="${x(last) + 10}" y="${y(values[last]) + 4}" font-size="12.5" font-weight="700" fill="${color}">${esc(format(values[last]))}</text>
  </svg>`;
}

// Backwards-compatible alias: the old line chart is now the area chart.
export const lineChart = areaChart;

// Vertical bar chart (for growth rates, with a zero line).
export function vbarChart({ years, values, label, color = PALETTE.red, negColor = '#b45309', height = 260, format = (v) => v.toFixed(1) }) {
  const W = 720, H = height, PL = 44, PR = 12, PT = 16, PB = 30;
  const max = niceMax(Math.max(...values.map(Math.abs)) * 1.15);
  const min = Math.min(0, ...values);
  const span = max - min;
  const y0 = PT + ((max - 0) / span) * (H - PT - PB);
  const slot = (W - PL - PR) / years.length;
  const bw = Math.min(30, slot * 0.58);
  const grid = [0, max / 2, max].map((t) => {
    const yy = PT + ((max - t) / span) * (H - PT - PB);
    return `<line x1="${PL}" y1="${yy}" x2="${W - PR}" y2="${yy}" stroke="${PALETTE.grid}"/><text x="${PL - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${PALETTE.muted}">${format(t)}</text>`;
  }).join('');
  const bars = values.map((v, i) => {
    const cx = PL + slot * i + slot / 2;
    const top = v >= 0 ? PT + ((max - v) / span) * (H - PT - PB) : y0;
    const h = Math.abs(v) / span * (H - PT - PB);
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(1.5, h).toFixed(1)}" rx="3" fill="${v >= 0 ? color : negColor}"><title>${years[i]}: ${format(v)}</title></rect>
      <text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${PALETTE.muted}">${years[i]}</text>
      <text x="${cx}" y="${(top - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${PALETTE.ink}">${format(v)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)} bar chart" class="chart">${grid}
    <line x1="${PL}" y1="${y0}" x2="${W - PR}" y2="${y0}" stroke="${PALETTE.slate}" stroke-width="1"/>${bars}</svg>`;
}

// Lollipop chart: horizontal stems ending in a dot, value at the end.
// Replaces the old solid horizontal bars.
export function lollipopChart({ rows, valueFmt = (v) => String(v), color = PALETTE.red, maxValue = null, height = 36 }) {
  const W = 720;
  const max = maxValue ?? niceMax(Math.max(...rows.map((r) => r.value)));
  const PL = 210, PR = 96;
  const H = rows.length * height + 8;
  const bars = rows.map((r, i) => {
    const y = 8 + i * height + height / 2;
    const bw = Math.max(2, ((W - PL - PR) * r.value) / max);
    const fill = r.color || color;
    return `<text x="${PL - 10}" y="${y + 4}" text-anchor="end" font-size="12.5" fill="${PALETTE.ink}">${esc(r.label)}</text>
      <line x1="${PL}" y1="${y}" x2="${PL + bw}" y2="${y}" stroke="${fill}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="${PL + bw}" cy="${y}" r="6" fill="${fill}"><title>${esc(r.label)}: ${esc(valueFmt(r.value))}</title></circle>
      <text x="${PL + bw + 12}" y="${y + 4}" font-size="12.5" font-weight="600" fill="${PALETTE.ink}">${esc(valueFmt(r.value))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="lollipop chart" class="chart">${bars}</svg>`;
}

// Backwards-compatible alias for the old horizontal bar chart.
export const hbarChart = lollipopChart;

// Dot plot: one dot per country on a shared scale, Vietnam in red.
// Used by the Compare page instead of bars.
export function dotChart({ rows, valueFmt = (v) => String(v), maxValue = null, height = 44 }) {
  const W = 720;
  const max = maxValue ?? niceMax(Math.max(...rows.map((r) => r.value)) * 1.05);
  const min = Math.min(0, ...rows.map((r) => r.value));
  const PL = 150, PR = 96;
  const H = rows.length * height + 8;
  const x = (v) => PL + ((v - min) / (max - min)) * (W - PL - PR);
  const axis = [0, max / 2, max].map((t) =>
    `<line x1="${x(t)}" y1="4" x2="${x(t)}" y2="${H - 4}" stroke="${PALETTE.grid}"/><text x="${x(t)}" y="${H + 2}" text-anchor="middle" font-size="11" fill="${PALETTE.muted}">${valueFmt(t)}</text>`).join('');
  const dots = rows.map((r, i) => {
    const y = 8 + i * height + height / 2;
    const fill = r.color || (r.self ? PALETTE.red : PALETTE.navy);
    return `<text x="${PL - 10}" y="${y + 4}" text-anchor="end" font-size="12.5" font-weight="${r.self ? 700 : 400}" fill="${PALETTE.ink}">${esc(r.label)}</text>
      <circle cx="${x(r.value)}" cy="${y}" r="${r.self ? 9 : 7}" fill="${fill}" stroke="#fff" stroke-width="2"><title>${esc(r.label)}: ${esc(valueFmt(r.value))}</title></circle>
      <text x="${x(r.value) + 14}" y="${y + 4}" font-size="12.5" font-weight="${r.self ? 700 : 600}" fill="${PALETTE.ink}">${esc(valueFmt(r.value))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H + 18}" role="img" aria-label="dot plot" class="chart">${axis}${dots}</svg>`;
}

// Donut chart with a centre label and a legend list.
export function donutChart({ slices, centerTop, centerBottom, size = 230 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let a0 = -Math.PI / 2;
  const paths = slices.map((s) => {
    const a1 = a0 + (s.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z`;
    a0 = a1;
    return `<path d="${d}" fill="${s.color}" stroke="#fff" stroke-width="2"><title>${esc(s.label)}: ${s.value}%</title></path>`;
  }).join('');
  const legend = slices.map((s) => `<li><span class="swatch" style="background:${s.color}"></span>${esc(s.label)} <b>${s.value}%</b></li>`).join('');
  return `<div class="donut-wrap">
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="donut chart" class="chart donut">
      ${paths}
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${PALETTE.ink}">${esc(centerTop)}</text>
      <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11.5" fill="${PALETTE.muted}">${esc(centerBottom)}</text>
    </svg>
    <ul class="legend">${legend}</ul>
  </div>`;
}

// Population pyramid: male bars left, female right, bands top (young) to bottom (old).
export function pyramidChart({ bands, maleShare, height = 420 }) {
  const W = 720, H = height, PL = 8, PR = 8, PT = 26, PB = 8;
  const mid = W / 2;
  const maxBand = Math.max(...bands.map((b) => b.total)) / 2 * 1.15;
  const rowH = (H - PT - PB) / bands.length;
  const rows = bands.map((b, i) => {
    const male = b.total * maleShare[i];
    const female = b.total - male;
    const y = PT + i * rowH;
    const mw = (male / maxBand) * (mid - PL - 34);
    const fw = (female / maxBand) * (mid - PL - 34);
    const bh = Math.max(4, rowH - 3);
    return `<rect x="${(mid - 30 - mw).toFixed(1)}" y="${y.toFixed(1)}" width="${mw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${PALETTE.navy}"><title>${b.band} male: ${male.toFixed(1)} million</title></rect>
      <rect x="${(mid + 30).toFixed(1)}" y="${y.toFixed(1)}" width="${fw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${PALETTE.red}"><title>${b.band} female: ${female.toFixed(1)} million</title></rect>
      <text x="${mid}" y="${(y + rowH / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="${PALETTE.ink}">${b.band}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="population pyramid, 2024" class="chart">
    <text x="${mid - 30}" y="14" text-anchor="end" font-size="12" font-weight="600" fill="${PALETTE.navy}">Male</text>
    <text x="${mid + 30}" y="14" font-size="12" font-weight="600" fill="${PALETTE.red}">Female</text>
    ${rows}
  </svg>`;
}

// Tiny sparkline for KPI cards.
export function sparkline(values, color = PALETTE.red) {
  const W = 120, H = 34;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => `${(4 + (i * (W - 8)) / (values.length - 1)).toFixed(1)},${(4 + (1 - (v - min) / span) * (H - 8)).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true" class="spark"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`;
}
