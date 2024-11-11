import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users:{
      userdetail: null,
      isFetching: false,
      error : false
    }
  },
  reducers: {
    getAUserStart: (state) => {
      state.users.isFetching = true;
    },
    getAUserSuccess: (state, actions) => {
      state.users.isFetching = false,
      state.users.userdetail = actions.payload;
    },
    getAUserFailed: (state) => {
      state.users.isFetching =  false;
      state.users.error = true;
    },
    updateUserStart: (state) => {
      state.users.isFetching = true;
    },
    updateUserSuccess: (state, actions) => {
      state.users.isFetching = false,
      state.users.userdetail = actions.payload;
    },
    updateUserFailed: (state) => {
      state.users.isFetching =  false;
      state.users.error = true;
    },
  }
});

export const {
  getAUserStart,
  getAUserSuccess,
  getAUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed
} = userSlice.actions;
export default userSlice.reducer;