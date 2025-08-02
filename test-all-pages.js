const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// List of all pages to test based on the app directory structure
const pagesToTest = [
  '/',
  '/access-code',
  '/auth/signin',
  '/auth/signup',
  '/billing',
  '/case-studies',
  '/case-studies/commercial-office-building',
  '/case-studies/historic-restoration',
  '/case-studies/hoa-community-project',
  '/case-studies/luxury-home-transformation',
  '/commercial-painting-estimating-software',
  '/create-quote',
  '/dashboard',
  '/dashboard/customers',
  '/dashboard/products',
  '/dashboard/quotes',
  '/dashboard/settings',
  '/dashboard/settings/billing',
  '/demo',
  '/exterior-painting-estimate-calculator',
  '/faq',
  '/features',
  '/feedback',
  '/guides',
  '/guides/cabinet-painting-quotes',
  '/guides/commercial-painting-quotes',
  '/guides/common-quoting-mistakes',
  '/guides/exterior-painting-quotes',
  '/guides/follow-up-strategies',
  '/guides/how-to-quote-painting-jobs',
  '/guides/interior-painting-quotes',
  '/guides/labor-cost-estimation',
  '/guides/measurement-techniques',
  '/guides/paint-calculator',
  '/guides/paint-coverage-rates',
  '/guides/paint-quantity-calculations',
  '/guides/painting-business-guide',
  '/guides/painting-estimate-software',
  '/guides/pricing-psychology',
  '/guides/quote-presentation-tips',
  '/how-to-quote-painting-jobs',
  '/integrations',
  '/interior-painting-quote-calculator',
  '/locations/austin',
  '/locations/charlotte',
  '/locations/denver',
  '/locations/las-vegas',
  '/locations/miami',
  '/locations/nashville',
  '/locations/orlando',
  '/locations/phoenix',
  '/locations/san-diego',
  '/locations/tampa',
  '/mobile',
  '/mobile-painting-estimate-app',
  '/onboarding',
  '/paint-contractor-app',
  '/paint-cost-calculator',
  '/paint-estimate-templates',
  '/painting-business-software',
  '/painting-contractor-software',
  '/painting-contractors',
  '/painting-estimate-software',
  '/painting-estimating-software',
  '/painting-quote-generator',
  '/painting-quote-software',
  '/painting-quote-templates',
  '/pricing',
  '/privacy',
  '/roi-calculator',
  '/solutions/commercial',
  '/solutions/enterprise',
  '/solutions/franchise',
  '/solutions/residential',
  '/solutions/startups',
  '/status',
  '/support',
  '/terms',
  '/trial-signup',
  '/unlock-analytics'
];

async function testPage(url) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: url,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 500) {
          // Check for specific error patterns
          if (data.includes('Error:') || data.includes('TypeError:') || data.includes('ReferenceError:')) {
            const errorMatch = data.match(/(Error|TypeError|ReferenceError): ([^<]+)/);
            resolve({
              url,
              status: res.statusCode,
              error: errorMatch ? errorMatch[0] : 'Server Error'
            });
          } else {
            resolve({ url, status: res.statusCode });
          }
        } else {
          resolve({ url, status: res.statusCode });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT' });
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing all pages...\n');
  
  const results = [];
  for (const page of pagesToTest) {
    const result = await testPage(page);
    results.push(result);
    
    if (result.status >= 500 || result.status === 'ERROR' || result.status === 'TIMEOUT') {
      console.log(`❌ ${page} - ${result.status}${result.error ? ' - ' + result.error : ''}`);
    } else if (result.status === 404) {
      console.log(`⚠️  ${page} - 404 Not Found`);
    } else {
      console.log(`✅ ${page} - ${result.status}`);
    }
  }
  
  // Summary
  console.log('\n=== SUMMARY ===');
  const errors = results.filter(r => r.status >= 500 || r.status === 'ERROR' || r.status === 'TIMEOUT');
  const notFound = results.filter(r => r.status === 404);
  const success = results.filter(r => r.status >= 200 && r.status < 400);
  
  console.log(`Total pages tested: ${results.length}`);
  console.log(`✅ Successful: ${success.length}`);
  console.log(`⚠️  Not Found: ${notFound.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n=== ERRORS ===');
    errors.forEach(e => {
      console.log(`${e.url}: ${e.error || 'Server Error'}`);
    });
  }
}

// Make sure server is running
console.log('Starting test... Make sure Next.js dev server is running on port 3001\n');
setTimeout(runTests, 2000);