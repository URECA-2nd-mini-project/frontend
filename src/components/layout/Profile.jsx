import styled from 'styled-components';
import DefaultProfile from '../../assets/icons/profile-default.svg?react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 124px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  color: var(--gray-dark-color);
  font-size: 20px;
  font-weight: 500;
`;

const ProfileImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 40px;
`;

const Profile = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleProfileClicked = () => {
    if (isLoggedIn) {
      // 로그인한 경우 내 정보 화면으로 이동
      navigate('/accounts');
    } else {
      // 로그인하지 않은 경우 로그인 화면으로 이동
      navigate('/Mue');
    }
  };

  return (
    <Container onClick={handleProfileClicked}>
      {isLoggedIn ? <ProfileImg src={userInfo.photoUrl} referrerPolicy="no-referrer"></ProfileImg> : <DefaultProfile></DefaultProfile>}
      {isLoggedIn ? <div>{userInfo.name}</div> : <div>로그인</div>}
    </Container>
  );
};

export default Profile;
