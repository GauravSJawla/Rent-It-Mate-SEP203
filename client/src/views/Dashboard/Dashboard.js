import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserProfile} from '../../actions/profile';

const Dashboard = ({getUserProfile, auth, profile}) => {
  useEffect(()=>{
    getUserProfile();
  },[]);
  return <Fragment>Dashboard Page</Fragment>;
};

Dashboard.PropTypes = {
  getUserProfile : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile : state.profile
});

export default connect(mapStateToProps,{getUserProfile})(Dashboard);
