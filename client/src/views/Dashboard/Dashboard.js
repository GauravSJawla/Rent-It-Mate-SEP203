import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'components/CustomButtons/Button.js';
import Spinner from './Spinner';
import { getUserProfile, deleteProfile} from '../../actions/profile';

const Dashboard = ({
  getUserProfile,
  deleteProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <Button simple type='submit' color='primary' size='lg' 
                        onClick= {() => deleteProfile()}>
                      Delete My Account
                    </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info!</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserProfile,deleteProfile}
)(Dashboard);