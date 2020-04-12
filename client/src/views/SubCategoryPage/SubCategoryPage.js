import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// dropdown selects
import Select from "react-select";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

import { createSubcategory } from "../../actions/subcategory";
import { getCategoryList } from "../../actions/category";

const useStyles = makeStyles(styles);

function SubcategoryPage({ createSubcategory, getCategoryList, categoryList, history }) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: ""
  });
  const classes = useStyles();
  const { name, categoryId } = formData;

  // input
  const onChange = e =>
    setFormData({
      ...formData,
      name: e.target.value
    });
  // select
  const onSelectChange = e =>
    setFormData({
      ...formData,
      categoryId: e.value
    });
  // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    createSubcategory(formData, history);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Create a Sub-Category</h4>
                  </CardHeader>
                  <CardBody>
                    <Select options={categoryList} id="categoryId" onChange={e => onSelectChange(e)} />
                    <CustomInput
                      labelText="Create a sub-category"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: name,
                        required: true,
                        onChange: e => onChange(e)
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type="submit" color="primary" size="lg">
                      Add Sub-Category
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

SubcategoryPage.propTypes = {
  createSubcategory: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    categoryList: state.categorylist.categoryList,
    auth: state.auth,
    error: state.auth.error,
  };
};

export default connect(
  mapStateToProps,
  { createSubcategory, getCategoryList }
)(withRouter(SubcategoryPage));
