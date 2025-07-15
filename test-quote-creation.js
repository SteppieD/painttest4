// Test complete quote creation through chat
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

  // Full conversation to create a quote
  const messages = [
    {
      role: 'assistant',
      content: "Hello! I'm here to help you create a painting quote. Let's start with some basic information. What's the customer's name?"
    },
    {
      role: 'user',
      content: 'The customer is Sarah Johnson'
    },
    {
      role: 'assistant',
      content: 'Okay, got it. And what is the property address where the painting will take place?'
    },
    {
      role: 'user',
      content: 'The address is 456 Oak Street, Austin, TX 78701. Her email is sarah.johnson@email.com and phone is 512-555-1234.'
    },
    {
      role: 'assistant',
      content: 'Thank you for providing that customer information. Now, is this a residential or commercial painting project?'
    },
    {
      role: 'user',
      content: 'This is a residential project. She wants to paint her living room and two bedrooms.'
    },
    {
      role: 'assistant',
      content: 'Perfect! A residential project for Sarah Johnson. Let me get the details for each room. Starting with the living room - what are the approximate dimensions of the walls? And what condition are they in?'
    },
    {
      role: 'user',
      content: 'The living room is about 20x15 feet with 10 foot ceilings. The walls are in good condition, just need repainting. Total wall area is about 700 square feet.'
    },
    {
      role: 'assistant',
      content: 'Great! 700 square feet of walls in good condition for the living room. How about the two bedrooms? Can you give me the dimensions and condition for each?'
    },
    {
      role: 'user',
      content: 'The master bedroom is 15x12 feet with 10 foot ceilings, about 540 square feet of wall space. The second bedroom is 12x10 feet, about 440 square feet. Both are in good condition. All rooms need 2 coats of paint.'
    }
  ];

  // Send conversation to get quote data
  const chatResponse = await fetch('http://localhost:3001/api/chat/quote', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `auth-token=${authToken}`
    },
    body: JSON.stringify({ messages })
  });

  if (!chatResponse.ok) {
    console.error('Chat failed:', await chatResponse.text());
    return;
  }

  const chatData = await chatResponse.json();
  console.log('✅ Chat response:', JSON.stringify(chatData, null, 2));

  // If quote data is generated, it will be in chatData.quoteData
  if (chatData.quoteData) {
    console.log('✅ Quote data generated successfully!');
    console.log('Quote details:', JSON.stringify(chatData.quoteData, null, 2));
  } else {
    console.log('ℹ️ Need more information to generate quote');
    console.log('Parsing status:', chatData.parsingStatus);
  }
};

createQuote().catch(console.error);