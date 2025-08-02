const http = require('http');

const criticalPages = [
  '/',
  '/access-code',
  '/auth/signin', 
  '/auth/signup',
  '/dashboard',
  '/create-quote',
  '/feedback',
  '/onboarding',
  '/api/test',
  '/api/test/db',
  '/api/test/ai'
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
        resolve({ url, status: res.statusCode });
      });
    });

    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing critical pages...\n');
  
  let allGood = true;
  for (const page of criticalPages) {
    const result = await testPage(page);
    
    if (result.status >= 200 && result.status < 400) {
      console.log(`✅ ${page} - ${result.status}`);
    } else {
      console.log(`❌ ${page} - ${result.status}${result.error ? ' - ' + result.error : ''}`);
      allGood = false;
    }
  }
  
  console.log('\n' + (allGood ? '✅ All critical pages working!' : '❌ Some pages have errors'));
}

runTests();