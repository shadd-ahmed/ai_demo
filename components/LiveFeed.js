function LiveFeed() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
  const url = backend_url.concat('get_frame')
  return (
    <>
    <div className="w-[80%] h-full border-[#CA6A2E] border-2 m-5 rounded-xl">
        <img
          src="http://localhost:5000/get_frame"
          alt="Live Feed"
          className="aspect-video w-full rounded-xl"
        />
    </div> 
    </>
  )
}

export default LiveFeed