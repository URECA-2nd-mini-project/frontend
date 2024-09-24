import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import MusicList from '../../components/dashboard/MusicList';

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

const CardTextOutput = styled.p`
  white-space: pre-wrap;
  overflow: break-word;
  font-size: 20px;
`;
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

const LoadImg = styled.img`
  width: 360px;
  height: 360px;
  border-radius: 8px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlaylistbarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 1140px;
`;

const Playlistbar = styled.div`
  height: 49px;
  width: 680px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-buttom: 10px;
`;

const PlaylistTitle = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: left;
  padding: 0px 20px;
  font-size: 20px;
`;

const PlayBg = styled.div`
  width: 600px;
  background-color: var(--gray-bright-color);
  border:
    1px solid,
    var(--gray-bright-color);
  border-radius: 8px;
  padding: 20px 50px;
`;

const DetailePoint = styled(PlayDetailIcon)`
  cursor: pointer;
`;
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

const TextBox = styled.div`
  width: 350px;
`;
function index(props) {
  const PlayMusic = [
    {
      song: '지난 날',
      singer: '유재하',
      playlists: '드라이브엔 역시 시티팝',
      id: 1,
    },
    {
      song: '사랑하기 때문에',
      singer: '유재하',
      playlists: '드라이브엔 역시 시티팝',
      id: 2,
    },
    {
      song: '내 마음에 비친 내 모습',
      singer: '유재하',
      playlists: '드라이브엔 역시 시티팝',
      id: 3,
    },
    {
      song: '꽃잎이 지고',
      singer: '유재하',
      emoji: '#사용자정의1',
      id: 4,
    },
    {
      song: '그리움만 쌓이네',
      singer: '유재하',
      playlists: '드라이브엔 역시 시티팝',
      id: 5,
    },
  ];

  const [detailButton, setDetailButton] = useState(true); // 상세보기 아이콘
  const [checkedItems, setCheckedItems] = useState(Array(PlayMusic.length).fill(false)); //체크 여부 관리(새로운 음악 리스트 수)
  const [newMusicList, setNewMusicList] = useState(PlayMusic); // 현재 음악 리스트
  const [showCheckbox, setShowCheckbox] = useState(false); //체크박스 유무 관리
  const [uploadImg, setUploadImg] = useState(null);
  const fileInputRef = useRef(null); // 업로드 이미지
  const [isEditing, setIsEditing] = useState(true); // 편집 모드 상태
  const [text, setText] = useState('');

  const handleClick = () => {
    setDetailButton(false);
    setShowCheckbox(true); // 체크박스 표시
  };

  const handleClickDelete = () => {
    const updatedPlaylist = newMusicList.filter((_, index) => !checkedItems[index]); //체크된 음악 삭제 후 반환
    setNewMusicList(updatedPlaylist); //반환 된 새로운 리스트를 랜더링
    setCheckedItems(Array(updatedPlaylist.length).fill(false)); //체크 상태 초기화
  };

  // 저장 버튼 클릭시 상세보기 버튼 표시
  const handleClickSave = () => {
    setDetailButton(true);
    setShowCheckbox(false);
  };

  // 체크박스 클릭시 상태 변경
  const handleIconClick = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  //이미지 업로드
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl);
    setUploadImg(imgUrl);
  };

  //파일 더블클릭시 수정
  const handleDoubleClick = () => {
    fileInputRef.current.click(); // 파일 입력 요소 클릭
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setIsEditing(false); // 편집 모드 종료
    } else {
      setIsEditing(true); // 편집 모드 시작
    }
  };

  return (
    <Background>
      <Container>
        <PlaylistbarBox>
          <Playlistbar>
            <MusicIcon />
            <PlaylistTitle>드라이브엔 역시 올드 시티팝</PlaylistTitle>
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
                  <LoadImg src={uploadImg} alt="등록 이미지" onDoubleClick={handleDoubleClick} title="더블클릭시 이미지를 수정할 수 있습니다. 35*35" />
                ) : (
                  <TagBg onClick={() => fileInputRef.current.click()}>선택</TagBg>
                )}
                <input type="file" onChange={handleChangeImg} ref={fileInputRef} style={{ display: 'none' }} />
              </UserImg>
              <TextBox>
                <form onSubmit={handleSubmit}>
                  <CardTextOutput>{isEditing ? '' : text}</CardTextOutput>
                  {isEditing ? (
                    <CardTextInput
                      value={text}
                      onChange={handleTextChange}
                      onKeyDown={handleEnter}
                      placeholder="💿 플레이리스트 설명을 작성해보세요!"
                      rows="4"
                      cols="40"
                    />
                  ) : null}{' '}
                  <Tagbtn type="submit">{isEditing ? '확인' : '수정'}</Tagbtn>
                </form>
              </TextBox>
            </div>
          </Card>

          <PlayBg>
            <MusicList
              checkedItems={checkedItems}
              selectMusic={newMusicList} // 음악 목록 전달
              onIconClick={handleIconClick} // 체크박스 핸들러 추가
              showCheckbox={showCheckbox}
            />
          </PlayBg>
        </PlayAll>
      </Container>
    </Background>
  );
}

export default index;
