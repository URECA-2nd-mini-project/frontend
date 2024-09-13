import styled from 'styled-components';
import AppPages from './AppPages';

const ViewArea = styled.div`
  width: 100%;
  height: 100%;
  background: #f9f9f9;
`;

const AppScreen = () => {
  return (
    <ViewArea>
      <AppPages />
    </ViewArea>
  );
};

export default AppScreen;
