import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ListItemIcon from '@mui/material/ListItemIcon';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter'; // For "X"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const options = [
  { name: 'Instagram', icon: <InstagramIcon /> },
  { name: 'Facebook', icon: <FacebookIcon /> },
  { name: 'X', icon: <TwitterIcon /> }, // Using TwitterIcon for "X"
];

function getStyles(name, selectedNames, theme) {
  return {
    fontWeight: selectedNames.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChipWithIcons() {
  const theme = useTheme();
  const [selectedNames, setSelectedNames] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedNames(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 3, width: 1500 }}>
        <InputLabel id="demo-multiple-chip-label">Select Pages</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedNames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Social Media" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map(({ name, icon }) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedNames, theme)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
