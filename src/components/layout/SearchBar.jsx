import styled from 'styled-components';
import Search from '../../assets/icons/search.svg?react';
import { useState } from 'react';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 40px;
  top: 52%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  width: 520px;
  height: 72px;
  padding: 0 72px;
  display: flex;
  border-radius: 40px;
  background: var(--gray-bright-color);
  font-size: 18px;
  font-weight: 500;
  border: none;
  outline: none;
`;

const SearchBar = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // NOTE) 검색 API 구현 후 수정
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(`검색) ${inputText}`);
    }
  };

  return (
    <Container>
      <SearchIcon>
        <Search></Search>
      </SearchIcon>
      <Input placeholder="가수, 곡 제목으로 검색하기" value={inputText} onChange={handleInputChange} onKeyPress={handleKeyPress}></Input>
    </Container>
  );
};

export default SearchBar;
