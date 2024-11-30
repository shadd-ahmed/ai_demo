import Image from "next/image";
import img from "../public/QR.svg";

function Qr() {
  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-900 rounded-lg shadow-card">
      {/* Title */}
      <h2 className="text-white text-2xl font-semibold mb-4 font-['Montserrat']">
        Find Out More
      </h2>

      {/* QR Code */}
      <div className="bg-white p-3 rounded-lg transition-transform transform hover:scale-105">
        <Image
          src={img}
          width={200}
          height={200}
          alt="QR Code"
          className="rounded-md"
        />
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-3 text-center">
        Scan the QR code to explore additional features or learn more about our demo.
      </p>
    </div>
  );
}

export default Qr;
