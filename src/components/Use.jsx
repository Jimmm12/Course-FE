import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const User = () => {
  const User = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = User?.accessToken;
  const userId = User?._id;

  const handleGetUserDetail = (userId) => {
    window.location.href = `/user/${userId}`;
  };


  const handleLogOut = () => {
    logoutUser(dispatch, userId, navigate, accessToken);
  };

  return (
    <>
      <div className="flex gap-3 items-center justify-center">
        <div>
          {User ? (
            <p
              className="text-1xl font-medium hover:text-sky-400 cursor-pointer text-white"
              onClick={() => {
                (handleGetUserDetail(userId));
              }}
            >
              Xin Chào! {User.username}
            </p>
          ) : (
            <p className="text-1xl font-medium cursor-pointer text-white">
              Xin Chào! Bạn
            </p>
          )}
        </div>
        <div>
          <button onClick={handleLogOut} className="text-white hover:text-sky-400">
            <RiLogoutBoxRLine size={30} />
          </button>
        </div>
      </div>
    </>
  );
};


export default User;
