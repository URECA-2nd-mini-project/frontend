import React, { useRef } from 'react';
import styled from 'styled-components';
import AlbumIcon from '../../assets/icons/album.svg?react';
import PalyButton from '../../assets/icons/play-button.svg?react';
import MusicIcon from '../../assets/icons/musiclist-alt.svg?react';
import PlayDetail from '../../assets/icons/list-detail.svg?react';
import CardImg from '../../assets/icons/card-image.svg?react';

const Background = styled.div`
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
const PlayAll = styled.div`
  margin-top: 30px;
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
  margin: 50px 20px 5px 0px;
`;

const CardText = styled.div`
  border-radius: 8px;
  width: 350px;
  height: 150px;
  background-color: white;
  padding: 5px;
`;

const UserImg = styled.div`
  width: 350px;
  height: 360px;
  background-color: var(--primary-color);
  border-radius: 8px;
  margin-bottom: 2px;
`;
const Playlistbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
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

const PlayBox = styled.div`
  background-color: white;
  width: 560px;
  height: 75px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border:
    1px solid,
    white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const Album = styled.div`
  width: 64px;
  height: 64px;
  border: 1px, solid, black;
`;

const Song = styled.div`
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
  margin: 3px;
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
`;
function index(props) {
  const imageInput = useRef();
  const imgupload = () => {
    imageInput.current.click();
  };
  // const imageInput = useRef();
  // const imgupload = () => {
  //   imageInput.current.click();
  // };

  return (
    <Background>
      <Container>
        <PlayAll>
          <div>
            <Card>
              <div>
                <UserImg>
                  <CardImg></CardImg>
                </UserImg>
                <input type="file" style={{ display: 'none' }} ref={imageInput}></input>
                <TagBg onClick={imgupload}>수정</TagBg>

                <CardText>
                  🌆🥺🪩😆🚘 <br />
                  퇴근 후 드라이브 노래로 딱인 플리 <br />이 플리 하나면 집 도착!!!
                </CardText>
              </div>
            </Card>
          </div>
          <div>
            <Playlistbar>
              <MusicIcon></MusicIcon>
              <PlaylistTitle>드라이브엔 역시 올드 시티팝</PlaylistTitle>
              <PlayDetail></PlayDetail>
            </Playlistbar>
            <PlayBg>
              <PlayBox>
                <Album>
                  <AlbumIcon></AlbumIcon>
                </Album>
                <Song>
                  <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                  <div>유재하</div>
                </Song>
                <PalyButton></PalyButton>
              </PlayBox>
              <PlayBox>
                <Album>
                  <AlbumIcon></AlbumIcon>
                </Album>
                <Song>
                  <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                  <div>유재하</div>
                </Song>
                <PalyButton></PalyButton>
              </PlayBox>
              <PlayBox>
                <Album>
                  <AlbumIcon></AlbumIcon>
                </Album>
                <Song>
                  <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                  <div>유재하</div>
                </Song>
                <PalyButton></PalyButton>
              </PlayBox>
              <PlayBox>
                <Album>
                  <AlbumIcon></AlbumIcon>
                </Album>
                <Song>
                  <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                  <div>유재하</div>
                </Song>
                <PalyButton></PalyButton>
              </PlayBox>
              <PlayBox>
                <Album>
                  <AlbumIcon></AlbumIcon>
                </Album>
                <Song>
                  <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>지난 날</div>
                  <div>유재하</div>
                </Song>
                <PalyButton></PalyButton>
              </PlayBox>
            </PlayBg>
          </div>
        </PlayAll>
      </Container>
    </Background>
  );
}

export default index;
