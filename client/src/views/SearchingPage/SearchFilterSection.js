import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

const useStyles = makeStyles(styles);
const useAppBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const marks = [
  {
    value: 0,
    label: '0 miles',
  },
  {
    value: 25,
    label: '25 miles',
  },
  {
    value: 50,
    label: '50 miles',
  },
  {
    value: 75,
    label: '75 miles',
  },
  {
    value: 100,
    label: '100 miles',
  },
];

const valuetext = (value) => {
  return `${value}`;
};

const useCategoryFieldStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const valueLabelFormat = (value) => {
//   return marks.findIndex((mark) => mark.value === value) + 1;
// };

export default function SearchFilterSection() {
  const classes = useStyles();
  const classesCategoryField = useCategoryFieldStyles();
  const classesAppBar = useAppBarStyles();
  const [category, setCategory] = React.useState('');
  const [subcategory, setSubCategory] = React.useState('');

  const handleChange = (event) => {
    if (event.target.value > 0 && event.target.value < 40) {
      setCategory(event.target.value);
    } else {
      setSubCategory(event.target.value);
    }
  };

  return (
    <div className={classes.section}>
      <div className={classes.landingContainer}>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <AppBar
                position='static'
                style={{
                  background: '#9C27B0',
                }}
              >
                <Toolbar>
                  <Typography variant='h6' className={classesAppBar.title}>
                    Advanced Search
                  </Typography>
                </Toolbar>
              </AppBar>
            </GridItem>
          </GridContainer>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <h5 className={classes.title}>Search Area</h5>
            <Slider
              defaultValue={25}
              // valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              aria-labelledby='discrete-slider-restrict'
              step={null}
              valueLabelDisplay='auto'
              marks={marks}
              style={{
                color: '#9C27B0',
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h5 className={classes.title}>Categories</h5>
            <div>
              <FormControl className={classesCategoryField.formControl}>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={category}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <h5 className={classes.title}>Price</h5>
            <form className={classes.root} noValidate autoComplete='off'>
              <div>
                <TextField
                  id='minPrice'
                  label='Min. Price'
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </div>
            </form>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}></GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl className={classesCategoryField.formControl}>
              <InputLabel id='demo-simple-select-label'>SubCategory</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={subcategory}
                onChange={handleChange}
              >
                <MenuItem value={40}>Fourty</MenuItem>
                <MenuItem value={50}>Fifty</MenuItem>
                <MenuItem value={60}>Sixty</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <form className={classes.root} noValidate autoComplete='off'>
              <div>
                <TextField
                  id='maxPrice'
                  label='Max. Price'
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </div>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
