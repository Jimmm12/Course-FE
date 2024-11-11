import PropTypes from "prop-types"; // Nhập PropTypes

const Modal = ({ isOpen, onClose,title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Thông báo</h2>
        <p className="mb-4">{title}</p>
        <div className="flex justify-end"> 
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

// Định nghĩa kiểu dữ liệu cho các props
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen phải là kiểu boolean và là bắt buộc
  onClose: PropTypes.func.isRequired, // onClose phải là kiểu function và là bắt buộc
  title:PropTypes.string.isRequired,
};

export default Modal;
