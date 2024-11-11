
import { useState } from "react"
import Password from "./input/Password";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequest";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Bạn chưa nhập tên đăng nhập");
    }
    if (!password) {
      toast.error("Bạn chưa nhập password");
    }
    if (!email) {
      toast.error("Bạn chưa nhập email");
    }
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    const response = await registerUser(newUser, dispatch, navigate);
    if (response.status === "success") {
      toast.success(response.message);
      navigate("/login"); 
    } else {
      toast.error(response.message);
    } 
  }


  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleRegister}>
          <h4 className="text-2xl mb-7">Đăng Ký</h4>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="input-box"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-primary">
            Đăng Ký
          </button>
          <p className="text-sm text-center mt-4 ">
            Bạn đã có tài khoản?
            <Link to="/login" className="ml-2 font-medium text-primary underline">
              Đăng Nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Register