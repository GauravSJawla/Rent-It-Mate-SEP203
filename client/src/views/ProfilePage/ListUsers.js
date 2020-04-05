import React,{useEffect} from 'react';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProfiles} from '../../actions/profile';
import {getAllUsers} from '../../actions/auth';
import Spinner from '../Dashboard/Spinner';


const useStyles = makeStyles(styles);

const ListUsers = ({getAllUsers,getProfiles,auth:{users,loading}, profile: {profiles}}) => {
    const classes = useStyles();
    useEffect(() => {
      getAllUsers();
      getProfiles();
    },[getAllUsers]);
    return(
      // <style>{"table{border:1px solid black;}"}</style>
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center">List of Users</h3>
        </div>
        {loading ? (<Spinner/>) : (
          <div className={classes.dashboardSubtitle}>
              {users.length > 0 ? (
                <table className={classes.table}>
                  <tr className={classes.tr}>
                  <thead>
                    <th className={classes.th}>USER NAME</th>
                    <th className={classes.th}>EMAIL</th>
                    <th className={classes.th}>PROFILE</th>
                    <th className={classes.th}>DELETE/NOT</th>
                  </thead>
                  {users.map(user => (
                    <tbody>
                      <td className={classes.td}>{user.name}</td>
                      <td className={classes.td}>{user.email}</td>
                      <td className = {classes.td}>{profiles.length > 0 ? (profiles.map(profile => (
                        profile.user === user._id ? (
                          <a href = {`/admin-view-profile/${user._id}`}>View profile</a>
                        ) :(<p></p>)
                      ))):(<p>Users are yet to create a profile</p>)}
                      </td>
                      <td className={classes.td}>
                        <a href = {`/admin-delete-profile/${user._id}`}>Delete User</a>
                      </td>
                    </tbody>
                  ))}
                  </tr>
                </table>
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
  getProfiles:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth,
  profile:state.profile
})

export default connect(mapStateToProps,{getAllUsers,getProfiles})(ListUsers);