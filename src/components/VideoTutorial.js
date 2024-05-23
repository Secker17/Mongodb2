// VideoTutorial.js
import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaExpand } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
  }
`;

const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  background-image: linear-gradient(to top left, #ffffff, #f0f4ff);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const VideoListContainer = styled.div`
  flex: 1;
  padding: 10px;
  border-right: 2px solid #ddd;
  overflow-y: auto;

  @media (max-width: 767px) {
    border-right: none;
    border-bottom: 2px solid #ddd;
  }
`;

const VideoListItem = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: none;
  text-align: left;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
  border-radius: 5px;

  &:hover {
    background-color: #e8f0fe;
  }
`;

const VideoContainer = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledVideo = styled(ReactPlayer)`
  width: 100%;
  max-width: 720px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  margin-right: 10px;
  border-radius: 5px;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  color: #333;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SpeedControl = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-left: auto;
`;

const Description = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #555;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const VideoTutorial = () => {
  const [currentVideo, setCurrentVideo] = useState('video1.mp4');
  const videos = {
    'video3.mp4': 'Sett opp din MongoDB server med Atlas',
    'video2.mp4': 'Sett opp din mongoDB server selv',
    'video1.mp4': 'Sett opp VMware',
  };
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleSpeedChange = (event) => {
    setPlaybackRate(parseFloat(event.target.value));
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <>
      <GlobalStyle />
      <TutorialContainer>
        <VideoListContainer>
          {Object.entries(videos).map(([file, title]) => (
            <VideoListItem key={file} onClick={() => setCurrentVideo(file)}>
              {title}
            </VideoListItem>
          ))}
        </VideoListContainer>
        <VideoContainer>
          <Title>{videos[currentVideo]}</Title>
          <StyledVideo
            ref={videoRef}
            url={require(`../videoer/${currentVideo}`)}
            playing
            controls
            playbackRate={playbackRate}
            width="100%"
            height="auto"
          />
          <Controls>
            <Button onClick={() => videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10)}>
              <Icon>
                <FaPlay style={{ transform: 'rotate(180deg)' }} />
              </Icon>
            </Button>
            <Button onClick={() => videoRef.current.pausePreview()}>
              <Icon>
                <FaPause />
              </Icon>
            </Button>
            <Button onClick={() => videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10)}>
              <Icon>
                <FaPlay />
              </Icon>
            </Button>
            <Button onClick={toggleFullscreen}>
              <Icon>
                <FaExpand />
              </Icon>
            </Button>
            <SpeedControl value={playbackRate} onChange={handleSpeedChange}>
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </SpeedControl>
          </Controls>
          <Description>
            Følg sammen med videoen for å sette opp din MongoDB server. {videos[currentVideo]?.toLowerCase() ?? 'ingen video valgt'}.
          </Description>
        </VideoContainer>
      </TutorialContainer>
    </>
  );
};

export default VideoTutorial;