const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const router = Router();
const file = fs.readFileSync(path.join(process.cwd(), 'openapi.yaml'), 'utf8');
const doc = yaml.parse(file);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(doc));

module.exports = router;
