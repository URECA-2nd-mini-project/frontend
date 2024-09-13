import styled from 'styled-components';
import Home from '../../assets/icons/home.svg?react';
import Heart from '../../assets/icons/heart.svg?react';
import MusicMenu from '../../assets/icons/menu-music.svg?react';
import MusicAlt from '../../assets/icons/music-alt.svg?react';

const MenuContainer = styled.div`
  width: 280px;
  height: 56px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 16px;
  color: var(--gray-medium-color);
  font-weight: 500;
  border-radius: 8px;

  &.list-clicked {
    background-color: none;
  }

  &.list-clicked {
    background-color: #dcdde7;
    color: var(--primary-color);
    font-weight: 600;
  }
`;

const MenuType = {
  home: Home,
  emotion: Heart,
  playlists: MusicMenu,
  playlist: MusicAlt,
};

const NavMenuList = ({ menuType, menuText, onSelect, isSelected }) => {
  const Icon = MenuType[menuType];

  return (
    <MenuContainer onClick={() => onSelect(menuType)} className={isSelected ? 'list-clicked' : 'list-default'}>
      <Home></Home>
      <Icon fill={isSelected ? 'var(--primary-color)' : 'var(--gray-medium-color)'}></Icon>
      <div>{menuText}</div>
    </MenuContainer>
  );
};

export default NavMenuList;
