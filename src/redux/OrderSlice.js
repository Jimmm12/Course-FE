import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order:{
      ordercourse: [],
      isFetching: false,
      error : false
    }
  },
  reducers: {
    postOrderStart: (state) => {
      state.users.isFetching = true;
    },
    postOrderSuccess: (state, actions) => {
      state.users.isFetching = false,
      state.users.userdetail = actions.payload;
    },
    postOrderFailed: (state) => {
      state.users.isFetching =  false;
      state.users.error = true;
    },
  }
});

export const {
  postOrderStart,
  postOrderSuccess,
  postOrderFailed,
} = orderSlice.actions;
export default orderSlice.reducer;