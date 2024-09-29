import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import MusicList from '../../components/dashboard/MusicList';
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

//card, 플레이리스트 전체
const PlayAll = styled.div`
  display: flex;
  display-derection: row;
  align-items: center;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 400px;
  max-height: 600px;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
  border: 1px solid white;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0px 20px 10px 0px;
`;

//플레이리스트 제목입력
const Titleinput = styled.input`
  border: none;
  font-weight: bold;
  font-size: 20px;
  color: var(--primary-color);
  width: 350px;
  margin-top: 10px;
  background-color: white;
`;

//text 입력
const CardTextInput = styled.textarea`
  border-radius: 8px;
  width: 350px;
  height: 50px;
  background-color: white;
  padding: 5px;
  border: 1px solid var(--gray-bright-color);
  resize: none;
  font-size: 18px;
  overflow-y: auto;
`;

//text 출력
const CardTextOutput = styled.p`
  white-space: pre-wrap;
  overflow: break-word;
  font-size: 18px;
  color: var(--gray-medium-color);
`;

//태그 컴포넌트
const TagBg = styled.button`
  border-radius: 40px;
  border:
    1px solid,
    var(--gray-medium-color);
  padding: 10px 2px;
  margin: 3px;
  width: 80px;
  text-align: center;
  color: var(--gray-medium-color);
  font-size: 18px;
  font-weight: bold;
  background: white;
  &:hover {
    background: var(--gray-light-color);
  }
  &:active {
    background: white;
  }
  cursor: pointer;
  position: absolute;
`;

//이미지 부분
const UserImg = styled.div`
  width: 360px;
  height: 360px;
  border: ${({ uploadImg }) => (uploadImg ? 'none' : '0.5px, solid, var(--gray-bright-color)')};
  background: transparent;
  border-radius: 8px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// user 이미지 업로드
const LoadImg = styled.img`
  width: 360px;
  height: 360px;
  border-radius: 8px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//플레이리스트 상단바 전체
const PlaylistbarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 1140px;
`;

//플레이리스트 상단바
const Playlistbar = styled.div`
  height: 49px;
  width: 680px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-buttom: 10px;
`;

// 플레이리스트 title
const PlaylistTitleStyled = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
  font-size: 20px;
`;

//플레이리스트 배경
const PlayBg = styled.div`
  width: 600px;
  background-color: var(--gray-bright-color);
  border:
    1px solid,
    var(--gray-bright-color);
  border-radius: 8px;
  padding: 20px 50px;
`;

// 상세보기 버튼
const DetailePoint = styled(PlayDetailIcon)`
  cursor: pointer;
`;

// 수정, 삭제 버튼
const Tagbtn = styled.button`
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

// text입력 전체
const TextBox = styled.div`
  width: 350px;
