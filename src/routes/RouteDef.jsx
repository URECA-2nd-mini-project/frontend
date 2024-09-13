// Router 경로 정의
import MainPage from '../pages/Main';
import PlaylistAll from '../pages/PlaylistAll';

const MainScreens = {
  Main: {
    path: '/',
    element: <MainPage />,
  },
  PlaylistAll: {
    path: '/playlist',
    element: <PlaylistAll />,
  },
};

export const AppRouteDef = {
  ...MainScreens,
};
