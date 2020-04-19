// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles';
// core components
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
//import Select from "react-select";
import {getCategoryList} from '../../actions/category';
import {getAllSubcategories} from '../../actions/subcategory';
import "react-datepicker/dist/react-datepicker.css";

import image from 'assets/img/bg7.jpg';

//Import register from other component
import { createProduct } from '../../actions/product';

const useStyles = makeStyles(styles);

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

function CreateProduct({ createProduct, 
                            history,
                            getCategoryList,
                            getAllSubcategories,
                            categorylist : {categoryList},
                            subcategory : {subcategories}
                           }) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const ITEM_HEIGHT = 48;
 const ITEM_PADDING_TOP = 8;

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    shipping: '',
    subcategory: '',
    photo: '',
    fromDate: '',
    toDate: '',
    formData: ''
  });
  const classes = useStyles();

  const [switchShipping, setSwitchShipping] = React.useState(false);

  const toggleShipping = () => {
    console.log('inside shipping')
    setSwitchShipping((prev) => !prev);
    console.log('after toggle', switchShipping)
  };

  const {
    name,
    description,
    price,
    quantity,
    shipping = switchShipping,
    subcategory,
    photo,
    fromDate,
    toDate,
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
  };

  useEffect(() => {
    console.log('use effect');
    getCategoryList();
    getAllSubcategories();
    init();
  }, []);

  //OnChange event Handler
  const onChange = e => {
    const name = e.target.id == undefined ? 'subcategory' : e.target.id;
    const value = name == 'photo' ? e.target.files[0] : e.target.value;
    console.log('name and value ;' , name + ' ' + value)
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
console.log('subcategories', subcategories)
  // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    formData.set('shipping', switchShipping)
    console.log('formdata: ' + formData);
    createProduct(formData, history);
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
                    <div className={classes.socialLine}></div>
                  </CardHeader>
                  <CardBody 
                    style={{
                      width: '100%',
                      margin: 'auto',
                      padding: '10px',
                      minheight: '30vw'
                }}
                  >
                    <CustomInput
                      labelText='Name *'
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
                      labelText='Description'
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
                      labelText='Price *'
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
                      labelText='Quantity *'
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
                    {/* <CustomInput
                      labelText='Shipping *'
                      id='shipping'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: shipping,
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                    /> */}
                    <FormControlLabel
                        control = {<Switch checked = {switchShipping} onChange = {toggleShipping}/>}
                        label = "Product can be shipped"
                      />
                    <InputLabel id="demo-simple-select-outlined-label">Product category *</InputLabel>
                    <Select
                        labelId = "demo-simple-select-outlined-label"
                        id = "subcategory"
                        value={subcategory}
                        renderValue={selected => {
                          if (selected.length === 0) {
                            return <em>Please select One</em>;
                          }
                          return (subcategories.map(subcat => (
                            subcat._id === selected ? subcat.name : ''
                          )))
                        }}
                        onChange= {(e) => onChange(e)}
                        input = {<Input />}
                        MenuProps = {{
                          PaperProps:{
                            style : {
                              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                              width: 250,
                            }
                          }
                        }}
                        >
                          {subcategories.map(subcategory => (
                            <MenuItem key = {subcategory.name} value = {subcategory._id}>
                              {subcategory.name}
                            </MenuItem>
                          ))}
                    </Select>
                    <CustomInput
                      labelText='Photo...'
                      id='photo'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'file',
                        onChange: e => onChange(e)
                      }}
                    />
                    <TextField
                          id="fromDate"
                          label="Product Start Date *"
                          type="date"
                          className={classes.textField}
                          onChange = {(e) => onChange(e)}
                          InputLabelProps={{
                                  shrink: true,
                          }}
                     />
                     <br/>
                     <br/>
                     <TextField
                          id="toDate"
                          label="Product End Date *"
                          type="date"
                          className={classes.textField}
                          onChange = {(e) => onChange(e)}
                          InputLabelProps={{
                                  shrink: true,
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
  createProduct: PropTypes.func.isRequired,
  getCategoryList : PropTypes.func.isRequired,
  getAllSubcategories: PropTypes.func.isRequired,
  categorylist: PropTypes.object.isRequired,
  subcategory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categorylist:state.categorylist,
  subcategory:state.subcategory
});

export default connect(
  mapStateToProps,
  { createProduct,getAllSubcategories, getCategoryList }
)(withRouter(CreateProduct));
