import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils/formatTime';
import Play from '../assets/icons/play.svg?react';
import Pause from '../assets/icons/pause.svg?react';
import Next from '../assets/icons/play-next.svg?react';
import Prev from '../assets/icons/play-prev.svg?react';

const Container = styled.div`
  width: calc(100% - 128px);
  height: 160px;
  padding: 0 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  z-index: 2;
  position: absolute;
  bottom: 0%;
  background-color: var(--gray-bright-color); // 불투명도 어떻게?
  backdrop-filter: blur(10px);
`;

const ThumbnailImg = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 32px;
`;

const TitleContainer = styled.div`
  /* width: 160px; */
  margin-right: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
  white-space: nowrap;
`;

const TitleText = styled.div`
  color: var(--gray-dark-color);
  font-size: 20px;
  font-weight: 600;
`;

const ArtistText = styled.div`
  color: var(--gray-medium-color);
  font-size: 18px;
  font-weight: 500;
`;

const ProgressBarContainer = styled.div`
  width: 520px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 80px;
`;

const Slider = styled.input`
  margin: 0 20px;
  /* removing default appearance */
  -webkit-appearance: none;
  appearance: none;

  /* creating a custom design */
  width: 100%;
  cursor: pointer;
  outline: none;

  /*  slider progress trick  */
  overflow: hidden;
  border-radius: 16px;
  -webkit-appearance: none;

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: #ffffff;
    border-radius: 16px;
  }
  &::-webkit-slider-thumb {
    /* 기본 테마 숨김 */
    -webkit-appearance: none;
    appearance: none;

    /* 커스텀 디자인 생성 */
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: var(--primary-color);

    /*  슬라이더 progressed bar 색상 설정 트릭  */
    box-shadow: -405px 0 0 400px var(--primary-color);
  }
`;

const DurationText = styled.div`
  color: var(--gray-light-color);
  font-size: 16px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  width: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 48px;
`;

const PlayBar = () => {
  const [played, setPlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(null);

  const playerRef = useRef(null);

  // 재생, 정지 상태를 설정
  // TODO) spacebar 입력 시 재생/정지되게 하는 eventhandler 추가
  const handleIsPlaying = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  // 음악 전체 길이(duration)를 설정
  const handleDuration = (durationValue) => {
    setDuration(durationValue);
  };

  // mouseDown 이벤트 발생 시 seek 상태를 설정
  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  // Slider 값 변경 시 변경된 값으로 played 값을 업데이트
  const handleSeekChange = (event) => {
    setPlayed(parseFloat(event.target.value));
  };

  // mouseUp 이벤트 발생 시 seek 상태 설정 및 playerRef 값 업데이트
  const handleSeekMouseUp = (event) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(event.target.value));
  };

  // 현재 재생 시간을 업데이트
  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const ThumbnailLink = 'https://img.youtube.com/vi/b4AuXkbe288/maxresdefault.jpg';

  // duration 값이 설정된 후 화면 렌더링
  useEffect(() => {
    if (duration) {
      setDuration(duration);
    }
  }, [duration]);

  // played 값이 변경될 때마다 화면 렌더링
  useEffect(() => {}, [played]);

  return (
    <Container>
      <ThumbnailImg src={ThumbnailLink} referrerPolicy="no-referrer"></ThumbnailImg>
      <TitleContainer>
        <TitleText>한걸음 더</TitleText>
        <ArtistText>윤상</ArtistText>
      </TitleContainer>
      <ProgressBarContainer>
        <DurationText>{formatTime(played * duration)}</DurationText>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=b4AuXkbe288"
          width={0}
          height={0}
          ref={playerRef}
          playing={isPlaying}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        <Slider
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
        <DurationText>{formatTime(duration)}</DurationText>
      </ProgressBarContainer>
      <ButtonContainer>
        <Prev />
        <div onClick={handleIsPlaying}>{isPlaying ? <Play /> : <Pause />}</div>
        <Next />
      </ButtonContainer>
    </Container>
  );
};

export default PlayBar;
