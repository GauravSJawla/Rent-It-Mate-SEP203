import {
  ADD_SUBCATEGORY,
  SUBCATEGORY_ERROR,
  GET_SUBCATEGORIES,
  UPDATE_SUBCATEGORY,
  CLEAR_SUBCATEGORY,
} from "../actions/types";

const initalState = {
  subcategory: null,
  subcategories: [],
  loading: true,
  updated: false,
  error: {},
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SUBCATEGORY:
      return {
        ...state,
        subcategory: payload,
        loading: false,
        updated: false,
        error: {},
      };
    case UPDATE_SUBCATEGORY:
      return {
        ...state,
        updated: true,
        error: {},
      };
    case SUBCATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        updated: false,
      };
    case GET_SUBCATEGORIES:
      return {
        ...state,
        subcategory: null,
        subcategories: payload,
        loading: false,
        updated: false,
      };
    case CLEAR_SUBCATEGORY:
      return {
        ...state,
        subcategory: null,
        subcategories: [],
        loading: false,
        updated: false,
        error: {},
      };
    default:
      return state;
  }
}
