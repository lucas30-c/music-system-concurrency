import React, { useState, useRef, useEffect } from "react";
import { IconButton, Slider, Stack } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Typography from "@mui/material/Typography";

function MusicPlayer({ audioSource }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("durationchange", handleDurationChange);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleVolumeChange = (e, newValue) => {
    audioRef.current.volume = newValue;
    setVolume(newValue);
  };

  const toggleVolumeControl = () => {
    setVolumeOpen(!volumeOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <Typography align='center'>
        Listen to the audio clip below
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mb: 1 }}
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "300px" }}
      >
        <IconButton onClick={togglePlayPause} size="medium">
          {isPlaying ? (
            <PauseCircleIcon fontSize="inherit" />
          ) : (
            <PlayCircleIcon fontSize="inherit" />
          )}
        </IconButton>

        <Slider
          value={typeof currentTime === "number" ? currentTime : 0}
          max={typeof duration === "number" ? duration : 100}
          onChange={handleSliderChange}
          style={{ flexGrow: 1 }} // allow it to take up available space
        />

        <IconButton onClick={toggleVolumeControl} size="medium">
          <VolumeUpIcon />
        </IconButton>

        {volumeOpen && (
          <div style={{ position: 'absolute', right: -10, top: '15%', zIndex: 1 }}>
            <Slider
              value={volume}
              min={0}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              orientation="vertical"
              style={{ height: '90px' }}
            />
          </div>
        )}
      </Stack>
      <div>
        {typeof currentTime === "number" ? formatTime(currentTime) : "..."} /
        {typeof duration === "number" ? formatTime(duration) : "..."}
      </div>

      {/* {volumeOpen && (
        <Slider
          value={volume}
          min={0}
          max={0.5}
          step={0.01}
          onChange={handleVolumeChange}
          style={{ width: "100px" }}
        />
      )} */}
      <audio ref={audioRef} src={audioSource} />
    </div>
  );
}

export default MusicPlayer;