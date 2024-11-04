import {combineReducers} from "redux";
import homePageReducer from "./HomeReducer";
import modalPageReducer from "./ModalReducer"
import albumPageReducer from "./AlbumReducer"
import photoReducer from "./PhotoReducer";



const rootReducer = combineReducers({
  home: homePageReducer,
  modal: modalPageReducer,
  album: albumPageReducer,
  photo: photoReducer

})


export default rootReducer
