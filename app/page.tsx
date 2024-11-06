import NavBar from '../components/NavBar'
import LiveFeed from '../components/LiveFeed'
import Options from '../components/Options'
import Qr from '../components/Qr'

export default function Home() {
  
  return (
    <div className=" bg-black">
      <NavBar />
      <div className='flex justify-between'>
        <div className=' flex flex-col justify-between '>
          <Options />
          <Qr />
        </div>
      <LiveFeed />
      </div>
    </div>
  );
}
