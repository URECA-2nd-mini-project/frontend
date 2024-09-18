import React, { useState } from 'react';
import styled from 'styled-components';
import PlayDetail from '../../assets/icons/list-detail.svg?react';
import PlayList from '../../assets/icons/playlist.svg?react';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import ListOrder from '../../assets/icons/menu-burger.svg?react';
import CheckBox from '../../assets/icons/checkbox.svg?react';
import Checked from '../../assets/icons/checkedbox.svg?react';

const Background = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
const Playlistbar = styled.div`
  width: 720px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PlaylistTitle = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
  font-size: 20px;
`;

const Content = styled.div`
  font-size: 18px;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
`;

const TagBg = styled.div`
  border-radius: 40px;
  border:
    1px solid,
    var(--gray-medium-color);
  padding: 10px 2px;
  margin: 3px;
  width: 80px;
  text-align: center;
  color: var(--gray-medium-color);
  font-size: 18px;
  font-weight: bold;
`;

const CheckIcon = styled(CheckBox)`
  margin-right: 10px;
`;

const CheckedIcon = styled(Checked)`
  margin-right: 10px;
`;

const CheckCtrl = styled.div``;

function index(props) {
  const [detailButton, setDetailButton] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const [currentIcon, setCurrentIcon] = useState('check');

  function handleClick() {
    setDetailButton((prev) => !prev);
    setCheckBox((prev) => !prev);
  }

  function handleIconClick() {
    setCurrentIcon((prev) => !prev);
  }

  return (
    <Background>
      <Container>
        <Playlistbar>
          <PlayList></PlayList>
          <PlaylistTitle>모든 플레이리스트</PlaylistTitle>
          {detailButton ? (
            <PlayDetail onClick={handleClick}></PlayDetail>
          ) : (
            <>
              <TagBg onClick={handleClick}>삭제</TagBg>
              <TagBg onClick={handleClick} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                저장
              </TagBg>
            </>
          )}
        </Playlistbar>
        <PlaylistBox>
          <MusicIcon></MusicIcon>
          <Content>코딩할 때 듣는 lofi</Content>
          {checkBox && <CheckCtrl onClick={handleIconClick}>{currentIcon ? <CheckIcon /> : <CheckedIcon />}</CheckCtrl>}

          <ListOrder></ListOrder>
        </PlaylistBox>
        <PlaylistBox>
          <MusicIcon></MusicIcon>
          <Content>드라이브엔 올드 시티팝</Content>
          {checkBox && <CheckCtrl onClick={handleIconClick}>{currentIcon ? <CheckIcon /> : <CheckedIcon />}</CheckCtrl>}
          <ListOrder></ListOrder>
        </PlaylistBox>
        <PlaylistBox>
          <MusicIcon></MusicIcon>
          <Content>겨울에 듣는 재즈 캐롤</Content>
          {checkBox && <CheckCtrl onClick={handleIconClick}>{currentIcon ? <CheckIcon /> : <CheckedIcon />}</CheckCtrl>}
          <ListOrder></ListOrder>
        </PlaylistBox>
      </Container>
    </Background>
  );
}

export default index;
