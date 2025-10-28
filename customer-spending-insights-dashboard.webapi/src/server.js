require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pinoHttp = require('pino-http');
const apiRouter = require('./routes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(pinoHttp());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRouter);

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  try { console.error(err); } catch {}
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
