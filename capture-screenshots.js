const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotDir = path.join(__dirname, 'docker-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  // Base URL for the Docker container
  const baseUrl = 'http://localhost:3005';
  
  // Pages to capture
  const pages = [
    { name: '01-homepage', url: '/', title: 'Homepage' },
    { name: '02-features', url: '/features', title: 'Features' },
    { name: '03-pricing', url: '/pricing', title: 'Pricing' },
    { name: '04-access-code', url: '/access-code', title: 'Access Code' },
    { name: '05-create-quote', url: '/create-quote', title: 'Create Quote' },
    { name: '06-demo', url: '/demo', title: 'Demo' },
    { name: '07-roi-calculator', url: '/roi-calculator', title: 'ROI Calculator' },
    { name: '08-interior-calculator', url: '/interior-painting-quote-calculator', title: 'Interior Painting Calculator' },
    { name: '09-exterior-calculator', url: '/exterior-painting-estimate-calculator', title: 'Exterior Painting Calculator' },
    { name: '10-painting-business-software', url: '/painting-business-software', title: 'Painting Business Software' },
    { name: '11-mobile-app', url: '/mobile', title: 'Mobile App' },
    { name: '12-case-studies', url: '/case-studies', title: 'Case Studies' },
    { name: '13-guides', url: '/guides', title: 'Guides' },
    { name: '14-integrations', url: '/integrations', title: 'Integrations' },
    { name: '15-about', url: '/about', title: 'About' },
    { name: '16-contact', url: '/contact', title: 'Contact' },
    { name: '17-help', url: '/help', title: 'Help' },
    { name: '18-locations-austin', url: '/locations/austin', title: 'Austin Location' },
    { name: '19-paint-contractor-app', url: '/paint-contractor-app', title: 'Paint Contractor App' },
    { name: '20-painting-quote-generator', url: '/painting-quote-generator', title: 'Painting Quote Generator' }
  ];
  
  console.log('Starting screenshot capture...');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Total pages to capture: ${pages.length}`);
  console.log('-----------------------------------');
  
  // Capture each page
  for (const pageInfo of pages) {
    try {
      const url = `${baseUrl}${pageInfo.url}`;
      console.log(`\nCapturing: ${pageInfo.title} (${pageInfo.url})`);
      
      // Navigate to the page
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait a bit for any animations to complete
      await page.waitForTimeout(2000);
      
      // Take full page screenshot
      const screenshotPath = path.join(screenshotDir, `${pageInfo.name}.png`);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true
      });
      
      console.log(`✓ Saved: ${pageInfo.name}.png`);
      
      // Also capture viewport screenshot (above the fold)
      const viewportPath = path.join(screenshotDir, `${pageInfo.name}-viewport.png`);
      await page.screenshot({ 
        path: viewportPath,
        fullPage: false
      });
      
      console.log(`✓ Saved: ${pageInfo.name}-viewport.png`);
      
    } catch (error) {
      console.error(`✗ Failed to capture ${pageInfo.title}: ${error.message}`);
    }
  }
  
  // Special captures for interactive elements
  console.log('\n-----------------------------------');
  console.log('Capturing interactive elements...');
  
  try {
    // Go to create quote page and interact with chat
    console.log('\nCapturing quote creation flow...');
    await page.goto(`${baseUrl}/create-quote`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Try to interact with the chat interface if it exists
    const chatInput = await page.$('textarea[placeholder*="Type your message"]');
    if (chatInput) {
      await chatInput.type('I need a quote for painting a 3 bedroom house interior');
      await page.screenshot({ 
        path: path.join(screenshotDir, '21-quote-chat-interaction.png'),
        fullPage: true
      });
      console.log('✓ Saved: quote-chat-interaction.png');
    }
  } catch (error) {
    console.error(`✗ Failed to capture chat interaction: ${error.message}`);
  }
  
  // Capture mobile views
  console.log('\n-----------------------------------');
  console.log('Capturing mobile views...');
  
  // Create mobile context
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15'
  });
  
  const mobilePage = await mobileContext.newPage();
  
  const mobilePages = [
    { name: 'mobile-01-homepage', url: '/', title: 'Mobile Homepage' },
    { name: 'mobile-02-create-quote', url: '/create-quote', title: 'Mobile Create Quote' },
    { name: 'mobile-03-pricing', url: '/pricing', title: 'Mobile Pricing' },
    { name: 'mobile-04-features', url: '/features', title: 'Mobile Features' }
  ];
  
  for (const pageInfo of mobilePages) {
    try {
      const url = `${baseUrl}${pageInfo.url}`;
      console.log(`\nCapturing: ${pageInfo.title}`);
      
      await mobilePage.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      await mobilePage.waitForTimeout(2000);
      
      const screenshotPath = path.join(screenshotDir, `${pageInfo.name}.png`);
      await mobilePage.screenshot({ 
        path: screenshotPath,
        fullPage: true
      });
      
      console.log(`✓ Saved: ${pageInfo.name}.png`);
      
    } catch (error) {
      console.error(`✗ Failed to capture ${pageInfo.title}: ${error.message}`);
    }
  }
  
  await mobileContext.close();
  await context.close();
  await browser.close();
  
  // Generate HTML gallery
  console.log('\n-----------------------------------');
  console.log('Generating screenshot gallery...');
  
  const screenshots = fs.readdirSync(screenshotDir)
    .filter(file => file.endsWith('.png'))
    .sort();
  
  const galleryHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PaintQuote Pro - Screenshot Gallery</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.5em;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .stats {
      background: white;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .stat {
      text-align: center;
    }
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      color: #667eea;
    }
    .stat-label {
      color: #666;
      margin-top: 5px;
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }
    .screenshot-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.3s ease;
    }
    .screenshot-card:hover {
      transform: translateY(-5px);
    }
    .screenshot-img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-bottom: 2px solid #eee;
      cursor: pointer;
    }
    .screenshot-info {
      padding: 15px;
    }
    .screenshot-title {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    .screenshot-filename {
      color: #666;
      font-size: 0.9em;
      font-family: monospace;
    }
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      z-index: 1000;
      cursor: pointer;
    }
    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      max-height: 90%;
    }
    .modal-content img {
      width: 100%;
      height: auto;
    }
    .timestamp {
      text-align: center;
      color: white;
      margin-top: 20px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 PaintQuote Pro - Screenshot Gallery</h1>
    
    <div class="stats">
      <div class="stats-grid">
        <div class="stat">
          <div class="stat-value">${screenshots.length}</div>
          <div class="stat-label">Total Screenshots</div>
        </div>
        <div class="stat">
          <div class="stat-value">${screenshots.filter(s => s.includes('mobile')).length}</div>
          <div class="stat-label">Mobile Views</div>
        </div>
        <div class="stat">
          <div class="stat-value">${screenshots.filter(s => s.includes('viewport')).length}</div>
          <div class="stat-label">Viewport Captures</div>
        </div>
        <div class="stat">
          <div class="stat-value">${pages.length}</div>
          <div class="stat-label">Pages Captured</div>
        </div>
      </div>
    </div>
    
    <div class="gallery">
      ${screenshots.map(filename => {
        const title = filename
          .replace('.png', '')
          .replace(/-/g, ' ')
          .replace(/^\d+\s/, '')
          .replace(/\b\w/g, c => c.toUpperCase());
        
        return `
        <div class="screenshot-card">
          <img 
            src="${filename}" 
            alt="${title}" 
            class="screenshot-img"
            onclick="openModal('${filename}')"
          >
          <div class="screenshot-info">
            <div class="screenshot-title">${title}</div>
            <div class="screenshot-filename">${filename}</div>
          </div>
        </div>
        `;
      }).join('')}
    </div>
    
    <div class="timestamp">
      Generated on ${new Date().toLocaleString()}
    </div>
  </div>
  
  <div id="modal" class="modal" onclick="closeModal()">
    <div class="modal-content">
      <img id="modal-img" src="" alt="">
    </div>
  </div>
  
  <script>
    function openModal(src) {
      document.getElementById('modal').style.display = 'block';
      document.getElementById('modal-img').src = src;
    }
    
    function closeModal() {
      document.getElementById('modal').style.display = 'none';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  </script>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(screenshotDir, 'gallery.html'), galleryHtml);
  console.log('✓ Generated: gallery.html');
  
  console.log('\n===================================');
  console.log('Screenshot capture complete!');
  console.log(`Total screenshots: ${screenshots.length}`);
  console.log(`Location: ${screenshotDir}`);
  console.log(`Gallery: ${path.join(screenshotDir, 'gallery.html')}`);
  console.log('===================================\n');
}

// Run the script
captureScreenshots().catch(error => {
  console.error('Error capturing screenshots:', error);
  process.exit(1);
});