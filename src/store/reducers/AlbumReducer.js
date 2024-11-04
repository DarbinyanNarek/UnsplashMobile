import {createReducer} from "@reduxjs/toolkit";
import {receiveCollection} from "../actions/AlbumAction";


const initialState = {
  collections: [],
  status: ""
}


  const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveCollection.pending, (state) => {
      state.status = "pending"
    })

    .addCase(receiveCollection.fulfilled, (state, {payload}) => {
      state.status = "fulfilled"
      state.collections = payload
    })

    .addCase(receiveCollection.rejected, (state) => {
      state.status = "fail"
    })
})



export default reducer
