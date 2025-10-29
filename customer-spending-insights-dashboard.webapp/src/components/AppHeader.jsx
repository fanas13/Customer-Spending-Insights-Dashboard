import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SavingsOutlined from '@mui/icons-material/SavingsOutlined';

export default function AppHeader() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <SavingsOutlined sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight={700}>
          Customer Spending Insights
        </Typography>
      </Toolbar>
    </AppBar>
  )
}