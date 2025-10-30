import { Card, CardHeader, CardContent, Typography, LinearProgress } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

export default function TopCategoryCard({ summary, loading, period }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader avatar={<CategoryIcon />} title="Top Category" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Typography variant="h6" fontWeight={800}>{summary?.topCategory ?? '-'}</Typography>
            <Typography variant="caption" color="text.secondary">
              For period: {summary?.period ?? period}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
