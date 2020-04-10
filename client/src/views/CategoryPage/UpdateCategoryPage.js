import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCategoryById} from '../../actions/category';
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

const useStyles = makeStyles(styles);

const UpdateCategoryPage = ({getCategoryById,
                category:{category,error,loading},
                   match }) => {
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
    setTimeout(function() {
        setCardAnimation('');
    }, 700);

    const [formData,setFormData] = useState({
        name:''
    });

    useEffect(() => {
        console.log('inside edit category useeffect')
        getCategoryById(match.params.id);
        console.log('category retrieves',category)
        setFormData({
                name: loading || !category.name ? '' : category.name
        });    
    },[loading,getCategoryById,category,match.params.id]);

    const {name} = formData;

    //OnChange event Handler
    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

    // OnSubmit Event Handler
  const onSubmit = e => {
    e.preventDefault();
   // createProfile(formData,history,true);
    
  };


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
                        <Card className = {classes[cardAnimaton]}>
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
    getCategoryById:PropTypes.func.isRequired,
    category:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    category : state.category
})

export default connect(mapStateToProps, {getCategoryById})(UpdateCategoryPage);