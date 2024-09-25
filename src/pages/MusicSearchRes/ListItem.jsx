// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// YouTube API 호출 함수
async function fetchYouTubeData(keyword) {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const API_URL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: 10,
    q: `${keyword} auto-generated`, // keyword를 기반으로 검색
    type: 'video',
    key: API_KEY,
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);
    const data = await response.json();
    console.log('API Response:', data); // API 응답 데이터를 출력

    return data.items.map((item) => {
      console.log('Item:', item); // 각 item의 구조 확인
      return {
        id: item.id.videoId, // item.id.videoId가 null일 때 확인
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        // ' - Topic'을 제거하여 가수 이름만 반환
        channelTitle: item.snippet.channelTitle.replace(' - Topic', ''),
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return []; // 에러가 발생하면 빈 배열 반환
  }
}

const ListenItemList = () => {
  const { keyword } = useParams(); // URL에서 'keyword' 값을 받아옴
  console.log('Keyword from URL:', keyword); // keyword를 확인

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      if (keyword) {
        setLoading(true);
        const videoData = await fetchYouTubeData(keyword); // keyword로 YouTube API 호출
        setVideos(videoData || []); // 비디오 데이터가 undefined일 경우 빈 배열로 설정
        setLoading(false);
      }
    }
    getData();
  }, [keyword]); // keyword 값이 바뀔 때마다 데이터를 다시 가져옴

  if (loading) return <div>Loading...</div>;

  // videos가 비어있지 않으면 map()을 호출
  return (
    <div style={scrollableContainerStyle}>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index} style={itemStyle}>
            <img src={video.thumbnail} alt={video.title} style={thumbnailStyle} />
            <div style={textContainerStyle}>
              <h3 style={titleStyle}>{video.title}</h3>
              <p style={artistStyle}>{video.channelTitle}</p> {/* ' - Topic'이 제거된 가수 이름 */}
            </div>
          </div>
        ))
      ) : (
        <div>No videos found</div> // 비디오가 없을 경우 처리
      )}
    </div>
  );
};

// 스타일 정의
const scrollableContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxHeight: '750px', // 최대 높이 설정을 늘려서 6개 표시 가능
  overflowY: 'auto', // 세로 스크롤 활성화
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};

const thumbnailStyle = { width: '120px', height: '90px', borderRadius: '4px' };
const textContainerStyle = { marginLeft: '20px', display: 'flex', flexDirection: 'column' };
const titleStyle = { fontSize: '18px', fontWeight: 'bold', margin: '0' };
const artistStyle = { fontSize: '14px', color: '#666', margin: '5px 0 0' };

export default ListenItemList;
