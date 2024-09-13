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

// const Menu = {
//   home: {
//     text: '홈',
//     type: 'home',
//   },
//   playlists: {
//     text: '플레이리스트',
//     type: 'playlists',
//   },
// };

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
          <NavMenuList menuText={'홈'} menuType={'home'} onSelect={handleMenuClick} isSelected={selectedMenu === 'home'}></NavMenuList>
          <NavMenuList menuText={'플레이리스트'} menuType={'playlists'} onSelect={handleMenuClick} isSelected={selectedMenu === 'playlists'}></NavMenuList>
          <NavMenuList menuText={'감정'} menuType={'emotion'} onSelect={handleMenuClick} isSelected={selectedMenu === 'emotion'}></NavMenuList>
        </ListContainer>
      </MenuContainer>
      <MenuContainer>
        <MenuTitle>플레이리스트</MenuTitle>
        <ListContainer>
          <NavMenuList menuText={'코딩할 때 듣는 Lofi'} menuType={'playlist'} onSelect={handleMenuClick} isSelected={selectedMenu === 'playlist'}></NavMenuList>
        </ListContainer>
      </MenuContainer>
    </Container>
  );
};

export default NavMenu;
