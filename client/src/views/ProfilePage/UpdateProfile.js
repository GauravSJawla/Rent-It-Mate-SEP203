import React, { useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
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
import styles from 'assets/jss/material-kit-react/views/loginPage.js';

import image from 'assets/img/bg7.jpg';

//Import register from other component
import { register } from '../../actions/auth';

const useStyles = makeStyles(styles);

function UpdateProfile() {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zipcode:'',
    homephone:'',
    mobilephone:'',
    altemail:''
  });
 const classes = useStyles();

//   //OnChange event Handler
//   const onChange = e =>
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });

   const { address1, address2, city, state, country, 
                zipcode, homephone, mobilephone, altemail } = formData;

//   // OnSubmit Event Handler
//   const onSubmit = e => {
//     e.preventDefault();
//     console.log('name in else:' + { name });
//     if (password !== password2) {
//       alert('Passwords do not match');
//     } else {
//       register({ name, username, email, password });
//     }
//   };

//   if (isAuthenticated) {
//     return <Redirect to='/emailVerifyPage' />;
//   }
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
                <form className={classes.form}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Edit Profile</h4>
                    <p>Complete your profile</p>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        //onClick={e => e.preventDefault()}
                      >
                        <i className={'fab fa-google'} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText='Address1...'
                      id='address1'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: address1,
                        required : true,
                       // onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <PeopleIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText='Address2...'
                      id='address2'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: address2,
                       // onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <PersonIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText='City...'
                      id='city'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: city,
                        required : true,
                       // onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText='State...'
                      id='state'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: state,
                        required: true,
                        //onChange: e => onChange(e),
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
                    <CustomInput
                      labelText='Country...'
                      id='country'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: country,
                        required : true,
                        //onChange: e => onChange(e),
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
                    <CustomInput
                      labelText='Zipcode...'
                      id='zipcode'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: zipcode,
                        required : true,
                        //onChange: e => onChange(e),
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
                    <CustomInput
                      labelText='HomePhone...'
                      id='homephone'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: homephone,
                        required : true,
                        //onChange: e => onChange(e),
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
                    <CustomInput
                      labelText='MobilePhone'
                      id='mobilephone'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: mobilephone,
                        //onChange: e => onChange(e),
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
                    <CustomInput
                      labelText='Alternate Email...'
                      id='altemail'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'email',
                        value: altemail,
                        //onChange: e => onChange(e),
                        endAdornment: (
                            <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type='submit' color='primary' size='lg'>
                      Get started
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
}

// RegisterPage.propTypes = {
//   register: propTypes.func.isRequired,
//   isAuthenticated: propTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(
//   mapStateToProps,
//   { register }
// )(RegisterPage);
export default UpdateProfile;
