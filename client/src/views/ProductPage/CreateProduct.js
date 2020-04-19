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
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import Select from "react-select";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import {getCategoryList} from '../../actions/category';
import {getAllSubcategories} from '../../actions/subcategory';

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

  const {
    name,
    description,
    price,
    quantity,
    shipping,
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

   //onCategorySelectChange Event handler

   const onCategorySelectChange = e => {
     const categoryId = e.value;
     subcategories.map(subcategory => {
       if(subcategory.categoryId === categoryId){
         subCategoryList.push(subcategory.name);
       }
     })
     console.log('subcategoryList', subCategoryList);
   };

  //OnChange event Handler
  const onChange = e => {
    const name = e.target.id;
    const value = name == 'photo' ? e.target.files[0] : e.target.value;
    console.log(name + ' id and val ' + value);
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    console.log('formdata: ' + JSON.stringify(formData));
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
                        value: shipping,
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                    />
                    {/* <CustomInput
                      labelText='Category id...'
                      id='category'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value: category,
                        required: true,
                        onChange: e => onChange(e),
                        autoComplete: 'off'
                      }}
                      // buttonText='Category'
                      // dropdownList={[
                      //   'Furniture',
                      //   'Electronics',
                      //   'Garden',
                      //   'Kitchen',
                      //   'Home'
                      // ]}
                    /> */}
                    <label>Category</label>
                    <Select
                    options={categoryList}
                    id="categoryId"
                    onChange={(e) => onCategorySelectChange(e)}
                    />
                      <Select
                      options={subCategoryList}
                      id="subcategory"
                      onChange={(e) => onChange(e)}
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
