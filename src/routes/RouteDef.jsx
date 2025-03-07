// Router 경로 정의
import MainPage from '../pages/Main';
import MusicInfoPage from '../pages/MusicInfo';
import PlaylistAll from '../pages/PlaylistAll';
import EmojiPlaylist from '../pages/EmojiPlaylist';
import DetailPlaylist from '../pages/DetailPlaylist';
import AccountsMainPage from '../pages/Accounts/AccountsMainPage.jsx';
import MueLoginPage from '../pages/FirstStep/MueLoginPage.jsx';
import EmotionBoard from '../pages/SecondStep/EmotionBoard.jsx';
// import SearchRes from '../pages/MusicSearchRes/SearchRes.jsx';

import Search from '../pages/Search';
// 메인 화면 경로
const MainScreens = {
  Main: {
    path: '/',
    element: <MainPage />,
  },
  SearchRes: {
    path: '/search/:keyword',
    // element: <SearchRes />,
    element: <Search />,
  },
  MusicInfo: {
    path: '/music/:musicId/:title/:artist',
    element: <MusicInfoPage />,
  },
  PlaylistAll: {
    path: '/playlist',
    element: <PlaylistAll />,
  },
  EmojiPlaylist: {
    path: '/emotion',
    element: <EmojiPlaylist />,
  },
  DetailPlaylist: {
    path: '/playlists/:playlistId',
    element: <DetailPlaylist />,
  },
  Accounts: {
    path: '/accounts',
    element: <AccountsMainPage />,
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
