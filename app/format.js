// Small number and text formatters shared by the views.

export function fmtInt(n) {
  return Math.round(n).toLocaleString('en-US');
}

export function fmt1(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function fmt2(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtUsd(n) {
  return 'US$' + n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Turn a data value into the text a KPI card shows.
export function kpiValue(h) {
  if (h.id === 'gdp-pc') return fmtInt(h.value);
  if (Number.isInteger(h.value)) return fmtInt(h.value);
  return fmt2(h.value);
}
