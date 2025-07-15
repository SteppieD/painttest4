// Test creating the actual quote
const createQuote = async () => {
  // First, login to get auth token
  const loginResponse = await fetch('http://localhost:3001/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@paintquotepro.com',
      password: 'test123'
    })
  });

  if (!loginResponse.ok) {
    console.error('Login failed:', await loginResponse.text());
    return;
  }

  const cookies = loginResponse.headers.get('set-cookie');
  const authToken = cookies.match(/auth-token=([^;]+)/)[1];
  console.log('✅ Login successful');

  // Quote data from the chat
  const quoteData = {
    "customer": {
      "name": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "phone": "512-555-1234",
      "address": "456 Oak Street, Austin, TX 78701"
    },
    "projectType": "residential",
    "description": "Interior painting of living room and two bedrooms",
    "surfaces": [
      {
        "type": "walls",
        "name": "Living Room Walls",
        "area": 700,
        "linearFeet": null,
        "count": null,
        "coats": 2,
        "condition": "good",
        "prepWork": []
      },
      {
        "type": "walls",
        "name": "Master Bedroom Walls",
        "area": 540,
        "linearFeet": null,
        "count": null,
        "coats": 2,
        "condition": "good",
        "prepWork": []
      },
      {
        "type": "walls",
        "name": "Second Bedroom Walls",
        "area": 440,
        "linearFeet": null,
        "count": null,
        "coats": 2,
        "condition": "good",
        "prepWork": []
      }
    ],
    "chargeRates": {
      "walls": 3.5,
      "ceilings": 3,
      "baseboards": 2.5,
      "crownMolding": 3.5,
      "doors": 150,
      "windows": 100,
      "exteriorWalls": 4,
      "fascia": 3,
      "soffits": 3.5,
      "exteriorDoors": 200,
      "exteriorWindows": 150
    },
    "settings": {
      "taxRate": 8.25,
      "overheadPercent": 15,
      "profitMargin": 30
    }
  };

  // Create the quote
  const quoteResponse = await fetch('http://localhost:3001/api/quotes', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `auth-token=${authToken}`
    },
    body: JSON.stringify(quoteData)
  });

  if (!quoteResponse.ok) {
    console.error('Quote creation failed:', await quoteResponse.text());
    return;
  }

  const quote = await quoteResponse.json();
  console.log('✅ Quote created successfully!');
  console.log('Quote Number:', quote.quoteNumber);
  console.log('Quote ID:', quote.id);
  console.log('Total Amount:', quote.totalAmount);
  console.log('\nBreakdown:');
  console.log('- Subtotal:', quote.subtotal);
  console.log('- Overhead (15%):', quote.overhead);
  console.log('- Profit (30%):', quote.profit);
  console.log('- Tax (8.25%):', quote.tax);
  console.log('- Total:', quote.totalAmount);
  
  // Calculate what the total should be
  const wallArea = 700 + 540 + 440; // 1680 sq ft
  const rate = 3.5; // per sq ft
  const coats = 2;
  const expectedSubtotal = wallArea * rate * coats;
  console.log('\nExpected Calculation:');
  console.log(`- Wall area: ${wallArea} sq ft`);
  console.log(`- Rate: $${rate}/sq ft`);
  console.log(`- Coats: ${coats}`);
  console.log(`- Subtotal: ${wallArea} × ${rate} × ${coats} = $${expectedSubtotal}`);
};

createQuote().catch(console.error);