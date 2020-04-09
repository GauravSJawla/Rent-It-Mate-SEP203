import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import store from '../../store';
// enhancement packages

// core components
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
import ProductGallary from 'components/ProductGallary/ProductGallary.js';

import styles from 'assets/jss/material-kit-react/views/landingPage.js';

// Sections for this page
import Carousel from 'views/Components/Sections/SectionCarousel';
//import { loadUser } from 'actions/auth';

const useStyles = makeStyles(styles);

const LandingPage = ({ auth:{user,isAuthenticated,loading} }) => {
  const classes = useStyles();
  // useEffect(() =>{
  //   console.log('inside useeffect')
  //   store.dispatch(loadUser());
  //   console.log('user role',user)
  // },[]);
  const guestRender = (
    <Button
      color='danger'
      size='lg'
      component={Link}
      to='/register'
      target='_blank'
      rel='noopener noreferrer'
    >
      <i className='fas fa-play' />
      Register
    </Button>
  );
  return !loading && user && user.role==="admin" ? (<Redirect to='/admin-Dashboard'/>) : (
    //return(
    <div>
      <Parallax filter image={require('assets/img/landing-bg.jpg')}>
        <div className={classes.landingContainer}>
          <GridContainer>
            <GridItem xs={8} sm={8} md={4}>
              <div>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4 className={classes.subtitle}>
                  Rent It Mate is a platform for you to rent out your rarely
                  used stuff and earn some money on it. So why wait? Sign Up!
                </h4>
                <br />
                <div>{isAuthenticated ? <div /> : guestRender}</div>
              </div>
            </GridItem>
            <GridItem xs={16} sm={16} md={8}>
              <Carousel />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {/* <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.gallaryContainer}>
          <h2 className={classes.carouselTitle}>New Arrivals</h2>
          <ProductGallary />
        </div>
        <div className={classes.gallaryContainer}>
          <h2 className={classes.carouselTitle}>Headphones</h2>
          <ProductGallary />
        </div>
      </div>
      <Footer /> */}

      
    </div>
    
  );
};

LandingPage.propTypes = {
  //isAuthenticated: propTypes.bool
  auth:propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth
});

export default connect(mapStateToProps)(LandingPage);
