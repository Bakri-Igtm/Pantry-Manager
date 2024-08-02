// CameraCapture.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box } from '@mui/material';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <Box>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        width="100%"
        height="auto"
      />
      <Button variant="contained" onClick={capture}>
        Capture
      </Button>
    </Box>
  );
};

export default CameraCapture;
