import axios from "axios";
import { loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed, logoutStart, logoutSuccess, logoutFailed } from "./authSlice";
import { getAllCourseFailed, getAllCourseStart, getAllCourseSuccess, getACourseFailed, getACourseStart, getACourseSuccess } from "./courseSlice";
import { getAUserFailed, getAUserStart, getAUserSuccess, updateUserFailed, updateUserStart, updateUserSuccess } from "./UserSlice";
import toast from "react-hot-toast";
import { postOrderFailed, postOrderStart, postOrderSuccess } from "./OrderSlice";


// Athu
  // Login
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    console.log("Logging in with user:", user); 
    const res = await axios.post(`${import.meta.env.VITE_BACK_URL}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("currentUser", JSON.stringify(res.data))
    navigate("/"); 
    return { status: "success", message: res.data.message || "Đăng nhập thành công!" };

  } catch (err) {
    dispatch(loginFailed(),err);
    return err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
  }
};
  // register
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACK_URL}/auth/register`, user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
    return { status: "success", message: res.data.message || "Đăng ký thành công!"};
  } catch (err) {
    dispatch(registerFailed(), err);
    const errorMessage = err.response?.data?.message || "Đăng Ký thất bại. Vui lòng thử lại sau!";
    return { status: "error", message: errorMessage };
  }
}
  // logout
export const logoutUser = async (dispatch, id, navigate, accessToken) => {
  dispatch(logoutStart());
  try{
    await axios.post(`${import.meta.env.VITE_BACK_URL}/auth/logout`,id ,{
      headers: { token: `Bearer ${accessToken}`}
    });
    dispatch(logoutSuccess());
    navigate("/login")
  }catch(error){
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      dispatch(logoutFailed());
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      navigate("/login");
    } else {
      console.error("Logout failed:", error);
      toast.error("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  }
}

// User

  // Get A User Detail
export const GetUserDetail = async (dispatch, userId, accessToken) => {
  dispatch(getAUserStart());
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/user/${userId}`, {
      headers: {token: `Bearer ${accessToken}`}
    });
    dispatch(getAUserSuccess(res.data));
  } catch (err) {
    console.error("Failed to fetch courses:", err);
    dispatch(getAUserFailed());
  }
}
  // Update User
  export const UpdateUser = async (dispatch, userId, editData, navigate, accessToken) => {
    dispatch(updateUserStart());
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACK_URL}/user/update/${userId}`,
        editData, 
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      dispatch(updateUserSuccess(res.data));
      // navigate(`/user/${userId}`); 
      return { status: "success", message: res.data.message || "Cập nhập thành công!" };
    } catch (err) {
      dispatch(updateUserFailed());
      const errorMessage =  err.response?.data?.message || "Cập nhập thật bại. Vui lòng thử lại.";
      return { status: "error", message: errorMessage };

    }
  };



// Courses

export const getAllCourses = async (dispatch) => {
  dispatch(getAllCourseStart());
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/course`);
    dispatch(getAllCourseSuccess(res.data));
  } catch (err) {
    console.error("Failed to fetch courses:", err); // Log lỗi nếu cần
    dispatch(getAllCourseFailed()); // Gọi dispatch mà không có tham số thứ hai
  }
};

export const getACourse = async(dispatch,courseId) => {
  dispatch(getACourseStart());
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/course/${courseId}`, 
    );
    dispatch(getACourseSuccess(res.data));
  } catch (err) {
    console.error("Failed to fetch courses:", err); // Log lỗi nếu cần
    dispatch(getACourseFailed()); // Gọi dispatch mà không có tham số thứ hai
  }
}


export const getACourseUser = async(dispatch,courseId, accessToken) => {
  dispatch(getACourseStart());
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/course/user/${courseId}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getACourseSuccess(res.data));
  } catch (err) {
    console.error("Failed to fetch courses:", err); // Log lỗi nếu cần
    dispatch(getACourseFailed()); // Gọi dispatch mà không có tham số thứ hai
  }
}


// ORDER
export const posOrderCourse = async (dispatch, orderData, accessToken) => {
  dispatch(postOrderStart());
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACK_URL}/order/payment`, orderData,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(postOrderSuccess(res.data));
    return res; 
  } catch (err) {
    console.error("Failed to process payment:", err);
    dispatch(postOrderFailed());
    return { status: "error", message: "Thanh Toán Không Thành Công" }; 
  }
};
