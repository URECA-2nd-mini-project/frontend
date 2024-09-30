import AccountSummary from './AccountSummary';
import ContentRestriction from './ContentRestriction';
import AccountManagement from './AccountManagement';
// eslint-disable-next-line no-unused-vars
import React from 'react';

const MainPage = () => {
  return (
    <div style={{ padding: '40px', marginLeft: '120px', backgroundColor: '#f9f9f9' }}>
      {/* Flexbox 컨테이너 추가 */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <AccountSummary />
        <ContentRestriction />
      </div>
      <AccountManagement />
    </div>
  );
};

export default MainPage;
