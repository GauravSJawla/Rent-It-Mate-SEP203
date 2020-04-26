import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import imagesStyles from 'assets/jss/material-kit-react/imagesStyles.js';
import { cardTitle } from 'assets/jss/material-kit-react.js';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShowImage from '../ProductPage/ShowImage';
const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const SingleProductLandingPage = ({
  auth: { isAuthenticated },
  product: {
    _id,
    name,
    description,
    price,
    quantity,
    shipping,
    sold,
    category,
    photo,
  },
}) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const guestRender = (
    <div>
      <h1>you need to login</h1>
    </div>
  );
  const onClickHandle = () => {
    if (!isAuthenticated) {
      window.alert('You need to login to shop!');
    }
  };
  return (
    <GridItem xs={12} sm={12} md={4}>
      <div className={classes.landingContainer}>
        <Card style={{ width: '20rem' }}>
          <ShowImage productId={_id} />
          <CardBody>
            <h3 className={classes.cardTitle}>{name}</h3>
            <p>{description}</p>
            <div>
              <p>Price : {price}</p>
              {/* <p>Quantity :{quantity}</p> */}
              <p>Shipping: {shipping}</p>
              {/* <p>Sold: {sold}</p> */}
            </div>
            <span style={{ padding: '40px' }}>
              <Button color='danger' onClick={(e) => onClickHandle()}>
                <AddShoppingCartIcon /> Add to cart
              </Button>
            </span>
          </CardBody>
        </Card>
      </div>
    </GridItem>
  );
};

SingleProductLandingPage.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SingleProductLandingPage);
