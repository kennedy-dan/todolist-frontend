import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listSlice from "./slice/listSlice";
import { persistReducer, persistStore } from "redux-persist";

import thunk from "redux-thunk";


const rootReducer = combineReducers({
  list: listSlice,

});
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
