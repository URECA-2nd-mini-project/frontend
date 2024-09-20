import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import Progress from '../FirstStep/Progress';
import WelcomeMessage from '../FirstStep/Intro';
import EmotionTags from './Emotion'; // Emotion 태그 컴포넌트 가져오기
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  position: 'relative',
  height: '100vh',
  padding: '20px',
};

const messageStyle = {
  position: 'absolute',
  left: '0px', // WelcomeMessage를 왼쪽에 고정
  top: '50%',
  transform: 'translateY(-50%)',
};

const progressStyle = {
  position: 'absolute',
  left: '1205px', // Progress 컴포넌트의 x좌표 (조정 필요)
  top: '163px', // Progress 컴포넌트의 y좌표
};

const textStyle = {
  fontSize: '36px', // 어떤 감정에 관심 있나요? 텍스트의 폰트 크기
  color: '#000', // 검은색
  marginTop: '350px', // 원하는 marginTop 값 설정
  marginLeft: '255px', // 가로 방향으로 오른쪽 30px 이동
  fontWeight: 'bold',
  textAlign: 'center', // 중앙 정렬
};

const subTextStyle = {
  fontSize: '32px', // 5개를 골라 주세요 텍스트의 폰트 크기
  color: 'var(--gray-medium-color)', // var(--gray-medium-color) 색상 적용
  marginTop: '10px', // 원하는 marginTop 값 설정
  marginLeft: '255px', // 가로 방향으로 오른쪽 30px 이동
  textAlign: 'center', // 중앙 정렬
};

const emotionBoardStyle = {
  position: 'absolute',
  left: '1280px', // EmotionBoard의 x좌표 (조정 필요)
  top: '503x', // EmotionBoard의 y좌표
  display: 'flex',
  flexDirection: 'column',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '0', // 패딩을 0으로 설정하여 직접적인 width/height 값을 적용
  width: '442px', // 가로 길이 설정
  height: '72px', // 세로 길이 설정
  borderRadius: '30px',
  backgroundColor: 'var(--secondary-color)', // secondary-color로 배경색 지정
  color: 'white', // secondary-light-color로 텍스트 색상 지정
  border: 'none',
  cursor: 'pointer',
  fontSize: '28px',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'none', // 기본적으로 숨겨진 상태
};

const EmotionBoard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const toggleTag = (emotion) => {
    if (selectedTags.includes(emotion)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== emotion)); // 선택 해제
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, emotion]); // 최대 5개 선택 가능
      }
    }
  };

  const handleGoHome = () => {
    console.log('홈으로 이동하기 클릭됨');
    navigate('/'); // 홈으로 이동
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <WelcomeMessage />
      </div>
      <div style={progressStyle}>
        <Progress selectedCount={selectedTags.length} /> {/* 선택된 감정 개수를 전달 */}
      </div>
      <div>
        <p style={textStyle}>어떤 감정에 관심 있나요?</p> {/* 첫 번째 텍스트 */}
        <p style={subTextStyle}>5개를 골라 주세요</p> {/* 두 번째 텍스트 */}
      </div>
      <div style={emotionBoardStyle}>
        <EmotionTags selectedTags={selectedTags} toggleTag={toggleTag} /> {/* 감정 태그 컴포넌트 추가 */}
        {selectedTags.length === 5 && (
          <button style={{ ...buttonStyle, display: 'block' }} onClick={handleGoHome}>
            홈으로 이동하기
          </button>
        )}
      </div>
    </div>
  );
};

export default EmotionBoard;
