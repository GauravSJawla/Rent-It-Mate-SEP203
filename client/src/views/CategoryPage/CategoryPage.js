// eslint-disable-next-line
import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
// @material-ui/icons
// core components
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import Category from '@material-ui/icons/Category';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import {createCategory} from '../../actions/category';

import image from 'assets/img/bg7.jpg';
import { setAlert } from '../../actions/alert';


const useStyles = makeStyles(styles);

const CategoryPage = ({createCategory,
                    category:{category, error},
                  setAlert}) => {
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);
  const [formData,setFormData] = React.useState(
    {
      name: ''
    }
  );

  const {name} = formData;
  
  //onChange event handler
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });

  //onSubmit event handler
  const onSubmit = e => {
    e.preventDefault();
    createCategory(formData);
  }

  if(category !== null){
    return <Redirect to = '/admin-dashboard/all-categories'/>
  }

  if(error === 'Category already exists! Update it!'){
    console.log('inside category error');
    setAlert('Category already exists, Update it!','danger');
  }

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
                <form className={classes.form} onSubmit = {e => onSubmit(e)}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Create a Category</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText='Create a category *'
                      id='name'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        value:name,
                        required: true,
                        onChange: e => onChange(e),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Category className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type='submit' color='primary' size='lg'>
                      Add Category
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

CategoryPage.propTypes = {
  createCategory:PropTypes.func.isRequired,
  category:PropTypes.object.isRequired,
  setAlert:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  category:state.category
})

export default connect(
  mapStateToProps,
  {createCategory,setAlert}
)(CategoryPage);