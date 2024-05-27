import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.scss';
import UnderConstruction from '../../components/stubs/underconstruction';
import { useAppDispatch } from '../../redux/hooks';
import { setUserLogged, logout } from '../../redux/store/userSlice';
import { getCustomerInfo } from '../../services/api/getCustomerInfo';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo();
    if (!userInfo) {
      dispatch(logout());
      navigate(`/login`);
    }
    dispatch(setUserLogged(userInfo));
  };

  useEffect(() => {
    getUserInfo();
  });

  return (
    <>
      <h2 className="profile free-page">Profile</h2>
      <UnderConstruction />
    </>
  );
}

export default Profile;
