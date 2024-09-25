/*
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

// API 호출 함수 (이미 구현한 fetch 함수 사용)
async function fetchYouTubeData(query) {
  const API_KEY = 'AIzaSyCFGxl41KU00GjXpor3oUj6TjIbPXJp7zo'; // 본인의 YouTube API 키
  const API_URL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: 10,
    q: `${query} auto-generated`, // 검색 키워드에 'auto-generated' 추가
    type: 'video',
    key: API_KEY,
  });

  const response = await fetch(`${API_URL}?${params}`);
  const data = await response.json();

  const videoItems = data.items.map((item) => ({
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.default.url, // 썸네일 URL
    channelTitle: item.snippet.channelTitle,
  }));

  return videoItems;
}

const ListenItemList = ({ query }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const videoData = await fetchYouTubeData(query);
      setVideos(videoData);
      setLoading(false);
    }

    getData();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
//가수 이름 - topic로 나와서 강제로 슬라이싱 채널명에서 마지막 7글자 자르기 
  return (
    <div style={searchResultContainerStyle}>
      <h2>검색 결과</h2>
      <div style={listStyle}>
        {videos.map((video) => (
          <div key={video.videoId} style={itemStyle}>
            <img src={video.thumbnail} alt={video.title} style={thumbnailStyle} />
            <div style={textContainerStyle}>
              <h3 style={titleStyle}>{video.title}</h3>
              <p style={artistStyle}>{video.channelTitle.slice(0, -7)}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 스타일 정의
const searchResultContainerStyle = {
  marginTop: '20px',
  width: '100%',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const thumbnailStyle = {
  width: '120px',
  height: '90px',
  borderRadius: '4px',
};

const textContainerStyle = {
  marginLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const artistStyle = {
  fontSize: '14px',
  color: '#666',
  margin: '5px 0 0',
};

export default ListenItemList;


// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMusic } from '../../redux/musicSlice'; // 음악 상태 업데이트용 액션

// YouTube API 호출 함수
async function fetchYouTubeData(query) {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // API_KEY 환경 변수에서 불러오기
  const API_URL = 'https://www.googleapis.com/youtube/v3/search';

  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: 10,
    q: `${query} auto-generated`, // 검색 키워드
    type: 'video',
    key: API_KEY,
  });

  const response = await fetch(`${API_URL}?${params}`);
  const data = await response.json();

  const videoItems = data.items.map((item) => ({
    id: item.id.videoId, // 비디오 ID 추가
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.default.url,
    channelTitle: item.snippet.channelTitle,
  }));

  return videoItems;
}

const ListenItemList = ({ query }) => {
  const [videos, setVideos] = useState([]); // 비디오 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const dispatch = useDispatch(); // Redux 액션을 디스패치하기 위한 훅

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const videoData = await fetchYouTubeData(query);
      setVideos(videoData);
      setLoading(false);
    }

    if (query) {
      getData(); // 검색어가 있을 때만 API 호출
    }
  }, [query]);

  // 선택한 비디오를 플레이하거나 저장하는 함수
  const handleSelectVideo = (video) => {
    const musicData = {
      id: video.id,
      title: video.title,
      artist: video.channelTitle.slice(0, -7), // 채널명 슬라이싱
    };
    dispatch(setMusic(musicData)); // 선택한 음악을 Redux store에 저장
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div style={searchResultContainerStyle}>
      <h2>검색 결과</h2>
      <div style={listStyle}>
        {videos.map((video, index) => (
          <div key={index} style={itemStyle} onClick={() => handleSelectVideo(video)}>
            {' '}
            <img src={video.thumbnail} alt={video.title} style={thumbnailStyle} />
            <div style={textContainerStyle}>
              <h3 style={titleStyle}>{video.title}</h3>
              <p style={artistStyle}>{video.channelTitle.slice(0, -7)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 스타일 정의
const searchResultContainerStyle = {
  marginTop: '20px',
  width: '100%',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer', // 클릭 가능하게 설정
};

const thumbnailStyle = {
  width: '120px',
  height: '90px',
  borderRadius: '4px',
};

const textContainerStyle = {
  marginLeft: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const artistStyle = {
  fontSize: '14px',
  color: '#666',
  margin: '5px 0 0',
};

export default ListenItemList;
*/

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
