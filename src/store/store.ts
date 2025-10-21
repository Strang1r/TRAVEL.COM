import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loginPopReducer from "./loginPop";
import collectReducer from "./collectSlice";
import destinationReducer from "./destinationSlice";
import staysReducer from "./staysSlice";
import currencyReducer from "./currencySlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    collect: collectReducer,
    loginPop: loginPopReducer,
    destination: destinationReducer,
    stays: staysReducer,
    currency: currencyReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;