import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import {
  ADD_SUBCATEGORY,
  GET_SUBCATEGORIES,
  UPDATE_SUBCATEGORY,
  SUBCATEGORY_ERROR
} from "./types";

// Create a Sub-Category

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
    dispatch(getAllSubcategories());
    return <Redirect to="/admin-dashboard/all-subcategories" />;
  } catch (err) {
    /* istanbul ignore next */
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: { status: err },
    });
  }
};

// Get all Sub-Categories

export const getAllSubcategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/subcategory");
    dispatch({
      type: GET_SUBCATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: { status: err },
    });
  }
};

// Update a Sub-Category

export const updateCategory = (subcategoryId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/subcategory/${subcategoryId}`,
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: UPDATE_SUBCATEGORY,
      payload: res.data,
    });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a Sub-Category

export const deleteSubcategory = (subcategoryId) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this sub-category?")) {
    /* istanbul ignore next */
    try {
      const res = await axios.delete(`/api/subcategory/${subcategoryId}`);
      dispatch(getAllSubcategories());
      return <Redirect to="/admin-dashboard/all-subcategories" />;
    } catch (err) {
      /* istanbul ignore next */
      dispatch({
        type: SUBCATEGORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
