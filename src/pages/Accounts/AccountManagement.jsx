// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const AccountManagement = () => {
  // 모달의 표시 여부를 관리하기 위한 상태
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 모달의 유형 (로그아웃 또는 계정 탈퇴)

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

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(''); // 모달 타입 초기화
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>계정 관리</h2>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogoutClick}
          style={{
            padding: '10px',
            width: '612px',
            height: '101px',
            cursor: 'pointer',
            background: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '8px 0 0' }}>로그아웃</p>
          <p style={{ margin: '8px 0 0' }}>로그아웃 시 현재 세션이 종료되며, 다시 로그인해야 계정에 접근할 수 있습니다.</p>
        </button>
        {/* 계정 탈퇴 버튼 */}
        <button
          onClick={handleDeleteClick}
          style={{
            padding: '10px',
            width: '612px',
            height: '101px',
            cursor: 'pointer',
            background: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '8px 0 0' }}>계정 탈퇴하기</p>
          <p style={{ margin: '8px 0 0' }}>탈퇴 시 작성한 감정 및 태그 정보가 삭제되며 복구되지 않습니다.</p>
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
                backgroundColor: '#ffffff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h3>{modalType === 'logout' ? '로그아웃 하시겠습니까?' : '계정을 탈퇴하시겠습니까?'}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: '10px 20px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  취소
                </button>
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: '10px 20px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
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
