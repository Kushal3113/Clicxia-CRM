import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import Divider from '@mui/material/Divider';
import SelectPage from './selectPage';
import SelectType from './Tamp-Manual';

export default function Post() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* Header Section */}
      <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
        Social Media Management
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Create Post Section */}
      <Typography component="h4" variant="h8" sx={{ mb: 1 }}>
        Create Post
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Select Page */}
      <SelectPage />
      <Divider sx={{ mb: 3 }} />

      {/* Select Type - Middle of the Layout */}
      <Typography component="h4" variant="h8" sx={{ mb: 1 }}>
        Select Type
      </Typography>
      <SelectType />
      <Divider sx={{ mb: 3 }} />

      {/* Footer */}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}