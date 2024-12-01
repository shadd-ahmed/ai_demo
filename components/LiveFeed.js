function LiveFeed() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
  const url = backend_url.concat('get_frame')
  return (
    <>
    {/* <div className="w-3/4 h-full border-[#CA6A2E] border-2 m-5 rounded-xl"> */}
    <div className="w-full sm:w-[80%] h-auto border-[#CA6A2E] border-2 m-5 rounded-xl overflow-hidden shadow-card">
    <img
          src={url}
          alt="Live Feed"
          className="aspect-video w-full h-full object-cover rounded-xl transition-transform duration-200 hover:scale-105"
        />
    </div> 
    </>
  )
}

export default LiveFeed