`;

function index(props) {
  const [detailButton, setDetailButton] = useState(true); // 상세보기 아이콘
  const [checkedItems, setCheckedItems] = useState([]); //체크 여부 관리(새로운 음악 리스트 수)
  const [newMusicList, setNewMusicList] = useState([]); // 현재 음악 리스트
  const [showCheckbox, setShowCheckbox] = useState(false); //체크박스 유무 관리
  const [uploadImg, setUploadImg] = useState(null); //등록된 이미지
  const fileInputRef = useRef(null); // 업로드 이미지
  const [isEditing, setIsEditing] = useState(true); // 편집 모드 상태
  const [playlistTitle, setPlaylistTitle] = useState(''); // 플레이리스트 제목
  const [text, setText] = useState(''); // 플레이리스트 설명
  const [playlistId, setPlaylistId] = useState([]); // playlistId 상태 추가
  // const { userId } = useSelector((state) => state.user); // 유저 정보 가져오기

  // 플레이리스트 음악리스트 load
  const getPlaylistMusic = async () => {
    try {
      const response = await Instance.get(`/api/playlists/${playlistId}`);
      const { playlistId, playlistTitle, contents, musicList } = response.data; // 필요한 데이터 추출
      setPlaylistId(playlistId); // 서버에서 생성
      setPlaylistTitle(playlistTitle); // 플레이리스트 제목
      setText(contents); // 설명
      setNewMusicList(musicList || []); // 음악 리스트
      setCheckedItems(Array(musicList.length).fill(false)); // 체크박스 상태 설정
      console.log('상태코드 = ', response.status);
      console.log('응답결과 = ', response.data);
    } catch (error) {
      console.error('플레이리스트 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (playlistId) {
      // playlistId가 있을 때만 호출
      getPlaylistMusic(playlistId);
    }
  }, [playlistId]);

  //상세보기 아이콘 클릭
  const handleClick = () => {
    setDetailButton(false);
    setShowCheckbox(true);
  };

  // 저장 버튼 클릭시 상세보기 버튼 표시
  const handleClickSave = () => {
    setDetailButton(true);
    setShowCheckbox(false);
  };

  // 체크박스 클릭시 상태 변경
  const handleIconClick = (index) => {
    const updatedChecked = [...checkedItems];
    updatedChecked[index] = !updatedChecked[index];
    setCheckedItems(updatedChecked);
  };

  // 이미지 등록 함수
  const registerImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile); // 이미지 파일 추가
      console.log('전송할 이미지:', formData.get('image')); // 이미지 파일 확인

      const response = await Instance.post(`/api/playlists/${playlistId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('상태코드 = ', response.status);
      console.log('응답결과 = ', response.data);
      return response.data; // 등록된 이미지 URL 반환
    } catch (error) {
      console.error('이미지 등록 요청 실패:', error);
      throw error; // 오류 발생 시 다시 던짐
    }
  };

  // 더블 클릭으로 이미지 수정
  const handleDoubleClick = () => {
    fileInputRef.current.click(); // 파일 입력 요소 클릭
  };

  const handleChangeImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file); // 파일 주소 변환
      setUploadImg(imgUrl); // 미리보기 이미지 업데이트

      // 이미지 등록
      try {
        const updatedImageUrl = await registerImage(file); // 이미지 등록 함수 호출
        console.log('이미지 등록 성공:', updatedImageUrl);
        setUploadImg(updatedImageUrl); // 서버에서 반환된 이미지 URL로 미리보기 업데이트
      } catch (error) {
        console.error('이미지 등록 요청 실패:', error);
      }
    }
  };

  // 플레이리스트 제목 업데이트
  const handleTitleChange = (e) => {
    setPlaylistTitle(e.target.value);
  };

  //텍스트 화면에 표시
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // 플레이리스트 title, 설명 관리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPlaylist = {
      playlistId: playlistId, // 상태에서 받아온 playlistId 사용
      playlistTitle: playlistTitle,
      contents: text,
    };

    try {
      // 서버에 PUT 요청하여 플레이리스트 업데이트
      const response = await Instance.put(`/api/playlists/${playlistId}`, updatedPlaylist);
      console.log('플레이리스트 업데이트 성공:', response.data);
      console.log('상태코드 = ', response.status);
      console.log('응답결과 = ', response.data);
      // 상태 업데이트
      setPlaylistTitle(response.data.playlistTitle);
      setText(response.data.contents);
      // 편집 모드 종료
      setIsEditing(false);
    } catch (error) {
      console.error('플레이리스트 업데이트 실패:', error);
    }
  };
  //삭제
  // const handleClickDelete = () => {
  //   const updatedPlaylist = newMusicList.filter((_, index) => !checkedItems[index]); //체크된 음악 삭제 후 반환
  //   setNewMusicList(updatedPlaylist); //반환 된 새로운 리스트를 랜더링
  //   setCheckedItems(Array(updatedPlaylist.length).fill(false)); //체크 상태 초기화
  // };

  const handleClickDelete = async () => {
    // 체크된 음악의 ID를 배열로 저장
    const musicIdsToDelete = newMusicList.map((music, index) => (checkedItems[index] ? music.id : null)).filter(Boolean); // null 값을 제거하여 유효한 ID만 남김

    if (musicIdsToDelete.length === 0) {
      console.log('삭제할 음악이 선택되지 않았습니다.');
      return; // 삭제할 음악이 없으면 종료
    }

    try {
      // 음악 삭제 요청
      const response = await Instance.delete(`/api/music/${playlistId}`, {
        data: { musicIds: musicIdsToDelete }, // 삭제할 음악 ID 배열 전송
      });

      console.log('음악 삭제 성공:', response.data);

      // 음악 리스트 업데이트
      const updatedPlaylist = newMusicList.filter((_, index) => !checkedItems[index]);
      setNewMusicList(updatedPlaylist);
      setCheckedItems(Array(updatedPlaylist.length).fill(false)); // 체크 상태 초기화
    } catch (error) {
      console.error('음악 삭제 실패:', error);
    }
  };
  return (
    <Background>
      <Container>
        <PlaylistbarBox>
          <Playlistbar>
            <MusicIcon />
            <PlaylistTitleStyled>{isEditing ? '' : playlistTitle}</PlaylistTitleStyled>
            {detailButton ? (
              <DetailePoint onClick={handleClick}></DetailePoint>
            ) : (
              <>
                <Tagbtn onClick={handleClickDelete}>삭제</Tagbtn>
                <Tagbtn onClick={handleClickSave} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                  저장
                </Tagbtn>
              </>
            )}
          </Playlistbar>
        </PlaylistbarBox>
        <PlayAll>
          <Card>
            <div>
              <UserImg>
                {uploadImg ? (
                  <LoadImg
                    src={uploadImg}
                    alt="이미지가 없어요"
                    onDoubleClick={handleDoubleClick}
                    accept=".jpg, .jpeg, .png"
                    title="더블클릭시 이미지를 수정할 수 있습니다. 35*35"
                  />
                ) : (
                  <TagBg onClick={() => fileInputRef.current.click()}>선택</TagBg>
                )}
                <input type="file" onChange={handleChangeImg} ref={fileInputRef} style={{ display: 'none' }} />
              </UserImg>
              <TextBox>
                <form onSubmit={handleSubmit}>
                  <Titleinput
                    type="text"
                    placeholder="새플레이리스트 01"
                    maxLength={19}
                    title="최대 19자 입력가능"
                    value={playlistTitle}
                    onChange={handleTitleChange}
                    disabled={!isEditing}
                  />
                  <CardTextOutput>{isEditing ? '' : text}</CardTextOutput> {/*작성 후 화면에 표시*/}
                  {isEditing ? (
                    <CardTextInput value={text} onChange={handleTextChange} placeholder="💿 플레이리스트 설명을 작성해보세요!" rows="4" cols="40" />
                  ) : null}{' '}
                  <Tagbtn type="submit">{isEditing ? '확인' : '수정'}</Tagbtn>
                </form>
              </TextBox>
            </div>
          </Card>

          <PlayBg>
            <MusicList
              checkedItems={checkedItems} //체크 상태 전달
              selectMusic={newMusicList} // 음악 목록 전달
              onIconClick={handleIconClick} // 체크박스 핸들러 추가
              showCheckbox={showCheckbox} //체크 박스 표시 상태 전달
            />
          </PlayBg>
        </PlayAll>
      </Container>
    </Background>
  );
}

export default index;
