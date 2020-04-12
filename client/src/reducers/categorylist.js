import { GET_CATEGORYLIST, CATEGORYLIST_ERROR } from "../actions/types";

const initalState = {
  categoryList: [],
  error: {},
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORYLIST:
        const arr = [];
        payload.forEach(item => {
            arr.push({ value: item._id, label: item.name })
        });
      return {
        ...state,
        categoryList: arr,
        loading: false,
      };
    case CATEGORYLIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
