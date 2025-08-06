// Test Backend API Endpoints
const axios = require('axios');

const BACKEND_URL = 'https://your-backend-url.vercel.app'; // Replace with your actual URL

async function testBackend() {
  console.log('🔍 Testing Backend API...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing /api/health...');
    const healthResponse = await axios.get(`${BACKEND_URL}/api/health`);
    console.log('✅ Health Check:', healthResponse.data);
    
    // Test test endpoint
    console.log('\n2. Testing /api/test...');
    const testResponse = await axios.get(`${BACKEND_URL}/api/test`);
    console.log('✅ Test Route:', testResponse.data);
    
    console.log('\n🎉 Backend is working perfectly!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    console.log('\n💡 Make sure to:');
    console.log('1. Replace BACKEND_URL with your actual backend URL');
    console.log('2. Use /api/health instead of just /');
  }
}

testBackend(); 