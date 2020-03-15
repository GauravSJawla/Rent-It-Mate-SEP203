import axios from 'axios';
import{
    UPDATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from './types';

export const createProfile = (formData, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);
            dispatch(
                {
                    type:GET_PROFILE,
                    payload: res.data
                }
            );
    
        
    }
    catch(err){
        // const errors = err.response.data.errors;
        // if(errors){
        //     errors.forEach(error => (console.log(error)));
        // }
        dispatch({
            type: PROFILE_ERROR,
            payload:{status : err}
        })
    }
};