'use client';
import Image from 'next/image';
import { useState } from 'react';

const Tile = ({ switchMode, mode, txt, img = '/pose_color.png', opts = [] }) => {
  const isSelected = mode.txt === txt || opts.includes(mode.txt); // Handle selected state for parent and child options

  return (
    <div
      className={`rounded-md border-[#CA6A2E] my-2 w-full border-b-2 transition-all ${
        isSelected ? 'bg-gray-800' : 'bg-gray-900'
      }`}
    >
      {/* Primary Option */}
      <div className="flex flex-wrap justify-between items-center p-4">
        <div className="flex items-center">
          <input
            type="radio"
            name="mode"
            value={txt}
            checked={mode.txt === txt}
            onChange={() => switchMode({ txt })}
            className="h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2"
          />
          <label
            htmlFor={txt}
            className="text-white text-lg font-['Montserrat'] px-2 cursor-pointer"
          >
            {txt}
          </label>
        </div>
        <div>
          <Image
            className="rounded-md"
            src={img}
            width={50}
            height={20}
            alt={`${txt} thumbnail`}
          />
        </div>
      </div>

      {/* Additional Options */}
      {isSelected && opts.length > 0 && (
        <div className="mx-5 my-3 space-y-2">
          {opts.map((key, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                name="mode"
                value={key}
                checked={mode.txt === key}
                onChange={() => switchMode({ txt: key })}
                className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={key}
                className="text-white text-md font-['Montserrat'] px-2 cursor-pointer"
              >
                {key}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tile;
