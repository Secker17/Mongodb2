import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaExpand, FaStar, FaMoon, FaSun, FaTrash, FaHome, FaBook, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Arial', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const lightTheme = {
  body: '#f0f0f0',
  text: '#000',
  card: '#fff',
  sidebar: '#1a1a1a',
  sidebarText: '#fff'
};

const darkTheme = {
  body: '#1a1a1a',
  text: '#fff',
  card: '#333',
  sidebar: '#000',
  sidebarText: '#fff'
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  background: ${({ theme }) => theme.sidebar};
  color: ${({ theme }) => theme.sidebarText};
  padding: 20px;
  flex-shrink: 0;
  overflow-y: auto;
  position: fixed;
  height: 100vh;
`;

const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background: #333;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const NavIcon = styled.div`
  margin-right: 10px;
`;

const MainContent = styled.div`
  margin-left: 320px;
  background: ${({ theme }) => theme.body};
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled(FaUser)`
  margin-left: 20px;
  cursor: pointer;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CourseCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.text};
  margin: 0 5px;
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Progress = styled.div`
  width: 100%;
  height: 5px;
  background: #ddd;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #1a73e8;
`;

const Duration = styled.div`
  margin-top: 10px;
  color: #555;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Star = styled(FaStar)`
  color: ${({ rated }) => (rated ? '#ff0' : '#ccc')};
  cursor: pointer;
  margin-right: 5px;
`;

const CommentSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const CommentList = styled.div`
  margin-top: 10px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #ddd;
`;

const DeleteIcon = styled(FaTrash)`
  color: #f00;
  margin-left: 10px;
  cursor: pointer;
`;

const CategoryFilter = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Home = () => {
  const [currentVideo, setCurrentVideo] = useState('video1.mp4');
  const [playingStatus, setPlayingStatus] = useState({});
  const [progress, setProgress] = useState({});
  const [durations, setDurations] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem('ratings')) || {});
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || {});
  const [watchLater, setWatchLater] = useState(JSON.parse(localStorage.getItem('watchLater')) || []);
  const [category, setCategory] = useState('All');
  const [theme, setTheme] = useState(lightTheme);
  const videoRefs = useRef({});

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  const handlePlayPause = (video) => {
    setPlayingStatus(prev => ({
      ...prev,
      [video]: !prev[video]
    }));
  };

  const handleFullScreen = (video) => {
    const player = videoRefs.current[video].wrapper;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      player.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  };

  const handleProgress = (video, progress) => {
    setProgress(prev => ({
      ...prev,
      [video]: progress.played
    }));
  };

  const handleDuration = (video, duration) => {
    setDurations(prev => ({
      ...prev,
      [video]: duration
    }));
  };

  const handleRating = (video, rating) => {
    setRatings(prev => ({
      ...prev,
      [video]: rating
    }));
  };

  const handleComment = (video, comment) => {
    setComments(prev => ({
      ...prev,
      [video]: [...(prev[video] || []), comment]
    }));
  };

  const handleDeleteComment = (video, index) => {
    setComments(prev => ({
      ...prev,
      [video]: prev[video].filter((_, i) => i !== index)
    }));
  };

  const handleAddToWatchLater = (video) => {
    if (!watchLater.includes(video)) {
      setWatchLater([...watchLater, video]);
    }
  };

  const handleRemoveFromWatchLater = (video) => {
    setWatchLater(watchLater.filter(item => item !== video));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
    toast(`Byttet til ${theme === lightTheme ? 'Dark' : 'Light'} mode`);
  };

  const videoCategories = {
    'video1.mp4': 'Virtualisering',
    'video2.mp4': 'Database',
    'video3.mp4': 'Database'
  };

  const videoTitles = {
    'video1.mp4': 'Sett opp VMware',
    'video2.mp4': 'Sett opp Atlas og Compass',
    'video3.mp4': 'Sett opp din mongoDB server selv'
  };

  const filteredVideos = Object.keys(videoTitles).filter(video =>
    (videoTitles[video].toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === 'All' || videoCategories[video] === category)
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer />
      <Container>
        <Sidebar>
          <h1>SECKER</h1>
          <NavButton to="/">
            <NavIcon><FaHome /></NavIcon>
            Hjem
          </NavButton>
          <NavButton to="/guide">
            <NavIcon><FaBook /></NavIcon>
            Guide
          </NavButton>

          <p>Mine favoritter:</p>
          <ul>
            {watchLater.map(video => (
              <li key={video}>
                {videoTitles[video]}
                <FaTrash onClick={() => handleRemoveFromWatchLater(video)} />
              </li>
            ))}
          </ul>
        </Sidebar>
        <MainContent>
          <Header>
            <HeaderLeft>
              <h2>Kurs Bibliotek</h2>
              <input 
                type="text" 
                placeholder="Finn video" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <CategoryFilter onChange={(e) => setCategory(e.target.value)}>
                <option value="All">Alle</option>
                <option value="Virtualisering">Virtualisering</option>
                <option value="Database">Database</option>
              </CategoryFilter>
            </HeaderLeft>
            <div>
              <Icon onClick={toggleTheme}>
                {theme === lightTheme ? <FaMoon /> : <FaSun />}
              </Icon>
              <UserIcon />
            </div>
          </Header>
          <CourseGrid>
            {filteredVideos.map(video => (
              <CourseCard key={video} onClick={() => setCurrentVideo(video)}>
                <h3>{videoTitles[video]}</h3>
                <ReactPlayer
                  ref={ref => videoRefs.current[video] = ref}
                  url={require(`../videoer/${video}`)}
                  width="100%"
                  height="auto"
                  controls
                  playing={playingStatus[video] || false}
                  onProgress={(progress) => handleProgress(video, progress)}
                  onDuration={(duration) => handleDuration(video, duration)}
                />
                <Progress>
                  <ProgressBar style={{ width: `${(progress[video] || 0) * 100}%` }} />
                </Progress>
                <Duration>
                  Varighet: {durations[video] ? `${Math.floor(durations[video] / 60)}m ${Math.floor(durations[video] % 60)}s` : 'Laster...'}
                </Duration>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      rated={i < (ratings[video] || 0)} 
                      onClick={() => handleRating(video, i + 1)}
                    />
                  ))}
                </Rating>
                <Controls>
                  <Icon onClick={() => handlePlayPause(video)}>
                    {playingStatus[video] ? <FaPause /> : <FaPlay />}
                  </Icon>
                  <Icon onClick={() => handleFullScreen(video)}>
                    <FaExpand />
                  </Icon>
                </Controls>
                <Controls>
                  <button onClick={() => handleAddToWatchLater(video)}>Favoritt</button>
                </Controls>
                <CommentSection>
                  <h4>Kommentarer</h4>
                  <CommentInput 
                    placeholder="Legg til en kommentar" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim() !== '') {
                        handleComment(video, e.target.value);
                        e.target.value = '';
                      }
                    }} 
                  />
                  <CommentList>
                    {(comments[video] || []).map((comment, index) => (
                      <Comment key={index}>
                        {comment}
                        <DeleteIcon onClick={() => handleDeleteComment(video, index)} />
                      </Comment>
                    ))}
                  </CommentList>
                </CommentSection>
              </CourseCard>
            ))}
          </CourseGrid>
        </MainContent>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
