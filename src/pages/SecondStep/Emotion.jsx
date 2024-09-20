import React, { useState } from 'react'; // eslint-disable-line no-unused-vars

// 감정 태그 스타일 정의
const tagStyle = (isSelected) => ({
  width: '217px', // 가로 길이
  height: '75px', // 세로 길이
  padding: '0', // 패딩 제거
  margin: '10px',
  borderRadius: '40px', // 둥근 모서리 유지
  backgroundColor: isSelected ? 'var(--secondary-light-color)' : 'var(--gray-bright-color)', // 선택된 감정 태그와 선택되지 않은 감정 태그의 배경색
  color: isSelected ? 'var(--secondary-color)' : 'var(--gray-medium-color)', // 선택된 감정 태그와 선택되지 않은 감정 태그의 텍스트 색상
  border: '1px solid var(--gray-bright-color)', // 테두리 색상 (일관성 있게 유지)
  cursor: 'pointer',
  fontSize: '32px',
  fontWeight: isSelected ? 'bold' : 'normal', // 선택되면 볼드체, 선택되지 않으면 기본체
  display: 'inline-block',
  textAlign: 'center', // 텍스트를 가운데로 정렬
  lineHeight: '75px', // 버튼 높이에 맞춰 텍스트 가운데 정렬
  transition: 'background-color 0.3s ease, color 0.3s ease', // 배경색과 텍스트 색상 모두 애니메이션 적용
});

const tagContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly', // 태그들 간에 고른 간격 적용
  maxWidth: '600px',
  margin: 'auto', // 가운데 정렬
};

// 태그 컴포넌트 정의
const Tag = ({ label, isSelected, onClick }) => {
  return (
    <button style={tagStyle(isSelected)} onClick={onClick}>
      # {label}
    </button>
  );
};

// 감정 태그 컴포넌트 정의
const EmotionTags = ({ selectedTags, toggleTag }) => {
  const emotions = ['행복', '기대', '분노', '우울', '사랑', '기쁨', '슬픔', '창피'];

  return (
    <div style={tagContainerStyle}>
      {emotions.map((emotion) => (
        <Tag
          key={emotion}
          label={emotion}
          isSelected={selectedTags.includes(emotion)} // 선택된 상태인지 확인
          onClick={() => toggleTag(emotion)} // 클릭 이벤트
        />
      ))}
    </div>
  );
};

export default EmotionTags;
