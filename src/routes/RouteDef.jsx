// Router 경로 정의
import MainPage from '../pages/Main';
import AccountsMainPage from '../pages/Accounts/AccountsMainPage.jsx';

const MainScreens = {
  Main: {
    path: '/',
    element: <MainPage />,
  },
  Accounts: {
    // 새로운 경로 추가
    path: '/accounts',
    element: <AccountsMainPage />,
  },
};

export const AppRouteDef = {
  ...MainScreens,
};
