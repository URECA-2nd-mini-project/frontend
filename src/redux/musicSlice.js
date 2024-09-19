import { createSlice } from '@reduxjs/toolkit';

// 현재 재생 중인 음악의 상태를 업데이트하는 slice
const musicSlice = createSlice({
  name: 'music',
  initialState: {
    id: null,
    title: null,
    artist: null,
  },
  reducers: {
    setMusic(state, action) {
      const { id, title, artist } = action.payload;
      state.id = id;
      state.title = title;
      state.artist = artist.replace(/ - Topic$/, ''); // ' - Topic' 제거 정규식;
    },
  },
});

export const { setMusic } = musicSlice.actions;
export default musicSlice.reducer;
