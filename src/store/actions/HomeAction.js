import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api"


export const getPhoto = createAsyncThunk(
  "homepage/getPhotos",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getPhoto(payload);
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
)

export const searchPhoto = createAsyncThunk(
  "homepage/searchPhoto",
  async (payload, thunkAPI) => {

    try {
      const {data} = await api.searchPhoto(payload);
      return {data:data.results, page:payload.page};
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
)

