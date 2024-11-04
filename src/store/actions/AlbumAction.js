import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api"



export const receiveCollection = createAsyncThunk(
  "homepage/fetchCollection",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getCollection(payload);
      return data

    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
)
