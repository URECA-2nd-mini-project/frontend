import styled from 'styled-components';
import MusicItem from '../../components/dashboard/MusicItem';
import MusicMenu from '../../assets/icons/menu-music.svg?react';
import MusicAlt from '../../assets/icons/music-alt.svg?react';

const Container = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  padding: 0px 100px 0px 200px;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const MusicInfo = styled.div`
  width: 380px;
  height: calc(640px - 96px);
  margin: 8px;
  padding: 40px 48px;
  border-radius: 8px;
  color: fff;
  box-shadow: 0px 0px 8px 2px var(--box-shadow-color);
`;

const ThumbnailImg = styled.img`
  width: 360px;
  height: 360px;
  border-radius: 8px;
  object-fit: cover;
`;

const TitleText = styled.div`
  margin-top: 32px;
  color: var(--gray-dark-color);
  font-size: 22px;
  font-weight: 600;
`;

const ArtistText = styled.div`
  margin-top: 8px;
  color: var(--gray-medium-color);
  font-size: 18px;
  font-weight: 500;
`;

const MusicLyrics = styled.div`
  width: calc(640px - 128px);
  height: calc(640px - 160px);
  padding: 64px 80px;
  overflow-y: auto;
  font-size: 32px;
  font-weight: 600;
  color: var(--gray-dark-color);
`;

const ActionBtn = styled.div`
  width: 240px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: 500;
  color: var(--gray-light-color);
`;

const Index = () => {
  return (
    <Container>
      <MusicInfo>
        <ThumbnailImg src={'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg'}></ThumbnailImg>
        <TitleText>한걸음 더</TitleText>
        <ArtistText>윤상</ArtistText>
        <div>
          <ActionBtn>
            <MusicMenu></MusicMenu>
            <div>플레이리스트에 저장하기</div>
          </ActionBtn>
          <ActionBtn>
            <MusicAlt></MusicAlt>
            <div>감정 기록하기</div>
          </ActionBtn>
        </div>
      </MusicInfo>
      <MusicLyrics></MusicLyrics>
    </Container>
  );
};

export default Index;
