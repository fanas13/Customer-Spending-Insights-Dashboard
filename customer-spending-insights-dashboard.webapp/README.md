# Customer Spending Insights Dashboard — WebApp (React + Material UI v7)

A responsive frontend for the **Customer Spending Insights Dashboard**, built with **React**, **Vite**, and **Material UI v7** (JS). It consumes the companion API built in `customer-spending-insights-dashboard.webapi`.

---

## ✨ Features

- Clean, card‑based dashboard layout using **Material UI v7** (Grid2)
- Period switcher (`7d`, `30d`, `90d`, `1y`)
- Summary stats (Total Spent, Transactions, Average per Tx)
- Top category & category breakdown list
- Monthly spending trends (last 6 months)
- Recent transactions table
- Environment‑driven API base URL

---

## 🧱 Tech Stack

- **React 18** + **Vite**
- **Material UI v7** (`@mui/material`, `@mui/icons-material`, `@mui/material/Grid2`)
- **JavaScript** (no TypeScript)
- **ESLint** with Vite defaults

---

## 📦 Project Structure

```
customer-spending-insights-dashboard.webapp/
├─ public/
├─ src/
│  ├─ components/
│  │  └─ dashboard/
│  │     ├─ CategoriesListCard.jsx
│  │     ├─ ProfileHeaderCard.jsx
│  │     ├─ StatCard.jsx
│  │     ├─ TransactionsTableCard.jsx
│  │     ├─ TrendsListCard.jsx
│  │     ├─ TopCategoryCard.jsx
│  │     └─ index.js
│  ├─ pages/
│  │  └─ Dashboard.jsx
│  ├─ utils/
│  │  └─ format.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ .env                # frontend env (Vite)
├─ package.json
├─ vite.config.js
└─ README.md    # this file
```

---

## 🧰 Prerequisites

- **Node.js**: v18.x or v20.x
- Running backend API from the companion project: `customer-spending-insights-dashboard.webapi`  
  (Default dev URL assumed: `http://localhost:3000`)

> If your API runs elsewhere, set `VITE_API_BASE_URL` accordingly.

---

## ⚙️ Environment

Create a `.env` file in the webapp root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> Vite exposes only variables prefixed with `VITE_` to your client code.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run in development (Vite dev server):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Open your browser at the URL printed by the dev/preview server (usually `http://localhost:5173`).

---

## 🔗 API Contracts Used

The UI calls the following endpoints (customerId fixed to `12345` for demo):

- `GET {API}/customers/12345/profile`
- `GET {API}/customers/12345/spending/summary?period=7d|30d|90d|1y`
- `GET {API}/customers/12345/spending/categories?period=...`
- `GET {API}/customers/12345/spending/trends?months=6`
- `GET {API}/customers/12345/transactions?limit=10&offset=0&sortBy=date_desc`

> Ensure the API supports **CORS** for the frontend origin. If you’re using the provided API, CORS is already enabled in dev instructions.

---

## 🧭 Key Files

- `src/pages/Dashboard.jsx` – Container that fetches data & composes the dashboard.
- `src/components/dashboard/*` – Reusable, focused UI cards.
- `src/utils/format.js` – Format helpers (`ZAR`, date/time, month labels).

## 🐳 Docker (Optional)

If you want to containerize the webapp for a static production serve behind Nginx:

**Dockerfile:**
```Dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: custom nginx config for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build & run:
```bash
docker build -t csid-webapp .
docker run -it --rm -p 8080:80 --name csid-webapp csid-webapp
```

Open: `http://localhost:8080`

> For the API base URL in Docker, either bake it during build (`VITE_API_BASE_URL`) or proxy via Nginx.

---

## 🧪 Manual Test Plan

1. Dashboard loads without errors; profile header shows customer name/email/type.
2. Period buttons update **Spending Summary** and **Categories**.
3. Top Category updates with selected period.
4. Trends list shows six months with total spent and averages.
5. Recent Transactions show 10 rows with amounts and chips.
6. API down scenario → check console for HTTP errors (UI shows loaders until failure).

---

## 🤝 Troubleshooting

- **Header not showing**: Ensure `<Dashboard />` is actually routed to `/` or the route you’re visiting. Check App.jsx/router.
- **Grid items not stretching 100%**: Use Grid2 (`@mui/material/Grid2`) and supply `xs`/`md` props on the item: `<Grid xs={12} md={6}>`.
- **CORS errors**: Enable CORS in the API and confirm `VITE_API_BASE_URL` points to the correct origin.
- **`.env` not taking effect**: Vite needs the `VITE_` prefix. Restart dev server after changes.

---

## 📄 License

Private assessment project. All rights reserved.
