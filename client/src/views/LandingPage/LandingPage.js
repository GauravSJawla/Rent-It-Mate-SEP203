import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// enhancement packages
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import Parallax from 'components/Parallax/Parallax.js';
import Footer from 'components/Footer/Footer.js';

// Sections for this page
import Carousel from 'views/Components/Sections/SectionCarousel';
//import { loadUser } from 'actions/auth';
import CategoryDisplaySection from './CategoryDisplaySection.js';
import ProductDisplayLandingPage from './ProductDisplayLandingPage';

const useStyles = makeStyles(styles);

const LandingPage = ({ auth: { user, isAuthenticated, loading } }) => {
  const classes = useStyles();
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
  return !loading && user && user.role === 'admin' ? (
    <Redirect to='/admin-Dashboard' />
  ) : (
    <div>
      <Parallax filter image={require('assets/img/landing-bg2.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4 className={classes.subtitle}>
                Rent It Mate is a platform for you to rent out your rarely used
                stuff and earn some money on it.
                <div>{isAuthenticated ? <div /> : guestRender}</div>
              </h4>
            </GridItem>
            <Carousel />
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CategoryDisplaySection />
          <h2 className={classes.title} justify='center'>
            Few of the Products
          </h2>
          <ProductDisplayLandingPage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

LandingPage.propTypes = {
  //isAuthenticated: propTypes.bool
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LandingPage);
