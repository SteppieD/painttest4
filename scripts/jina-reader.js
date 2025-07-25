#!/usr/bin/env node

// Simple Jina.ai reader for web content
// Usage: node jina-reader.js <url>

const https = require('https');

async function fetchWithJina(url) {
  const jinaUrl = `https://r.jina.ai/${url}`;
  
  return new Promise((resolve, reject) => {
    https.get(jinaUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Get URL from command line
const url = process.argv[2];

if (!url) {
  console.error('Usage: node jina-reader.js <url>');
  process.exit(1);
}

fetchWithJina(url)
  .then(content => {
    console.log(content);
  })
  .catch(err => {
    console.error('Error fetching content:', err);
    process.exit(1);
  });