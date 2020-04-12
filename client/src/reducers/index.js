import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import alert from './alert';
import product from './product';
import category from './category';
import categorylist from './categorylist';
import subcategory from './subcategory';

export default combineReducers({
  auth,
  profile,
  alert,
  product,
  category,
  categorylist,
  subcategory
});
