import{
    ADD_PRODUCT,
    PRODUCT_ERROR
} from './types';

const initalState = {
    product : null,
    error :{}
}

export default function (state = initalState, action){
    const {type,payload} = action;

    switch(type){
        case ADD_PRODUCT:
            return {
                ...state,
                profile: payload,
                loading: false
            };
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