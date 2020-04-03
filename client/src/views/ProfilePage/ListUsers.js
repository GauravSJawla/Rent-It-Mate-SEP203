import React from 'react';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import {getProfiles, getUserProfile} from '../../actions/profile';

const useStyles = makeStyles(styles);

const ListUsers = ({getProfiles, profile:{profile,loading}}) => {
    const classes = useStyles();
    useEffect(() => {
      getProfiles();
    },[getProfiles]);
    return(
        <div className={classes.landingContainer}>
        <div className={classes.dashboardTitle}>
          <h3>Users page</h3>
        </div>
        </div>
        
    )
}

export default (ListUsers);