import styled from 'styled-components';
import PlayRound from '../../assets/icons/play-round.svg?react';
import { useDispatch } from 'react-redux';
import { setMusic } from '../../redux/musicSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: calc(108px - 40px);
  padding: 20px 36px 20px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 2px var(--box-shadow-color);
`;

const CoverImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 4px;
  object-fit: cover;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 4px;
  white-space: nowrap;
`;

const TitleText = styled.div`
  color: var(--gray-dark-color);
  font-size: 18px;
  font-weight: 500;
`;

const ArtistText = styled.div`
  color: var(--gray-medium-color);
  font-size: 16px;
  font-weight: 400;
`;

const MusicItem = ({ musicId, title, artist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const musicData = {
      musicId: musicId,
      title: title,
      artist: artist,
    };

    // dispatch로 store에 현재 재생중인 음악 상태 및 인덱스 업데이트
    dispatch(setMusic([musicData]));
    navigate(`/music/${musicId}/${title}/${artist}`);
  };

  return (
    <Container>
      <LeftContainer>
        <CoverImg src={`https://img.youtube.com/vi/${musicId}/maxresdefault.jpg`} referrerPolicy="no-referrer"></CoverImg>
        <TitleContainer>
          <TitleText>{title}</TitleText>
          <ArtistText>{artist}</ArtistText>
        </TitleContainer>
      </LeftContainer>
      <div onClick={handleButtonClick}>
        <PlayRound></PlayRound>
      </div>
    </Container>
  );
};

export default MusicItem;
