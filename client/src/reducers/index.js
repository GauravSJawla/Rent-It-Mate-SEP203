import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import alert from './alert';
import product from './product';
import category from './category';

export default combineReducers({
  auth,
  profile,
  alert,
  product,
  category
});
