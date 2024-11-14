import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getACourse } from "../../redux/apiRequest";
import Courses from "../../components/Courses";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const allCourses = useSelector((state) => state.course.courses.allcourses);
  const courseDetail = Array.isArray(allCourses) ? allCourses.find(course => course._id === id) : null;
  const isFetching = useSelector((state) => state.course.courses.isFetching);
  const error = useSelector((state) => state.course.courses.error);

  const handlePostOrder = () => {
    window.location.href = `/order/${id}`;
  };

  useEffect(() => {
    getACourse(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsBlocked(true);
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

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

  return (
    <>
      <div className="bg-white m-8 h-auto">
        {courseDetail ? (
          <div className="rounded-lg shadow-lg p-6 flex">
            <div className="flex-1 pr-7">
              <iframe
                src={`${import.meta.env.VITE_URL_YOUTUBE}/${courseDetail.videoId}?enablejsapi=1`}
                className={`w-full h-96 ${isBlocked ? "blur-lg" : ""}`}
                frameBorder="0"
                allowFullScreen
                ref={videoRef}
              ></iframe>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{courseDetail.title}</h2>
              <p className="text-gray-600 mb-4"><strong>Description :</strong> {courseDetail.description}</p>
              <p className="text-gray-600 mb-4"><strong>Price :</strong> {formatPrice(courseDetail.price)}</p>
              <p className="text-gray-600 mb-4"><strong>Instructor :</strong> {courseDetail.instructor}</p>
              <p className="text-gray-600 mb-4"><strong>Duration :</strong> {courseDetail.duration}</p>
              <div className="mb-4">{renderStars(courseDetail.rating)}</div>
              <p className="text-gray-600 mb-4"><strong>Students Enrolled :</strong> {courseDetail.students_enrolled} học viên đã tham gia</p>
              <button className="border rounded btn-primary w-48" onClick={() => handlePostOrder(id)}>
                Mua Khóa học
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">Không tìm thấy khóa học.</p>
        )}

        <div className="mt-8 pb-8">
          <h3 className="text-xl font-bold mb-4 ml-8">Khóa học khác</h3>
          <Courses />
        </div>
      </div>
    </>
  );
};

export default CourseDetail;