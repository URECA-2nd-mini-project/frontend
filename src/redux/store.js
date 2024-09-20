import { configureStore } from '@reduxjs/toolkit';
import musicSlice from './musicSlice';

/* NOTE) Redux 
  0. Redux란?
  - app level state management library
  - 여러 컴포넌트가 공유하는 상태를 관리하기 위한 라이브러리
  - 컴포넌트 간 상태를 복잡하게 공유할 필요 없이, 여러 컴포넌트에서 상태 공유 가능
  - // $ npm install @reduxjs/toolkit react-redux

  1. Store
  - 애플리케이션의 전체 상태를 관리하는 객체
  - 상태 생성 시 configureStore 메서드 사용
  - getState : 현재 상태에 접근
  - dispatch(action) : 상태를 action으로 업데이트
  - subscribed(listner) : 상태 변경을 구독, 상태 변경 시 listner 호출
  
  2. Reducer
  - 애플리케이션의 상태를 변경하는 함수
  - 현재 상태를 전달받은 action의 type에 따라 새로운 상태 객체를 생성 및 업데이트

  3. Provider
*/

const store = configureStore({
  reducer: {
    music: musicSlice,
  },
});

export default store;
