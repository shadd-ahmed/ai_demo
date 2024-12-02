import Image from 'next/image'

// css - default is opacity. if checked then bright...

const Tile = ({switchMode, mode, txt, img, opts, idx}) => { 
  // console.log(mode, txt)
  const radio = 'transition-all appearance-none rounded-full cursor-pointer h-3 w-3 ring-2 ring-[#CA6A2E] bg-none checked:border-2 checked:bg-orange-400 checked:border-white'
  const selected = 'rounded-md border-[#CA6A2E] my-2  w-full border-b-2' // highlight the selected option
  const def = 'rounded-md border-[#CA6A2E] my-2 w-full border-b-2 opacity-45'
  // focus:ring-orange-500 focus:ring-2
  return (
    <div className={mode.key === idx ? selected : def} >
        <div className="flex flex-wrap flex-row justify-between pb-2">
            <div className='flex flex-wrap flex-col pl-5 justify-center'>
              <div className=' items-center flex'>
                <input
                  type="radio"
                  name="mode"
                  checked={mode.txt === txt}
                  onChange={() => switchMode({txt:txt, key:idx})}
                  className= {radio}
                />
                <label className="text-white text-xl font-['Montserrat'] pl-2 ">{txt}</label>
              </div>
              <div className=''>
                {mode.key === idx ? 
                  (opts) ?
                  <div className='ml-3'>
                    {opts.map((opt_txt, key_idx) => {
                      let new_name = txt.concat(' with ', opt_txt) 
                      return (
                      <div key={key_idx}>
                        <input
                          type="radio"
                          name="mode"
                          checked={mode.txt === new_name}
                          onChange={() => switchMode({txt: new_name, key:idx})}
                          className= {radio}
                        />
                        <label className="text-white font-['Montserrat'] pl-2 text-l ">{opt_txt}</label>
                      </div>
                      )
                    })}
                  </div> : '' : ''
                }  
              </div>
            </div>
            <div className="w-1/3 mr-3 flex items-center justify-center" >
                <Image src={img} alt={txt} width={150} height={150} className='rounded-3xl' />
            </div>
        </div>
    </div>
  )
}

export default Tile