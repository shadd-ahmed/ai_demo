import Image from 'next/image'
import Radio from './Radio'

const Tile = ({switchMode, mode, title, img, opts, idx}) => { 
  // console.log(mode, title, title, img, opts, idx)
  const selected = 'rounded-md border-[#CA6A2E] my-2 w-full border-b-2' // highlight the selected option
  const def = selected + ' opacity-45'
  // console.log('main', mode)
  return (
    <div className={mode.key === idx ? selected : def} >
        <div className="flex flex-wrap flex-row justify-between pb-2">
            <div className='flex flex-wrap flex-col pl-5 justify-center'>
              <div className=' items-center flex'>
                <Radio title={title} check={mode.key === idx && mode.opt_key == null} change={() => switchMode({opt_key: null, key:idx})} />
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
                        <Radio title={item.title} check={mode.opt_key === item.key} change={() => switchMode({opt_key: item.key, key:idx})}  />
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