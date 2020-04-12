import axios from "axios";
import { ADD_SUBCATEGORY, 
      GET_SUBCATEGORY, 
      SUBCATEGORY_DELETED, 
      SUBCATEGORY_ERROR,
      GET_SUBCATEGORIES
    } from "./types";

//Create a Sub-Category

export const createSubcategory = ({ name, categoryId }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, categoryId });
  try {
    const res = await axios.post("/api/subcategory", body, config);
    dispatch({
      type: ADD_SUBCATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: { status: err },
    });
  }
};

//Get all Sub-Categories

export const getAllSubcategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/subcategory");
    dispatch({
      type: GET_SUBCATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: { status: err },
    });
  }
};

// Delete a Sub-Category

export const deleteSubcategory = () => async (dispatch) => {
  if (window.confirm("Are you sure to delete this sub-category?")) {
    try {
      const res = await axios.delete("/api/subcategory");
      dispatch({
        type: SUBCATEGORY_DELETED,
      });
    } catch (err) {
      dispatch({
        type: SUBCATEGORY_ERROR,
        payload: { status: err },
      });
    }
  }
};
