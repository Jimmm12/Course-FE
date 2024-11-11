import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getACourseUser } from "../../redux/apiRequest";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import Courses from "../../components/Courses";

const CoursesUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isShowMore, setIsshowMore] = useState(false);

  const user = useSelector((state) => state.auth.login.currentUser);
  const allCourses = useSelector((state) => state.course.courses.allcourses);
  const courseUser = Array.isArray(allCourses) ? allCourses.find(course => course._id === id) : null;
  const isFetching = useSelector((state) => state.course.courses.isFetching);
  const error = useSelector((state) => state.course.courses.error);
  const accessToken = user?.accessToken; // Corrected spelling

  console.log("courseUser : ", courseUser);

  useEffect(() => {
    if (accessToken) {
      getACourseUser(dispatch, id, accessToken); // Pass the token here
    }
  }, [dispatch, id, accessToken]);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-white mt-5 text-center">Dữ Liệu Bị Lỗi</div>;
  }

  return (
    <>
      <div className="bg-white m-8 h-auto">
        {courseUser ? (
          <div className="rounded-lg shadow-lg p-6 flex">
            <div className="flex-1 pr-7">
              <iframe
                src={`${import.meta.env.VITE_URL_YOUTUBE}/${courseUser.videoId}?enablejsapi=1`}
                className="w-full h-96 "
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{courseUser.title}</h2>
              <p className="text-gray-600 mb-4"><strong>Description :</strong> {courseUser.description}</p>
              <p className="text-gray-600 mb-4"><strong>Price :</strong> {courseUser.price}</p>
              <p className="text-gray-600 mb-4"><strong>Instructor :</strong> {courseUser.instructor}</p>
              <p className="text-gray-600 mb-4"><strong>Duration :</strong> {courseUser.duration}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">Không tìm thấy khóa học.</p>
        )}

        <div className="mt-8 pb-8">
          <h3 className="text-xl font-bold mb-4 ml-8">Khóa học khác</h3>
          <Courses />
          <div className="flex justify-center items-center underline cursor-pointer">
            <p onClick={() => setIsshowMore(!isShowMore)}>
              {isShowMore ? "Đóng Lại" : "Xem Thêm"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesUser;
