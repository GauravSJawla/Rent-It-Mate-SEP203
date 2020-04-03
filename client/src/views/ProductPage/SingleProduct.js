import React ,{Fragment }from "react";
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
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
//
import { deleteProduct } from '../../actions/product'
const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const SingleProduct = ({
    auth,
    deleteProduct,
    product : { _id , name , description , price , quantity, shipping ,sold , category, photo } }) =>{
    console.log('name '+_id+name+' '+description)
      const classes = useStyles();
      return(
      <Fragment>
           <div className={classes.landingContainer}>
      <Card style={{width: "20rem"}}>
          <img
            style={{height: "180px", width: "100%", display: "block"}}
            className={classes.imgCardTop}
            src={photo}
            alt="Card-img-cap"
          />
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
       <Button color="primary"><EditIcon/></Button>
       </span>
        
      </CardBody>
    </Card>
    </div>
    </Fragment>
    
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
