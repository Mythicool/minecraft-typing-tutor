// Cloudflare Pages Worker to handle MIME types
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Get the asset from the static files
    const response = await env.ASSETS.fetch(request);
    
    // Clone the response so we can modify headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    
    // Set proper MIME types for JavaScript files
    if (url.pathname.endsWith('.js') || url.pathname.includes('/assets/') && url.pathname.includes('.js')) {
      newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8');
    }
    
    // Add security headers
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-Frame-Options', 'DENY');
    
    return newResponse;
  }
};
