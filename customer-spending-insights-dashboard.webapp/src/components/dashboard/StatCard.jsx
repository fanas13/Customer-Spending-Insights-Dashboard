import { Card, CardHeader, CardContent, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function PctChip({ value }) {
  if (value == null) return null;
  const isNeg = Number(value) < 0;
  const Icon = isNeg ? TrendingDownIcon : TrendingUpIcon;
  return (
    <Chip
      size="small"
      icon={<Icon />}
      label={`${Math.abs(Number(value)).toFixed(1)}% vs prev.`}
      color={isNeg ? 'error' : 'success'}
      variant="filled"
      sx={{ fontWeight: 700 }}
    />
  );
}

export default function StatCard({ icon, title, loading, primary, sublabel, changePct }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader avatar={icon} title={title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Typography variant="h5" fontWeight={800}>{primary}</Typography>
            {sublabel ? (
              <Typography variant="caption" color="text.secondary">{sublabel}</Typography>
            ) : null}
            {changePct != null ? (
              <Stack direction="row" spacing={1}><PctChip value={changePct} /></Stack>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
