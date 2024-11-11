import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { posOrderCourse } from "../redux/apiRequest";

const OrderForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id)
  const user = useSelector((state) => state.auth.login.currentUser);
  const allCourses = useSelector((state) => state.course.courses.allcourses);
  const courseDetail = Array.isArray(allCourses) ? allCourses.find(course => course._id === id) : null;
  const isFetching = useSelector((state) => state.course.courses.isFetching);
  const error = useSelector((state) => state.course.courses.error);
  const accessToken = user?.accessToken;

  useEffect(() => {
    if (accessToken) {
      posOrderCourse(dispatch, id, accessToken); // Gửi request nếu có accessToken
    }
  }, [dispatch, id, accessToken]);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-white mt-5 text-center">Dữ Liệu Bị Lỗi</div>;
  }

  // Kiểm tra nếu khóa học không tồn tại
  if (!courseDetail) {
    return <div className="text-white mt-5 text-center">Khóa học không tồn tại</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 m-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Thanh Toán</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Tên Người Dùng</label>
            <p>{user.username}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Tên Khóa Học</label>
            <p>{courseDetail.title}</p> {/* Hiển thị tên khóa học */}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="total">Tổng Tiền</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={`$${courseDetail.price}`} // Giả sử `price` là giá khóa học
              disabled
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Thanh Toán
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
