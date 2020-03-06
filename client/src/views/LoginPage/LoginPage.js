import React, { useState } from 'react';
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
import { login } from '../../actions/auth';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';

import image from 'assets/img/bg7.jpg';

const useStyles = makeStyles(styles);
const LoginPage = ({ login, isAuthenticated }) => {
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

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
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
  login: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);