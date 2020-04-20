import React, { Fragment,useEffect, useState } from "react";
import { getAllCategories } from "actions/category";
import { getAllSubcategories } from "actions/subcategory";
import Spinner from "../Dashboard/Spinner";
import styles from "assets/jss/material-kit-react/views/adminDashboard.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Edit from '@material-ui/icons/Edit'
// import Delete from '@material-ui/icons/Delete';
import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Select from "react-select";

import { createSubcategory } from "../../actions/subcategory";
import { getCategoryList } from "../../actions/category";
import { deleteSubcategory } from "../../actions/subcategory";

const useStyles = makeStyles(styles);
const SubCategoryPage = ({
  createSubcategory,
  getCategoryList,
  getAllCategories,
  getAllSubcategories,
  deleteSubcategory,
  categoryList,
  category: { categories },
  subcategory: { subcategories, loading },
  history,
  categoryIdToDisplay}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });
  const { name, categoryId } = formData;
  
  // input
  const onChange = (e) =>
    setFormData({
      ...formData,
      name: e.target.value,
    });
  // select
  const onSelectChange = (e) =>
    setFormData({
      ...formData,
      categoryId: e.value,
    });
  // OnSubmit Event Handler
  const onSubmit = (e) => {
    e.preventDefault();
    createSubcategory(formData, history);
  };

  // Create Dialog Paper useState
  const [createOpen, setCreateOpen] = React.useState(false);
  const createClickOpen = () => {
    setCreateOpen(true);
  };
  const createClose = () => {
    setCreateOpen(false);
  };
  // Update Dialog Paper useState
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const updateClickOpen = () => {
    setUpdateOpen(true);
  };
  const updateClose = () => {
    setUpdateOpen(false);
  };

  useEffect(() => {
    console.log("inside view categories useeffect");
    getCategoryList();
    getAllCategories();
    getAllSubcategories();
  }, [getCategoryList, getAllCategories, getAllSubcategories]);

  const subCategoryList = [];
  subcategories.map(subcat => 
    {
      if(subcat.categoryId === categoryIdToDisplay){
        subCategoryList.push(subcat._id)
      }
    });
  console.log('count of subcatgeories', subCategoryList.length)
  return (
    <div className={classes.landingContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.dashboardSubTitle}>
          <Fragment>
          { subCategoryList.length > 0 ? (
            <div className={classes.dashboardTitle}>
              <h3 align="center">
              <strong>Available Sub-Categories</strong>
            </h3>
            <Table
              className={classes.table}
              aria-label="simple-table"
              component={Paper}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" className={classes.td}>
                    CATEGORY NAME
                  </TableCell>
                  <TableCell align="left" className={classes.td}>
                    SUB-CATEGORY NAME
                  </TableCell>
                  <TableCell align="center" className={classes.td}>
                    UPDATE SUB-CATEGORY NAME
                  </TableCell>
                  <TableCell align="center" className={classes.td}>
                    DELETE THE SUB-CATEGORY
                  </TableCell>
                </TableRow>
              </TableHead>
              {subcategories.map((subcategory) =>
                categories.map((category) => (
                 category._id === categoryIdToDisplay ? (
                    subcategory.categoryId === category._id ?(
                      <TableBody className= {classes.tableBody} id={subcategory.name}>
                        <TableCell
                          align="left"
                          className={classes.td}
                          scope="row"
                        >
                          {category.name}
                        </TableCell>
                        <TableCell align="left" className={classes.td}>
                          {subcategory.name}
                        </TableCell>
                        <TableCell align="center" className={classes.td}>
                          <Button
                            simple
                            onClick={updateClickOpen}
                            color="primary"
                            size="lg"
                          >
                            Update
                          </Button>
                          <Dialog
                            open={updateOpen}
                            onClose={updateClose}
                            className={classes.dialogPaper}
                          >
                            <div className={classes.pageHeader}>
                              <div className={classes.container}>
                                <GridContainer justify="center">
                                  <GridItem>
                                    <Card>
                                      <form
                                        className={classes.form}
                                        onSubmit={(e) => onSubmit(e)}
                                      >
                                        <CardHeader
                                          color="primary"
                                          className={classes.cardHeader}
                                        >
                                          <h4>Update the Sub-Category</h4>
                                        </CardHeader>
                                        <CardBody>
                                          <h4>
                                            Update the Sub-Category
                                          </h4>
                                          <h4>
                                            <strong>{subcategory.name}</strong>
                                          </h4>
                                          <h4>
                                            To:
                                          </h4>
                                          <CustomInput
                                            labelText="New Sub-Category Name"
                                            id="name"
                                            formControlProps={{
                                              fullWidth: true,
                                            }}
                                            inputProps={{
                                              type: "text",
                                              value: name,
                                              required: true,
                                              onChange: (e) => onChange(e),
                                            }}
                                          />
                                        </CardBody>
                                        <CardFooter
                                          className={classes.cardFooter}
                                        >
                                          <Button
                                            simple
                                            type="submit"
                                            onClick={updateClose}
                                            color="primary"
                                            size="lg"
                                          >
                                            Add Sub-Category
                                          </Button>
                                          <Button
                                            simple
                                            onClick={updateClose}
                                            color="primary"
                                            size="lg"
                                          >
                                            Cancel
                                          </Button>
                                        </CardFooter>
                                      </form>
                                    </Card>
                                  </GridItem>
                                </GridContainer>
                              </div>
                            </div>
                          </Dialog>
                        </TableCell>
                        <TableCell align="center" className={classes.td}>
                          <Button
                            simple
                            onClick={() => deleteSubcategory(subcategory._id)}
                            color="primary"
                            size="lg"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableBody>
                    ) : (
                      <></>
                    )
                  ) : (<></>)
                    
                )
                  )
                 
                
                  
                )}
            
            </Table>
            </div>
          ) : (
            <h4><strong>No subcategories found.. Please add</strong></h4>
          )}
          </Fragment>
        </div>
      )}
      <Button simple onClick={createClickOpen} color="primary" size="lg">
        Create a new Sub-Category
      </Button>
      <Dialog
        open={createOpen}
        onClose={createClose}
        className={classes.dialogPaper}
      >
        <div className={classes.pageHeader}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem>
                <Card>
                  <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Create a Sub-Category</h4>
                    </CardHeader>
                    <CardBody>
                      <Select
                        options={categoryList}
                        id="categoryId"
                        onChange={(e) => onSelectChange(e)}
                      />
                      <CustomInput
                        labelText="Create a Sub-Category"
                        id="name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          value: name,
                          required: true,
                          onChange: (e) => onChange(e),
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        type="submit"
                        onClick={createClose}
                        color="primary"
                        size="lg"
                      >
                        Add Sub-Category
                      </Button>
                      <Button
                        simple
                        onClick={createClose}
                        color="primary"
                        size="lg"
                      >
                        Cancel
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

SubCategoryPage.propTypes = {
  createSubcategory: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllSubcategories: PropTypes.func.isRequired,
  deleteSubcategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  subcategory: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.auth.error,
  categoryList: state.categorylist.categoryList,
  category: state.category,
  subcategory: state.subcategory,
});

export default connect(
  mapStateToProps,
  {
    createSubcategory,
    getCategoryList,
    getAllCategories,
    getAllSubcategories,
    deleteSubcategory,
  }
)(SubCategoryPage);
