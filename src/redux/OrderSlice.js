import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order:{
      ordercourse: null,
      isFetching: false,
      error : false
    }
  },
  reducers: {
    postOrderStart: (state) => {
      state.order.isFetching = true;
    },
    postOrderSuccess: (state, actions) => {
      state.order.isFetching = false,
      state.order.ordercourse = actions.payload;
    },
    postOrderFailed: (state) => {
      state.order.isFetching = false;
      state.order.error = true;
    },
  }
});

export const {
  postOrderStart,
  postOrderSuccess,
  postOrderFailed,
} = orderSlice.actions;
export default orderSlice.reducer;