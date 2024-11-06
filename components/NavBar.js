function NavBar() {
  return (
    <>
    <nav className="bg-gray-900">
        <div className="flex flex-wrap flex-row justify-between mx-2 p-8">
            <div>
                <text className="text-white">AI Demo</text>
            </div>
          <div id="navbar-default">
            <ul className="font-medium flex flex-row justify-between rounded-lg">
              <li>
                <a href="#" className="text-white px-2">Live Demo</a>
              </li>
              <li>
                <a href="#" className=" text-white px-2 ">Samples</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar