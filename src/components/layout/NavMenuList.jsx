import styled from 'styled-components';
import Home from '../../assets/icons/home.svg?react';
import Heart from '../../assets/icons/heart.svg?react';
import MusicMenu from '../../assets/icons/menu-music.svg?react';
import MusicAlt from '../../assets/icons/music-alt.svg?react';
import Plus from '../../assets/icons/plus.svg?react';
import { Instance } from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

      // 부모 컴포넌트에 콜백함수로 POST 성공 여부 업데이트
      onPostSuccess();
    } catch (error) {
      console.log('요청 실패: ', error);
    }
  };

  const handleMenuListClick = () => {
    switch (menuType) {
      case 'home':
        onSelect(menuType);
        navigate(`/`);
        break;
      case 'playlist':
        onSelect(menuType);
        navigate(`/${menuType}`);
        break;
      case 'emotion':
        onSelect(menuType);
        navigate(`/${menuType}`);
        break;
      case 'addPlaylist':
        onSelect(menuType);
        postPlaylists();
        break;
      case 'playlists':
        onSelect(menuType + '_' + playlistId);
        navigate(`/${menuType}/${playlistId}`);
        break;
    }
  };

  return (
    <MenuContainer onClick={() => handleMenuListClick()} className={isSelected ? 'list-clicked' : 'list-default'}>
      <Icon fill={isSelected ? 'var(--primary-color)' : 'var(--gray-medium-color)'}></Icon>
      <div>{menuText}</div>
    </MenuContainer>
  );
};

export default NavMenuList;
