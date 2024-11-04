import {createReducer} from "@reduxjs/toolkit";
import {getPhoto, searchPhoto} from "../actions/HomeAction";
import _ from "lodash"


const initialState = {
  photos: [],
  status: "",
  searchArray: [],
  allPhotos: []
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPhoto.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getPhoto.fulfilled, (state, {payload}) => {
      state.status = "fulfilled"
      state.photos =_.uniqBy([...state.photos, ...payload], 'id')
    })
    .addCase(getPhoto.rejected, (state) => {
      state.status = "fail"
    })
    .addCase(searchPhoto.pending, (state) => {
      state.status = "pending"
    })
    .addCase(searchPhoto.fulfilled, (state, {payload}) => {

      state.status = "fulfilled"
      if (payload.page === 1){
        state.searchArray = _.uniqBy([...payload.data],"id")

      }else{
        state.searchArray = _.uniqBy([...state.searchArray,...payload.data], "id")

      }

    })
    .addCase(searchPhoto.rejected, (state) => {
      state.status = "fail"
    })
})


export default reducer
