import { useState, useEffect } from 'react';

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

const TypingTitle = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [count, setCount] = useState(0);
  const completionWords = ['Mu:e에', '오신 걸', '환영합니다']; // 세 줄 텍스트
  const [currentLine, setCurrentLine] = useState(0); // 현재 줄 번호

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setBlogTitle((prevTitleValue) => {
        let result = prevTitleValue ? prevTitleValue + completionWords[currentLine][count] : completionWords[currentLine][0];

        setCount(count + 1);

        if (count >= completionWords[currentLine].length) {
          setCount(0);

          // 모든 줄을 다 출력한 경우 초기화
          if (currentLine >= completionWords.length - 1) {
            setCurrentLine(0);
            setBlogTitle(''); // 모든 줄 출력 후 초기화
          } else {
            setCurrentLine(currentLine + 1); // 다음 줄로 넘어감
            setBlogTitle(prevTitleValue + '\n'); // 줄 바꿈 추가
          }
        }

        return result;
      });
    }, 300);

    return () => {
      clearInterval(typingInterval);
    };
  }, [count, currentLine]); // count와 currentLine에 의존

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        {blogTitle.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default TypingTitle;
