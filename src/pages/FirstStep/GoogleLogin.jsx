import googleLogo from '../../assets/googlelogo.png'; // 이미지 경로 가져오기

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left', // 왼쪽 정렬로 수정
  padding: '10px',
  width: '805.62px',
  height: '105.08px',
  cursor: 'pointer',
  background: 'var(--gray-bright-color)', // CSS 변수 사용
  border: '1px solid  var(--gray-light-color)', // 다른 CSS 변수 사용 예시
  borderRadius: '8px',
  boxShadow: 'var(--box-shadow-color)',
  fontSize: '36px',
  marginTop: '20px',
  textDecoration: 'none', // a 태그의 기본 스타일 제거
  color: 'inherit', // 텍스트 색상 상속
};

const iconStyle = {
  marginRight: '8px',
};

const textStyle = {
  fontSize: '36px', // 원하는 폰트 크기로 수정
  fontWeight: 'bold',
};

// 로그인 버튼 컴포넌트 정의
const LoginButton = () => {
  return (
    <div>
      {/* 부모 요소로 감싸기 */}
      <span style={textStyle}>Google 계정으로 시작하기</span>
      <a href="http://localhost:8080/oauth2/authorization/google" style={buttonStyle}>
        <img src={googleLogo} alt="Google Icon" style={iconStyle} width="80" height="80" />
        <span style={textStyle}>Google</span>
      </a>
    </div>
  );
};

export default LoginButton;
