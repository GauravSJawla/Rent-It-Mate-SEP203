// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormLabel from "@material-ui/core/FormLabel";
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
//icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import image from 'assets/img/bg7.jpg';

//Import register from other component
import { createProduct } from '../../actions/product';

const useStyles = makeStyles(styles);

function CreateProduct({ createProduct, history }) {

  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    shipping: '',
    categories: [],
    category: '',
    photo: '',
    formData: ''
  });
  const classes = useStyles();

  const {
    name,
    description,
    price,
    quantity,
    shipping,
    categories,
    category,
    photo,
    createdProduct,
    formData
  } = values;

  const init = () => {
    // getCategories().then(data => {
    //   if (data.error) {
    //       setValues({ ...values, error: data.error });
    //   } else {
            
          setValues({
              ...values,
              //categories: data,
              formData: new FormData()
          });
    //   }

  //});
  }

  useEffect(() => {
    console.log('use effect')
    init();
  },[]);

  //OnChange event Handler
  const onChange = e => {
      const name = e.target.id
      const value = name ==='photo' ? e.target.files[0] : e.target.value;
      console.log(name+' id and val '+value)
      formData.set(name, value);
      setValues({ ...values, [name]: value});
     
  };

  // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    console.log("formdata: "+JSON.stringify(formData));
    createProduct(formData, history)
  };
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Create Your Product</h4>
                    <p></p>
                    <div className={classes.socialLine}></div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText='Name...'
                      id='name'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: name,
                        required: true,
                        onChange: e => onChange(e)
                      }}
                    />
                    <CustomInput
                      labelText='Description...'
                      id='description'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: description,
                        onChange: e => onChange(e)
                      }}
                    />
                    <CustomInput
                      labelText='Price...'
                      id='price'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number',
                        value: price,
                        required: true,
                        onChange: e => onChange(e)
                      }}
                    />
                    <CustomInput
                      labelText='Quantity...'
                      id='quantity'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number',
                        value: quantity,
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                    />
                    <CustomInput
                      labelText='Shipping...'
                      id='shipping'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: quantity,
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                    />
                    {/* <FormLabel component="legend">Shipping</FormLabel> */}
      {/* <RadioGroup
        aria-label="shipping"
        name="shipping"
        inputProps={{
          type: 'boolean',
          value: 'true',
          required: true,
          onChange: e => onChange(e),
          autoComplete: 'off'
        }}
      > */}
        {/* <FormControlLabel
          value="true"
          control={<Radio />}
          label="I will ship the product"
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="I won't ship this product"
        /> */}
      {/* </RadioGroup> */}
                    {/* <CustomDropdown
                      buttonText="Category"
                      dropdownHeader="Categories"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      inputProps={{
                        type: 'text',
                        value: '5e6a7a324ed00f15930538e7',
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                      dropdownList={[
                        "Furniture"
                        // "Another action",
                        // "Something else here",
                        // { divider: true },
                        // "Separated link",
                        // { divider: true },
                        // "One more separated link"
                      ]}
                    /> */}
                    <CustomInput
                      labelText='Category...'
                      id='category'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: '5e6a7a324ed00f15930538e7',
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                    />
                    <CustomInput
                      labelText='Photo...'
                      id='photo'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'file',
                        required: true,
                        onChange: e => onChange(e)
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type='submit' color='primary' size='lg'>
                      Create My Product
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProduct }
)(withRouter(CreateProduct));
