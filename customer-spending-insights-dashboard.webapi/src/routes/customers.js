const { Router } = require('express');
const ctrl = require('../controllers/customers.controller');

const router = Router();

router.get('/:customerId/profile', ctrl.getProfile);
router.get('/:customerId/spending/summary', ctrl.getSpendingSummary);
router.get('/:customerId/spending/categories', ctrl.getSpendingByCategory);
router.get('/:customerId/spending/trends', ctrl.getSpendingTrends);
router.get('/:customerId/transactions', ctrl.getTransactions);
router.get('/:customerId/goals', ctrl.getGoals);
router.get('/:customerId/filters', ctrl.getFilters);

module.exports = router;