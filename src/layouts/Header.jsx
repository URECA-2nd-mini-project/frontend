import styled from 'styled-components';
import SearchBar from '../components/layout/SearchBar';
import Profile from '../components/layout/Profile';

const Container = styled.div`
  width: calc(100% - 160px);
  height: 80px;
  padding: 48px 80px 0 80px;
  margin-bottom: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <Container>
      <SearchBar></SearchBar>
      <Profile></Profile>
    </Container>
  );
};

export default Header;
