import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF6B6B' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#F7DC6F' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { boxShadow: '0 6px 18px rgba(0,0,0,0.06)' } } },
  },
});

export default theme;