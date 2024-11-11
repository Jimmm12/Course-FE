import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/apiRequest";
import CourseList from "../page/courses/CoursesList";
import Loading from "./Loading";

const Courses = () => {
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false); // Kiểm soát việc gọi API
  const courses = useSelector((state) => state.course.courses.allcourses);
  console.log(courses)

  const isFetching = useSelector((state) => state.course.courses.isFetching);
  const error = useSelector((state) => state.course.courses.error);
  const [isShowMore, setIsshowMore] = useState(false);

  useEffect(() => {
    // Kiểm tra xem dữ liệu đã được tải hay chưa
    if (!isFetched && !isFetching && !courses.length) {
      getAllCourses(dispatch);
      setIsFetched(true); // Đánh dấu rằng dữ liệu đã được tải
    }
  }, [dispatch, isFetched, isFetching, courses.length]); // Thêm dependency courses.length

  if (isFetching) {
    return <Loading/>;
  }

  if (error) {
    return <p className="text-center text-white font-bold mb-4">Có lỗi xảy ra khi tải dữ liệu.</p>;
  }

  return (
    <div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-8">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <CourseList
              key={course._id}
              _id={course._id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
            />
          ))
        ) : (
          <p className="text-center text-gray-700">Không có khóa học nào.</p>
        )}
      </div>
      <div className="flex justify-center text-white mb-4 items-center underline cursor-pointer">
        <p
          onClick={() => setIsshowMore(!isShowMore)}
        > {isShowMore ? "xem Thêm" : "Đóng Lại "} </p>
      </div>
    </div>
  );
};

export default Courses;
