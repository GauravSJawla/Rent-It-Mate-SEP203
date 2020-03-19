/*eslint-disable*/
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons

// core components
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const HeaderLinks = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles();

  const guestRender = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          component={Link}
          to="/register"
          className={classes.navLink}
        >
          Register
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          component={Link}
          to="/login"
          className={classes.navLink}
        >
          Login In
        </Button>
      </ListItem>
    </List>
  );

  const authRender = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          component={Link}
          to="/"
          className={classes.navLink}
        >
          Cart
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          buttonText="Profile"
          dropdownHeader="Username"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link
              component={Link}
              to="/create-profile"
              className={classes.listLink}
            >
              Create Profile
            </Link>,

            { divider: true },
            <Link
              component={Link}
              to="/edit-profile"
              className={classes.listLink}
            >
              Update Profile
            </Link>,
            
            { divider: true },
            <Link
              onClick={logout}
              component={Link}
              to="/"
              className={classes.listLink}
            >
              Logout
            </Link>
          ]}
        />
      </ListItem>
    </List>
  );

  return (
    <div>
      {!loading && (
        <Fragment>{isAuthenticated ? authRender : guestRender}</Fragment>
      )}
    </div>
  );
};

HeaderLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(HeaderLinks);
