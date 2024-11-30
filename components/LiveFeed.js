function LiveFeed() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const url = backend_url.concat('/get_frame');

  return (
    <div className="w-full sm:w-[80%] h-auto border-[#CA6A2E] border-2 m-5 rounded-xl overflow-hidden bg-gray-800 shadow-card">
      <img
        src={url}
        alt="Live Feed"
        className="aspect-video w-full h-full object-cover rounded-xl transition-transform duration-200 hover:scale-105"
      />
    </div>
  );
}

export default LiveFeed;
