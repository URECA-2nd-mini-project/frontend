import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import PlayDetailIcon from '../../assets/icons/list-detail.svg?react';
import CardImg from '../../assets/icons/card-image.svg?react';
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
  background-color: white;
  border-radius: 8px;
  border:
    1px solid,
    white;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0px 20px 10px 0px;
`;

const CardText = styled.div`
  border-radius: 8px;
  width: 350px;
  height: 100px;
  background-color: white;
  padding: 5px;
`;

const UserImg = styled.div`
  width: 360px;
  height: 360px;
  background-color: var(--primary-color);
  border-radius: 8px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  const [detailButton, setDetailButton] = useState(true);
  const [checkedItems, setCheckedItems] = useState(Array(PlayMusic.length).fill(false)); //체크박스 체크 여부
  const [newMusicList, setNewMusicList] = useState(PlayMusic); //음악리스트
  const [showCheckbox, setShowCheckbox] = useState(false); // 체크박스 존재 여부

  // 플레이리스트 수정
  const handleClick = () => {};

  //플레이리스트 삭제
  const handleClickDelete = () => {};
  // 플레이리스트 저장
  const handleClickSave = () => {
    setDetailButton(true);
    setCheckBox(false);
  };
  return (
    <Background>
      <Container>
        <PlaylistbarBox>
          <Playlistbar>
            <MusicIcon></MusicIcon>
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
                <CardImg></CardImg>
                <input type="file" style={{ display: 'none' }}></input>
                <TagBg onClick={null} style={{ display: 'hidden' }}>
                  수정
                </TagBg>
              </UserImg>

              <CardText>
                🌆🥺🪩😆🚘 <br />
                퇴근 후 드라이브 노래로 딱인 플리 <br />이 플리 하나면 집 도착!!!
              </CardText>
            </div>
          </Card>
          <PlayBg>
            <MusicList checkedItems={checkedItems} playmusic={newMusicList} showCheckbox={showCheckbox}></MusicList>
          </PlayBg>
        </PlayAll>
      </Container>
    </Background>
  );
}

export default index;
