import styled from 'styled-components';
import Checked from '../../assets/icons/checkedbox.svg?react';
import Unchecked from '../../assets/icons/checkbox.svg?react';
import { useState } from 'react';

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

// NOTE) 플레이리스트 더미데이터, 통신 구현 후 수정 필요
const dummyPlaylist = ['코딩할 때 듣는 Lofi', '드라이브엔 역시 올드 시티팝', '겨울에 듣는 재즈 캐롤', '산책할 때 듣는 8090 명곡들'];

const CheckPlaylist = ({ title, checked, onClick }) => {
  return (
    <CheckPlaylistContainer onClick={onClick} checked={checked}>
      <HiddenCheckbox type="checkbox" checked={checked} readOnly></HiddenCheckbox>
      <CheckboxContainer>{checked ? <Checked /> : <Unchecked />}</CheckboxContainer>
      <div>{title}</div>
    </CheckPlaylistContainer>
  );
};

const AddPlaylistCard = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);

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
    console.log(selectedPlaylist);
  };

  return (
    <Container>
      <HeadingText>플레이리스트에 저장하기</HeadingText>
      {dummyPlaylist.map((item, index) => (
        <CheckPlaylist key={index} title={item} checked={selectedPlaylist.includes(item)} onClick={() => handlePlaylistClick(item)} />
      ))}
      <SaveBtn onClick={handleClickSaveButton}>저장하기</SaveBtn>
    </Container>
  );
};

export default AddPlaylistCard;
