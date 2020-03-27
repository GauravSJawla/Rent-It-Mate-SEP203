import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
//import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PhoneIcon from '@material-ui/icons/Phone';
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
import { createProfile, getUserProfile } from '../../actions/profile';

const useStyles = makeStyles(styles);

function EditProfile({ profile : {profile, loading},
    createProfile,
      getUserProfile,
      history})  {
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
    homePhone:'',
    mobilePhone:'',
    alternateEmail:''
  });
 const classes = useStyles();

 useEffect(() => {
     getUserProfile();
     setFormData({
        address1: loading || !profile.address ? '' : profile.address.address1,
        address2: loading || !profile.address ? '' : profile.address.address2,
        city: loading || !profile.address ? '' : profile.address.city,
        state: loading || !profile.address ? '' : profile.address.state,
        country: loading || !profile.address ? '' : profile.address.country,
        zipcode: loading || !profile.address ? '' : profile.address.zipcode,
        homePhone : loading || !profile.homePhone ? '' : profile.homePhone,
        mobilePhone : loading || !profile.mobilePhone ? '' : profile.mobilePhone,
        alternateEmail : loading || !profile.alternateEmail ? '' : profile.alternateEmail
     });
 },[loading, getUserProfile]);

 const { address1, address2, city, state, country, 
  zipcode, homePhone, mobilePhone, alternateEmail } = formData;

  //OnChange event Handler
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });

   

  // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData,history,true);
    
  };

  // if (!loading) {
  //   console.log('inside loading');
  //   return <Redirect to='/dashboard' />;
  // }

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
                    <h4>Edit Your Profile</h4>
                    <p>We will be happy to have your information!!!!!</p>
                    <div className={classes.socialLine}>
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
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AddLocationIcon className={classes.inputIconsColor} />
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
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AddLocationIcon className={classes.inputIconsColor} />
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
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AddLocationIcon className={classes.inputIconsColor} />
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
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AddLocationIcon className={classes.inputIconsColor} />
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
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                           <AddLocationIcon className={classes.inputIconsColor} />
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
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AddLocationIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                    />
                    <CustomInput
                      labelText='HomePhone...'
                      id='homePhone'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: homePhone,
                        required : true,
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <PhoneIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                    />
                    <CustomInput
                      labelText='MobilePhone'
                      id='mobilePhone'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: mobilePhone,
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                             <PhoneIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                    />
                    <CustomInput
                      labelText='Alternate Email...'
                      id='alternateEmail'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'email',
                        value: alternateEmail,
                        onChange: e => onChange(e),
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
                      Update My Profile
                    </Button>
                    <Button simple color="primary" size='lg' component={Link} 
                            to="/dashboard">
                        Back to Profile
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
  getUserProfile : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});
// export default connect(
//   mapStateToProps,
//   { register }
// )(RegisterPage);
export default connect(
  mapStateToProps,
  {createProfile, getUserProfile}
)(withRouter(EditProfile));
