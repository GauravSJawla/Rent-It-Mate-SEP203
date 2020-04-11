import{
    ADD_PRODUCT,
    PRODUCT_ERROR,
    GET_PRODUCTS,
    GET_PRODUCT,
    PRODUCT_DELETED,
    UPDATE_PRODUCT,
    GET_CURRENT_PRODUCT_ID,
    GET_ALL_PRODUCTS
} from '../actions/types';

const initalState = {
    productId: null,
    products: [],
    product: null,
    loading: true,
    error: {}
};

export default function (state = initalState, action){
    const {type, payload} = action;

    switch(type) {
        case GET_CURRENT_PRODUCT_ID:
            return{
                ...state,
                productId: payload,
                loading:false
            }
        case GET_ALL_PRODUCTS:
        case GET_PRODUCTS:
            return{
                ...state,
                products: payload,
                loading: false
            };
        case GET_PRODUCT:
            return{
                ...state,
                product: payload,
                loading: false
            };    
        case UPDATE_PRODUCT:
        case ADD_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            };
        case PRODUCT_DELETED:
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload),
                loading: false
            };
        case PRODUCT_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}