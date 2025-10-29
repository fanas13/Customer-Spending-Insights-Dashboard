import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#fff' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#f3f3f3' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { boxShadow: '0 6px 18px rgba(0,0,0,0.06)' } } },
  },
});

export default theme;