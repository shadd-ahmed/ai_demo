function NavBar() {
  return (
    <nav className="w-full p-4">
      <div className="flex flex-wrap justify-between items-center">
        {/* Title */}
        <h1 className="text-[#CA6A2E] text-4xl md:text-5xl font-bold font-['Monofett']">
          Masking Lab
        </h1>

        {/* Subtitle */}
        <p className="text-white text-xl md:text-2xl font-extralight font-['Montserrat'] opacity-75">
          Ai@HPI Conference Demo
        </p>
      </div>
    </nav>
  );
}

export default NavBar;
