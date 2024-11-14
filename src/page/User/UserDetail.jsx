import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const UserDetail = () => {
  const userDetail = useSelector((state) => state.user.users.userdetail);
  
  console.log(userDetail);

  return (
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl className="sm:divide-y sm:divide-gray-200">
        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            <strong>Tên Người Dùng</strong>
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {userDetail?.username}
          </dd>
        </div>
        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            <strong>Email</strong>
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {userDetail?.email}
          </dd>
        </div>
        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            <strong>Khóa Học đăng ký</strong>
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <strong>Tên Khóa Học</strong>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <strong>Giáo Viên</strong>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <strong>Giờ Học</strong>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userDetail?.courses_enrolled && userDetail.courses_enrolled.length > 0 ? (
                  userDetail.courses_enrolled.map((course, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link to={`/course/user/${course.course_id}`} className="text-blue-600 hover:underline">
                          {course?.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.instructor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.duration}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-black">
                      Không có khóa học
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default UserDetail;
