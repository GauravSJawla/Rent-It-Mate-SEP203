import {
    GET_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    CLEAR_PROFILE,
    PROFILE_ERROR
} from '../actions/types';

const initalState = {
    profile : null,
    profiles: [],
    loading: true,
    error :{}
}

export default function (state = initalState, action){
    const {type,payload} = action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading:false
            }
        default:
            return state;
    }
}