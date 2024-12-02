import NavBar from '../components/NavBar'
import LiveFeed from '../components/LiveFeed'
// import Camera from '../components/Camera'
import Options from '../components/Options'
import Qr from '../components/Qr';

export default function Home() {
  
  return (
    <div className='relative w-full h-screen flex justify-center items-center'>
      <div className="absolute  bg-[url('/bg_image.png')] inset-0 bg-center filter blur-sm bg-cover opacity-50">
      </div>
      <div className='bg-[#222427] w-full m-8 z-10 rounded-2xl relative'>
        <NavBar />
          <div className='flex flex-row justify-between items-center h-full'>
            <div className='flex flex-col  h-full w-1/4'>
              <Options />
              <Qr />
            </div>
              <LiveFeed />
          </div>
      </div>
    </div>
  );
}
