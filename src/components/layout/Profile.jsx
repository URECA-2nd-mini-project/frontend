import styled from 'styled-components';
import DefaultProfile from '../../assets/icons/profile-default.svg?react';
import { useState } from 'react';

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
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // NOTE) 임시 유저 프로필 데이터 , 통신 구현 후 수정 필요
  const imgLink = 'https://i.pinimg.com/originals/4c/a5/a1/4ca5a1de62690b5615925ce3def4636d.jpg';
  const userName = '신혜민';

  return (
    <Container>
      {isLoggedIn ? <ProfileImg src={imgLink} referrerPolicy="no-referrer"></ProfileImg> : <DefaultProfile></DefaultProfile>}
      {isLoggedIn ? <div>{userName}</div> : <div>로그인</div>}
    </Container>
  );
};

export default Profile;
