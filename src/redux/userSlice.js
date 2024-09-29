import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: {
      userId: null,
      name: null,
      gmail: null,
      photoUrl: null,
    },
  },
  reducers: {
    // 1. 로그인 상태를 true로 변경하고 현재 로그인 중인 유저 정보를 업데이트
    setLogin(state, action) {
      if (!state.isLoggedIn) {
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      }
    },

    // 2. 로그인 상태를 false로 변경하고 현재 로그인 중인 유저 정보를 삭제
    setLogout(state) {
      if (state.isLoggedIn) {
        state.isLoggedIn = false;
        state.userInfo = null;
      }
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
