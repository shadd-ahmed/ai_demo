import Image from "next/image"
import img from '../public/QR.svg'

function Qr() {
  return (
    <>
    <div className="m-5 bg-gray-900 ">
    <h1 className="text-white mb-5 p-5 font-bold">Interested in finding out more?</h1>
        <Image className=" bg-white p-5" src={img} width={320} height={12} alt="qr_code" />
    </div>
    </>
  )
}

export default Qr