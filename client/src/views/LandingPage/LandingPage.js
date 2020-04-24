import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// enhancement packages
// core components
import Header from 'components/Header/Header';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import Parallax from 'components/Parallax/Parallax.js';
import Footer from 'components/Footer/Footer.js';

// Sections for this page
import Carousel from 'views/Components/Sections/SectionCarousel';
//import { loadUser } from 'actions/auth';
import ProductDisplayLandingPage from './ProductDisplayLandingPage';
import navStyles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';

import { getAllSubcategories } from '../../actions/subcategory';
import { getCategoryList } from '../../actions/category';

const useStyles = makeStyles(styles);
const useNavStyles = makeStyles(navStyles);

const LandingPage = ({
  auth: { user, isAuthenticated, loading },
  getCategoryList,
  categorylist: { categoryList },
  getAllSubcategories,
}) => {
  const classes = useStyles();
  const navClasses = useNavStyles();
  useEffect(() => {
    getCategoryList();
    getAllSubcategories();
  }, [getCategoryList, getAllSubcategories]);

  // eslint-disable-next-line
  const subCategoryList = [];

  // eslint-disable-next-line
  const category = [];

  //console.log(categoryList);
  //categoryList.map((cat) => {
  //  category.push(cat._id);
  //});

  const guestRender = (
    <Button color='danger' size='lg' component={Link} to='/register'>
      Get started now
    </Button>
  );
  return !loading && user && user.role === 'admin' ? (
    <Redirect to='/admin-Dashboard' />
  ) : (
    <div>
      <Header
        brand='Categories'
        rightLinks={
          <List className={navClasses.list}>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category1'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory1', 'Subcategory2']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category2'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory2', 'Subcategory2']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category3'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory3', 'Subcategory3']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category4'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory4', 'Subcategory4']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category5'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory5', 'Subcategory5']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category6'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory6', 'Subcategory6']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category7'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory7', 'Subcategory7']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category8'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory8', 'Subcategory8']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
          </List>
        }
      />
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
          <h2>Few of the Products</h2>
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
  getCategoryList: propTypes.func.isRequired,
  getAllSubcategories: propTypes.func.isRequired,
  categorylist: propTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categorylist: state.categorylist.categoryList,
  subcategory: state.subcategory,
});

export default connect(
  mapStateToProps,
  {
    getCategoryList,
    getAllSubcategories,
  }
)(LandingPage);
