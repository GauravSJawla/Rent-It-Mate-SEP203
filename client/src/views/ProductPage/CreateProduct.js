// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import Select from "react-select";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {getCategoryList} from '../../actions/category';
import {getAllSubcategories} from '../../actions/subcategory';
import "react-datepicker/dist/react-datepicker.css";

import image from 'assets/img/bg7.jpg';

//Import register from other component
import { createProduct } from '../../actions/product';

const useStyles = makeStyles(styles);

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
  const [selectSubCategory, setSelectSubCategory] = React.useState({
    selectSubCategory : ''
  });
  const [selectFromDate,setSelectFromDate] = React.useState(new Date());
  const [selectToDate,setSelectToDate] = React.useState(new Date());

 // To select from list of subcategories
  const onSelectChange = e => {
    setSelectSubCategory({
      selectSubCategory : e.value
    })
  };

  // To select shipping for product
  const toggleShipping = () => {
    setSwitchShipping((prev) => !prev);
  };

  // To select start date for the product
  const fromDateChange = (date) => {
    setSelectFromDate(date);
  }

  // To select to date for the product
  const toDateChange = (date) => {
    setSelectToDate(date);
  }

  //to set minimum future date of upto 30 days in end date of the product
  var date = new Date();
  date.setDate(date.getDate() + 30)
  
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

  const subCategoryList = [];
  subcategories.map(subcategory => {
    subCategoryList.push({ value: subcategory._id, label: subcategory.name })
  })
  //OnChange event Handler
  const onChange = e => {
    const name = e.target.id 
    const value = name == 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    console.log('select to date',selectToDate);
    formData.set('shipping', switchShipping);
    formData.set('subcategory',selectSubCategory.selectSubCategory);
    formData.set('fromDate',selectFromDate);
    formData.set('toDate',selectToDate);
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
                    <FormControlLabel
                        control = {<Switch checked = {switchShipping} onChange = {toggleShipping}/>}
                        label = "Product can be shipped"
                      />
                      <br/>
                      <br/>
                      <label><strong>Please select a category</strong></label>
                      <Select
                          options={subCategoryList}
                          id="subCategory"
                          onChange={(e) => onSelectChange(e)}
                      />
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
                     <label><strong>Please select a start date</strong></label>
                     <DatePicker
                        selected = {selectFromDate}
                        minDate = {new Date()}
                        onChange={fromDateChange}
                        required
                      />
                     <br/>
                     <br/>
                     <label><strong>Please select an end date</strong></label>
                     <DatePicker
                        selected = {selectToDate}
                        minDate = {date}
                        defaultValue = {date}
                        onChange={toDateChange}
                        required
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
