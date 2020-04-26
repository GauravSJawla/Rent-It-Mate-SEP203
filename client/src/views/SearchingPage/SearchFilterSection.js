import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// core components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Typography from '@material-ui/core/Typography';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import styles from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

const useStyles = makeStyles(styles);
const useExpandPanelStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'white',
  },
}));

export default function SearchFilterSection() {
  const classes = useStyles();
  const classesExpandPanel = useExpandPanelStyles();
  const [value, setValue] = useState('25 miles');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.section}>
      <div className={classes.landingContainer}>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classesExpandPanel.root}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          color: 'white',
                        }}
                      />
                    }
                    style={{
                      background: '#9C27B0',
                    }}
                  >
                    <Typography className={classesExpandPanel.heading}>
                      Advanced Search
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl component='fieldset'>
                          <RadioGroup
                            name='search-area'
                            value={value}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value='25 miles'
                              control={
                                <Radio
                                  style={{
                                    color: '#9C27B0',
                                  }}
                                />
                              }
                              label='25 miles'
                            />
                            <FormControlLabel
                              value='50 miles'
                              control={
                                <Radio
                                  style={{
                                    color: '#9C27B0',
                                  }}
                                />
                              }
                              label='50 miles'
                            />
                            <FormControlLabel
                              value='75 miles'
                              control={
                                <Radio
                                  style={{
                                    color: '#9C27B0',
                                  }}
                                />
                              }
                              label='75 miles'
                            />
                            <FormControlLabel
                              value='More than 75 miles'
                              control={
                                <Radio
                                  style={{
                                    color: '#9C27B0',
                                  }}
                                />
                              }
                              label='More than 75 miles'
                            />
                          </RadioGroup>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput labelText='Min. Price' id='float' />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput labelText='Zipcode' id='float' />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput labelText='Max. Price' id='float' />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}></GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button color='primary' round>
                          <SearchIcon />
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
