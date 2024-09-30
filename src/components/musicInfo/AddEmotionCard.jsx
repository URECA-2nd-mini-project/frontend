import { useEffect } from 'react';
import { useState } from 'react';
import { Instance } from '../../utils/axiosConfig';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatDate';

const Container = styled.div`
  position: relative;
  width: calc(640px - 128px);
  height: calc(640px - 64px);
  margin: 8px;
  padding: 48px 48px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 2px var(--box-shadow-color);
`;

const Header = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  border-bottom: 1px solid var(--gray-bright-color);
`;

const HeaderTab = styled.div`
  height: 100%;
  color: ${(props) => (props.selected ? 'var(--gray-dark-color)' : 'var(--gray-light-color)')};
  border-bottom: ${(props) => (props.selected ? '2px solid var(--gray-dark-color)' : 'none')};
  font-size: 18px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
`;

const HeadingText = styled.div`
  color: var(--gray-dark-color);
  font-size: 20px;
  font-weight: 600;
  margin-top: 48px;
`;

const ChipContainer = styled.div`
  width: 540px;
  height: 40px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
  overflow-x: auto;
`;

const Chip = styled.div`
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 40px;
  margin: auto 0;
  color: ${(props) => (props.selected ? 'var(--secondary-color)' : 'var(--gray-medium-color)')};
  background-color: ${(props) => (props.selected ? 'var(--secondary-light-color)' : 'var(--gray-bright-color)')};
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  white-space: nowrap;
`;

const InputChip = styled.input`
  width: 72px;
  padding: 8px 16px;
  margin: auto 0;
  border-radius: 40px;
  color: var(--gray-dark-color);
  background-color: var(--gray-bright-color);
  font-size: 16px;
  font-weight: 600;
  border: none;
  outline: none;
`;

const EmotionTextArea = styled.textarea`
  width: 460px;
  height: 160px;
  padding: 24px 24px;
  margin-top: 20px;
  background-color: var(--gray-bright-color);
  color: var(--gray-dark-color);
  border-radius: 8px;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  border: none;
  outline: none;
`;

const SaveBtn = styled.button`
  position: absolute;
  left: 52px;
  bottom: 40px;
  width: 500px;
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

const MyEmotionLogContainer = styled.div`
  height: 540px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const MyEmotionLogCard = styled.div`
  width: calc(540px - 84px);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  background-color: var(--background-color);
`;

const MyEmotionLogText = styled.div`
  color: var(--gray-dark-color);
  font-size: 18px;
  font-weight: 500;
`;

const MyEmotionLogDateText = styled.div`
  color: var(--gray-light-color);
  font-size: 16px;
  font-weight: 400;
