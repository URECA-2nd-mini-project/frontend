// Router 경로 정의
import MainPage from '../pages/Main';

const MainScreens = {
  Main: {
    path: '/',
    element: <MainPage />,
  },
};

export const AppRouteDef = {
  ...MainScreens,
};
