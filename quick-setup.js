const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Quick Setup for Threadswear.pk');
console.log('=====================================\n');

// Check if MongoDB is running
console.log('1. Checking MongoDB connection...');
try {
  // Try to connect to MongoDB
  const mongoose = require('./backend/node_modules/mongoose');
  require('./backend/node_modules/dotenv').config({ path: './backend/config.env' });
  
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connection successful');
      setupDatabase();
    })
    .catch(err => {
      console.log('❌ MongoDB connection failed');
      console.log('Please make sure MongoDB is running on your system');
      console.log('You can download MongoDB from: https://www.mongodb.com/try/download/community');
      process.exit(1);
    });
} catch (error) {
  console.log('❌ Error checking MongoDB:', error.message);
  process.exit(1);
}

async function setupDatabase() {
  try {
    console.log('\n2. Setting up database...');
    
    // Import models
    const User = require('./backend/models/User');
    const Product = require('./backend/models/Product');
    
    // Create admin user if it doesn't exist
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('Creating admin user...');
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@threadswear.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Admin user created');
      console.log('   Email: admin@threadswear.com');
      console.log('   Password: admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    // Check if products exist
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('\n3. Adding sample products...');
      
      const sampleProducts = [
        {
          name: "Classic White T-Shirt",
          description: "Premium cotton classic white t-shirt, perfect for everyday wear",
          price: 25.99,
          condition: "New",
          category: "T-Shirts",
          size: "M",
          brand: "ThreadWear",
          images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
          seller: adminUser._id,
          isAvailable: true,
          biddingEnabled: false
        },
        {
          name: "Denim Jacket",
          description: "Vintage-style denim jacket with modern fit",
          price: 89.99,
          condition: "Like New",
          category: "Jackets",
          size: "L",
          brand: "DenimCo",
          images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500"],
          seller: adminUser._id,
          isAvailable: true,
          biddingEnabled: true,
          currentBid: 75.00,
          minBidIncrement: 5.00
        },
        {
          name: "Slim Fit Jeans",
          description: "Comfortable slim fit jeans in dark wash",
          price: 65.00,
          condition: "New",
          category: "Jeans",
          size: "32x32",
          brand: "FitStyle",
          images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
          seller: adminUser._id,
          isAvailable: true,
          biddingEnabled: false
        },
        {
          name: "Casual Hoodie",
          description: "Warm and comfortable hoodie for casual wear",
          price: 45.99,
          condition: "Good",
          category: "Hoodies",
          size: "XL",
          brand: "ComfortWear",
          images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"],
          seller: adminUser._id,
          isAvailable: true,
          biddingEnabled: true,
          currentBid: 35.00,
          minBidIncrement: 3.00
        },
        {
          name: "Formal Dress Shirt",
          description: "Professional dress shirt for business meetings",
          price: 55.00,
          condition: "New",
          category: "Shirts",
          size: "L",
          brand: "Professional",
          images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"],
          seller: adminUser._id,
          isAvailable: true,
          biddingEnabled: false
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products added successfully');
    } else {
      console.log('✅ Products already exist in database');
    }
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start your backend server: cd backend && npm run dev');
    console.log('2. Start your frontend server: npm run dev');
    console.log('3. Visit http://localhost:3000 to see your website');
    console.log('4. Login with admin@threadswear.com / admin123 to access admin dashboard');
    console.log('5. Visit http://localhost:3000/admin-dashboard to manage products');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
} 