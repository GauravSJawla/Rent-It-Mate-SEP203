import React ,{Fragment , useEffect }from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from 'components/Grid/GridContainer.js';
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Spinner from './Spinner';
import { cardTitle } from "assets/jss/material-kit-react.js";
import { getAllProducts } from '../../actions/product';
import SingleProductLandingPage from "./SingleProductLandingPage";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const ProductDisplayLandingPage = ({
    getAllProducts, 
    product : { products , loading} }) => {
      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          paritialVisibilityGutter: 60
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          paritialVisibilityGutter: 50
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          paritialVisibilityGutter: 30
        }
      };

    useEffect(() => {
        getAllProducts();
      }, [getAllProducts]);

      const classes = useStyles();
      return loading ? (
      <Spinner />
      ) : (
      <Fragment responsive={responsive}>
           <div className={classes.landingContainer}>
              <GridContainer style={{marginLeft: "10px"}}>
                  <a href='/single-product-details'>
                        { 
                        products.map(p =>(
                          <SingleProductLandingPage key={p._id} product={p}/>
                        )
                        )}
                  </a>
              </GridContainer>
          </div>
    </Fragment>
  );
};

ProductDisplayLandingPage.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    product: state.product
  });
  
  export default connect(
    mapStateToProps,
    { getAllProducts }
  )(ProductDisplayLandingPage);