import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_ERROR,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  GET_USERS,
  CLEAR_PROFILES,
  CLEAR_USERS,
  CLEAR_CATEGORY,
  CLEAR_PRODUCTS,CLEAR_CATEGORYLIST,CLEAR_SUBCATEGORY
  //PROFILE_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';
//import { getProfiles } from './profile';
import { convertTypeAcquisitionFromJson } from 'typescript';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => console.log(err));
    }
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User method on a successful submit
export const register = ({
  name,
  username,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, username, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    /* istanbul ignore next */
    var error;
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach(err => {
        error = err.msg;
      });
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: error
    });
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    /* istanbul ignore next */
    var error;
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => {
        error = err.msg;
      });
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: error
    });
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try{
    const res = await axios.get('/api/users');
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  }
  catch(err){
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  

}

// export const adminDeleteUser = userId => async dispatch => {
//   console.log('inside adminDeleteUser', userId)
//   if (window.confirm('Are you sure to delete the account of this user?')){
//     try{
//       const res = await axios.delete(`/api/users/admin/${userId}`);
//       dispatch(getAllUsers());
//       dispatch(getProfiles());
//     }
//     catch(err){
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { status: err }
//       })
//     }
//   }
  
// };

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type : CLEAR_PROFILE});
  dispatch({type: CLEAR_PROFILES});
  dispatch({type:CLEAR_USERS});
  dispatch({type:CLEAR_CATEGORY});
  dispatch({type:CLEAR_PRODUCTS});
  dispatch({type:CLEAR_SUBCATEGORY});
  dispatch({type:CLEAR_CATEGORYLIST});
  dispatch({ type: LOGOUT });
};
