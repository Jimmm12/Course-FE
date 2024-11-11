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
              className="text-white mr-2 hover:text-rose-300 px-3 bg-slate-500 rounded hover:bg-black"
            >
              Đăng Ký
            </Link>
            <Link
              to={"/login"}
              className="text-white mr-2 hover:text-rose-300 px-3 bg-slate-500 rounded hover:bg-black"
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
