import { Link, useNavigate } from "react-router-dom"
import "../../index.css"
import Password from "./input/Password"
import { useState } from "react"
import toast from "react-hot-toast"
import { loginUser } from "../../redux/apiRequest"
import { useDispatch } from "react-redux"

const Loginpage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  if(!username) {
    toast.error("Bạn chưa nhập Tên đăng nhập");
    return;
  }
  if(!password) {
    toast.error("Bạn chưa nhập password");
    return;
  }
  const newUser = {
    username: username,
    password: password,
  };
  const response = await loginUser(newUser, dispatch, navigate);
  if (response.status === "success") {
    toast.success(response.message);
    navigate("/"); 
  } else {
    toast.error(response);
  } 
}

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Đăng Nhập</h4>  
          <input
            type="text"
            placeholder="tên đăng nhập"
            className="input-box"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Password value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-primary">
            Đăng Nhập
          </button>
          <p className="text-sm text-center mt-4 ">
            Chưa có tài khoản?
            <Link to="/register" className="ml-2 font-medium text-primary underline">
              Tạo Tài Khoản
            </Link>
          </p>
        </form>
      </div>
    </div>

  )
}


export default Loginpage;