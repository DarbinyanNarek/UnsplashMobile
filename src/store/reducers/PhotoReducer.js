import {createReducer} from "@reduxjs/toolkit";

import _ from "lodash";
import {receiveCollectionData, SearchedImages, receiveCollectionPhoto} from "../actions/PhotoAction"


const initialState = {
  collectionPhotos: [],
  status: "",
  collectionData: null,
  searchArray: [],
}


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveCollectionPhoto.pending, (state) => {
      state.status = "pending"
    })
    .addCase(receiveCollectionPhoto.fulfilled, (state, {payload}) => {
      state.status = "fulfilled"
      if (payload.page === 1 ){
        state.collectionPhotos = _.uniqBy([...payload.data], 'id')
      }else {
        state.collectionPhotos = _.uniqBy([...state.collectionPhotos,...payload.data], 'id')
      }

    })
    .addCase(receiveCollectionPhoto.rejected, (state) => {
      state.status = "fail"
    })


    .addCase(receiveCollectionData.fulfilled, (state, {payload}) => {
      state.collectionData = payload
    })
    .addCase(receiveCollectionData.rejected, (state,) => {
      state.status = "fail"

    })

    .addCase(SearchedImages.fulfilled, (state, {payload}) => {
      state.status = "fulfilled"
      if (payload.page === 1){
        state.searchArray = _.uniqBy([...payload.data],"id")

      }else{
        state.searchArray = _.uniqBy([...state.searchArray,...payload.data], "id")

      }

    })
    .addCase(SearchedImages.rejected, (state) => {
      state.status = "fail"
    })

})


export default reducer
