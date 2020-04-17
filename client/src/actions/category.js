import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import{
    GET_CATEGORY,
    GET_CATEGORIES,
    CATEGORY_ERROR,
    UPDATE_CATEGORY,
    GET_CATEGORYLIST,
    CATEGORYLIST_ERROR
} from './types';
import { setAlert } from './alert';

export const getAllCategories = () => async dispatch => {
    try{
        const res = await axios.get('/api/category');
        dispatch({
            type: GET_CATEGORIES,
            payload : res.data
        })
    }
    catch(err){
        /* istanbul ignore next */
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
        var error;
        const errors = err.response.data.error;
        if (errors) {
            errors.forEach(err => {
                error = err.msg;
            });
        }
        dispatch({
            type: CATEGORY_ERROR,
            payload: error
        });
    }
}

// export const getCategoryById = categoryId => async dispatch => {
//     try{
//         const res = await axios.get(`/api/category/${categoryId}`);
//         console.log('inside category by id:', res);
//         dispatch({
//             type: GET_CATEGORY,
//             payload : res.data
//         });
//         // dispatch({
//         //     type:CLEAR_CATEGORY
//         // })
//     }
//     catch(err){
//         dispatch({
//             type:CATEGORY_ERROR,
//             payload:{ msg: err.response.statusText, status: err.response.status }
//           })
//     }

// }

export const updateCategory = (categoryId,formData) => async dispatch => {
    try{
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        const res = await axios.post(`/api/category/${categoryId}`,formData,config);
        console.log(res);
        dispatch({
            type:UPDATE_CATEGORY,
            payload: res.data
        })
    }
    catch(err){
        /* istanbul ignore next */
        dispatch({
            type:CATEGORY_ERROR,
            payload:{ msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getCategoryList = () => async (dispatch) => {
    try {
      const res = await axios.get("/api/category");
      dispatch({
        type: GET_CATEGORYLIST,
        payload: res.data,
      });
    } catch (err) {
        /* istanbul ignore next */
      dispatch({
        type: CATEGORYLIST_ERROR,
        payload: { status: err },
      });
    }
  };

export const deleteCategory = (categoryId) => async dispatch => {
    if(window.confirm('Are you sure to delete this category?')){
        /* istanbul ignore next */
        try{
            const res = await axios.delete(`/api/category/${categoryId}`);
            if(res.data.msg === 'Category cannot be deleted!'){
                dispatch(setAlert('Category has one or more sub categories available and hence cannot be deleted!', 'danger'));
            }
            if(res.data.msg === 'Category deleted'){
                dispatch(getAllCategories());
                return (<Redirect to='/admin-dashboard/all-categories'/>)
            }
        }
        catch(err){
            /* istanbul ignore next */
            dispatch({
                type:CATEGORY_ERROR,
                payload:{ msg: err.response.statusText, status: err.response.status }
              })
        }
    }
    
};