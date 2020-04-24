import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// enhancement packages
// core components
import Paginations from 'components/Pagination/Pagination.js';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

//import { loadUser } from 'actions/auth';
import ProductDisplayLandingPage from '../LandingPage/ProductDisplayLandingPage';
import SearchFilterSection from './SearchFilterSection.js';

import { getAllSubcategories } from '../../actions/subcategory';
import { getCategoryList } from '../../actions/category';

const useStyles = makeStyles(styles);

const SearchAllProduct = ({
  auth: { user, isAuthenticated, loading },
  getCategoryList,
  categorylist: { categoryList },
  getAllSubcategories,
}) => {
  const classes = useStyles();
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

  return !loading && user && user.role === 'admin' ? (
    <Redirect to='/admin-Dashboard' />
  ) : (
    <div>
      <h1 className={classes.title}> </h1>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.container}>
            <SearchFilterSection />
            <h3 className={classes.title}>Products...</h3>
            <ProductDisplayLandingPage />
          </div>
          <div>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={4}>
                <Paginations
                  pages={[
                    { text: 1 },
                    { text: '...' },
                    { text: 5 },
                    { text: 6 },
                    { active: true, text: 7 },
                    { text: 8 },
                    { text: 9 },
                    { text: '...' },
                    { text: 12 },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

SearchAllProduct.propTypes = {
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
)(SearchAllProduct);
