// Cloudflare Pages Functions to set proper headers
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Get the response from the next handler
  const response = await next();
  
  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response);
  
  // Set proper MIME types based on file extension
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.mjs')) {
    newResponse.headers.set('Content-Type', 'application/javascript');
  } else if (url.pathname.endsWith('.ts') || url.pathname.endsWith('.tsx')) {
    newResponse.headers.set('Content-Type', 'application/javascript');
  } else if (url.pathname.endsWith('.css')) {
    newResponse.headers.set('Content-Type', 'text/css');
  } else if (url.pathname.endsWith('.json')) {
    newResponse.headers.set('Content-Type', 'application/json');
  } else if (url.pathname.endsWith('.html')) {
    newResponse.headers.set('Content-Type', 'text/html');
  }
  
  // Add security headers
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('X-Frame-Options', 'DENY');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return newResponse;
}
