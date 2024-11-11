import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import PropTypes from 'prop-types';

const Password = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}  // Add onChange handler here
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Nhập Khẩu"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={toggleShowPassword} // Correct usage of toggleShowPassword
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={toggleShowPassword} // Correct usage of toggleShowPassword
        />
      )}
    </div>
  );
};

Password.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Password;
