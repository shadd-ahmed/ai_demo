function LiveFeed() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
  const url = backend_url.concat('get_frame')
  return (
    <>
    <div className="w-[90%] h-full border-[#CA6A2E] border-2 mt-0 m-3 content-end  rounded-xl overflow-hidden shadow-card">
    <img
          src={url}
          alt="Live Feed"
          className="aspect-video w-full h-auto object-cover rounded-xl transition-transform scale-105 duration-200 hover:scale-110"
        />
    </div> 
    </>
  )
}

export default LiveFeed

