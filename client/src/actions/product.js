import axios from 'axios';
import{
    ADD_PRODUCT,
    PRODUCT_ERROR
} from './types';

export const createProduct = (formData, history, edit = false) => async dispatch => {
    try{
        const res = await axios.post('/api/product/create', formData);
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

