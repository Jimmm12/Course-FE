import { configureStore  } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice"
import userReducer from "./UserSlice"
import orderReducer from "./OrderSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    user: userReducer,
    order: orderReducer
  },
});