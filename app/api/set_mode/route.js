// require('dotenv').config();


export async function POST(req) {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { mode } = await req.json();
    const url = backend_url.concat('set_mode')
    // Send mode change to Python backend
    // const response = await fetch('http://localhost:5000/set_mode', {
    const response = await fetch(url, {
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode }),
    });
  
    if (response.ok) {
      return new Response('Mode switched successfully', { status: 200 });
    } else {
      return new Response('Failed to switch mode', { status: 500 });
    }
  }
  