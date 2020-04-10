import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import{
    GET_CATEGORY,
    GET_CATEGORIES,
    CATEGORY_ERROR
} from './types';

export const getAllCategories = () => async dispatch => {
    try{
        const res = await axios.get('/api/category');
        dispatch({
            type: GET_CATEGORIES,
            payload : res.data
        })
    }
    catch(err){
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
    
}

export const createCategory = (formData) => async dispatch => {
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/category',formData,config)
        dispatch({
            type : GET_CATEGORY,
            payload: res.data
        });
    }
    catch(err){
        console.log('inside category catch',err)
        var error;
        const errors = err.response.data.error;
        if (errors) {
            errors.forEach(err => {
                console.log('inside category action', error);
                error = err.msg;
            });
        }
        dispatch({
            type: CATEGORY_ERROR,
            payload: error
        });
    }
}

export const getCategoryById = categoryId => async dispatch => {
    try{
        const res = await axios.get(`/api/category/${categoryId}`);
        console.log('inside category by id:', res);
        dispatch({
            type: GET_CATEGORY,
            payload : res.data
        });
    }
    catch(err){
        dispatch({
            type:CATEGORY_ERROR,
            payload:{ msg: err.response.statusText, status: err.response.status }
          })
    }

}

export const deleteCategory = (categoryId) => async dispatch => {
    if(window.confirm('Are you sure to delete this category?')){
        try{
            const res = await axios.delete(`/api/category/${categoryId}`);
            dispatch(getAllCategories());
            return (<Redirect to='/admin-dashboard/all-categories'/>)
        }
        catch(err){
            dispatch({
                type:CATEGORY_ERROR,
                payload:{ msg: err.response.statusText, status: err.response.status }
              })
        }
    }
    
};