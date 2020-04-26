/*eslint-disable*/
import React, { Fragment, useState } from 'react';
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

import { searchProductWithKeyword } from '../../actions/product';
import { setAlert } from '../../actions/alert';

const navUseStyles = makeStyles(navStyles);
const useStyles = makeStyles(styles);

const HeaderLinks = ({
  auth: { isAuthenticated, loading, user },
  logout,
  setAlert,
  searchProductWithKeyword,
}) => {
  const classes = useStyles();
  const navbarClasses = navUseStyles();

  const [searchData, setSearchData] = useState({
    searchKeyword: '',
    searchZipcode: '',
  });

  const { searchKeyword, searchZipcode } = searchData;

  const onChange = (e) =>
    setSearchData({
      ...searchData,
      [e.target.id]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(searchKeyword);
    // Alert for no search keyword
    if (searchKeyword == '') {
      setAlert('No input in search tab!', 'warning');
    } else {
      if (searchZipcode == '') {
        setAlert('No Zipcode in search tab!', 'warning');
      } else {
        searchProductWithKeyword(searchKeyword, searchZipcode);
      }
    }
  };

  const guestRender = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <CustomInput
            white
            id='searchZipcode'
            name='searchZipcode'
            formControlProps={{
              className: navbarClasses.formControl,
            }}
            inputProps={{
              placeholder: 'Zipcode',
              inputProps: {
                value: searchZipcode,
                type: 'text',
                onChange: (e) => onChange(e),
                'aria-label': 'Search',
                className: navbarClasses.searchInput,
              },
            }}
          />
          <CustomInput
            white
            id='searchKeyword'
            name='searchKeyword'
            formControlProps={{
              className: navbarClasses.formControl,
            }}
            inputProps={{
              placeholder: 'Search',
              inputProps: {
                value: searchKeyword,
                type: 'text',
                onChange: (e) => onChange(e),
                'aria-label': 'Search',
                className: navbarClasses.searchInput,
              },
            }}
          />
          <Button type='submit' justIcon round color='white'>
            <Search />
          </Button>
        </form>
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
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <CustomInput
            white
            id='searchZipcode'
            name='searchZipcode'
            formControlProps={{
              className: navbarClasses.formControl,
            }}
            inputProps={{
              placeholder: 'Zipcode',
              inputProps: {
                value: searchZipcode,
                type: 'text',
                onChange: (e) => onChange(e),
                'aria-label': 'Search',
                className: navbarClasses.searchInput,
              },
            }}
          />
          <CustomInput
            white
            id='searchKeyword'
            name='searchKeyword'
            formControlProps={{
              className: navbarClasses.formControl,
            }}
            inputProps={{
              placeholder: 'Search',
              inputProps: {
                value: searchKeyword,
                type: 'text',
                onChange: (e) => onChange(e),
                'aria-label': 'Search',
                className: navbarClasses.searchInput,
              },
            }}
          />
          <Button type='submit' justIcon round color='white'>
            <Search />
          </Button>
        </form>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          buttonText='Profile'
          dropdownHeader={user && user.name}
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
  setAlert: PropTypes.func.isRequired,
  searchProductWithKeyword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout, setAlert, searchProductWithKeyword }
)(HeaderLinks);
