const { Router } = require('express');
const customersRouter = require('./customers');
const docsRouter = require('./docs');

const router = Router();
router.use('/customers', customersRouter);
router.use('/docs', docsRouter); // Swagger UI

module.exports = router;