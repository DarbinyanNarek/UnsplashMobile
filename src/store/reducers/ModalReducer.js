import {createReducer} from "@reduxjs/toolkit";
import {receiveUserImages, setCurrentPhoto, setUserName} from "../actions/ModalAction";
import {receiveUserData} from "../actions/ModalAction";

const initialState = {
  currentPhoto: "",
  username: "",
  userData: null,
  userImages: [],
  status: ""
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentPhoto, (state, {payload}) => {
      state.currentPhoto = payload
    })
    .addCase(setUserName, (state, {payload}) => {
      state.username = payload
    })
    .addCase(receiveUserData.pending, (state) => {
      state.status = "pending"
    })
    .addCase(receiveUserData.fulfilled, (state, {payload}) => {
      state.status = "fulfilled"
      state.userData = payload
    })
    .addCase(receiveUserData.rejected, (state) => {
      state.status = "fail"
    })
    .addCase(receiveUserImages.pending, (state) => {
      state.status = "pending"
    })
    .addCase(receiveUserImages.fulfilled, (state, {payload}) => {
      state.status = "fulfilled"
      state.userImages = payload
    })
    .addCase(receiveUserImages.rejected, (state) => {
      state.status = "fail"
    })
})

export default reducer
