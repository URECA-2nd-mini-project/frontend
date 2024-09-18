import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
`;

function index(props) {
  return (
    <Background>
      <div>
        <p>듣고싶은 감정 태그를 클릭해보세요!</p>
        <div>
          <div>#행복</div>
          <div>#즐거움</div>
          <div>#지루함</div>
          <div>#슬픔</div>
          <div>#우울함</div>
        </div>
      </div>
      <div>
        <div>
          <div>#행복</div>
          <div>수정아이콘</div>
        </div>
        <div>
          <div>
            <div>앨범커버</div>
            <div>
              <div>노래제목</div>
              <div>가수명</div>
            </div>
            <div>재생아이콘</div>
          </div>
        </div>
      </div>
    </Background>
  );
}

