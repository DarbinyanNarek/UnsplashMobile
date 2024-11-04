import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api"




export const setCurrentPhoto = createAction(
  "modal/setCurrentPhoto",(payload) => ({
    payload: payload
  })
)

export const setUserName = createAction(
  "modal/setUserName", (payload) => ({
    payload: payload
  })
)

export const receiveUserData = createAsyncThunk(
  "HomeSheetAction/fetchUserData",
  async (payload)=>{
    try{
      const {data} = await api.getUserData(payload);
      return data;
    }
    catch(error){
      console.error("Data is Invalid",error)
    }
  }
)


export const receiveUserImages = createAsyncThunk(
  "HomeSheetAction/fetchUserImages",
  async (payload)=>{
    try{
      const {data} = await  api.getUserPhotos(payload);
      return data;
    }
    catch(error){
      console.error("Data is Invalid",error)
    }
  }
)

