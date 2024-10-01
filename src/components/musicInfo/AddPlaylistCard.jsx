import styled from 'styled-components';
import Checked from '../../assets/icons/checkedbox.svg?react';
import Unchecked from '../../assets/icons/checkbox.svg?react';
import { useState } from 'react';
import { Instance } from '../../utils/axiosConfig';
import { useEffect } from 'react';

const Container = styled.div`
  position: relative;
  width: calc(640px - 128px);
  height: calc(640px - 64px);
  margin: 8px;
  padding: 48px 48px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 2px var(--box-shadow-color);
  overflow-y: auto;
  font-size: 30px;
  font-weight: 600;
  color: var(--gray-medium-color);
  white-space: pre-wrap; // 이스케이프 문자(\n) 허용
`;

const HeadingText = styled.div`
  color: var(--gray-dark-color);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const CheckPlaylistContainer = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  color: ${(props) => (props.checked ? 'var(--secondary-color)' : 'var(--gray-light-color)')};
  font-size: 18px;
  font-weight: ${(props) => (props.checked ? 600 : 500)};
`;

const HiddenCheckbox = styled.div`
  /* border: 0;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px; */
  display: none;
`;

const CheckboxContainer = styled.div`
  width: 20px;
  height: 20px;
`;

const SaveBtn = styled.button`
  position: absolute;
  left: 40px;
  bottom: 48px;
  width: 520px;
  height: 72px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 80px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const CheckPlaylist = ({ title, checked, onClick }) => {
  return (
    <CheckPlaylistContainer onClick={onClick} checked={checked}>
      <HiddenCheckbox type="checkbox" checked={checked} readOnly></HiddenCheckbox>
      <CheckboxContainer>{checked ? <Checked /> : <Unchecked />}</CheckboxContainer>
      <div>{title}</div>
    </CheckPlaylistContainer>
  );
};

const AddPlaylistCard = ({ music }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);

  // 플레이리스트 정보를 서버로부터 불러옴
  const getPlaylists = async () => {
    try {
      const response = await Instance.get('/api/playlists');
      console.log('getPlaylist 응답 코드: ', response.headers);
      console.log('getPlaylist 응답 결과: ', response.data);
      setPlaylists(response.data);
    } catch (error) {
      console.log('getPlaylist 요청 실패: ', error);
    }
  };

  const postMusicToPlaylist = async () => {
    const playlistIdData = selectedPlaylist.map((item) => item.playlistId);
    try {
      const response = await Instance.post('/api/playlists/music', {
        musicId: music.musicId,
        artist: music.artist,
        title: music.title,
        playlistIds: playlistIdData,
      });
      console.log('postPlaylist 응답 코드: ', response.headers);
      console.log('postPlaylist 응답 결과: ', response.data);
      setPlaylists(response.data);
    } catch (error) {
      console.log('postPlaylist 요청 실패: ', error);
    }
  };

  // 플레이리스트 선택 시 상태 업데이트
  const handlePlaylistClick = (item) => {
    if (selectedPlaylist.includes(item)) {
      // 이미 선택된 플레이리스트를 다시 클릭하면 해당 항목 제거
      setSelectedPlaylist(selectedPlaylist.filter((playlist) => playlist !== item));
    } else {
      // 선택되지 않은 플레이리스트를 클릭하면 배열에 추가
      setSelectedPlaylist([...selectedPlaylist, item]);
    }
  };

  const handleClickSaveButton = () => {
    postMusicToPlaylist();
    getPlaylists();
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <Container>
      <HeadingText>플레이리스트에 저장하기</HeadingText>
      {playlists.map((item, index) => (
        <CheckPlaylist key={index} title={item.playlistTitle} checked={selectedPlaylist.includes(item)} onClick={() => handlePlaylistClick(item)} />
      ))}
      <SaveBtn onClick={handleClickSaveButton}>저장하기</SaveBtn>
    </Container>
  );
};

export default AddPlaylistCard;
