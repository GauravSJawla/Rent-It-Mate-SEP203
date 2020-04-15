import {
    GET_CATEGORY,
    GET_CATEGORIES,
    CATEGORY_ERROR,
    UPDATE_CATEGORY,
    CLEAR_CATEGORY
} from '../actions/types';

const initialstate = {
    category : null,
    categories : [],
    loading : true,
    updated: false,
    error: {}
}

export default function (state = initialstate,action) {
    const {type,payload} = action;
    switch(type){
        case GET_CATEGORY:
            return{
                ...state,
                category: payload,
                loading : false,
                updated:false,
                error:{}
            }
        case UPDATE_CATEGORY:
            return{
                ...state,
                updated:true,
                error:{}
            }
        case GET_CATEGORIES:
            return{
                ...state,
                category:null,
                categories: payload,
                updated:false,
                loading: false
            };
        case CATEGORY_ERROR:
            return{
                ...state,
                updated:false,
                loading:false,
                error: payload
            };
        case CLEAR_CATEGORY:
            return{
                ...state,
                category:null,
                categories:[],
                loading:false,
                updated:false,
                error:{}
            }
        default:
            return state;
    }

}