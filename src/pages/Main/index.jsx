import styled from 'styled-components';
import MusicItem from '../../components/dashboard/MusicItem';

const Container = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  padding: 0px 100px 200px 80px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Heading = styled.div`
  color: var(--gray-dark-color);
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: row;
  white-space: no-wrap;
  gap: 20px;
  overflow-x: scroll;
`;

const EmotionTagCard = styled.div`
  width: 248px;
  height: 300px;
  display: inline-block;
  padding: 20px 20px 32px 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 2px var(--box-shadow-color);

  font-size: 20px;
  font-weight: 600;
  color: var(--primary-color);
`;

const EmotionTagCover = styled.div`
  width: 248px;
  height: calc(328px - 80px);
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-flow: wrap;
`;

const ThumbnailImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 2px;
  object-fit: cover;
`;

const MusicWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 132px;
`;

const MusicListContainer = styled.div``;

const MusicList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding-top: 20px;
  gap: 8px;
`;

// NOTE) 카드 더미 데이터, 서버 구현 후 수정 필요
const cardDummyData = [
  {
    emotion: '즐거움',
    thumbnails: [
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
    ],
  },
  {
    emotion: '슬픔',
    thumbnails: [
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
    ],
  },
  {
    emotion: '기쁨',
    thumbnails: [
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
    ],
  },
  {
    emotion: '우울',
    thumbnails: [
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
    ],
  },
  {
    emotion: '우울',
    thumbnails: [
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
    ],
  },
  {
    emotion: '우울',
    thumbnails: [
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
      'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg',
    ],
  },
];

const Index = () => {
  return (
    <Container>
      <Heading>감정 태그별 음악</Heading>
      <CardContainer>
        {cardDummyData.map((item, index) => (
          <EmotionTagCard key={index}>
            <EmotionTagCover>
              {item.thumbnails.map((thumbnail, index) => (
                <ThumbnailImg key={index} src={thumbnail} referrerPolicy="no-referrer"></ThumbnailImg>
              ))}
            </EmotionTagCover>
            {`# ${item.emotion}`}
          </EmotionTagCard>
        ))}
      </CardContainer>
      <MusicWrapper>
        <MusicListContainer>
          <Heading>국내 인기 음악</Heading>
          <MusicList>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
          </MusicList>
        </MusicListContainer>
        <MusicListContainer>
          <Heading>최근 재생한 음악</Heading>
          <MusicList>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
            <MusicItem></MusicItem>
          </MusicList>
        </MusicListContainer>
      </MusicWrapper>
    </Container>
  );
};

export default Index;
