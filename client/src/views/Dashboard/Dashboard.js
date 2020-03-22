import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from 'components/CustomButtons/Button.js';
import Parallax from "components/Parallax/Parallax.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js"
import {getUserProfile,deleteProfile} from '../../actions/profile';

const useStyles = makeStyles(styles);
const Dashboard = ({getUserProfile, deleteProfile,
  auth : {user}, 
  profile:{profile,loading}}) => {
    const classes = useStyles();
  useEffect(() => {
    getUserProfile();
  },[loading]);

  const onSubmit = e => {
    deleteProfile();
  };

  return loading && profile === null ? <Fragment>Dashboard Page</Fragment> : <Fragment>
    <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.landingContainer}>
          <GridContainer>
            <form className={classes.form} onSubmit={e => onSubmit(e)}>
                <h4>Welcome {user && user.name}</h4>
                <br/>
                <Button type='submit'>Delete Account</Button>
                </form>
          </GridContainer>
        </div>
    </Parallax>
</Fragment>;
};

Dashboard.propTypes = {
  getUserProfile : PropTypes.func.isRequired,
  deleteProfile : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile : state.profile
});

export default connect(mapStateToProps, {getUserProfile,deleteProfile})(Dashboard);
