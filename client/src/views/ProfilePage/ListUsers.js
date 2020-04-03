import React,{useEffect} from 'react';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import {getProfiles, getUserProfile} from '../../actions/profile';
import {getAllUsers} from '../../actions/auth';
import Spinner from '../Dashboard/Spinner';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage';

const useStyles = makeStyles(styles);

const ListUsers = ({getAllUsers,auth:{users,loading}}) => {
    const classes = useStyles();
    useEffect(() => {
      getAllUsers();
    },[getAllUsers]);
    return(
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center">List of Users</h3>
        </div>
        {loading ? (<Spinner/>) : (
          <div className={classes.dashboardSubtitle}>
              {users.length > 0 ? (
                users.map(user => (
                  <p>{user.name}</p>
                ))
              ):(
                <h4>No Users available..</h4>)
              }
          </div>
        ) }
          

        </div>
        
    )
}

ListUsers.propTypes = {
  getAllUsers:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{getAllUsers})(ListUsers);