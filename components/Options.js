'use client'
import { useState } from 'react';
import Tile from './Tile';

function Options() {

    const [mode, setMode] = useState({txt:'Raw Feed', key:0});

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
    <div className=" m-5 mt-2 mr-0 rounded-xl overflow-scroll flex flex-col  h-[490px] space-y-4 shadow-card ">
    <Tile switchMode={switchMode} mode={mode} idx={0} img={'/raw.jpg'} txt={'Raw Feed'}/>
        <Tile switchMode={switchMode} mode={mode} idx={1} img={'/bounding_box.png'} txt={'Bounding Box'}  />
        <Tile switchMode={switchMode} mode={mode} idx={2} img={'/segmentation.png'} txt={'Segmentation'} />
        <Tile switchMode={switchMode} mode={mode} idx={3} img={'/pose_black.png'} txt={'Pose'} opts={['Black Background']} />
        <Tile switchMode={switchMode} mode={mode} idx={4} img={'/tracking.png'} txt={'Tracking'} opts={['Left Hand', 'Right Hand', 'Nose',]}  />
        <Tile switchMode={switchMode} mode={mode} idx={5} img={'/outline_black.png'} txt={'Outline'} opts={['Black Background']} />
        <Tile switchMode={switchMode} mode={mode} idx={6} img={'/mask_blur.png'} txt={'Masking'} opts={['Black Filling', 'Blurring']} />
        <Tile switchMode={switchMode} mode={mode} idx={7} img={'/mask_color_pose.png'} txt={'Pose+Masking'} opts={['Black Filling', 'Blurring']} />
    </div>
    </>
  )
}

export default Options

// p5 makes picture in new line... check outline for example.
