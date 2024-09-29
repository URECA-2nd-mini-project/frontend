import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import PlayListIcon from '../../assets/icons/playlist.svg?react';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import { Instance } from '../../utils/axiosConfig';

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
    ₩  background-size: 20px 20px;
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

  //플레이리스트 load
  const getPlaylists = async () => {
    try {
      const response = await Instance.get(`/api/playlists/${userId}`);
      console.log('상태코드 = ', response.status);
      console.log('응답결과 = ', response.data);
      setPlaylists(response.data.data);
      setCheckedItems(Array(response.data.data.length).fill(false));
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

  //플레이리스트 삭제
  const handleClickDelete = async () => {
    try {
      // 선택된 플레이리스트의 ID를 추출
      const idsToDelete = playlists
        .filter((_, index) => checkedItems[index]) // 체크된 플레이리스트만 필터링
        .map((item) => item.id); // ID 배열 생성

      // 삭제 요청 (이미지와 플레이리스트 동시 삭제로 비동기 처리)
      await Promise.all(
        idsToDelete.map(async (id) => {
          const playlistToDelete = playlists.find((item) => item.id === id); // 삭제할 플레이리스트 찾기
          if (playlistToDelete && playlistToDelete.userImg) {
            // 이미지가 있을 경우
            //이미지 삭제요청
            await Instance.delete(`/api/playlists/${id}/images`, { params: { userImg: playlistToDelete.userImg } });
          }
          // 플레이리스트 삭제 요청
          await Instance.delete(`/api/playlists/${id}`);
        })
      );

      // 삭제 후 상태 업데이트
      const newPlaylists = playlists.filter((_, index) => !checkedItems[index]);
      setPlaylists(newPlaylists);
      setCheckedItems(Array(newPlaylists.length).fill(false)); // 체크 상태 초기화

      console.log('플레이리스트가 삭제되었습니다.');
    } catch (error) {
      console.error('플레이리스트 삭제 실패:', error);
    }
  };

  // 플레이리스트 저장
  const handleClickSave = async () => {
    const newPlaylist = {
      name: PlaylistTitle /*플레이리스트 제목 (이부분 제목 설정페이지에서 넘겨 받아야함)*/,
    };
    try {
      const response = await Instance.post('/api/playlists', newPlaylist);
      console.log('플레이리스트 저장 성공:', response.data);

      setPlaylists((prevPlaylists) => [...prevPlaylists, response.data]); // 상태 업데이트

      setDetailButton(true); // 버튼 상태 초기화
      setCheckBox(false); //체크박스 초기화
    } catch (error) {
      console.error('플레이리스트 저장 실패:', error);
    }
  };

  // 체크 여부 이벤트
  const handleIconClick = (index) => {
    setCheckedItems((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  // playlists 변경 확인
  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

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
              <TagBg onClick={handleClickSave} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                저장
              </TagBg>
            </>
          )}
        </PlaylistBar>
        {playlists.map((item, index) => (
          <PlaylistBox key={item.id}>
            <MusicIcon></MusicIcon>
            <PlaylistContent>{item.name}</PlaylistContent>
            <CheckCtrl htmlFor={index}>
              {checkBox && (
                <CheckboxStyle
                  type="checkbox"
                  id={index}
                  checked={checkedItems[index]} // checkedItems 배열을 사용하여 체크 상태 설정
                  onChange={() => handleIconClick(index)} // 체크박스 클릭시 이벤트 발생
                ></CheckboxStyle>
              )}
            </CheckCtrl>
          </PlaylistBox>
        ))}
      </Container>
    </Background>
  );
}

export default index;
