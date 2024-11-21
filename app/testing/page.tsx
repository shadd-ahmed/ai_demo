'use client'
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');  // Your Flask server URL

import React from 'react'

const page = () => {
  useEffect(() => {
    // Listen for connection event
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
  
    // Clean up socket connection when component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.close();
    };
  }, []);
  return (
    <div>page</div>
  )
}

export default page


