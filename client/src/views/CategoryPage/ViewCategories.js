import React, { useEffect } from 'react';
import {getAllCategories} from 'actions/category';
import Spinner from '../Dashboard/Spinner'
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles(styles);
const ViewCategories = ({getAllCategories, category:{categories, loading}}) => {
    const classes = useStyles();
    useEffect(() => {
        getAllCategories();
    },[getAllCategories]);
    return(
        <div className={classes.landingContainer}>
          <div className={classes.dashboardTitle}>
            <h3 align="center">Available Categories</h3>
          </div>
          {loading? (<Spinner />) : (
              <div className= {classes.dashboardSubTitle}>
                  {categories.length > 0 ? (
                      <table className={classes.table}>
                          <tr className={classes.tr}>
                          {categories.map(category => (
                              <tbody>
                                  <td className={classes.td}>{category.name}</td>
                                  <td className={classes.td}>
                                    <Button
                                        simple
                                        component={Link}
                                        to={`/delete-category/${category._id}`}
                                        color='primary'
                                        size='lg'
                                    >
                                    Delete Category
                                    </Button>
                                    <Button
                                        simple
                                        component={Link}
                                        to={`/update-category/${category._id}`}
                                        color='primary'
                                        size='lg'
                                    >
                                    Update Category
                                    </Button>
                                  </td>
                              </tbody>
                          ))}
                          </tr>
                      </table>
                  ) : <p>No categories found.... Please add some</p>}
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
    category: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    category:state.category
})

export default connect(mapStateToProps,{getAllCategories})(ViewCategories);