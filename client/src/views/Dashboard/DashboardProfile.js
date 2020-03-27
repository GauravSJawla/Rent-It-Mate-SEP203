import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import Spinner from "./Spinner";
import { getUserProfile, deleteProfile } from "../../actions/profile";

const useStyles = makeStyles(styles);
const DashboardProfile = ({
  getUserProfile,
  deleteProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  const classes = useStyles();
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.landingContainer}>
          <h3>Welcome {user && user.name}</h3>
          {profile !== null ? (
            <Fragment>
              <h4>Your Address : </h4>
              <h4> {profile.address.address1}, </h4>
              <h4> {profile.address.city},</h4>
              <h4> {profile.address.state},</h4>
              <h4> {profile.address.country}, </h4>
              <h4> {profile.address.zipcode} </h4>
              <Button
                simple
                component={Link}
                to="/dashboard/edit-profile"
                color="primary"
                size="lg"
              >
                Update My Account
              </Button>
              <Button
                simple
                type="submit"
                color="primary"
                size="lg"
                onClick={() => deleteProfile()}
              >
                Delete My Account
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info!</p>
              <Link to="/dashboard/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
              <Button
                simple
                type="submit"
                color="white"
                size="lg"
                onClick={() => deleteProfile()}
              >
                Delete My Account
              </Button>
            </Fragment>
          )}
        </div>
      </Parallax>
    </Fragment>
  );
};

DashboardProfile.propTypes = {
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
  { getUserProfile, deleteProfile }
)(DashboardProfile);
