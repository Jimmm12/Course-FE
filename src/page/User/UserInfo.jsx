import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetail } from "../../redux/apiRequest";
import Loading from "../../components/Loading";
import UserDetail from "./UserDetail";

const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login.currentUser);
  const userDetail = useSelector((state) => state.user.users.userdetail);
  const isFetching = useSelector((state) => state.user.users.isFetching);
  const error = useSelector((state) => state.user.users.error);
  const accessToken = user?.accessToken;

  useEffect(() => {
    if (user?.accessToken) {
      GetUserDetail(dispatch, id, accessToken, );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, accessToken, user?.accessToken,]);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Dữ Liệu Bị Lỗi</div>;
  }

  const handleEditNavigate = () => {
    navigate(`/user/update/${id}`);
  };

  return (
    <div className="m-8">
      {userDetail ? (
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Thông Tin Cá Nhân
              </h3>
              <button onClick={handleEditNavigate} className="text-blue-500">
                Chỉnh sửa
              </button>
            </div>
          </div>
          <UserDetail id={id} accessToken={accessToken}  />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserInfo;
