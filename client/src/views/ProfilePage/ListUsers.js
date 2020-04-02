import React from 'react';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles);

const ListUsers = () => {
    const classes = useStyles();

    console.log('inside list users page')
    return(
        <div className={classes.landingContainer}>
        <div className={classes.dashboardTitle}>
          <h3>Users page</h3>
        </div>
        </div>
        
    )
}

export default (ListUsers);