import { profile, spendingSummary, categories, trends, transactions, goals, filters } from '../data/mock';

function getProfile(customerId) {
  if (customerId !== profile.customerId) return null;
  return profile;
}

function getSpendingSummary(period) {
  return { ...spendingSummary, period: period || spendingSummary.period };
}

function getSpendingByCategory(_customerId, period, startDate, endDate) {
  const payload = { ...categories };
  if (startDate && endDate) {
    payload.dateRange = { startDate, endDate };
  } 
  return payload;
}

function getSpendingTrends(months = 12) {
  const m = Math.max(1, Math.min(Number(months) || 12, 24));
  const base = [...trends];
  const out = [];
  while (out.length < m) out.push(base[out.length % base.length]);
  return { trends: out.slice(0, m) };
}

function sortTx(list, sortBy) {
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

function getTransactions(params) {
  const {
    limit = 20,
    offset = 0,
    category,
    startDate,
    endDate,
    sortBy = 'date_desc',
  } = params;

  let list = [...transactions];
  if (category) list = list.filter((t) => t.category.toLowerCase() === String(category).toLowerCase());
  if (startDate) list = list.filter((t) => new Date(t.date) >= new Date(startDate));
  if (endDate) list = list.filter((t) => new Date(t.date) <= new Date(endDate));

  list = sortTx(list, sortBy);

  const total = list.length;
  const page = list.slice(Number(offset), Number(offset) + Math.min(Number(limit), 100));
  return {
    transactions: page,
    pagination: { total, limit: Number(limit), offset: Number(offset), hasMore: Number(offset) + Number(limit) < total },
  };
}

function getGoals() {
  return goals;
}

function getFilters() {
  return filters;
}

export default {
  getProfile,
  getSpendingSummary,
  getSpendingByCategory,
  getSpendingTrends,
  getTransactions,
  getGoals,
  getFilters,
};
