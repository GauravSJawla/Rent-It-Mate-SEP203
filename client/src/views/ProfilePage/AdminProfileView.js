import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.js';
import Spinner from '../Dashboard/Spinner';
import {getProfileById} from '../../actions/profile';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles(styles);
const AdminProfileView = (
    {getProfileById,
      profile : {profile,loading}, 
      match}) =>{
    const classes = useStyles();
    useEffect(() => {
        console.log('inside profileview use effect', match.params.id)
        getProfileById(match.params.id);
    },[getProfileById,match.params.id]);
    return loading && profile === null ? (
        <Spinner/>
    ) : (
        <Fragment>
            <div className={classes.landingcontainer}>
                <div className = {classes.dashboardTitle}>
                    <h4>First Name: </h4>
                    <p> Email Id: </p>
                    <h4>User's current Address:</h4>
                    <div>
                        <p> {profile.address.address1}, </p>
                        <p> {profile.address.city},</p>
                        <p> {profile.address.state},</p>
                        <p> {profile.address.country}, </p>
                        <p> {profile.address.zipcode} </p>
                    </div>
                </div>
                <Button
                    simple
                    component={Link}
                    // to={`/admin-delete-profile/${user._id}`}
                    color='primary'
                    size='lg'
                >
                    <Delete/>
                </Button>
            </div>
        </Fragment>
    )
    
}

AdminProfileView.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
   
}

const mapStateToProps = state => ({
    profile:state.profile,
   
})

export default connect(mapStateToProps,{getProfileById})(AdminProfileView);