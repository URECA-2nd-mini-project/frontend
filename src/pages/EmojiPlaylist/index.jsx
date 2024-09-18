import React from 'react';
import styled from 'styled-components';
import PalyButton from '../../assets/icons/play-button.svg?react';
import PlayDetail from '../../assets/icons/list-detail.svg?react';
import AlbumIcon from '../../assets/icons/album.svg?react';

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

const TagBg = styled.div`
  border-radius: 40px;
  border:
    1px solid,
    var(--gray-bright-color);
  padding: 10px 2px;
  margin: 3px;
  background-color: var(--gray-bright-color);
  width: 80px;
  text-align: center;
  color: var(--gray-medium-color);
`;

const SelectTag = styled.div`
  border-radius: 40px;
  border:
    1px solid,
    DEF2EC;
  padding: 10px 2px;
  margin: 3px;
  background-color: #def2ec;
  width: 80px;
  text-align: center;
  font-weight: bold;
  color: var(--secondary-color);
`;

const EmojiAll = styled.div`
  border:
    1px solid,
    none;
  margin: 30px;
`;
const EmojiTagBox = styled.div`
  display: flex;
  flex-derection: row;
  align-items: center;
  justify-content: center;
`;

const TagMsg = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 7px;
  margin-top: 30px;
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

function index(props) {
  return (
    <Background>
      <Container>
        <EmojiAll>
          <TagMsg>😎 듣고싶은 감정 태그를 클릭해보세요!</TagMsg>
          <EmojiTagBox>
            <SelectTag>#행복</SelectTag>
            <TagBg>#즐거움</TagBg>
            <TagBg>#지루함</TagBg>
            <TagBg>#슬픔</TagBg>
            <TagBg>#우울함</TagBg>
          </EmojiTagBox>
          <EmojiTagBox>
            <TagBg>#즐거움</TagBg>
            <TagBg>#지루함</TagBg>
            <TagBg>#슬픔</TagBg>
            <TagBg>#우울함</TagBg>
            <TagBg>#슬픔</TagBg>
            <TagBg>#지루함</TagBg>
          </EmojiTagBox>
        </EmojiAll>
        <div>
          <TagBar>
            <SelectTag>#행복</SelectTag>
            <PlayDetail></PlayDetail>
          </TagBar>
          <PlayBg>
            <PlayBox>
              <Album>
                <AlbumIcon></AlbumIcon>
              </Album>
              <Song>
                <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                <div>유재하</div>
              </Song>
              <PalyButton></PalyButton>
            </PlayBox>
            <PlayBox>
              <Album>
                <AlbumIcon></AlbumIcon>
              </Album>
              <Song>
                <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                <div>유재하</div>
              </Song>
              <PalyButton></PalyButton>
            </PlayBox>
            <PlayBox>
              <Album>
                <AlbumIcon></AlbumIcon>
              </Album>
              <Song>
                <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                <div>유재하</div>
              </Song>
              <PalyButton></PalyButton>
            </PlayBox>
          </PlayBg>
        </div>
      </Container>
    </Background>
  );
}

export default index;
