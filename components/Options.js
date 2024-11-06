'use client'
import { useState } from 'react';

function Options() {

    const [mode, setMode] = useState('raw');

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
    <div className="flex flex-col justify-center bg-gray-900 p-4 m-5 rounded-xl">
        <h2 className="text-white text-xl font-semibold mb-6">Choose Mode</h2>

        {/* Radio Buttons */}
        <div className="flex flex-col items-start space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="raw"
              checked={mode === 'raw'}
              onChange={() => switchMode('raw')}
              className="form-radio text-blue-600 h-5 w-5"
            />
            <span className="ml-2 text-white text-lg">Raw Feed</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="segmentation"
              checked={mode === 'segmentation'}
              onChange={() => switchMode('segmentation')}
              className="form-radio text-green-600 h-5 w-5"
            />
            <span className="ml-2 text-white  text-lg">Segmentation</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="bounding-box"
              checked={mode === 'bounding-box'}
              onChange={() => switchMode('bounding-box')}
              className="form-radio text-red-600 h-5 w-5"
            />
            <span className="ml-2 text-white text-lg">Bounding Box</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="pose"
              checked={mode === 'pose'}
              onChange={() => switchMode('pose')}
              className="form-radio text-red-600 h-5 w-5"
            />
            <span className="ml-2 text-white text-lg">Pose</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="pose"
              checked={mode === 'sam'}
              onChange={() => switchMode('sam')}
              className="form-radio text-red-600 h-5 w-5"
            />
            <span className="ml-2 text-white text-lg">sam</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="maskblack"
              checked={mode === 'maskblack'}
              onChange={() => switchMode('maskblack')}
              className="form-radio text-red-600 h-5 w-5"
            />
            <span className="ml-2 text-white text-lg">mask-black</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="maskblur"
              checked={mode === 'maskblur'}
              onChange={() => switchMode('maskblur')}
              className="form-radio text-red-600 h-5 w-5"
            />
            <span className="ml-2 text-white text-lg">mask-blur</span>
          </label>
        </div>
      </div>
    </>
  )
}

export default Options