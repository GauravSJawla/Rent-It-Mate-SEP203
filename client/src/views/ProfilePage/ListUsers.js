import React,{useEffect} from 'react';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles, getUserProfile} from '../../actions/profile';
import Spinner from '../Dashboard/Spinner';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage';

const useStyles = makeStyles(styles);

const ListUsers = ({getProfiles, profile:{profiles,loading},auth:{user}}) => {
    const classes = useStyles();
    useEffect(() => {
      getProfiles();
    },[getProfiles]);
    return(
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center">List of Users</h3>
        </div>
        {loading ? <Spinner/> : (
          <div className={classes.dashboardSubtitle}>
              {/* {profiles.length > 0 ? } */}
          </div>
        ) }
          

        </div>
        
    )
}

ListUsers.PropTypes = {
  getProfiles:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth,
  profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(ListUsers);