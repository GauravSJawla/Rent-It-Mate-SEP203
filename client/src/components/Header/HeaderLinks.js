/*eslint-disable*/
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// @material-ui/icons
import Search from '@material-ui/icons/Search';

// core components
import Button from 'components/CustomButtons/Button.js';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import CustomInput from 'components/CustomInput/CustomInput.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import navStyles from 'assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js';

const navUseStyles = makeStyles(navStyles);
const useStyles = makeStyles(styles);

const HeaderLinks = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const classes = useStyles();
  const navbarClasses = navUseStyles();

  const guestRender = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomInput
          white
          formControlProps={{
            className: navbarClasses.formControl,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
              className: navbarClasses.searchInput,
            },
          }}
        />
        <Button justIcon round color='white'>
          <Search />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color='transparent'
          component={Link}
          to='/register'
          className={classes.navLink}
        >
          Register
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color='transparent'
          component={Link}
          to='/login'
          className={classes.navLink}
        >
          Login
        </Button>
      </ListItem>
    </List>
  );

  const authRender = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomInput
          white
          formControlProps={{
            className: navbarClasses.formControl,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
              className: navbarClasses.searchInput,
            },
          }}
        />
        <Button justIcon round color='white'>
          <Search />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          buttonText='Profile'
          dropdownHeader='Username'
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          dropdownList={[
            <Link component={Link} to='/dashboard' className={classes.listLink}>
              Dashboard
            </Link>,

            { divider: true },

            <Link
              onClick={logout}
              component={Link}
              to='/'
              className={classes.listLink}
            >
              Logout
            </Link>,
          ]}
        />
      </ListItem>
    </List>
  );

  const adminRender = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color='transparent'
          onClick={logout}
          component={Link}
          to='/'
          className={classes.navLink}
        >
          Logout
        </Button>
      </ListItem>
    </List>
  );

  return (
    <div>
      {!loading && (
        <Fragment>
          {isAuthenticated
            ? user && user.role === 'admin'
              ? adminRender
              : authRender
            : guestRender}
        </Fragment>
      )}
    </div>
  );
};

HeaderLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout }
)(HeaderLinks);
