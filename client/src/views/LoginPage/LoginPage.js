import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person';
// core components
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
//importing login for login
import { login, loadUser } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';

import image from 'assets/img/bg7.jpg';
//import store from '../../store';

const useStyles = makeStyles(styles);
const LoginPage = ({
  login,
  auth: { isAuthenticated, user, error },
  setAlert,
  loadUser
}) => {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    login(username, password);
  };
  // Alerts for Errors
  if (error === 'Invalid Password!') {
    setAlert('Password in incorrect!', 'danger');
  }
  if (error === 'Invalid Username!') {
    setAlert('Username is incorrect!', 'danger');
  }

  // Redirect if logged in
  if (isAuthenticated) {
    console.log('inside is authenticated');
    loadUser();
  }
  //Redirect to admin dashboard
  if (user !== null) {
    if (user.role === 'admin') {
      return <Redirect to='/admin-Dashboard' />;
    }
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i className={'fab fa-google'} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText='User Name...'
                      id='username'
                      name='username'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: username,
                        type: 'text',
                        required: true,
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <PersonIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText='Password'
                      id='password'
                      name='password'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: password,
                        type: 'password',
                        required: true,
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type='submit' simple color='primary' size='lg'>
                      Log In
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { login, setAlert, loadUser }
)(LoginPage);
