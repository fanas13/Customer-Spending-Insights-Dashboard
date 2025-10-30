import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppHeader from './components/AppHeader';
import Dashboard from './pages/Dashboard';

export default function App() {
  const defaultCustomerId = '12345'
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader />
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/customers/${defaultCustomerId}`} replace />} />
          <Route path="/customers/:customerId" element={<Dashboard />} />
        </Routes>
      </Container>
    </Box>
  )
}
