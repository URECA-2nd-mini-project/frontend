import { useSelector } from 'react-redux'; // Redux에서 사용자 정보 가져오기

const AccountSummary = () => {
  // useSelector를 사용하여 Redux 상태에서 사용자 정보를 가져옴
  const { userInfo } = useSelector((state) => state.user);

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
            src={userInfo.photoUrl} // 로그인한 사용자의 프로필 이미지
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
              {userInfo.gmail} {/* 로그인한 사용자의 이메일 */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
