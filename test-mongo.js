const mongoose = require('./backend/node_modules/mongoose');
require('./backend/node_modules/dotenv').config({ path: './backend/config.env' });

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('❌ MongoDB connection failed:');
    console.log(err.message);
  }); 