import { createStore } from "redux";
import rootReducer from "./reducers/root-reducer.reducer";

const store = createStore(rootReducer);

export default store;
