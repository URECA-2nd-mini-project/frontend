import styled from 'styled-components';
import NavMenuList from '../components/layout/NavMenuList';
import Logo from '../assets/icons/logo.svg?react';
import { useState } from 'react';
import { Instance } from '../utils/axiosConfig';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background: linear-gradient(#eeeff3, #e1e3ea);
  width: 400px;
  padding: 48px 64px 0 64px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const LogoContainer = styled.div`
  width: 180px;
  height: 80px;
  margin-bottom: 40px;
`;

const MenuTitle = styled.div`
  color: var(--gray-light-color);
  font-size: 14px;
  font-weight: 500;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 72px;
`;

const PlaylistContainer = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: var(--gray-bright-color) white;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 내비게이션 메뉴 목록
const Menu = [
  {
    text: '홈',
    type: 'home',
  },
  {
    text: '플레이리스트',
    type: 'playlist',
  },
  {
    text: '감정',
    type: 'emotion',
  },
];

const AddPlaylist = {
  text: '플레이리스트 추가하기',
  type: 'addPlaylist',
};

const NavMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [playlists, setPlaylists] = useState(null);
  const [isPosted, setIsPosted] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getPlaylists = async () => {
    try {
      const response = await Instance.get('/api/playlists');
      console.log('getPlaylist 응답 코드: ', response.headers);
      console.log('getPlaylist 응답 결과: ', response.data);
      setPlaylists(response.data);
    } catch (error) {
      console.log('요청 실패: ', error);
    }
  };

  const handleMenuClick = (menuType) => {
    setSelectedMenu(menuType);

    if (menuType === 'addPlaylist') {
      setIsPosted(false);
    }

    if (menuType === 'home') {
      navigate(`/`);
    }

    // 감정, 플레이리스트 메뉴 클릭 시 해당 화면으로 이동
    if (menuType === 'emotion' || menuType === 'playlist') {
      navigate(`/${menuType}`);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  useEffect(() => {
    getPlaylists();
  }, [isPosted]);

  return (
    <Container>
      <LogoContainer>
        <Logo></Logo>
      </LogoContainer>
      <MenuTitle>메뉴</MenuTitle>
      <MenuContainer>
        {isLoggedIn ? (
          <ListContainer>
            {Menu.map((item, index) => (
              <NavMenuList
                key={index}
                menuText={item.text}
                menuType={item.type}
                onSelect={handleMenuClick}
                isSelected={selectedMenu === item.type}
              ></NavMenuList>
            ))}
          </ListContainer>
        ) : (
          <NavMenuList menuText={Menu[0].text} menuType={Menu[0].type} onSelect={handleMenuClick} isSelected={selectedMenu === Menu[0].type}></NavMenuList>
        )}
      </MenuContainer>
      {isLoggedIn ? <MenuTitle>플레이리스트</MenuTitle> : <div></div>}
      {isLoggedIn ? (
        <PlaylistContainer>
          <ListContainer>
            <NavMenuList
              menuText={AddPlaylist.text}
              menuType={AddPlaylist.type}
              onSelect={handleMenuClick}
              isSelected={setSelectedMenu === AddPlaylist.type}
              onPostSuccess={() => {
                setIsPosted(true);
              }}
            ></NavMenuList>
            {playlists !== null ? (
              playlists.map((item, index) => (
                <NavMenuList
                  key={index}
                  menuText={item.playlistTitle}
                  menuType={'playlists'}
                  onSelect={handleMenuClick}
                  isSelected={selectedMenu === `playlists_${item.playlistId}`}
                  playlistId={item.playlistId}
                ></NavMenuList>
              ))
            ) : (
              <div></div>
            )}
          </ListContainer>
        </PlaylistContainer>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default NavMenu;
