//import React from 'react';
import googleLogo from '../../assets/googlelogo.png'; // 이미지 경로 가져오기

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left', // 왼쪽 정렬로 수정
  padding: '10px',
  width: '805.62px', // !important 추가
  height: '105.08px', // !important 추가
  cursor: 'pointer',
  background: 'var(--gray-bright-color)', // CSS 변수 사용
  border: '1px solid  var(--gray-light-color)', // 다른 CSS 변수 사용 예시
  borderRadius: '8px',
  boxShadow: 'var(--box-shadow-color)',
  fontSize: '36px',
  marginTop: '20px',
};

const iconStyle = {
  marginRight: '8px',
};

const textStyle = {
  fontSize: '36px', // 원하는 폰트 크기로 수정
  fontWeight: 'bold',
};

// 로그인 버튼 컴포넌트 정의
const LoginButton = ({ onClick }) => {
  return (
    <div>
      {/* 부모 요소로 감싸기 */}
      <span style={textStyle}>Google 계정으로 시작하기</span>
      <button style={buttonStyle} onClick={onClick}>
        <img src={googleLogo} alt="Google Icon" style={iconStyle} width="80" height="80" />
        <span style={textStyle}>Google</span> {/*백엔드 소셜 로그인 연동*/}
      </button>
    </div>
  );
};

export default LoginButton;
