import React, { useEffect } from 'react';
import {getAllCategories} from 'actions/category';
import Spinner from '../Dashboard/Spinner'
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete';
import { TableHead, Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { deleteCategory } from '../../actions/category';

const useStyles = makeStyles(styles);
const ViewCategories = ({getAllCategories, deleteCategory,
                 category:{categories, loading},
                    }) => {

    const classes = useStyles();
    useEffect(() => {
        console.log('insid view categories useeffect')
        getAllCategories();
    },[getAllCategories]);

    return(
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center">Available Categories</h3>
          </div>
          {loading ? (<Spinner/>) : (
               <div className= {classes.dashboardSubTitle}>
              {categories.length > 0 ? (
                  <Table className={classes.table} aria-label='simple-table' component={Paper}>
                    <TableHead>
                        <TableRow>
                             <TableCell align="left" className={classes.td}>CATEGORY NAME</TableCell>
                             <TableCell align="left" className={classes.td}>DELETE CATEGORY</TableCell>
                             <TableCell align="left" className={classes.td}>UPDATE CATEGORY</TableCell>
                        </TableRow>
                    </TableHead>
                      {categories.map(category => (
                          <TableBody>
                          <TableCell align="left" className={classes.td} component="th" scope="row">
                              {category.name}
                          </TableCell>
                          <TableCell align="left" className={classes.td}>
                              <Button
                                    simple
                                    type='submit'
                                    color='primary'
                                    size='lg'
                                    onClick={() => deleteCategory(category._id)}
                                >
                                <Delete/>
                                </Button>
                          </TableCell>
                          <TableCell align="left" className={classes.td}>
                                <Button
                                        simple
                                        component={Link}
                                        to={`/update-category/${category._id}`}
                                        color='primary'
                                        size='lg'
                                    >
                                    <Edit/>
                                </Button>
                          </TableCell>
                          </TableBody>
                      ))}
          </Table>) : (<p>No categories found....</p>)}
          </div>
          )}
          <Button
                simple
                component={Link}
                to='/add-category'
                color='primary'
                size='lg'
              >
                Create Category
              </Button>
        </div>
    )
}

ViewCategories.propTypes = {
    getAllCategories:PropTypes.func.isRequired,
    deleteCategory:PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}
    

const mapStateToProps = state => ({
    category:state.category
})

export default connect(mapStateToProps,
    { getAllCategories, deleteCategory})
    (ViewCategories);