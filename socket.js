'use client'
import { io } from 'socket.io-client';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
export const socket = io('http://localhost:5000');