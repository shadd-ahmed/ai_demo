import React from 'react'

const Radio = ({check, title, change}) => {
    const radio_style = 'transition-all appearance-none rounded-full cursor-pointer h-3 w-3 ring-2 ring-[#CA6A2E] bg-none checked:border-2 checked:bg-orange-400 checked:border-white'

  return (
<>
                <input
                  type="radio"
                  name="mode"
                  checked={check}
                  onChange={change}
                  className= {radio_style}
                />
                <label className="text-white text-xl font-['Montserrat'] pl-2 ">{title}</label>
</>  
)
}

export default Radio