import React, { useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateCategory} from '../../actions/category';
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import image from 'assets/img/bg7.jpg';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CustomInput from 'components/CustomInput/CustomInput';
import { InputAdornment } from '@material-ui/core';
import CardHeader from 'components/Card/CardHeader.js';
import Category from '@material-ui/icons/Category';
import CardFooter from 'components/Card/CardFooter';
import Button from 'components/CustomButtons/Button.js';

const useStyles = makeStyles(styles);

const UpdateCategoryPage = ({
                category:{category,categories,loading,updated},
                updateCategory,
                   match }) => {
    console.log('update category params id', match.params.id)
    const classes = useStyles();
    const [cardAnimation, setCardAnimation] = React.useState('cardHidden');
    setTimeout(function() {
        setCardAnimation('');
    }, 700);

    //const [loading, setLoading] = useState(true);
    console.log('loading in update category page', loading);
    const [formData,setFormData] = useState({
        name:''
    });
    // loading = useState(true);
    const {name} = formData;
    var categoryName;
    useEffect(() => {
        console.log('inside update category use effect')
         categories.map(category => {
            if(category._id === match.params.id){
                categoryName = category.name
            }  
        }
            
        )
        setFormData({
            name : categoryName
        })    
    },[loading,match.params.id]);

    //OnChange event Handler
    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

    // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
    updateCategory(match.params.id,formData);  
  };

  
//   if(category === null && categories !== null) {
//       return <Redirect to = '/admin-dashboard/all-categories'/>
//   }
    if(updated){
        return <Redirect to= '/admin-dashboard/all-categories'/>
    }

    return(
        <div>
            <div 
                className = {classes.pageHeader}
                style = {{
                    backgroundImage: 'url(' + image + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center'
                }}
            >
            <div className={classes.container}>
                <GridContainer justify='center'>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className = {classes[cardAnimation]}>
                            <form className = {classes.form} onSubmit = {e => onSubmit(e)}>
                                <CardHeader color='primary' className={classes.cardHeader}>
                                    <h4>Update category</h4>
                                    <div className={classes.socialLine}>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                 <CustomInput
                                    labelText = 'Category Name *'
                                    id='name'
                                    formControlProps = {{
                                        fullWidth:true
                                    }}
                                    inputProps = {{
                                        type:'text',
                                        value: name,
                                        required:true,
                                        onChange: e => onChange(e),
                                        endAdornment: (
                                            <InputAdornment position= 'end'>
                                                <Category className={classes.inputIconsColor}/>
                                            </InputAdornment>
                                        )
                                    }}
                                 />
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button simple type='submit' color='primary' size='lg'>
                                        Update category
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            </div>
        </div>
    )
    
}

UpdateCategoryPage.propTypes = {
    updateCategory:PropTypes.func.isRequired,
    category:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    category : state.category
})

export default connect(mapStateToProps, { updateCategory})(UpdateCategoryPage);