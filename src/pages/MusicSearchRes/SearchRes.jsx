// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ListenItemList from './ListItem';

const SearchRes = () => {
  const [query] = useState(''); // 검색어를 저장하는 상태 ,setQuery

  // SearchBar에서 검색어가 입력되면 그 값을 setQuery로 업데이트
  // const  = (searchQuery) => {
  //setQuery(searchQuery);
  //};

  return (
    <div>
      <ListenItemList query={query} /> {/* 검색어를 ListenItemList로 전달 */}
    </div>
  );
};

export default SearchRes;
