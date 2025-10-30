import {
  Card, CardHeader, Avatar, ButtonGroup, Button
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function ProfileHeaderCard({ profile, period, setPeriod, loading }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={<Avatar><PersonOutlineIcon /></Avatar>}
        title="Customer Spending Insights"
        subheader={
          loading
            ? 'Loading profile…'
            : `${profile?.name ?? '-'} • ${profile?.email ?? '-'} • ${(profile?.accountType || '').toUpperCase()}`
        }
        action={
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
        }
      />
    </Card>
  );
}
