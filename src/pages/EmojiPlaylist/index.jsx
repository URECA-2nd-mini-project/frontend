import React, { useState } from 'react';
import styled from 'styled-components';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import MusicList from '../../components/dashboard/MusicList';

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

const TagBg = styled.button`
  border-radius: 40px;
  border:
    1px solid,
    var(--gray-bright-color);
  padding: 15px;
  margin: 3px;
  text-align: center;
  font-size: 18px;
  color: var(--gray-medium-color);
  background-color: var(--gray-bright-color);
  &:hover {
    background: #def2ec;
  }
  &:active {
    background: #def2ec;
    color: var(--secondary-color);
    font-weight: bold;
  }
`;
const Tagbtn = styled.button`
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
const SelectTag = styled.div`
  border-radius: 40px;
  border:
    1px solid,
    DEF2EC;
  padding: 15px;
  margin: 3px;
  background-color: #def2ec;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: var(--secondary-color);
`;

const DetailePoint = styled(PlayDetailIcon)`
  cursor: pointer;
`;

const EmojiBox = styled.div`
  border:
    1px solid,
    none;
  padding-bottom: 40px;
`;
const EmojiTagRow = styled.div`
  display: flex;
  flex-derection: row;
  align-items: center;
  justify-content: center;
`;

const TagMsg = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const TagBar = styled.div`
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
`;

const PlayBg = styled.div`
  width: 600px;
  background-color: var(--gray-bright-color);
  border:
    1px solid,
    var(--gray-bright-color);
  border-radius: 8px;
  padding: 20px 50px;
`;

function index(props) {
  const [detailButton, setDetailButton] = useState(true);

  const handleClick = () => {
    setDetailButton((prev) => !prev);
    setCheckBox((prev) => !prev);
  };
  //음악 삭제
  const handleClickDelete = () => {
    console.log(playlists);
    setPlaylists((prev) => prev.filter((_, index) => !checkedItems[index]));
    setCheckedItems(Array(playlists.length).fill(false)); // 체크 상태
    console.log(playlists);
  };

  // 음악 수정 후 저장
  const handleClickSave = () => {
    setDetailButton((prev) => !prev);
    setCheckBox((prev) => !prev);
  };
  return (
    <Background>
      <Container>
        <EmojiBox>
          <TagMsg>😎 듣고싶은 감정 태그를 클릭해보세요!</TagMsg>
          <EmojiTagRow>
            <SelectTag>#행복</SelectTag>
            <TagBg>#즐거움</TagBg>
            <TagBg>#지루함</TagBg>
            <TagBg>#슬픔</TagBg>
            <TagBg>#우울함</TagBg>
          </EmojiTagRow>
          <EmojiTagRow>
            <TagBg>#즐거움</TagBg>
            <TagBg>#지루함</TagBg>
            <TagBg>#슬픔</TagBg>
            <TagBg>#우울함</TagBg>
            <TagBg>#슬픔</TagBg>
            <TagBg>#지루함</TagBg>
          </EmojiTagRow>
        </EmojiBox>
        <div>
          <TagBar>
            <SelectTag>#행복</SelectTag>
            {detailButton ? (
              <DetailePoint onClick={handleClick}></DetailePoint>
            ) : (
              <div>
                <Tagbtn onClick={handleClickDelete}>삭제</Tagbtn>
                <Tagbtn onClick={handleClickSave} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                  저장
                </Tagbtn>
              </div>
            )}
          </TagBar>
          <PlayBg>
            <MusicList></MusicList>
            <MusicList></MusicList>
            <MusicList></MusicList>
            <MusicList></MusicList>
            <MusicList></MusicList>
            <MusicList></MusicList>
          </PlayBg>
        </div>
      </Container>
    </Background>
  );
}

export default index;
