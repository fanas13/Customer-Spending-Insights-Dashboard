import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import apiRouter from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.type('html').send(`
    <h1>Customer Spending Insights Dashboard API</h1>
    <p>Server is running.</p>
    <ul>
      <li><a href="/api/health">/api/health</a></li>
      <li><code>GET /api/customers/:customerId/profile</code></li>
      <li><code>GET /api/customers/:customerId/spending/summary?period=30d</code></li>
      <li><code>GET /api/customers/:customerId/spending/categories?period=30d</code></li>
      <li><code>GET /api/customers/:customerId/spending/trends?months=12</code></li>
      <li><code>GET /api/customers/:customerId/transactions?limit=20&amp;offset=0</code></li>
      <li><code>GET /api/customers/:customerId/goals</code></li>
      <li><code>GET /api/customers/:customerId/filters</code></li>
    </ul>
  `);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
