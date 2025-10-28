const { z } = require('zod');
const svc = require('../services/customers.service');

function isIsoDate(s) {
  return !s || !Number.isNaN(Date.parse(s));
}

function getProfile(req, res) {
  const data = svc.getProfile(req.params.customerId);
  if (!data) return res.status(404).json({ error: 'Customer not found' });
  return res.json(data);
}

function getSpendingSummary(req, res) {
  const schema = z.object({ period: z.enum(['7d', '30d', '90d', '1y']).optional() });
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { period } = parsed.data;
  return res.json(svc.getSpendingSummary(period));
}

function getSpendingByCategory(req, res) {
  const schema = z.object({
    period: z.enum(['7d', '30d', '90d', '1y']).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }).refine(
    (v) => !(v.period && (v.startDate || v.endDate)),
    { message: 'Use either period OR startDate/endDate, not both' },
  ).refine(
    (v) => isIsoDate(v.startDate) && isIsoDate(v.endDate),
    { message: 'Invalid date format; expected YYYY-MM-DD' },
  );

  const parsed = schema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { period, startDate, endDate } = parsed.data;
  return res.json(svc.getSpendingByCategory(req.params.customerId, period, startDate, endDate));
}

function getSpendingTrends(req, res) {
  const schema = z.object({ months: z.coerce.number().min(1).max(24).optional() });
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { months = 12 } = parsed.data;
  return res.json(svc.getSpendingTrends(months));
}

function getTransactions(req, res) {
  const schema = z.object({
    limit: z.coerce.number().min(1).max(100).optional(),
    offset: z.coerce.number().min(0).optional(),
    category: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    sortBy: z.enum(['date_desc', 'date_asc', 'amount_desc', 'amount_asc']).optional(),
  });
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.json(svc.getTransactions(parsed.data));
}

function getGoals(_req, res) {
  return res.json(svc.getGoals());
}

function getFilters(_req, res) {
  return res.json(svc.getFilters());
}

module.exports = {
  getProfile,
  getSpendingSummary,
  getSpendingByCategory,
  getSpendingTrends,
  getTransactions,
  getGoals,
  getFilters,
};
