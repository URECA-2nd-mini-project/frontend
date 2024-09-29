import styled from 'styled-components';
import Home from '../../assets/icons/home.svg?react';
import Heart from '../../assets/icons/heart.svg?react';
import MusicMenu from '../../assets/icons/menu-music.svg?react';
import MusicAlt from '../../assets/icons/music-alt.svg?react';
import Plus from '../../assets/icons/plus.svg?react';
import { Instance } from '../../utils/axiosConfig';
import { useEffect, useState } from 'react';

const MenuContainer = styled.div`
  width: 254px;
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
  addPlaylist: Plus,
};

const NavMenuList = ({ menuType, menuText, onSelect, isSelected, playlistId, onPostSuccess }) => {
  // 메뉴 타입에 맞는 아이콘 지정
  const Icon = MenuType[menuType];

  const postPlaylists = async () => {
    try {
      const response = await Instance.post('/api/playlists', {
        playlistTitle: '새로운 플레이리스트',
        contents: '작성한 내용이 없어요.',
      });
      console.log('postPlaylist 응답 코드: ', response.headers);
      console.log('postPlaylist 응답 결과: ', response.data);

      onPostSuccess();
    } catch (error) {
      console.log('요청 실패: ', error);
    }
  };

  const handleMenuListClick = () => {
    if (menuType === 'playlists') {
      // 메뉴 타입이 playlist인 경우, SelectedMenu를 menuType_playlistId로 지정
      onSelect(menuType + '_' + playlistId);
      return;
    }
    // 메뉴 타입이 addPlaylist인 경우, postPlaylist API 요청
    if (menuType === 'addPlaylist') {
      postPlaylists();
      onSelect(menuType);
    }
    // 메뉴 타입이 playlist가 아닌 경우, SelectedMenu를 menuType(기본)으로 지정
    onSelect(menuType);
  };

  return (
    <MenuContainer onClick={() => handleMenuListClick()} className={isSelected ? 'list-clicked' : 'list-default'}>
      <Icon fill={isSelected ? 'var(--primary-color)' : 'var(--gray-medium-color)'}></Icon>
      <div>{menuText}</div>
    </MenuContainer>
  );
};

export default NavMenuList;
