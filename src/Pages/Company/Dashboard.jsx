import React from 'react';
import { Grid, Paper } from '@mui/material';
import Chart from './Chart';

const CompanyDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Chart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CompanyDashboard;