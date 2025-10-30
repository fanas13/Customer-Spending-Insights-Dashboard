import { Card, CardHeader, CardContent, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ZAR, fmtMonth } from '../../utils/format';

export default function TrendsListCard({ trends, loading }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader avatar={<TimelineIcon />} title="Monthly Spending Trends (last 6)" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflow: 'auto' }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <List dense sx={{ py: 0 }}>
            {(trends?.trends || []).map((t) => (
              <ListItem key={t.month} disableGutters sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>{fmtMonth(t.month)}</Typography>
                      <Typography fontWeight={700}>{ZAR(t.totalSpent)}</Typography>
                    </div>
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
  );
}
