import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ContentRestriction = () => {
  // On/Off 상태를 관리하기 위한 useState 훅 사용
  const [isOn, setIsOn] = useState(false);

  // 버튼 클릭 시 상태를 토글하는 함수
  const handleToggle = () => {
    setIsOn(!isOn); // 상태를 반전시킴 (On -> Off, Off -> On)
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>유해 콘텐츠 차단</h2>
      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
        }}
      >
        {/* 아이콘을 버튼으로 만들고 상태에 따라 아이콘 변경 */}
        <button
          onClick={handleToggle}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0', marginRight: '27px' }}
        >
          <FontAwesomeIcon
            icon={isOn ? faCheckCircle : faTimesCircle} // 상태에 따라 아이콘 변경
            style={{ color: isOn ? '#57C4A9' : '#FF6B6B', fontSize: '24px' }} // 상태에 따라 색상 변경
          />
        </button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <p>콘텐츠 제한</p>
            <p>선택한 연령 등급까지의 콘텐츠만 허용합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRestriction;
