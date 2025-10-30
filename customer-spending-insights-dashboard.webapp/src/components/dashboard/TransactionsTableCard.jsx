// src/components/dashboard/TransactionsTableCard.jsx
import {
  Card, CardHeader, CardContent, LinearProgress, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Chip, Typography, Divider
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { ZAR, fmtDateTime } from '../../utils/format';

export default function TransactionsTableCard({ tx, loading }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader avatar={<ReceiptLongIcon />} title="Recent Transactions" />
      <CardContent sx={{ flex: 1 }}>
        {loading ? (
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
                {(tx || []).map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell>{fmtDateTime(t.date)}</TableCell>
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
  );
}
