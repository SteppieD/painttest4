async function testStaticFiles() {
  const baseUrl = 'http://localhost:3001';
  
  console.log('Testing static file serving...\n');
  
  // First, fetch the home page to get the CSS URL
  try {
    const homeResponse = await fetch(baseUrl);
    const homeHtml = await homeResponse.text();
    
    // Extract CSS URL from the HTML
    const cssMatch = homeHtml.match(/href="([^"]*\.css[^"]*)"/);
    if (cssMatch) {
      const cssUrl = cssMatch[1];
      const fullCssUrl = cssUrl.startsWith('http') ? cssUrl : `${baseUrl}${cssUrl}`;
      
      console.log(`Found CSS URL: ${fullCssUrl}`);
      
      // Try to fetch the CSS file
      const cssResponse = await fetch(fullCssUrl);
      console.log(`CSS Response Status: ${cssResponse.status}`);
      console.log(`CSS Content-Type: ${cssResponse.headers.get('content-type')}`);
      
      const cssContent = await cssResponse.text();
      console.log(`CSS Content Length: ${cssContent.length} bytes`);
      console.log(`CSS Content Preview: ${cssContent.substring(0, 200)}...`);
      
      // Check if it's actually CSS or HTML error page
      if (cssContent.includes('<!DOCTYPE') || cssContent.includes('<html')) {
        console.log('\nERROR: CSS URL is returning HTML content!');
        console.log('This suggests the static file serving is not working correctly.');
      }
    } else {
      console.log('No CSS link found in HTML');
    }
    
    // Also test direct access to _next/static
    console.log('\n\nTesting direct _next/static access...');
    const staticTestUrl = `${baseUrl}/_next/static/chunks/webpack.js`;
    const staticResponse = await fetch(staticTestUrl);
    console.log(`Static file test URL: ${staticTestUrl}`);
    console.log(`Response Status: ${staticResponse.status}`);
    console.log(`Content-Type: ${staticResponse.headers.get('content-type')}`);
    
  } catch (error) {
    console.error('Error testing static files:', error);
  }
}

testStaticFiles();