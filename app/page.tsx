import NavBar from '../components/NavBar'
import LiveFeed from '../components/LiveFeed'
// import Camera from '../components/Camera'
import Options from '../components/Options'
import QR from '../components/Qr'

export default function Home() {
  
  // <div className="bg-[url('/bg_image.png')]">
  return (
    <div className="">
    <NavBar />
      <div className='flex justify-between'>
        <div className='flex justify-between flex-col'>
          <Options />
          <QR />
        </div>
          <LiveFeed />
      </div>
    </div>
  );
}
