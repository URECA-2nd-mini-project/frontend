import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainRouteDef, LoginRouteDef } from './RouteDef';
import Header from '../layouts/Header';
import NavMenu from '../layouts/NavMenu';
import PlayBar from '../layouts/PlayBar';
import styled from 'styled-components';

// MainLayout 정의
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Contents = styled.div`
  width: calc(100% - 420px);
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

// 메인 화면 레이아웃 (NavMenu, Header, PlayBar를 사용)
const MainLayout = ({ children }) => (
  <Wrapper>
    <NavMenu />
    <Contents>
      <Header />
      {children}
      <PlayBar />
    </Contents>
  </Wrapper>
);

// 로그인 화면 레이아웃 (NavMenu, Header, PlayBar를 사용하지 않음)
const LoginLayout = ({ children }) => <div>{children}</div>;

const AppPages = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainRouteDef에 해당하는 경로 */}
        {Object.entries({ ...MainRouteDef }).map(([name, { path, element }], index) => (
          <Route key={name + index} path={path} element={<MainLayout>{element}</MainLayout>} />
        ))}

        {/* LoginRouteDef에 해당하는 경로 */}
        {Object.entries({ ...LoginRouteDef }).map(([name, { path, element }], index) => (
          <Route key={name + index} path={path} element={<LoginLayout>{element}</LoginLayout>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppPages;
