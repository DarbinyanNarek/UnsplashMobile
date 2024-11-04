import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api"


export const receiveCollectionPhoto = createAsyncThunk(
  "PhotoAction/fetchCollectionPhoto",
  async (payload) => {
    try {
      const {data} = await api.getCollectionPhoto(payload);
      return {data, page: payload.page};

    } catch (error) {
      console.error("Data is Invalid", error)
    }
  }
)

export const receiveCollectionData = createAsyncThunk(
  "PhotoAction/fetchUserCollectionData",
  async (payload) => {
    try {
      const {data} = await api.getUserCollectionData(payload);
      return data;

    } catch (error) {
      console.log("Error fetching user collections:", error);
    }
  }
);


export const SearchedImages = createAsyncThunk(
  "PhotoAction/SearchedImages",
  async (payload, thunkAPI) => {

    try {
      const {data} = await api.searchPhoto(payload);
      return {data:data.results, page:payload.page};
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
)

