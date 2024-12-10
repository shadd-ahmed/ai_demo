import Image from 'next/image'

const Tile = ({switchMode, mode, title, img, opts, idx}) => { 
  // console.log(mode, title, title, img, opts, idx)
  const radio = 'transition-all appearance-none rounded-full cursor-pointer h-3 w-3 ring-2 ring-[#CA6A2E] bg-none checked:border-2 checked:bg-orange-400 checked:border-white'
  const selected = 'rounded-md border-[#CA6A2E] my-2  w-full border-b-2' // highlight the selected option
  const def = 'rounded-md border-[#CA6A2E] my-2 w-full border-b-2 opacity-45'
  // console.log('main', mode)
  return (
    <div className={mode.key === idx ? selected : def} >
        <div className="flex flex-wrap flex-row justify-between pb-2">
            <div className='flex flex-wrap flex-col pl-5 justify-center'>
              <div className=' items-center flex'>
                <input
                  type="radio"
                  name="mode"
                  checked={mode.key === idx && mode.opt_key == null}
                  onChange={() => switchMode({opt_key: null, key:idx})}
                  className= {radio}
                />
                <label className="text-white text-xl font-['Montserrat'] pl-2 ">{title}</label>
              </div>
              <div className=''>
                {mode.key === idx ? 
                  (opts) ?
                  <div className='ml-3'>
                    {opts.map((item, key_idx) => {
                      // console.log('item', item)
                      // console.log('ehcking', mode.opt_key, item.key, mode.opt_key === item.key)
                      return (
                      <div key={key_idx}>
                        <input
                          type="radio"
                          name="mode"
                          checked={mode.opt_key === item.key} // it needs to reload to get this ....
                          onChange={() => switchMode({opt_key: item.key, key:idx})}
                          className= {radio}
                        />
                        <label className="text-white font-['Montserrat'] pl-2 text-l ">{item.title}</label>
                      </div>
                      )
                    })}
                  </div> : '' : ''
                }  
              </div>
            </div>
            <div className="w-1/3 mr-3 flex items-center justify-center" >
                <Image src={img} alt={title} width={150} height={150} className='rounded-3xl' />
            </div>
        </div>
    </div>
  )
}

export default Tile