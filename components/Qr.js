import Image from "next/image"
import img from '../public/qr2.png'

function Qr() {
  return (
    <>    
      <div className="flex flex-col items-center justify-center m-5 mt-0 p-5  rounded-lg shadow-card">
      {/* Title */}
      <h2 className="text-white text-xl font-semibold font-['Montserrat']">
        Find Out More
      </h2>

      {/* QR Code */}
      <div className="p-3 rounded-lg transition-transform transform hover:scale-105">
        <Image
          src={img}
          width={150}
          height={150}
          alt="QR Code"
          className="rounded-md"
        />
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-3 text-center">
        Scan the QR code to explore additional features or learn more about our demo.
      </p>
      </div>
    </>
  )
}

export default Qr

{/* <div className="flex items-center justify-center mt-5 ">
<Image className="" src={img} width={200} alt="qr_code" />
</div> */}

