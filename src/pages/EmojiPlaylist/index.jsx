import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

//태그 배경
const TagBg = styled.button`
  border-radius: 40px;
  box-sizing: border-box;
  border:
    1px solid,
    var(--gray-bright-color);
  padding: 15px;
  margin: 3px;
  text-align: center;
  font-size: 18px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  color: ${({ selected }) => (selected ? 'var(--secondary-color)' : 'var(--gray-medium-color)')};
  background-color: ${({ selected }) => (selected ? '#def2ec' : 'var(--gray-bright-color)')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  &:hover {
    background: #def2ec;
  }
  &:active {
    font-weight: bold;
  }
`;
const SelectTagBg = styled.div`
  color: var(--secondary-color);
  background-color: #def2ec;
  font-weight: bold;
  border-radius: 40px;
  box-sizing: border-box;
  border:
    1px solid,
    #def2ec;
  padding: 15px;
  margin: 3px;
  font-size: 18px;
`;

//태그 버튼(삭제, 저장)
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

const DetailePoint = styled(PlayDetailIcon)`
  cursor: pointer;
`;

// 감정 태그 전체
const EmojiBox = styled.div`
  border:
    1px solid,
    none;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 35%;
  flex-wrap: wrap;
`;

const TagMsg = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const TagBar = styled.div`
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
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

function index(props) {
  //한 줄에 최대 5개의 태그 배치
  const selectEmoji = [
    {
      emoji: '#행복',
      playlist: null,
      id: 1,
    },
    {
      emoji: '#분노',
      playlist: null,
      id: 2,
    },
    {
      emoji: '#사랑',
      playlist: null,
      id: 3,
    },
    {
      emoji: '#슬픔',
      playlist: null,
      id: 4,
    },
    {
      emoji: '#기대',
      playlist: null,
      id: 5,
    },
    {
      emoji: '#사용자정의1',
      playlist: null,
      id: 6,
    },
    {
      emoji: '#사용자정의2',
      playlist: null,
      id: 7,
    },
    {
      emoji: '#사용자정의123',
      playlist: null,
      id: 8,
    },
  ];

  const selectMusic = [
    {
      song: '지난 날',
      singer: '유재하',
      id: 1,
    },
    {
      song: '사랑하기 때문에',
      singer: '유재하',
      id: 2,
    },
    {
      song: '내 마음에 비친 내 모습',
      singer: '유재하',
      id: 3,
    },
    {
      song: '꽃잎이 지고',
      singer: '유재하',
      id: 4,
    },
    {
      song: '그리움만 쌓이네',
      singer: '유재하',
      id: 5,
    },
  ];

  const [newMusicList, setNewMusicList] = useState(selectMusic);
  const [checkedItems, setCheckedItems] = useState(Array(selectMusic.length).fill(false));
  const [detailButton, setDetailButton] = useState(true);
  const [emojiSelect, setEmojiSelect] = useState(null);
  const [showCheckbox, setShowCheckbox] = useState(false);
  //감정 태그 클릭
  const handleEmojiClick = (emoji) => {
    setEmojiSelect(emoji);
  };

  const handleIconClick = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems); // 부모 컴포넌트의 상태 업데이트
  };

  //상세보기 버튼 클릭
  const handleClick = () => {
    setDetailButton(false); //상세보기 버튼 숨김
    setShowCheckbox(true); // 체크박스 표시
  };

  //음악 삭제
  const handleClickDelete = () => {
    const updatedPlaylist = newMusicList.filter((_, index) => !checkedItems[index]);
    setNewMusicList(updatedPlaylist); // 새로운 플레이리스트 상태 업데이트
    setCheckedItems(Array(updatedPlaylist.length).fill(false)); // 체크 상태 초기화
  };

  // 음악 수정 후 저장
  const handleClickSave = () => {
    setDetailButton(true);
    setShowCheckbox(false);
  };
  useEffect(() => {
    setCheckedItems(Array(newMusicList.length).fill(false)); // newMusicList가 변경될 때 체크 상태 초기화
  }, [newMusicList]);

  return (
    <Background>
      <Container>
        <TagMsg>😎 듣고싶은 감정 태그를 클릭해보세요!</TagMsg>
        <EmojiBox>
          {selectEmoji.map((item, index) => (
            <div key={index}>
              <TagBg selected={emojiSelect === item.emoji} onClick={() => handleEmojiClick(item.emoji)}>
                {item.emoji}
              </TagBg>
            </div>
          ))}
        </EmojiBox>
        <div>
          <TagBar>
            <div>{emojiSelect && <SelectTagBg>{emojiSelect}</SelectTagBg>}</div>
            {detailButton ? (
              <DetailePoint onClick={handleClick}></DetailePoint>
            ) : (
              <div>
                <Tagbtn onClick={handleClickDelete}>삭제</Tagbtn>
                <Tagbtn onClick={handleClickSave} style={{ color: 'var(--primary-color)', border: '1px solid var(--primary-color)' }}>
                  저장
                </Tagbtn>
              </div>
            )}
          </TagBar>
          <PlayBg>
            <MusicList checkedItems={checkedItems} selectMusic={newMusicList} onIconClick={handleIconClick} showCheckbox={showCheckbox}></MusicList>
          </PlayBg>
        </div>
      </Container>
    </Background>
  );
}

export default index;
