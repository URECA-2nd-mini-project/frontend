import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRouteDef } from './RouteDef';
import Header from '../layouts/Header';
import NavMenu from '../layouts/NavMenu';
import PlayBar from '../layouts/PlayBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AppPages = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <NavMenu />
        <Contents>
          <Header />
          <Routes>
            {/* RouteDef에 정의된 경로를 불러와 현재 경로에 맞는 화면을 보여줌 */}
            {Object.entries({ ...AppRouteDef }).map(([name, { path, element }], index) => (
              <Route key={name + index} path={path} element={element} />
            ))}
          </Routes>
          <PlayBar />
        </Contents>
      </Wrapper>
    </BrowserRouter>
  );
};

export default AppPages;
