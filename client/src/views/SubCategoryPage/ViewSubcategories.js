import React, { useEffect } from 'react';
import {getAllCategories} from 'actions/category';
import {getAllSubcategories} from 'actions/subcategory';
import Spinner from '../Dashboard/Spinner'
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Edit from '@material-ui/icons/Edit'
// import Delete from '@material-ui/icons/Delete';
import { TableHead, Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(styles);
const ViewSubcategories = ({getAllCategories, getAllSubcategories,
                 category:{categories},
                 subcategory:{subcategories,loading}
                    }) => {

    const classes = useStyles();
    useEffect(() => {
        console.log('insid view categories useeffect')
        getAllCategories();
        getAllSubcategories();
    },[getAllCategories,getAllSubcategories]);

    return(
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center"><strong>Available Sub-Categories</strong></h3>
          </div>
          {loading ? (<Spinner/>) : (
               <div className= {classes.dashboardSubTitle}>
              {subcategories.length > 0 ? (
                  <Table className={classes.table} aria-label='simple-table' component={Paper}>
                    <TableHead>
                        <TableRow>
                             <TableCell align="left" className={classes.td}>CATEGORY NAME</TableCell>
                             <TableCell align="left" className={classes.td}>SUB-CATEGORY NAME</TableCell>
                        </TableRow>
                    </TableHead>
                    {subcategories.map(subcategory => (
                        categories.map(category => (
                            subcategory.categoryId === category._id ? (
                                <TableBody id={subcategory.name}>
                                    <TableCell align="left" className = {classes.td} scope="row">
                                        {category.name}
                                    </TableCell>
                                    <TableCell align="left" className={classes.td}>
                                        {subcategory.name}
                                    </TableCell>
                                </TableBody>
                            ) : (<p></p>)
                        ))
                    ))}
          </Table>) : (<p>No sub categories found....</p>)}
          </div>
          )}
          <Button
                simple
                component={Link}
                to='/add-sub-category'
                color='primary'
                size='lg'
              >
                Create Sub Category
              </Button>
        </div>
    )
}

ViewSubcategories.propTypes = {
    getAllCategories:PropTypes.func.isRequired,
    getAllSubcategories:PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    subcategory:PropTypes.object.isRequired
}
    

const mapStateToProps = state => ({
    category:state.category,
    subcategory:state.subcategory
})

export default connect(mapStateToProps,
    { getAllCategories, getAllSubcategories})
    (ViewSubcategories);