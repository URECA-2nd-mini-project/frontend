// import { createSlice } from '@reduxjs/toolkit';

// // 현재 재생 중인 음악의 상태를 업데이트하는 slice
// const musicSlice = createSlice({
//   name: 'music',
//   initialState: {
//     id: null,
//     title: null,
//     artist: null,
//   },
//   reducers: {
//     setMusic(state, action) {
//       const { id, title, artist } = action.payload;
//       state.id = id;
//       state.title = title;
//       state.artist = artist.replace(/ - Topic$/, ''); // ' - Topic' 제거 정규식;
//     },
//   },
// });

// export const { setMusic } = musicSlice.actions;
// export default musicSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    playlist: [
      {
        musicId: null,
        title: null,
        artist: null,
      },
    ], // 객체 배열을 저장할 playlist
    index: 0, // 현재 재생중인 음악의 index
  },
  reducers: {
    // 1. 플레이리스트 초기화
    setPlaylist(state, action) {
      state.playlist = action.payload;
      state.index = 1; // 플레이리스트 초기 설정 시 첫 번째 곡을 선택
    },

    // 2. 현재 재생 중인 음악의 index를 변경
    setIndex(state, action) {
      const newIndex = action.payload;
      if (newIndex >= 0 && newIndex < state.playlist.length) {
        state.index = newIndex;
      } else {
        console.error('Invalid index');
      }
    },

    // 3. 플레이리스트에 음악 추가
    setMusic(state, action) {
      const musicArray = action.payload;
      musicArray.forEach((music) => {
        const { musicId, title, artist } = music;

        // 이미 Playlist에 있는 재생 기록을 제거
        const existingIndex = state.playlist.findIndex((item) => item.musicId === musicId);
        if (existingIndex !== 0) {
          state.playlist.splice(existingIndex, 1); // 중복된 재생 기록 제거
        }

        // 새로운 곡을 playlist에 업데이트
        state.playlist.push({
          musicId,
          title,
          artist: artist.replace(/ - Topic$/, ''), // ' - Topic' 제거 정규식
        });
      });
    },
  },
});

export const { setPlaylist, setIndex, setMusic } = musicSlice.actions;
export default musicSlice.reducer;
