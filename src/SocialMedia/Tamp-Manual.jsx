import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SelectTamp from './Tamp';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function BasicSelect() {
  const [selection, setSelection] = React.useState('');

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <Box
      sx={{
        height: '100vh', // Full height of the viewport
        display: 'flex',
        flexDirection: 'column',
         // Center vertically
        alignItems: 'center', // Center horizontally
        textAlign: 'center', // Align text in the center
        gap: 3, // Space between elements
        px: 2, // Horizontal padding for responsiveness
        boxSizing: 'border-box', // Ensure padding doesn't affect the layout
      }}
    >
      {/* Dropdown Selection */}
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label="Select Type"
          onChange={handleChange}
        >
          <MenuItem value="template">Template</MenuItem>
          <MenuItem value="manualUpload">Manual Upload</MenuItem>
        </Select>
      </FormControl>

      {/* Conditional Content Rendering */}
      <Box>
        {selection === 'template' && (
          <SelectTamp />
        )}
        {selection === 'manualUpload' && (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        )}
      </Box>
    </Box>
  );
}
