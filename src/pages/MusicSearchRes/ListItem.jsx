// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

// YouTube API 호출 함수
async function fetchYouTubeData(query) {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
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

  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.default.url,
    channelTitle: item.snippet.channelTitle,
  }));
}

const SearchAndResult = () => {
  const [inputText, setInputText] = useState('');
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setQuery(inputText); // 검색어 설정
    }
  };

  useEffect(() => {
    async function getData() {
      if (query) {
        setLoading(true);
        const videoData = await fetchYouTubeData(query);
        setVideos(videoData);
        setLoading(false);
      }
    }
    getData();
  }, [query]);

  return (
    <div>
      {/* 검색 입력 */}
      <div>
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={handleSearch} placeholder="검색어를 입력하세요" />
      </div>

      {/* 로딩 표시 */}
      {loading && <div>Loading...</div>}

      {/* 검색 결과 표시 */}
      <div style={searchResultContainerStyle}>
        <h2>검색 결과</h2>
        <div style={listStyle}>
          {videos.map((video, index) => (
            <div key={index} style={itemStyle}>
              <img src={video.thumbnail} alt={video.title} style={thumbnailStyle} />
              <div style={textContainerStyle}>
                <h3 style={titleStyle}>{video.title}</h3>
                <p style={artistStyle}>{video.channelTitle.slice(0, -7)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 스타일 정의는 동일하게 유지
const searchResultContainerStyle = { marginTop: '20px', width: '100%' };
const listStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
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

export default SearchAndResult;
