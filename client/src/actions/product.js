import axios from 'axios';
import{
    ADD_PRODUCT,
    PRODUCT_ERROR,
    GET_PRODUCTS
} from './types';

export const createProduct = (formData, history, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        const res = await axios.post('/api/product/create', formData , config);
            dispatch(
                {
                    type:ADD_PRODUCT,
                    payload: res.data
                }
            );
        if(!edit){
            history.push('/dashboard');
        }
    
        
    }
    catch(err){
        dispatch({
            type: PRODUCT_ERROR,
            payload:{status : err}
        })
    }
};

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
        payload: { msg: err.response.statusText, status: err.response.status}
      });
    }
  };

