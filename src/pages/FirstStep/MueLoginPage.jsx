import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import LoginButton from './GoogleLogin';
import Progress from './Progress';
import WelcomeMessage from './Intro';

// 스타일 정의
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
  left: '1000px', // Progress 컴포넌트의 x좌표 (조정 필요)
  top: '174px', // Progress 컴포넌트의 y좌표
};

const loginButtonStyle = {
  position: 'absolute',
  left: '1000px', // LoginButton 컴포넌트의 x좌표 (조정 필요)
  top: '402px', // LoginButton 컴포넌트의 y좌표
};

const LoginPage = () => {
  const [step] = useState(1);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const handleLogin = () => {
    // 로그인 로직 처리를 해야 하는데 일단은 페이지 리다이렉트로 효과 줌
    console.log('Login with Google');
    navigate('/EmotionBoard'); // '/EmotionBoard' 페이지로 이동
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <WelcomeMessage />
      </div>
      <div style={progressStyle}>
        <Progress currentStep={step} />
      </div>
      <div style={loginButtonStyle}>
        <LoginButton onClick={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
