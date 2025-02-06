import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter'; // For X

export default function NativeSelectDemo() {
  const [selectedValue, setSelectedValue] = React.useState(10);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-select-label">Select A/c</InputLabel>
        <Select
          labelId="demo-select-label"
          id="demo-select"
          value={selectedValue}
          onChange={handleChange}
        >
          <MenuItem value={10}>
            <InstagramIcon sx={{ mr: 1 }} /> Instagram
          </MenuItem>
          <MenuItem value={20}>
            <FacebookIcon sx={{ mr: 1 }} /> Facebook
          </MenuItem>
          <MenuItem value={30}>
            <TwitterIcon sx={{ mr: 1 }} /> X
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
