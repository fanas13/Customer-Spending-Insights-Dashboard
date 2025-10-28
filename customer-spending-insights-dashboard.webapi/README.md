
# Customer Spending Insights Dashboard — Web API (JavaScript)

> A production‑grade Express.js API that exposes mocked endpoints for a **Customer Spending Insights Dashboard**.  
> Built with ES Modules, validation via Zod, structured logging with Pino, CORS, dotenv config, and Docker support.

---

## 🗂 Repository Name

`Customer-Spending-Insights-Dashboard`

---

## ✨ Highlights

- **Express (ESM)** with clean layering (routes → controllers → services → data)
- **Zod** for input validation on all query params
- **Pino HTTP** for fast, structured logs (JSON in prod)
- **CORS** restricted via environment variable
- **dotenv** for configuration
- **Dockerfile + docker‑compose** for containerized runs
- **OpenAPI 3.1** spec (`openapi.json`) included

> **Node.js**: Use **v20+**. (Avoids `pino` tracingChannel issues you might see on older Node versions.)

---

## 📁 Project Structure

```
customer-spending-insights-dashboard.webapi/
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ routes/
│  │  └─ customers.routes.js
│  ├─ controllers/
│  │  └─ customers.controller.js
│  ├─ services/
│  │  └─ customers.service.js
│  ├─ data/
│  │  └─ mock.js
│  └─ utils/ (optional for logger etc.)
├─ openapi.json
├─ .env
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
└─ README.md
```

---

## ⚙️ Configuration

Create a `.env` with:

```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
```

- `PORT`: API port to bind
- `CORS_ORIGIN`: allowed browser origin (comma‑separate for multiple)
- `LOG_LEVEL`: `fatal|error|warn|info|debug|trace|silent`

---

## 🚀 Run Locally

### 1) Install

```bash
npm install
```

### 2) Dev mode (watch)

```bash
npm run dev
```

### 3) Prod mode

```bash
npm start
```

You should see logs like:
```
Server listening on http://localhost:3000
```

---

## 🐳 Run with Docker

### Build

```bash
docker build -t csid-webapi:latest .
```

### Run

```bash
docker run --rm -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e CORS_ORIGIN=http://localhost:5173 \
  -e LOG_LEVEL=info \
  --name csid-api csid-webapi:latest
```

### docker-compose

```bash
docker-compose up --build
```

---

## 🔗 Base URL & Mock Customer

- **Base URL:** `http://localhost:3000/api/customers/:customerId`
- **Use this mock `customerId`:** `12345`

> Example: `http://localhost:3000/api/customers/12345/profile`

---

## 📜 Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/customers/:customerId/profile` | GET | Customer profile |
| `/api/customers/:customerId/spending/summary?period=7d\|30d\|90d\|1y` | GET | Spending summary & deltas |
| `/api/customers/:customerId/spending/categories?period=...&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` | GET | Spend by category + optional custom range |
| `/api/customers/:customerId/spending/trends?months=1..24` | GET | Monthly spending trends (rolling) |
| `/api/customers/:customerId/transactions?limit&offset&category&startDate&endDate&sortBy` | GET | Transactions with filtering & pagination |
| `/api/customers/:customerId/goals` | GET | Spending goals & progress |
| `/api/customers/:customerId/filters` | GET | Available categories & date presets |

---

## 🧪 Curl Examples

### Profile
```bash
curl http://localhost:3000/api/customers/12345/profile
```

### Spending Summary (30 days)
```bash
curl "http://localhost:3000/api/customers/12345/spending/summary?period=30d"
```

### Spending by Category (custom range)
```bash
curl "http://localhost:3000/api/customers/12345/spending/categories?period=30d&startDate=2024-08-16&endDate=2024-09-16"
```

### Trends (last 12 months)
```bash
curl "http://localhost:3000/api/customers/12345/spending/trends?months=12"
```

### Transactions (filter + sort + pagination)
```bash
curl "http://localhost:3000/api/customers/12345/transactions?limit=10&offset=0&category=Groceries&sortBy=amount_desc"
```

### Goals
```bash
curl http://localhost:3000/api/customers/12345/goals
```

### Filters
```bash
curl http://localhost:3000/api/customers/12345/filters
```

---

## ✅ Validation & Error Handling

- All query parameters are validated with **Zod**.
- On validation errors, the API returns `400` with details.
- Non‑existent routes return `404 { "error": "Not Found" }`.
- Unexpected errors return `500` with a generic message (and a structured log line in Pino).

---

## 🔎 OpenAPI (3.1)

An `openapi.json` document is included. You can view it with Swagger UI or Redocly:

- If you serve static files, expose `openapi.json` at `/openapi.json`.
- Many IDEs (VS Code) render it nicely with an OpenAPI extension.

> If your linter flags versioning, ensure the `openapi` field is `"3.1.0"` and that your extension supports 3.1.

---

## 🪵 Logging

- **Dev:** readable request logs via `pino-http` (level `info` by default).
- **Prod:** JSON logs for ingestion by ELK/Datadog/etc. Control verbosity via `LOG_LEVEL`.

Example dev line:
```
GET /api/customers/12345/profile 200 12ms
```

---

## 🔐 CORS

CORS is enabled and restricted via `CORS_ORIGIN`.  
For local development, you can use:
```
CORS_ORIGIN=http://localhost:5173
```

To allow multiple origins:
```
CORS_ORIGIN=http://localhost:5173,http://localhost:3001
```

---

## 🧩 Scripts

```json
{
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "NODE_ENV=production node src/server.js",
    "lint": "echo \"Add ESLint/StandardJS if desired\"",
    "test": "echo \"Add Jest/Vitest tests\""
  }
}
```

---

## 🙋 FAQ

**Q: I see `error: Not Found` at `/`.**  
A: Use the base path: `/api/customers/12345/...`

**Q: Pino throws a `tracingChannel` error.**  
A: Upgrade to Node **20+**.

**Q: ES module import errors?**  
A: Ensure `package.json` contains `"type": "module"`, and include the `.js` extension in imports.

---

## 📄 License

MIT — or update to your organization’s standard license.

---

## 👤 Author

**Nicholson Galela** — Software Engineer (React / Node / DevOps)
