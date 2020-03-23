import axios from 'axios';
import{
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

export const createProfile = (formData, history, edit = false) => async dispatch => {
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
        if(!edit){
            history.push('/dashboard');
        }
    
        
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

//Get current profile

export const getUserProfile = () => async dispatch => {
    try{
        console.log('inside get user prfile');
        const res = await axios.get('/api/profile/me');
        console.log('user profile ',res)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }
    catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {status : err}
        });
    }
};

// Delete Account

export const deleteProfile = () => async dispatch => {
    console.log('inside delete profile action')
    if(window.confirm('Are you sure to delete your account?')){
        try{
            const res =  await axios.delete('/api/profile');
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });
          //  dispatch(setAlert('Your account is been removed','success'));
        }
        catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {status : err}
            });
        }

    }
    
}