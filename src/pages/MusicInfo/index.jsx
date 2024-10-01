import styled from 'styled-components';
import MusicMenu from '../../assets/icons/menu-music.svg?react';
import MusicAlt from '../../assets/icons/music-alt.svg?react';
import { useState } from 'react';
import AddPlaylistCard from '../../components/musicInfo/AddPlaylistCard';
import AddEmotionCard from '../../components/musicInfo/AddEmotionCard';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  padding: 0px 200px 160px 200px;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const MusicInfo = styled.div`
  width: 360px;
  height: calc(640px - 48px);
  margin: 8px;
  padding: 40px 48px;
  border-radius: 8px;
  background-color: #fff;
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

const BtnContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActionBtn = styled.button`
  width: 240px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  background-color: #fff;
  border: none;
  color: ${(props) => (props.selected ? 'var(--secondary-color)' : 'var(--gray-medium-color)')};
`;

const Index = () => {
  const { title, artist, musicId } = useParams();
  const [selected, setSelected] = useState('add-emotion');
  const music = {
    musicId: musicId,
    title: title,
    artist: artist,
  };

  const handleActionButtionClick = (event) => {
    const value = event.currentTarget.dataset.value;

    if (selected === value) {
      setSelected('lyrics');
    } else {
      setSelected(value);
    }
  };

  const Card = () => {
    switch (selected) {
      case 'add-playlist':
        return <AddPlaylistCard music={music}></AddPlaylistCard>;
      case 'add-emotion':
        return <AddEmotionCard music={music}></AddEmotionCard>;
    }
  };

  return (
    <Container>
      <MusicInfo>
        <ThumbnailImg src={`https://img.youtube.com/vi/${musicId}/maxresdefault.jpg`}></ThumbnailImg>
        <TitleText>{title}</TitleText>
        <ArtistText>{artist}</ArtistText>
        <BtnContainer>
          <ActionBtn data-value="add-emotion" onClick={handleActionButtionClick} selected={selected === 'add-emotion'}>
            <MusicAlt fill={selected === 'add-emotion' ? 'var(--secondary-color)' : 'var(--gray-medium-color)'}></MusicAlt>
            <div>감정 기록하기</div>
          </ActionBtn>
          <ActionBtn data-value="add-playlist" onClick={handleActionButtionClick} selected={selected === 'add-playlist'}>
            <MusicMenu fill={selected === 'add-playlist' ? 'var(--secondary-color)' : 'var(--gray-medium-color)'}></MusicMenu>
            <div>플레이리스트에 저장하기</div>
          </ActionBtn>
        </BtnContainer>
      </MusicInfo>
      <Card></Card>
    </Container>
  );
};

export default Index;
