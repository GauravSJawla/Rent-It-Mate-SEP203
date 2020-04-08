import React,{useEffect} from 'react';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {getProfiles} from '../../actions/profile';
import {getAllUsers} from '../../actions/auth';
import Spinner from '../Dashboard/Spinner';
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.js';
import Explore from '@material-ui/icons/Explore';

const useStyles = makeStyles(styles);

const ListUsers = ({getAllUsers,getProfiles,auth:{users,loading}, profile: {profiles}}) => {
    const classes = useStyles();
    useEffect(() => {
      getAllUsers();
      getProfiles();
    },[getAllUsers,getProfiles]);

    const rows = [

    ]
    return(
      // <style>{"table{border:1px solid black;}"}</style>
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center">List of Users</h3>
        </div>
          {loading ? (<Spinner/>) :(
            
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className={classes.td}>USER NAME</TableCell>
                    <TableCell align="left" className={classes.td}>EMAIL</TableCell>
                    <TableCell align="left" className={classes.td}>USER PROFILE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {users.length > 0 ? (users.map(user => (
                    <TableRow>
                      <TableCell align="left" className={classes.td} component="th" scope="row">{user.name}</TableCell>
                      <TableCell align="left" className={classes.td}>{user.email}</TableCell>
                    
                  {profiles.length > 0 && profiles.map(profile => (
                    profile.user === user._id ? (
                      <TableCell align="left" className={classes.td}><Button
                              simple
                              component={Link}
                              to={`/admin-view-profile/${user._id}`}
                              color='primary'
                              size='lg'
                            >
                            <Explore/>
                        </Button></TableCell>
                    ) : (
                      <br/>
                    ))
                    
                  )}
                  </TableRow>
                  ))) : (<p>No users found.....</p>)}
                </TableBody>
              </Table>
            
          )}


        </div>
        
    )
}

ListUsers.propTypes = {
  getAllUsers:PropTypes.func.isRequired,
  //adminDeleteUser:PropTypes.func.isRequired,
  getProfiles:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth,
  profile:state.profile
})

export default connect(mapStateToProps,{getAllUsers,getProfiles})(ListUsers);