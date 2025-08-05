const axios = require('axios');

console.log('🔍 Debugging Deployment Issues');
console.log('==============================');

// Test environment variables
console.log('\n📋 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');

// Test local backend
async function testLocalBackend() {
  try {
    console.log('\n🔧 Testing Local Backend...');
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Local backend is running:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Local backend error:', error.message);
    return false;
  }
}

// Test Railway backend (if URL provided)
async function testRailwayBackend(railwayUrl) {
  if (!railwayUrl) {
    console.log('\n⚠️  No Railway URL provided for testing');
    return false;
  }
  
  try {
    console.log('\n🚂 Testing Railway Backend...');
    const response = await axios.get(`${railwayUrl}/api/health`);
    console.log('✅ Railway backend is running:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Railway backend error:', error.message);
    return false;
  }
}

// Test Vercel frontend (if URL provided)
async function testVercelFrontend(vercelUrl) {
  if (!vercelUrl) {
    console.log('\n⚠️  No Vercel URL provided for testing');
    return false;
  }
  
  try {
    console.log('\n⚡ Testing Vercel Frontend...');
    const response = await axios.get(vercelUrl);
    console.log('✅ Vercel frontend is accessible');
    return true;
  } catch (error) {
    console.log('❌ Vercel frontend error:', error.message);
    return false;
  }
}

// Main debug function
async function debugDeployment() {
  const railwayUrl = process.argv[2];
  const vercelUrl = process.argv[3];
  
  console.log('Railway URL:', railwayUrl || 'Not provided');
  console.log('Vercel URL:', vercelUrl || 'Not provided');
  
  await testLocalBackend();
  await testRailwayBackend(railwayUrl);
  await testVercelFrontend(vercelUrl);
  
  console.log('\n📝 Debug Summary:');
  console.log('1. Check Railway logs for backend errors');
  console.log('2. Verify environment variables are set in Railway');
  console.log('3. Check Vercel build logs for frontend errors');
  console.log('4. Verify VITE_API_URL is set in Vercel');
}

// Run debug if called directly
if (require.main === module) {
  debugDeployment().catch(console.error);
}

module.exports = { debugDeployment }; 