import React,{Fragment,useEffect} from 'react';
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
import {getProfiles} from '../../actions/profile';
import {getAllUsers} from '../../actions/auth';
import Spinner from '../Dashboard/Spinner';
import Button from 'components/CustomButtons/Button.js';
import Info from '@material-ui/icons/Info';

const useStyles = makeStyles(styles);

const ListUsers = ({getAllUsers,getProfiles,
            auth:{users,loading}, 
            profile: {profiles}}) => {

    const [showProfile,setShowProfile] = React.useState(false);
    const classes = useStyles();
    //Retrieve all users and profiles to display
    useEffect(() => {
      getAllUsers();
      getProfiles();
    },[getAllUsers,getProfiles]);

    //ProfileIds array to compare the users and their profiles
    const profileIds = [
      profiles.map(profile => profile.user)
    ];

    // Toggle state on onclick to show profile of the users
    const toggleVisibility = ()=>{
      !showProfile ? setShowProfile(true) : setShowProfile(false)
    }

    //To display info button if there is a profile for corresponding user
    const getProfileData = (profileId) => {
      if(profileIds[0].includes(profileId)){
        return (
            <Fragment>
                <Button
                      simple
                      type="submit"
                      color='primary'
                      size='lg'
                      onClick={()=> toggleVisibility()}
                      >
                    <Info/>
                  </Button>
                  <div style={{ display: showProfile ? "block" : "none" }}>
                        {profiles.map(profile => (profileId === profile.user ? (
                          profile.address !== undefined ? (<div>
                            <p >User's current Address:
                            <p> {profile.address.address1}, {profile.address.address2}, {profile.address.city} </p>
                            <p> {profile.address.state}, {profile.address.country}, {profile.address.zipcode}</p>
                            </p>
                          </div>) : (<p>Only order history of the user is available</p>)
                        ) : (<p></p>)))}
                  </div>
                </Fragment>
                   
              )
      }
      else{
        return(
          <p>User is yet to create a profile</p>
        )
      }
    }

    //Render the component
    return(
        <div className={classes.landingContainer}>
            <div className={classes.dashboardTitle}>
              <h3 align="left"><strong>List of Users</strong></h3>
            {loading ? (<Spinner/>) :( 
              <Table className={classes.table} aria-label="a dense table" component = {Paper}>
                <TableHead className={classes.th}>
                  <TableRow>
                    <TableCell align="left" className={classes.td}>USER NAME</TableCell>
                    <TableCell align="left" className={classes.td}>EMAIL</TableCell>
                    <TableCell align="left" className={classes.td}>USER PROFILE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (users.map(user => (
                    <TableRow>
                      <TableCell align="left" className={classes.td} scope="row">{user.name}</TableCell>
                      <TableCell align="left" className={classes.td}>{user.email}</TableCell>
                    
                  {profiles.length > 0 ? (
                    <TableCell align="left" className={classes.td}>{getProfileData(user._id)}</TableCell>
                  ) : (<p> No profiles found..</p>)}
                    </TableRow>
                  ))) : (<p>No users found.....</p>)}  
                </TableBody>
              </Table>  
          )}
              </div>
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

export default connect(mapStateToProps,{getAllUsers,
                      getProfiles})(ListUsers);