import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
`;

const PlaylistBox = styled.div`
  width: 600x;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  color: var(--primary-color);
  margin: 8px 0px;
`;
const Playlistbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0px, 3px;
  padding: 10px;
`;

const PlaylistTitle = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

function index(props) {
  return (
    <Background>
      <div>
        <Playlistbar>
          <div>아이콘</div>
          <PlaylistTitle>모든플레이리스트</PlaylistTitle>
          <div>수정아이콘</div>
        </Playlistbar>
        <PlaylistBox>
          <div>음표 아이콘</div>
          <div>코딩할 때 듣는 lofi </div>
          <div>편집 아이콘 </div>
        </PlaylistBox>
        <PlaylistBox>
          <div>음표 아이콘</div>
          <div>사용자 지정제목 </div>
          <div>편집 아이콘 </div>
        </PlaylistBox>
        <PlaylistBox>
          <div>음표 아이콘</div>
          <div>사용자 지정제목 </div>
          <div>편집 아이콘 </div>
        </PlaylistBox>
      </div>
    </Background>
  );
}

export default index;
