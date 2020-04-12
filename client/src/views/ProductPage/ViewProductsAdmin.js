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
import SingleProduct from "./SingleProduct";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const ViewProductsAdmin = ({
    getAllProducts, 
    product : { products , loading} }) => {
   
    console.log('inside admin view products')

    useEffect(() => {
        getAllProducts();
      }, [getAllProducts]);

      const classes = useStyles();
      return loading ? (
      <Spinner />
      ) : (
           <div className={classes.landingContainer}>
               <h3 align="left"><strong>Available Products</strong></h3>
              <GridContainer>
                        { 
                        products.map(p =>(
                          <SingleProduct key={p._id} product={p}/>
                        )
                        )}
              </GridContainer>
          </div>
  );
};

ViewProductsAdmin.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    product: state.product
  });
  
  export default connect(
    mapStateToProps,
    { getAllProducts }
  )(ViewProductsAdmin);