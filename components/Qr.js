import Image from "next/image"
import img from '../public/QR.svg'

function Qr() {
  return (
    <>
    <div className="m-5 bg-gray-900 ">
        <Image className=" bg-white" src={img} width={320} height={12} alt="qr_code" />
    </div>
    </>
  )
}

export default Qr