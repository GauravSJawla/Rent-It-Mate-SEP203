import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import DescriptionIcon from '@material-ui/icons/Description';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import tooltipStyles from 'assets/jss/material-kit-react/tooltipsStyle.js';
import styles from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(styles);
const useTooltipStyles = makeStyles(tooltipStyles);

export default function ProductSection() {
  const classes = useStyles();
  const tooltipClasses = useTooltipStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Categories</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={8}>
            <Tooltip
              id='Category 1'
              title='Category 1'
              placement='left'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 2'
              title='Category 2'
              placement='bottom'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 3'
              title='Category 3'
              placement='bottom'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 4'
              title='Category 4'
              placement='bottom'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 5'
              title='Category 5'
              placement='bottom'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 6'
              title='Category 6'
              placement='bottom'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 7'
              title='Category 7'
              placement='bottom'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
            <Tooltip
              id='Category 8'
              title='Category 8'
              placement='right'
              classes={{ tooltip: tooltipClasses.tooltip }}
            >
              <Button
                href='https://drive.google.com/open?id=1_sCAcIJwls1UQkkmwJIr2UMbVNHxvB_7'
                color='default'
                justIcon
                round
              >
                <DescriptionIcon />
              </Button>
            </Tooltip>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
