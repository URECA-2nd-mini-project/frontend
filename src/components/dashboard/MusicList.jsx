import React, { useState, useEffect } from 'react';
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
const CheckCtrl = styled.label`
  display: flex;
  align-items: center;
`;

const CheckboxStyle = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--gray-medium-color);
  border-radius: 3px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-size: 20px 20px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-image: url('../../assets/icons/checked.svg?react');
    background-color: var(--secondary-color);
  }
`;

function MusicList({ checkedItems, selectMusic, onIconClick, showCheckbox }) {
  const [filteredMusic, setFilteredMusic] = useState(selectMusic); // Emojipage 음악 리스트 초기화

  useEffect(() => {
    setFilteredMusic(selectMusic); // props가 변경될 때 업데이트
  }, [selectMusic]);

  return (
    <div>
      {filteredMusic.map((item, index) => (
        <PlayBox key={item.musicId}>
          <Album>
            <AlbumIcon></AlbumIcon>
          </Album>
          <Song>
            <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>{item.title}</div>
            <div>{item.artist}</div>
          </Song>
          {showCheckbox ? (
            <CheckCtrl htmlFor={index}>
              <CheckboxStyle
                type="checkbox"
                id={index}
                checked={checkedItems[index] || false} // 체크 상태 설정 (undefined -> false)
                onChange={() => onIconClick(index)} // 변경 이벤트 처리
              />
            </CheckCtrl>
          ) : (
            <PalyButton onClick={null}></PalyButton>
          )}
        </PlayBox>
      ))}
    </div>
  );
}

export default MusicList;
