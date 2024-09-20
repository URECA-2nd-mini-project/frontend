import React from 'react'; // eslint-disable-line no-unused-vars

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '40px', // 세로 위치 설정
  marginLeft: '255px', // 가로 방향으로 오른쪽 30px 이동
};

const circleStyle = (isActive) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: isActive ? 'var(--secondary-color)' : 'var(--gray-light-color)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  margin: '0 10px',
});

const lineStyle = {
  width: '50px',
  height: '4px',
  backgroundColor: '#ddd',
};

// 진행 상황을 나타내는 Progress 컴포넌트
const Progress = ({ selectedCount }) => {
  return (
    <div style={containerStyle}>
      <div style={circleStyle(true)}>1</div> {/* 첫 번째 단계는 항상 선택됨 */}
      <div style={lineStyle}></div>
      <div style={circleStyle(selectedCount === 5)}>2</div> {/* 5개 선택 시 2번 단계 색칠 */}
    </div>
  );
};

export default Progress;
