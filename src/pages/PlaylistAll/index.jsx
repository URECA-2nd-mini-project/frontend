import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import PlayListIcon from '../../assets/icons/playlist.svg?react';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';

const Background = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PlaylistBox = styled.div`
  width: 700px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  color: var(--primary-color);
  margin: 8px 0px;
  padding: 0px 20px;
`;

//플레이리스트 상단바
const PlaylistBar = styled.div`
  width: 720px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

// 플레이리스트 제목
const PlaylistTitle = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
  font-size: 20px;
`;

const PlaylistContent = styled.div`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
`;

const TagBg = styled.button`
  border-radius: 40px;
  border:
    1px solid,
    var(--gray-medium-color);
  padding: 10px 2px;
  margin-left: 5px;
  width: 80px;
  text-align: center;
  color: var(--gray-medium-color);
  font-size: 18px;
  font-weight: bold;
  background: none;
  &:hover {
    background: white;
  }
  &:active {
    background: var(--gray-light-color);
  }
  cursor: pointer;
`;

const DetailePoint = styled(PlayDetailIcon)`
  cursor: pointer;
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
function index(props) {
  const [detailButton, setDetailButton] = useState(true);
  const [checkBox, setCheckBox] = useState(false);

  const Playlists = [
    {
      name: '코딩할 때 듣는 Lofi',
      id: 1,
    },
    {
      name: '드라이브엔 역시 시티팝',
      id: 2,
    },
    {
      name: '운동하면서 듣는 J-POP',
      id: 3,
    },
  ];

  const [checkedItems, setCheckedItems] = useState(Array(Playlists.length).fill(false)); //체크박스
  const [playlists, setPlaylists] = useState([...Playlists]); //플레이리스트

  // 플레이리스트 수정
  const handleClick = () => {
    setDetailButton((prev) => !prev);
    setCheckBox((prev) => !prev);
  };

  //플레이리스트 삭제
  const handleClickDelete = () => {
    const newPlaylists = playlists.filter((_, index) => !checkedItems[index]);
    setPlaylists(newPlaylists);
    setCheckedItems(Array(newPlaylists.length).fill(false)); // 체크 상태 초기화
  };

  // playlists 변경 확인
  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

  // 플레이리스트 저장
  const handleClickSave = () => {
    setDetailButton((prev) => !prev);
    setCheckBox((prev) => !prev);
  };

  // 플레이리스트
  const handleIconClick = (index) => {
    setCheckedItems((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  return (
    <Background>
      <Container>
        <PlaylistBar>
          <PlayListIcon></PlayListIcon>
          <PlaylistTitle>모든 플레이리스트</PlaylistTitle>
          {detailButton ? (
            <DetailePoint onClick={handleClick}></DetailePoint>
          ) : (
            <>
              <TagBg onClick={handleClickDelete}>삭제</TagBg>
              <TagBg onClick={handleClickSave} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                저장
              </TagBg>
            </>
          )}
        </PlaylistBar>
        {playlists.map((item, index) => (
          <PlaylistBox key={item.id}>
            <MusicIcon></MusicIcon>
            <PlaylistContent>{item.name}</PlaylistContent>
            <CheckCtrl htmlFor={index}>
              {checkBox && (
                <CheckboxStyle
                  type="checkbox"
                  id={index}
                  checked={checkedItems[index]} // checkedItems 배열을 사용하여 체크 상태 설정
                  onChange={() => handleIconClick(index)} // 변경 이벤트 처리
                ></CheckboxStyle>
              )}
            </CheckCtrl>
          </PlaylistBox>
        ))}
      </Container>
    </Background>
  );
}

export default index;
