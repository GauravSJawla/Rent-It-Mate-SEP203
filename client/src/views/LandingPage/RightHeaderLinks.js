import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {getAllCategories} from '../../actions/category';
import { getAllSubcategories } from '../../actions/subcategory';
import navStyles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from 'views/Dashboard/Spinner';

const useNavStyles = makeStyles(navStyles);

const RightHeaderLinks = ({getAllCategories, 
                          getAllSubcategories,
                          category:{categories,loading},
                          subcategory:{subcategories}}) => {

    const navClasses = useNavStyles();
    
    useEffect(() => {
         getAllCategories();
        getAllSubcategories();
    },[getAllCategories,getAllSubcategories]);

    //To create an array of categories
    const categoryList = [];
    categories.map(category => 
        categoryList.push({id:category._id, name:category.name}));
    const categoryListLength = categoryList.length;

    //To create an array of subcategories
    var subCategoryList = [];
    var categorizedSubCategoryList = [];
    subcategories.map(subcategory => 
      subCategoryList.push({id:subcategory._id,name:subcategory.name,
                                categoryId:subcategory.categoryId}));
    
    // To filter subcategories from subCategoryList based on category for drop down
    const createSubCategoryList = (categoryId) => {
      categorizedSubCategoryList = [];
      categorizedSubCategoryList = subCategoryList.filter(function(subcategory)
                      {return subcategory.categoryId === categoryId});
    }
    

    return(
        loading ? (<Spinner/>) : (
          <div>
          {categoryListLength > 0 ? (
            <List className={navClasses.list}>
              {categoryList.map(category => (
                  <ListItem className={navClasses.listItem}>
                  {createSubCategoryList(category.id)}
                <CustomDropdown
                  buttonText={category.name}
                  //dropdownHeader='Dropdown Header'
                  buttonProps={{
                    className: navClasses.navLink,
                    color: 'transparent',
                  }}
                  dropdownList={categorizedSubCategoryList.map(subcategory => subcategory.name)}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
                />
            </ListItem>  
              ))}
            </List> 
          ) : (<p>No categories found..</p>)}
           </div>
        )
        
    )

}

RightHeaderLinks.propTypes = {
    getAllCategories:PropTypes.func.isRequired,
    getAllSubcategories:PropTypes.func.isRequired,
    category:PropTypes.object.isRequired,
    subcategory:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    category: state.category,
    subcategory: state.subcategory
})

export default connect(mapStateToProps,
            {getAllSubcategories,
             getAllCategories}
             )(RightHeaderLinks);