import { 
  ADD_SUBCATEGORY, 
  SUBCATEGORY_ERROR,
  GET_SUBCATEGORIES } from "../actions/types";

const initalState = {
  subcategory: null,
  subcategories:[],
  loading:false,
  error: {}
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SUBCATEGORY:
      return {
        ...state,
        subcategory: payload,
        loading: false
      };
    case SUBCATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_SUBCATEGORIES:
      return{
        ...state,
        subcategory:null,
        subcategories:payload,
        loading:false
      }
    default:
      return state;
  }
}
