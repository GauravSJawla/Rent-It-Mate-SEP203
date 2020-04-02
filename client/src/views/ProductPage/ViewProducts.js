import React ,{Fragment , useEffect }from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
//icon
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Spinner from './Spinner';
import { cardTitle } from "assets/jss/material-kit-react.js";

import { getUserProducts } from '../../actions/product';

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const ViewProducts = ({
    getUserProducts, 
    product: {  products , loading } }) => {
   

    useEffect(() => {
        getUserProducts();
      }, [getUserProducts]);

      const classes = useStyles();
  return loading & products === null ? (
    <Spinner/> 
  ) : (
      <Fragment>
           <div className={classes.landingContainer}>
          <GridContainer>
            <GridItem xs={8} sm={8} md={4}>
          <Card style={{width: "20rem"}}>
      <img
        style={{height: "180px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src="..."
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       <span style={{padding: "40px"}}>
       <Button color="primary"><DeleteIcon/></Button>
       <Button color="primary"><EditIcon/></Button>
       </span>
        
      </CardBody>
    </Card>
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