// src/services/customers.service.js
import {
  profile,
  spendingSummary,
  categories,
  trends,
  transactions as txData,
  goals,
  filters
} from '../data/mock.js';

const clamp = (n, min, max) => Math.max(min, Math.min(Number(n) || min, max));
const allowedPeriods = ['7d', '30d', '90d', '1y'];
const normalizePeriod = (p) => (allowedPeriods.includes(p) ? p : '30d');

export function getProfile(customerId) {
  if (!customerId || customerId !== profile.customerId) return null;
  return profile;
}

export function getSpendingSummary(_customerId, { period = '30d' } = {}) {
  const p = normalizePeriod(period);
  return { ...spendingSummary, period: p };
}

export function getSpendingByCategory(_customerId, { period, startDate, endDate } = {}) {
  const payload = { ...categories };
  if (period) payload.period = normalizePeriod(period);
  if (startDate && endDate) {
    payload.dateRange = { startDate, endDate };
  }
  return payload;
}

export function getSpendingTrends(_customerId, { months = 12 } = {}) {
  const m = clamp(months, 1, 24);
  const base = Array.isArray(trends) ? trends : [];
  const out = [];
  let i = 0;
  while (out.length < m && base.length > 0) {
    out.push(base[i % base.length]);
    i += 1;
  }
  return { trends: out };
}

function sortTransactions(list, sortBy = 'date_desc') {
  const arr = [...list];
  switch (sortBy) {
    case 'date_asc':
      return arr.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    case 'amount_desc':
      return arr.sort((a, b) => b.amount - a.amount);
    case 'amount_asc':
      return arr.sort((a, b) => a.amount - b.amount);
    case 'date_desc':
    default:
      return arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }
}

export function getTransactions(_customerId, {
  limit = 20,
  offset = 0,
  category,
  startDate,
  endDate,
  sortBy = 'date_desc'
} = {}) {
  const lim = clamp(limit, 1, 100);
  const off = Math.max(0, Number(offset) || 0);

  let list = Array.isArray(txData) ? [...txData] : [];

  if (category) {
    const c = String(category).toLowerCase();
    list = list.filter(t => String(t.category).toLowerCase() === c);
  }
  if (startDate) {
    const sd = new Date(startDate);
    if (!Number.isNaN(+sd)) list = list.filter(t => new Date(t.date) >= sd);
  }
  if (endDate) {
    const ed = new Date(endDate);
    if (!Number.isNaN(+ed)) list = list.filter(t => new Date(t.date) <= ed);
  }

  list = sortTransactions(list, sortBy);

  const total = list.length;
  const page = list.slice(off, off + lim);

  return {
    transactions: page,
    pagination: {
      total,
      limit: lim,
      offset: off,
      hasMore: off + lim < total
    }
  };
}

export function getGoals(_customerId) {
  return goals;
}

export function getFilters(_customerId) {
  return filters;
}
