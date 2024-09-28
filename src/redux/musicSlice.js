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

    // 2. 현재 재생 중인 음악의 index를 다음으로 변경
    setIndexNext(state) {
      if (state.index < state.playlist.length - 1) {
        state.index += 1;
      } else {
        state.index = 1;
      }
    },

    // 3. 현재 재생 중인 음악의 index를 이전으로 변경
    setIndexPrev(state) {
      if (state.index > 1) {
        state.index -= 1;
      } else {
        state.index = state.playlist.length - 1;
      }
    },

    // 4. 플레이리스트에 음악 추가
    setMusic(state, action) {
      const musicArray = action.payload;

      // 현재 index 이후의 모든 음악을 삭제하고, 새로운 음악을 삽입
      state.playlist.splice(
        state.index + 1,
        state.playlist.length - state.index - 1,
        ...musicArray.map((music) => {
          const { musicId, title, artist } = music;
          return {
            musicId,
            title,
            artist: artist.replace(/ - Topic$/, ''), // ' - Topic' 제거 정규식
          };
        })
      );

      // 음악을 추가한 후 index를 +1로 업데이트
      state.index += 1;
    },
  },
});

export const { setPlaylist, setIndexNext, setIndexPrev, setMusic } = musicSlice.actions;
export default musicSlice.reducer;
