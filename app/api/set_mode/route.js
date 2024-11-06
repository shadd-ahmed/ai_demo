export async function POST(req) {
    const { mode } = await req.json();
  
    // Send mode change to Python backend
    const response = await fetch('http://localhost:5000/set_mode', {
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
  