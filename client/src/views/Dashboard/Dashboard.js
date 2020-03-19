import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserProfile} from '../../actions/profile';

const Dashboard = ({auth, profile:{profile,loading}}) => {
  return loading && profile === null ? <Fragment>Dashboard Page</Fragment> : <Fragment>User logged in</Fragment>;
};

Dashboard.propTypes = {
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile : state.profile
});

export default connect(mapStateToProps)(Dashboard);
