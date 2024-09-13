import styled from 'styled-components';
import NavMenuList from '../components/layout/NavMenuList';
import Logo from '../assets/icons/logo.svg?react';
import { useState } from 'react';

const Container = styled.div`
  background: linear-gradient(#eeeff3, #e1e3ea);
  width: calc(1920px * 0.16);
  padding: 64px 64px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const MenuTitle = styled.div`
  color: var(--gray-light-color);
  font-size: 14px;
  font-weight: 500;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
    type: 'playlists',
  },
  {
    text: '감정',
    type: 'emotion',
  },
];

// NOTE) playlist 더미 데이터, 수정 필요
const Playlists = [
  {
    name: '코딩할 때 듣는 Lofi',
    id: 1,
  },
  {
    name: '드라이브엔 역시 시티팝',
    id: 2,
  },
  {
    name: '운동하면서 듣는 J-POP',
    id: 3,
  },
];

const NavMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menuType) => {
    setSelectedMenu(menuType);
  };

  return (
    <Container>
      <Logo></Logo>
      <MenuContainer>
        <MenuTitle>메뉴</MenuTitle>
        <ListContainer>
          {Menu.map((item, index) => (
            <NavMenuList key={index} menuText={item.text} menuType={item.type} onSelect={handleMenuClick} isSelected={selectedMenu === item.type}></NavMenuList>
          ))}
        </ListContainer>
      </MenuContainer>
      <MenuContainer>
        <MenuTitle>플레이리스트</MenuTitle>
        <ListContainer>
          {Playlists.map((item, index) => (
            <NavMenuList
              key={index}
              menuText={item.name}
              menuType={'playlist'}
              onSelect={handleMenuClick}
              isSelected={selectedMenu === `playlist_${item.id}`}
              playlistId={item.id}
            ></NavMenuList>
          ))}
        </ListContainer>
      </MenuContainer>
    </Container>
  );
};

export default NavMenu;
