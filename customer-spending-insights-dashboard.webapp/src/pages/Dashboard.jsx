import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaidIcon from '@mui/icons-material/Paid';
import { ZAR } from '../utils/format';

import {
  ProfileHeaderCard,
  StatCard,
  TopCategoryCard,
  CategoriesListCard,
  TrendsListCard,
  TransactionsTableCard,
} from '../components/dashboard';

const API_BASE = import.meta?.env?.VITE_API_URL || 'http://localhost:3000/api';
const CUSTOMER_ID = '12345';

async function getJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function Dashboard() {
  const [period, setPeriod] = React.useState('30d');

  const [profile, setProfile] = React.useState(null);
  const [summary, setSummary] = React.useState(null);
  const [cats, setCats] = React.useState(null);
  const [trends, setTrends] = React.useState(null);
  const [tx, setTx] = React.useState([]);

  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [loadingSummary, setLoadingSummary] = React.useState(true);
  const [loadingCats, setLoadingCats] = React.useState(true);
  const [loadingTrends, setLoadingTrends] = React.useState(true);
  const [loadingTx, setLoadingTx] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingProfile(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/profile`);
        if (alive) setProfile(data);
      } finally {
        if (alive) setLoadingProfile(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingSummary(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/spending/summary?period=${period}`);
        if (alive) setSummary(data);
      } finally {
        if (alive) setLoadingSummary(false);
      }
    })();
    return () => { alive = false; };
  }, [period]);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingCats(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/spending/categories?period=${period}`);
        if (alive) setCats(data);
      } finally {
        if (alive) setLoadingCats(false);
      }
    })();
    return () => { alive = false; };
  }, [period]);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingTrends(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/spending/trends?months=6`);
        if (alive) setTrends(data);
      } finally {
        if (alive) setLoadingTrends(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingTx(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/transactions?limit=10&offset=0&sortBy=date_desc`);
        if (alive) setTx(data?.transactions || []);
      } finally {
        if (alive) setLoadingTx(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 12, md: 6 }}>
          <ProfileHeaderCard
            profile={profile}
            period={period}
            setPeriod={setPeriod}
            loading={loadingProfile}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            icon={<PaidIcon />}
            title="Total Spent"
            loading={loadingSummary}
            primary={ZAR(summary?.totalSpent)}
            changePct={summary?.comparedToPrevious?.spentChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            icon={<LocalAtmIcon />}
            title="Transactions"
            loading={loadingSummary}
            primary={summary?.transactionCount ?? '-'}
            sublabel={summary ? `Avg ${ZAR(summary?.averageTransaction)} per transaction` : ''}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid size={{ xs: 12, md: 4 }}>
              <TopCategoryCard summary={summary} loading={loadingSummary} period={period} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <CategoriesListCard cats={cats} loading={loadingCats} />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TrendsListCard trends={trends} loading={loadingTrends} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TransactionsTableCard tx={tx} loading={loadingTx} />
        </Grid>
      </Grid>
    </Box>
  );
}
