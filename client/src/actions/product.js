import axios from 'axios';
import {
  ADD_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  PRODUCT_DELETED,
  UPDATE_PRODUCT,
  GET_PRODUCT,
  GET_ALL_PRODUCTS
} from './types';
/**
 *
 * @param {*} formData
 * @param {*} history
 * @param {*} edit
 * @description This method is used for creating a product. It accepts form data and calls the backend API
 *              for it. We need all variables and details for creating a product.
 *
 */
export const createProduct = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    console.log('formdata', formData);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/product/create', formData, config);
    const profileRes = await axios.post('/api/profile/update-profile',formData );
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });
    if (!edit) {
      history.push('/dashboard/user');
    }
  } catch (err) {
    console.log('error in product', err);
    var error;
        const errors = err.response.data.error;
        if (errors) {
            errors.forEach(err => {
                error = err.msg;
            });
        }
      console.log('error message', error)
    dispatch({
      type: PRODUCT_ERROR,
      payload: error
    });
  }
};
/**
 * @description This function is used to get a single product from the backend by using its
 *              product id.
 * @param {*} id
 */
export const getSingleProduct = id => async dispatch => {
  try {
    const res = await axios.get('/api/product/' + id);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 * @description This function is used to get all products from the backend.
 *
 */
export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/product/products');
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/**
 * @description : This method brings user related products from the backend and stores them in
 *                products in action and then in the state.
 */
export const getUserProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/product/getMyProducts');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} productId
 * @description : This method is used to delete a product using its product id.
 */
export const deleteProduct = productId => async dispatch => {
  try {
    await axios.delete('/api/product/' + productId);
    dispatch({
      type: PRODUCT_DELETED,
      payload: productId
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/**
 *
 * @param {*} formData
 * @param {*} history
 * @param {*} edit
 * @description This method is used for updating a created product.
 *              It accepts form data and calls the backend API
 *              for it. We need all variables and details for creating a product.
 *
 */
/* istanbul ignore next */
export const updateProduct = (
  formData,
  history,
  id,
  edit = false
) => async dispatch => {
  console.log(id + ' inside update id ');
  try {
    /* istanbul ignore next */
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/product/' + id, formData, config);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data
    });
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    /* istanbul ignore next */
    dispatch({
      type: PRODUCT_ERROR,
      payload: { status: err }
    });
  }
};
