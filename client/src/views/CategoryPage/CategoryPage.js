// eslint-disable-next-line
import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
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

import image from 'assets/img/bg7.jpg';

const useStyles = makeStyles(styles);

export default function CategoryPage() {
  const classes = useStyles();
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
              <Card className={classes.cardAnimaton}>
                <form className={classes.form}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Create a Category</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText='Create a category'
                      id='category'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        required: true
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
