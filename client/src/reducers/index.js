import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import alert from './alert';
import product from './product';

export default combineReducers({
  auth,
  profile,
  alert,
  product
});
