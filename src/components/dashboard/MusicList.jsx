import React from 'react';
import styled from 'styled-components';
import AlbumIcon from '../../assets/icons/album.svg?react';
import PalyButton from '../../assets/icons/play-button.svg?react';

const PlayBox = styled.div`
  background-color: white;
  width: 560px;
  height: 75px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border:
    1px solid,
    white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const Album = styled.div`
  width: 64px;
  height: 64px;
  border: 1px, solid, black;
`;

const Song = styled.div`
  flex: 1;
  text-align: left;
  padding: 0px 20px;
`;

function MusicList(props) {
  return (
    <PlayBox>
      <Album>
        <AlbumIcon></AlbumIcon>
      </Album>
      <Song>
        <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
        <div>유재하</div>
      </Song>
      <PalyButton onClick={null}></PalyButton>
    </PlayBox>
  );
}

export default MusicList;
