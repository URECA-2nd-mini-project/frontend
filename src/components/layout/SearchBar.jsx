import styled from 'styled-components';
import Search from '../../assets/icons/search.svg?react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 40px;
  top: 52%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  width: 520px;
  height: 72px;
  padding: 0 72px;
  display: flex;
  border-radius: 40px;
  background: var(--gray-bright-color);
  font-size: 18px;
  font-weight: 500;
  border: none;
  outline: none;
`;

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // 특정 키워드에 대한 검색 화면으로 이동
      // 이동한 페이지 url에서는 useParams를 사용해 inputText를 받아볼 수 있음
      navigate(`/search/${inputText}`);
    }
  };

  // Youtube search API 호출 함수
  // const searchYoutube = async (keyword) => {
  //   try {
  //     const response = await Instance.get('/youtube/v3/search', {
  //       params: {
  //         key: import.meta.env.VITE_YOUTUBE_API_KEY,
  //         part: 'snippet',
  //         q: `${keyword} auto-generated`, // 검색 키워드
  //         maxResults: 1, // 최대 검색 개수
  //         type: 'video', // 검색 결과의 타입(비디오, 플레이리스트, 채널)
  //         videoEmbeddable: true, // 웹 페이지에 삽입할 수 있는 영상만 검색
  //         videoDuration: 'short',
  //       },
  //     });
  //     console.log('상태 코드 = ', response.status);
  //     console.log('응답 결과 = ', response.data);

  //     // 검색 결과를 store에 저장하고 바로 재생
  //     const video = response.data.items[0]; // 첫 번째 비디오 선택
  //     const musicData = {
  //       id: video.id.videoId,
  //       title: video.snippet.title,
  //       artist: video.snippet.channelTitle, // 채널명을 아티스트로 사용
  //     };

  //     // dispatch로 store에 현재 재생중인 음악 상태 업데이트
  //     dispatch(setMusic(musicData));
  //   } catch (error) {
  //     console.log('응답 실패 = ', error);
  //   }
  // };

  return (
    <Container>
      <SearchIcon>
        <Search></Search>
      </SearchIcon>
      <Input placeholder="가수, 곡 제목으로 검색하기" value={inputText} onChange={handleInputChange} onKeyPress={handleKeyPress}></Input>
    </Container>
  );
};

export default SearchBar;
