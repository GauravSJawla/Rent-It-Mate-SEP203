import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,} from '../actions/types';

const initialState = {
    isAuthenticated : false,
    loading : true,
    user : null
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return{
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
            return{
                ...state,
                isAuthenticated:false,
                loading:false
            };
        default:
            return state;
    }

}