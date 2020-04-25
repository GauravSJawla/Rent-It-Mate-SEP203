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

export default function SearchFilterSection() {
  const classes = useStyles();

  const classesAppBar = useAppBarStyles();

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
          <GridItem xs={12} sm={12} md={6}>
            <h5 className={classes.title}>Search Area</h5>
            <Slider
              defaultValue={25}
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
          <GridItem xs={12} sm={12} md={6}>
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
          <GridItem xs={12} sm={12} md={6}></GridItem>
          <GridItem xs={12} sm={12} md={6}>
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
