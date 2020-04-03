import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';
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

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