`;

const AddEmotionCard = ({ music }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState(0);
  const [newEmotionTag, setNewEmotionTag] = useState('');
  const [emotionInputText, setEmotionInpuText] = useState('');
  const [emotionTags, setEmotionTags] = useState(null);
  const [emotionLogs, setEmotionLogs] = useState(null);
  const [isEmotionTagUpdated, setIsEmotionTagUpdated] = useState(false);

  // 서버로부터 감정 태그 정보를 불러옴
  const getEmotionTags = async () => {
    try {
      const response = await Instance.get('/api/emotionTag');
      console.log('get EmotionTags 상태 코드 = ', response.status);
      console.log('get EmotionTags 응답 결과 = ', response.data);
      const transformedData = response.data.map((item) => ({
        emotionTag: item.emotionTag,
        emotionTagId: item.emotionTagId,
      }));
      setEmotionTags(transformedData); // 상태에 저장
    } catch (error) {
      console.log('get EmotionTags 응답 실패 = ', error);
    }
  };

  // 서버에 새로운 감정 태그를 저장함
  const postNewEmotionTag = async () => {
    try {
      console.log(newEmotionTag);
      const response = await Instance.post('/api/emotionTag', [{ emotionTag: newEmotionTag }]);
      console.log('post EmotionTag 상태 코드 = ', response.status);
      console.log('post EmotionTag 응답 결과 = ', response.data);
      setEmotionTags(response.data);
      setIsEmotionTagUpdated(true);
    } catch (error) {
      console.log('post EmotionTag 응답 실패 = ', error);
    }
  };

  // 서버에 감정 기록을 저장함
  const postEmotionLog = async () => {
    try {
      const response = await Instance.post('/api/emotionLog', {
        music: music,
        emotionTagId: emotionTags[selectedEmotion].emotionTagId,
        contents: emotionInputText,
      });
      console.log('post EmotionLog 상태 코드 = ', response.status);
      console.log('post EmotionLog 응답 결과 = ', response.data);
      window.alert('감정 기록이 저장되었어요.');
    } catch (error) {
      console.log('post EmotionLog 응답 실패 = ', error);
      window.alert('감정 기록 저장에 실패했어요.');
    }
  };

  // 서버에서 감정 기록을 불러옴
  const getEmotionLog = async () => {
    try {
      const response = await Instance.get(`/api/emotionLog/${music.musicId}`);
      console.log('get EmotionLog 상태 코드 = ', response.status);
      console.log('get EmotionLog 응답 결과 = ', response.data);
      setEmotionLogs(response.data);
    } catch (error) {
      console.log('get EmotionLog 응답 실패 = ', error);
    }
  };

  // Tab이 클릭될 때 실행되는 이벤트 핸들러
  const handleTabClick = (tabNo) => {
    if (tabNo === 1) {
      getEmotionLog();
    }

    if (selectedTab === tabNo) {
      return;
    } else {
      setSelectedTab(tabNo);
    }
  };

  // Chip이 클릭될 때 실행되는 이벤트 핸들러
  const handleChipClick = (chipNo) => {
    if (selectedEmotion === chipNo) {
      // 이미 선택된 Chip일 경우 return
      return;
    } else {
      // 다른 Chip을 선택한 경우 해당 Chip 번호를 저장
      setSelectedEmotion(chipNo);
    }
  };

  // Card Input의 값을 state에 저장하는 이벤트 핸들러
  const handleInputChipChange = (event) => {
    setNewEmotionTag(event.target.value);
  };

  // Enter 입력 시 감정을 추가하는 이벤트 핸들러
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // 이미 등록된 감정일 경우 alert창을 띄우고 등록 예외 처리
      if (emotionTags.find((item) => item.emotionTag === newEmotionTag)) {
        window.alert('이미 등록된 감정이에요.');
        return;
      }

      // 새로운 감정일 경우 emotionTag state에 추가
      postNewEmotionTag();
      setNewEmotionTag('');
    }
  };

  // Text Area의 값을 state에 저장하는 이벤트 핸들러
  const handleTextAreaChange = (event) => {
    setEmotionInpuText(event.target.value);
  };

  // 최초 렌더링 시 및 isEmotionTagUpdated가 true일 때 태그 목록 가져오기
  useEffect(() => {
    if (isEmotionTagUpdated) {
      getEmotionTags();
      setIsEmotionTagUpdated(false); // 상태를 다시 초기화 (get 이후)
    }
  }, [isEmotionTagUpdated]);

  useEffect(() => {
    getEmotionTags();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTab onClick={() => handleTabClick(0)} selected={selectedTab === 0}>
          감정 기록하기
        </HeaderTab>
        <HeaderTab onClick={() => handleTabClick(1)} selected={selectedTab === 1}>
          내 감정
        </HeaderTab>
      </Header>

      {!selectedTab ? (
        <div>
          <HeadingText>감정 태그 선택하기</HeadingText>
          <ChipContainer>
            <InputChip placeholder="+ 추가하기" value={newEmotionTag} onChange={handleInputChipChange} onKeyPress={handleKeyPress}></InputChip>
            {emotionTags === null ? (
              <div></div>
            ) : (
              emotionTags.map((item, index) => (
                <Chip key={index} onClick={() => handleChipClick(index)} selected={selectedEmotion === index}>
                  {`# ${item.emotionTag}`}
                </Chip>
              ))
            )}
          </ChipContainer>
          <HeadingText>감정 기록하기</HeadingText>
          <EmotionTextArea placeholder="음악을 들으며 느낀 감정을 기록해보세요." value={emotionInputText} onChange={handleTextAreaChange}></EmotionTextArea>
          <SaveBtn onClick={postEmotionLog}>저장하기</SaveBtn>
        </div>
      ) : (
        <MyEmotionLogContainer>
          {emotionLogs === null || emotionLogs.length === 0 ? (
            <div></div>
          ) : (
            emotionLogs.map((item, index) => (
              <MyEmotionLogCard key={index}>
                <div>
                  <Chip selected={true}>{`# ${item.emotionTag}`}</Chip>
                </div>
                <MyEmotionLogText>{item.contents}</MyEmotionLogText>
                <MyEmotionLogDateText>{formatDate(item.createdAt)}</MyEmotionLogDateText>
              </MyEmotionLogCard>
            ))
          )}
        </MyEmotionLogContainer>
      )}
    </Container>
  );
};

export default AddEmotionCard;
