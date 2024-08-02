"use client"
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';

export const CaptureImage = ({ onCapture }) => { 
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user');

  const handleCapture = () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        onCapture(imageSrc); 
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const handleSwitchCamera = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === 'user' ? 'environment' : 'user'))
  }

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{facingMode}}
      />
      <Button variant="contained" onClick={handleCapture}>Capture Image</Button>
      <Button variant="outlined" onClick={handleSwitchCamera}>
        Switch camera
      </Button>
      {capturedImage && <img src={capturedImage} alt="Captured" />}
    </div>
  );
};


