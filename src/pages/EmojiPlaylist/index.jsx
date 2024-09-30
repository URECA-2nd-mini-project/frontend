import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

//선택된 감정 태그
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

//상세보기 아이콘
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

// 태그 안내 메세지
const TagMsg = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

// 상단바
const TagBar = styled.div`
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
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

/** NOTE 로직
 * 모든 감정 태그를 emojis로 관리
 * 현재 선택한 감정 태그를 selectedEmoji로 관리 (현재는 텍스트만 들어가 있는 상태)
 * 특정 emoji를 클릭하면 해당 emoji의 emoji.music이 아래에 렌더링되어야 함
 * music은 map 함수로 selectMusic props 안에 전달
 */

function index(props) {
  const [newMusicList, setNewMusicList] = useState([]); //음악리스트
  const [checkedItems, setCheckedItems] = useState([]); //체크박스 여부
  const [detailButton, setDetailButton] = useState(true); //상세보기 버튼
  const [emojis, setEmojis] = useState([]); // 감정 태그 전체
  const [selectedEmoji, setSelectedEmoji] = useState(null); // 선택한 감정 태그
  const [selectedEmojiNum, setSelectedEmojiNum] = useState(-1); // 선택한 감정 태그
  const [showCheckbox, setShowCheckbox] = useState(false); //체크박스 존재 여부

  const getEmotionTags = async () => {
    try {
      const response = await Instance.get('/api/emotionTag/music');
      console.log('감정 태그 응답:', response.data);
      const musicData = response.data.flatMap(({ music }) =>
        music.map(({ musicId, title, artist }) => ({
          musicId,
          title,
          artist,
        }))
      );

      // 감정 태그 데이터를 상태에 설정
      setEmojis(
        response.data.map((tag) => ({
          emotionTagId: tag.emotionTagId,
          emotionTag: tag.emotionTag,
          music: tag.music,
        }))
      );
      setNewMusicList(musicData);
      setCheckedItems(Array(musicData.length).fill(false)); // 음악 리스트 길이에 맞춰 체크박스 배열 초기화
    } catch (error) {
      console.error('감정 태그 로드 실패:', error);
    }
  };

  useEffect(() => {
    getEmotionTags();
  }, []);

  //감정 태그 클릭
  const handleEmojiClick = (emotionTag, index) => {
    setSelectedEmoji(emotionTag);
    setSelectedEmojiNum(index);
    console.log(selectedEmojiNum);
    setCheckedItems(Array(newMusicList.length).fill(false));
  };

  //체크 박스 클릭 -> emojiPlaylist로 props 넘겨줌
  const handleIconClick = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  //상세보기 버튼 클릭
  const handleClick = () => {
    setDetailButton(false);
    setShowCheckbox(true); // 체크박스 표시
  };

  //음악 삭제
  const handleClickDelete = async () => {
    // 체크된 음악의 ID를 배열로 저장
    const musicIdsToDelete = newMusicList.map((music, index) => (checkedItems[index] ? music.musicId : null)).filter(Boolean); // null 값을 제거하여 유효한 ID만 남김

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

  // 음악 수정 후 저장
  const handleClickSave = async () => {
    try {
      const updatedMusicData = newMusicList.map((music) => ({
        musicId: music.musicId,
      }));

      const response = await Instance.put('/api/music', {
        musicData: updatedMusicData, // 수정된 음악 리스트 전송
      });

      console.log('음악 저장 성공:', response.data);
      setDetailButton(true);
      setShowCheckbox(false);
    } catch (error) {
      console.error('음악 저장 실패:', error);
    }
  };

  // 최신 상태의 음악리스트 상태관리
  useEffect(() => {
    setCheckedItems(Array(newMusicList.length).fill(false)); // newMusicList가 변경될 때 체크 상태 반영
  }, [newMusicList]);

  return (
    <Background>
      <Container>
        <TagMsg>😎 듣고싶은 감정 태그를 클릭해보세요!</TagMsg>
        <EmojiBox>
          {emojis.map((item, index) => (
            <div key={index}>
              <TagBg selected={selectedEmoji === item.emotionTag} onClick={() => handleEmojiClick(item.emotionTag, index)}>
                {item.emotionTag}
              </TagBg>
            </div>
          ))}
        </EmojiBox>
        <div>
          <TagBar>
            <div>{selectedEmoji && <SelectTagBg>{selectedEmoji}</SelectTagBg>}</div>
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
            {selectedEmojiNum === -1 ? (
              <div>🌝 감정에 담긴 음악이 없습니다.</div>
            ) : (
              <MusicList checkedItems={checkedItems} selectMusic={emojis[selectedEmojiNum].music} onIconClick={handleIconClick} showCheckbox={showCheckbox} />
            )}
          </PlayBg>
        </div>
      </Container>
    </Background>
  );
}

export default index;
