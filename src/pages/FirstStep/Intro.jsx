//import React from 'react';

// CSS 스타일 정의
const containerStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'var(--gray-medium-color)',
  color: 'var(--gray-bright-color)', // 텍스트 색상
  width: '745px', // 가로 크기 (필요에 맞게 조정 가능)
  height: '100vh', // 세로 크기 (화면의 100%를 차지)
  padding: '20px',
  textAlign: 'left',
};

const textStyle = {
  fontSize: '128px',
  lineHeight: '1.4', // 줄 간격 설정
};

const WelcomeMessage = () => {
  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        Mu:e에 <br />
        오신 걸 <br />
        환영합니다
      </div>
    </div>
  );
};

export default WelcomeMessage;
