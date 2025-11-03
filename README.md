# Customer Spending Insights Dashboard — Monorepo

This repository hosts two apps:

- **customer-spending-insights-dashboard.webapi** (Node.js + Express): mock REST API
- **customer-spending-insights-dashboard.webapp** (React + Vite + MUI): frontend dashboard

> Use this README at the repo root. Each app also has its own README with deeper details.

---

## Quick Start

### 1) Prereqs
- Node.js 18+
- npm 9+
- (Optional) Docker & Docker Compose

### 2) Clone
```bash
git clone https://github.com/fanas13/Customer-Spending-Insights-Dashboard.git
cd customer-spending-insights-dashboard
```

### 3) API (backend)
```bash
cd customer-spending-insights-dashboard.webapi
cp .env.example .env   # or set VITE_API_BASE_URL in webapp to http://localhost:3000/api
npm install
npm run dev            # starts on http://localhost:3000
```

### 4) Web App (frontend)
Open a new terminal:
```bash
cd customer-spending-insights-dashboard.webapp
npm install
npm run dev            # defaults to http://localhost:5173
```
If your API is at a different URL, set `VITE_API_BASE_URL` in `customer-spending-insights-dashboard.webapp/.env`.

---

## Project Structure
```
customer-spending-insights-dashboard/
├─ customer-spending-insights-dashboard.webapi/   # Express mock API
│  ├─ src/                                        # routes, controllers, services, data
│  ├─ Dockerfile
│  └─ README.md
├─ customer-spending-insights-dashboard.webapp/   # React + Vite + MUI 7
│  ├─ src/                                        # pages, components, theme
│  ├─ Dockerfile
│  └─ README.md
└─ README.md                                      # you are here
```

---

## Environment Variables

### API
- `.env` (in `webapi`):
  - `PORT=3000`

### Web App
- `.env` (in `webapp`):
  - `VITE_API_BASE_URL=http://localhost:3000/api`

---

## Docker

### Build & run individually
```bash
# API
cd customer-spending-insights-dashboard.webapi
docker build -t csid-api .
docker run --rm -p 3000:3000 --name csid-api csid-api

# Webapp (expects API at http://host.docker.internal:3000 by default)
cd ../customer-spending-insights-dashboard.webapp
docker build -t csid-webapp .
docker run --rm -p 5173:5173 -e VITE_API_BASE_URL=http://host.docker.internal:3000/api --name csid-webapp csid-webapp
```

> If `host.docker.internal` is not available on your OS, use your machine IP.

---

## Test URLs

- **Profile**: `GET http://localhost:3000/api/customers/12345/profile`
- **Summary**: `GET http://localhost:3000/api/customers/12345/spending/summary?period=30d`
- **Categories**: `GET http://localhost:3000/api/customers/12345/spending/categories?period=30d`
- **Trends**: `GET http://localhost:3000/api/customers/12345/spending/trends?months=6`
- **Transactions**: `GET http://localhost:3000/api/customers/12345/transactions?limit=10&offset=0`
- **Goals**: `GET http://localhost:3000/api/customers/12345/goals`
- **Filters**: `GET http://localhost:3000/api/customers/12345/filters`

Frontend dev server default: `http://localhost:5173`

---

## Suggested Commit Flow

- `chore: scaffold api and webapp`
- `feat(api): implement mock endpoints`
- `feat(webapp): add layout, theme, router`
- `feat(webapp): dashboard cards + data wiring`
- `docs: add root README and usage notes`

---

## Notes

- This is a **mock** system for assessment/demo purposes. No persistence.
- API returns deterministic sample data matching the brief.
- Webapp uses Material UI v7 (joy/core split; using `@mui/material`).

Happy hacking!
