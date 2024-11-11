import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: {
      allcourses: [],
      isFetching: false,
      error : false
    }
  },
  reducers: {
    getAllCourseStart: (state) => {
      state.courses.isFetching = true;
    },
    getAllCourseSuccess: (state, actions) => {
      state.courses.isFetching = false,
      state.courses.allcourses = actions.payload;
    },
    getAllCourseFailed: (state) => {
      state.courses.isFetching =  false;
      state.courses.error = true;
    },
    getACourseStart: (state) => {
      state.courses.isFetching = true;
    },
    getACourseSuccess: (state, actions) => {
      state.courses.isFetching = false,
      state.courses.allcourses = actions.payload;
    },
    getACourseFailed: (state) => {
      state.courses.isFetching =  false;
      state.courses.error = true;
    },
  }
});

export const {
  getAllCourseStart,
  getAllCourseSuccess,
  getAllCourseFailed,
  getACourseStart,
  getACourseSuccess,
  getACourseFailed
} = courseSlice.actions;
export default courseSlice.reducer;