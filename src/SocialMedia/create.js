import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function FloatingActionButtonExtendedSize() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate('/dj'); // Navigate to the Post route
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" size="small" color="primary" onClick={handleClick}>
        <AddCircleOutlineIcon sx={{ mr: 1 }} />
        Create Post
      </Fab>
    </Box>
  );
}
