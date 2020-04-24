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
    
    //let categories =[];
    //const [loading,setLoading] = React.useState(false);
    //const [categories,setCategories] = React.useState([]);
    const [error,setError] = React.useState('');
    console.log('categories before useeffect', categories)
    useEffect(() => {
        console.log('inisde use effect')
         getAllCategories();
        console.log('categories after use effect', categories);
        getAllSubcategories();
        // setLoading({
        //     loading : true
        // })
    },[getAllCategories,getAllSubcategories]);

    console.log('categories in header links ', categories);

    const categoryList = [];
    categories.map(category => 
        categoryList.push({id:category._id, name:category.name}));
    const categoryListLength = categoryList.length;
    const subCategoryList = [];
    subcategories.map(subcategory => 
      subCategoryList.push({id:subcategory._id,name:subcategory.name}));
    console.log('subcategoryList:', subCategoryList);
    return(
        loading ? (<Spinner/>) : (
          <div>
          {categoryListLength > 0 ? (
            <List className={navClasses.list}>
              {categoryList.map(category => (
                <ListItem className={navClasses.listItem}>
                <CustomDropdown
                  buttonText={category.name}
                  //dropdownHeader='Dropdown Header'
                  buttonProps={{
                    className: navClasses.navLink,
                    color: 'transparent',
                  }}
                  dropdownList={['Subcategory1', 'Subcategory2']}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
                />
            </ListItem>
              ))}
              
            {/* <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText={categoryList[1].name}
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory2', 'Subcategory2']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText={categoryList[2].name}
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory3', 'Subcategory3']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText={categoryList[3].name}
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory4', 'Subcategory4']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText={categoryList[4].name}
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory5', 'Subcategory5']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category6'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory6', 'Subcategory6']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category7'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory7', 'Subcategory7']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem>
            <ListItem className={navClasses.listItem}>
              <CustomDropdown
                buttonText='Category8'
                dropdownHeader='Dropdown Header'
                buttonProps={{
                  className: navClasses.navLink,
                  color: 'transparent',
                }}
                dropdownList={['Subcategory8', 'Subcategory8']}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              />
            </ListItem> */}
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