// Test script for chat interface
const testChat = async () => {
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

  // Get the auth token from cookies
  const cookies = loginResponse.headers.get('set-cookie');
  const authToken = cookies.match(/auth-token=([^;]+)/)[1];

  console.log('✅ Login successful');

  // Test chat message
  const chatResponse = await fetch('http://localhost:3001/api/chat/quote', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `auth-token=${authToken}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm here to help you create a painting quote. Let's start with some basic information. What's the customer's name?"
        },
        {
          role: 'user',
          content: 'The customer is John Smith'
        }
      ]
    })
  });

  if (!chatResponse.ok) {
    console.error('Chat failed:', await chatResponse.text());
    return;
  }

  const chatData = await chatResponse.json();
  console.log('✅ Chat response:', chatData);

  // Continue conversation
  const secondResponse = await fetch('http://localhost:3001/api/chat/quote', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `auth-token=${authToken}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm here to help you create a painting quote. Let's start with some basic information. What's the customer's name?"
        },
        {
          role: 'user',
          content: 'The customer is John Smith'
        },
        {
          role: 'assistant',
          content: chatData.message
        },
        {
          role: 'user',
          content: 'His email is john.smith@email.com and phone is 555-1234. The address is 123 Main St, Springfield.'
        }
      ]
    })
  });

  if (!secondResponse.ok) {
    console.error('Second chat failed:', await secondResponse.text());
    return;
  }

  const secondData = await secondResponse.json();
  console.log('✅ Second response:', secondData);
};

testChat().catch(console.error);