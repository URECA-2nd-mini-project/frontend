// Router 경로 정의
import MainPage from '../pages/Main';
import PlaylistAll from '../pages/PlaylistAll';
import EmojiPlaylist from '../pages/EmojiPlaylist';
import DetailPlaylist from '../pages/DetailPlaylist';

const MainScreens = {
  Main: {
    path: '/',
    element: <MainPage />,
  },
  PlaylistAll: {
    path: '/playlist',
    element: <PlaylistAll />,
  },
  EmojiPlaylist: {
    path: '/emojiplay',
    element: <EmojiPlaylist />,
  },
  DetailPlaylist: {
    path: '/detailplay',
    element: <DetailPlaylist />,
  },
};

export const AppRouteDef = {
  ...MainScreens,
};
