import { createSlice } from "@reduxjs/toolkit";

// Safely parse localStorage item
const savedUser = localStorage.getItem("currentUser");
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: parsedUser, // Set to parsedUser
      isFeching: false,
      error: false,
    },
    register: {
      currentUser: null,
      isFeching: false,
      error: false,
    },
    logout: {
      isFeching: false,
      error: false,
    }
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFeching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFeching = false;
      state.login.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Store in localStorage
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFeching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFeching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFeching = false;
      state.register.currentUser = action.payload;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isFeching = true;
      state.register.error = true;
    },
    logoutStart: (state) => {
      state.logout.isFeching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFeching = false;
      state.login.currentUser = localStorage.setItem("currentUser", JSON.stringify(null)); ;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.logout.isFeching = false;
      state.logout.error = true;
    },
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed
} = authSlice.actions;
export default authSlice.reducer;
