import axios from 'axios';
import {REGISTER_FAIL,REGISTER_SUCCESS} from './types';

//Register User method on a successful submit

export const register = ({name,username,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({name,username,email,password});
    try{
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }
    catch(err){
        const error = err.response.data.errors;
        if(error){
            error.forEach(err => console.log(err));
        }
        dispatch({
            type: REGISTER_FAIL

        })
    }
}