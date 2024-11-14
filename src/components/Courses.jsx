import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/apiRequest";
import CourseList from "../page/courses/CoursesList";
import Loading from "./Loading";
import Error from "./Error";

const Courses = () => {
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false); // Kiểm soát việc gọi API
  const courses = useSelector((state) => state.course.courses.allcourses) ;
  const isFetching = useSelector((state) => state.course.courses.isFetching);
  const error = useSelector((state) => state.course.courses.error);





  useEffect(() => {
    // Kiểm tra xem dữ liệu đã được tải hay chưa
    if (!isFetched && !isFetching && !courses.length) {
      getAllCourses(dispatch);
      setIsFetched(true); // Đánh dấu rằng dữ liệu đã được tải
    }
  }, [dispatch, isFetched, isFetching, courses.length]); // Thêm dependency courses.length

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
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
    </div>
  );
};

export default Courses;
