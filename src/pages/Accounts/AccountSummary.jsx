const AccountSummary = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>계정 요약</h2> {/* 이 부분은 상자 밖에 위치하게 됩니다 */}
      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          background: '#ffffff',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://i.pinimg.com/originals/c5/ae/3a/c5ae3a02a869f7381797046f59854d54.jpg"
            alt="User profile"
            style={{ borderRadius: '50%', marginRight: '10px', width: '72px', height: '72px' }} // 이미지 크기 조정
          />
          <div>
            <p>Google 계정</p>
            <p>y0uaremysumm2r@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
