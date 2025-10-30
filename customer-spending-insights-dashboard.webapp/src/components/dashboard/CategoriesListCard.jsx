import {
  Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, LinearProgress
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ZAR } from '../../utils/format';

export default function CategoriesListCard({ cats, loading }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="Spending by Category"
        subheader={
          cats?.dateRange
            ? `${cats.dateRange.startDate} — ${cats.dateRange.endDate}`
            : 'Period summary'
        }
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflow: 'auto' }}>
        {loading ? (
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>{c.name}</Typography>
                      <Typography fontWeight={700}>{ZAR(c.amount)}</Typography>
                    </div>
                  }
                  secondary={
                    <div style={{ display: 'flex', gap: 16 }}>
                      <Typography variant="caption" color="text.secondary">
                        {c.percentage}% of total
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {c.transactionCount} tx
                      </Typography>
                    </div>
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
