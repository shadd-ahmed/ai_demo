'use client'
import { useState, useEffect, useRef } from 'react';
import {socket} from '../socket'
// import { io } from 'socket.io-client';


export default function Camera() {
   // Your Flask server URL
const [processedImage, setProcessedImage] = useState(null);
const canvasRef = useRef(null);
const videoRef = useRef(null);
const socketRef = useRef(null);


useEffect(() => {
  // Initialize WebSocket connection
  // const socket = io('http://localhost:5000', { reconnection: false,  // Disable automatic reconnections
  // });
    // socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Listen for the processed image from the backend
    socket.on('processed_frame', (data) => {
      // Handle the processed frame from the server
      if (data.image) {
        // console.log('data image', data.image)
        setProcessedImage(data.image);  // Set the image received from server
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.close();  // Cleanup the connection
    };
  }, []);

  useEffect(() => {
    // Initialize the camera feed when the component mounts
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 }, // Set ideal width (you can adjust this)
            height: { ideal: 480 }, // Set ideal height
            frameRate: { ideal: 20, min: 10 } // Set ideal frame rate (try 30fps or 15fps)
          },
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    };

    startVideo();
    
    // Cleanup the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureAndSendFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    // Set canvas size to match the video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to Base64-encoded PNG
    const base64Image = canvas.toDataURL('image/png');

    // if (socketRef.current && socketRef.current.connected) {
      // }
    socket.emit('send_frame', { image: base64Image});

  };

  useEffect(() => {
    // Capture and send a frame every 100ms for real-time processing
    const intervalId = setInterval(captureAndSendFrame, 100);

    // Cleanup interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };

    // className="hidden"
  }, []);

  return (
    <>
      <video ref={videoRef} autoPlay playsInline   className="hidden" />
      <canvas ref={canvasRef} className="hidden"/>

      {processedImage && (
        <div className="aspect-video w-[70%] h-1/2 bg-gray-900 p-5 m-5 rounded-xl">
            <img src={processedImage} alt="Processed Frame" className="aspect-video w-full rounded-xl border-2 border-gray-300" />
        </div>
      )}
    </>
  );
}
