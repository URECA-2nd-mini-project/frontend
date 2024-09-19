// Router 경로 정의
import MainPage from '../pages/Main';
import AccountsMainPage from '../pages/Accounts/AccountsMainPage.jsx';

// 메인 화면 경로
const MainScreens = {
  Main: {
    path: '/',
    element: <MainPage />,
  },
  Accounts: {
    path: '/accounts',
    element: <AccountsMainPage />,
  },
};

// 로그인 화면 경로
const LoginScreens = {
  Login: {
    path: '/login',
    // element: ,
  },
};

export const MainRouteDef = {
  ...MainScreens,
};

export const LoginRouteDef = {
  ...LoginScreens,
};
