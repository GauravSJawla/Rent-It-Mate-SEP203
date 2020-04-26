import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import material-ui cores
import { makeStyles } from '@material-ui/core/styles';
import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';

// import packages
import Select from 'react-select';

// import Spinner
import Spinner from '../Dashboard/Spinner';

// import custom components
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

// import actions
import {
  createSubcategory,
  updateSubcategory,
  getAllSubcategories,
  deleteSubcategory,
} from 'actions/subcategory';
import { getCategoryList, getAllCategories } from 'actions/category';

// import layout style
import styles from 'assets/jss/material-kit-react/views/adminDashboard.js';

const useStyles = makeStyles(styles);
const SubCategoryPage = ({
  createSubcategory,
  updateSubcategory,
  getCategoryList,
  getAllCategories,
  getAllSubcategories,
  deleteSubcategory,
  categoryList,
  category: { categories },
  subcategory: { subcategories, loading },
  history,
  categoryIdToDisplay,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
  });
  const { name } = formData;

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
  // Declare Old Sub-Category Data
  const [oldFormData, setOldFormData] = useState({
    name: '',
    id: '',
  });
  // Update Dialog Paper Open
  const updateClickOpen = (e) => {
    if (e.target.parentNode.getAttribute('value')) {
      setOldFormData({
        name: e.target.parentNode.getAttribute('value'),
        id: e.target.parentNode.getAttribute('id'),
      });
      setUpdateOpen(true);
    }
  };

  // Update Dialog Paper Close
  const updateClose = () => {
    setUpdateOpen(false);
  };

  useEffect(() => {
    console.log('inside view categories useeffect');
    getCategoryList();
    getAllCategories();
    getAllSubcategories();
  }, [getCategoryList, getAllCategories, getAllSubcategories]);

  // Declare Update Form Data
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
  });

  // Update Input Textbox onChange
  const onUpdateChange = (e) =>
    setUpdateFormData({
      ...updateFormData,
      [e.target.id]: e.target.value,
    });

  // Update Form Submit
  const onUpdateSubmit = (e) => {
    e.preventDefault();
    updateSubcategory(oldFormData.id, updateFormData);
  };

  const subCategoryList = [];
  // eslint-disable-next-line
  subcategories.map((subcat) => {
    if (subcat.categoryId === categoryIdToDisplay) {
      subCategoryList.push(subcat._id);
    }
  });
  console.log('count of subcatgeories', subCategoryList.length);
  return (
    <div className={classes.landingContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.dashboardSubTitle}>
          <Fragment>
            {subCategoryList.length > 0 ? (
              <div className={classes.dashboardTitle}>
                <h3 align='center'>
                  <strong>Available Sub-Categories</strong>
                </h3>
                <Table
                  className={classes.table}
                  aria-label='simple-table'
                  component={Paper}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align='left' className={classes.td}>
                        CATEGORY NAME
                      </TableCell>
                      <TableCell align='left' className={classes.td}>
                        SUB-CATEGORY NAME
                      </TableCell>
                      <TableCell align='center' className={classes.td}>
                        UPDATE SUB-CATEGORY NAME
                      </TableCell>
                      <TableCell align='center' className={classes.td}>
                        DELETE THE SUB-CATEGORY
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subcategories.map((subcategory) =>
                      categories.map((category) =>
                        category._id === categoryIdToDisplay ? (
                          subcategory.categoryId === category._id ? (
                            <TableRow
                              className={classes.tableBody}
                              id={subcategory.name}
                            >
                              <TableCell
                                align='left'
                                className={classes.td}
                                scope='row'
                              >
                                {category.name}
                              </TableCell>
                              <TableCell align='left' className={classes.td}>
                                {subcategory.name}
                              </TableCell>
                              <TableCell align='center' className={classes.td}>
                                <Button
                                  simple
                                  id={subcategory._id}
                                  value={subcategory.name}
                                  onClick={(e) => updateClickOpen(e)}
                                  color='primary'
                                  size='lg'
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
                                      <GridContainer justify='center'>
                                        <GridItem>
                                          <Card>
                                            <form
                                              className={classes.form}
                                              onSubmit={(e) =>
                                                onUpdateSubmit(e)
                                              }
                                            >
                                              <CardHeader
                                                color='primary'
                                                className={classes.cardHeader}
                                              >
                                                <h4>
                                                  Update Sub-Category Name
                                                </h4>
                                              </CardHeader>
                                              <CardBody>
                                                <h4>Update the Sub-Category</h4>
                                                <h4>
                                                  <strong>
                                                    {oldFormData.name}{' '}
                                                    {oldFormData.id}
                                                  </strong>
                                                </h4>
                                                <h4>To:</h4>
                                                <CustomInput
                                                  labelText='New Sub-Category Name'
                                                  id='name'
                                                  formControlProps={{
                                                    fullWidth: true,
                                                  }}
                                                  inputProps={{
                                                    type: 'text',
                                                    required: true,
                                                    onChange: (e) =>
                                                      onUpdateChange(e),
                                                  }}
                                                />
                                              </CardBody>
                                              <CardFooter
                                                className={classes.cardFooter}
                                              >
                                                <Button
                                                  simple
                                                  type='submit'
                                                  onClick={updateClose}
                                                  color='primary'
                                                  size='lg'
                                                >
                                                  Update Sub-Category
                                                </Button>
                                                <Button
                                                  simple
                                                  onClick={updateClose}
                                                  color='primary'
                                                  size='lg'
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
                              <TableCell align='center' className={classes.td}>
                                <Button
                                  simple
                                  onClick={() =>
                                    deleteSubcategory(subcategory._id)
                                  }
                                  color='primary'
                                  size='lg'
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ) : (
                            <></>
                          )
                        ) : (
                          <></>
                        )
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <h4>
                <strong>No subcategories found.. Please add</strong>
              </h4>
            )}
          </Fragment>
        </div>
      )}
      <Button simple onClick={createClickOpen} color='primary' size='lg'>
        Create a new Sub-Category
      </Button>
      <Dialog
        open={createOpen}
        onClose={createClose}
        className={classes.dialogPaper}
      >
        <div className={classes.pageHeader}>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem>
                <Card>
                  <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                    <CardHeader color='primary' className={classes.cardHeader}>
                      <h4>Create a Sub-Category</h4>
                    </CardHeader>
                    <CardBody>
                      <Select
                        options={categoryList}
                        id='categoryId'
                        onChange={(e) => onSelectChange(e)}
                      />
                      <CustomInput
                        labelText='Create a Sub-Category'
                        id='name'
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'text',
                          value: name,
                          required: true,
                          onChange: (e) => onChange(e),
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        type='submit'
                        onClick={createClose}
                        color='primary'
                        size='lg'
                      >
                        Add Sub-Category
                      </Button>
                      <Button
                        simple
                        onClick={createClose}
                        color='primary'
                        size='lg'
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
  updateSubcategory: PropTypes.func.isRequired,
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
    updateSubcategory,
    getCategoryList,
    getAllCategories,
    getAllSubcategories,
    deleteSubcategory,
  }
)(SubCategoryPage);
