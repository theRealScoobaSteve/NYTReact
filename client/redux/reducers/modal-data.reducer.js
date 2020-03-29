import {
  UPDATE_MODAL_DATA,
  SHOW_MODAL,
  CLOSE_MODAL
} from "../actions/modal.actions.js";

const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MODAL_DATA:
      return { ...state, ...action.payload };
    case SHOW_MODAL:
      return { ...state, show: true };
    case CLOSE_MODAL:
      return { ...state, show: false };
    default:
      return { ...state };
  }
};

export default modalReducer;
