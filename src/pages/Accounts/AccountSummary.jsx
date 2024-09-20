const AccountSummary = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2
        style={{
          color: 'var(--gray-dark-color)', // "계정 요약" 색상 지정
        }}
      >
        계정 요약
      </h2>
      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: 'var(--box-shadow-color)', // 그림자 효과 추가
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://i.pinimg.com/originals/c5/ae/3a/c5ae3a02a869f7381797046f59854d54.jpg"
            alt="User profile"
            style={{
              borderRadius: '50%',
              marginRight: '10px',
              width: '72px',
              height: '72px',
            }} // 이미지 크기 조정
          />
          <div>
            <p
              style={{
                color: 'var(--gray-dark-color)', // "Google 계정" 색상 지정
                fontWeight: 'bold', // 볼드체 추가
              }}
            >
              Google 계정
            </p>
            <p
              style={{
                color: 'var(--gray-medium-color)', // 이메일 주소 색상 지정
              }}
            >
              y0uaremysumm2r@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
