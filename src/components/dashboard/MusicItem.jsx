import styled from 'styled-components';
import PlayRound from '../../assets/icons/play-round.svg?react';

const Container = styled.div`
  width: calc(520px - 48px);
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

const MusicItem = () => {
  return (
    <Container>
      <LeftContainer>
        <CoverImg src={'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg'}></CoverImg>
        <TitleContainer>
          <TitleText>Supernova</TitleText>
          <ArtistText>aespa</ArtistText>
        </TitleContainer>
      </LeftContainer>
      <div onClick={null}>
        <PlayRound></PlayRound>
      </div>
    </Container>
  );
};

export default MusicItem;
