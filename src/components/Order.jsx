import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { getACourse, posOrderCourse } from "../redux/apiRequest";

const OrderForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const isFetching = useSelector((state) => state.order.order.isFetching);
  const error = useSelector((state) => state.order.order.error);
  const courseDetail = useSelector((state) => state.course.courses.allcourses); // Direct access to single course object
  const accessToken = user?.accessToken;

  useEffect(() => {
    if (id) {
      getACourse(dispatch, id); // Fetch course details by id
    }
  }, [dispatch, id]);

 
  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (accessToken && id && courseDetail) {
      const orderData = {
        user_id: user.id, 
        courses: [
          {
            course_id: id, 
            price: courseDetail.price, 
          },
        ],
        total_price: courseDetail.price, 
        payment_method: "credit_card", 
      };
  
      await posOrderCourse(dispatch, orderData, accessToken); 
    }
  };
  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-white mt-5 text-center">Dữ Liệu Bị Lỗi</div>;
  }

  if (!courseDetail) {
    return <div className="text-white mt-5 text-center">Khóa học không tồn tại</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 m-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Thanh Toán</h2>

        <form className="space-y-4" onSubmit={handlePayment}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tên Người Dùng</label>
            <p>{user?.username}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tên Khóa Học</label>
            <p>{courseDetail?.title}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tổng Tiền</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={`$${courseDetail?.price || 0}`} // Display course price
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Thanh Toán
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
