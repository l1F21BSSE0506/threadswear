const axios = require('axios');

console.log('🔍 Testing Railway URL Patterns');
console.log('================================');

const possibleUrls = [
  'https://threadswear-production.up.railway.app',
  'https://threadswear.up.railway.app',
  'https://threadswear-backend.up.railway.app',
  'https://threadswear-production-8080.up.railway.app',
  'https://threadswear-8080.up.railway.app',
  'https://threadswear-production-41c9cf81.up.railway.app',
  'https://threadswear-41c9cf81.up.railway.app',
  'https://threadswear-production-41c9cf81-11c1-4e4c-b013-f6482bd61b16.up.railway.app'
];

async function testUrl(url) {
  try {
    console.log(`Testing: ${url}`);
    const response = await axios.get(`${url}/api/health`, { timeout: 5000 });
    console.log(`✅ FOUND! ${url} - Status: ${response.status}`);
    console.log('Response:', response.data);
    return url;
  } catch (error) {
    console.log(`❌ ${url} - ${error.message}`);
    return null;
  }
}

async function findRailwayUrl() {
  console.log('Testing common Railway URL patterns...\n');
  
  for (const url of possibleUrls) {
    const result = await testUrl(url);
    if (result) {
      console.log(`\n🎉 Your Railway URL is: ${result}`);
      console.log(`\nSet this in Vercel as: VITE_API_URL = ${result}/api`);
      return result;
    }
  }
  
  console.log('\n❌ Could not find Railway URL automatically.');
  console.log('Please check your Railway dashboard manually.');
}

findRailwayUrl().catch(console.error); 