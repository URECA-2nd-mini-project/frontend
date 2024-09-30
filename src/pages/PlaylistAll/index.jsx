import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import PlayListIcon from '../../assets/icons/playlist.svg?react';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import { Instance } from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';

const Background = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PlaylistBox = styled.div`
  width: 700px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  color: var(--primary-color);
  margin: 8px 0px;
  padding: 0px 20px;
`;

//플레이리스트 상단바
const PlaylistBar = styled.div`
  width: 720px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

// 플레이리스트 제목
const PlaylistTitleStyled = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
  font-size: 20px;
`;

const PlaylistContent = styled.div`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
`;

const TagBg = styled.button`
  border-radius: 40px;
  border:
    1px solid,
    var(--gray-medium-color);
  padding: 10px 2px;
  margin-left: 5px;
  width: 80px;
  text-align: center;
  color: var(--gray-medium-color);
  font-size: 18px;
  font-weight: bold;
  background: none;
  &:hover {
    background: white;
  }
  &:active {
    background: var(--gray-light-color);
  }
  cursor: pointer;
`;

//상세보기 버튼
const DetailePoint = styled(PlayDetailIcon)`
  cursor: pointer;
`;
const CheckCtrl = styled.label`
  display: flex;
  align-items: center;
`;

const CheckboxStyle = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--gray-medium-color);
  border-radius: 3px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-size: 20px 20px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-image: url('../../assets/icons/checked.svg?react');
    background-color: var(--secondary-color);
  }
`;

function index(props) {
  const [detailButton, setDetailButton] = useState(true); //상세보기 버튼
  const [checkBox, setCheckBox] = useState(false); //체크박스 유무
  const [checkedItems, setCheckedItems] = useState([]); //체크박스 체크 여부
  const [playlists, setPlaylists] = useState([]); //플레이리스트
  const [showSaveButton, setShowSaveButton] = useState(false); // 저장 버튼 표시 상태
  const { playlistId } = useParams(); // URL에서 playlistId 추출

  // 플레이리스트 load
  const getPlaylists = async () => {
    try {
      const response = await Instance.get(`/api/playlists`);
      console.log('상태코드 = ', response.status);
      console.log('응답결과 = ', response.data);

      response.data.status;
      const playlistsData = response.data; // playlists를 추출
      setPlaylists(playlistsData);
      setCheckedItems(Array(playlistsData.length).fill(false));
    } catch (error) {
      console.error('응답실패 = ', error);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  // 플레이리스트 수정, 삭제 버튼 표시
  const handleClick = () => {
    setDetailButton((prev) => !prev);
    setCheckBox((prev) => !prev);
  };

  //플레이스트 삭제
  const handleClickDelete = async () => {
    try {
      // 체크된 플레이리스트의 playlistId 배열 생성
      const idsToDelete = playlists.filter((_, index) => checkedItems[index]).map((item) => item.playlistId);

      console.log('삭제할 플레이리스트 IDs:', idsToDelete);

      if (idsToDelete.length === 0) {
        console.log('삭제할 플레이리스트가 없습니다.');
        return;
      }

      // 삭제 요청
      const response = await Instance.delete(`/api/playlists`, {
        data: { playlistIds: idsToDelete }, // 요청 본문에 playlistId 배열 포함
      });

      console.log('플레이리스트 삭제 응답:', response.data);

      // 삭제 후 상태 업데이트
      const newPlaylists = playlists.filter((_, index) => !checkedItems[index]);
      setPlaylists(newPlaylists);
      setCheckedItems(Array(newPlaylists.length).fill(false)); // 체크 상태 초기화
      setShowSaveButton(true); // 저장 버튼 표시 상태 변경

      console.log('플레이리스트가 삭제되었습니다.');
    } catch (error) {
      console.error('플레이리스트 삭제 실패:', error);
    }
  };

  // 상태를 서버에 반영하는 함수
  /** NOTE 수정해야 할 부분
   * [ ] FormData로 수정
   * [ ] api 호출 경로 수정
   * [ ] api 호출 시 헤더에 'Content-Type': 'multipart/form-data' 추가
   */
  const savePlaylists = async (playlistsToSave) => {
    try {
      // 필요한 형식에 맞게 데이터 변환
      const playlistsData = playlistsToSave.map((playlist) => ({
        playlistId: playlist.playlistId, // ID를 포함
        playlistTitle: playlist.playlistTitle, // 필요한 다른 데이터 추가
        // 필요한 경우 추가 데이터도 여기에 포함
      }));

      const response = await Instance.post('/api/playlists/save', { playlists: playlistsData });
      console.log('플레이리스트 상태 저장 성공:', response.data);
    } catch (error) {
      console.error('플레이리스트 상태 저장 실패:', error);
    }
  };

  // 체크 여부 이벤트
  const handleIconClick = (index) => {
    setCheckedItems((prev) => {
      const newCheckedItems = prev.map((item, i) => (i === index ? !item : item));
      console.log('현재 체크 상태:', newCheckedItems);
      return newCheckedItems;
    });
  };

  return (
    <Background>
      <Container>
        <PlaylistBar>
          <PlayListIcon></PlayListIcon>
          <PlaylistTitleStyled>모든 플레이리스트</PlaylistTitleStyled>
          {detailButton ? ( //상세버튼 클릭시 삭제, 저장버튼 표시
            <DetailePoint onClick={handleClick}></DetailePoint>
          ) : (
            <>
              <TagBg onClick={handleClickDelete}>삭제</TagBg>
              {showSaveButton && (
                <TagBg onClick={() => savePlaylists(playlists)} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                  저장
                </TagBg>
              )}
            </>
          )}
        </PlaylistBar>
        {playlists.map((item, index) => (
          <PlaylistBox key={item.playlistId}>
            <MusicIcon></MusicIcon>
            <PlaylistContent>{item.playlistTitle}</PlaylistContent>
            <CheckCtrl htmlFor={item.playlistId}>
              {checkBox && (
                <CheckboxStyle
                  type="checkbox"
                  id={item.playlistId} // 고유 ID로 설정
                  checked={checkedItems[index]} // 체크 상태 설정
                  onChange={() => handleIconClick(index)} // 체크박스 클릭 시 이벤트 발생
                />
              )}
            </CheckCtrl>
          </PlaylistBox>
        ))}
      </Container>
    </Background>
  );
}

export default index;
