import React ,{Fragment , useEffect }from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Spinner from './Spinner';
import { cardTitle } from "assets/jss/material-kit-react.js";
import { getUserProducts } from '../../actions/product';
import SingleProduct from "./SingleProduct";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const ViewProducts = ({
    getUserProducts, 
    product : { products , loading} }) => {
   

    useEffect(() => {
        getUserProducts();
      }, [getUserProducts]);

      const classes = useStyles();
      return loading ? (
      <Spinner />
      ) : (
      <Fragment>
           <div className={classes.landingContainer}>
              <GridContainer>
                  <GridItem xs={8} sm={8} md={4}>
                      <div>
                        { 
                        products.map(p =>(
                          <SingleProduct key={p._id} product={p}/>
                        )
                        )}
                      </div>
                  </GridItem>
              </GridContainer>
          </div>
    </Fragment>
  );
};

ViewProducts.propTypes = {
    getUserProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    product: state.product
  });
  
  export default connect(
    mapStateToProps,
    { getUserProducts }
  )(ViewProducts);