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

  &:hover {
    background: var(--gray-bright-color);
  }

  &.list-default {
    background-color: none;
  }

  &.list-clicked {
    font-weight: 600;
    background: #dcdde7;
    color: var(--primary-color);
    transition: background 0.4s;
  }
`;

const MenuType = {
  home: Home,
  emotion: Heart,
  playlists: MusicMenu,
  playlist: MusicAlt,
};

const NavMenuList = ({ menuType, menuText, onSelect, isSelected, playlistId }) => {
  // 메뉴 타입에 맞는 아이콘 지정
  const Icon = MenuType[menuType];

  const setSelectedMenu = () => {
    if (menuType === 'playlist') {
      // 메뉴 타입이 playlist인 경우, SelectedMenu를 menuType_playlistId로 지정
      onSelect(menuType + '_' + playlistId);
    } else {
      // 메뉴 타입이 playlist가 아닌 경우, SelectedMenu를 menuType(기본)으로 지정
      onSelect(menuType);
    }
  };

  return (
    <MenuContainer onClick={() => setSelectedMenu()} className={isSelected ? 'list-clicked' : 'list-default'}>
      <Icon fill={isSelected ? 'var(--primary-color)' : 'var(--gray-medium-color)'}></Icon>
      <div>{menuText}</div>
    </MenuContainer>
  );
};

export default NavMenuList;
