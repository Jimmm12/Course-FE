import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate here
import { useParams } from "react-router-dom";
import { getACourse, posOrderCourse } from "../redux/apiRequest";
import Loading from "./Loading";
import toast from "react-hot-toast";
import Error from "./Error";

const OrderForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate here
  const user = useSelector((state) => state.auth.login.currentUser);
  const isFetching = useSelector((state) => state.order.order.isFetching);
  const error = useSelector((state) => state.order.order.error);
  const courseDetail = useSelector((state) => state.course.courses.allcourses); // Direct access to single course object
  const accessToken = user?.accessToken;

  useEffect(() => {
    if (id) {
      getACourse(dispatch, id);
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
  
      const res = await posOrderCourse(dispatch, orderData, accessToken);
      if (res.status === "error") {
        toast.error(res.message);
      }else {
        toast.success(res.message || "Thanh Toán Thành Công");
        navigate("/"); 
      }
    }
  };

  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };


  const renderStars = (rating) => {
    const stars = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < stars ? "text-yellow-500 text-2xl" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!courseDetail) {
    return <div className="text-white mt-5 text-center">Khóa học không tồn tại</div>;
  }

 
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 m-5">
      <h1 className="flex justify-center items-center text-2xl mb-5">Thanh Toán</h1>

      {/* Flexbox container for the course information */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg">
        {/* Left Side (Course Details) */}
        <div className="flex items-center space-x-6 w-1/2">
          <img src={courseDetail.imageUrl} alt={courseDetail.title} className="w-52 h-auto rounded-md" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">{courseDetail.title}</h2>
            <p className="text-gray-600">{courseDetail.instructor}</p>
            <p className="text-gray-500">{courseDetail.duration}</p>
            <div className="flex mt-2">{renderStars(courseDetail.rating)}</div>
          </div>
        </div>

        <div className="w-1/2 flex justify-end items-center">
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{formatPrice(courseDetail.price)}</h2>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <form onSubmit={handlePayment}>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-6"
          >
            Thanh Toán
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
