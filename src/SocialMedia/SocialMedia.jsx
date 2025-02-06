import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import Divider from '@mui/material/Divider';
import Selctac from './Selctac';
import Create from './create';
import SessionsChart from '../components/SessionsChart';
import PageViewsBarChart from '../components/PageViewsBarChart';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* Title */}
      <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
        Social Media Management
      </Typography>
      
      {/* Divider with spacing */}
      <Divider sx={{ mb: 3 }} />

      {/* Grid section */}
      <Grid container spacing={110} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Selctac />
        </Grid>
        <Grid item xs={12} md={6}>
          <Create />
        </Grid>
      </Grid>
      <SessionsChart />
      <Divider sx={{ mb: 3 }} />
      <PageViewsBarChart />

      

      {/* Footer */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
