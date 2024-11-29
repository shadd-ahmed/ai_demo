'use client'
import Image from 'next/image'
import { useState } from 'react'

const Tile = ({switchMode, mode, txt, img, opts}) => { 
  // console.log(mode, txt)
  const rst = 'text-orange-500 bg-gray-100 border-gray-300 '
  // focus:ring-orange-500 focus:ring-2
  return (
    <div className='rounded-md border-[#CA6A2E] my-2 w-full border-b-2 '>
        <div className="flex flex-wrap flex-row justify-between p-4">
            <div>
              <input
                // className={rst}
                type="radio"
                name="mode"
                value="raw"
                checked={mode.txt === txt}
                onChange={() => switchMode({txt})}
                className="text-red-600 bg-gray-100 border-red-300 h-5 w-5"
              />
              <label className="text-white text-lg font-['Montserrat'] px-2 ">{txt}</label>
            </div>
            <div>
                <Image className='rounded-md' src="/pose_color.png"  width={50} height={20} alt="Picture of the author"/>
            </div>
        </div>

        {(mode.txt.includes(txt)) ? 
          (opts) ?
          <div className='mx-5'>
            {opts.map(key => {
              return (
              <div>
                <input
                  type="radio"
                  name="mode"
                  value="raw"
                  checked={mode.txt === key}
                  onChange={() => switchMode({txt:key})}
                  className="form-radio text-blue-600 h-5 w-5"
                />
                <text className="text-white text-lg font-['Montserrat'] px-2 ">{key}</text>
              </div>

            
            )
              
            })}
          </div> : '' : ''
        }  
        
    </div>
  )
}

export default Tile