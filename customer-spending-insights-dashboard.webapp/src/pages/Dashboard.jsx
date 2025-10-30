// src/pages/Dashboard.jsx
import React from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  Box,
  Divider,
} from '@mui/material';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const API_BASE = import.meta?.env?.VITE_API_URL || 'http://localhost:3000/api';
const CUSTOMER_ID = '12345';

// ---------- helpers ----------
const ZAR = (n) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(
    Number(n || 0)
  );

const fmtMonth = (yyyyMm) => {
  const [y, m] = String(yyyyMm).split('-').map(Number);
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleString('en-ZA', { month: 'short', year: 'numeric' });
};

const fmtDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const pctChip = (v) => {
  if (v == null) return null;
  const isNeg = Number(v) < 0;
  const Icon = isNeg ? TrendingDownIcon : TrendingUpIcon;
  return (
    <Chip
      size="small"
      icon={<Icon />}
      label={`${Math.abs(Number(v)).toFixed(1)}% vs prev.`}
      color={isNeg ? 'error' : 'success'}
      variant="filled"
      sx={{ fontWeight: 700 }}
    />
  );
};

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
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoadingProfile(false);
      }
    })();
    return () => (alive = false);
  }, []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingSummary(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/spending/summary?period=${period}`);
        if (alive) setSummary(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoadingSummary(false);
      }
    })();
    return () => (alive = false);
  }, [period]);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingCats(true);
        const data = await getJson(
          `${API_BASE}/customers/${CUSTOMER_ID}/spending/categories?period=${period}`
        );
        if (alive) setCats(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoadingCats(false);
      }
    })();
    return () => (alive = false);
  }, [period]);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingTrends(true);
        const data = await getJson(`${API_BASE}/customers/${CUSTOMER_ID}/spending/trends?months=6`);
        if (alive) setTrends(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoadingTrends(false);
      }
    })();
    return () => (alive = false);
  }, []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingTx(true);
        const data = await getJson(
          `${API_BASE}/customers/${CUSTOMER_ID}/transactions?limit=10&offset=0&sortBy=date_desc`
        );
        if (alive) setTx(data?.transactions || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoadingTx(false);
      }
    })();
    return () => (alive = false);
  }, []);

  const PeriodButtons = (
    <ButtonGroup size="small" color="inherit" variant="outlined">
      {['7d', '30d', '90d', '1y'].map((p) => (
        <Button
          key={p}
          onClick={() => setPeriod(p)}
          variant={period === p ? 'contained' : 'outlined'}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          {p.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={
                <Avatar>
                  <PersonOutlineIcon />
                </Avatar>
              }
              title="Customer Spending Insights"
              subheader={
                loadingProfile
                  ? 'Loading profile…'
                  : `${profile?.name ?? '-'} • ${profile?.email ?? '-'} • ${(profile?.accountType || '').toUpperCase()}`
              }
              action={PeriodButtons}
            />
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<PaidIcon />} title="Total Spent" />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
              {loadingSummary ? (
                <LinearProgress />
              ) : (
                <>
                  <Typography variant="h5" fontWeight={800}>
                    {ZAR(summary?.totalSpent)}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {pctChip(summary?.comparedToPrevious?.spentChange)}
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<LocalAtmIcon />} title="Transactions" />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
              {loadingSummary ? (
                <LinearProgress />
              ) : (
                <>
                  <Typography variant="h5" fontWeight={800}>
                    {summary?.transactionCount ?? '-'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg {ZAR(summary?.averageTransaction)} per transaction
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} alignItems="stretch">
            {/* Top Category (narrow) */}
            <Grid item size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader avatar={<CategoryIcon />} title="Top Category" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                  {loadingSummary ? (
                    <LinearProgress />
                  ) : (
                    <>
                      <Typography variant="h6" fontWeight={800}>
                        {summary?.topCategory ?? '-'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        For period: {summary?.period ?? period}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item size={{ xs: 12, md: 8 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                  title="Spending by Category"
                  subheader={
                    cats?.dateRange
                      ? `${cats.dateRange.startDate} - ${cats.dateRange.endDate}`
                      : 'Period summary'
                  }
                />
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflow: 'auto' }}
                >
                  {loadingCats ? (
                    <LinearProgress />
                  ) : (
                    <List dense sx={{ py: 0 }}>
                      {(cats?.categories || []).map((c) => (
                        <ListItem key={c.name} disableGutters sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Avatar sx={{ width: 28, height: 28, bgcolor: c.color || 'primary.main' }}>
                              <ShoppingCartIcon fontSize="small" />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography>{c.name}</Typography>
                                <Typography fontWeight={700}>{ZAR(c.amount)}</Typography>
                              </Stack>
                            }
                            secondary={
                              <Stack direction="row" spacing={2}>
                                <Typography variant="caption" color="text.secondary">
                                  {c.percentage}% of total
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {c.transactionCount} tx
                                </Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<TimelineIcon />} title="Monthly Spending Trends (last 6)" />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflow: 'auto' }}>
              {loadingTrends ? (
                <LinearProgress />
              ) : (
                <List dense sx={{ py: 0 }}>
                  {(trends?.trends || []).map((t) => (
                    <ListItem key={t.month} disableGutters sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography>{fmtMonth(t.month)}</Typography>
                            <Typography fontWeight={700}>{ZAR(t.totalSpent)}</Typography>
                          </Stack>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {t.transactionCount} tx • Avg {ZAR(t.averageTransaction)}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader avatar={<ReceiptLongIcon />} title="Recent Transactions" />
            <CardContent sx={{ flex: 1 }}>
              {loadingTx ? (
                <LinearProgress />
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Merchant</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tx.map((t) => (
                        <TableRow key={t.id} hover>
                          <TableCell>{fmtDate(t.date)}</TableCell>
                          <TableCell>{t.merchant}</TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={t.category}
                              sx={{
                                fontWeight: 700,
                                bgcolor: (t.categoryColor || '#eee') + '33',
                                borderColor: t.categoryColor || '#ccc',
                                color: t.categoryColor || 'inherit',
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">{ZAR(t.amount)}</TableCell>
                          <TableCell>{t.paymentMethod}</TableCell>
                          <TableCell sx={{ maxWidth: 280 }}>
                            <Typography noWrap title={t.description}>
                              {t.description}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Divider />
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
