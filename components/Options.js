'use client';
import { useState } from 'react';
import Tile from './Tile';

function Options() {
  const [mode, setMode] = useState({ txt: 'Raw Feed' });

  const switchMode = async (newMode) => {
    setMode(newMode);

    // Send a POST request to switch mode in the backend
    await fetch('/api/set_mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: newMode }),
    });
  };

  return (
    <>
      <div className="p-5 m-5 rounded-xl overflow-scroll flex flex-col h-[500px] space-y-4 bg-gray-900 shadow-card">
        <Tile switchMode={switchMode} mode={mode} txt={'Raw Feed'} />
        <Tile switchMode={switchMode} mode={mode} txt={'Bounding Box'} />
        <Tile switchMode={switchMode} mode={mode} txt={'Segmentation'} />
        <Tile switchMode={switchMode} mode={mode} txt={'Pose'} opts={['Pose with Black Background']} />
        <Tile switchMode={switchMode} mode={mode} txt={'Tracking'} />
        <Tile switchMode={switchMode} mode={mode} txt={'Outline'} opts={['Outline with Black Background']} />
        <Tile switchMode={switchMode} mode={mode} txt={'Masking'} opts={['Masking with Black Filling', 'Masking with Blurring']} />
        <Tile switchMode={switchMode} mode={mode} txt={'Pose + Masking'} opts={['Pose + Masking with Black Filling', 'Pose + Masking with Blurring']} />
      </div>
    </>
  );
}

export default Options;
