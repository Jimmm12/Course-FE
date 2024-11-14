import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import User from "./Use";
const Navbar = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);



  return (
    <div className="flex border-black shadow-xl items-center justify-between px-6 py-2 drop-shadow bg-gray-800">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-white py-2">AcademyPro</h2>
      </Link>
      <div>
        {!isLoggedIn ? (
          <>
            <Link
              to={"/register"}
              className="text-white px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 mr-2"
            >
              Đăng Ký
            </Link>
            <Link
              to={"/login"}
              className="text-white px-2 py-1 rounded-lg bg-green-600 hover:bg-green-700 transition duration-300"
            >
              Đăng Nhập
            </Link>
          </>
        ) : (
          <User />
        )}
      </div>
    </div>
  );
};

export default Navbar;
