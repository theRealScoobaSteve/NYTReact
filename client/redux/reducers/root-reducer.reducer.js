import modalReducer from "./modal-data.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  modalData: modalReducer
});

export default rootReducer;
