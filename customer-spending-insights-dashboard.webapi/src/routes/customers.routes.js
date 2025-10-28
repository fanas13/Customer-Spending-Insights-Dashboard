// src/routes/customers.routes.js
import { Router } from 'express';
import {
  getProfile,
  getSpendingSummary,
  getSpendingByCategory,
  getTrends,
  getTransactions,
  getGoals,
  getFilters
} from '../controllers/customers.controller.js';

const router = Router();

router.get('/:customerId/profile', getProfile);
router.get('/:customerId/spending/summary', getSpendingSummary);
router.get('/:customerId/spending/categories', getSpendingByCategory);
router.get('/:customerId/spending/trends', getTrends);
router.get('/:customerId/transactions', getTransactions);
router.get('/:customerId/goals', getGoals);
router.get('/:customerId/filters', getFilters);

export default router;
