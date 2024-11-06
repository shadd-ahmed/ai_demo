function LiveFeed() {
  return (
    <>
    <div className="aspect-video w-[70%] h-1/2 bg-gray-900 p-5 m-5 rounded-xl">
        <img
          src="http://localhost:5000/video_feed"
          alt="Live Feed"
          className="aspect-video w-full rounded-xl border-2 border-gray-300"
        />
    </div> 
    </>
  )
}

export default LiveFeed