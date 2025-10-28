// src/controllers/customers.controller.js
import { z } from 'zod';
import * as svc from '../services/customers.service.js';

// ------- helpers -------
const periodSchema = z.enum(['7d', '30d', '90d', '1y']).optional();
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');

export async function getProfile(req, res) {
  const { customerId } = req.params;
  const profile = svc.getProfile(customerId);
  if (!profile) return res.status(404).json({ error: 'Customer not found' });
  return res.json(profile);
}

export async function getSpendingSummary(req, res) {
  const { customerId } = req.params;
  const parsed = z.object({ period: periodSchema }).safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { period = '30d' } = parsed.data;
  return res.json(svc.getSpendingSummary(customerId, { period }));
}

export async function getSpendingByCategory(req, res) {
  const { customerId } = req.params;
  const parsed = z.object({
    period: periodSchema,
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional()
  }).safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { period, startDate, endDate } = parsed.data;
  return res.json(svc.getSpendingByCategory(customerId, { period, startDate, endDate }));
}

export async function getSpendingTrends(req, res) {
  const { customerId } = req.params;
  const parsed = z.object({
    months: z.coerce.number().min(1).max(24).optional()
  }).safeParse(req.query);

  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { months = 12 } = parsed.data;
  return res.json(svc.getSpendingTrends(customerId, { months }));
}

export async function getTransactions(req, res) {
  const { customerId } = req.params;
  const parsed = z.object({
    limit: z.coerce.number().min(1).max(100).optional(),
    offset: z.coerce.number().min(0).optional(),
    category: z.string().optional(),
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
    sortBy: z.enum(['date_desc', 'date_asc', 'amount_desc', 'amount_asc']).optional()
  }).safeParse(req.query);

  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  return res.json(svc.getTransactions(customerId, parsed.data));
}

export async function getGoals(req, res) {
  const { customerId } = req.params;
  return res.json(svc.getGoals(customerId));
}

export async function getFilters(req, res) {
  const { customerId } = req.params;
  return res.json(svc.getFilters(customerId));
}
