import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UpdateUser, GetUserDetail } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const userDetail = useSelector((state) => state.user.users.userdetail);
  const [editData, setEditData] = useState({ username: "", email: "", password: "" });
  const accessToken = user?.accessToken;

  useEffect(() => { 
    if (!userDetail) {
      GetUserDetail(dispatch, id, accessToken);
    }
  }, [dispatch, id, accessToken, userDetail]);

  useEffect(() => {
    if (userDetail) {
      setEditData({
        username: userDetail.username || "",
        email: userDetail.email || "",
        password: "",  // Clear password initially for security
      });
    }
  }, [userDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await UpdateUser(dispatch, id, editData, navigate, accessToken);
      if (res && res.status === "success") {
        toast.success(res.message);
        navigate(`/user/${id}`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật: " + (error?.response?.data?.message || "Có lỗi xảy ra"));
      console.error(error);
    }
  };

  if (!userDetail) return <Loading />;

  return (
    <div className="mx-8 p-6 bg-white rounded-lg shadow-md mt-12">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Cập Nhật Thông Tin</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={editData.username || ""}
          onChange={handleInputChange}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={editData.email || ""}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
          Mật Khẩu
        </label>
        <input
          id="password"
          name="password"
          value={editData.password || ""}
          onChange={handleInputChange}
          placeholder="Mật Khẩu"
          type="password"  // Ensure the password is hidden
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        Lưu
      </button>
    </div>
  );
};

export default UserUpdate;
