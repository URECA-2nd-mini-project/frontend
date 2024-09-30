import styled from 'styled-components';
import MusicItem from '../../components/dashboard/MusicItem';
import { Instance } from '../../utils/axiosConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 100px 200px 80px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Heading = styled.div`
  color: var(--gray-dark-color);
  font-size: 20px;
  font-weight: 600;
  margin-left: 40px;
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 16px 20px;
  margin-left: 20px;
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
  gap: 100px;
`;

const MusicListContainer = styled.div``;

const NoDataContainer = styled.div`
  width: ${(props) => props.width || '532px'};
  height: ${(props) => props.height || '580px'};
  background-color: var(--gray-bright-color);
  color: var(--gray-light-color);
  font-size: ${(props) => props.fontSize || '20px'};
  font-weight: 500;
  margin-top: ${(props) => props.margintop || '16px'};
  margin-left: ${(props) => props.marginleft || '40px'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MusicList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding-top: 8px;
  gap: 8px;
`;

const Index = () => {
  const [mostPopularMusic, setMostPopularMusic] = useState(null);
  const [recentPlayedMusic, setRecentPlayedMusic] = useState(null);
  const [emotionPlaylist, setEmotionPlaylist] = useState(null);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  // 메인 화면에 진입 시 유저 로그인 여부 및 유저 정보를 업데이트
  const getUser = async () => {
    try {
      const response = await Instance.get('/api/user');
      console.log('상태 코드 = ', response.status);
      console.log('응답 결과 = ', response.data);

      // 현재 로그인한 유저 정보가 없는 경우
      if (response.status === 401) {
        console.log('현재 로그인한 유저 정보가 없음');
        return;
      }

      console.log(isLoggedIn);
      // 로그인한 유저 정보가 있는 경우 + 전역 상태에 정보가 없는 경우 전역 상태 업데이트
      if (response.data && !isLoggedIn) {
        console.log('로그인한 유저 정보를 업데이트');
        dispatch(setLogin(response.data));
      }
    } catch (error) {
      console.log('응답 실패 = ', error);
    }
  };

  // 감정 태그별 음악 정보를 불러옴
  const getEmotionPlaylist = async () => {
    try {
      const response = await Instance.get('/api/emotionTag/music');
      console.log('get EmotionPlaylist 상태 코드 = ', response.status);
      console.log('get EmotionPlaylist 응답 결과 = ', response.data);
      setEmotionPlaylist(response.data);
    } catch (error) {
      console.log('get EmotionPlaylist 응답 실패 = ', error);
    }
  };

  // 가장 최근에 재생한 곡 5개를 서버로부터 받아옴
  const getRecentPlayedMusic = async () => {
    try {
      const response = await Instance.get('/api/playHistory');
      console.log('get playhistory 상태 코드 = ', response.status);
      console.log('get playhistory 응답 결과 = ', response.data);

      if (response.data) {
        setRecentPlayedMusic(response.data);
      }
    } catch (error) {
      console.log('get playhistory 응답 실패 = ', error);
    }
  };

  // Youtube playlist API 호출 함수
  const getMostPopularMusic = async () => {
    try {
      const response = await Instance.get('/youtube/v3/playlistItems', {
        params: {
          key: import.meta.env.VITE_YOUTUBE_API_KEY, // YouTube API Key
          part: 'snippet', // 동영상 정보의 일부 (제목, 설명 등)
          playlistId: 'PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe', // 가져올 플레이리스트 ID
          maxResults: 5, // 가져올 동영상의 최대 개수
        },
      });

      console.log('get MostPopularMusic 상태 코드 = ', response.status);
      console.log('get MostPopularMusic 응답 결과 = ', response.data);

      // 받아온 동영상 리스트를 상태로 저장
      setMostPopularMusic(response.data.items);
    } catch (error) {
      console.log('get MostPopularMusic 응답 실패 = ', error);
    }
  };

  useEffect(() => {
    getUser();
    getRecentPlayedMusic();
    getMostPopularMusic();
    getEmotionPlaylist();
  }, []);

  return (
    <Container>
      <Heading>감정 태그별 음악</Heading>
      <CardContainer>
        {emotionPlaylist === null || emotionPlaylist.length === 0 ? (
          <NoDataContainer width="1200px" height="270px" marginleft="0px" margintop="8px">
            <div>등록한 감정 기록이 없어요.</div>
          </NoDataContainer>
        ) : (
          emotionPlaylist.map((item, index) => (
            <EmotionTagCard key={index}>
              <EmotionTagCover>
                {item.music.length === 0 ? (
                  <NoDataContainer width="320px" height="240px" marginleft="0px" margintop="0px" fontSize="16px">
                    아직 등록된 음악이 없어요.
                  </NoDataContainer>
                ) : (
                  item.music.map((item, index) => (
                    <ThumbnailImg key={index} src={`https://img.youtube.com/vi/${item.musicId}/maxresdefault.jpg`} referrerPolicy="no-referrer"></ThumbnailImg>
                  ))
                )}
              </EmotionTagCover>
              {`# ${item.emotionTag}`}
            </EmotionTagCard>
          ))
        )}
      </CardContainer>
      <MusicWrapper>
        <MusicListContainer>
          <Heading>국내 인기 음악</Heading>
          <MusicList>
            <MusicList>
              {mostPopularMusic === null ? (
                <div>정보를 받아오고 있어요.</div>
              ) : (
                mostPopularMusic.map((item, index) => (
                  <MusicItem
                    key={index}
                    musicId={item.snippet.resourceId.videoId}
                    title={item.snippet.title}
                    artist={item.snippet.videoOwnerChannelTitle.replace(/ - Topic$/, '')}
                  ></MusicItem>
                ))
              )}
            </MusicList>
          </MusicList>
        </MusicListContainer>
        <MusicListContainer>
          <Heading>최근 재생한 음악</Heading>
          {recentPlayedMusic === null || recentPlayedMusic.length === 0 ? (
            <NoDataContainer>
              <div>최근에 재생한 음악이 없어요.</div>
            </NoDataContainer>
          ) : (
            <MusicList>
              {recentPlayedMusic.map((item, index) => (
                <MusicItem key={index} musicId={item.musicId} title={item.title} artist={item.artist}></MusicItem>
              ))}
            </MusicList>
          )}
        </MusicListContainer>
      </MusicWrapper>
    </Container>
  );
};

export default Index;
