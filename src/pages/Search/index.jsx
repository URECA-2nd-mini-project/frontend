import styled from 'styled-components';
import MusicItem from '../../components/search/MusicItem';
import { Instance } from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Contianer = styled.div`
  width: calc(100% - 320px);
  height: 100%;
  padding: 20px 160px 200px 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Index = () => {
  const { keyword } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (keyword) {
      setLoading(true);
      searchYoutube(keyword); // keyword로 YouTube API 호출
      setLoading(false);
    }
  }, []);

  // Youtube search API 호출 함수
  const searchYoutube = async (keyword) => {
    try {
      const response = await Instance.get('/youtube/v3/search', {
        params: {
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          part: 'snippet',
          q: `${keyword} auto-generated`, // 검색 키워드
          maxResults: 30, // 최대 검색 개수
          type: 'video', // 검색 결과의 타입(비디오, 플레이리스트, 채널)
          videoEmbeddable: true, // 웹 페이지에 삽입할 수 있는 영상만 검색
          videoDuration: 'short',
        },
      });
      console.log('상태 코드 = ', response.status);
      console.log('응답 결과 = ', response.data);

      setVideos(response.data.items);
    } catch (error) {
      console.log('응답 실패 = ', error);
    }
  };

  if (loading) return <div>검색 결과 로딩중...</div>;

  return (
    <Contianer>
      {videos.map((video, index) => (
        <MusicItem key={index} title={video.snippet.title} artist={video.snippet.channelTitle.replace(/ - Topic$/, '')} musicId={video.id.videoId}></MusicItem>
      ))}
    </Contianer>
  );
};

export default Index;
