import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cuisines = [
  'African',
  'American',
  'Australian',
  'Brazilian',
  'British',
  'Cajun',
  'Canadian',
  'Cantonese',
  'Caribbean',
  'Chinese',
  'Cuban',
  'Egyptian',
  'English',
  'European',
  'Filipino',
  'French',
  'German',
  'Greek',
  'Haitian',
  'Hawaiian',
  'Indian',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Korean',
  'Latin American',
  'Lebanese',
  'Louisiana Creole',
  'Malaysian',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Moroccan',
  'Nigerian',
  'Pakistani',
  'Peruvian',
  'Polish',
  'Russian',
  'Scottish',
  'Sichuan',
  'Singaporean',
  'Spanish',
  'Thai',
  'Tibetan',
  'Turkish',
  'Vegetarian',
  'Vietnamese',
];

function getStyles(name, cuisineName, theme) {
  return {
    fontWeight:
      cuisineName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();

  // update cuisines with whatever the user has in DB
  React.useEffect(() => {
    console.log(props);
    if (props.selectedCuisines && props.selectedCuisines.length)
      props.setSelectedCuisines([...props.selectedCuisines]);
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log('setting cuisine');
    console.log(value);
    props.setSelectedCuisines(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    props.setCuisinesUpdated(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-chip-label'>Select Cuisines</InputLabel>
        <Select
          defaultValue={'hello'}
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={props.selectedCuisines}
          onChange={handleChange}
          input={
            <OutlinedInput id='select-multiple-chip' label='Select Cuisines' />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {cuisines.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.selectedCuisines, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
