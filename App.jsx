import React, { useState, useEffect } from 'react';
import './App.css';
import pfp from './images/pfp1.gif';
import view from './images/viewW.svg';
import twitter from './images/x.png';
import insta from './images/insta.png';
import yt from './images/yt.png';
import discord from './images/discord.png';
import cover from './images/cover.png';
import download from './images/download.png';


import git from './images/git2.png';



import stop from './song/stopplayin.mp3';
import bg from './videos/ghostclient.mp4';


function App() {
  const [viewCount, setViewCount] = useState(3242);
  const [currentTime, setCurrentTime] = useState(0);
  const maxTime = 256;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOverlayClicked, setIsOverlayClicked] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [cssLabel, setCssLabel] = useState('Copy BTC Address');
  const [cssLabel1, setCssLabel1] = useState('Copy LTC Address');
  const [bio, setBio] = useState('');
  const [entered, setEntered] = useState(false); // State for animation

  // Typewriter effect
  const [bioText, setBioText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTyping) {
        if (index < bioText.length) {
          setBio(prevBio => prevBio + bioText.charAt(index));
          setIndex(prevIndex => prevIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (index >= 0) {
          setBio(prevBio => prevBio.slice(0, index));
          setIndex(prevIndex => prevIndex - 1);
        } else {
          setIsTyping(true);
        }
      }
    }, 50);

    return () => clearInterval(timer); // Cleanup the timer
  }, [bioText, index, isTyping]);

  useEffect(() => {
    fetch('/increment-view')
      .then(response => response.json())
      .then(data => setViewCount(data.viewCount))
      .catch(error => console.error('Error:', error));

    // Other side effects...

  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }

  useEffect(() => {
    const audioElement = document.getElementById('audio');

    if (!isPlaying && isOverlayClicked) {
      audioPlay();
      setIsPlaying(true);
    }

    const interval = setInterval(() => {
      const elapsedTime = Math.round(audioElement.currentTime);
      setCurrentTime(elapsedTime);

      if (elapsedTime >= maxTime) {
        audioElement.currentTime = 0;
        setCurrentTime(0);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isOverlayClicked, maxTime]);

  const handleCopyAddress = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel('Copy BTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };
  
  const handleCopyAddress1 = (address, label) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus('Copied');
        setCssLabel1('Copied');
        setTimeout(() => {
          setCopyStatus('');
          setCssLabel1('Copy LTC Address');
        }, 2000);
      })
      .catch(error => console.error('Error copying address to clipboard:', error));
  };
  
  function audioPlay() {
    var audio = document.getElementById('audio');
    audio.volume = 1;
    audio.play();
  }
  const handlePlayPause = () => {
    const audioElement = document.getElementById('audio');
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleOverlayClick = () => {
    setShowOverlay(false);
    setIsOverlayClicked(true);
    audioPlay();
    setEntered(true); // Trigger the animation
  };

  return (
    <div className='app-container'>
<div class="snowflakes" aria-hidden="true">
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
        <div class="snowflake"><div class="inner">❅</div></div>
    </div>

<img src="https://lanyard.cnrad.dev/api/525412910206550036?hideActivity=whenNotUsed" alt="Discord" class="discord"></img>
<a href="https://discord.com/users/525412910206550036" target="_blank" rel="noopener noreferrer">
<img src={discord} className='link5' alt="Discord" />
</a>
<a href="https://send.zcyph.cc/download/f385ffe323422d78/#5rAp70xZe-6BlyRDTd3WfA" target="_blank" rel="noopener noreferrer">
<img src={download} className='download' alt="Download" />
<p1 className='download-text'>Download Public Loader</p1>  
</a>

      <video autoPlay loop muted className='video-background'>
        <source src={bg} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}>
          <p1 className='click'>Clique</p1>

        </div>
      )}
      <div className={`main-container ${entered ? 'entered' : ''}`}>
        <img src={view} className='view' alt="View Icon" />
        <p1 className='num'>{viewCount}</p1>  
          <audio id='audio' src={stop} />
        </div>

      </div>

  );
}

export default App;
