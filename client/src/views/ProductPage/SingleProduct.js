import React ,{Fragment, useState }from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from 'components/Grid/GridItem.js';
//icon
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
//
import { deleteProduct } from '../../actions/product'
import ShowImage from './ShowImage'
const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const SingleProduct = ({
    auth,
    deleteProduct,
    product : { _id , name , description , price , quantity, shipping ,sold , category, photo } }) =>{
      const classes = useStyles();
      
      return(
        <GridItem xs={12} sm={12} md={4}>
        <div className={classes.landingContainer}>
        <Card style={{width: "20rem"}}>
          <ShowImage productId={_id}/>
      <CardBody>
      <h4 className={classes.cardTitle}>{name}</h4>
      <p>{description}</p>
      <div>
      <p>Price : {price}</p>
      <p>Quantity :{quantity}</p>
      <p>Shipping: {shipping}</p>
      <p>Sold: {sold}</p>
      </div>
       <span style={{padding: "40px"}}>
       <Button color="danger" onClick={e => deleteProduct(_id)}><DeleteIcon/></Button>
       <Link to={`/product/${_id}`}> 
       <Button  color="primary">
         <EditIcon/>
       </Button>
       </Link>
       </span>
        
      </CardBody>
    </Card>
    </div>
    </GridItem>
    
      )
};


SingleProduct.propTypes = {
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
      {deleteProduct}
  )(SingleProduct);
