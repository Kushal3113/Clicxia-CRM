import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Import Material-UI icons
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function RowRadioButtonsGroup() {
  const radioOptions = [
    {
      value: 'Pre-Construction',
      label: 'Pre-Construction',
      icon: <HomeWorkIcon />,
    },
    {
      value: 'Housing Tips',
      label: 'Housing Tips',
      icon: <TipsAndUpdatesIcon />,
    },
    {
      value: 'Just Listed/Just Sold',
      label: 'Just Listed/Just Sold',
      icon: <CheckCircleIcon />,
    },
    {
      value: 'Festive Greetings',
      label: 'Festive Greetings',
      icon: <CelebrationIcon />,
    },
  ];

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mb: 50 }}>
        Select Template
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <Grid container spacing={2}>
          {radioOptions.map((option) => (
            <Grid item xs={20} sm={6} key={option.value}>
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                }
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
