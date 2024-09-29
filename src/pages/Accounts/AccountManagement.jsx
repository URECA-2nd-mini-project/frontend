// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios'; // Axios 추가

const AccountManagement = () => {
  // 모달의 표시 여부를 관리하기 위한 상태
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 모달의 유형 (로그아웃 또는 계정 탈퇴)

  // 로그아웃 API 호출 함수
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/user/logout'); // 로그아웃 API 호출
      console.log(response.data);
      alert('로그아웃 성공');
      setShowModal(false); // 모달 닫기
    } catch (error) {
      console.error('로그아웃 실패', error); // 에러 핸들링
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 계정 탈퇴 API 호출 함수
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('/api/user'); // 계정 탈퇴 API 호출
      console.log(response.data);
      alert('계정 탈퇴 성공');
      setShowModal(false); // 모달 닫기
    } catch (error) {
      console.error('계정 탈퇴 실패', error); // 에러 핸들링
      alert('계정 탈퇴 중 오류가 발생했습니다.');
    }
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(''); // 모달 타입 초기화
  };

  // 로그아웃 버튼 클릭 시 모달을 표시하는 함수
  const handleLogoutClick = () => {
    setModalType('logout'); // 모달 타입을 'logout'으로 설정
    setShowModal(true);
  };

  // 계정 탈퇴 버튼 클릭 시 모달을 표시하는 함수
  const handleDeleteClick = () => {
    setModalType('delete'); // 모달 타입을 'delete'로 설정
    setShowModal(true);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ color: 'var(--gray-dark-color)' }}>계정 관리</h2>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogoutClick}
          style={{
            padding: '10px',
            width: '680px',
            height: '101px',
            cursor: 'pointer',
            background: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '8px 0 0', color: 'var(--gray-dark-color)', fontWeight: 'bold', fontSize: '20px' }}>로그아웃</p>
          <p style={{ margin: '8px 0 0', color: 'var(--gray-medium-color)', fontSize: '18px' }}>
            로그아웃 시 현재 세션이 종료되며, 다시 로그인해야 계정에 접근할 수 있습니다.
          </p>
        </button>
        {/* 계정 탈퇴 버튼 */}
        <button
          onClick={handleDeleteClick}
          style={{
            padding: '10px',
            width: '680px',
            height: '101px',
            cursor: 'pointer',
            background: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '8px 0 0', color: 'var(--gray-dark-color)', fontWeight: 'bold', fontSize: '20px' }}>계정 탈퇴하기</p>
          <p style={{ margin: '8px 0 0', color: 'var(--gray-medium-color)', fontSize: '18px' }}>
            탈퇴 시 작성한 감정 및 태그 정보가 삭제되며 복구되지 않습니다.
          </p>
        </button>

        {/* 모달 창 */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '345px', // 가로 크기
                height: '134px', // 세로 크기
                backgroundColor: 'var(--background-color)', // 모달 창 배경색
                padding: '20px',
                borderRadius: '18px', // cornerradius 18px
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  color: 'var(--gray-dark-color)', // 텍스트 색상
                  fontSize: '24px', // 텍스트 크기 24px
                  fontWeight: 'bold', // 볼드체
                }}
              >
                {modalType === 'logout' ? '로그아웃 하시겠습니까?' : '계정을 탈퇴하시겠습니까?'}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    width: '133px', // 가로 크기 133px
                    height: '40.23px', // 세로 크기 40.23px
                    backgroundColor: 'var(--gray-bright-color)', // 취소 버튼 배경색
                    color: 'var(--gray-dark-color)', // 텍스트 색상
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '16px', // 텍스트 크기 16px
                    fontWeight: 'bold', // 볼드체
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  취소
                </button>
                <button
                  onClick={modalType === 'logout' ? handleLogout : handleDeleteAccount} // API 호출 연결
                  style={{
                    width: '133px',
                    height: '40.23px',
                    backgroundColor: 'var(--gray-bright-color)',
                    color: 'var(--gray-dark-color)',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {modalType === 'logout' ? '로그아웃' : '탈퇴'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
