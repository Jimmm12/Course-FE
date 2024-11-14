import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";

const CoursesList = ({ _id, title, description, imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const handleCourseClick = (courseId) => {
    if (!currentUser) {
      setIsModalOpen(true);
    } else {
      window.location.href = `/course/${courseId}`;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <div
          key={_id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <Link to="#" onClick={() => handleCourseClick(_id)}>
            <img
              className="w-full h-44 object-fill"
              src={imageUrl || "/docs/images/blog/image-1.jpg"}
              alt={title || "Course"}
            />
          </Link>
          <div className="p-4">
            <h5 className="mb-2 text-xl font-semibold text-gray-800 truncate">
              {title}
            </h5>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {description}
            </p>
            <Link
              to="#"
              onClick={() => handleCourseClick(_id)}
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 focus:ring-4 focus:ring-blue-300"
            >
              Chi tiết
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Hay đăng nhập để xem chi tiết khóa học"
      />
    </>
  );
};

CoursesList.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default CoursesList;
