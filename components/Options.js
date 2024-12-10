'use client'
import { useState } from 'react';
import Tile from './Tile';

function Options(){

  const options_list = [
    {key:'0', img:'/raw.jpg', title:'Raw Feed', opts: null},
    {key:'1', img:'/bounding_box.png', title:'Bounding Box', opts: null},
    {key:'2', img:'/segmentation.png', title:'Segmentation', opts: null},
    {key:'3', img:'/pose_black.png', title:'Pose', opts: [{key: '0', title: 'Black Background'}]},
    {key:'4', img:'/tracking.png', title:'Tracking', opts: [{key: '0', title: 'Left Hand'}, {key: '1', title: 'Right Hand'}, {key: '2', title: 'Nose'}]},
    {key:'5', img:'/outline_black.png', title:'Outline', opts: [{key: '0', title: 'Black Background'}]},
    {key:'6', img:'/mask_blur.png', title:'Masking', opts: [{key: '0', title: 'Black Filling'}, {key: '1', title: 'Blurring'}]},
    {key:'7', img:'/mask_color_pose.png', title:'Pose+Masking', opts: [{key: '0', title: 'Black Filling'}, {key: '1', title: 'Blurring'}]},
]

    const [mode, setMode] = useState({key: '0', opt_key: null});

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
      {      
        options_list.map((item, key) => {
          // console.log(item, key)
        return (
          <Tile key={key} switchMode={switchMode} mode={mode} idx={item.key} img={item.img} title={item.title} opts={item.opts}  />
          )
        })  
      }
    </div>
    </>
  )
}

export default Options

