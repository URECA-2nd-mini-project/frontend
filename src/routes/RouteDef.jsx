// Router 경로 정의
import MainPage from '../pages/Main';
import PlaylistAll from '../pages/PlaylistAll';
import EmojiPlaylist from '../pages/EmojiPlaylist';
import DetailPlaylist from '../pages/DetailPlaylist';

// 메인 화면 경로
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
// 로그인 화면 경로
const LoginScreens = {
  Mue: {
    // 새로운 경로 추가
    path: '/Mue',
    element: <MueLoginPage />,
  },
  EmotionBoard: {
    // 새로운 경로 추가
    path: '/EmotionBoard',
    element: <EmotionBoard />,
  },
};
export const MainRouteDef = {
  ...MainScreens,
};
export const LoginRouteDef = {
  ...LoginScreens,
};
