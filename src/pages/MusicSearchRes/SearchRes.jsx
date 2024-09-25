// eslint-disable-next-line no-unused-vars
import React from 'react';
import ListenItemList from './ListItem';

const SearchRes = () => {
  return (
    <div>
      {/* 검색 결과를 렌더링 */}
      <ListenItemList /> {/* ListenItemList에서 URL의 검색어를 받아 처리 */}
    </div>
  );
};

export default SearchRes;
